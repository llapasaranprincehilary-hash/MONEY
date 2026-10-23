/* FINUITY Streak & Badges
   One source of truth for the logging streak and badges. Stored in state.streak so it syncs with the account.
   A day counts when the person logs money activity (expense, income, loan payment, goal saving, balance update).
   Kind by design: one "rest day" per week is forgiven, so a single missed day never wipes out a streak. */
(function(){
'use strict';
var W=window;
function S(){try{return state}catch(e){return{}}}
function $(id){return document.getElementById(id)}
function ic(n){return window.FinIcons?FinIcons.ic(n):''}
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}
function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function parse(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function addDays(s,n){var d=parse(s);d.setDate(d.getDate()+n);return iso(d)}
function td(){try{return today()}catch(e){return iso(new Date())}}
function validIso(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)}
function persist(){try{save()}catch(e){}}
function emit(name,detail){try{W.dispatchEvent(new CustomEvent(name,{detail:detail||{}}))}catch(e){}}

var KEEP_DAYS=420;
var MILESTONES=[3,7,14,30,60,100];

/* ───────── badge catalogue (ids marked * are shared with Fin's older badge shelf) ───────── */
var DEFS=[
 {id:'first-log',icon:'edit',label:'First entry',hint:'Log your first income or expense',cat:'Getting started'},
 {id:'first-month-budgeted',icon:'target',label:'Budget set',hint:'Set a monthly spending limit',cat:'Getting started'},
 {id:'first-goal',icon:'sparkle',label:'Dreamer',hint:'Create your first savings goal',cat:'Getting started'},
 {id:'streak-3',icon:'sprout',label:'Warm-up',hint:'Log 3 days in a row',cat:'Streaks'},
 {id:'streak-7',icon:'flame',label:'One week strong',hint:'Log 7 days in a row',cat:'Streaks'},
 {id:'streak-14',icon:'bolt',label:'Two-week habit',hint:'Log 14 days in a row',cat:'Streaks'},
 {id:'streak-30',icon:'star',label:'Habit formed',hint:'Log 30 days in a row',cat:'Streaks'},
 {id:'streak-60',icon:'diamond',label:'Diamond focus',hint:'Log 60 days in a row',cat:'Streaks'},
 {id:'streak-100',icon:'crown',label:'Money royalty',hint:'Log 100 days in a row',cat:'Streaks'},
 {id:'entries-25',icon:'list',label:'25 entries',hint:'Log 25 incomes or expenses',cat:'Habits'},
 {id:'entries-100',icon:'clipboard',label:'100 entries',hint:'Log 100 incomes or expenses',cat:'Habits'},
 {id:'goal-hit',icon:'trophy',label:'Goal reached',hint:'Fully fund a savings goal',cat:'Money wins'},
 {id:'loan-free',icon:'flag',label:'Debt-free',hint:'Pay off a loan in full',cat:'Money wins'},
 {id:'best-saver',icon:'trend-up',label:'Best saving month',hint:'Beat your own best savings rate',cat:'Money wins'},
 {id:'first-lesson',icon:'book',label:'Student of money',hint:'Finish your first lesson',cat:'Learning'},
 {id:'all-lessons',icon:'graduation',label:'Graduate',hint:'Finish all 7 lessons',cat:'Learning'},
 {id:'quiz-starter',icon:'compass',label:'Baseline set',hint:'Take the Starter Quiz',cat:'Learning'},
 {id:'quiz-gain',icon:'rocket',label:'Level up',hint:'Score higher on the Progress Quiz',cat:'Learning'}
];
var DMAP={};DEFS.forEach(function(d){DMAP[d.id]=d});
var CATS=['Getting started','Streaks','Habits','Money wins','Learning'];

/* ───────── state ───────── */
function ST(){
  var s=S();if(!s)return null;
  var st=s.streak;
  if(!st||typeof st!=='object'){st=s.streak={days:[],best:0,total:0,badges:{},lastCur:0,v:1};bootstrap(st)}
  if(!Array.isArray(st.days))st.days=[];
  if(!st.badges||typeof st.badges!=='object')st.badges={};
  return st;
}
// existing users start with the history they already have, so day one is not "0"
function bootstrap(st){
  var s=S(),set={};
  (s.expenses||[]).forEach(function(e){if(!e.recurring&&validIso(e.date))set[e.date]=1});      // recurring bills are filled in automatically
  (s.income||[]).forEach(function(e){if(!e.autoId&&validIso(e.dateAdded))set[e.dateAdded]=1});
  st.days=Object.keys(set).sort().slice(-KEEP_DAYS);
  st.total=st.days.length;
  st.seeded=false;
}
function setOf(st){var m={};st.days.forEach(function(d){m[d]=1});return m}

/* ───────── streak maths ───────── */
// Count logged days ending at `end` (which must be logged). One missed day is forgiven if both neighbours were
// logged and no other day was forgiven in the previous 6 days.
function run(set,end){
  var n=0,d=end,gapAt=-99,off=0;
  while(off<900){
    if(set[d])n++;
    else{
      var prev=addDays(d,-1),nxt=addDays(d,1);
      if(n>=1&&set[prev]&&set[nxt]&&off-gapAt>=7)gapAt=off;
      else break;
    }
    d=addDays(d,-1);off++;
  }
  return n;
}
var memo={key:'',val:null};
function calc(){
  var st=ST();if(!st)return{current:0,best:0,total:0,loggedToday:false,state:'none',atRisk:false};
  var t=td(),key=st.days.length+'|'+(st.days[st.days.length-1]||'')+'|'+t+'|'+(st.best||0);
  if(memo.key===key&&memo.val)return memo.val;
  var set=setOf(st),y=addDays(t,-1),y2=addDays(t,-2),cur=0,mode='none';
  if(set[t]){cur=run(set,t);mode='today'}
  else if(set[y]){cur=run(set,y);mode='open'}
  else if(set[y2]){var n2=run(set,y2);if(n2>=3){cur=n2;mode='rest'}}
  var best=st.best||0;
  // the full history is scanned once (first run / old backups); after that "best" is kept up to date as days are logged
  if(!st.bestDone){st.days.forEach(function(d){var r=run(set,d);if(r>best)best=r});st.bestDone=true;st.best=best}
  if(cur>best)best=cur;
  var v={current:cur,best:best,total:Math.max(st.total||0,st.days.length),loggedToday:!!set[t],state:mode,atRisk:cur>0&&!set[t],set:set,today:t};
  memo={key:key,val:v};return v;
}
function nextMilestone(cur){for(var i=0;i<MILESTONES.length;i++)if(MILESTONES[i]>cur)return MILESTONES[i];return null}

/* ───────── logging ───────── */
function log(kind){
  var st=ST();if(!st)return false;
  var t=td(),set=setOf(st);
  if(set[t])return false;                       // already counted today
  var before=calc(),y=addDays(t,-1),y2=addDays(t,-2);
  var usedRest=!set[y]&&!!set[y2]&&before.state==='rest';
  st.days.push(t);st.days.sort();
  if(st.days.length>KEEP_DAYS)st.days=st.days.slice(-KEEP_DAYS);
  st.total=(st.total||0)+1;
  memo={key:'',val:null};
  var after=calc();
  var newBest=after.current>(st.best||0)&&after.current>=3;
  if(after.best>(st.best||0))st.best=after.best;
  st.lastCur=after.current;
  var ms=MILESTONES.indexOf(after.current)>-1?after.current:0;
  evalBadges(false);
  persist();
  emit('fin:streak-up',{current:after.current,best:st.best,milestone:ms,newBest:newBest,first:st.total===1,kind:kind||''});
  if(usedRest)emit('fin:streak-rest',{current:after.current});
  render();
  return true;
}
// someone who disappears and returns: tell them kindly, once
function checkBroken(){
  var st=ST();if(!st)return;
  var c=calc();
  if(c.current===0&&(st.lastCur||0)>=3&&st.brokenShown!==td()){
    var was=st.lastCur;st.lastCur=0;st.brokenShown=td();persist();
    emit('fin:streak-broken',{was:was,best:c.best});
  }else if(c.current>0&&c.current!==st.lastCur){st.lastCur=c.current}
}

/* ───────── badges ───────── */
function has(id){var st=ST();return !!(st&&st.badges[id])}
function award(id,silent){
  var st=ST();if(!st||!DMAP[id]||st.badges[id])return false;
  st.badges[id]=td();
  persist();
  if(!silent){
    var d=DMAP[id];
    st.fresh=(st.fresh||[]).concat([id]).slice(-6);
    try{toast('Badge unlocked: '+d.label)}catch(e){}
    emit('fin:badge',{id:id,label:d.label,icon:d.icon,hint:d.hint});
  }
  render();
  return true;
}
function evalBadges(silent){
  var s=S(),st=ST();if(!st)return;
  var c=calc(),L=(s.learn&&s.learn.done)?Object.keys(s.learn.done).length:0,ent=(s.expenses||[]).filter(function(e){return !e.recurring}).length+(s.income||[]).filter(function(e){return !e.autoId}).length;
  var chk=[
    ['first-log',st.total>=1||st.days.length>=1],
    ['first-month-budgeted',(+s.budgetLimit||0)>0],
    ['first-goal',(s.goals||[]).length>=1],
    ['goal-hit',(s.goals||[]).some(function(g){return g.target>0&&g.saved>=g.target})],
    ['loan-free',(s.loans||[]).some(function(l){return l.settled})],
    ['entries-25',ent>=25],['entries-100',ent>=100],
    ['first-lesson',L>=1],['all-lessons',L>=7],
    ['quiz-starter',!!(s.learn&&s.learn.pre)],
    ['quiz-gain',!!(s.learn&&s.learn.pre&&s.learn.post&&s.learn.post.pct>s.learn.pre.pct)]
  ];
  MILESTONES.forEach(function(m){chk.push(['streak-'+m,c.best>=m||c.current>=m])});
  chk.forEach(function(p){if(p[1])award(p[0],silent)});
}
// first run for an existing account: quietly collect what they already earned (no pop-ups), plus Fin's older shelf
function seed(){
  var st=ST();if(!st||st.seeded)return;
  st.seeded=true;
  try{var old=JSON.parse(localStorage.getItem('finPetBadges')||'[]');old.forEach(function(id){award(id,true)})}catch(e){}
  evalBadges(true);
  st.lastCur=calc().current;
  persist();
}

/* ───────── views ───────── */
var DOW=['S','M','T','W','T','F','S'];
function weekDots(c){
  var t=td(),h='';
  for(var i=6;i>=0;i--){
    var d=addDays(t,-i),on=!!c.set[d],isT=i===0,rest=!on&&!isT&&c.set[addDays(d,-1)]&&c.set[addDays(d,1)];
    h+='<span class="st-d'+(on?' on':'')+(isT?' today':'')+(rest?' rest':'')+'" title="'+d+'"><i>'+(on?ic('check'):rest?ic('shield'):'')+'</i><b>'+DOW[parse(d).getDay()]+'</b></span>';
  }
  return h;
}
function statusLine(c){
  if(c.state==='today')return c.current>=2?'Logged today. Come back tomorrow to make it '+(c.current+1)+'.':'Logged today. Day one is done.';
  if(c.state==='open')return 'Log something today to keep your '+c.current+'-day streak going.';
  if(c.state==='rest')return 'Rest day in use. Log today and your '+c.current+'-day streak stays alive.';
  return 'Log any income or expense today to start a streak.';
}
function renderCard(){
  var el=$('streak-card');if(!el)return;
  var c=calc(),st=ST(),n=Object.keys((st&&st.badges)||{}).length;
  var h='<button type="button" class="st-card'+(c.current>0?' lit':'')+'" onclick="FinStreak.open()" data-tour="streak-card" aria-label="Streak and badges">'
   +'<span class="st-flame" aria-hidden="true">'+ic('flame')+'</span>'
   +'<span class="st-main"><span class="st-num">'+c.current+'<small>'+(c.current===1?' day streak':' day streak')+'</small></span>'
   +'<span class="st-sub">Best '+c.best+' · '+n+' of '+DEFS.length+' badges</span>'
   +'<span class="st-week">'+weekDots(c)+'</span></span>'
   +'<svg class="st-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>';
  if(el._h!==h){el._h=h;el.innerHTML=h}
}
function renderTop(){
  var el=$('tb-streak');if(!el)return;
  var c=calc(),n=c.current;
  el.classList.toggle('lit',n>0);
  el.classList.toggle('risk',!!c.atRisk);
  var lbl=n+(n===1?'-day streak':'-day streak')+(c.atRisk?'. Log something today to keep it.':'')+' Open streak and badges.';
  if(el.getAttribute('aria-label')!==lbl){el.setAttribute('aria-label',lbl);el.title=lbl}
  var b=el.querySelector('b');if(b&&b.textContent!==String(n))b.textContent=n;
}
function renderChip(){
  var el=$('dash-streak');if(!el)return;
  var c=calc(),h='';
  if(c.current>0||c.total>0){
    h='<button type="button" class="st-chip'+(c.atRisk?' risk':'')+(c.current>0?' lit':'')+'" onclick="FinStreak.openFromAnywhere()"><span class="st-chip-i">'+ic('flame')+'</span><b>'+c.current+'-day streak</b><em>'+(c.state==='today'?'logged today ✓':c.atRisk?'log today to keep it':'log today to start')+'</em></button>';
  }
  if(el._h!==h){el._h=h;el.innerHTML=h}
}
function renderPanel(){
  var el=$('streak-panel');if(!el)return;
  var c=calc(),st=ST(),t=td(),h='';
  var earned=st.badges,n=Object.keys(earned).length,nm=nextMilestone(c.current);
  h+='<div class="st-hero'+(c.current>0?' lit':'')+'"><div class="st-ring"><span class="st-ring-e">'+ic('flame')+'</span><b>'+c.current+'</b><small>day streak</small></div><p class="st-status">'+esc(statusLine(c))+'</p>';
  if(nm){var prevM=0;MILESTONES.forEach(function(m){if(m<=c.current)prevM=m});var pct=Math.round((c.current-prevM)/(nm-prevM)*100);
    h+='<div class="st-next"><div class="st-next-t">'+(nm-c.current)+' more day'+((nm-c.current)===1?'':'s')+' to <b>'+badgeForStreak(nm)+'</b></div><div class="st-bar"><i style="width:'+pct+'%"></i></div></div>'}
  h+='</div>';
  h+='<div class="st-stats"><div><b>'+c.best+'</b><span>Best streak</span></div><div><b>'+c.total+'</b><span>Days logged</span></div><div><b>'+n+'/'+DEFS.length+'</b><span>Badges</span></div></div>';
  // five-week calendar
  h+='<div class="st-sec">Last 5 weeks</div><div class="st-cal">'+DOW.map(function(d){return '<em>'+d+'</em>'}).join('');
  // align to weeks: begin on a Sunday 4 weeks before this week's Sunday
  var sunday=addDays(t,-parse(t).getDay()),begin=addDays(sunday,-28);
  for(var i=0;i<35;i++){var d=addDays(begin,i),on=!!c.set[d],fut=d>t,rest=!on&&!fut&&c.set[addDays(d,-1)]&&c.set[addDays(d,1)];
    h+='<span class="st-cd'+(on?' on':'')+(d===t?' today':'')+(fut?' fut':'')+(rest?' rest':'')+'" title="'+d+'">'+(on?ic('check'):rest?ic('shield'):'')+'</span>'}
  h+='</div><div class="st-legend"><span><i class="on"></i>Logged</span><span><i class="rest"></i>Rest day</span><span><i class="today"></i>Today</span></div>';
  h+='<details class="st-how"><summary>How streaks work</summary><p>Log any income, expense, loan payment, goal saving or balance update and the day counts. Missing a single day will not reset you: you get one free <b>rest day</b> each week. Streaks reward showing up, not being perfect.</p></details>';
  // badges
  h+='<div class="st-sec">Badges <em>'+n+' of '+DEFS.length+'</em></div>';
  CATS.forEach(function(cat){
    var list=DEFS.filter(function(d){return d.cat===cat});
    h+='<div class="st-cat">'+cat+'</div><div class="st-badges">'+list.map(function(d){
      var got=earned[d.id],isNew=got&&(st.fresh||[]).indexOf(d.id)>-1;
      return '<div class="st-b c-'+d.cat.toLowerCase().replace(/[^a-z]+/g,'-')+(got?' got':'')+'" title="'+esc(d.hint)+'"><span class="st-b-i">'+ic(got?d.icon:'lock')+'</span><span class="st-b-t">'+esc(d.label)+'</span><span class="st-b-h">'+(got?'Earned '+esc(fmtShort(got)):esc(d.hint))+'</span>'+(isNew?'<span class="st-new">NEW</span>':'')+'</div>'}).join('')+'</div>';
  });
  if(el._h!==h){el._h=h;el.innerHTML=h}
  if(st.fresh&&st.fresh.length){st.fresh=[]}   // shown once
}
function badgeForStreak(n){var d=DMAP['streak-'+n];return d?ic(d.icon)+' '+esc(d.label):n+' days'}
function fmtShort(s){try{return parse(s).toLocaleDateString('en-PH',{month:'short',day:'numeric'})}catch(e){return s}}
function render(){try{renderTop();renderCard();renderChip();var p=$('set-detail');if(p&&p.style.display!=='none'&&document.querySelector('#set-detail .set-panel.open[data-panel="streak"]'))renderPanel()}catch(e){console.error('streak',e)}}

function open(){
  try{if(typeof openSetPanel==='function'){openSetPanel('streak');renderPanel()}}catch(e){}
}
function openFromAnywhere(){try{show('settings');setTimeout(open,30)}catch(e){}}

/* ───────── wire-up ───────── */
var LOG_EVENTS=['fin:expense-logged','fin:income-added','fin:loan-added','fin:loan-adjusted','fin:loan-settled','fin:goal-progress','fin:balance-updated'];
function init(){
  if(init.done)return;init.done=true;
  LOG_EVENTS.forEach(function(ev){
    W.addEventListener(ev,function(e){
      var d=(e&&e.detail)||{};
      if(d.auto)return;                          // automatic entries are not the person showing up (the manual "log this bill now" button is)
      log(ev.replace('fin:',''));
      evalBadges(false);
    });
  });
  ['fin:goal-added','fin:budget-saved','fin:loan-settled','fin:learn-complete','fin:learn-quiz'].forEach(function(ev){
    W.addEventListener(ev,function(){setTimeout(function(){evalBadges(false);render()},50)});
  });
}
// called from the app's render(): cheap, and safe before sign-in
var lastDay='';
function tick(){
  var s=S();if(!s||!s.username)return;      // wait until there is a real account
  var st=ST();if(!st)return;
  if(!st.seeded)seed();
  var t=td();
  if(lastDay!==t){lastDay=t;memo={key:'',val:null}}
  checkBroken();
  render();
}
init();
W.FinStreak={tick:tick,render:render,renderPanel:renderPanel,open:open,openFromAnywhere:openFromAnywhere,log:log,award:award,
  current:function(){return calc().current},best:function(){return calc().best},loggedToday:function(){return calc().loggedToday},
  status:calc,defs:DEFS,milestones:MILESTONES,evalBadges:function(){evalBadges(false)},_ST:ST};
})();
