/* FINUITY Bills first: pay the bills, and what is left is yours.

   Bills live in state.bills. A bill counts as paid for the month when an expense paying it exists this month:
   one logged with "Mark paid" (expense.billId) or one the person logged by hand under the same name.
   Because "paid" is read from the expenses, deleting that expense un-pays the bill and nothing can drift.

   Yours to spend = income this month - everything logged this month - bills still to pay.
   Marking a bill paid moves money from "still to pay" to "spent", so that number does not change. */
(function(){
'use strict';
var W=window,D=document;
function S(){try{return state}catch(e){return null}}
function $(id){return D.getElementById(id)}
function r2(n){return Math.round(n*100)/100}
function esc(s){return W.esc?W.esc(s):String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function money(n){return W.fmt?W.fmt(n):String(n)}
function mv(n){return '<span class="mv">'+money(n)+'</span>'}
function short(n){return money(n).replace(/\.00$/,'')}

/* ───────── month maths (same month rules as the dashboard) ───────── */
function nowD(){return new Date()}
function inMonth(ds){var d=W.ldate?W.ldate(ds):new Date(ds),n=nowD();return !isNaN(d)&&d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear()}
function daysInMonth(){var n=nowD();return new Date(n.getFullYear(),n.getMonth()+1,0).getDate()}
function dueDay(b){return Math.min(b.day,daysInMonth())}
function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])}
function monthName(){try{return MONTH_ORDER[nowD().getMonth()]}catch(e){return ''}}

function list(){
  var s=S();if(!s)return [];
  if(!Array.isArray(s.bills))s.bills=[];
  return s.bills.filter(function(b){return b&&typeof b.name==='string'&&b.name&&b.amount>0&&b.day>=1&&b.day<=31});
}
function paidExpense(b,exps){
  var key=b.name.trim().toLowerCase(),byName=null;
  for(var i=0;i<exps.length;i++){
    var e=exps[i];
    if(e.billId===b.id)return e;
    if(!byName&&!e.billId&&String(e.desc||'').trim().toLowerCase()===key)byName=e;
  }
  return byName;
}
function view(){
  var s=S(),n=nowD(),bills=list(),mname=monthName();
  var exps=(s.expenses||[]).filter(function(e){return inMonth(e.date)});
  var inc=(s.income||[]).filter(function(i){return i.month===mname&&(i.year||n.getFullYear())===n.getFullYear()}).reduce(function(a,b){return a+b.amount},0);
  var exp=exps.reduce(function(a,b){return a+b.amount},0),day=n.getDate();
  var items=bills.map(function(b){
    var e=paidExpense(b,exps),d=dueDay(b),st;
    if(e)st='paid';else if(d<day)st='over';else if(d===day)st='today';else if(d-day<=3)st='soon';else st='later';
    return {b:b,e:e,due:d,st:st,val:e?e.amount:b.amount};
  }).sort(function(x,y){return x.due-y.due||x.b.name.localeCompare(y.b.name)});
  var paid=0,unpaid=0,paidN=0;
  items.forEach(function(it){if(it.e){paid+=it.e.amount;paidN++}else unpaid+=it.b.amount});
  paid=r2(paid);unpaid=r2(unpaid);
  return {items:items,inc:inc,exp:exp,paid:paid,unpaid:unpaid,paidN:paidN,bills:r2(paid+unpaid),other:Math.max(0,r2(exp-paid)),yours:r2(inc-exp-unpaid),month:mname};
}
/* what the dashboard subtracts from "left to spend": bills not paid yet this month */
function unpaidTotal(){
  var s=S();if(!s)return 0;
  var bills=list();if(!bills.length)return 0;
  var exps=(s.expenses||[]).filter(function(e){return inMonth(e.date)}),t=0;
  bills.forEach(function(b){if(!paidExpense(b,exps))t+=b.amount});
  return r2(t);
}
function walletName(id){var w=((S()||{}).wallets||[]).filter(function(x){return x.id===id})[0];return w?w.label:''}

/* ───────── the pizza ───────── */
function polar(a,R){return [100+R*Math.cos(a),100+R*Math.sin(a)]}
function slicePath(a0,a1,R){
  var p0=polar(a0,R),p1=polar(a1,R),large=(a1-a0)>Math.PI?1:0;
  return 'M100 100L'+p0[0].toFixed(2)+' '+p0[1].toFixed(2)+'A'+R+' '+R+' 0 '+large+' 1 '+p1[0].toFixed(2)+' '+p1[1].toFixed(2)+'Z';
}
function pizza(v){
  var segs=[],R=84;
  v.items.forEach(function(it){segs.push({v:it.val,k:it.st==='paid'?'paid':(it.st==='over'?'over':'bill')})});
  if(v.other>0)segs.push({v:v.other,k:'other'});
  if(v.yours>0)segs.push({v:v.yours,k:'yours'});
  var total=segs.reduce(function(a,x){return a+x.v},0);
  var svg='<svg class="pz" viewBox="0 0 200 200" aria-hidden="true" focusable="false"><circle class="pz-crust" cx="100" cy="100" r="96"/><circle class="pz-plate" cx="100" cy="100" r="88"/>';
  var hasInc=v.inc>0&&total>0;
  if(hasInc){
    var a=-Math.PI/2;
    segs.forEach(function(g){
      var frac=g.v/total,a1=a+frac*Math.PI*2;
      if(frac<0.004){a=a1;return}
      if(frac>0.9995)svg+='<circle class="pz-s pz-'+g.k+'" cx="100" cy="100" r="'+R+'"/>';
      else svg+='<path class="pz-s pz-'+g.k+'" d="'+slicePath(a,a1,R)+'"/>';
      if(g.k==='yours'&&frac>0.1){
        var mid=(a+a1)/2,perp=mid+Math.PI/2;
        [[50,0],[64,9],[64,-9]].forEach(function(d){var c=polar(mid,d[0]);svg+='<circle class="pz-pep" cx="'+(c[0]+Math.cos(perp)*d[1]).toFixed(1)+'" cy="'+(c[1]+Math.sin(perp)*d[1]).toFixed(1)+'" r="4.2"/>'});
      }
      a=a1;
    });
  }
  var neg=v.yours<0;
  svg+='<circle class="pz-hub" cx="100" cy="100" r="37"/>';
  if(hasInc){
    svg+='<text class="pz-lbl" x="100" y="93" text-anchor="middle">'+(neg?'Over by':'Yours')+'</text>'
       +'<text class="pz-amt'+(neg?' neg':'')+'" x="100" y="117" text-anchor="middle">'+esc(short(Math.abs(v.yours)))+'</text>'
       +'<text class="pz-dots" x="100" y="117" text-anchor="middle">•••</text>';
  }else{
    svg+='<text class="pz-lbl" x="100" y="97" text-anchor="middle">Add this</text><text class="pz-lbl" x="100" y="112" text-anchor="middle">month\'s income</text>';
  }
  return svg+'</svg>';
}

/* ───────── the card ───────── */
function dueText(it){
  var e=it.e;
  if(it.st==='paid'){var d=W.ldate?W.ldate(e.date):null;return 'Paid'+(d&&!isNaN(d)?' '+d.toLocaleDateString('en-PH',{month:'short',day:'numeric'}):'')}
  if(it.st==='over')return 'Overdue since the '+ord(it.due);
  if(it.st==='today')return 'Due today';
  if(it.st==='soon'){var n=it.due-nowD().getDate();return n===1?'Due tomorrow':'Due in '+n+' days'}
  return 'Due the '+ord(it.due);
}
var CHECK='<svg class="bl-chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function recurringCount(){
  var s=S(),seen={},n=0,have={};
  list().forEach(function(b){have[b.name.trim().toLowerCase()]=1});
  ((s&&s.expenses)||[]).forEach(function(e){if(!e.recurring)return;var k=String(e.desc||'').trim().toLowerCase();if(k&&!seen[k]&&!have[k]){seen[k]=1;n++}});
  return n;
}
function cardHTML(){
  var v=view(),s=S();
  if(!v.items.length){
    var rc=recurringCount();
    return '<div class="bl-card bl-empty"><div class="bl-empty-pz">'+pizza({items:[],inc:0,other:0,yours:0})+'</div>'
      +'<div class="bl-empty-b"><div class="bl-eyebrow">Bills first</div><div class="bl-title">Pay your bills first. The rest is yours.</div>'
      +'<div class="bl-sub">Add rent, kuryente, Wi-Fi, load. Finuity sets them aside, so your "left to spend" is honest.</div>'
      +'<div class="bl-actions"><button type="button" class="bl-cta" data-bl-add>Add your first bill</button>'
      +(rc?'<button type="button" class="bl-link" data-bl-import>Use my '+rc+' recurring expense'+(rc>1?'s':'')+'</button>':'')+'</div></div></div>';
  }
  var rows=v.items.map(function(it){
    var w=walletName(it.b.wallet),sub=dueText(it)+(w&&it.st!=='over'?' · '+esc(w):'');
    var act=it.e?'<span class="bl-done">'+CHECK+'Paid</span>':'<button type="button" class="bl-pay" data-bl-pay="'+it.b.id+'" aria-label="Mark '+esc(it.b.name)+' as paid">Mark paid</button>';
    return '<div class="bl-row s-'+it.st+'"><button type="button" class="bl-edit" data-bl-edit="'+it.b.id+'"><span class="bl-dot" aria-hidden="true"></span>'
      +'<span class="bl-main"><span class="bl-name">'+esc(it.b.name)+'</span><span class="bl-due">'+sub+'</span></span>'
      +'<span class="bl-amt">'+mv(it.val)+'</span></button>'+act+'</div>';
  }).join('');
  var neg=v.yours<0;
  var summary='Income '+short(v.inc)+', bills '+short(v.bills)+', everything else '+short(v.other)+'. '+(neg?'Over by ':'Yours to spend: ')+short(Math.abs(v.yours))+'.';
  return '<div class="bl-card">'
    +'<div class="bl-hd"><div><div class="bl-eyebrow">Bills first</div><div class="bl-title">What\'s truly yours in '+esc(v.month)+'</div></div>'
    +'<button type="button" class="bl-add" data-bl-add aria-label="Add a bill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Bill</button></div>'
    +'<div class="bl-pzwrap">'+pizza(v)+'<ul class="bl-key" aria-hidden="true"><li><i class="k-bill"></i>Bills</li><li><i class="k-paid"></i>Paid</li><li><i class="k-other"></i>Everything else</li><li><i class="k-yours"></i>Yours</li></ul></div>'
    +'<p class="sr-only">Pizza of '+esc(v.month)+' income. <span class="mv">'+esc(summary)+'</span></p>'
    +'<div class="bl-eq">'
      +'<div><span>Income</span><b>'+mv(v.inc)+'</b></div>'
      +'<div><span>Bills <small>'+v.paidN+' of '+v.items.length+' paid</small></span><b>−'+mv(v.bills)+'</b></div>'
      +'<div><span>Everything else</span><b>−'+mv(v.other)+'</b></div>'
      +'<div class="bl-yours'+(neg?' neg':'')+'"><span>'+(neg?'Over by':'Yours to spend')+'</span><b>'+mv(Math.abs(v.yours))+'</b></div>'
    +'</div>'
    +'<div class="bl-list">'+rows+'</div></div>';
}
function tick(){
  var el=$('dash-bills');if(!el)return;
  var s=S();
  if(!s||!s.username){el.innerHTML='';el._h='';return}
  var h=cardHTML();
  if(el._h!==h){el._h=h;el.innerHTML=h}
}

/* ───────── actions ───────── */
var paying={};
async function pay(id){
  if(paying[id])return;
  var s=S(),b=list().filter(function(x){return x.id===id})[0];if(!b)return;
  var it=view().items.filter(function(x){return x.b.id===id})[0];
  if(it&&it.e){if(W.toast)W.toast(b.name+' is already paid');return}
  var w=(s.wallets||[]).filter(function(x){return x.id===b.wallet})[0]||(s.wallets||[])[0];
  if(!w){if(W.toast)W.toast('Add a wallet first','error');return}
  paying[id]=true;
  try{
    if(W.walShort&&W.walShort(w,b.amount)){
      var ok=await W.mtConfirm(W.walShortMsg(w),'⚠️','Pay anyway','var(--amber)');
      if(!ok)return;
    }
    // the bill may have been paid by hand while the question was open
    var again=view().items.filter(function(x){return x.b.id===id})[0];
    if(again&&again.e)return;
    W.deductWalletBalance(w.id,b.amount);
    var en=W.pushExpense({desc:b.name,amount:b.amount,cat:b.cat||'utilities',source:w.id,date:W.today(),note:'Bill',recurring:false,billId:b.id});
    W.save();W.renderAfterExpense();
    if(W.toast)W.toast(b.name+' paid. Nice.');
    W.dispatchEvent(new CustomEvent('fin:expense-logged',{detail:{desc:b.name,amount:b.amount,cat:b.cat||'utilities',source:w.id}}));
    return en;
  }finally{paying[id]=false}
}
function importRecurring(){
  var s=S(),have={},made=0;
  list().forEach(function(b){have[b.name.trim().toLowerCase()]=1});
  var exps=(s.expenses||[]).slice().reverse();                  // newest first = latest amount wins
  exps.forEach(function(e){
    if(!e.recurring)return;
    var name=String(e.desc||'').trim().slice(0,40),k=name.toLowerCase();
    if(!name||have[k]||!(e.amount>0))return;
    var d=W.ldate?W.ldate(e.date):null;
    s.bills.push({id:W.uid(),name:name,amount:r2(e.amount),day:d&&!isNaN(d)?d.getDate():1,wallet:e.source||((s.wallets||[])[0]||{}).id||'',cat:e.cat&&e.cat!=='loan-payment'?e.cat:'utilities'});
    have[k]=1;made++;
  });
  if(made){W.save();W.renderAfterBills();if(W.toast)W.toast(made+' bill'+(made>1?'s':'')+' added from your recurring expenses')}
}

/* ───────── add / edit sheet ───────── */
var opener=null;
var QUICK=['Rent','Kuryente','Tubig','Wi-Fi','Phone load','Insurance'];
function closeSheet(){
  var b=$('bl-back');if(!b)return;
  b.remove();D.body.classList.remove('bl-open');D.removeEventListener('keydown',onKey,true);
  if(opener&&opener.focus&&D.contains(opener))try{opener.focus()}catch(e){}
  opener=null;
}
function onKey(e){
  var b=$('bl-back');if(!b)return;
  if(e.key==='Escape'){e.stopPropagation();closeSheet();return}
  if(e.key!=='Tab')return;
  var f=[].slice.call(b.querySelectorAll('button,input,select,[tabindex]:not([tabindex="-1"])')).filter(function(x){return !x.disabled&&x.offsetParent!==null});
  if(!f.length)return;
  var first=f[0],last=f[f.length-1];
  if(e.shiftKey&&D.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&D.activeElement===last){e.preventDefault();first.focus()}
}
function openSheet(id,from){
  closeSheet();
  var s=S();if(!s)return;
  var b=id?list().filter(function(x){return x.id===id})[0]:null;
  var it=b?view().items.filter(function(x){return x.b.id===id})[0]:null;
  opener=from||D.activeElement;
  var CL=(function(){try{return CAT_LABELS}catch(e){return {}}})();
  var cats=Object.keys(CL).filter(function(k){return k!=='loan-payment'});
  if(cats.indexOf('utilities')<0)cats.unshift('utilities');
  var catOpts=cats.map(function(k){return '<option value="'+k+'"'+((b?b.cat:'utilities')===k?' selected':'')+'>'+esc(CL[k]||k)+'</option>'}).join('');
  var wallet=b?b.wallet:((s.wallets||[])[0]||{}).id;
  var back=D.createElement('div');back.id='bl-back';back.className='bl-back';
  back.innerHTML='<div class="bl-sheet" role="dialog" aria-modal="true" aria-labelledby="bl-st">'
    +'<div class="bl-grab" aria-hidden="true"></div>'
    +'<h3 id="bl-st">'+(b?'Edit bill':'Add a bill')+'</h3>'
    +(b?'':'<div class="bl-chips" role="group" aria-label="Quick names">'+QUICK.map(function(q){return '<button type="button" class="bl-chip" data-q="'+esc(q)+'">'+esc(q)+'</button>'}).join('')+'</div>')
    +'<label class="bl-f"><span>Name</span><input id="bl-name" type="text" maxlength="40" autocomplete="off" placeholder="Rent, kuryente, Wi-Fi" value="'+(b?esc(b.name):'')+'"></label>'
    +'<div class="bl-two"><label class="bl-f"><span>Amount</span><input id="bl-amount" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0.00" value="'+(b?b.amount:'')+'"></label>'
    +'<label class="bl-f"><span>Due on day</span><input id="bl-day" type="number" inputmode="numeric" min="1" max="31" step="1" placeholder="15" value="'+(b?b.day:'')+'"></label></div>'
    +'<label class="bl-f"><span>Paid from</span><select id="bl-wallet">'+(W.walletOptionsHTML?W.walletOptionsHTML(wallet):'')+'</select></label>'
    +'<label class="bl-f"><span>Category</span><select id="bl-cat">'+catOpts+'</select></label>'
    +'<div class="bl-err" id="bl-err" role="alert" aria-live="polite"></div>'
    +'<div class="bl-actions"><button type="button" class="bl-cta" id="bl-save">'+(b?'Save changes':'Save bill')+'</button><button type="button" class="bl-link" id="bl-cancel">Cancel</button></div>'
    +(b&&it&&it.e?'<button type="button" class="bl-ghost" id="bl-unpay">Mark as not paid</button>':'')
    +(b?'<button type="button" class="bl-ghost danger" id="bl-del">Remove this bill</button>':'')
    +'</div>';
  D.body.appendChild(back);D.body.classList.add('bl-open');
  D.addEventListener('keydown',onKey,true);
  back.addEventListener('click',function(e){if(e.target===back)closeSheet()});
  $('bl-cancel').onclick=closeSheet;
  back.querySelectorAll('.bl-chip').forEach(function(c){c.onclick=function(){$('bl-name').value=c.dataset.q;$('bl-amount').focus()}});
  $('bl-save').onclick=function(){save(b)};
  if(b){
    $('bl-del').onclick=async function(){
      var ok=await W.mtConfirm('Remove "'+b.name+'" from your bills? Payments you already logged stay.','🗑️','Remove','var(--red)');
      if(!ok)return;
      var s2=S();s2.bills=s2.bills.filter(function(x){return x.id!==b.id});
      W.save();W.renderAfterBills();closeSheet();
    };
    if(it&&it.e)$('bl-unpay').onclick=async function(){const id2=it.e.id;closeSheet();await W.del('expenses',id2)};
  }
  setTimeout(function(){var n=$('bl-name');if(n)n.focus()},30);
}
function err(msg,id){var e=$('bl-err');if(e)e.textContent=msg;var f=id&&$(id);if(f)f.focus()}
function save(existing){
  var s=S(),name=$('bl-name').value.trim(),amount=W.cents(parseFloat($('bl-amount').value)),day=parseInt($('bl-day').value,10),
      wallet=$('bl-wallet').value,cat=$('bl-cat').value;
  if(!name)return err('Give the bill a name.','bl-name');
  var dup=list().some(function(x){return x.name.trim().toLowerCase()===name.toLowerCase()&&(!existing||x.id!==existing.id)});
  if(dup)return err('You already have a bill called "'+name+'".','bl-name');
  if(!(amount>0)||!isFinite(amount))return err('Enter an amount above zero.','bl-amount');
  if(!(day>=1&&day<=31))return err('Pick a due day from 1 to 31.','bl-day');
  if(!wallet)return err('Add a wallet first, then come back.');
  if(existing){var t=s.bills.filter(function(x){return x.id===existing.id})[0];if(t){t.name=name;t.amount=amount;t.day=day;t.wallet=wallet;t.cat=cat}}
  else s.bills.push({id:W.uid(),name:name,amount:amount,day:day,wallet:wallet,cat:cat});
  W.save();W.renderAfterBills();closeSheet();
  if(W.toast)W.toast(existing?'Bill updated':'Bill added. It is set aside from what\'s yours.');
}

/* one delegated listener for the whole card */
D.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('[data-bl-add],[data-bl-edit],[data-bl-pay],[data-bl-import]');
  if(!t||!$('dash-bills')||!$('dash-bills').contains(t))return;
  if(t.hasAttribute('data-bl-add'))openSheet(null,t);
  else if(t.hasAttribute('data-bl-edit'))openSheet(Number(t.getAttribute('data-bl-edit'))||t.getAttribute('data-bl-edit'),t);
  else if(t.hasAttribute('data-bl-pay'))pay(Number(t.getAttribute('data-bl-pay'))||t.getAttribute('data-bl-pay'));
  else if(t.hasAttribute('data-bl-import'))importRecurring();
});

W.FinBills={tick:tick,unpaid:unpaidTotal,view:view,count:function(){return list().length},pay:pay,open:function(id){openSheet(id||null)}};
})();
