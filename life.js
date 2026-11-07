/* FINUITY Life layer
   Makes the app feel alive. Everything here listens to the events the app already fires (fin:*) and to render().
   1. Celebrations ........ confetti, vibration and an optional soft chime for wins
   2. Fin grows ........... XP + 5 levels; Fin gains a scarf, twinkles, wings and an aura
   3. Numbers move ........ balances count up/down when they change
   4. Come-back nudges .... streak freeze (see streak.js) + an optional daily reminder notification
   5. Weekly challenges ... 3 a week, a "no-spend day" button, and a weekly recap
   6. Fin's little ways ... idle antics, eyes that follow the pointer, a once-a-day check-in
   7. Friendlier empty screens
   State lives in state.life so it syncs with the account. Nothing here ever shames the person. */
(function(){
'use strict';
var W=window,D=document;

/* ───────── helpers ───────── */
function S(){try{return state}catch(e){return null}}
function $(id){return D.getElementById(id)}
function ic(n){return W.FinIcons?FinIcons.ic(n):''}
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}
function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function parse(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function addDays(s,n){var d=parse(s);d.setDate(d.getDate()+n);return iso(d)}
function td(){try{return today()}catch(e){return iso(new Date())}}
function validIso(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)}
function persist(){try{save()}catch(e){}}
function money(n){try{return fmt(n)}catch(e){return '₱'+Math.round(n).toLocaleString()}}
function emit(n,d){try{W.dispatchEvent(new CustomEvent(n,{detail:d||{}}))}catch(e){}}
function reduced(){try{return W.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function ST(){try{return W.FinStreak&&FinStreak._ST?FinStreak._ST():null}catch(e){return null}}

/* ───────── state ───────── */
function L(){
  var s=S();if(!s)return null;
  var l=s.life;
  if(!l||typeof l!=='object'){l=s.life={xp:0,seeded:false}}
  if(typeof l.xp!=='number'||!isFinite(l.xp))l.xp=0;
  if(!l.fx||typeof l.fx!=='object')l.fx={};
  if(!l.day||typeof l.day!=='object')l.day={d:'',xp:0};
  if(!l.wk||typeof l.wk!=='object')l.wk={id:'',counts:{}};
  if(!l.wk.counts)l.wk.counts={};
  if(!l.nospend||typeof l.nospend!=='object')l.nospend={};
  if(!l.done||typeof l.done!=='object')l.done={};
  if(!l.remind||typeof l.remind!=='object')l.remind={on:false,time:'20:00',notified:''};
  return l;
}
function fxOn(k){var l=L();if(!l)return k!=='sound';return k==='sound'?l.fx.sound===true:l.fx[k]!==false}

/* ═════════ 1. CELEBRATIONS ═════════ */
var cv=null,ctx=null,parts=[],raf=0;
function finCenter(){
  var el=$('fin-avatar-wrap');
  if(el){var r=el.getBoundingClientRect();if(r.width)return{x:r.left+r.width/2,y:r.top+r.height/2}}
  return{x:W.innerWidth/2,y:W.innerHeight*0.7};
}
function colors(){
  var a='#a8e038';
  try{var v=getComputedStyle(D.documentElement).getPropertyValue('--accent').trim();if(v)a=v}catch(e){}
  return[a,'#f0b92c','#ffe27a','#ff9a3c','#5a9cf5','#9d7ef7','#f0f0f5'];
}
function confetti(o){
  o=o||{};
  if(!fxOn('confetti')||reduced())return;
  var n=o.count||70,org=o.origin==='fin'?finCenter():(o.origin&&typeof o.origin==='object'?o.origin:{x:W.innerWidth/2,y:W.innerHeight*0.55});
  if(!cv){
    cv=D.createElement('canvas');cv.id='life-fx';cv.setAttribute('aria-hidden','true');D.body.appendChild(cv);
    ctx=cv.getContext&&cv.getContext('2d');
    if(!ctx){cv.remove();cv=null;return}      // no canvas support: skip the confetti, never break the app
  }
  var dpr=Math.min(2,W.devicePixelRatio||1);
  cv.width=W.innerWidth*dpr;cv.height=W.innerHeight*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  var cols=colors();
  for(var i=0;i<n;i++){
    var ang=(o.spread==='up'?-Math.PI/2:Math.random()*Math.PI*2)+(Math.random()-.5)*(o.spread==='up'?1.5:0);
    var sp=(o.power||9)*(0.45+Math.random()*0.75);
    parts.push({x:org.x,y:org.y,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp-(o.spread==='up'?4:2),
      w:5+Math.random()*6,h:3+Math.random()*5,r:Math.random()*6.28,vr:(Math.random()-.5)*.4,
      c:cols[i%cols.length],coin:Math.random()<.22,life:0,max:90+Math.random()*60});
  }
  if(!raf)raf=requestAnimationFrame(stepFx);
}
function stepFx(){
  raf=0;if(!ctx)return;
  ctx.clearRect(0,0,W.innerWidth,W.innerHeight);
  var alive=[];
  for(var i=0;i<parts.length;i++){
    var p=parts[i];
    p.life++;p.vx*=0.985;p.vy=p.vy*0.985+0.34;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;
    if(p.life<p.max&&p.y<W.innerHeight+30){
      alive.push(p);
      ctx.globalAlpha=Math.max(0,Math.min(1,(p.max-p.life)/30));
      ctx.fillStyle=p.c;
      if(p.coin){ctx.beginPath();ctx.ellipse(p.x,p.y,p.w/2,Math.abs(Math.cos(p.r))*p.w/2+.6,0,0,6.28);ctx.fill()}
      else{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore()}
    }
  }
  ctx.globalAlpha=1;
  parts=alive;
  if(parts.length)raf=requestAnimationFrame(stepFx);
  else if(cv){cv.remove();cv=null;ctx=null}
}
function buzz(p){if(!fxOn('haptics'))return;try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}}
var ac=null;
function chime(notes){
  if(!fxOn('sound'))return;
  try{
    ac=ac||new (W.AudioContext||W.webkitAudioContext)();
    if(ac.state==='suspended')ac.resume();
    var t=ac.currentTime+.01;
    notes.forEach(function(f,i){
      var o=ac.createOscillator(),g=ac.createGain();
      o.type='triangle';o.frequency.value=f;
      g.gain.setValueAtTime(0,t+i*.11);g.gain.linearRampToValueAtTime(.12,t+i*.11+.015);g.gain.exponentialRampToValueAtTime(.0008,t+i*.11+.5);
      o.connect(g);g.connect(ac.destination);o.start(t+i*.11);o.stop(t+i*.11+.55);
    });
  }catch(e){}
}
var NOTE={c5:523,e5:659,g5:784,c6:1047,e6:1319};
function celebrate(kind){
  switch(kind){
    case 'tick':buzz(8);break;
    case 'small':confetti({count:34,origin:'fin',power:7});buzz(14);chime([NOTE.g5]);break;
    case 'badge':confetti({count:70,origin:'fin',power:9});buzz([18,40,28]);chime([NOTE.c5,NOTE.e5,NOTE.g5]);break;
    case 'big':confetti({count:130,power:11});setTimeout(function(){confetti({count:70,origin:'fin',power:9})},260);buzz([30,50,30,50,70]);chime([NOTE.c5,NOTE.e5,NOTE.g5,NOTE.c6]);break;
    case 'level':confetti({count:150,origin:'fin',power:12});setTimeout(function(){confetti({count:90,power:10})},300);buzz([30,40,30,40,30,40,90]);chime([NOTE.c5,NOTE.g5,NOTE.c6,NOTE.e6]);break;
  }
}

/* ═════════ 2. FIN GROWS ═════════ */
var LEVELS=[
  {n:'Pocket Change',at:0,gift:'You start as a plain little coin.'},
  {n:'Penny Saver',at:100,gift:'Fin put on a red scarf.'},
  {n:'Budget Buddy',at:300,gift:'Fin now twinkles.'},
  {n:'Wealth Wings',at:650,gift:'Fin grew a pair of wings.'},
  {n:'Money Legend',at:1200,gift:'Fin glows gold. Top level!'}
];
function levelOf(xp){var lv=1;for(var i=0;i<LEVELS.length;i++)if(xp>=LEVELS[i].at)lv=i+1;return lv}
function lvInfo(){
  var l=L(),lv=levelOf(l.xp),cur=LEVELS[lv-1],nx=LEVELS[lv];
  return{lv:lv,name:cur.n,xp:l.xp,from:cur.at,to:nx?nx.at:null,pct:nx?Math.round((l.xp-cur.at)/(nx.at-cur.at)*100):100};
}
function addXP(n,why,o){
  var l=L();if(!l||!(n>0))return 0;
  o=o||{};
  if(o.daily){
    if(l.day.d!==td())l.day={d:td(),xp:0};
    var room=40-l.day.xp;n=Math.min(n,room);
    if(n<=0)return 0;
    l.day.xp+=n;
  }
  var before=levelOf(l.xp);
  l.xp+=n;
  var after=levelOf(l.xp);
  persist();
  if(after>before&&!o.silent)levelUp(after);
  applyFin();renderCard();
  return n;
}
function levelUp(lv){
  var info=LEVELS[lv-1];
  emit('fin:level-up',{level:lv,name:info.n});
  var root=$('fin-pet-root');
  if(root&&!reduced()){root.classList.add('fin-leveling');setTimeout(function(){root.classList.remove('fin-leveling')},1200)}
  celebrate('level');
  try{toast('Fin reached level '+lv+': '+info.n)}catch(e){}
  setTimeout(function(){tell("Level "+lv+": "+info.n+"! "+info.gift+" That came from you showing up, not from how much money you have.",null,{mood:'happy',rank:5})},1200);
  try{if(W.FinStreak&&FinStreak.award&&lv>=5)FinStreak.award('fin-legend')}catch(e){}
}
function seed(){
  var l=L();if(!l||l.seeded)return;
  l.seeded=true;
  var st=ST(),xp=0;
  if(st){xp+=Object.keys(st.badges||{}).length*30;xp+=Math.min(30,(st.days||[]).length)*6}
  l.xp=Math.max(l.xp,Math.min(xp,600));
  rollWeek();
  var dn=l.done[l.wk.id]||(l.done[l.wk.id]={});
  activeChallenges().forEach(function(c){if(c.done)dn[c.id]=1});
  persist();
}

/* — Fin's look — */
var PAL={o:'#4a2c05',R:'#e8433a',r:'#b22a24',c:'#fff1c9',w:'#ffffff',s:'#c6d4f0',y:'#ffd84a',W:'#fff6c2'};
function pixels(rows,x0,y0){
  var by={};
  rows.forEach(function(row,dy){for(var dx=0;dx<row.length;dx++){var ch=row.charAt(dx);if(ch!=='.'){(by[ch]=by[ch]||[]).push([x0+dx,y0+dy])}}});
  return Object.keys(by).map(function(k){return by[k].map(function(p){return '<rect x="'+p[0]+'" y="'+p[1]+'" width="1" height="1" fill="'+(PAL[k]||'#fff')+'"/>'}).join('')}).join('');
}
function mirror(rows){return rows.map(function(r){return r.split('').reverse().join('')})}
var WING=['....ooo..','..oowwwo.','.owwwwwwo','owwwwwwwo','owwwwwwso','.owwwwsso','..owwssoo','...ossoo.','....ooo..'];   // 9 wide: the inner columns tuck behind the coin
function star(cx,cy){return '<g class="fin-tw">'+pixels(['.y.','yWy','.y.'],cx-1,cy-1)+'</g>'}
function applyFin(){
  var l=L();if(!l)return false;
  var root=$('fin-pet-root'),spr=$('fin-sprite'),wrap=$('fin-avatar-wrap');
  if(!root||!spr||!wrap)return false;
  var lv=levelOf(l.xp);
  for(var i=1;i<=5;i++)root.classList.toggle('fin-lv-'+i,i===lv);
  if(spr.getAttribute('data-lv')!==String(lv)){
    spr.setAttribute('data-lv',String(lv));
    var spin=spr.querySelector('.finc-spin');
    if(spin){
      Array.prototype.slice.call(spin.querySelectorAll('.fin-acc')).forEach(function(n){n.remove()});
      var NS='http://www.w3.org/2000/svg';
      function add(html,cls,front){
        var g=D.createElementNS(NS,'g');g.setAttribute('class','fin-acc '+cls);g.innerHTML=html;
        if(front)spin.appendChild(g);else spin.insertBefore(g,spin.firstChild);
      }
      if(lv>=4){
        add(pixels(WING,0,12),'fin-wing-l',false);
        add(pixels(mirror(WING),23,12),'fin-wing-r',false);
      }
      if(lv>=2){
        add(pixels(['RRRRRRRRRRRR','.rRrRrRrRrr.'],10,29)+pixels(['.RR','.rR','..r'],19,30),'fin-scarf',true);
      }
      if(lv>=3){
        add(star(3,3)+star(29,3)+star(3,30)+star(29,30)+(lv>=5?star(1,22)+star(30,22):''),'fin-sparkles',true);
      }
    }
  }
  var chip=wrap.querySelector('.fin-lv');
  if(!chip){chip=D.createElement('div');chip.className='fin-lv';wrap.appendChild(chip)}
  var vip=!!(W.FinVip&&FinVip.isVip()),t='Lv '+lv+(vip?' ★':'');
  chip.classList.toggle('vip',vip);
  if(chip.textContent!==t){
    var had=chip.textContent!=='';
    chip.textContent=t;chip.setAttribute('title','Fin: '+LEVELS[lv-1].n);
    if(had&&!reduced()){chip.classList.remove('pop');void chip.offsetWidth;chip.classList.add('pop')}
  }
  if(!wrap.querySelector('.fin-aura')){var a=D.createElement('div');a.className='fin-aura';a.setAttribute('aria-hidden','true');wrap.insertBefore(a,wrap.firstChild)}
  return true;
}
var finTries=0;
function waitForFin(){
  if(applyFin()||finTries++>60)return;
  setTimeout(waitForFin,500);
}

/* — Fin speaks: one voice at a time, through the coach gate —
   Several things can happen at once (a level, a challenge, a freeze). Collect them briefly and say only the most important. */
var tq=[],tqT=0;
function tell(text,actions,o){
  o=o||{};
  tq.push({text:text,actions:actions,o:o,rank:o.rank||2});
  if(!tqT)tqT=setTimeout(flushTell,o.wait||2200);
  return true;
}
function flushTell(){
  tqT=0;
  var best=tq.sort(function(a,b){return b.rank-a.rank})[0];tq=[];
  if(!best)return;
  var o=best.o,msg={text:best.text,mood:o.mood||'happy',actions:(best.actions&&best.actions.length?best.actions:[{label:'Thanks, Fin',kind:'custom',onClick:function(){}}]).slice(0,2),stayMs:o.stayMs||12000};
  var tries=0;
  (function go(){
    var ok=false;try{ok=!!(W.FinPet&&FinPet.coach&&FinPet.coach(msg,{priority:true}))}catch(e){}
    if(!ok&&tries++<3)setTimeout(go,9000);
    if(ok&&o.done)o.done();
  })();
}
function act(label,fn){return{label:label,kind:'custom',onClick:fn}}

/* ═════════ 3. NUMBERS MOVE ═════════ */
var cu={},cuHero=false;
function parseMoney(txt){
  var m=/^([^\d]*?)(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?([^\d]*)$/.exec(String(txt).trim());
  if(!m)return null;
  var neg=m[1].indexOf('-')>-1,num=parseFloat(m[2].replace(/,/g,'')+(m[3]||''));
  return{pre:m[1].replace(/-/g,''),val:(neg?-1:1)*num,dec:m[3]?m[3].length-1:0,post:m[4]};
}
function fmtNum(v,dec){return Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec})}
function countTargets(){
  var out=[];
  var h=$('hero-bal');if(h)out.push({k:'hero',el:h});
  Array.prototype.forEach.call(D.querySelectorAll('#dash-stats .stat'),function(s,i){var v=s.querySelector('.sv');if(v){var lb=s.querySelector('label');out.push({k:'stat:'+(lb?lb.textContent:i),el:v})}});
  Array.prototype.forEach.call(D.querySelectorAll('#month-snapshot .snapshot-item'),function(s,i){var v=s.querySelector('.snapshot-val');if(v){var lb=s.querySelector('.snapshot-label');out.push({k:'snap:'+(lb?lb.textContent:i),el:v})}});
  return out;
}
function countUps(){
  var rm=reduced();
  countTargets().forEach(function(t){
    var el=t.el;if(el.children.length)return;
    var txt=el.textContent,p=parseMoney(txt),e=cu[t.k];
    if(!p){if(e){cancelAnimationFrame(e.raf);delete cu[t.k]}return}          // hidden balances (••••) or an unfamiliar number format
    if(!e){
      cu[t.k]=e={target:p.val,cur:p.val,el:el,raf:0};
      if(t.k==='hero'&&!cuHero&&!rm&&p.val!==0){cuHero=true;run(e,p,0,p.val,900)}
      return;
    }
    e.el=el;
    if(p.val===e.target){if(e.raf)el.textContent=format(e,p,e.cur);return}
    e.target=p.val;
    cancelAnimationFrame(e.raf);
    if(rm){e.cur=p.val;return}
    run(e,p,e.cur,p.val,Math.min(900,350+Math.abs(p.val-e.cur)/Math.max(1,Math.abs(p.val))*600));
  });
}
function format(e,p,v){return (v<0?'-':'')+p.pre+fmtNum(v,p.dec)+p.post}
function run(e,p,from,to,ms){
  var t0=performance.now(),orig=e.el.textContent;
  function step(now){
    var k=Math.min(1,(now-t0)/ms),ease=1-Math.pow(1-k,3);
    e.cur=from+(to-from)*ease;
    if(e.el&&e.el.isConnected){e.el.textContent=k>=1?orig:format(e,p,e.cur)}
    if(k<1)e.raf=requestAnimationFrame(step);else{e.raf=0;e.cur=to}
  }
  e.raf=requestAnimationFrame(step);
}

/* ═════════ 5. WEEKLY CHALLENGES, NO-SPEND DAY, RECAP ═════════ */
function weekStart(s){var d=parse(s),k=(d.getDay()+6)%7;d.setDate(d.getDate()-k);return iso(d)}
function inRange(d,a,b){return validIso(d)&&d>=a&&d<=b}
function cnt(k){var l=L();return (l.wk.counts[k]||0)}
function bump(k){var l=L();if(!l)return;rollWeek();l.wk.counts[k]=(l.wk.counts[k]||0)+1;persist()}
function rollWeek(){
  var l=L(),ws=weekStart(td());
  if(l.wk.id!==ws){l.wk={id:ws,counts:{}};persist()}
}
function loggedDays(a,b){
  var st=ST();if(!st)return 0;
  var fz=st.frozen||{};
  return (st.days||[]).filter(function(d){return inRange(d,a,b)&&!fz[d]}).length;
}
function catsIn(a,b){var m={};(S().expenses||[]).forEach(function(e){if(inRange(e.date,a,b))m[e.cat||'other-exp']=1});return Object.keys(m).length}
function nospendIn(a,b){var l=L();return Object.keys(l.nospend).filter(function(d){return inRange(d,a,b)}).length}
var POOL={
  log5:{grp:'habit',icon:'calendar',goal:5,text:'Log on 5 different days',prog:function(a,b){return loggedDays(a,b)}},
  nospend2:{grp:'habit',icon:'shield',goal:2,text:'Mark 2 no-spend days',prog:function(a,b){return nospendIn(a,b)}},
  save1:{grp:'money',icon:'savings',goal:1,text:'Put money toward a savings goal',prog:function(){return cnt('goal')}},
  income1:{grp:'money',icon:'cash',goal:1,text:'Log some income',prog:function(){return cnt('income')}},
  cats3:{grp:'money',icon:'pie',goal:3,text:'Log spending in 3 different categories',prog:function(a,b){return catsIn(a,b)}},
  learn1:{grp:'grow',icon:'book',goal:1,text:'Finish a lesson in Learn',prog:function(){return cnt('learn')}},
  recap1:{grp:'grow',icon:'chart',goal:1,text:"Open last week's recap",prog:function(){return cnt('recap')}}
};
function activeChallenges(){
  var ws=weekStart(td()),wn=Math.floor(parse(ws).getTime()/(7*864e5));
  var ids=[['log5','nospend2'][wn%2],['save1','income1','cats3'][wn%3],['learn1','recap1'][(wn+1)%2]];
  return ids.map(function(id){var c=POOL[id],we=addDays(ws,6),p=Math.min(c.goal,c.prog(ws,we));return{id:id,def:c,prog:p,done:p>=c.goal}});
}
function checkChallenges(announce){
  var l=L();if(!l||!l.seeded)return;
  rollWeek();
  var ws=l.wk.id,dn=l.done[ws]||(l.done[ws]={}),list=activeChallenges(),all=true;
  list.forEach(function(c){
    if(!c.done){all=false;return}
    if(!dn[c.id]){
      dn[c.id]=1;persist();
      addXP(60,'challenge',{silent:false});
      if(announce){
        celebrate('badge');
        try{toast('Challenge done: '+c.def.text)}catch(e){}
        emit('fin:challenge-done',{id:c.id});
        setTimeout(function(){tell("Challenge done: "+c.def.text.toLowerCase()+". That's +60 XP for you.",null,{mood:'happy',rank:3})},1200);
      }
    }
  });
  if(all&&!dn.all){
    dn.all=1;persist();
    addXP(50,'challenge-all');
    try{if(W.FinStreak&&FinStreak.award)FinStreak.award('perfect-week')}catch(e){}
    if(announce){celebrate('big');setTimeout(function(){tell("All three challenges this week. That's the whole set. Bonus +50 XP!",null,{mood:'happy',rank:4})},1500)}
  }
}
function hasExpenseToday(){var t=td();return (S().expenses||[]).some(function(e){return e.date===t})}
function markNoSpend(){
  var l=L(),t=td();
  if(!l||l.nospend[t])return;
  if(hasExpenseToday()){try{toast('You already logged spending today.','error')}catch(e){}return}
  l.nospend[t]=1;persist();
  try{if(W.FinStreak&&FinStreak.log)FinStreak.log('nospend')}catch(e){}
  addXP(10,'nospend');
  celebrate('small');
  try{toast('No-spend day logged. Your streak counts it.')}catch(e){}
  checkChallenges(true);renderCard();
  setTimeout(function(){tell(pick(["A day with no spending is a real win. Zero-spend days are how big savings start.","Nothing spent, still showed up. That counts, and I counted it.","No-spend day! Your streak is safe."]),null,{mood:'happy',rank:3})},1200);
}

/* — the card on the dashboard — */
function isFolded(){try{return localStorage.getItem('finLifeFold')==='1'}catch(e){return false}}
function toggleFold(){try{localStorage.setItem('finLifeFold',isFolded()?'0':'1')}catch(e){}renderCard()}
function renderCard(){
  var el=$('dash-life'),l=L();if(!el||!l)return;
  var s=S();if(!s||!s.username){el.innerHTML='';el._h='';return}
  var inf=lvInfo(),ch=activeChallenges(),t=td();
  var doneN=ch.filter(function(c){return c.done}).length;
  var last=LEVELS.length-1;
  var fill=inf.lv>last?100:Math.round(((inf.lv-1)+inf.pct/100)/last*100);
  var nodes=LEVELS.map(function(lv,i){
    var cls=i<inf.lv-1?' got':i===inf.lv-1?' now':'';
    return '<i class="lf-nd'+cls+'" title="'+esc(lv.n)+'">'+(i<inf.lv-1?ic('check'):(i+1))+'</i>';
  }).join('');
  var spentToday=!l.nospend[t]&&hasExpenseToday();
  var btnTxt=l.nospend[t]?'No-spend day logged':spentToday?'You logged spending today':'Nothing spent today';
  var folded=isFolded();
  var h='<div class="lf-card'+(folded?' is-c':'')+'" data-tour="fin-week">'
   +'<div class="lf-hero" role="button" tabindex="0" data-lf="fold" aria-expanded="'+(!folded)+'" aria-label="Fin\'s week, '+(folded?'expand':'collapse')+'">'
   +'<span class="lf-fold" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span>'
   +'<div class="lf-hero-t"><span class="lf-hero-s">Fin is level '+inf.lv+'</span><span class="lf-hero-n">'+esc(inf.name)+'</span></div>'
   +'<div class="lf-trk" role="progressbar" aria-label="Fin level progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+fill+'"><span class="lf-trk-l"><i style="width:'+fill+'%"></i></span>'+nodes+'</div>'
   +'<div class="lf-hero-x">'+(inf.to?'<b>'+(inf.to-inf.xp)+' XP</b> to '+esc(LEVELS[inf.lv].n):'Top level reached. Fin is a legend.')+'</div>'
   +'</div>'
   +'<div class="lf-body">'
   +'<div class="lf-h">This week<small>'+doneN+' of '+ch.length+' done, resets Monday</small></div>'
   +'<div class="lf-ch">'
   +ch.map(function(c){
      var g=c.def.goal,pips='';
      if(g>1){pips='<span class="lf-pips" aria-hidden="true">';for(var k=0;k<g;k++)pips+='<i'+(k<c.prog?' class="on"':'')+'></i>';pips+='</span>'}
      return '<div class="lf-c'+(c.done?' done':'')+'"><span class="lf-ck" aria-hidden="true">'+ic(c.done?'check':c.def.icon)+'</span>'
        +'<div class="lf-c-t">'+esc(c.def.text)+'<span class="lf-sr"> '+c.prog+' of '+g+'</span></div>'+pips+'</div>';
   }).join('')
   +'</div>'
   +'<div class="lf-row">'
   +'<button type="button" class="lf-btn pri'+(l.nospend[t]?' is-done':'')+'" data-lf="nospend"'+((l.nospend[t]||spentToday)?' disabled':'')+'>'+ic(l.nospend[t]?'check':'shield')+btnTxt+'</button>'
   +'<button type="button" class="lf-btn" data-lf="recap">'+ic('chart')+'Weekly recap</button></div>'
   +'</div></div>';
  if(el._h!==h){el._h=h;el.innerHTML=h}
}

/* — weekly recap — */
function weekStats(a,b,pa,pb){
  var s=S(),ex=(s.expenses||[]).filter(function(e){return inRange(e.date,a,b)}),pex=(s.expenses||[]).filter(function(e){return inRange(e.date,pa,pb)});
  var sum=function(x){return x.reduce(function(n,e){return n+(+e.amount||0)},0)};
  var inc=(s.income||[]).filter(function(e){return inRange(e.dateAdded,a,b)});
  var cats={};ex.forEach(function(e){var c=e.cat||'other-exp';cats[c]=(cats[c]||0)+(+e.amount||0)});
  var top=Object.keys(cats).sort(function(x,y){return cats[y]-cats[x]})[0];
  var perDay=[];for(var i=0;i<7;i++){var d=addDays(a,i);perDay.push({d:d,v:sum(ex.filter(function(e){return e.date===d})),log:false})}
  var st=ST(),fz=(st&&st.frozen)||{};
  perDay.forEach(function(p){p.log=!!(st&&(st.days||[]).indexOf(p.d)>-1&&!fz[p.d])});
  var big=ex.slice().sort(function(x,y){return y.amount-x.amount})[0];
  return{spent:sum(ex),prev:sum(pex),earned:sum(inc),top:top,topAmt:top?cats[top]:0,days:loggedDays(a,b),perDay:perDay,count:ex.length+inc.length,big:big};
}
function catName(c){try{return CAT_LABELS[c]||c}catch(e){return c}}
function recapLine(w){
  if(!w.count)return "Quiet week, and that's fine. One quick log today and we're rolling again.";
  var bits=[];
  if(w.prev>0&&w.spent>0){
    var ch=Math.round((w.spent-w.prev)/w.prev*100);
    if(ch<=-5)bits.push("You spent "+Math.abs(ch)+"% less than the week before. Nice control.");
    else if(ch>=5)bits.push("You spent "+ch+"% more than the week before. Not a problem. Check if "+(w.top?catName(w.top).toLowerCase():'it')+" was planned.");
    else bits.push("Your spending was steady compared with the week before.");
  }else if(w.spent>0)bits.push("This is your first full week of numbers. Now we have something to compare against.");
  else bits.push("You logged no spending. Either a very frugal week or a few things still to add.");
  if(w.days>=5)bits.push("You showed up on "+w.days+" days. That habit matters more than any single number.");
  else if(w.days>=1)bits.push("You logged on "+w.days+" day"+(w.days===1?'':'s')+". Aim for one more next week.");
  return bits.join(' ');
}
var recapEl=null,recapPrevFocus=null;
function closeRecap(){D.body.classList.remove('sheet-open');if(recapEl){recapEl.remove();recapEl=null;D.removeEventListener('keydown',recapKey);try{recapPrevFocus&&recapPrevFocus.focus()}catch(e){}}}
function recapKey(e){if(e.key==='Escape')closeRecap()}
function openRecap(){
  var s=S();if(!s)return;
  closeRecap();
  var ws=weekStart(td()),pa=addDays(ws,-7),pb=addDays(ws,-1),w=weekStats(pa,pb,addDays(pa,-7),addDays(pa,-1)),title="Last week",a=pa,b=pb;
  if(!w.count){var cw=weekStats(ws,addDays(ws,6),pa,pb);if(cw.count){w=cw;title="This week so far";a=ws;b=addDays(ws,6)}}
  var l=L();
  if(l.recapSeen!==ws&&a===pa){l.recapSeen=ws;persist();bump('recap');addXP(15,'recap');checkChallenges(true)}
  var rng=function(d){try{return parse(d).toLocaleDateString('en-PH',{month:'short',day:'numeric'})}catch(e){return d}};
  var maxV=Math.max.apply(null,w.perDay.map(function(p){return p.v}).concat([1]));
  var DOW=['M','T','W','T','F','S','S'];
  var delta='';
  if(w.prev>0&&w.spent>0){var ch=Math.round((w.spent-w.prev)/w.prev*100);delta='<em class="'+(ch>2?'up':ch<-2?'dn':'flat')+'">'+(ch>0?'+':'')+ch+'% vs week before</em>'}
  var net=w.earned-w.spent;
  recapPrevFocus=D.activeElement;
  recapEl=D.createElement('div');recapEl.className='lf-back';recapEl.setAttribute('role','dialog');recapEl.setAttribute('aria-modal','true');recapEl.setAttribute('aria-label',title+' recap');
  recapEl.innerHTML='<div class="lf-sheet"><div class="lf-sh-hd"><div><div class="lf-sh-t">'+esc(title)+' with Fin</div><div class="lf-sh-s">'+esc(rng(a))+' to '+esc(rng(b))+'</div></div><button type="button" class="lf-x" data-lf="close" aria-label="Close">'+ic('x')+'</button></div>'
   +'<div class="lf-say">'+esc(recapLine(w))+'</div>'
   +'<div class="lf-days" aria-hidden="true">'+w.perDay.map(function(p,i){return '<div class="lf-day'+(p.v>0?' has':'')+(p.log?' log':'')+'"><i style="height:'+Math.max(4,Math.round(p.v/maxV*100))+'%"></i><b>'+DOW[i]+'</b></div>'}).join('')+'</div>'
   +'<div class="lf-grid">'
   +'<div class="lf-st"><b>'+esc(money(w.spent))+'</b><span>Spent</span>'+delta+'</div>'
   +'<div class="lf-st"><b>'+esc(money(w.earned))+'</b><span>Earned</span></div>'
   +'<div class="lf-st"><b>'+esc(money(net))+'</b><span>Earned minus spent</span></div>'
   +'<div class="lf-st"><b>'+w.days+' of 7</b><span>Days logged</span></div>'
   +(w.top?'<div class="lf-st"><b>'+esc(catName(w.top))+'</b><span>Biggest category · '+esc(money(w.topAmt))+'</span></div>':'')
   +(w.big?'<div class="lf-st"><b>'+esc(money(w.big.amount))+'</b><span>Biggest purchase · '+esc(String(w.big.desc||'').slice(0,28))+'</span></div>':'')
   +'</div><button type="button" class="lf-btn pri" data-lf="close" style="width:100%">Got it</button></div>';
  D.body.appendChild(recapEl);D.body.classList.add('sheet-open');
  recapEl.addEventListener('click',function(e){if(e.target===recapEl)closeRecap()});
  D.addEventListener('keydown',recapKey);
  var cb=recapEl.querySelector('.lf-x');if(cb)cb.focus();
}

/* ═════════ 4. REMINDER NOTIFICATIONS ═════════ */
var CACHE='finuity-life-data';
function cacheUrl(){return new URL('life-data.json',location.href).href}
var lastCacheJson='';
function syncCache(){
  try{
    var l=L(),st=ST();if(!l||!('caches' in W))return;
    var days=(st&&st.days)||[],o={on:!!l.remind.on,time:l.remind.time||'20:00',loggedDay:days.length?days[days.length-1]:'',notified:l.remind.notified||'',streak:W.FinStreak?FinStreak.current():0};
    var j=JSON.stringify(o);if(j===lastCacheJson)return;lastCacheJson=j;
    caches.open(CACHE).then(function(c){return c.put(cacheUrl(),new Response(j,{headers:{'Content-Type':'application/json'}}))}).catch(function(){});
  }catch(e){}
}
function remindText(){
  var n=W.FinStreak?FinStreak.current():0,fz=(ST()&&ST().freezes)||0;
  if(n>=2)return{t:'Your '+n+'-day streak is waiting',b:'Log anything, or tap "Nothing spent today". It takes five seconds.'+(fz?' (You also have a freeze in reserve.)':'')};
  return{t:'Quick check-in from Fin',b:'Anything to log today? A no-spend day counts too.'};
}
function notify(){
  var l=L(),r=remindText();
  try{
    var opts={body:r.b,icon:'icon-192.png',badge:'icon-192.png',tag:'finuity-streak',renotify:false,data:{url:'./index.html'}};
    if(navigator.serviceWorker&&navigator.serviceWorker.ready){
      navigator.serviceWorker.ready.then(function(reg){reg.showNotification(r.t,opts)}).catch(function(){try{new Notification(r.t,opts)}catch(e){}});
    }else new Notification(r.t,opts);
  }catch(e){}
  l.remind.notified=td();persist();syncCache();
}
function checkReminder(){
  var l=L();if(!l||!l.remind.on)return;
  if(!('Notification' in W)||Notification.permission!=='granted')return;
  var t=td();if(l.remind.notified===t)return;
  if(W.FinStreak&&FinStreak.loggedToday())return;
  var now=new Date(),hm=pad(now.getHours())+':'+pad(now.getMinutes());
  if(hm>=(l.remind.time||'20:00'))notify();
}
function setReminder(on){
  var l=L();
  if(!on){l.remind.on=false;persist();syncCache();decoratePanel();return}
  if(!('Notification' in W)){try{toast('This browser does not support reminders.','error')}catch(e){}return}
  var done=function(p){
    if(p==='granted'){
      l.remind.on=true;persist();syncCache();
      try{navigator.serviceWorker.ready.then(function(reg){if(reg.periodicSync)return reg.periodicSync.register('finuity-reminder',{minInterval:12*3600*1000})}).catch(function(){})}catch(e){}
      try{toast('Reminder on. Fin will nudge you at '+l.remind.time+' if you have not logged.')}catch(e){}
    }else{try{toast('Notifications are blocked. Allow them in your browser settings.','error')}catch(e){}}
    decoratePanel();
  };
  try{var r=Notification.requestPermission(done);if(r&&r.then)r.then(done)}catch(e){done('denied')}
}

/* ═════════ streak panel extras ═════════ */
function decoratePanel(){
  var p=$('streak-panel');if(!p)return;
  var l=L(),st=ST();if(!l||!st)return;
  var old=p.querySelector('.lf-sec');
  var cap=(W.FinVip&&FinVip.freezeCap())||2,fz=st.freezes||0,rem=l.remind,perm=('Notification' in W)?Notification.permission:'unsupported';
  var h='<div class="lf-sec"><h4>Streak freezes</h4><div class="lf-frz" aria-label="'+fz+' of '+cap+' freezes">'
   +Array.apply(null,Array(cap)).map(function(_,i){return '<i class="'+(i<fz?'on':'')+'">'+ic('snow')+'</i>'}).join('')+'</div>'
   +'<p>A freeze quietly covers up to two missed days so a busy stretch does not erase your streak. You earn one at each streak milestone (7, 14, 30, 60 and 100 days) and can hold up to '+cap+'.</p>'
   +'<h4>Reminders</h4>'
   +'<div class="lf-tg"><div>Daily reminder<small>'+(perm==='denied'?'Notifications are blocked in your browser settings':'Only if you have not logged yet that day')+'</small></div><button type="button" class="lf-sw" role="switch" aria-checked="'+(rem.on&&perm==='granted')+'" aria-label="Daily reminder" data-lf="remind"></button></div>'
   +(rem.on?'<div class="lf-tg"><div>Remind me at</div><input type="time" class="lf-time" value="'+esc(rem.time||'20:00')+'" data-lf="time" aria-label="Reminder time"></div>':'')
   +'<h4>Effects</h4>'
   +'<div class="lf-tg"><div>Confetti</div><button type="button" class="lf-sw" role="switch" aria-checked="'+fxOn('confetti')+'" data-lf="fx-confetti" aria-label="Confetti"></button></div>'
   +'<div class="lf-tg"><div>Vibration<small>On phones that support it</small></div><button type="button" class="lf-sw" role="switch" aria-checked="'+fxOn('haptics')+'" data-lf="fx-haptics" aria-label="Vibration"></button></div>'
   +'<div class="lf-tg"><div>Soft chime</div><button type="button" class="lf-sw" role="switch" aria-checked="'+fxOn('sound')+'" data-lf="fx-sound" aria-label="Soft chime"></button></div>'
   +'</div>';
  if(old){old.outerHTML=h;return}
  var anchor=p.querySelector('.st-stats');
  if(anchor)anchor.insertAdjacentHTML('afterend',h);else p.insertAdjacentHTML('beforeend',h);
}

/* ═════════ 6. FIN'S LITTLE WAYS ═════════ */
function frequency(){try{return (JSON.parse(localStorage.getItem('finPetSettings')||'{}').frequency)||'normal'}catch(e){return 'normal'}}
function finBusy(){
  var b=$('fin-bubble'),r=$('fin-pet-root');
  return !r||r.classList.contains('fin-minimized')||(b&&b.classList.contains('fin-show'))||D.hidden;
}
function antic(){
  setTimeout(antic,45000+Math.random()*70000);
  if(!W.FinPet||frequency()==='quiet'||finBusy()||reduced())return;
  var h=new Date().getHours(),r=Math.random();
  try{
    if(h<5&&r<.5)FinPet.setMood('sleepy',6000);
    else if(r<.4)FinPet.wave();
    else if(r<.7)FinPet.setMood('thinking',2400);
    else FinPet.setMood('happy',1600);
  }catch(e){}
}
var eyeRaf=0,px=0,py=0;
function onPointer(e){
  px=e.clientX;py=e.clientY;
  if(eyeRaf)return;
  eyeRaf=requestAnimationFrame(function(){
    eyeRaf=0;
    var spr=$('fin-sprite');if(!spr)return;
    var r=spr.getBoundingClientRect();if(!r.width)return;
    var dx=px-(r.left+r.width/2),dy=py-(r.top+r.height/2),dead=r.width*0.35;
    spr.style.setProperty('--lx',(Math.abs(dx)<dead?0:dx>0?1:-1)+'px');
    spr.style.setProperty('--ly',(Math.abs(dy)<dead?0:dy>0?1:-1)+'px');
  });
}
function checkin(){
  var l=L(),s=S();if(!l||!s||!s.username||!l.seeded)return;
  var t=td();if(l.greeted===t)return;
  var cover=$('welcome-splash'),auth=$('auth-overlay');
  try{if((cover&&getComputedStyle(cover).display!=='none')||(auth&&getComputedStyle(auth).display!=='none'))return}catch(e){}
  var h=new Date().getHours(),n=W.FinStreak?FinStreak.current():0,logged=W.FinStreak?FinStreak.loggedToday():true,fz=(ST()&&ST().freezes)||0;
  var ws=weekStart(t),msg=null,acts=null;
  if(l.weekHello!==ws&&new Date().getDay()!==0){
    l.weekHello=ws;
    msg="New week, fresh challenges. Three small ones are waiting on your dashboard.";
    acts=[act('Show me',function(){try{show('dashboard')}catch(e){}})];
    var pw=weekStats(addDays(ws,-7),addDays(ws,-1),addDays(ws,-14),addDays(ws,-8));
    if(pw.count&&l.recapSeen!==ws){msg="New week! Your recap for last week is ready, plus three fresh challenges.";acts=[act('See recap',openRecap),act('Later',function(){})]}
  }else if(!logged&&h>=18&&n>=2){
    msg="Evening! Your "+n+"-day streak is waiting"+(fz?" (and you have a freeze if life got busy)":"")+". Log something, or tell me nothing was spent.";
    acts=[act('Nothing spent',markNoSpend),act('Log expense',function(){try{show('expenses')}catch(e){}})];
  }else if(h>=22||h<4){
    return;   // never nag at night
  }
  if(!msg)return;
  tell(msg,acts,{mood:'happy',rank:1,wait:800,done:function(){l.greeted=t;persist()}});
}

/* ═════════ 7. EMPTY SCREENS ═════════ */
var EMPTY={
  'No expenses logged yet':["Tell me what you spent today. It takes five seconds.",'Log an expense','expenses'],
  'No expenses yet':["Tell me what you spent today. It takes five seconds.",'Log an expense','expenses'],
  'No data yet':["Log a few entries and I'll draw your first chart.",null,null],
  'No goals yet':["Pick something to save for. I'll cheer every peso.",'Create a goal','goals'],
  'No loans tracked yet':["Lent or borrowed something? Track it here so nothing gets awkward.",null,null],
  'No outstanding loans':["Nothing owed in either direction. Nice and clean.",null,null],
  'No income entries yet':["Got paid or received an allowance? Add it so I can see the full picture.",'Add income','income']
};
function decorateEmpties(){
  Array.prototype.forEach.call(D.querySelectorAll('.empty:not([data-fin])'),function(el){
    el.setAttribute('data-fin','1');
    if(el.closest('[class*="modal"],[class*="sheet"],[role="dialog"]'))return;
    var t=el.querySelector('.empty-title'),k=t?t.textContent.trim():'',m=EMPTY[k];
    if(!m)return;
    var h='<div class="life-empty-fin"><span class="lf-mini" aria-hidden="true"></span><span class="t">'+esc(m[0])+'</span>'+(m[1]?'<button type="button" class="lf-btn" data-lf="go" data-page="'+m[2]+'">'+esc(m[1])+'</button>':'')+'</div>';
    el.insertAdjacentHTML('beforeend',h);
  });
}

/* ═════════ wiring ═════════ */
var last={},sig='';
function wire(){
  if(wire.done)return;wire.done=true;
  var ON=function(ev,fn){W.addEventListener(ev,function(e){var d=(e&&e.detail)||{};try{fn(d)}catch(err){console.error('life',err)}})};
  var act8=function(d){if(d.auto)return;addXP(8,'log',{daily:true});celebrate('tick')};
  ON('fin:expense-logged',function(d){act8(d);if(!d.auto)bump('expense');checkChallenges(true)});
  ON('fin:income-added',function(d){act8(d);if(!d.auto)bump('income');checkChallenges(true)});
  ['fin:loan-added','fin:loan-adjusted','fin:balance-updated'].forEach(function(ev){ON(ev,act8)});
  ON('fin:goal-progress',function(d){
    act8(d);bump('goal');
    if(d.reached){addXP(100,'goal');celebrate('big')}
    checkChallenges(true);
  });
  ON('fin:goal-added',function(){addXP(15,'goal-added',{daily:true})});
  ON('fin:loan-settled',function(){addXP(80,'loan');celebrate('big')});
  ON('fin:learn-complete',function(){addXP(40,'lesson');bump('learn');celebrate('small');checkChallenges(true)});
  ON('fin:learn-quiz',function(){addXP(30,'quiz')});
  ON('fin:streak-up',function(d){
    addXP(15,'streak');
    if(d.milestone){addXP(40,'milestone');celebrate('big')}
    else if(d.newBest)celebrate('small');
    checkChallenges(true);syncCache();
  });
  ON('fin:badge',function(d){addXP(d.secret?60:40,'badge');celebrate(d.tier==='gold'||d.secret?'big':'badge')});
  ON('fin:freeze-earned',function(){
    try{toast('You earned a streak freeze')}catch(e){}
    setTimeout(function(){tell("You earned a streak freeze! If life gets busy, it covers up to two missed days. You can hold up to "+((W.FinVip&&FinVip.freezeCap())||2)+".",null,{mood:'happy',rank:2})},1500);
  });
  ON('fin:freeze-used',function(d){
    try{toast('Streak freeze used. Your streak is safe.')}catch(e){}
    setTimeout(function(){tell("Life happens. I used a freeze to cover "+(d.days||1)+" missed day"+((d.days||1)===1?'':'s')+" and your streak is still alive. Log something today and we're good.",null,{mood:'happy',rank:4})},1200);
  });
  D.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-lf]');if(!b)return;
    var k=b.getAttribute('data-lf');
    if(k==='fold')toggleFold();
    else if(k==='nospend')markNoSpend();
    else if(k==='recap')openRecap();
    else if(k==='close')closeRecap();
    else if(k==='go'){try{show(b.getAttribute('data-page'))}catch(err){}}
    else if(k==='remind')setReminder(b.getAttribute('aria-checked')!=='true');
    else if(k==='fx-confetti'||k==='fx-haptics'||k==='fx-sound'){
      var f=k.slice(3),l=L();l.fx[f]=!fxOn(f);persist();
      if(l.fx[f])celebrate(f==='sound'?'small':'badge');
      decoratePanel();
    }
  });
  D.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.getAttribute&&e.target.getAttribute('data-lf')==='fold'){e.preventDefault();toggleFold()}});
  D.addEventListener('change',function(e){
    var t=e.target;if(t&&t.getAttribute&&t.getAttribute('data-lf')==='time'&&/^\d{2}:\d{2}$/.test(t.value)){var l=L();l.remind.time=t.value;l.remind.notified='';persist();syncCache()}
  });
  W.addEventListener('pointermove',onPointer,{passive:true});
  D.addEventListener('visibilitychange',function(){if(!D.hidden){checkReminder();syncCache()}});
  setInterval(checkReminder,60000);
  setTimeout(antic,60000);
  waitForFin();
}
var checkinTimer=0;
function tick(){
  var s=S();if(!s||!s.username)return;
  wire();
  var l=L();if(!l)return;
  if(!l.seeded)seed();
  rollWeek();
  checkChallenges(true);
  renderCard();countUps();decorateEmpties();applyFin();syncCache();
  if(!checkinTimer&&!tick.checked){checkinTimer=setTimeout(function(){checkinTimer=0;tick.checked=true;checkin()},9000)}
}

W.FinLife={tick:tick,celebrate:celebrate,confetti:confetti,addXP:addXP,level:lvInfo,decoratePanel:decoratePanel,openRecap:openRecap,markNoSpend:markNoSpend,
  challenges:activeChallenges,applyFin:applyFin,levels:LEVELS,tell:tell};
})();
