/* FINUITY receipt scanner: live camera, review panel, and VIP "Smart scan".
   Two readers, one button:
   - Smart scan (VIP): the photo goes to YOUR server (backend/functions scanReceipt). The SERVER checks VIP, so this part can not
     be bypassed in the browser. It reads store, date, time, items, VAT and total, and the server validates the answer.
   - Quick scan (free tries, or VIP when offline): the existing on-device reader (Tesseract) in index.html.
   Either way the result lands in a review panel first, and then in the normal Add Expense form. Nothing is saved automatically. */
(function(){
'use strict';
var W=window,D=document;
function $(id){return D.getElementById(id)}
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ic(n){return W.FinIcons?FinIcons.ic(n):''}
function money(n){try{return fmt(n)}catch(e){return '₱'+Number(n).toFixed(2)}}
function td(){try{return today()}catch(e){return new Date().toISOString().slice(0,10)}}
function toastMsg(m,t){try{toast(m,t)}catch(e){}}
function api(){return (W.FinVip&&FinVip.config&&FinVip.config.api&&FinVip.config.api.scan)||''}
function demoOK(){return !!(W.FinVip&&FinVip.demoOK&&FinVip.demoOK())}
function vip(){return !!(W.FinVip&&FinVip.isVip())}
function smartOK(){return vip()&&(!!api()||demoOK())}      // demo VIP on localhost can try the whole flow with a pretend receipt
var forceQuick=false;

/* ───────── camera viewfinder (the idea from your mock-up, with a guide frame) ───────── */
var cam=null,stream=null,prevFocus=null;
function stopStream(){if(stream){try{stream.getTracks().forEach(function(t){t.stop()})}catch(e){}stream=null}}
function closeCam(){stopStream();if(cam){cam.remove();cam=null}D.removeEventListener('keydown',camKey);D.body.classList.remove('sheet-open');try{prevFocus&&prevFocus.focus()}catch(e){}}
function camKey(e){if(e.key==='Escape')closeCam()}
function pickFile(){var i=$('receipt-file');if(i)i.click()}
function openCamera(){
  if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)||!W.isSecureContext){pickFile();return}
  closeCam();prevFocus=D.activeElement;
  cam=D.createElement('div');cam.className='sc-cam';cam.setAttribute('role','dialog');cam.setAttribute('aria-modal','true');cam.setAttribute('aria-label','Scan a receipt');
  cam.innerHTML='<video class="sc-video" playsinline muted autoplay></video>'
   +'<div class="sc-top"><span class="sc-title">'+ic('receipt')+(smartOK()?'Smart scan':'Scan receipt')+'</span><button type="button" class="sc-round" data-sc="cam-close" aria-label="Close camera">'+ic('x')+'</button></div>'
   +'<div class="sc-frame" aria-hidden="true"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></div>'
   +'<p class="sc-hint">Lay the receipt flat and fill the frame</p>'
   +'<div class="sc-bar"><button type="button" class="sc-side" data-sc="gallery" aria-label="Choose a photo instead">'+ic('image')+'<span>Photos</span></button>'
   +'<button type="button" class="sc-shutter" data-sc="shoot" aria-label="Take photo"><i></i></button><span class="sc-side ghost"></span></div>';
  D.body.appendChild(cam);D.body.classList.add('sheet-open');D.addEventListener('keydown',camKey);
  var v=cam.querySelector('video');
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}},audio:false}).then(function(s){
    if(!cam){s.getTracks().forEach(function(t){t.stop()});return}
    stream=s;v.srcObject=s;var p=v.play();if(p&&p.catch)p.catch(function(){});
  }).catch(function(){closeCam();toastMsg('Camera is not available. Choose a photo instead.');pickFile()});
}
function shoot(){
  var v=cam&&cam.querySelector('video');
  if(!v||!v.videoWidth)return;
  var c=D.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;
  c.getContext('2d').drawImage(v,0,0);
  c.toBlob(function(b){closeCam();if(b)handleImage(b)},'image/jpeg',0.92);
}

/* ───────── what to do with a photo ───────── */
function handleImage(blob){
  if(smartOK()){smartScan(blob);return}
  // the existing on-device reader; it takes an input-like object with .files
  forceQuick=true;
  try{W.scanReceiptFile({files:[blob],value:''})}finally{forceQuick=false}
}
function intercept(inp){            // called by the VIP gate for photos chosen from the gallery
  if(forceQuick||!smartOK())return false;
  var f=inp.files&&inp.files[0];try{inp.value=''}catch(e){}
  if(!f||!/^image\//.test(f.type||'')){toastMsg('Please choose a photo of the receipt','error');return true}
  smartScan(f);return true;
}
function start(){
  if(smartOK()){openCamera();return}
  var seen=false;try{seen=!!localStorage.getItem('finScanInfoSeen')}catch(e){}
  var m=$('receipt-info-modal');
  if(!seen&&m){m.style.display='flex';return}
  openCamera();
}

/* ───────── "Fin is reading" overlay ───────── */
var busyEl=null,abortCtl=null;
function busy(on,text){
  if(!on){if(busyEl){busyEl.remove();busyEl=null}return}
  if(busyEl)return;
  busyEl=D.createElement('div');busyEl.className='sc-busy';busyEl.setAttribute('role','alert');
  busyEl.innerHTML='<div class="sc-busy-in"><span class="sc-spin" aria-hidden="true"></span><b>'+esc(text||'Fin is reading your receipt')+'</b><span>This takes a few seconds.</span><button type="button" class="sc-ghost" data-sc="cancel">Cancel</button></div>';
  D.body.appendChild(busyEl);
}

/* ───────── Smart scan: photo -> your server ───────── */
function prep(blob){          // shrink big phone photos so the upload is small and fast
  return new Promise(function(res,rej){
    var done=function(bmp){
      var w0=bmp.width||bmp.naturalWidth,h0=bmp.height||bmp.naturalHeight,k=Math.min(1,1500/Math.max(w0,h0));
      var c=D.createElement('canvas');c.width=Math.round(w0*k);c.height=Math.round(h0*k);
      c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
      var q=0.82,out=c.toDataURL('image/jpeg',q);
      while(out.length>1300000&&q>0.4){q-=0.1;out=c.toDataURL('image/jpeg',q)}
      res(out.replace(/^data:image\/jpeg;base64,/,''));
    };
    if(W.createImageBitmap){createImageBitmap(blob,{imageOrientation:'from-image'}).then(done,function(){fallback()})}else fallback();
    function fallback(){var u=URL.createObjectURL(blob),im=new Image();im.onload=function(){URL.revokeObjectURL(u);done(im)};im.onerror=function(){rej(new Error('bad-image'))};im.src=u}
  });
}
function cats(){
  var s=$('exp-cat');if(!s)return [];
  return Array.prototype.filter.call(s.options,function(o){return o.value!=='loan-payment'}).map(function(o){return{id:o.value,label:o.textContent}});
}
function consent(next){
  var ok=false;try{ok=localStorage.getItem('finSmartOk')==='1'}catch(e){}
  if(ok){next();return}
  var el=D.createElement('div');el.className='vp-back';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Before Smart scan');
  el.innerHTML='<div class="vp-sheet sc-consent"><div class="vp-talk">'+(W.FinVip?FinVip.hero():'')+'<div class="vp-bubble vp-px"><h2 class="vp-t">Smart scan</h2><p class="vp-say">I send your receipt photo over a secure connection to read it. It is used only to read this receipt and is <b>not saved</b>.</p></div></div>'
   +'<div class="vp-foot"><button type="button" class="vp-cta" data-sc="consent-yes">Sounds good, scan it</button><button type="button" class="sc-ghost wide" data-sc="consent-no">Use the on-device reader instead</button></div></div>';
  D.body.appendChild(el);D.body.classList.add('sheet-open');
  el.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-sc]');if(!b&&e.target!==el)return;
    var k=b&&b.getAttribute('data-sc');
    if(k==='consent-yes'){try{localStorage.setItem('finSmartOk','1')}catch(x){}el.remove();D.body.classList.remove('sheet-open');next()}
    else{el.remove();D.body.classList.remove('sheet-open');if(k==='consent-no'){forceQuick=true;try{pendingQuick()}finally{forceQuick=false}}}
  });
  var f=el.querySelector('.vp-sheet');f.setAttribute('tabindex','-1');f.focus({preventScroll:true});
}
var pendingBlob=null;
function pendingQuick(){if(pendingBlob){var b=pendingBlob;pendingBlob=null;try{W.scanReceiptFile({files:[b],value:''})}catch(e){}}}
function smartScan(blob){
  pendingBlob=blob;
  consent(function(){pendingBlob=null;doSmart(blob)});
}
function demoReceipt(){
  return{merchant:'Jollibee SM North',address:'SM North EDSA, Quezon City',date:td(),time:'12:41',receiptNo:'00012345',subtotal:218.75,tax:26.25,total:245,
    items:[{name:'Chickenjoy 1pc w/ rice',qty:1,price:99},{name:'Jolly Spaghetti',qty:1,price:62},{name:'Coke Regular',qty:1,price:49},{name:'Peach Mango Pie',qty:1,price:35}],category:'food',confidence:'high',demo:true};
}
function doSmart(blob){
  busy(true);
  if(!api()){setTimeout(function(){busy(false);review(demoReceipt(),null)},1100);return}
  abortCtl=new AbortController();var t=setTimeout(function(){abortCtl.abort()},45000);
  prep(blob).then(function(b64){
    return cloudUser.getIdToken().then(function(tok){
      return fetch(api(),{method:'POST',signal:abortCtl.signal,headers:{'Content-Type':'application/json','Authorization':'Bearer '+tok},body:JSON.stringify({image:b64,categories:cats(),today:td()})});
    });
  }).then(function(r){return r.json().then(function(j){return{s:r.status,j:j||{}}},function(){return{s:r.status,j:{}}})}).then(function(o){
    clearTimeout(t);busy(false);
    if(o.s===200&&o.j.ok&&o.j.receipt){review(o.j.receipt,null);return}
    if(o.s===403&&o.j.error==='vip_required'){W.FinVip&&FinVip.open('scan');return}
    if(o.s===429){toastMsg('You have used today\'s Smart scans. Try again tomorrow.','error');return}
    if(o.s===422){toastMsg('That does not look like a receipt. Try again with the whole receipt in view.','error');return}
    fallback(blob);
  }).catch(function(e){clearTimeout(t);busy(false);if(e&&e.name==='AbortError'&&!abortCtl)return;fallback(blob)});
}
function fallback(blob){          // server unreachable or failed: VIP still gets the on-device reader
  toastMsg('Smart scan is not available right now. Using the basic reader.');
  forceQuick=true;try{W.scanReceiptFile({files:[blob],value:''})}finally{forceQuick=false}
}

/* ───────── review panel (the "Extracted details" idea): check it, then it fills the form ───────── */
var rev=null,revDone=null,revPrev=null;
function closeRev(){if(rev){rev.remove();rev=null}D.removeEventListener('keydown',revKey);D.body.classList.remove('sheet-open');try{revPrev&&revPrev.focus()}catch(e){}}
function revKey(e){
  if(!rev)return;
  if(e.key==='Escape'){closeRev();return}
  if(e.key==='Tab'){
    var f=Array.prototype.filter.call(rev.querySelectorAll('button:not([disabled]),input,select'),function(x){return x.offsetParent!==null});
    if(!f.length)return;var a=f[0],z=f[f.length-1],box=rev.querySelector('.vp-sheet');
    if(e.shiftKey&&(D.activeElement===a||D.activeElement===box)){e.preventDefault();z.focus()}
    else if(!e.shiftKey&&D.activeElement===z){e.preventDefault();a.focus()}
  }
}
function catOptions(sel){
  var s=$('exp-cat');if(!s)return '<option value="other-exp">Other</option>';
  return Array.prototype.map.call(s.options,function(o){return '<option value="'+esc(o.value)+'"'+(o.value===sel?' selected':'')+'>'+esc(o.textContent)+'</option>'}).join('');
}
function review(f,onUse){
  closeRev();revPrev=D.activeElement;revDone=onUse;
  f=f||{};var items=Array.isArray(f.items)?f.items:[];
  var cat=f.category;
  if(!cat){var g=(typeof W.finGuessCat==='function')?W.finGuessCat:null;cat=(g&&f.merchant&&g(f.merchant))||'other-exp'}
  var low=f.confidence==='low'||f.conf==='low'||f.conf==='none'||f.total==null;
  var say=low?'I am not sure about the total, so please check it before you use it.':(f.demo?'This is a demo receipt, so you can see how it works.':'Here is what I read. Fix anything that looks off, then I will fill in the form.');
  var meta=[];
  if(f.time)meta.push(['Time',f.time]);
  if(f.receiptNo)meta.push(['Receipt no.',f.receiptNo]);
  if(f.subtotal!=null)meta.push(['Subtotal',money(f.subtotal)]);
  if(f.tax!=null)meta.push(['VAT',money(f.tax)]);
  if(f.address)meta.push(['Address',f.address]);
  var hint=(!vip()&&api())?'<p class="sc-up">Want the items, VAT and address too? VIP&#39;s Smart scan reads them.</p>':'';
  rev=D.createElement('div');rev.className='vp-back';rev.setAttribute('role','dialog');rev.setAttribute('aria-modal','true');rev.setAttribute('aria-label','Check your receipt');
  rev.innerHTML='<div class="vp-sheet sc-sheet"><button type="button" class="vp-x" data-sc="rev-close" aria-label="Close">'+ic('x')+'</button>'
   +'<div class="vp-talk">'+(W.FinVip?FinVip.hero():'')+'<div class="vp-bubble vp-px"><h2 class="vp-t">Your receipt</h2><p class="vp-say">'+esc(say)+'</p></div></div>'
   +'<div class="sc-fields">'
   +'<label class="sc-f wide"><span>Store</span><input id="sc-merchant" type="text" maxlength="60" value="'+esc(f.merchant||'')+'" placeholder="Store name"></label>'
   +'<label class="sc-f'+(low?' warn':'')+'"><span>Total</span><input id="sc-total" type="number" inputmode="decimal" step="0.01" min="0" value="'+(f.total!=null?Number(f.total).toFixed(2):'')+'" placeholder="0.00"></label>'
   +'<label class="sc-f"><span>Date</span><input id="sc-date" type="date" value="'+esc(f.date||td())+'"></label>'
   +'<label class="sc-f wide"><span>Category</span><select id="sc-cat">'+catOptions(cat)+'</select></label></div>'
   +(items.length?'<div class="sc-items-hd"><b>Items I found</b><span>'+items.length+'</span></div><ul class="sc-items">'+items.map(function(i){return '<li><span class="n">'+esc(i.name)+'</span><span class="q">'+(i.qty&&i.qty!==1?'x'+i.qty:'')+'</span><span class="p">'+(i.price!=null?money(i.price):'')+'</span></li>'}).join('')+'</ul>'
     +'<label class="sc-chk"><input type="checkbox" id="sc-note" checked><span>Put the items in the note</span></label>':'')
   +(meta.length?'<dl class="sc-meta">'+meta.map(function(m){return '<div><dt>'+esc(m[0])+'</dt><dd>'+esc(m[1])+'</dd></div>'}).join('')+'</dl>':'')
   +hint
   +'<div class="vp-foot"><button type="button" class="vp-cta" data-sc="use">Use these details</button><button type="button" class="sc-ghost wide" data-sc="retake">Retake photo</button></div>'
   +'<p class="vp-fine">'+(f.items!==undefined&&(f.demo||api())&&vip()?'Your photo was read securely and not saved.':'Read on your phone. Your photo was not uploaded or saved.')+' You always review before anything is added.</p></div>';
  rev._f=f;D.body.appendChild(rev);D.body.classList.add('sheet-open');D.addEventListener('keydown',revKey);
  rev.addEventListener('click',function(e){if(e.target===rev)closeRev()});
  var box=rev.querySelector('.vp-sheet');box.setAttribute('tabindex','-1');box.focus({preventScroll:true});
}
function useReview(){
  var f=rev._f,out={
    merchant:($('sc-merchant').value||'').trim()||'Receipt',
    total:parseFloat($('sc-total').value),date:$('sc-date').value||td(),category:$('sc-cat').value,
    items:f.items||[],withNote:!!($('sc-note')&&$('sc-note').checked),source:f.source}
  ;
  if(!(out.total>0)){$('sc-total').focus();toastMsg('Please enter the total amount.','error');return}
  var cb=revDone;closeRev();
  if(cb)cb(out);else fill(out);
  try{if(W.FinLife){FinLife.addXP(5,'scan',{daily:true});FinLife.celebrate('tick')}}catch(e){}
}
function setVal(id,v){var e=$(id);if(!e)return;e.value=v;try{e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}catch(x){}}
function fill(f){
  setVal('exp-desc',f.merchant);setVal('exp-amount',Number(f.total).toFixed(2));setVal('exp-date',f.date);
  var c=$('exp-cat');if(c&&f.category&&Array.prototype.some.call(c.options,function(o){return o.value===f.category})){c.value=f.category;try{onExpCatChange()}catch(e){}}
  if(f.withNote&&f.items&&f.items.length){
    var names=f.items.slice(0,6).map(function(i){return i.name}).join(', ')+(f.items.length>6?' +'+(f.items.length-6)+' more':'');
    setVal('exp-note','Items: '+names);
  }
  var b=$('receipt-banner');
  if(b){b.style.display='block';b.textContent='Filled in from your receipt. Please check the amount, then tap Add Expense.'}
  try{var form=$('exp-amount');if(form&&form.scrollIntoView)form.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}
}

/* ───────── clicks ───────── */
function onClick(e){
  var b=e.target.closest&&e.target.closest('[data-sc]');if(!b)return;
  var k=b.getAttribute('data-sc');
  if(k==='shoot')shoot();
  else if(k==='cam-close')closeCam();
  else if(k==='gallery'){closeCam();pickFile()}
  else if(k==='cancel'){if(abortCtl){try{abortCtl.abort()}catch(x){}abortCtl=null}busy(false);pendingBlob=null}
  else if(k==='use')useReview();
  else if(k==='retake'){closeRev();start()}
  else if(k==='rev-close')closeRev();
}
function wire(){
  if(wire.done)return;wire.done=true;
  D.addEventListener('click',onClick);
  // the first-time explainer popup: after "Got it" open the camera (not just the file picker)
  var ok0=W.scanReceiptInfoOk;
  if(typeof ok0==='function')W.scanReceiptInfoOk=function(){
    try{localStorage.setItem('finScanInfoSeen','1')}catch(e){}
    var m=$('receipt-info-modal');if(m)m.style.display='none';
    openCamera();
  };
}
W.FinScan={start:start,intercept:intercept,review:review,wire:wire,fill:fill,_smartOK:smartOK};
})();
