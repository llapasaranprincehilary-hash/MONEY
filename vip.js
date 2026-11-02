/* FINUITY VIP: limits for the free plan + the upgrade sheet.
   Free plan:  up to 6 accounts, ₱150,000 total balance, single entries up to ₱500,000.
   VIP plan:   20 accounts, ₱10,000,000, 3 streak freezes, a star on Fin.
   Prepaid plans (1 / 3 / 12 months, no auto-renew). Prices, limits and the checkout address are all in CFG below.

   HOW THE LIMIT WORKS
   - save() is wrapped. If a change would push a FREE user over a limit (more accounts, more total balance, or a
     bigger single entry than before) the change is undone and the upgrade sheet opens.
   - People who already have more than the limit are never locked out or trimmed: they just can not add MORE.
   - Whether someone is VIP comes from Firestore  entitlements/{uid}  (written ONLY by the payment webhook on the server,
     see backend/). It is deliberately NOT stored in the app's own data, so it can not be edited or exported.
   Honest limit: this is enforced in the browser. It stops casual "let me type 100 million" fun; a determined developer
   with devtools could get around it. Anything that must be bulletproof needs a server-side check. */
(function(){
'use strict';
var W=window,D=document;

/* ───────── settings you can change ───────── */
var CFG={
  free:{wallets:6,balance:150000,amount:500000,target:5000000,freezes:2},
  vip: {wallets:20,balance:10000000,amount:10000000,target:50000000,freezes:3},
  scanTrial:3,                               // free receipt scans before it becomes a VIP perk (0 = VIP only)
  base:49,                                   // price of one month; the other plans are compared against it
  plans:[                                    // shown top to bottom; the first one is pre-selected
    {id:'m12',months:12,price:399,tag:'Best value'},
    {id:'m3', months:3, price:129,tag:''},
    {id:'m1', months:1, price:49, tag:''}
  ],
  api:{checkout:''},                         // paste the createCheckout function URL here (backend/SETUP-PAYMENTS.md)
  methodsText:'GCash or QR Ph',
  demoFlag:false,                            // leave false. Only automated tests turn this on
  help:''                                    // e.g. 'support@yourdomain.com', shown if a payment has a problem
};

/* ───────── helpers ───────── */
function S(){try{return state}catch(e){return null}}
function $(id){return D.getElementById(id)}
function ic(n){return W.FinIcons?FinIcons.ic(n):''}
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function peso(n){return '₱'+Math.round(n).toLocaleString('en-US')}
function pk(n){n=Math.round(n);if(n>=1e6)return '₱'+(Math.round(n/1e5)/10)+'M';if(n>=1e4)return '₱'+Math.round(n/1e3)+'k';if(n>=1e3)return '₱'+(Math.round(n/100)/10)+'k';return '₱'+n}
function uid(){try{return (cloudUser&&cloudUser.uid)||''}catch(e){return ''}}
// Demo mode (pretend VIP, no payment) works ONLY when the page is opened from localhost. On a real website it is off,
// so nobody can switch it on from the browser console. (CFG.demoFlag exists only for automated tests.)
function demoOK(){try{return /^(localhost|127\.0\.0\.1)$/.test(location.hostname)||(CFG.demoFlag===true&&localStorage.getItem('finVipDemo')==='1')}catch(e){return false}}
function plan(id){for(var i=0;i<CFG.plans.length;i++)if(CFG.plans[i].id===id)return CFG.plans[i];return CFG.plans[0]}
function perMonth(p){return p.price/p.months}
function savePct(p){return Math.round((1-p.price/(CFG.base*p.months))*100)}
function msLabel(m){return m===1?'1 month':m+' months'}

/* ───────── who is VIP (read from the server copy, cached for offline) ───────── */
var ENT='finVipEnt';
function ent(){
  try{
    var e=JSON.parse(localStorage.getItem(ENT)||'null');
    if(!e||e.uid!==uid())return null;
    if(e.demo&&!demoOK())return null;       // a demo grant never counts outside local testing
    return e;
  }catch(x){return null}
}
function setEnt(e){try{localStorage.setItem(ENT,JSON.stringify(e))}catch(x){}}
function isVip(){var e=ent();return !!(e&&e.until>Date.now())}
function daysLeft(){var e=ent();return e&&e.until>Date.now()?Math.ceil((e.until-Date.now())/864e5):0}
function limits(){return isVip()?CFG.vip:CFG.free}
function freezeCap(){return limits().freezes}

/* ───────── receipt scanner: 3 free tries, then VIP ───────── */
function trialKey(){return 'finScanTrial:'+(uid()||'guest')}
function scansUsed(){try{return +localStorage.getItem(trialKey())||0}catch(e){return 0}}
function scansLeft(){return Math.max(0,CFG.scanTrial-scansUsed())}
function canScan(){return isVip()||scansLeft()>0}
function useScan(){try{localStorage.setItem(trialKey(),String(scansUsed()+1))}catch(e){}}
function renderScanPill(){
  var btn=$('scan-receipt-btn');if(!btn)return;
  var old=btn.querySelector('.vp-pill'),vip=isVip(),left=scansLeft();
  var txt=vip?'':(left>0?left+' free':'VIP');
  if(!txt){if(old)old.remove();return}
  if(!old){old=D.createElement('span');old.className='vp-pill';btn.appendChild(old)}
  if(old.textContent!==txt)old.textContent=txt;
  old.classList.toggle('lock',left<=0);
  btn.setAttribute('aria-label',left>0?'Scan receipt, '+left+' free scans left':'Scan receipt, VIP feature');
}

/* ───────── measuring the account ───────── */
function metrics(s){
  s=s||{};
  var ws=s.wallets||[],assets=0,mx=0,tg=0;
  ws.forEach(function(w){var b=+w.balance||0;if(b>0&&w.type!=='credit')assets+=b});
  ['income','expenses','loans'].forEach(function(k){(s[k]||[]).forEach(function(e){var a=Math.abs(+e.amount)||0;if(a>mx)mx=a})});
  (s.goals||[]).forEach(function(g){mx=Math.max(mx,+g.saved||0);tg=Math.max(tg,+g.target||0)});   // a goal's target is a plan, not money held
  return{n:ws.length,assets:Math.round(assets*100)/100,max:mx,tg:tg};
}
function usage(){var m=metrics(S()),L=limits();return{n:m.n,assets:m.assets,wl:L.wallets,bl:L.balance,pw:m.n/L.wallets,pb:m.assets/L.balance}}
// only a change that makes things BIGGER than before counts as going over
function violation(now,base,lim){
  var L=lim||limits();
  if(now.n>L.wallets&&now.n>base.n)return{kind:'wallets'};
  if(now.assets>L.balance&&now.assets>base.assets+0.005)return{kind:'balance',value:now.assets};
  if(now.max>L.amount&&now.max>base.max+0.005)return{kind:'amount'};
  if(now.tg>L.target&&now.tg>(base.tg||0)+0.005)return{kind:'target'};
  return null;
}
function reasonText(v){
  var L=limits(),vip=isVip();
  if(!v)return '';
  if(v.kind==='wallets')return vip?'VIP allows up to '+L.wallets+' accounts.':'The free plan has room for '+L.wallets+' accounts. VIP raises it to '+CFG.vip.wallets+'.';
  if(v.kind==='balance')return 'That would bring your total balance to '+peso(v.value||0)+'. '+(vip?'VIP tracks up to ':'The free plan tracks up to ')+peso(L.balance)+' in total.';
  if(v.kind==='amount')return (vip?'VIP accepts':'The free plan accepts')+' single entries up to '+peso(L.amount)+'.';
  if(v.kind==='scan')return 'Receipt scanning is a VIP perk'+(CFG.scanTrial?'. Your '+CFG.scanTrial+' free scans are used up.':'.')+' Smart scan reads the store, items, VAT and total from a photo.';
  if(v.kind==='target')return (vip?'VIP accepts':'The free plan accepts')+' savings goals up to '+peso(L.target)+'.';
  if(v.kind==='nudge')return 'You are getting close to the free limits. VIP gives you room to keep growing.';
  return '';
}

/* ───────── the guard on save() ───────── */
var blockedAt=0,bypassUntil=0,rolling=false;
function blocked(){return blockedAt&&Date.now()-blockedAt<600}
function wrapGuards(){
  if(wrapGuards.done)return;
  var orig=W.save;if(typeof orig!=='function')return;
  wrapGuards.done=true;
  W.save=function(){
    try{
      var raw=localStorage.getItem('kwentadoV1');           // the last saved copy = the last good copy
      if(raw&&S()){
        // right after a backup restore only the hard VIP ceiling applies, so nobody's own data is rejected
        var v=violation(metrics(S()),metrics(JSON.parse(raw)),Date.now()<bypassUntil?CFG.vip:null);
        if(v){
          blockedAt=Date.now();
          rolling=true;try{replaceState(JSON.parse(raw))}catch(e){}rolling=false;
          try{render()}catch(e){}
          setTimeout(function(){openSheet(v)},60);
          return;
        }
      }
    }catch(e){}
    return orig.apply(this,arguments);
  };
  var r0=W.replaceState;
  if(typeof r0==='function')W.replaceState=function(){if(!rolling)bypassUntil=Date.now()+2500;return r0.apply(this,arguments)};
  // the undone action must not trigger celebrations, XP, or "added!" messages
  var d0=W.dispatchEvent.bind(W);
  W.dispatchEvent=function(e){if(blocked()&&e&&/^fin:/.test(e.type))return true;return d0(e)};
  var t0=W.toast;
  if(typeof t0==='function')W.toast=function(){if(blocked())return;return t0.apply(this,arguments)};
  // the receipt scanner: unlimited for VIP, a few free tries for everyone else
  var rs0=W.scanReceiptStart;
  if(typeof rs0==='function')W.scanReceiptStart=function(){
    if(!canScan()){openSheet({kind:'scan'});return}
    if(W.FinScan&&FinScan.start){FinScan.start();return}          // camera + review (scan.js)
    return rs0.apply(this,arguments);
  };
  var rf0=W.scanReceiptFile;
  if(typeof rf0==='function')W.scanReceiptFile=function(inp){
    if(!canScan()){try{inp.value=''}catch(e){}openSheet({kind:'scan'});return}
    if(W.FinScan&&FinScan.intercept&&FinScan.intercept(inp))return;   // VIP: Smart scan on the server
    return rf0.apply(this,arguments);
  };
  var ra0=W.rcApply;
  function applyScan(r,raw,cat){
    var out=ra0.call(null,r,raw);
    if(cat){var c=$('exp-cat');if(c&&Array.prototype.some.call(c.options,function(o){return o.value===cat})){c.value=cat;try{onExpCatChange()}catch(e){}}}
    if(!isVip()){                                    // a free try is used only when the person actually uses the result
      useScan();renderScanPill();
      if(scansLeft()===0&&CFG.scanTrial){try{FinLife.tell("That was your last free scan. VIP makes receipt scanning unlimited, and Smart scan also reads the items.",[{label:'See VIP',kind:'custom',onClick:function(){openSheet({kind:'scan'})}},{label:'Later',kind:'custom',onClick:function(){}}],{mood:'happy',rank:2,wait:4000})}catch(e){}}
      else if(scansLeft()>0){try{toast(scansLeft()+' free scan'+(scansLeft()===1?'':'s')+' left')}catch(e){}}
    }
    return out;
  }
  if(typeof ra0==='function')W.rcApply=function(r,raw){
    if(W.FinScan&&FinScan.review){                   // show the review panel first, then fill the form
      FinScan.review({source:'quick',merchant:r.merchant,total:r.amount||null,date:r.date,conf:r.amountConf},function(f){
        r.merchant=f.merchant;r.amount=f.total;r.date=f.date;r.amountConf='high';applyScan(r,raw,f.category);
      });
      return;
    }
    return applyScan(r,raw);
  };
  if(W.FinScan&&FinScan.wire)FinScan.wire();
  // friendlier early checks in the wallet screens
  var o0=W.openWalModal;
  if(typeof o0==='function')W.openWalModal=function(mode){
    if(mode==='add'&&usage().n>=limits().wallets){openSheet({kind:'wallets'});return}
    return o0.apply(this,arguments);
  };
  var s0=W.walSave;
  if(typeof s0==='function')W.walSave=function(){
    try{
      var wd=WD;
      if(wd&&wd.type!=='credit'){
        var raw=$('wal-bal').value,num=raw===''?0:parseFloat(raw);
        if(!isNaN(num)&&num>0){
          var others=0;(S().wallets||[]).forEach(function(w){if(w.id!==wd.id&&w.type!=='credit'&&(+w.balance||0)>0)others+=+w.balance});
          var next=others+num,cur=metrics(S()).assets;
          if(next>limits().balance&&next>cur+0.005){
            var e=$('wal-err');if(e)e.textContent='Free plan limit: '+peso(limits().balance)+' total balance.';
            openSheet({kind:'balance',value:next});return;
          }
        }
      }
    }catch(e){}
    return s0.apply(this,arguments);
  };
}

/* ───────── live VIP status from the server ───────── */
var unsub=null,listenUid='',waiting=0;
function listen(){
  var u=uid();
  if(!u||u===listenUid)return;
  var db=W.fbDb;if(!db)return;
  listenUid=u;
  try{if(unsub)unsub()}catch(e){}
  try{
    unsub=db.collection('entitlements').doc(u).onSnapshot(function(snap){
      var d=snap.exists?snap.data():null,was=isVip(),until=d?(+d.until||0):0;
      var cur=ent();
      if(cur&&cur.demo&&!d)until=cur.until;       // keep a local demo grant until a real record exists
      setEnt({uid:u,until:until,plan:d?(d.plan||''):(cur&&cur.plan)||'',demo:(cur&&cur.demo&&!d)||false,at:Date.now()});
      if(!was&&isVip())upgraded();
      renderAll();
    },function(){/* offline or rules not set up yet: keep the cached answer */});
  }catch(e){}
}
function upgraded(){
  waiting=0;
  closeSheet();
  try{FinLife.celebrate('level')}catch(e){}
  try{toast('Welcome to VIP!')}catch(e){}
  try{FinLife.tell("You're VIP now! Thank you for backing a student-made app. More room, 3 streak freezes, and a star on my badge.",null,{mood:'happy',rank:5})}catch(e){}
}

/* ───────── buying ───────── */
var sel=CFG.plans[0].id,busy=false;
function setMsg(t,ok){var m=D.querySelector('.vp-msg');if(m){m.textContent=t||'';m.className='vp-msg'+(ok?' ok':'')}}
function setBusy(on){busy=on;var b=D.querySelector('.vp-cta');if(b){b.disabled=on;b.textContent=on?'Opening secure checkout…':ctaText()}}
function ctaText(){var p=plan(sel);return isVip()?'Add '+msLabel(p.months)+' for ₱'+p.price:'Get VIP for ₱'+p.price}
function buy(){
  if(busy)return;
  var p=plan(sel),u=uid();
  if(!u){setMsg('Please sign in first.');return}
  try{if(cloudUser.isAnonymous){setMsg('Create a free account first so your VIP stays with you.');return}}catch(e){}
  if(CFG.api.checkout){
    setBusy(true);setMsg('');
    cloudUser.getIdToken().then(function(tok){
      return fetch(CFG.api.checkout,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+tok},body:JSON.stringify({plan:p.id,returnUrl:location.origin+location.pathname})});
    }).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j}})}).then(function(o){
      if(o.ok&&o.j&&o.j.url){try{localStorage.setItem('finVipPending',String(Date.now()))}catch(e){}location.href=o.j.url;return}
      setBusy(false);setMsg((o.j&&o.j.error)||'Could not start checkout. Please try again.');
    }).catch(function(){setBusy(false);setMsg('Could not reach the payment server. Check your connection and try again.')});
    return;
  }
  if(demoOK()){
    var base=Math.max(Date.now(),(ent()&&ent().until)||0);
    setEnt({uid:u,until:base+p.months*30*864e5,plan:p.id,demo:true,at:Date.now()});
    upgraded();renderAll();return;
  }
  setMsg('Payments are not switched on yet. Please check back very soon.');
}

/* ───────── the upgrade sheet ───────── */
var sheet=null,prevFocus=null;
function closeSheet(){D.body.classList.remove('sheet-open');if(sheet){sheet.remove();sheet=null;D.removeEventListener('keydown',onKey);try{prevFocus&&prevFocus.focus()}catch(e){}}}
function onKey(e){
  if(!sheet)return;
  if(e.key==='Escape'){closeSheet();return}
  if(e.key==='Tab'){
    var f=Array.prototype.filter.call(sheet.querySelectorAll('button:not([disabled]),[tabindex="0"]'),function(x){return x.offsetParent!==null});
    if(!f.length)return;
    var first=f[0],last=f[f.length-1],box=sheet.querySelector('.vp-sheet');
    if(e.shiftKey&&(D.activeElement===first||D.activeElement===box)){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&D.activeElement===last){e.preventDefault();first.focus()}
    return;
  }
  if((e.key==='ArrowLeft'||e.key==='ArrowRight')&&D.activeElement&&D.activeElement.getAttribute('data-vp')==='plan'){
    var ps=Array.prototype.slice.call(sheet.querySelectorAll('.vp-plan')),i=ps.indexOf(D.activeElement),n=ps[(i+(e.key==='ArrowRight'?1:ps.length-1))%ps.length];
    e.preventDefault();n.focus();n.click();
  }
}
function pips(on,total,cls){var h='<span class="vp-pips'+(cls?' '+cls:'')+'" aria-hidden="true">';for(var i=0;i<total;i++)h+='<i'+(i<on?' class="on"':'')+'></i>';return h+'</span>'}
function meters(){
  var u=usage(),acc=Math.min(u.wl,8),accOn=Math.min(acc,Math.round(u.pw*acc)),balOn=Math.min(10,Math.round(u.pb*10));
  return '<div class="vp-space"><div class="vp-row'+(u.pw>=1?' full':'')+'"><span>Accounts</span>'+pips(accOn,acc)+'<b>'+u.n+' of '+u.wl+'</b></div>'
    +'<div class="vp-row'+(u.pb>=1?' full':'')+'"><span>Balance</span>'+pips(balOn,10,'blocks')+'<b>'+pk(u.assets)+' of '+pk(u.bl)+'</b></div></div>';
}
// the real Fin (as he looks right now) with a small gold halo; a plain coin if he is not on screen
function finHero(){
  var src=$('fin-sprite');
  if(!src)return '<div class="vp-fin"><div class="vp-coin-fb"></div></div>';
  var c=src.cloneNode(true);
  c.removeAttribute('id');c.setAttribute('class','finc');c.setAttribute('data-anim','happy');   // a calm pose: drop whatever idle/spin state the live Fin is in
  c.setAttribute('viewBox','0 -6 32 38');c.removeAttribute('style');c.removeAttribute('width');c.removeAttribute('height');
  var halo='<g>'+[[12,-5,8],[10,-4,2],[20,-4,2],[12,-3,8]].map(function(r){return '<rect x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="1" fill="#ffd84a"/>'}).join('')+'</g>';
  c.insertAdjacentHTML('afterbegin',halo);
  return '<div class="vp-fin">'+c.outerHTML+'</div>';
}
function coins(n){var h='<span class="vp-stack" aria-hidden="true">';for(var i=0;i<n;i++)h+='<i class="vp-coin" style="--i:'+i+'"></i>';return h+'</span>'}
function planHTML(p){
  var on=p.id===sel,save=CFG.base*p.months-p.price,day=p.price/(p.months*30),n=p.months>=12?6:p.months>=3?3:1;
  var tag=save>0?'<span class="vp-tag'+(p.tag?' best':'')+'">save ₱'+save+'</span>':'<span class="vp-tag" style="visibility:hidden">.</span>';
  return '<button type="button" class="vp-plan vp-px'+(on?' sel':'')+'" role="radio" aria-checked="'+on+'" data-vp="plan" data-plan="'+p.id+'" aria-label="'+msLabel(p.months)+', ₱'+p.price+(p.tag?', '+p.tag.toLowerCase():'')+'">'
   +coins(n)+'<span class="vp-pn">'+msLabel(p.months)+'</span>'
   +'<span class="vp-pp">'+(save>0?'<s>₱'+CFG.base*p.months+'</s>':'')+'<b>₱'+p.price+'</b></span>'
   +'<span class="vp-pd">₱'+day.toFixed(2)+' a day</span>'+tag+'</button>';
}
function openSheet(v){
  closeSheet();
  renderAll();
  prevFocus=D.activeElement;
  var vip=isVip(),why=reasonText(v),ceiling=vip&&v&&v.kind!=='nudge';   // a VIP who hits the top limit: more time would not help
  var line=why||(vip?'Thank you for keeping this student-made app alive.':"Hi, I'm Fin. VIP costs less than a milk tea a month, and it keeps this app alive.");
  sheet=D.createElement('div');sheet.className='vp-back';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-modal','true');sheet.setAttribute('aria-label','FINUITY VIP');
  var status=vip&&!ceiling?'<p class="vp-status">You are VIP with <b>'+daysLeft()+' days</b> left. Anything you add stacks on top.</p>':'';
  sheet.innerHTML='<div class="vp-sheet"><button type="button" class="vp-x" data-vp="close" aria-label="Close">'+ic('x')+'</button>'
   +'<div class="vp-talk">'+finHero()+'<div class="vp-bubble vp-px"><h2 class="vp-t">FINUITY VIP</h2><p class="vp-say vp-why">'+esc(line)+'</p></div></div>'
   +status
   +(ceiling?'<div class="vp-foot"><button type="button" class="vp-cta" data-vp="close">Got it</button></div>'
   :(vip?'':meters())
   +'<div class="vp-plans" role="radiogroup" aria-label="Choose a plan">'+CFG.plans.slice().reverse().map(planHTML).join('')+'</div>'
   +'<ul class="vp-perks"><li>'+ic('wallet')+CFG.vip.wallets+' accounts</li><li>'+ic('chart')+peso(CFG.vip.balance)+' tracked</li><li>'+ic('camera')+'Smart receipt scanner</li><li>'+ic('snow')+CFG.vip.freezes+' streak freezes</li><li>'+ic('star')+'A star on Fin</li></ul>'
   +'<div class="vp-foot"><button type="button" class="vp-cta" data-vp="buy">'+esc(ctaText())+'</button><div class="vp-msg" role="alert"></div></div>'
   +'<p class="vp-fine">One payment with '+esc(CFG.methodsText)+'. No auto-renew, no surprise charges, and nothing you already have is ever deleted. By buying you agree to the <button type="button" class="vp-link" data-vp="legal">Terms and refund policy</button>.'+(CFG.help?' Problem with a payment? '+esc(CFG.help)+'.':'')+(demoOK()&&!CFG.api.checkout?' <b>Demo mode: no money is charged.</b>':'')+'</p>')
   +'</div>';
  D.body.appendChild(sheet);D.body.classList.add('sheet-open');
  sheet.addEventListener('click',function(e){if(e.target===sheet)closeSheet()});
  D.addEventListener('keydown',onKey);
  var box=sheet.querySelector('.vp-sheet');box.setAttribute('tabindex','-1');box.focus({preventScroll:true});
}

/* ───────── cards: settings + balances page + Fin's nudge ───────── */
function renderCard(){
  var el=$('vip-card');if(!el)return;
  var s=S();if(!s||!s.username){el.innerHTML='';el._h='';return}
  var h,vip=isVip();
  if(vip){
    h='<button type="button" class="vp-card vip" data-vp="open">'+'<span class="vp-ci">'+ic('crown')+'</span><span class="vp-cm"><b>VIP</b><span>'+daysLeft()+' days left</span></span><span class="vp-cb">Add time</span></button>';
  }else{
    var u=usage();
    h='<button type="button" class="vp-card" data-vp="open"><span class="vp-ci">'+ic('crown')+'</span><span class="vp-cm"><b>Free plan</b><span>'+u.n+' of '+u.wl+' accounts · '+peso(u.assets)+' of '+peso(u.bl)+'</span>'
     +'<span class="vp-bar mini'+(Math.max(u.pw,u.pb)>=1?' full':Math.max(u.pw,u.pb)>=0.8?' warn':'')+'"><i style="width:'+Math.min(100,Math.round(Math.max(u.pw,u.pb)*100))+'%"></i></span></span><span class="vp-cb">Go VIP</span></button>';
  }
  if(waiting&&!vip)h='<div class="vp-card wait"><span class="vp-ci">'+ic('clock')+'</span><span class="vp-cm"><b>Confirming your payment…</b><span>This usually takes a few seconds.</span></span></div>';
  if(el._h!==h){el._h=h;el.innerHTML=h}
}
function renderMeter(){
  var el=$('vip-meter');if(!el)return;
  var s=S();if(!s||!s.username||isVip()){if(el._h){el._h='';el.innerHTML=''}return}
  var u=usage(),h='<button type="button" class="vp-strip" data-vp="open"><span class="vp-st-i">'+ic('crown')+'</span><span class="vp-st-t">Free plan: '+u.n+' of '+u.wl+' accounts, '+pk(u.assets)+' of '+pk(u.bl)+'</span><b>Upgrade</b></button>';
  if(el._h!==h){el._h=h;el.innerHTML=h}
}
function renderAll(){try{renderCard();renderMeter();renderScanPill();if(W.FinLife)FinLife.applyFin()}catch(e){console.error('vip',e)}}
function nudge(){
  if(isVip())return;
  var u=usage(),top=Math.max(u.pw,u.pb);
  if(top<0.8||top>=1.5)return;
  var k='finVipNudge',last=+localStorage.getItem(k)||0;
  if(Date.now()-last<7*864e5)return;
  var pct=Math.min(99,Math.round(top*100));
  var ok=false;
  try{ok=!!(W.FinLife&&FinLife.tell("Heads up: you're at "+pct+"% of the free limit. No rush and nothing gets deleted, but VIP gives you room to grow.",[{label:'See VIP',kind:'custom',onClick:function(){openSheet({kind:'nudge'})}},{label:'Not now',kind:'custom',onClick:function(){}}],{mood:'happy',rank:1,wait:6000}))}catch(e){}
  if(ok)try{localStorage.setItem(k,String(Date.now()))}catch(e){}
}

/* ───────── events + wiring ───────── */
function onClick(e){
  var b=e.target.closest&&e.target.closest('[data-vp]');if(!b)return;
  var k=b.getAttribute('data-vp');
  if(k==='open'){openSheet(null)}
  else if(k==='close'){closeSheet()}
  else if(k==='plan'){
    sel=b.getAttribute('data-plan');
    Array.prototype.forEach.call(D.querySelectorAll('.vp-plan'),function(x){var on=x.getAttribute('data-plan')===sel;x.classList.toggle('sel',on);x.setAttribute('aria-checked',on)});
    var c=D.querySelector('.vp-cta');if(c&&!busy)c.textContent=ctaText();
  }
  else if(k==='buy'){buy()}
  else if(k==='legal'){try{openLegal('terms')}catch(x){}}      // the legal screen opens on top of the sheet
}
function afterCheckout(){
  try{
    var q=new URLSearchParams(location.search),r=q.get('vip');
    if(!r)return;
    q.delete('vip');history.replaceState(null,'',location.pathname+(q.toString()?'?'+q.toString():'')+location.hash);
    if(r==='success'){waiting=1;setTimeout(function(){if(waiting&&!isVip()){waiting=0;renderAll();try{toast('Still confirming. If VIP does not show up in a few minutes, contact support.','error')}catch(e){}}},90000)}
    else if(r==='cancel'){try{toast('Checkout cancelled. You were not charged.')}catch(e){}}
  }catch(e){}
}
var started=false;
function tick(){
  var s=S();if(!s||!s.username)return;
  if(!started){started=true;D.addEventListener('click',onClick);afterCheckout();setTimeout(nudge,12000)}
  wrapGuards();listen();renderAll();
}
W.FinVip={demoOK:demoOK,hero:finHero,canScan:canScan,scansLeft:scansLeft,tick:tick,isVip:isVip,open:function(reason){openSheet(reason?{kind:reason}:null)},limits:limits,usage:usage,freezeCap:freezeCap,config:CFG,daysLeft:daysLeft,_metrics:metrics,_violation:violation};
})();
