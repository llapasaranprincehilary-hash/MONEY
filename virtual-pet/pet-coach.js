/* ============================================================
   Fin the coach: a kind, teacher-and-buddy layer on top of Fin's existing reactions.
   It listens to what the person does (logging, saving, learning, streaks, badges) and, when it has
   something genuinely useful, adds one short piece of real money-management teaching.
   Rules it follows:
     - Never shames. Mistakes and gaps are met with "that's normal, here's the next small step".
     - One idea at a time, in plain words, tied to what they just did.
     - Each teaching moment has a cool-down so it never nags (kept in state.coach so it syncs).
     - Goes through FinPet.coach(), so it respects Fin's Quiet mode, the tour, and an open menu.
   If the coach stays quiet, Fin's normal one-line reaction still plays.
   ============================================================ */
(function(){
'use strict';
var W=window;
function S(){try{return state}catch(e){return{}}}
function td(){try{return today()}catch(e){return new Date().toISOString().slice(0,10)}}
function money(n){try{return fmt(n)}catch(e){return '₱'+Math.round(n).toLocaleString()}}
function first(){var n=String(S().username||'').trim().split(/\s+/)[0];return n}
function sum(a){return a.reduce(function(x,y){return x+(+y.amount||0)},0)}
function mk(){return td().slice(0,7)}
function persist(){try{save()}catch(e){}}

/* cool-downs that sync with the account */
function memo(){var s=S();if(!s.coach||typeof s.coach!=='object')s.coach={};if(!s.coach.seen)s.coach.seen={};return s.coach.seen}
function daysSince(iso){if(!iso)return 1e9;var a=new Date(iso+'T00:00:00'),b=new Date(td()+'T00:00:00');return Math.round((b-a)/864e5)}
function fresh(key,days){return daysSince(memo()[key])>=(days||1)}
function mark(key){memo()[key]=td();persist()}

var CATS={food:'Food',transport:'Transport',shopping:'Shopping',utilities:'Utilities',health:'Health',entertainment:'Entertainment','other-exp':'Other'};
var WANTS={shopping:1,entertainment:1};

/* delivery */
var pending=[];
function lessonAction(id){
  try{var l=(W.FinLearn&&FinLearn.lessons||[]).filter(function(x){return x.id===id})[0];if(!l)return null;
    return{label:'📚 '+l.title,kind:'custom',onClick:function(){FinLearn.open(id)}}}catch(e){return null}
}
function goAction(label,page){return{label:label,kind:'custom',onClick:function(){try{show(page)}catch(e){}}}}
function deliver(msg,opt,tries){
  opt=opt||{};tries=tries||0;
  var ok=false;
  try{ok=!!(W.FinPet&&W.FinPet.coach&&W.FinPet.coach(msg,opt))}catch(e){}
  // Fin may be mid-sentence (his own one-time tips, a menu...). Wait for a gap and try again instead of dropping a lesson.
  if(!ok&&tries<(opt.priority?3:2))setTimeout(function(){deliver(msg,opt,tries+1)},opt.priority?9000:7000);
  return ok;
}
/* One action can trigger several reactions at once (a badge, a streak day, a teaching tip...).
   Collect them for a moment and speak only the most useful one, so Fin never talks in a pile-up. */
var box=[],boxT=0;
function say(text,actions,opt){
  opt=opt||{};
  var acts=(actions||[]).filter(Boolean).slice(0,2);
  box.push({rank:opt.rank||2,opt:opt,msg:{text:text,mood:opt.mood||'happy',actions:acts.length?acts:[{label:'Thanks, Fin',kind:'custom',onClick:function(){}}],stayMs:opt.stayMs||13000}});
  if(!boxT)boxT=setTimeout(flush,650);
  return true;
}
function flush(){
  boxT=0;
  var best=box.sort(function(a,b){return b.rank-a.rank})[0];box=[];
  if(best)deliver(best.msg,best.opt);
}

/* ───────── what they just did ───────── */
function onExpense(d){
  if(d.recurring)return;
  var s=S(),all=(s.expenses||[]).length,nm=first();
  var exps=(s.expenses||[]).filter(function(e){return String(e.date||'').slice(0,7)===mk()&&e.cat!=='loan-payment'});
  var total=sum(exps),n=exps.length,amt=+d.amount||0;
  if(all<=1&&fresh('first-expense',9999)){mark('first-expense');
    return say('Your very first entry'+(nm?', '+nm:'')+'! That is the hardest one. Tracking works because seeing your money makes better choices easier. Tip: log it right after you pay, it takes ten seconds.',[lessonAction('tracking')],{priority:true,rank:2.6})}
  if(n>=6&&total>0){
    var by={};exps.forEach(function(e){by[e.cat||'other-exp']=(by[e.cat||'other-exp']||0)+(+e.amount||0)});
    var top=Object.keys(by).sort(function(a,b){return by[b]-by[a]})[0],p=Math.round(by[top]/total*100);
    if(p>=45&&fresh('pareto-'+mk()+top,40))
      {mark('pareto-'+mk()+top);return say((CATS[top]||'One category')+' is '+p+'% of this month\'s spending. The 80/20 rule says a few categories drive most of the total, so that is the best place to look. No judgment, just awareness.',[lessonAction('tracking')])}
    var wants=0;Object.keys(by).forEach(function(k){if(WANTS[k])wants+=by[k]});
    var wp=Math.round(wants/total*100);
    if(n>=8&&wp>=40&&fresh('wants-'+mk(),40))
      {mark('wants-'+mk());return say('Wants are about '+wp+'% of this month\'s spending. The 50/30/20 guide suggests around 30%. Try the 24-hour rule on your next non-essential buy. Enjoying your money is allowed.',[lessonAction('budgeting')])}
  }
  if(WANTS[d.cat]&&n>=4&&amt>=Math.max(500,total*0.25)&&fresh('24h',6)){mark('24h');
    return say('That is a bigger one. For wants like this, the 24-hour rule helps: wait a day and see if it still feels worth it. If yes, buy it guilt-free.',[lessonAction('spending')])}
  var rot=[['habit-stack','Small tip: attach logging to something you already do, like right after meals or before bed. Habits stick when they ride on other habits (it is called habit stacking).','tracking'],
           ['two-minute','If logging ever feels like a chore, shrink it: just log the amount now and fix the details later. A two-minute action beats a perfect one you skip.','tracking'],
           ['envelope','Old-school trick that still works: the envelope method. Give each category a fixed amount for the month, and when it is gone, it is gone.','budgeting']];
  for(var i=0;i<rot.length;i++){var r=rot[i];
    if(fresh('rot-'+r[0],21)&&fresh('rot-any',3)){mark('rot-'+r[0]);mark('rot-any');return say(r[1],[lessonAction(r[2])])}}
}
function onIncome(d){
  var amt=+d.amount||0;if(!amt||!fresh('payfirst-'+mk(),40))return;
  mark('payfirst-'+mk());
  say('Income in! A classic move is "pay yourself first": set aside about 20% ('+money(Math.round(amt*0.2))+' of this) for savings before you spend. Even 10% builds the habit.',[goAction('Set a goal','goals'),lessonAction('saving')]);
}
function onGoal(d){
  var g=d.goal;if(!g)return;var left=Math.max(0,(+g.target||0)-(+g.saved||0));
  if(left<=0||!fresh('goal-pace',2))return;mark('goal-pace');
  say('Great goal'+(first()?', '+first():'')+'! Goals work best with a pace: '+money(Math.round(left/6))+' a month gets you there in 6 months, or '+money(Math.round(left/12))+' in 12. Pick the one that fits your life.',[lessonAction('saving')]);
}
function onLoan(d){
  var l=d.loan||{};
  if(l.type==='payable'&&fresh('debt-method',7)){mark('debt-method');
    return say('Noted. Two proven ways to clear debt: avalanche (highest interest first) saves the most money, snowball (smallest balance first) builds momentum. Either works. Consistency matters most.',[lessonAction('debt')])}
  if(l.type!=='payable'&&fresh('lent-note',7)){mark('lent-note');
    return say('Good that you wrote it down. Agree on a pay-back date with them. Clear numbers keep friendships easy.',[lessonAction('debt')])}
}
function onBudget(d){
  var amt=+d.amount||0;if(!amt||!fresh('budget-'+mk(),40))return;mark('budget-'+mk());
  var s=S(),MO=[];try{MO=MONTH_ORDER}catch(e){}var now=new Date();
  var inc=sum((s.income||[]).filter(function(i){return i.month===MO[now.getMonth()]&&(i.year||now.getFullYear())===now.getFullYear()})),pct=inc?Math.round(amt/inc*100):0;
  var t='Budget set to '+money(amt)+'. '+(pct?'That is about '+pct+'% of this month\'s income. '+(pct>=90?'Try to leave room for savings, around 20% is a good target. ':''):'')+'Give every peso a job (zero-based budgeting) and send whatever is left to savings.';
  say(t,[lessonAction('budgeting')]);
}
function onWallet(){if(!fresh('wallet-nw',5))return;mark('wallet-nw');
  say('Account added. Having every account in one place shows your true net worth, the number that really tells you if you are growing.',[lessonAction('tracking')])}
function onBalance(){if(!fresh('reconcile',7))return;mark('reconcile');
  say('Balance updated. Matching the app to your real balances once a week (reconciling) keeps your numbers trustworthy.',[lessonAction('tracking')])}

/* learning */
function lessonById(id){try{return(FinLearn.lessons||[]).filter(function(l){return l.id===id})[0]}catch(e){return null}}
function onLesson(d){
  var l=lessonById(d.id);if(!l)return;
  var perfect=d.score===d.total,nm=first(),acts=[];
  if(l.tryIt)acts.push(goAction(l.tryIt.label,l.tryIt.page));
  var t;
  if(perfect&&fresh('spaced',9999)){mark('spaced');t='Perfect on "'+l.title+'"! Here is a study trick: spaced repetition. Re-read this lesson in a few days and it will stick far better than cramming.'}
  else if(perfect)t='Perfect score on "'+l.title+'"'+(nm?', '+nm:'')+'! Try it for real in the app while it is fresh.';
  else t='You got '+d.score+'/'+d.total+' on "'+l.title+'". Mistakes are how memory forms. Read the cards once more and try again whenever you like.';
  say(t,acts,{priority:true,rank:3});
}
function onQuiz(d){
  var L=(S().learn)||{},nm=first();
  if(d.which==='pre')return say('Starter Quiz done: '+d.pct+'%. That is your baseline, not a grade. Everyone starts somewhere, and now we can see how far you grow.',[lessonAction('budgeting')],{priority:true,rank:3});
  var pre=L.pre?L.pre.pct:null;
  if(pre!=null&&d.pct>pre)return say('You went from '+pre+'% to '+d.pct+'%'+(nm?', '+nm:'')+'! That is real learning. Money skills are built, not born.',null,{priority:true,mood:'excited',rank:3});
  say('Progress Quiz: '+d.pct+'%. Scores bounce around, and that is fine. Revisit a lesson, wait a couple of days, and try the ideas in the app. You are learning.',[lessonAction('saving')],{priority:true,rank:3});
}

/* streaks and badges */
var MS={
  3:'3 days in a row! Habit research says the first week is the wobbly part. You are already past the hardest bit.',
  7:'7 days! A full week of showing up. That is how real habits start.',
  14:'14 days straight. Two weeks of logging means you actually know where your money goes now.',
  30:'30 days! They say habits take a few weeks to form, and you just proved it. Proud of you.',
  60:'60 days. This is not a streak anymore, it is who you are now.',
  100:'100 days!! Genuinely impressive. You have built a lifelong money habit.'
};
function onStreak(d){
  if(d.first)return say('Day 1 of your streak! Tip: pair logging with something you already do, like right after dinner. It is called habit stacking, and it works.',[{label:'See my streak',kind:'custom',onClick:function(){try{FinStreak.openFromAnywhere()}catch(e){}}}],{priority:true,rank:1.5});
  if(d.milestone&&MS[d.milestone])return say(MS[d.milestone],[{label:'See my badges',kind:'custom',onClick:function(){try{FinStreak.openFromAnywhere()}catch(e){}}}],{priority:true,mood:'excited',rank:3});
}
function onRest(d){say('Your rest day just did its job: streak safe at '+d.current+'. Everyone needs a breather. Just do not let it become the pattern.',null,{priority:true,rank:2.5})}
function onBroken(d){
  var nm=first();
  say('Welcome back'+(nm?', '+nm:'')+'! Your '+d.was+'-day streak ended, but streaks reset and habits do not. Log something today and you are at day 1 again. Your best is '+d.best+', and you will beat it.',[{label:'Log an expense',kind:'custom',onClick:function(){try{openQuick()}catch(e){}}}],{priority:true,mood:'happy',rank:3});
}
function onBadge(d){
  if(/^streak-/.test(d.id))return;          // the streak message already celebrates these
  say(d.icon+' New badge: '+d.label+'. '+d.hint+'. Nicely done!',[{label:'See my badges',kind:'custom',onClick:function(){try{FinStreak.openFromAnywhere()}catch(e){}}}],{rank:1,mood:'excited'});   // lowest rank: the badge toast already told them
}

function on(ev,fn){W.addEventListener(ev,function(e){try{fn((e&&e.detail)||{})}catch(err){console.error('coach',err)}})}
on('fin:expense-logged',onExpense);on('fin:income-added',onIncome);on('fin:goal-added',onGoal);
on('fin:loan-added',onLoan);on('fin:budget-saved',onBudget);on('fin:wallet-added',onWallet);on('fin:balance-updated',onBalance);
on('fin:learn-complete',onLesson);on('fin:learn-quiz',onQuiz);
on('fin:streak-up',onStreak);on('fin:streak-rest',onRest);on('fin:streak-broken',onBroken);on('fin:badge',onBadge);
W.FinCoach={say:say,lessonAction:lessonAction};
})();
