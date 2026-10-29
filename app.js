
/* ── BIBLE VERSES (money / provision / stewardship) ── */
const VERSES=[
  {text:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",ref:"Jeremiah 29:11"},
  {text:"Keep your life free from love of money, and be content with what you have, for he has said, 'I will never leave you nor forsake you.'",ref:"Hebrews 13:5"},
  {text:"Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, and see if I will not throw open the floodgates of heaven.",ref:"Malachi 3:10"},
  {text:"The Lord is my shepherd; I shall not want.",ref:"Psalm 23:1"},
  {text:"And my God will meet all your needs according to the riches of his glory in Christ Jesus.",ref:"Philippians 4:19"},
  {text:"Dishonest money dwindles away, but whoever gathers money little by little makes it grow.",ref:"Proverbs 13:11"},
  {text:"Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing.",ref:"Proverbs 3:9-10"},
  {text:"The blessing of the Lord makes rich, and he adds no sorrow with it.",ref:"Proverbs 10:22"},
  {text:"No one can serve two masters. Either you will hate the one and love the other... You cannot serve both God and money.",ref:"Matthew 6:24"},
  {text:"A good person leaves an inheritance for their children's children.",ref:"Proverbs 13:22"},
  {text:"Owe no one anything, except to love each other, for the one who loves another has fulfilled the law.",ref:"Romans 13:8"},
  {text:"Plans fail for lack of counsel, but with many advisers they succeed.",ref:"Proverbs 15:22"},
  {text:"Whoever is faithful in a very little is also faithful in much, and whoever is dishonest in a very little is also dishonest in much.",ref:"Luke 16:10"},
  {text:"Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.",ref:"Luke 6:38"},
  {text:"Commit to the Lord whatever you do, and he will establish your plans.",ref:"Proverbs 16:3"},
  {text:"The rich rules over the poor, and the borrower is the slave of the lender.",ref:"Proverbs 22:7"},
  {text:"For the love of money is a root of all kinds of evils.",ref:"1 Timothy 6:10"},
  {text:"Seek first the kingdom of God and his righteousness, and all these things will be added to you.",ref:"Matthew 6:33"},
  {text:"Be not one of those who give pledges, who put up security for debts. If you have nothing with which to pay, why should your bed be taken from under you?",ref:"Proverbs 22:26-27"},
  {text:"I have learned, in whatever situation I am, to be content.",ref:"Philippians 4:11"},
  {text:"The plans of the diligent lead surely to abundance, but everyone who is hasty comes only to poverty.",ref:"Proverbs 21:5"},
  {text:"Cast your bread upon the waters, for you will find it after many days.",ref:"Ecclesiastes 11:1"},
  {text:"A feast is made for laughter, wine makes life merry, and money is the answer for everything - but wisdom is better than weapons of war.",ref:"Ecclesiastes 10:19"},
  {text:"Do not store up for yourselves treasures on earth... but store up for yourselves treasures in heaven.",ref:"Matthew 6:19-20"},
  {text:"In all toil there is profit, but mere talk tends only to poverty.",ref:"Proverbs 14:23"},
  {text:"Whoever loves money never has enough; whoever loves wealth is never satisfied with their income.",ref:"Ecclesiastes 5:10"},
  {text:"Lazy hands make for poverty, but diligent hands bring wealth.",ref:"Proverbs 10:4"},
  {text:"Suppose one of you wants to build a tower. Won't you first sit down and estimate the cost to see if you have enough money to complete it?",ref:"Luke 14:28"},
  {text:"Now godliness with contentment is great gain.",ref:"1 Timothy 6:6"},
  /* w:[...] = optional "when" tags: weekday (sun..sat), am/pm/eve/night, start/end of month, payday, jan, dec */
  {text:"This is the day that the Lord has made; let us rejoice and be glad in it.",ref:"Psalm 118:24",w:["am"]},
  {text:"The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",ref:"Lamentations 3:22-23",w:["am", "jan"]},
  {text:"Let me hear in the morning of your steadfast love, for in you I trust.",ref:"Psalm 143:8",w:["am"]},
  {text:"Whatever you do, work heartily, as for the Lord and not for men.",ref:"Colossians 3:23",w:["am", "mon"]},
  {text:"Whatever your hand finds to do, do it with all your might.",ref:"Ecclesiastes 9:10",w:["mon", "am"]},
  {text:"Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank.",ref:"Proverbs 22:29",w:["mon"]},
  {text:"Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary.",ref:"Isaiah 40:31",w:["mon", "am"]},
  {text:"Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",ref:"Deuteronomy 31:6",w:["mon"]},
  {text:"I can do all this through him who gives me strength.",ref:"Philippians 4:13",w:["mon", "tue"]},
  {text:"The sluggard craves and gets nothing, but the desires of the diligent are fully satisfied.",ref:"Proverbs 13:4",w:["am", "mon"]},
  {text:"Go to the ant, you sluggard; consider its ways and be wise!",ref:"Proverbs 6:6",w:["mon", "am"]},
  {text:"Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",ref:"Galatians 6:9",w:["tue", "wed", "thu"]},
  {text:"Let us run with perseverance the race marked out for us.",ref:"Hebrews 12:1",w:["wed", "thu"]},
  {text:"The Lord is my strength and my shield; my heart trusts in him, and he helps me.",ref:"Psalm 28:7",w:["wed"]},
  {text:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",ref:"Proverbs 3:5-6",w:["wed", "tue"]},
  {text:"Blessed is the one who trusts in the Lord, whose confidence is in him.",ref:"Jeremiah 17:7",w:["wed", "thu"]},
  {text:"Two are better than one, because they have a good return for their labor.",ref:"Ecclesiastes 4:9",w:["tue", "thu"]},
  {text:"Unless the Lord builds the house, the builders labor in vain.",ref:"Psalm 127:1",w:["tue", "wed"]},
  {text:"May he give you the desire of your heart and make all your plans succeed.",ref:"Psalm 20:4",w:["thu"]},
  {text:"Write down the vision; make it plain on tablets, so that a runner may read it.",ref:"Habakkuk 2:2",w:["tue", "start"]},
  {text:"The laborer deserves his wages.",ref:"Luke 10:7",w:["fri", "payday"]},
  {text:"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",ref:"2 Corinthians 9:7",w:["payday", "sun"]},
  {text:"It is more blessed to give than to receive.",ref:"Acts 20:35",w:["payday", "sun"]},
  {text:"A generous person will prosper; whoever refreshes others will be refreshed.",ref:"Proverbs 11:25",w:["payday", "fri"]},
  {text:"Whoever is generous to the poor lends to the Lord, and he will reward them for what they have done.",ref:"Proverbs 19:17",w:["payday"]},
  {text:"The generous will themselves be blessed, for they share their food with the poor.",ref:"Proverbs 22:9",w:["payday", "sun"]},
  {text:"Do not withhold good from those to whom it is due, when it is in your power to act.",ref:"Proverbs 3:27",w:["payday"]},
  {text:"Do not forget to do good and to share with others, for with such sacrifices God is pleased.",ref:"Hebrews 13:16",w:["payday", "sun"]},
  {text:"Whoever gives to the poor will lack nothing, but those who close their eyes to them receive many curses.",ref:"Proverbs 28:27",w:["payday"]},
  {text:"Anyone who has been stealing must steal no longer, but must work, doing something useful with their own hands, that they may have something to share with those in need.",ref:"Ephesians 4:28",w:["fri", "payday"]},
  {text:"For everything comes from you, and we have given you only what comes from your hand.",ref:"1 Chronicles 29:14",w:["payday", "sun"]},
  {text:"Command those who are rich in this present world... to do good, to be rich in good deeds, and to be generous and willing to share.",ref:"1 Timothy 6:17-18",w:["payday"]},
  {text:"If anyone has material possessions and sees a brother or sister in need but has no pity on them, how can the love of God be in that person?",ref:"1 John 3:17",w:["payday"]},
  {text:"Remember the Sabbath day by keeping it holy.",ref:"Exodus 20:8",w:["sun"]},
  {text:"I rejoiced with those who said to me, \"Let us go to the house of the Lord.\"",ref:"Psalm 122:1",w:["sun"]},
  {text:"Come, let us bow down in worship, let us kneel before the Lord our Maker.",ref:"Psalm 95:6",w:["sun"]},
  {text:"Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another.",ref:"Hebrews 10:25",w:["sun"]},
  {text:"Be still, and know that I am God.",ref:"Psalm 46:10",w:["sun", "sat"]},
  {text:"Give thanks to the Lord, for he is good; his love endures forever.",ref:"Psalm 107:1",w:["sun", "sat"]},
  {text:"Taste and see that the Lord is good; blessed is the one who takes refuge in him.",ref:"Psalm 34:8",w:["sun", "sat"]},
  {text:"Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",ref:"1 Thessalonians 5:16-18",w:["sun", "sat"]},
  {text:"The earth is the Lord's, and everything in it, the world, and all who live in it.",ref:"Psalm 24:1",w:["sun", "sat"]},
  {text:"Every good and perfect gift is from above, coming down from the Father of the heavenly lights.",ref:"James 1:17",w:["sun", "sat"]},
  {text:"The Lord has done great things for us, and we are filled with joy.",ref:"Psalm 126:3",w:["sat", "sun"]},
  {text:"Delight yourself in the Lord, and he will give you the desires of your heart.",ref:"Psalm 37:4",w:["sat"]},
  {text:"In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",ref:"Psalm 4:8",w:["night", "eve"]},
  {text:"Come to me, all you who are weary and burdened, and I will give you rest.",ref:"Matthew 11:28",w:["eve", "night"]},
  {text:"In vain you rise early and stay up late, toiling for food to eat - for he grants sleep to those he loves.",ref:"Psalm 127:2",w:["night", "eve"]},
  {text:"When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",ref:"Proverbs 3:24",w:["night"]},
  {text:"Weeping may stay for the night, but rejoicing comes in the morning.",ref:"Psalm 30:5",w:["night", "eve"]},
  {text:"Cast all your anxiety on him because he cares for you.",ref:"1 Peter 5:7",w:["eve", "night"]},
  {text:"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",ref:"Philippians 4:6",w:["eve", "night"]},
  {text:"Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",ref:"Matthew 6:34",w:["night", "eve"]},
  {text:"I lift up my eyes to the hills - where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",ref:"Psalm 121:1-2",w:["night", "eve"]},
  {text:"Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.",ref:"Psalm 55:22",w:["night", "eve", "end"]},
  {text:"The prudent see danger and take refuge, but the simple keep going and pay the penalty.",ref:"Proverbs 22:3",w:["start"]},
  {text:"The wise store up choice food and olive oil, but fools gulp theirs down.",ref:"Proverbs 21:20",w:["start"]},
  {text:"Be sure you know the condition of your flocks, give careful attention to your herds; for riches do not endure forever.",ref:"Proverbs 27:23-24",w:["start"]},
  {text:"Put your outdoor work in order and get your fields ready; after that, build your house.",ref:"Proverbs 24:27",w:["start"]},
  {text:"By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures.",ref:"Proverbs 24:3-4",w:["start"]},
  {text:"Ants are creatures of little strength, yet they store up their food in the summer.",ref:"Proverbs 30:25",w:["start"]},
  {text:"But everything should be done in a fitting and orderly way.",ref:"1 Corinthians 14:40",w:["start", "mon"]},
  {text:"The simple believe anything, but the prudent give thought to their steps.",ref:"Proverbs 14:15",w:["start"]},
  {text:"The wise woman builds her house, but with her own hands the foolish one tears hers down.",ref:"Proverbs 14:1",w:["start"]},
  {text:"A false balance is an abomination to the Lord, but a just weight is his delight.",ref:"Proverbs 11:1",w:["start"]},
  {text:"Let the wise listen and add to their learning, and let the discerning get guidance.",ref:"Proverbs 1:5",w:["start", "mon"]},
  {text:"Do not wear yourself out to get rich; do not trust your own cleverness. Cast but a glance at riches, and they are gone, for they will surely sprout wings and fly off to the sky.",ref:"Proverbs 23:4-5",w:["start", "end"]},
  {text:"Give us today our daily bread.",ref:"Matthew 6:11",w:["end"]},
  {text:"Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?",ref:"Matthew 6:26",w:["end"]},
  {text:"I was young and now I am old, yet I have never seen the righteous forsaken or their children begging bread.",ref:"Psalm 37:25",w:["end"]},
  {text:"So Abraham called that place The Lord Will Provide.",ref:"Genesis 22:14",w:["end"]},
  {text:"The eyes of all look to you, and you give them their food at the proper time.",ref:"Psalm 145:15",w:["end"]},
  {text:"Better a little with the fear of the Lord than great wealth with turmoil.",ref:"Proverbs 15:16",w:["end"]},
  {text:"Better a little with righteousness than much gain with injustice.",ref:"Proverbs 16:8",w:["end"]},
  {text:"The Lord your God has blessed you in all the work of your hands... and you have lacked nothing.",ref:"Deuteronomy 2:7",w:["end"]},
  {text:"God is our refuge and strength, an ever-present help in trouble.",ref:"Psalm 46:1",w:["end"]},
  {text:"A little that the righteous have is better than the wealth of many wicked.",ref:"Psalm 37:16",w:["end"]},
  {text:"Whoever trusts in his riches will fall, but the righteous will thrive like a green leaf.",ref:"Proverbs 11:28",w:["end"]},
  {text:"Life is more than food, and the body more than clothes.",ref:"Luke 12:23",w:["end"]},
  {text:"Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions.",ref:"Luke 12:15",w:["end"]},
  {text:"And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",ref:"Romans 8:28",w:["end", "night"]},
  {text:"Forgetting what is behind and straining toward what is ahead, I press on toward the goal.",ref:"Philippians 3:13-14",w:["jan"]},
  {text:"See, I am doing a new thing! Now it springs up; do you not perceive it?",ref:"Isaiah 43:19",w:["jan"]},
  {text:"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",ref:"2 Corinthians 5:17",w:["jan"]},
  {text:"Teach us to number our days, that we may gain a heart of wisdom.",ref:"Psalm 90:12",w:["jan", "start"]},
  {text:"Trust in the Lord and do good; dwell in the land and enjoy safe pasture.",ref:"Psalm 37:3",w:["jan", "mon"]},
  {text:"Thanks be to God for his indescribable gift!",ref:"2 Corinthians 9:15",w:["dec"]},
  {text:"For to us a child is born, to us a son is given.",ref:"Isaiah 9:6",w:["dec"]},
  {text:"Glory to God in the highest heaven, and on earth peace to those on whom his favor rests.",ref:"Luke 2:14",w:["dec"]},
  {text:"Remember the Lord your God, for it is he who gives you the ability to produce wealth.",ref:"Deuteronomy 8:18"},
  {text:"Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things.",ref:"Matthew 25:21"},
  {text:"For where your treasure is, there your heart will be also.",ref:"Matthew 6:21"},
  {text:"What good will it be for someone to gain the whole world, yet forfeit their soul?",ref:"Matthew 16:26"},
  {text:"Some trust in chariots and some in horses, but we trust in the name of the Lord our God.",ref:"Psalm 20:7"},
  {text:"Be joyful in hope, patient in affliction, faithful in prayer.",ref:"Romans 12:12"},
  {text:"The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.",ref:"Proverbs 9:10"},
  {text:"How much better to get wisdom than gold, to get insight rather than silver!",ref:"Proverbs 16:16"},
  {text:"For the Lord gives wisdom; from his mouth come knowledge and understanding.",ref:"Proverbs 2:6"},
  {text:"Whoever loves pleasure will become poor; whoever loves wine and olive oil will never be rich.",ref:"Proverbs 21:17"},
  {text:"The wicked borrow and do not repay, but the righteous give generously.",ref:"Psalm 37:21"},
  {text:"The Lord is good to those whose hope is in him, to the one who seeks him.",ref:"Lamentations 3:25"},
  {text:"A person who lacks judgment shakes hands in pledge and puts up security for a neighbor.",ref:"Proverbs 17:18"},
];

// Which "moments" is it right now? Used to lean verses toward the day / time.
function verseContext(d){
  d=d||new Date();
  const h=d.getHours(),dt=d.getDate(),m=d.getMonth();
  const dim=new Date(d.getFullYear(),m+1,0).getDate();
  const tags=[['sun','mon','tue','wed','thu','fri','sat'][d.getDay()], h<12?'am':h<18?'pm':'eve'];
  if(h>=21||h<4)tags.push('night');
  if(dt<=5)tags.push('start');
  if(dt>=dim-4)tags.push('end');
  if((dt>=14&&dt<=16)||dt>=dim-1||dt<=1)tags.push('payday');   // 15th / 30th pay cycle
  if(m===0)tags.push('jan');
  if(m===11)tags.push('dec');
  return tags;
}
// No-repeat picker: remembers what was shown (per storeKey) and only starts over once
// EVERY verse has been seen. `bias` = chance to prefer verses that fit today/right now.
function pickVerse(storeKey,bias){
  const tags=verseContext();
  let seen=[];
  try{seen=JSON.parse(localStorage.getItem(storeKey)||'[]');if(!Array.isArray(seen))seen=[];}catch(e){seen=[];}
  let pool=VERSES.filter(v=>seen.indexOf(v.ref)===-1);
  if(!pool.length){                       // whole list read -> new round, but skip the last few
    seen=seen.slice(-Math.min(5,VERSES.length-1));
    pool=VERSES.filter(v=>seen.indexOf(v.ref)===-1);
  }
  const fit=pool.filter(v=>v.w&&v.w.some(x=>tags.indexOf(x)!==-1));
  const from=(fit.length&&Math.random()<bias)?fit:pool;
  const v=from[Math.floor(Math.random()*from.length)];
  seen.push(v.ref);
  try{localStorage.setItem(storeKey,JSON.stringify(seen));}catch(e){}
  return v;
}
// One verse per calendar day (stable all day), never repeating until the whole list
// has been shown, and leaning toward verses that suit the day (Sunday, payday, month start...).
function getDailyVerse(){
  const today=new Date().toDateString();
  try{
    const s=JSON.parse(localStorage.getItem('finDailyVerse')||'null');
    if(s&&s.d===today){const f=VERSES.find(v=>v.ref===s.ref);if(f)return f;}
  }catch(e){}
  const v=pickVerse('finSeenDailyVerses',0.85);
  try{localStorage.setItem('finDailyVerse',JSON.stringify({d:today,ref:v.ref}));}catch(e){}
  return v;
}

function closeSplash(){
  const el=document.getElementById('welcome-splash');
  el.style.transition='opacity .4s ease, transform .4s ease';
  el.style.opacity='0';el.style.transform='scale(.97)';
  setTimeout(()=>{el.style.display='none';clearTimeout(verseTimer);clearInterval(verseProgTimer);},400);
  sessionStorage.setItem('mtUnlocked','1');
}
function showSplash(){
  // Set SPLASH_ONCE_PER_DAY=true to only show "Word for Today" the first time you get in each day.
  // (false = every time you open/unlock, with a different verse each time.)
  const SPLASH_ONCE_PER_DAY=false;
  if(SPLASH_ONCE_PER_DAY){
    try{
      if(localStorage.getItem('finSplashDay')===today()){closeSplash();return;}
      localStorage.setItem('finSplashDay',today());
    }catch(e){}
  }
  // show welcome splash for returning user after unlock or no-pin scenario
  const el=document.getElementById('welcome-splash');
  if(el){el.style.display='flex';el.style.opacity='1';el.style.transform='';}
  initSplash();
  sessionStorage.setItem('mtUnlocked','1');
}

const MONTH_ORDER=['January','February','March','April','May','June','July','August','September','October','November','December'];
const PAGE_TITLES={dashboard:'Dashboard',income:'Income',balances:'Balances',expenses:'Expenses',loans:'Loans',goals:'Goals & Budget',learn:'Learn',settings:'Profile',export:'Export'};
const CAT_LABELS={food:'Food',transport:'Transport',shopping:'Shopping',utilities:'Utilities',health:'Health',entertainment:'Entertainment','loan-payment':'Loan Payment','other-exp':'Other'};
const CAT_ICON={food:'utensils',transport:'bus',shopping:'bag',utilities:'bolt',health:'heart',entertainment:'gamepad','loan-payment':'swap','other-exp':'box'};
// icon + name, coloured per category (plain names stay in CAT_LABELS for CSV, reports and charts)
function catHTML(k){return '<span class="cat-ic cat-'+esc(k)+'">'+FinIcons.ic(CAT_ICON[k]||'box')+esc(CAT_LABELS[k]||'Other')+'</span>';}
let expFilter='all';

function today(){
  // Local calendar date, not UTC - toISOString() converts to UTC first, which
  // in timezones ahead of UTC (e.g. UTC+8) mislabels anything logged between
  // midnight and sunrise as the previous day.
  const d=new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}

/* ── SAFE DATE / STATE HELPERS ──
   ldate(): parse "YYYY-MM-DD" as a LOCAL date. new Date('2026-10-01') is UTC midnight, which is
   the previous day west of UTC, so budgets, reports and due-dates were off by a day/month there. */
function ldate(s){
  if(typeof s==='string'){const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(s);if(m)return new Date(+m[1],+m[2]-1,+m[3]);}
  return new Date(s);
}
/* Run fn once the user is signed in, unlocked and the first cloud sync has settled (or failed).
   The startup reminders used to fire on a fixed timer: on the login/PIN screen, or before cloud data arrived. */
function whenAppReady(fn,tries){
  tries=tries||0;
  let unlocked=false;try{unlocked=!!sessionStorage.getItem('mtUnlocked');}catch(e){}
  if(cloudUser&&unlocked&&!cloudLoadInFlight){fn();return;}
  if(tries<45)setTimeout(function(){whenAppReady(fn,tries+1);},1000);
}
/* Turn ANY saved/synced/backup object into a complete, safe state: fills missing fields, migrates the
   old balances format, forces arrays + numbers (a string amount would turn sums into string concatenation),
   and makes sure nextId can never hand out an id that is already in use. */
function normalizeState(raw){
  const def=defaultState();
  const s=Object.assign({},(raw&&typeof raw==='object'&&!Array.isArray(raw))?raw:{});
  if(s.balances&&!s.wallets){
    const b=s.balances;const d=s.balanceDates||{};
    s.wallets=[
      {id:'maya',label:'Maya',balance:b.maya||0,updated:d.maya||today()},
      {id:'gcash',label:'GCash',balance:b.gcash||0,updated:d.gcash||today()},
      {id:'coh',label:'Cash on Hand',balance:b.coh||0,updated:d.coh||today()},
    ];
  }
  delete s.balances;delete s.balanceDates;
  const out=Object.assign({},def,s);
  ['wallets','income','expenses','loans','goals'].forEach(k=>{
    out[k]=Array.isArray(out[k])?out[k].filter(x=>x&&typeof x==='object'):[];
  });
  if(!out.wallets.length)out.wallets=def.wallets;
  out.wallets.forEach(w=>{w.balance=Number(w.balance)||0;});
  out.income.forEach(e=>{e.amount=Number(e.amount)||0;});
  out.expenses.forEach(e=>{e.amount=Number(e.amount)||0;});
  out.loans.forEach(l=>{l.amount=Number(l.amount)||0;});
  out.goals.forEach(g=>{g.target=Number(g.target)||0;g.saved=Number(g.saved)||0;});
  out.expenses.forEach(e=>{if(typeof e.desc!=='string')e.desc=String(e.desc==null?'':e.desc);});
  out.loans.forEach(l=>{if(typeof l.name!=='string')l.name=String(l.name==null?'':l.name);});
  out.goals.forEach(g=>{if(typeof g.name!=='string')g.name=String(g.name==null?'':g.name);});
  out.budgetLimit=Math.max(0,Number(out.budgetLimit)||0);
  // ids must be unique NUMBERS: the UI compares them with === and prints them inside onclick="..."
  let maxId=0;
  const lists=['income','expenses','loans','goals'];
  lists.forEach(k=>out[k].forEach(x=>{
    if(typeof x.id==='string'&&x.id.trim()!==''&&isFinite(Number(x.id)))x.id=Number(x.id);
    if(typeof x.id==='number'&&isFinite(x.id)&&x.id>maxId)maxId=x.id;
  }));
  maxId=Math.max(Number(out.nextId)||0,maxId);
  lists.forEach(k=>{
    const seen=new Set();
    out[k].forEach(x=>{
      if(typeof x.id!=='number'||!isFinite(x.id)||seen.has(x.id))x.id=++maxId;   // missing/duplicate id -> unremovable row
      seen.add(x.id);
    });
  });
  out.nextId=maxId;
  return out;
}
function replaceState(raw){
  const n=normalizeState(raw);
  Object.keys(state).forEach(k=>delete state[k]);
  Object.assign(state,n);
}

/* ── SECRET HASHING (PIN / recovery answer) ──
   PINs and recovery answers are never stored in plaintext. Each is hashed with
   a per-account random salt via SHA-256 (Web Crypto), and only the hash+salt
   are persisted to localStorage/Firestore. */
function randomSalt(len=16){
  const arr=new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function hashSecret(secret,salt){
  const enc=new TextEncoder().encode(salt+':'+secret);
  const buf=await crypto.subtle.digest('SHA-256',enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
// One-time (and restore-time) migration: upgrades any legacy plaintext pin/
// securityAnswer left over from before hashing existed, or found in an old
// backup file, into salted hashes - then wipes the plaintext.
async function migratePlaintextSecrets(){
  let changed=false;
  if(state.pin && !state.pinHash){
    const salt=randomSalt();
    state.pinHash=await hashSecret(state.pin,salt);
    state.pinSalt=salt;
    changed=true;
  }
  if(state.pin){state.pin='';changed=true;}
  if(state.securityAnswer && !state.securityAnswerHash){
    const salt=randomSalt();
    state.securityAnswerHash=await hashSecret(state.securityAnswer,salt);
    state.securityAnswerSalt=salt;
    changed=true;
  }
  if(state.securityAnswer){state.securityAnswer='';changed=true;}
  if(changed)save();
}
function defaultState(){
  return {
    username:'',
    avatar:'',
    wallets:[
      {id:'maya',label:'Maya',balance:0,updated:today()},
      {id:'gcash',label:'GCash',balance:0,updated:today()},
      {id:'coh',label:'Cash on Hand',balance:0,updated:today()},
    ],
    income:[],
    expenses:[],
    loans:[],
    goals:[],
    budgetLimit:0,
    pin:'', // legacy plaintext field - kept only so old backups load; migrated to pinHash on read
    pinHash:'',
    pinSalt:'',
    nextId:0,
    hideBalances:false,
    termsAccepted:null,
    securityQuestion:'',
    securityAnswer:'', // legacy plaintext field - migrated to securityAnswerHash on read
    securityAnswerHash:'',
    securityAnswerSalt:''
  };
}
function loadState(){
  const def=defaultState();
  try{
    let s=localStorage.getItem('kwentadoV1');
    if(!s){
      // one-time migration from the old "Money Things" storage key
      const legacy=localStorage.getItem('moneyThingsV3');
      if(legacy){
        s=legacy;
        localStorage.setItem('kwentadoV1',legacy);
      }
    }
    if(!s)return def;
    return normalizeState(JSON.parse(s));
  }
  catch(e){return def;}
}
let _saveTimer=null;
function save(){
  // Debounced: batches rapid writes (e.g. multiple field saves) into one localStorage write
  if(_saveTimer) clearTimeout(_saveTimer);
  _saveTimer=setTimeout(function(){
    _saveTimer=null;
    localStorage.setItem('kwentadoV1',JSON.stringify(state));
    queueCloudPush();
  },300);
}
function saveImmediate(){
  // Use for critical paths (restore, cloud sync) that must not be deferred
  if(_saveTimer){ clearTimeout(_saveTimer); _saveTimer=null; }
  localStorage.setItem('kwentadoV1',JSON.stringify(state));
  queueCloudPush();
}

// ── Cloud Sync (Firebase) ──────────────────────────────────
let cloudUser=null;
let cloudSyncTimer=null;
let lastCloudUpdatedAt=0,cloudPushPending=false,cloudPushing=false,cloudPulling=false,lastCloudPullAt=0;

function queueCloudPush(){
  if(!cloudUser)return;
  clearTimeout(cloudSyncTimer);
  cloudPushPending=true;
  cloudSyncTimer=setTimeout(pushToCloud,800);
}

function setCloudSpinner(on){
  const s=document.getElementById('cloud-sync-spinner');
  if(s)s.style.display=on?'inline':'none';
}

function stripUndefined(val){
  if(Array.isArray(val)){
    return val.map(stripUndefined);
  }else if(val && typeof val==='object'){
    const out={};
    Object.keys(val).forEach(k=>{
      const v=val[k];
      if(v!==undefined)out[k]=stripUndefined(v);
    });
    return out;
  }
  return val;
}

async function pushToCloud(force){
  if(!cloudUser)return;
  // Never overwrite the cloud copy before we've compared with it (first sync failed/offline): that could
  // replace newer data from another device with this device's stale copy. It is retried by pullCloudIfNewer().
  if(force!==true&&stateLoadedForUid!==cloudUser.uid){cloudPushPending=true;return;}
  cloudPushPending=false;cloudPushing=true;
  setCloudSpinner(true);
  try{
    const ts=Date.now();
    await fbDb.collection('users').doc(cloudUser.uid).set({data:stripUndefined(state),updatedAt:ts});
    lastCloudUpdatedAt=ts;
    markCloudLinked(cloudUser.uid,ts);
  }catch(e){
    console.error('Cloud sync failed',e);
    cloudPushPending=true;   // the change is still un-uploaded - don't let a later pull overwrite it
    toast('Cloud sync failed - check your connection','error');
  }
  cloudPushing=false;
  setCloudSpinner(false);
}

let stateLoadedForUid=null;

/* Remember that THIS device's copy is already linked to a cloud account (and when it last matched),
   so the "cloud vs device" question is only asked for a genuine first-time conflict. */
function markCloudLinked(uid,at){
  try{localStorage.setItem('finCloudLinked',JSON.stringify({uid:uid,at:at||Date.now()}));}catch(e){}
}
function getCloudLinked(uid){
  try{const l=JSON.parse(localStorage.getItem('finCloudLinked')||'null');if(l&&l.uid===uid)return l;}catch(e){}
  return null;
}
function clearCloudLinked(){try{localStorage.removeItem('finCloudLinked');}catch(e){}}

let _cloudLoadP=null,_cloudLoadUid=null,cloudLoadInFlight=false;
function loadStateForUser(user){
  if(stateLoadedForUid===user.uid)return Promise.resolve(); // already synced this session, avoid re-prompting on token refresh
  if(_cloudLoadP&&_cloudLoadUid===user.uid)return _cloudLoadP;   // never run two loads (and two prompts) at once
  _cloudLoadUid=user.uid;cloudLoadInFlight=true;
  _cloudLoadP=_loadStateForUser(user).finally(()=>{_cloudLoadP=null;cloudLoadInFlight=false;});
  return _cloudLoadP;
}
async function _loadStateForUser(user){
  setCloudSpinner(true);
  try{
    const doc=await fbDb.collection('users').doc(user.uid).get();
    if(doc.exists && doc.data().data){
      const raw=doc.data().data;
      const remote=(typeof raw==='string')?JSON.parse(raw):raw;
      lastCloudUpdatedAt=doc.data().updatedAt||0;
      const localHasData=!!state.username||(state.income&&state.income.length)||(state.expenses&&state.expenses.length)||(state.wallets||[]).some(w=>w.balance);
      const remoteAt=doc.data().updatedAt||0;
      const linked=getCloudLinked(user.uid);
      let useRemote=true;
      if(localHasData){
        if(linked){
          // Already connected to this account before: no question needed.
          // Cloud newer (edited on another device) -> take it; otherwise keep this device's copy.
          useRemote=remoteAt>linked.at;
        }else{
          useRemote=await showMergeChoice(remote,doc.data().updatedAt);
        }
      }
      if(useRemote){
        replaceState(remote);   // fills any missing fields + keeps nextId above every existing id
        clearTimeout(cloudSyncTimer);cloudPushPending=false;
        localStorage.setItem('kwentadoV1',JSON.stringify(state));
        markCloudLinked(user.uid,remoteAt||Date.now());
      }else{
        await pushToCloud(true);
      }
    }else{
      // brand-new account - seed the cloud with whatever's local (usually defaults)
      await pushToCloud(true);
    }
    stateLoadedForUid=user.uid;   // only after a REAL comparison with the cloud copy
  }catch(e){
    console.error('Cloud load failed',e);
    toast('Could not reach cloud data - working offline for now','error');
  }
  setCloudSpinner(false);
}

/* Another phone/tablet may have saved newer data while this one sat open. Without this,
   the stale copy would overwrite it on the next save. We re-check when the app comes
   back to the foreground (throttled) and only pull when nothing local is waiting to upload. */
async function pullCloudIfNewer(){
  if(!cloudUser)return;
  if(stateLoadedForUid!==cloudUser.uid){
    // The first sync never completed (app was opened offline). Retry it now that we're back.
    if(cloudLoadInFlight||Date.now()-lastCloudPullAt<15000)return;
    lastCloudPullAt=Date.now();
    await loadStateForUser(cloudUser);
    if(stateLoadedForUid===cloudUser.uid){render();updateSidebarUsername();}
    return;
  }
  if(cloudPushPending||cloudPushing||cloudPulling)return;
  if(Date.now()-lastCloudPullAt<15000)return;
  lastCloudPullAt=Date.now();cloudPulling=true;
  try{
    const doc=await fbDb.collection('users').doc(cloudUser.uid).get();
    if(doc.exists&&doc.data().data){
      const at=doc.data().updatedAt||0;
      if(at>lastCloudUpdatedAt&&!cloudPushPending&&!cloudPushing){
        const raw=doc.data().data;
        const remote=(typeof raw==='string')?JSON.parse(raw):raw;
        replaceState(remote);
        lastCloudUpdatedAt=at;
        markCloudLinked(cloudUser.uid,at);
        localStorage.setItem('kwentadoV1',JSON.stringify(state));
        scheduleRender();updateSidebarUsername();
        toast('Updated with your latest data from another device ✓');
      }
    }
  }catch(e){console.warn('Cloud refresh failed',e);}
  cloudPulling=false;
}
document.addEventListener('visibilitychange',()=>{
  // Flush any pending debounced save when the tab goes to background (covers tab-switch, app-switch, close)
  if(document.visibilityState==='hidden'&&_saveTimer){
    clearTimeout(_saveTimer);_saveTimer=null;
    localStorage.setItem('kwentadoV1',JSON.stringify(state));
    queueCloudPush();
  }
  if(document.visibilityState==='visible')pullCloudIfNewer();
});
// pagehide fires on mobile before the page is discarded (more reliable than beforeunload on iOS)
window.addEventListener('pagehide',()=>{
  if(_saveTimer){
    clearTimeout(_saveTimer);_saveTimer=null;
    localStorage.setItem('kwentadoV1',JSON.stringify(state));
  }
});
window.addEventListener('online',pullCloudIfNewer);
window.addEventListener('focus',pullCloudIfNewer);

function updateAccountSettingsUI(){
  updateSettingsHome();
  const statusEl=document.getElementById('cloud-status-text');
  const outBtn=document.getElementById('cloud-signout-btn');
  const linkBtn=document.getElementById('cloud-link-btn');
  const guestSignoutWrap=document.getElementById('guest-signout-link-wrap');
  if(!cloudUser){
    if(statusEl)statusEl.textContent='Not signed in.';
    if(outBtn)outBtn.style.display='none';
    if(linkBtn)linkBtn.style.display='none';
    if(guestSignoutWrap)guestSignoutWrap.style.display='none';
    return;
  }
  if(cloudUser.isAnonymous){
    if(statusEl)statusEl.textContent='Signed in as a Guest - this account has no email attached. Link it to Google to make sure you never lose access.';
    if(linkBtn)linkBtn.style.display='';
    // Guests don't get the plain Sign Out button - signing out here is unrecoverable,
    // so it's tucked behind a smaller link that routes through a dedicated warning instead.
    if(outBtn)outBtn.style.display='none';
    if(guestSignoutWrap)guestSignoutWrap.style.display='block';
  }else{
    if(statusEl)statusEl.textContent='Signed in as '+(cloudUser.email||cloudUser.displayName||'your account')+' - data syncs automatically across your devices.';
    if(linkBtn)linkBtn.style.display='none';
    if(outBtn)outBtn.style.display='';
    if(guestSignoutWrap)guestSignoutWrap.style.display='none';
  }
}

function openGuestSignoutWarning(){
  document.getElementById('guest-signout-modal').style.display='flex';
}
function closeGuestSignoutWarning(){
  document.getElementById('guest-signout-modal').style.display='none';
}
function confirmGuestSignoutAnyway(){
  closeGuestSignoutWarning();
  doSignOut();
}
function authSignOut(){
  // Only reached for non-guest accounts now (real Sign Out button is hidden for guests).
  mtConfirm('Sign out of FINUITY on this device? Your data stays saved to your account in the cloud, and this device will reset to a clean app so someone else can use it.','🚪','Sign Out','var(--red)').then(ok=>{
    if(!ok)return;
    doSignOut();
  });
}
function doSignOut(){
  sessionStorage.removeItem('mtUnlocked');
  stateLoadedForUid=null;
  // wipe this device's local copy so the next person gets a fresh app, not your leftover data
  Object.keys(state).forEach(k=>delete state[k]);
  Object.assign(state,defaultState());
  localStorage.removeItem('kwentadoV1');
  localStorage.removeItem('mtTutDone');
  clearCloudLinked();bioClear();
  fbAuth.signOut();
}

async function authLinkToGoogle(){
  if(!cloudUser||!cloudUser.isAnonymous)return;
  const provider=new firebase.auth.GoogleAuthProvider();
  try{
    await cloudUser.linkWithPopup(provider);
    updateAccountSettingsUI();
    renderGuestBanner();
    toast('Linked to Google - your data is now backed by a real account ✓');
  }catch(e){
    console.error(e);
    toast('Linking failed: '+authFriendlyError(e),'error');
  }
}

/* ── CENTRAL AUTH CONTROLLER ── */
async function handleAuthState(user){
  cloudUser=user;
  updateAccountSettingsUI();
  if(!user){
    showLoginScreen();
    return;
  }
  await loadStateForUser(user);
  await migratePlaintextSecrets();
  if(!state.termsAccepted||state.termsAccepted.version!==LEGAL_VERSION){
    showTermsScreen();
    return;
  }
  if(!state.username){
    showOnboardingOrRegister();
    return;
  }
  if(forcePinResetAfterAuth){
    forcePinResetAfterAuth=false;
    pinRecoveryActive=true;
    showPinSetup();
    return;
  }
  if(state.pinHash && !sessionStorage.getItem('mtUnlocked')){
    const pe=document.getElementById('auth-pin'),oe=document.getElementById('auth-overlay');
    // already showing (shown instantly at startup): leave it alone so typed digits aren't wiped
    if(!(pe&&pe.style.display==='block'&&oe&&oe.style.display==='flex'))showPinScreen();
    return;
  }
  sessionStorage.setItem('mtUnlocked','1');
  document.getElementById('auth-overlay').style.display='none';
  scheduleRender();
  updateSidebarUsername();
  if(!localStorage.getItem('mtTutDone')){showTutorial();}else{showSplash();}
}

if(window.firebaseInitFailed || typeof fbAuth==='undefined' || !fbAuth){
  // Firebase never came up - show a clear, honest error instead of letting
  // the rest of this script (150+ functions incl. render/show/toast) go
  // undefined and leaving a blank-looking dashboard on screen.
  document.addEventListener('DOMContentLoaded', showConnectionErrorScreen);
  if(document.readyState!=='loading') showConnectionErrorScreen();
}else{
  fbAuth.onAuthStateChanged(function(user){
    handleAuthState(user);
  });
}
function showConnectionErrorScreen(){
  const overlay=document.getElementById('auth-overlay');
  if(!overlay)return;
  overlay.style.display='flex';
  overlay.innerHTML=`<div style="max-width:340px;width:100%;text-align:center;padding:30px">
    <div style="width:52px;height:52px;margin:0 auto 18px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);border-radius:14px;display:flex;align-items:center;justify-content:center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55"/><path d="M5 12.55a10.94 10.94 0 015.17-2.39"/><path d="M10.71 5.05A16 16 0 0122.58 9"/><path d="M1.42 9a15.91 15.91 0 014.7-2.88"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
    </div>
    <div style="font-size:16px;font-weight:700;margin-bottom:8px">Can't connect right now</div>
    <div style="font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:22px">FINUITY needs a connection to reach your account. Check your internet connection, then try again.</div>
    <button onclick="location.reload()" style="background:var(--accent);color:#080808;border:none;padding:11px 28px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer">Retry</button>
  </div>`;
}
const state=loadState();
function finStock(el){finDrawStock(el);if(!el._ro&&window.ResizeObserver){el._ro=new ResizeObserver(function(){var w=el.clientWidth;if(w&&w!==el._w)finDrawStock(el)});el._ro.observe(el)}}
function finBuckets(tf){var iso=function(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')},ev=[],ok=/^\d{4}-\d\d-\d\d$/;
 (state.income||[]).forEach(function(e){var d=String(e.dateAdded||'').slice(0,10);if(!ok.test(d)){var m=new Date(e.month+' 1, '+e.year);if(isNaN(m))return;d=iso(m)}ev.push([d,1,+e.amount||0])});
 (state.expenses||[]).forEach(function(e){var d=String(e.date||'').slice(0,10);if(ok.test(d))ev.push([d,0,+e.amount||0])});
 if(!ev.length)return{b:[],tf:'D'};ev.sort(function(a,b){return a[0]<b[0]?-1:1});
 var span=(new Date(ev[ev.length-1][0])-new Date(ev[0][0]))/864e5;tf=tf||(span<=45?'D':span<=250?'W':'M');
 var key=function(d){if(tf==='D')return d;if(tf==='M')return d.slice(0,7)+'-01';var t=new Date(d+'T00:00:00');t.setDate(t.getDate()-(t.getDay()+6)%7);return iso(t)},map={};
 ev.forEach(function(e){var k=key(e[0]),b=map[k]||(map[k]={k:k,i:0,x:0});if(e[1])b.i+=e[2];else b.x+=e[2]});
 var out=[],t=new Date(key(ev[0][0])+'T00:00:00'),end=key(ev[ev.length-1][0]),g=0;
 while(iso(t)<=end&&g++<800){var k=iso(t);out.push(map[k]||{k:k,i:0,x:0});if(tf==='D')t.setDate(t.getDate()+1);else if(tf==='W')t.setDate(t.getDate()+7);else t.setMonth(t.getMonth()+1)}
 return{b:out,tf:tf}}
function finDrawStock(el){var D=finBuckets(el._tf),tf=D.tf,W=el._w=el.clientWidth||320,H=210,L=46,R=20,T=14,B=22,sy=window.FinX?FinX.sym():'₱',BL='#5b7be0',RD='#f04848';
 if(!D.b.length){el.innerHTML='<div class="empty"><div class="empty-sub">Add income and expenses to see your chart.</div></div>';return}
 var pw=W-L-R,bs=D.b.slice(-Math.max(7,Math.floor(pw/12))),n=bs.length,mx=Math.max.apply(null,[1].concat(bs.map(function(c){return Math.max(c.i,c.x)}))),top=mx*1.1;
 var x=function(i){return n<2?L+pw/2:L+i*pw/(n-1)},y=function(v){return T+(H-T-B)*(1-v/top)},cp=function(v){return sy+(v>=1e6?(v/1e6).toFixed(1)+'M':v>=1e4?Math.round(v/1e3)+'k':v>=1e3?(v/1e3).toFixed(1)+'k':Math.round(v))};
 var lab=function(k,long){var t=new Date(k+'T00:00:00');return tf==='M'?t.toLocaleDateString(undefined,long?{month:'long',year:'numeric'}:{month:'short',year:'2-digit'}):(tf==='W'&&long?'Week of ':'')+t.toLocaleDateString(undefined,{month:'short',day:'numeric'})};
 var g='<defs><pattern id="fsg" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="rgba(120,160,220,.13)"/></pattern></defs><rect x="0" y="0" width="'+W+'" height="'+H+'" fill="url(#fsg)"/>',i,every=Math.max(1,Math.ceil(n/Math.max(2,Math.floor(pw/56))));
 for(i=0;i<=4;i++){var v=top*i/4,yy=y(v).toFixed(1);g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yy+'" y2="'+yy+'" stroke="rgba(120,160,220,.22)"/><text x="'+(L-6)+'" y="'+(+yy+3)+'" text-anchor="end" font-size="9" fill="var(--muted)">'+cp(v)+'</text>'}
 bs.forEach(function(c,j){if((n-1-j)%every===0)g+='<text x="'+x(j).toFixed(1)+'" y="'+(H-7)+'" text-anchor="middle" font-size="9" fill="var(--muted)">'+lab(c.k)+'</text>'});
 var ln=function(f,col){var p=bs.map(function(c,j){return x(j).toFixed(1)+','+y(c[f]).toFixed(1)}),s='';
  if(n<2)return '<circle cx="'+x(0)+'" cy="'+y(bs[0][f])+'" r="5" fill="'+col+'"/>';
  var ax=x(n-1),ay=y(bs[n-1][f]),bx=x(n-2),by=y(bs[n-2][f]),a=Math.atan2(ay-by,ax-bx),tx=ax+7*Math.cos(a),ty=ay+7*Math.sin(a);
  return '<polyline points="'+p.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/><polygon points="'+tx.toFixed(1)+','+ty.toFixed(1)+' '+(tx-13*Math.cos(a-.5)).toFixed(1)+','+(ty-13*Math.sin(a-.5)).toFixed(1)+' '+(tx-13*Math.cos(a+.5)).toFixed(1)+','+(ty-13*Math.sin(a+.5)).toFixed(1)+'" fill="'+col+'"/>'};
 var bt=[['D','Day'],['W','Week'],['M','Month']].map(function(b){var on=tf===b[0];return '<button data-t="'+b[0]+'" title="'+b[1]+'s" style="border:1px solid '+(on?'var(--accent)':'var(--border2)')+';background:'+(on?'var(--accent-bg)':'transparent')+';color:'+(on?'var(--accent)':'var(--muted)')+';font:700 10px var(--font-b);padding:3px 9px;border-radius:6px;cursor:pointer">'+b[0]+'</button>'}).join('');
 var sum=function(f){return bs.reduce(function(s,c){return s+c[f]},0)},head=function(c){var I=c?c.i:sum('i'),X=c?c.x:sum('x');return '<span style="font-size:11px;color:var(--muted)">'+(c?lab(c.k,1):'Whole chart')+'</span><div style="display:flex;gap:14px;flex-wrap:wrap"><span style="font:700 15px var(--font-d);color:'+BL+'">&#9650; '+fmt(I)+'</span><span style="font:700 15px var(--font-d);color:'+RD+'">&#9660; '+fmt(X)+'</span></div>'};
 el.innerHTML='<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;flex-wrap:wrap"><div id="fs-head" style="min-height:38px">'+head()+'</div><span style="margin-left:auto;display:flex;gap:4px">'+bt+'</span></div><div style="display:flex;gap:14px;font-size:11px;color:var(--muted);margin-bottom:6px"><span><b style="color:'+BL+'">&#9472;&#9472;</b> Income</span><span><b style="color:'+RD+'">&#9472;&#9472;</b> Expenses</span></div>'
 +'<div style="position:relative;background:var(--surface2);border:1px solid var(--border);border-radius:10px;overflow:hidden"><svg width="'+W+'" height="'+H+'" style="display:block;touch-action:pan-y;user-select:none">'+g+ln('x',RD)+ln('i',BL)
 +'<line id="fs-x" y1="'+T+'" y2="'+(H-B)+'" stroke="var(--muted)" stroke-dasharray="3 3" style="display:none"/><circle id="fs-di" r="5" fill="'+BL+'" stroke="var(--surface2)" stroke-width="2" style="display:none"/><circle id="fs-de" r="5" fill="'+RD+'" stroke="var(--surface2)" stroke-width="2" style="display:none"/><rect id="fs-hit" x="'+L+'" y="0" width="'+pw+'" height="'+H+'" fill="transparent"/></svg><div id="fs-tip" style="display:none;position:absolute;top:6px;pointer-events:none;background:var(--surface3);border:1px solid var(--border2);border-radius:10px;padding:8px 10px;font-size:11.5px;line-height:1.6;box-shadow:var(--shadow);white-space:nowrap;z-index:3"></div></div>';
 el.querySelectorAll('button[data-t]').forEach(function(b){b.onclick=function(){el._tf=b.dataset.t;finDrawStock(el)}});
 var q=function(s){return el.querySelector(s)},hit=q('#fs-hit'),tip=q('#fs-tip'),hd=q('#fs-head');
 var show=function(e){var bx=hit.getBoundingClientRect(),j=n<2?0:Math.max(0,Math.min(n-1,Math.round((e.clientX-bx.left)/bx.width*(n-1)))),c=bs[j],px=x(j),net=c.i-c.x;
  q('#fs-x').setAttribute('x1',px);q('#fs-x').setAttribute('x2',px);q('#fs-x').style.display='';hd.innerHTML=head(c);
  [['#fs-di',c.i],['#fs-de',c.x]].forEach(function(a){var d=q(a[0]);d.setAttribute('cx',px);d.setAttribute('cy',y(a[1]));d.style.display=''});
  var row=function(a,b,col){return '<div>'+a+' <b style="float:right;margin-left:14px;color:'+col+'">'+b+'</b></div>'};
  tip.innerHTML='<div style="font-weight:700;margin-bottom:2px">'+lab(c.k,1)+'</div>'+row('Income',fmt(c.i),BL)+row('Expenses',fmt(c.x),RD)+'<div style="border-top:1px solid var(--border2);margin-top:3px;padding-top:2px">'+row('Net',fmt(net),net>=0?BL:RD)+'</div>';
  tip.style.display='block';var tw=tip.offsetWidth;tip.style.left=(px+tw+18>W?Math.max(0,px-tw-10):px+12)+'px'};
 var hide=function(){['#fs-x','#fs-di','#fs-de','#fs-tip'].forEach(function(s){q(s).style.display='none'});hd.innerHTML=head()};
 hit.addEventListener('pointermove',show);hit.addEventListener('pointerdown',show);hit.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse')hide()})}
function toggleHeroWallets(){window._heroWalletsOpen=!window._heroWalletsOpen;_schedulePartial([renderDash]);}
function toggleHeroPanel(){const c=document.querySelector('.hero-card');if(!c)return;const o=c.classList.toggle('open');const b=document.getElementById('hero-toggle');if(b)b.setAttribute('aria-expanded',o);}
function dashTab(t){
  ['recent','trend'].forEach(k=>{const p=document.getElementById('pane-'+k),b=document.getElementById('tab-'+k);if(p)p.hidden=(k!==t);if(b){b.classList.toggle('on',k===t);b.setAttribute('aria-selected',k===t);}});
  if(t==='trend')_schedulePartial([renderDash]);
}
function fmt(n){return window.FinX?FinX.money(n):'₱'+Number(n).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});}
const EYE_ON_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.8 21.8 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a21.77 21.77 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
function fmtBal(n){return state.hideBalances?((window.FinX?FinX.sym():'₱')+' ••••••'):fmt(n);}
function toggleHideBalances(){state.hideBalances=!state.hideBalances;save();renderAfterHide();}
function syncEyeButtons(){
  const hidden=!!state.hideBalances;
  ['eye-hero','eye-balpage'].forEach(id=>{
    const b=document.getElementById(id);
    if(!b)return;
    b.innerHTML=hidden?EYE_OFF_ICON:EYE_ON_ICON;
    b.classList.toggle('on',hidden);
  });
}
function fmtDate(d){if(!d)return'';const p=d.split('-');if(p.length===3)return p[1]+'/'+p[2]+'/'+p[0].slice(2);return d;}
function uid(){return ++state.nextId;}
function clamp(v,lo,hi){return Math.min(hi,Math.max(lo,v));}

function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}
function escAttr(s){return esc(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;');} // esc() alone doesn't escape quotes - needed when inserting into an HTML attribute value
function toast(msg,type='ok'){
  const el=document.getElementById('toast');
  const icon=document.getElementById('toast-icon');
  const text=document.getElementById('toast-text');
  text.textContent=(window.FinIcons?FinIcons.strip(msg):msg);
  if(type==='error'){icon.innerHTML='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';icon.style.stroke='var(--red)';}
  else{icon.innerHTML='<polyline points="20,6 9,17 4,12"/>';icon.style.stroke='var(--accent)';}
  el.classList.add('show');clearTimeout(el._t);
  el._t=setTimeout(()=>el.classList.remove('show'),2400);
}

/* ── Settings menu navigation ── */
const SET_TITLES={streak:'Streak & Badges',personal:'Personal Information',appearance:'Appearance',region:'Language & Currency',security:'PIN & Security',auto:'Automation & Recurring',data:'Data & Backup',legal:'Privacy & Legal',about:'About'};
function openSetPanel(key){
  const home=document.getElementById('set-home'),det=document.getElementById('set-detail');
  if(!home||!det)return;
  document.querySelectorAll('#set-detail .set-panel').forEach(p=>p.classList.toggle('open',p.dataset.panel===key));
  const t=document.getElementById('set-detail-title');if(t)t.textContent=SET_TITLES[key]||'';
  home.style.display=key?'none':'';
  det.style.display=key?'block':'none';
  window.scrollTo({top:0});
}
function closeSetPanel(){openSetPanel(null);}
function logOutFromSettings(){
  if(cloudUser&&cloudUser.isAnonymous)openGuestSignoutWarning();else authSignOut();
}
function updateSettingsHome(){
  const box=document.getElementById('set-sync');if(!box)return;
  const ic=document.getElementById('set-sync-ic'),t=document.getElementById('set-sync-t'),sub=document.getElementById('set-sync-s'),btn=document.getElementById('set-sync-btn'),mail=document.getElementById('set-pmail');
  if(!cloudUser){box.style.display='none';if(mail)mail.textContent='Not signed in';return;}
  box.style.display='flex';
  if(cloudUser.isAnonymous){
    box.classList.add('guest');ic.innerHTML=FinIcons.ic('alert');t.textContent='Guest account';
    sub.textContent='Data is stored only on this device. Link Google to back it up.';
    btn.style.display='';if(mail)mail.textContent='Guest account';
  }else{
    box.classList.remove('guest');ic.innerHTML=FinIcons.ic('cloud');t.textContent='Cloud sync is on';
    sub.textContent='Your data syncs automatically across your devices.';
    btn.style.display='none';if(mail)mail.textContent=cloudUser.email||cloudUser.displayName||'Signed in';
  }
}

const MONEY_PAGES=['income','expenses','loans','balances','goals'];
function openMoney(){let p='expenses';try{const v=localStorage.getItem('mtMoneyTab');if(MONEY_PAGES.includes(v))p=v;}catch(e){}show(p);}
function show(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item,.bnav-item,.mt-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll(`[data-page="${id}"]`).forEach(el=>el.classList.add('active'));
  if(MONEY_PAGES.includes(id)){try{localStorage.setItem('mtMoneyTab',id);}catch(e){}document.querySelectorAll('.bnav-item[data-group="money"]').forEach(el=>el.classList.add('active'));}
  if(id==='export')document.querySelectorAll('[data-page="settings"]').forEach(el=>el.classList.add('active'));
  document.getElementById('topbar-title').textContent=PAGE_TITLES[id]||id;
  document.body.dataset.page=id;
  document.querySelectorAll('.mt-tab.active').forEach(t=>{const bar=t.parentElement;if(bar&&bar.clientWidth)bar.scrollLeft=t.offsetLeft-(bar.clientWidth-t.offsetWidth)/2;});
  if(id==='settings')openSetPanel(null);
  _schedulePartial([]); // renders only the page being opened (full render for pages without a mapping)
  window.scrollTo({top:0,behavior:'smooth'});
}

let gPressed=false,gTimer;
document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT'||e.target.tagName==='TEXTAREA')return;
  if(e.key==='Escape'){document.getElementById('shortcuts-overlay').classList.remove('show');return;}
  if(e.key==='?'){document.getElementById('shortcuts-overlay').classList.add('show');return;}
  if(e.key==='g'||e.key==='G'){gPressed=true;clearTimeout(gTimer);gTimer=setTimeout(()=>{gPressed=false;},1500);return;}
  if(gPressed){const map={d:'dashboard',i:'income',b:'balances',e:'expenses',l:'loans',x:'export'};const dest=map[e.key.toLowerCase()];if(dest){show(dest);gPressed=false;}}
});
function closeShortcuts(e){if(e.target===document.getElementById('shortcuts-overlay'))document.getElementById('shortcuts-overlay').classList.remove('show');}
function setExpFilter(val,el){expFilter=val;document.querySelectorAll('#exp-filter-bar .pill').forEach(p=>p.classList.remove('active'));el.classList.add('active');renderExpenses();}

function renderGuestBanner(){
  // Guest safety reminder: a small "Not backed up" pill in the top bar (always there, never in the way).
  // The full explanation lives in a bottom sheet that opens when the pill is tapped, once automatically
  // when real data first builds up (3+ entries), and again 7 days after "Remind me in 7 days".
  const pill=document.getElementById('guest-pill');
  const isGuest=!!(cloudUser&&cloudUser.isAnonymous);
  if(pill)pill.style.display=isGuest?'inline-flex':'none';
  if(!isGuest)return;
  const entryCount=(state.income||[]).length+(state.expenses||[]).length+(state.loans||[]).length+(state.goals||[]).length;
  const milestoneDue=entryCount>=3&&localStorage.getItem('mtGuestNudge3Shown')!=='1';
  const remindAt=parseInt(localStorage.getItem('mtGuestRemindAt')||'0');
  const remindDue=!!remindAt&&Date.now()>=remindAt;
  if(milestoneDue||remindDue)scheduleGuestSheet();
}
let _gsTimer=null;
function _overlayBusy(){
  const ids=['auth-overlay','welcome-splash','tutorial-overlay','shortcuts-overlay','fa-quick','guest-signout-modal'];
  const els=ids.map(i=>document.getElementById(i)).concat([...document.querySelectorAll('.pin-overlay,[id$="-modal"]')]);
  if(els.some(e=>e&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'))return true;
  try{if(window.FinTour&&FinTour.isActive&&FinTour.isActive())return true;}catch(e){}
  return false;
}
function scheduleGuestSheet(){
  if(_gsTimer)return;
  _gsTimer=setTimeout(()=>{
    _gsTimer=null;
    const dash=document.getElementById('dashboard');
    if(!dash||!dash.classList.contains('active')||_overlayBusy())return; // try again on the next render
    if(!(cloudUser&&cloudUser.isAnonymous))return;
    localStorage.setItem('mtGuestNudge3Shown','1');
    localStorage.removeItem('mtGuestRemindAt');
    openGuestSheet();
  },900);
}
function openGuestSheet(){
  const el=document.getElementById('guest-sheet');if(!el)return;
  el.classList.add('show');el.setAttribute('aria-hidden','false');
  const b=el.querySelector('.gs-btn');if(b)setTimeout(()=>b.focus({preventScroll:true}),60);
}
function closeGuestSheet(){
  const el=document.getElementById('guest-sheet');if(!el)return;
  el.classList.remove('show');el.setAttribute('aria-hidden','true');
}
function guestRemindLater(){
  localStorage.setItem('mtGuestRemindAt',String(Date.now()+7*24*60*60*1000));
  closeGuestSheet();
  toast("OK - we'll remind you in 7 days");
}
function populateReportYears(){
  const sel=document.getElementById('report-month');if(!sel)return;
  const cur=new Date().getFullYear();const ys=new Set([cur,cur-1,cur-2]);
  state.income.forEach(i=>{if(i.year)ys.add(i.year);});
  state.expenses.forEach(e=>{const d=ldate(e.date);if(!isNaN(d))ys.add(d.getFullYear());});
  const prev=sel.value;
  sel.querySelectorAll('option[data-yr]').forEach(o=>o.remove());
  const anchor=sel.querySelector('option[disabled]');
  [...ys].sort((a,b)=>b-a).forEach(y=>{const o=document.createElement('option');o.value='year-'+y;o.textContent='Year '+y;o.setAttribute('data-yr','1');sel.insertBefore(o,anchor);});
  if([...sel.options].some(o=>o.value===prev))sel.value=prev;
}
let _renderPending=false;
let _partialPending=false;
const _pendingRenders=new Set();
function scheduleRender(){
  // Coalesces multiple back-to-back render() calls into a single paint frame.
  // A full render always wins over any queued partial one.
  if(_renderPending)return;
  _renderPending=true;
  _pendingRenders.clear();
  requestAnimationFrame(function(){ _renderPending=false; _pendingRenders.clear(); render(); });
}

// ── PARTIAL RENDER SYSTEM (speed) ─────────────────────────────────────────
// A full render() rebuilds every section. After a single action only what changed
// needs rebuilding, 3-5x less work. Two rules keep it correct:
//  1. whatever page the person is looking at is ALWAYS refreshed too, so nothing visible
//     can go stale (e.g. goals use expenses, a settled loan adds an income row);
//  2. pages that are not on screen are rebuilt by show() the moment they are opened.
// Anything this table does not know about (e.g. the Export page) falls back to a full render.
function renderExtras(){
  // things the full render() also did: guest reminder, Learn card/insights, streak
  renderGuestBanner();
  try{if(window.FinLearn)FinLearn.render();}catch(e){}
  try{if(window.FinStreak)FinStreak.tick();}catch(e){}
}
const _PAGE_RENDER={
  dashboard:[renderDash,renderBalances,syncEyeButtons,renderExtras],
  income:[renderIncome,updateBadges],
  expenses:[renderExpenses,updateBadges],
  loans:[renderLoans,updateBadges],
  balances:[renderBalances,syncEyeButtons],
  goals:[renderGoals,updateBadges],
  settings:[renderSettings,renderGuestBanner],
  learn:[function(){try{if(window.FinLearn)FinLearn.render();}catch(e){}}]
};
// The big list/page builders only matter while their own page is on screen; show() rebuilds a page
// the moment it is opened, so skipping them while hidden never leaves anything stale.
const _PAGE_OWNED=new Map([[renderExpenses,'expenses'],[renderIncome,'income'],[renderLoans,'loans'],[renderGoals,'goals'],[renderSettings,'settings']]);
function _schedulePartial(fns){
  const sec=document.querySelector('.section.active');
  const pageFns=sec?_PAGE_RENDER[sec.id]:null;
  if(!pageFns){scheduleRender();return;}
  fns.concat(pageFns).forEach(function(f){_pendingRenders.add(f);});
  if(_renderPending||_partialPending)return;
  _partialPending=true;
  requestAnimationFrame(function(){
    _partialPending=false;
    if(_renderPending)return; // a full render was requested meanwhile and will cover everything
    const now=document.querySelector('.section.active'),nowId=now?now.id:'';
    const toRun=[..._pendingRenders];_pendingRenders.clear();
    if(!_PAGE_RENDER[nowId]){scheduleRender();return;} // moved to a page without a partial mapping (e.g. Export)
    toRun.forEach(function(fn){
      const owner=_PAGE_OWNED.get(fn);
      if(owner&&owner!==nowId)return; // hidden page: rebuilt by show() when opened
      try{fn();}catch(e){console.warn('render',e);}
    });
  });
}
// Targeted helpers: used instead of save();scheduleRender() at each call site
function renderAfterExpense(){_schedulePartial([renderExpenses,renderDash,renderBalances,updateBadges,syncEyeButtons,renderExtras]);}
function renderAfterIncome(){_schedulePartial([renderIncome,renderDash,renderBalances,updateBadges,syncEyeButtons,renderExtras]);}
function renderAfterLoan(){_schedulePartial([renderLoans,renderDash,renderBalances,updateBadges,renderExtras]);}
function renderAfterGoal(){_schedulePartial([renderGoals,renderDash,renderBalances,updateBadges,renderExtras]);}
function renderAfterWallet(){_schedulePartial([renderBalances,renderDash,renderIncome,renderExpenses,renderLoans,updateBadges,syncEyeButtons]);}
function renderAfterSettings(){_schedulePartial([renderSettings,renderDash,renderGuestBanner,syncEyeButtons]);}
function renderAfterBudget(){_schedulePartial([renderGoals,renderDash]);}
function renderAfterHide(){_schedulePartial([renderBalances,renderDash,renderIncome,renderExpenses,renderLoans,renderGoals,syncEyeButtons]);}
function render(){renderBalances();renderDash();renderIncome();renderExpenses();renderLoans();renderGoals();renderSettings();updateBadges();syncEyeButtons();renderGuestBanner();populateReportYears();try{if(window.FinLearn)FinLearn.render();}catch(e){}try{if(window.FinStreak)FinStreak.tick();}catch(e){}}
function updateBadges(){
  document.getElementById('nav-badge-income').textContent=state.income.length;
  document.getElementById('nav-badge-expenses').textContent=state.expenses.length;
  document.getElementById('nav-badge-loans').textContent=state.loans.filter(l=>!l.settled).length;
  document.getElementById('nav-badge-goals').textContent=(state.goals||[]).length;
}

/* ── DASHBOARD ── */
function renderDash(){
  const now=new Date();
  document.getElementById('dash-date').textContent=now.toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  // Personalized greeting
  const _h=now.getHours();
  const _gr=_h<12?'Good morning':_h<17?'Good afternoon':'Good evening';
  const _nm=state.username?(', '+esc(state.username)):'';
  const _gEl=document.getElementById('dash-greeting');
  if(_gEl)_gEl.innerHTML=_gr+_nm;
  document.getElementById('topbar-date').textContent=now.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});

  const totalBal=(state.wallets||[]).reduce((a,w)=>a+w.balance,0);
  const totalInc=state.income.reduce((a,b)=>a+b.amount,0);
  const totalExp=state.expenses.reduce((a,b)=>a+b.amount,0);
  const totalPay=state.loans.filter(l=>l.type==='payable'&&!l.settled).reduce((a,b)=>a+b.amount,0);
  const totalRec=state.loans.filter(l=>l.type==='receivable'&&!l.settled).reduce((a,b)=>a+b.amount,0);
  const net=totalInc-totalExp;

  // THIS MONTH SNAPSHOT
  const curMonthName=MONTH_ORDER[now.getMonth()];
  const curYear=now.getFullYear();
  const curInc=state.income.filter(i=>i.month===curMonthName&&(i.year||curYear)===curYear).reduce((a,b)=>a+b.amount,0);
  // Filter this month's expenses once - reused for the total and the category breakdown
  const _curMonthExp=state.expenses.filter(e=>{const d=ldate(e.date);return !isNaN(d)&&d.getMonth()===now.getMonth()&&d.getFullYear()===curYear;});
  const curExp=_curMonthExp.reduce((a,b)=>a+b.amount,0);
  const curRem=curInc-curExp;
  // Biggest category this month
  const catTotals={};
  _curMonthExp.forEach(e=>{const c=e.cat||'other-exp';catTotals[c]=(catTotals[c]||0)+e.amount;});
  const topCatEntry=Object.entries(catTotals).sort((a,b)=>b[1]-a[1])[0];
  const topCatStr=topCatEntry?`${catHTML(topCatEntry[0])} ate <strong>${curExp>0?Math.round(topCatEntry[1]/curExp*100):0}%</strong> of your spend`:'No expenses yet this month';
  const _f=n=>fmt(n).replace(/\.00$/,'');
  const _daysLeft=new Date(curYear,now.getMonth()+1,0).getDate()-now.getDate();
  const _elapsed=now.getDate()/new Date(curYear,now.getMonth()+1,0).getDate();
  const _tl=(function(){try{return (localStorage.getItem('finLang')||'')==='tl';}catch(e){return false;}})();
  let _say,_tone;
  if(curInc<=0){_tone='idle';_say=_tl?'I-add mo muna ang kita mo para makita natin kung ano ang natitira.':"Add your income and I'll show what's left this month.";}
  else if(curRem<0){_tone='over';_say=_tl?`${fmt(Math.abs(curRem))} na ang lampas mo ngayong buwan. Tingnan natin kung ano ang puwedeng bawasan.`:`You're ${fmt(Math.abs(curRem))} over this month. Let's look at what to trim first.`;}
  else if(curRem<curInc*0.1){_tone='tight';_say=_tl?`${fmt(curRem)} na lang at ${_daysLeft} araw pa. Mga kailangan lang muna.`:`Only ${fmt(curRem)} left with ${_daysLeft} day${_daysLeft===1?'':'s'} to go. Essentials only for now.`;}
  else if(curExp/curInc>_elapsed+0.15){_tone='watch';_say=_tl?'Mas mabilis ang gastos mo kaysa sa takbo ng buwan. Dahan-dahan muna.':"You're spending faster than the month is moving. Ease off a little.";}
  else{_tone='good';
    const _bl=state.budgetLimit>0?state.budgetLimit:0;
    if(_bl&&curExp>_bl)_say=_tl?`${_f(curExp-_bl)} na ang lampas mo sa budget. Kaya pa ng kita mo, pero dahan-dahan na.`:`You're ${_f(curExp-_bl)} past your budget. Your income still covers it, but ease off.`;
    else if(_bl)_say=_tl?`Maayos ang takbo mo. ${_f(_bl-curExp)} pa ang natitira sa ${_f(_bl)} na budget mo.`:`You're on pace. ${_f(_bl-curExp)} left in your ${_f(_bl)} budget.`;
    else _say=_tl?`Maayos ang takbo mo. ${_f(curRem)} pa ang natitira.`:`You're on pace. ${_f(curRem)} is still yours this month.`;
  }
  // second line: say where the money went in plain words (no percentages)
  let _ins='';
  if(_tone!=='idle'&&topCatEntry&&curExp>0){
    const _k=topCatEntry[0],_a=_f(topCatEntry[1]),_most=topCatEntry[1]/curExp>=0.6;
    const _EN={food:['Food is the biggest bite so far, ','Most of it went to food, '],transport:['Rides and fares are the biggest bite, ','Most of it went to rides and fares, '],shopping:['Shopping is leading at ','Most of it went to shopping, '],utilities:['Bills are the biggest bite, ','Most of it went to bills, '],entertainment:['Fun is leading at ','Most of it went to fun stuff, '],health:['Health is the biggest bite, ','Most of it went to health, '],'loan-payment':['Loan payments are the biggest bite, ','Most of it went to loan payments, '],'other-exp':['"Other" is the biggest bite, ','Most of it went to "other", ']};
    const _TL={food:['Pagkain ang pinakamalaki mong gastos, ','Karamihan napunta sa pagkain, '],transport:['Pamasahe ang pinakamalaki mong gastos, ','Karamihan napunta sa pamasahe, '],shopping:['Pamimili ang nangunguna, ','Karamihan napunta sa pamimili, '],utilities:['Mga bayarin ang pinakamalaki, ','Karamihan napunta sa mga bayarin, '],entertainment:['Libangan ang nangunguna, ','Karamihan napunta sa libangan, '],health:['Kalusugan ang pinakamalaki, ','Karamihan napunta sa kalusugan, '],'loan-payment':['Bayad sa utang ang pinakamalaki, ','Karamihan napunta sa bayad sa utang, '],'other-exp':['Iba-iba ang pinakamalaki, ','Karamihan napunta sa iba-iba, ']};
    const _pair=(_tl?_TL:_EN)[_k];
    if(_pair)_ins=_pair[_most?1:0]+_a+'.';
  }

  const _spentPct=curInc>0?clamp(Math.round(curExp/curInc*100),0,100):0;
  const _barCls=curRem<0?'over':_spentPct>=90?'warn':'';
  document.getElementById('month-snapshot').innerHTML=`
    <div class="snap-row"><div class="snap-fin-slot" id="fin-slot" aria-hidden="true"></div>
    <div class="snap-say tone-${_tone}" role="status"><span>${_say}</span>${_ins?`<span class="snap-say-2">${_ins}</span>`:''}</div>
    <div class="snap-main">
    <div class="snap-top">
      <div>
        <div class="snap-kicker">Left to spend in ${curMonthName}</div>
        <div class="snap-big ${curInc<=0?'idle':curRem<0?'neg':''}">${curInc<=0?'—':fmt(curRem)}</div>
      </div>
      <div class="snap-pair">
        <button type="button" class="snap-mini in" onclick="openStatsModal('income','month')" aria-label="Income this month, ${fmt(curInc)}. View details"><span>Income</span><b>${fmt(curInc)}</b><i aria-hidden="true">›</i></button>
        <button type="button" class="snap-mini out" onclick="openStatsModal('expenses','month')" aria-label="Spent this month, ${fmt(curExp)}. View details"><span>Spent</span><b>${fmt(curExp)}</b><i aria-hidden="true">›</i></button>
      </div>
    </div>
    <div class="snap-track"><i class="${_barCls}" style="width:${_spentPct}%"></i></div>
    </div></div>`;

  // Hero
  const balStr=Number(totalBal).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('hero-bal').textContent=state.hideBalances?'••••••':balStr;
  // hero wallets - dynamic
  const hwContainer=document.getElementById('hero-wallets-inner');
  if(hwContainer){
    const _HW_LIMIT=99,_all=(state.wallets||[]),_many=_all.length>_HW_LIMIT,_open=!!window._heroWalletsOpen;
    // with many wallets: overdrawn ones first (never hidden), then biggest balances; fold the rest
    const _ws=_many?_all.slice().sort((a,b)=>((b.balance<0)-(a.balance<0))||(b.balance-a.balance)):_all;
    const _show=(_many&&!_open)?_ws.slice(0,_HW_LIMIT):_ws;
    hwContainer.classList.toggle('is-open',_many&&_open);
    hwContainer.innerHTML=_show.map(w=>`<div class="hw"><div class="hw-name">${esc(w.label)}</div><div class="hw-val">${fmtBal(w.balance)}</div></div>`).join('')
      +(_many?`<div class="hw-actions"><button type="button" class="hw hw-more" onclick="toggleHeroWallets()" aria-expanded="${_open}">${_open?'Show fewer':'+'+(_all.length-_HW_LIMIT)+' more'}</button>${_open?`<button type="button" class="hw hw-more" onclick="show('balances')">Manage wallets →</button>`:''}</div>`:'');
  }

  // Stats
  document.getElementById('dash-stats').innerHTML=`
    <div class="stat g clickable" onclick="openStatsModal('income')"><span class="stat-tap-hint">view ›</span><label>Total Earned</label><div class="sv g">${fmt(totalInc)}</div><div class="sd">${state.income.length} entr${state.income.length===1?'y':'ies'}</div></div>
    <div class="stat a clickable" onclick="openStatsModal('expenses')"><span class="stat-tap-hint">view ›</span><label>Total Spent</label><div class="sv a">${fmt(totalExp)}</div><div class="sd">${state.expenses.length} transactions</div></div>
    <div class="stat r"><label>I Owe</label><div class="sv r">${fmt(totalPay)}</div><div class="sd">outstanding</div></div>
    <div class="stat b"><label>Owed to Me</label><div class="sv b">${fmt(totalRec)}</div><div class="sd">outstanding</div></div>
  `;

  // Budget Goal Card
  const budgetEl=document.getElementById('budget-goal-card');
  if(state.budgetLimit>0){
    const pct=clamp(Math.round((curExp/state.budgetLimit)*100),0,100);
    const cls=pct>=100?'over':pct>=75?'warn':'safe';
    const clsColor=pct>=100?'var(--red)':pct>=75?'var(--amber)':'var(--accent)';
    budgetEl.innerHTML=`<div class="card" style="margin-bottom:14px">
      <div class="card-hd"><div class="card-title">Monthly Budget · ${curMonthName}</div><span style="font-size:12px;color:${clsColor};font-weight:700">${pct}% used</span></div>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:10px">
        <span style="font-family:var(--font-d);font-size:24px;font-weight:700;color:${clsColor}">${fmt(curExp)}</span>
        <span style="font-size:13px;color:var(--muted)">of ${fmt(state.budgetLimit)}</span>
      </div>
      ${safeToSpendHTML(curExp)}
      <div class="prog-track"><div class="prog-fill ${cls}" style="width:${pct}%"></div></div>
      <div style="font-size:11px;color:var(--muted);margin-top:6px">${state.budgetLimit-curExp>=0?fmt(state.budgetLimit-curExp)+' remaining':'Over budget by '+fmt(curExp-state.budgetLimit)}</div>
    </div>`;
  } else {
    budgetEl.innerHTML=`<div style="font-size:12px;color:var(--muted2);padding:6px 0 10px;cursor:pointer;text-decoration:underline" onclick="show('goals')">+ Set a monthly budget goal →</div>`;
  }

  // Income vs Expense bar chart
  const incByKey={},expByKey={},keyMeta={};
  state.income.forEach(i=>{
    const yr=i.year||new Date().getFullYear();
    const k=`${yr}-${String(MONTH_ORDER.indexOf(i.month)+1).padStart(2,'0')}`;
    incByKey[k]=(incByKey[k]||0)+i.amount;
    keyMeta[k]={month:i.month,year:yr};
  });
  state.expenses.forEach(e=>{
    const d=ldate(e.date);if(isNaN(d))return;
    const yr=d.getFullYear();const mo=d.getMonth();
    const k=`${yr}-${String(mo+1).padStart(2,'0')}`;
    expByKey[k]=(expByKey[k]||0)+e.amount;
    keyMeta[k]={month:MONTH_ORDER[mo],year:yr};
  });
  const allKeys=[...new Set([...Object.keys(incByKey),...Object.keys(expByKey)])].sort();
  const curKey=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const _dashChart=document.getElementById('dash-chart');
  if(allKeys.length){
    finStock(_dashChart);
  } else {
    _dashChart.innerHTML='<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-chart"/></svg></div><div class="empty-title">No data yet</div><div class="empty-sub">Add income and expenses to see your chart.</div></div>';
  }

  // Loans
  const nowMs2=new Date().setHours(0,0,0,0);
  const payable=state.loans.filter(l=>l.type==='payable'&&!l.settled);
  const rec=state.loans.filter(l=>l.type==='receivable'&&!l.settled);
  let lh='';
  function dashLoanStatus(l){
    if(!l.due)return '';
    const dueMs=ldate(l.due).setHours(0,0,0,0);
    const diff=Math.round((dueMs-nowMs2)/(1000*60*60*24));
    if(diff<0)return `<span style="font-size:10px;color:var(--red);font-weight:700;margin-left:4px">⚠ overdue ${Math.abs(diff)}d</span>`;
    if(diff<=7)return `<span style="font-size:10px;color:var(--amber);font-weight:700;margin-left:4px">⏰ due in ${diff===0?'today':diff+'d'}</span>`;
    return `<span style="font-size:10px;color:var(--muted);margin-left:4px">due ${fmtDate(l.due)}</span>`;
  }
  payable.forEach(l=>lh+=`<div class="row"><span class="lbl">${esc(l.name)}${l.note?' · '+esc(l.note):''}${dashLoanStatus(l)}</span><span class="val an">${fmt(l.amount)}</span></div>`);
  rec.forEach(l=>lh+=`<div class="row"><span class="lbl">${esc(l.name)}${l.note?' · '+esc(l.note):''}${dashLoanStatus(l)}</span><span class="val ap">${fmt(l.amount)}</span></div>`);
  document.getElementById('dash-loans').innerHTML=lh||'<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-swap"/></svg></div><div class="empty-title">No outstanding loans</div></div>';
  const _lw=document.getElementById('dash-loans-wrap');if(_lw)_lw.classList.toggle('is-empty',!lh);
  const _od=document.getElementById('dash-owed');
  if(_od){
    const _soon=state.loans.filter(l=>!l.settled&&l.due&&!isNaN(ldate(l.due))&&(ldate(l.due)-Date.now())/864e5<=7).length;
    const _bits=[];
    if(totalPay>0)_bits.push(`<button type="button" onclick="show('loans')">You owe <b class="n">${fmt(totalPay)}</b></button>`);
    if(totalRec>0)_bits.push(`<button type="button" onclick="show('loans')">Owed to you <b class="p">${fmt(totalRec)}</b></button>`);
    _od.innerHTML=_bits.length?`<div class="owed-strip">${_bits.join('')}${_soon?`<span class="owed-soon">${_soon} due soon</span>`:''}</div>`:'';
  }

  // Recent expenses
  const recent=[...state.expenses].reverse().slice(0,5);
  document.getElementById('dash-recent-exp').innerHTML=recent.length
    ?recent.map(e=>`<div class="row"><span class="lbl">${esc(e.desc)}${e.note?' <span style="color:var(--muted2);font-size:11px">· '+esc(e.note)+'</span>':''}</span><span class="val an">${fmt(e.amount)}</span></div>`).join('')
    :'<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-receipt"/></svg></div><div class="empty-title">No expenses logged yet</div></div>';

  // Monthly spend progress
  if(curInc>0||curExp>0){
    const pct=curInc>0?clamp(Math.round((curExp/curInc)*100),0,100):100;
    const cls=pct>=100?'over':pct>=75?'warn':'safe';
    const _dsp=document.getElementById('dash-spend-progress');
    _dsp.innerHTML=`<div class="prog-wrap"><div class="prog-lbl"><span>${curMonthName} spend</span><span>${pct}% of income</span></div><div class="prog-track"><div class="prog-fill ${cls}" style="width:${pct}%"></div></div></div>`;
  } else {
    document.getElementById('dash-spend-progress').innerHTML='';
  }
}

// ===== STATS BREAKDOWN MODAL =====
let statsModalType='expenses';
let statsModalRange='month';
let statsModalMonthIdx=new Date().getMonth();
let statsModalYear=new Date().getFullYear();
const SBM_PALETTE=['var(--accent)','var(--blue)','var(--purple)','var(--amber)','var(--teal)','#e8608a','var(--muted)'];

function openStatsModal(type,range){
  statsModalType=type;
  statsModalRange=range||'month';
  statsModalMonthIdx=new Date().getMonth();
  statsModalYear=new Date().getFullYear();
  document.getElementById('stats-modal').style.display='flex';
  renderStatsModal();
}
function closeStatsModal(){
  document.getElementById('stats-modal').style.display='none';
}
function setStatsRange(r){
  statsModalRange=r;
  renderStatsModal();
}
function setStatsMonth(v){
  statsModalMonthIdx=parseInt(v,10);
  renderStatsModal();
}
function setStatsYear(v){
  statsModalYear=parseInt(v,10);
  renderStatsModal();
}
function sbmRangeLabel(){
  return statsModalRange==='month'?(MONTH_ORDER[statsModalMonthIdx]+' '+statsModalYear):'All Time';
}
function sbmRangeToggle(){
  const monthOpts=MONTH_ORDER.map((m,i)=>`<option value="${i}" ${i===statsModalMonthIdx?'selected':''}>${m}</option>`).join('');
  let yearOpts='';for(let y=2030;y>=2018;y--){yearOpts+=`<option value="${y}" ${y===statsModalYear?'selected':''}>${y}</option>`;}
  return `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
    <div class="sbm-range" style="margin-bottom:0;flex:1;min-width:140px">
      <button class="${statsModalRange==='month'?'active':''}" onclick="setStatsRange('month')">Monthly</button>
      <button class="${statsModalRange==='all'?'active':''}" onclick="setStatsRange('all')">All Time</button>
    </div>
    ${statsModalRange==='month'?`
    <select onchange="setStatsMonth(this.value)" style="flex:1;min-width:100px;padding:7px 10px;font-size:12px">${monthOpts}</select>
    <select onchange="setStatsYear(this.value)" style="flex:0 0 90px;padding:7px 10px;font-size:12px">${yearOpts}</select>
    `:''}
  </div>`;
}
function renderStatsModal(){
  if(statsModalType==='expenses')renderExpenseStatsModal();
  else renderIncomeStatsModal();
}

function renderExpenseStatsModal(){
  document.getElementById('sbm-title').textContent='Expense Breakdown';
  const list=statsModalRange==='month'
    ?state.expenses.filter(e=>{const d=ldate(e.date);return !isNaN(d)&&d.getMonth()===statsModalMonthIdx&&d.getFullYear()===statsModalYear;})
    :state.expenses.slice();
  const total=list.reduce((a,b)=>a+b.amount,0);
  const body=document.getElementById('sbm-body');

  if(!list.length){
    body.innerHTML=sbmRangeToggle()+`<div class="empty" style="padding:30px 0"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-receipt"/></svg></div><div class="empty-title">No expenses ${statsModalRange==='month'?'in '+sbmRangeLabel():'yet'}</div><div class="empty-sub">Log an expense to see your breakdown here.</div></div>`;
    return;
  }

  // category totals
  const catTotals={};
  list.forEach(e=>{const c=e.cat||'other-exp';catTotals[c]=(catTotals[c]||0)+e.amount;});
  const catSorted=Object.entries(catTotals).sort((a,b)=>b[1]-a[1]);

  // biggest single expense
  const sortedByAmt=[...list].sort((a,b)=>b.amount-a.amount);
  const biggest=sortedByAmt[0];
  const avg=total/list.length;

  const catRows=catSorted.map(([cat,amt],i)=>{
    const pct=total>0?Math.round(amt/total*100):0;
    const cnt=list.filter(e=>(e.cat||'other-exp')===cat).length;
    const color=SBM_PALETTE[i%SBM_PALETTE.length];
    return `<div class="sbm-cat-row">
      <div class="sbm-cat-top">
        <span class="sbm-cat-name">${catHTML(cat)}</span>
        <span class="sbm-cat-meta">${cnt} tx · ${pct}%</span>
      </div>
      <div class="sbm-cat-track"><div class="sbm-cat-fill" style="width:${pct}%;background:${color}"></div></div>
      <div style="text-align:right;margin-top:3px"><span class="sbm-cat-val" style="color:${color};font-size:13px">${fmt(amt)}</span></div>
    </div>`;
  }).join('');

  const topList=sortedByAmt.slice(0,5).map((e,i)=>`
    <div class="sbm-top-row">
      <div style="display:flex;align-items:center;gap:10px;min-width:0">
        <div class="sbm-top-rank">${i+1}</div>
        <div style="min-width:0">
          <div style="font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.desc)}</div>
          <div style="font-size:10.5px;color:var(--muted)">${catHTML(e.cat||'other-exp')} · ${fmtDate(e.date)}</div>
        </div>
      </div>
      <div style="font-family:var(--font-d);font-weight:700;color:var(--red);white-space:nowrap;margin-left:8px">${fmt(e.amount)}</div>
    </div>`).join('');

  document.getElementById('sbm-body').innerHTML=`
    ${sbmRangeToggle()}
    <div class="sbm-hero">
      <div class="sbm-hero-label">${sbmRangeLabel()}</div>
      <div class="sbm-hero-val" style="color:var(--red)">${fmt(total)}</div>
      <div class="sbm-hero-sub">${list.length} transaction${list.length===1?'':'s'} · avg ${fmt(avg)}</div>
    </div>
    <div class="sbm-highlight">
      <div>
        <div class="sbm-highlight-lbl">Biggest expense</div>
        <div class="sbm-highlight-name">${esc(biggest.desc)}</div>
        <div class="sbm-highlight-meta">${catHTML(biggest.cat||'other-exp')} · ${fmtDate(biggest.date)}</div>
      </div>
      <div style="font-family:var(--font-d);font-size:17px;font-weight:700;color:var(--red);white-space:nowrap">${fmt(biggest.amount)}</div>
    </div>
    <div class="sbm-section-title">Where it went</div>
    ${catRows}
    <div class="sbm-section-title">Top transactions</div>
    ${topList}
  `;
}

function renderIncomeStatsModal(){
  document.getElementById('sbm-title').textContent='Income Breakdown';
  const curYear=statsModalYear;
  const list=statsModalRange==='month'
    ?state.income.filter(i=>i.month===MONTH_ORDER[statsModalMonthIdx]&&(i.year||new Date().getFullYear())===statsModalYear)
    :state.income.slice();
  const total=list.reduce((a,b)=>a+b.amount,0);
  const body=document.getElementById('sbm-body');

  if(!list.length){
    body.innerHTML=sbmRangeToggle()+`<div class="empty" style="padding:30px 0"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-cash"/></svg></div><div class="empty-title">No income ${statsModalRange==='month'?'in '+sbmRangeLabel():'yet'}</div><div class="empty-sub">Add an income entry to see your breakdown here.</div></div>`;
    return;
  }

  // type totals
  const typeTotals={};
  list.forEach(i=>{const t=i.type||'Other';typeTotals[t]=(typeTotals[t]||0)+i.amount;});
  const typeSorted=Object.entries(typeTotals).sort((a,b)=>b[1]-a[1]);

  const sortedByAmt=[...list].sort((a,b)=>b.amount-a.amount);
  const biggest=sortedByAmt[0];
  const avg=total/list.length;

  const typeRows=typeSorted.map(([type,amt],i)=>{
    const pct=total>0?Math.round(amt/total*100):0;
    const cnt=list.filter(e=>(e.type||'Other')===type).length;
    const color=SBM_PALETTE[i%SBM_PALETTE.length];
    return `<div class="sbm-cat-row">
      <div class="sbm-cat-top">
        <span class="sbm-cat-name">${esc(type)}</span>
        <span class="sbm-cat-meta">${cnt} entr${cnt===1?'y':'ies'} · ${pct}%</span>
      </div>
      <div class="sbm-cat-track"><div class="sbm-cat-fill" style="width:${pct}%;background:${color}"></div></div>
      <div style="text-align:right;margin-top:3px"><span class="sbm-cat-val" style="color:${color};font-size:13px">${fmt(amt)}</span></div>
    </div>`;
  }).join('');

  const topList=sortedByAmt.slice(0,5).map((e,i)=>`
    <div class="sbm-top-row">
      <div style="display:flex;align-items:center;gap:10px;min-width:0">
        <div class="sbm-top-rank">${i+1}</div>
        <div style="min-width:0">
          <div style="font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.type||'Other')}${e.note?' · '+esc(e.note):''}</div>
          <div style="font-size:10.5px;color:var(--muted)">${e.month} ${e.year||curYear}</div>
        </div>
      </div>
      <div style="font-family:var(--font-d);font-weight:700;color:var(--accent);white-space:nowrap;margin-left:8px">${fmt(e.amount)}</div>
    </div>`).join('');

  document.getElementById('sbm-body').innerHTML=`
    ${sbmRangeToggle()}
    <div class="sbm-hero">
      <div class="sbm-hero-label">${sbmRangeLabel()}</div>
      <div class="sbm-hero-val" style="color:var(--accent)">${fmt(total)}</div>
      <div class="sbm-hero-sub">${list.length} entr${list.length===1?'y':'ies'} · avg ${fmt(avg)}</div>
    </div>
    <div class="sbm-highlight">
      <div>
        <div class="sbm-highlight-lbl">Biggest source</div>
        <div class="sbm-highlight-name">${esc(biggest.type||'Other')}${biggest.note?' · '+esc(biggest.note):''}</div>
        <div class="sbm-highlight-meta">${biggest.month} ${biggest.year||curYear}</div>
      </div>
      <div style="font-family:var(--font-d);font-size:17px;font-weight:700;color:var(--accent);white-space:nowrap">${fmt(biggest.amount)}</div>
    </div>
    <div class="sbm-section-title">Where it came from</div>
    ${typeRows}
    <div class="sbm-section-title">Top entries</div>
    ${topList}
  `;
}

function populateYearDropdown(){
  const sel=document.getElementById('inc-year');if(!sel)return;
  const curYear=new Date().getFullYear();sel.innerHTML='';
  for(let y=2030;y>=2018;y--){const opt=document.createElement('option');opt.value=y;opt.textContent=y;if(y===curYear)opt.selected=true;sel.appendChild(opt);}
  // Set current month as default
  const moSel=document.getElementById('inc-month');
  if(moSel)moSel.value=MONTH_ORDER[new Date().getMonth()];
}

function renderIncome(){
  const totalInc=state.income.reduce((a,b)=>a+b.amount,0);
  const badge=document.getElementById('inc-total-badge');
  if(badge)badge.textContent=state.income.length?fmt(totalInc):'';
  // Type breakdown
  const bCard=document.getElementById('inc-breakdown-card');
  const bEl=document.getElementById('inc-breakdown');
  if(bCard&&bEl&&state.income.length){
    bCard.style.display='';
    const _typeColors={Salary:'var(--accent)',Bonus:'var(--amber)','Loan Repayment':'var(--blue)'};
    const types=[...new Set(state.income.map(e=>e.type||'Other'))].map(k=>({key:k,color:_typeColors[k]||'var(--muted)'}));
    bEl.innerHTML=types.map(t=>{
      const _tEntries=state.income.filter(e=>(e.type||'Other')===t.key);
      const tot=_tEntries.reduce((a,b)=>a+b.amount,0);
      const cnt=_tEntries.length;
      if(!cnt)return '';
      return `<div style="flex:1;min-width:120px;background:var(--surface2);border:1px solid var(--border2);border-radius:10px;padding:12px 14px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${t.color};font-weight:600;margin-bottom:4px">${esc(t.key)}</div>
        <div style="font-family:var(--font-d);font-size:18px;font-weight:700;color:${t.color}">${fmt(tot)}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px">${cnt} entr${cnt===1?'y':'ies'}</div>
      </div>`;
    }).join('');
  } else if(bCard){bCard.style.display='none';}
  const sortedAll=[...state.income].sort((a,b)=>{
    const ya=a.year||new Date().getFullYear(),yb=b.year||new Date().getFullYear();
    if(ya!==yb)return yb-ya;
    const ma=MONTH_ORDER.indexOf(a.month),mb=MONTH_ORDER.indexOf(b.month);
    if(ma!==mb)return mb-ma;
    // Same month & year - tie-break by which was actually entered most recently
    const da=a.dateAdded||'',db=b.dateAdded||'';
    if(da!==db)return db.localeCompare(da);
    return (b.id||0)-(a.id||0);
  });
  const _q=incQ.trim().toLowerCase();
  const sorted=sortedAll.filter(e=>(!incType||(e.type||'Other')===incType)&&(!_q||[e.month,e.year,e.type,e.note,e.amount].join(' ').toLowerCase().includes(_q)));
  const _ts=document.getElementById('inc-filter-type');
  if(_ts){const ts=[...new Set(state.income.map(e=>e.type||'Other'))];_ts.innerHTML='<option value="">All types</option>'+ts.map(t=>`<option${t===incType?' selected':''}>${esc(t)}</option>`).join('');}
  const _incList=document.getElementById('income-list');
  if(sortedAll.length&&!sorted.length){_incList.innerHTML='<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-search"/></svg></div><div class="empty-title">No matches</div><div class="empty-sub">Try a different search or filter.</div></div>';return;}
  if(!sorted.length){_incList.innerHTML='<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-cash"/></svg></div><div class="empty-title">No income entries yet</div><div class="empty-sub">Add your first entry above.</div></div>';return;}
  const latestId=sortedAll[0].id;
  const years=[...new Set(sorted.map(e=>e.year||new Date().getFullYear()))].sort((a,b)=>b-a);
  let html='';
  years.forEach(yr=>{
    const entries=sorted.filter(e=>(e.year||new Date().getFullYear())===yr);
    const yrTotal=entries.reduce((a,b)=>a+b.amount,0);
    html+=`<div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0 6px;border-bottom:1px solid var(--border);margin-bottom:2px"><span style="font-size:10px;text-transform:uppercase;letter-spacing:.09em;color:var(--muted2);font-weight:600">${yr}</span><span style="font-size:13px;font-weight:700;color:var(--accent)">${fmt(yrTotal)}</span></div>`;
    entries.forEach(e=>{
      const _iw=(state.wallets||[]).find(w=>w.id===e.wallet);
      const _isLatest=e.id===latestId,_ti=incTypeInfo(e.type);
      const _dateStr=e.dateAdded?`<span class="inc-date">added ${fmtDate(e.dateAdded)}</span>`:'';
      const _latestTag=_isLatest?'<span class="inc-new"><i></i>Latest</span>':'';
      const _walTag=_iw?`<span class="inc-wal">${walDot(_iw)}${esc(_iw.label)}</span>`:'';
      html+=`<div class="entry inc-row${_isLatest?' is-latest':''}"><div class="inc-ico" style="--tc:${_ti.c}" aria-hidden="true">${_ti.e}</div><div class="info"><div class="name">${esc(e.month)}${e.note?' - '+esc(e.note):''}</div><div class="meta"><span class="badge badge-${String(e.type).toLowerCase().replace(/[^a-z0-9]+/g,'-')}">${esc(e.type)}</span>${_latestTag}${_walTag}${_dateStr}</div></div><div class="right"><span class="amt ap">${fmt(e.amount)}</span><button type="button" class="row-more" aria-label="More actions" aria-haspopup="menu" onclick="rowMenu(event,'income',${e.id})">${FinIcons.ic('more')}</button></div></div>`;
    });
    html+='</div>';
  });
  _incList.innerHTML=html;
}

/* ── WALLET CARDS: brand colors, card type, credit usage ── */
const WAL_TYPES={ewallet:'E-Wallet',debit:'Debit',savings:'Savings',credit:'Credit',cash:'Cash',crypto:'Crypto',invest:'Investment'};
// a/b = gradient colors (approximations of each brand's look), d = dark text, m = badge mark
const WAL_BRANDS=[
  {g:'E-wallets',k:'gcash',n:'GCash',t:'ewallet',a:'#2a7bff',b:'#0b4fd6',m:'G',re:/g[\s-]?cash/i},
  {g:'E-wallets',k:'maya',n:'Maya',t:'ewallet',a:'#19c474',b:'#067a4a',m:'M',re:/\bmaya\b|pay\s?maya/i},
  {g:'E-wallets',k:'gotyme',n:'GoTyme',t:'debit',a:'#9b6bf5',b:'#5b2bc4',m:'GT',re:/go\s?tyme/i},
  {g:'E-wallets',k:'seabank',n:'SeaBank',t:'savings',a:'#ff8a4a',b:'#e5530c',m:'SB',re:/sea\s?bank/i},
  {g:'E-wallets',k:'shopeepay',n:'ShopeePay',t:'ewallet',a:'#ff7a4d',b:'#ea4a22',m:'SP',re:/shopee/i},
  {g:'E-wallets',k:'grabpay',n:'GrabPay',t:'ewallet',a:'#22c55e',b:'#0a8f3c',m:'GP',re:/grab/i},
  {g:'E-wallets',k:'coinsph',n:'Coins.ph',t:'ewallet',a:'#3b95ff',b:'#1658d6',m:'C',re:/coins\.?\s?ph/i},
  {g:'E-wallets',k:'paypal',n:'PayPal',t:'ewallet',a:'#2f8cf4',b:'#0b2f7c',m:'PP',re:/pay\s?pal/i},
  {g:'E-wallets',k:'wise',n:'Wise',t:'ewallet',a:'#a6ee7a',b:'#74d44a',m:'W',d:1,re:/\bwise\b|transferwise/i},
  {g:'Banks',k:'bpi',n:'BPI',t:'debit',a:'#f05a56',b:'#c42828',m:'BPI',re:/\bbpi\b|bank of the philippine islands/i},
  {g:'Banks',k:'bdo',n:'BDO',t:'debit',a:'#2557d6',b:'#0a2a7a',m:'BDO',re:/\bbdo\b/i},
  {g:'Banks',k:'metrobank',n:'Metrobank',t:'debit',a:'#2f6ee0',b:'#10398a',m:'MB',re:/metro\s?bank/i},
  {g:'Banks',k:'unionbank',n:'UnionBank',t:'debit',a:'#ffa040',b:'#e86a00',m:'UB',re:/union\s?bank/i},
  {g:'Banks',k:'landbank',n:'Landbank',t:'debit',a:'#2bb066',b:'#0b6b36',m:'LB',re:/land\s?bank/i},
  {g:'Banks',k:'rcbc',n:'RCBC',t:'debit',a:'#348cf2',b:'#0c56b8',m:'RC',re:/\brcbc\b/i},
  {g:'Banks',k:'pnb',n:'PNB',t:'debit',a:'#3a78dc',b:'#0f3f8c',m:'PNB',re:/\bpnb\b/i},
  {g:'Banks',k:'chinabank',n:'China Bank',t:'debit',a:'#e5484d',b:'#a3141b',m:'CB',re:/china\s?bank/i},
  {g:'Banks',k:'eastwest',n:'EastWest',t:'debit',a:'#9a52d0',b:'#5a2290',m:'EW',re:/east\s?west/i},
  {g:'Banks',k:'cimb',n:'CIMB',t:'savings',a:'#f2494d',b:'#b3121a',m:'CIMB',re:/\bcimb\b/i},
  {g:'Banks',k:'maribank',n:'Mari',t:'savings',a:'#b266f8',b:'#6d28d9',m:'MR',re:/mari\s?bank|\bmari\b/i},
  {g:'Crypto & more',k:'binance',n:'Binance',t:'crypto',a:'#fcd535',b:'#e8ae00',m:'B',d:1,re:/binance/i},
  {g:'Crypto & more',k:'bitcoin',n:'Bitcoin',t:'crypto',a:'#f9ab45',b:'#e8710a',m:'₿',re:/bitcoin|\bbtc\b/i},
  {g:'Crypto & more',k:'invest',n:'Investments',t:'invest',a:'#1fc5b4',b:'#0e766e',m:'↗',re:/invest|stocks?\b|mutual fund|mp2|uitf/i},
  {g:'Basics',k:'cash',n:'Cash on Hand',t:'cash',a:'#3cc98f',b:'#0f8a5f',m:'$',re:/\bcash\b|cash on hand|\bcoh\b|\bpera\b/i},
  {g:'Basics',k:'savings',n:'Savings',t:'savings',a:'#6c70f2',b:'#3730a3',m:'S',re:/\bsavings?\b|\bipon\b/i},
  {g:'Basics',k:'credit',n:'Credit Card',t:'credit',a:'#4b5a70',b:'#111a2b',m:'CC',re:/credit\s?card|\bcc\b/i}
];
const WAL_MAP={};WAL_BRANDS.forEach(b=>WAL_MAP[b.k]=b);
const WAL_SWATCHES=[['#7fb82a','#3f6b0c'],['#2a7bff','#0b4fd6'],['#f05a56','#c42828'],['#ffa040','#e86a00'],['#9b6bf5','#5b2bc4'],['#1fc5b4','#0e766e'],['#ec4899','#be185d'],['#fcd535','#e8ae00',1],['#4b5a70','#111a2b'],['#2b2b2b','#000000']];
const WAL_DEFAULT=['#7fb82a','#3f6b0c'];

function walDetect(name){name=String(name||'');if(!name.trim())return null;for(const b of WAL_BRANDS){if(b.re.test(name))return b;}return null;}
function walBrandOf(w){return(w.brand&&WAL_MAP[w.brand])||walDetect(w.label);}
function walType(w){const b=walBrandOf(w);return(w.type&&WAL_TYPES[w.type])?w.type:(b?b.t:'');}
function walStyle(w){
  const b=walBrandOf(w),own=!!w.c1;
  const c1=w.c1||(b?b.a:WAL_DEFAULT[0]),c2=w.c2||(b?b.b:WAL_DEFAULT[1]),dark=own?!!w.dark:(b?!!b.d:false);
  let m=b?b.m:String(w.label||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  if(w.brand&&!b)m=String(w.label||'?').trim().slice(0,2).toUpperCase();
  if(m==='$')m=(window.FinX?FinX.sym().trim():'₱').slice(0,3);
  return{c1:c1,c2:c2,dark:dark,mono:m||'?',b:b};
}
function walLogoHTML(w,st){
  if(w.logo)return '<span class="wc-logo"><img src="'+escAttr(w.logo)+'" alt=""></span>';
  const m=st.mono,fs=m.length>=4?10:m.length===3?12:m.length===2?15:18;
  return '<span class="wc-logo" style="font-size:'+fs+'px;color:'+(st.dark?'#15200d':st.c2)+'">'+esc(m)+'</span>';
}
function walDot(w){const st=walStyle(w);return '<span class="wal-dot" style="background:linear-gradient(135deg,'+st.c1+','+st.c2+')"></span>';}
function walCardHTML(w,o){
  o=o||{};const st=walStyle(w),t=walType(w),F=o.preview?fmt:fmtBal,cur=(window.FinX&&FinX.getCur)?FinX.getCur():'PHP';
  const credit=t==='credit',bal=+w.balance||0,limit=+w.limit||0,used=Math.max(0,-bal);
  const pct=limit?Math.min(100,Math.round(used/limit*100)):0,left=Math.max(0,limit-used);
  let body;
  if(credit){
    body=(limit?'<div class="wc-bar"><i style="width:'+pct+'%"></i></div><div class="wc-meta"><span>'+pct+'% used</span><span>'+F(left)+' left</span></div>':'')
      +'<div class="wc-bal-l">Used credit</div><div class="wc-bal">'+F(used)+'</div>';
  }else body='<div class="wc-bal-l">Balance</div><div class="wc-bal">'+F(bal)+'</div>';
  const dots='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>';
  const attrs=o.preview?'':' id="walcard-'+w.id+'" tabindex="0" role="button" aria-label="'+escAttr(w.label)+', update balance" onclick="openWalModal(\'bal\',\''+w.id+'\')" onkeydown="if(event.key===\'Enter\')openWalModal(\'bal\',\''+w.id+'\')"';
  return '<div class="wc'+(st.dark?' dark':'')+(o.preview?' preview':'')+'" style="--c1:'+st.c1+';--c2:'+st.c2+'"'+attrs+'>'
    +'<div><div class="wc-top">'+walLogoHTML(w,st)+'<div class="wc-name">'+esc(w.label||'Account name')+'</div>'
    +(o.preview?'':'<button type="button" class="wc-more" aria-label="Card options" onclick="event.stopPropagation();walMenu(event,\''+w.id+'\')">'+dots+'</button>')
    +'</div><div class="wc-sub">'+(t?WAL_TYPES[t]:'Wallet')+' • '+cur+'</div></div>'
    +'<div>'+body+(o.preview?'':'<div class="wc-upd">Updated '+(fmtDate(w.updated)||'-')+'</div>')+'</div></div>';
}
function walAddTile(){
  return '<button type="button" class="wc-add" data-tour="add-wallet" onclick="openWalModal(\'add\')"><span class="wc-plus">+</span><span>Add account</span><small>Banks, e-wallets, cards, cash</small></button>';
}
// spending checks that understand credit limits
function walShort(w,amt){
  if(walType(w)==='credit'){const lim=+w.limit||0;return lim>0&&(Math.max(0,-w.balance)+amt)>lim;}
  return w.balance<amt;
}
function walShortMsg(w){
  return walType(w)==='credit'?'This will go over the credit limit on '+w.label+'. Continue?':'This will put your '+w.label+' balance below zero. Continue?';
}

/* card menu (floating, so the card's rounded edge never clips it) */
function closeWalMenu(){const m=document.getElementById('wc-menu');if(m)m.remove();}
function walMenu(ev,id){
  closeWalMenu();
  const ws=state.wallets||[],i=ws.findIndex(w=>w.id===id);if(i<0)return;
  const r=ev.currentTarget.getBoundingClientRect(),m=document.createElement('div');
  m.id='wc-menu';m.className='wc-menu';m.setAttribute('role','menu');
  m.innerHTML='<button type="button" onclick="closeWalMenu();openWalModal(\'bal\',\''+id+'\')">Update balance</button>'
    +'<button type="button" onclick="closeWalMenu();openWalModal(\'edit\',\''+id+'\')">Edit card</button>'
    +'<button type="button" '+(i===0?'disabled':'')+' onclick="closeWalMenu();walMove(\''+id+'\',-1)">Move earlier</button>'
    +'<button type="button" '+(i===ws.length-1?'disabled':'')+' onclick="closeWalMenu();walMove(\''+id+'\',1)">Move later</button>'
    +'<button type="button" class="danger" onclick="closeWalMenu();confirmRemoveWallet(\''+id+'\')">Remove</button>';
  document.body.appendChild(m);
  let top=r.bottom+6,left=r.right-m.offsetWidth;
  if(left<8)left=8;if(left+m.offsetWidth>innerWidth-8)left=innerWidth-m.offsetWidth-8;
  if(top+m.offsetHeight>innerHeight-8)top=Math.max(8,r.top-m.offsetHeight-6);
  m.style.top=top+'px';m.style.left=left+'px';
  setTimeout(function(){document.addEventListener('click',closeWalMenu,{once:true});window.addEventListener('scroll',closeWalMenu,{once:true,capture:true});},0);
}
/* entry actions: one "..." button per row instead of 2-4 text buttons (keeps Remove away from Edit) */
const ROW_ACTIONS={
  expense:function(id){return[{i:'repeat',t:'Repeat today',js:'autoRepeat('+id+')'},{i:'pencil',t:'Edit',js:'openEditExpense('+id+')'},{i:'trash',t:'Remove',js:"del('expenses',"+id+")",danger:1}]},
  income:function(id){return[{i:'pencil',t:'Edit',js:'openEditIncome('+id+')'},{i:'trash',t:'Remove',js:"del('income',"+id+")",danger:1}]},
  loan:function(id){var l=(state.loans||[]).find(function(x){return x.id===id})||{};
    return(l.type==='receivable'&&!l.settled?[{i:'clipboard',t:'Send reminder',js:'copyReminder('+id+')'}]:[]).concat([{i:'pencil',t:'Edit',js:'openEditLoan('+id+')'},{i:'trash',t:'Remove',js:"del('loans',"+id+")",danger:1}])},
  goal:function(id){return[{i:'pencil',t:'Edit',js:'openEditGoal('+id+')'},{i:'trash',t:'Delete',js:'delGoal('+id+')',danger:1}]}
};
function rowMenu(ev,kind,id){
  ev.stopPropagation();closeWalMenu();
  var items=(ROW_ACTIONS[kind]||function(){return[]})(id);if(!items.length)return;
  var r=ev.currentTarget.getBoundingClientRect(),m=document.createElement('div');
  m.id='wc-menu';m.className='wc-menu';m.setAttribute('role','menu');
  m.innerHTML=items.map(function(it){return '<button type="button" role="menuitem"'+(it.danger?' class="danger"':'')+' onclick="closeWalMenu();'+it.js.replace(/"/g,'&quot;')+'">'+FinIcons.ic(it.i)+'<span>'+it.t+'</span></button>'}).join('');
  document.body.appendChild(m);
  var top=r.bottom+6,left=r.right-m.offsetWidth;
  if(left<8)left=8;if(left+m.offsetWidth>innerWidth-8)left=innerWidth-m.offsetWidth-8;
  if(top+m.offsetHeight>innerHeight-8)top=Math.max(8,r.top-m.offsetHeight-6);
  m.style.top=top+'px';m.style.left=left+'px';
  setTimeout(function(){document.addEventListener('click',closeWalMenu,{once:true});window.addEventListener('scroll',closeWalMenu,{once:true,capture:true});},0);
}
function walMove(id,dir){
  const ws=state.wallets||[],i=ws.findIndex(w=>w.id===id),j=i+dir;
  if(i<0||j<0||j>=ws.length)return;
  const t=ws[i];ws[i]=ws[j];ws[j]=t;save();renderAfterWallet();
}

/* editor sheet: add / edit / quick balance update */
let WD=null;
function walBuildPickers(){
  let h='',grp='';
  WAL_BRANDS.forEach(function(b){
    if(b.g!==grp){if(grp)h+='</div>';grp=b.g;h+='<div class="wal-gl">'+b.g+'</div><div class="wal-bg">';}
    const m=b.m==='$'?'₱':b.m,fs=m.length>=4?9:m.length===3?11:m.length===2?13:15;
    h+='<button type="button" class="wal-brand" data-k="'+b.k+'" onclick="walPickBrand(\''+b.k+'\')"><span class="wal-bl" style="background:linear-gradient(135deg,'+b.a+','+b.b+');color:'+(b.d?'#15200d':'#fff')+';font-size:'+fs+'px">'+esc(m)+'</span><span>'+esc(b.n)+'</span></button>';
  });
  document.getElementById('wal-brands').innerHTML=h+'</div>';
  document.getElementById('wal-types').innerHTML=Object.keys(WAL_TYPES).map(function(k){return '<button type="button" class="wal-chip" data-k="'+k+'" onclick="walPickType(\''+k+'\')">'+WAL_TYPES[k]+'</button>';}).join('');
  document.getElementById('wal-colors').innerHTML=WAL_SWATCHES.map(function(s,i){return '<button type="button" class="wal-sw" data-i="'+i+'" aria-label="Color '+(i+1)+'" style="background:linear-gradient(135deg,'+s[0]+','+s[1]+')" onclick="walPickColor('+i+')"></button>';}).join('');
}
function openWalModal(mode,id){
  closeWalMenu();
  let w=null;
  if(id){w=(state.wallets||[]).find(x=>x.id===id);if(!w)return;}
  walBuildPickers();
  if(w){
    const st=walStyle(w),t=walType(w)||'ewallet',b=st.b;
    WD={mode:mode,id:w.id,brand:b?b.k:(w.brand||''),label:w.label,type:t,c1:st.c1,c2:st.c2,dark:st.dark,logo:w.logo||'',manual:!!w.c1&&!b,typeTouched:true,nameTouched:true,auto:false,last:''};
    const shown=t==='credit'?Math.max(0,-(+w.balance||0)):(+w.balance||0);
    WD.orig=shown;WD.origShown=shown;WD.origCredit=(t==='credit');
    document.getElementById('wal-bal').value=shown||'';
    document.getElementById('wal-limit').value=w.limit||'';
  }else{
    WD={mode:'add',id:null,brand:'',label:'',type:'ewallet',c1:WAL_DEFAULT[0],c2:WAL_DEFAULT[1],dark:false,logo:'',manual:false,typeTouched:false,nameTouched:false,auto:false,last:'',orig:0};
    document.getElementById('wal-bal').value='';document.getElementById('wal-limit').value='';
  }
  document.getElementById('wal-name').value=WD.label;
  document.getElementById('wal-err').textContent='';
  const bal=WD.mode==='bal';
  ['wal-sec-brand','wal-sec-name','wal-sec-type','wal-sec-color','wal-sec-logo'].forEach(function(i){document.getElementById(i).style.display=bal?'none':'';});
  document.getElementById('wal-title').textContent=WD.mode==='add'?'Add account':bal?'Update balance':'Edit card';
  document.getElementById('wal-save').textContent=WD.mode==='add'?'Add account':bal?'Update':'Save changes';
  const ov=document.getElementById('wal-modal');ov.style.display='flex';document.body.style.overflow='hidden';
  walSync();
  setTimeout(function(){if(!WD)return;const f=document.getElementById(WD.mode==='add'?'wal-name':'wal-bal');if(f&&matchMedia('(hover:hover)').matches){f.focus();if(bal)f.select();}},120);
}
function closeWalModal(){document.getElementById('wal-modal').style.display='none';document.body.style.overflow='';WD=null;}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&WD)closeWalModal();});
function walApply(b){WD.brand=b.k;WD.c1=b.a;WD.c2=b.b;WD.dark=!!b.d;WD.manual=false;if(!WD.typeTouched)WD.type=b.t;}
function walPickBrand(k){
  const b=WAL_MAP[k];if(!b||!WD)return;
  walApply(b);WD.auto=false;
  if(!WD.nameTouched||WD.label===WD.last){WD.label=b.n;WD.last=b.n;document.getElementById('wal-name').value=b.n;}
  walSync();
}
function walName(v){
  if(!WD)return;WD.label=v;WD.nameTouched=true;
  if(!WD.manual){
    const b=walDetect(v);
    if(b){walApply(b);WD.auto=true;}
    else if(WD.auto){WD.brand='';WD.c1=WAL_DEFAULT[0];WD.c2=WAL_DEFAULT[1];WD.dark=false;WD.auto=false;}
  }
  walSync();
}
function walPickType(t){
  if(!WD)return;
  const was=WD.type==='credit';
  WD.type=t;WD.typeTouched=true;
  if(WD.mode==='edit'){
    // "used credit" and "balance" mean opposite things, so a credit <-> non-credit switch needs a fresh amount
    const el=document.getElementById('wal-bal');
    if((t==='credit')!==WD.origCredit){
      if(was===WD.origCredit)el.value='';
      WD.orig=NaN;el.placeholder='Enter the current amount';
    }else{WD.orig=WD.origShown;el.value=WD.origShown||'';el.placeholder='0.00';}
  }
  walSync();
}
function walPickColor(i){const s=WAL_SWATCHES[i];if(!s||!WD)return;WD.c1=s[0];WD.c2=s[1];WD.dark=!!s[2];WD.manual=true;WD.auto=false;walSync();}
function walLogoRemove(){if(!WD)return;WD.logo='';walSync();}
function walLogoPick(inp){
  const f=inp.files&&inp.files[0];inp.value='';
  if(!f||!WD)return;
  if(!/^image\//.test(f.type)){toast('Please pick an image file','error');return;}
  const img=new Image(),url=URL.createObjectURL(f);
  img.onload=function(){
    const S=96,c=document.createElement('canvas');c.width=c.height=S;
    const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,S,S);
    const r=Math.min(img.width,img.height);x.drawImage(img,(img.width-r)/2,(img.height-r)/2,r,r,0,0,S,S);
    URL.revokeObjectURL(url);
    if(WD){WD.logo=c.toDataURL('image/jpeg',0.88);walSync();}
  };
  img.onerror=function(){URL.revokeObjectURL(url);toast('Could not read that image','error');};
  img.src=url;
}
function walDraft(){
  const credit=WD.type==='credit',n=parseFloat(document.getElementById('wal-bal').value)||0;
  return{id:'preview',label:WD.label,brand:WD.brand,type:WD.type,balance:credit?-Math.abs(n):n,limit:parseFloat(document.getElementById('wal-limit').value)||0,c1:WD.c1,c2:WD.c2,dark:WD.dark,logo:WD.logo,updated:today()};
}
function walSync(){
  if(!WD)return;
  const credit=WD.type==='credit',sym=(window.FinX?FinX.sym().trim():'₱');
  document.getElementById('wal-sec-limit').style.display=credit?'':'none';
  document.getElementById('wal-bal-l').textContent=(credit?'Used credit':WD.mode==='add'?'Starting balance':'Current balance')+' ('+sym+')';
  document.querySelectorAll('#wal-brands .wal-brand').forEach(function(e){e.classList.toggle('sel',e.getAttribute('data-k')===WD.brand);});
  document.querySelectorAll('#wal-types .wal-chip').forEach(function(e){e.classList.toggle('sel',e.getAttribute('data-k')===WD.type);});
  document.querySelectorAll('#wal-colors .wal-sw').forEach(function(e){e.classList.toggle('sel',WAL_SWATCHES[+e.getAttribute('data-i')][0]===WD.c1);});
  document.getElementById('wal-logo-rm').style.display=WD.logo?'':'none';
  document.getElementById('wal-prev').innerHTML=walCardHTML(walDraft(),{preview:true});
}
function walSave(){
  if(!WD)return;
  const err=function(m){document.getElementById('wal-err').textContent=m;};
  err('');
  const credit=WD.type==='credit',name=(WD.label||'').trim();
  if(WD.mode!=='bal'){
    if(!name)return err('Give this account a name.');
    if(name.length>24)return err('Name is too long (max 24 characters).');
    if((state.wallets||[]).some(w=>w.id!==WD.id&&w.label.toLowerCase()===name.toLowerCase()))return err('You already have an account with that name.');
  }
  const raw=document.getElementById('wal-bal').value,num=raw===''?0:parseFloat(raw);
  if(isNaN(num))return err('Enter a valid amount.');
  const limit=credit?(parseFloat(document.getElementById('wal-limit').value)||0):0;
  if(credit&&limit<0)return err('Credit limit cannot be negative.');
  const r2=function(x){return Math.round(x*100)/100;};
  if(WD.mode==='edit'&&isNaN(WD.orig)&&raw==='')return err('Enter the current amount, because the card type changed.');
  const changed=WD.mode==='add'||isNaN(WD.orig)||r2(num)!==r2(WD.orig);
  if(changed&&!credit&&num<0)return err('Balance cannot be negative.');
  const newBal=r2(credit?-Math.abs(num):num);
  if(!state.wallets)state.wallets=[];
  if(WD.mode==='add'){
    const id='w'+Date.now();
    state.wallets.push({id:id,label:name,balance:newBal,updated:today(),brand:WD.brand,type:WD.type,limit:limit,c1:WD.c1,c2:WD.c2,dark:WD.dark,logo:WD.logo});
    save();closeWalModal();renderAfterWallet();toast(name+' added ✓');
    window.dispatchEvent(new CustomEvent('fin:wallet-added',{detail:{id:id,name:name}}));
    return;
  }
  const w=state.wallets.find(x=>x.id===WD.id);if(!w){closeWalModal();return;}
  if(WD.mode==='edit'){w.label=name;w.brand=WD.brand;w.type=WD.type;w.c1=WD.c1;w.c2=WD.c2;w.dark=WD.dark;w.logo=WD.logo;}
  w.limit=limit;
  if(changed){w.balance=newBal;w.updated=today();}
  const balChanged=changed;
  const wasBal=WD.mode==='bal';
  save();closeWalModal();renderAfterWallet();toast(wasBal?w.label+' updated ✓':'Saved ✓');
  if(balChanged)window.dispatchEvent(new CustomEvent('fin:balance-updated',{detail:{id:w.id,label:w.label,amount:newBal}}));
}

/* income rows: a little icon per type */
function incTypeInfo(t){
  t=String(t||'');
  if(/salary|sahod|wage/i.test(t))return{e:FinIcons.ic('briefcase'),c:'var(--accent)'};
  if(/bonus|13th|incentive/i.test(t))return{e:FinIcons.ic('gift'),c:'var(--amber)'};
  if(/loan|repay|utang/i.test(t))return{e:FinIcons.ic('swap'),c:'var(--blue)'};
  if(/freelance|business|sales?|side/i.test(t))return{e:FinIcons.ic('receipt'),c:'var(--purple)'};
  if(/gift|allow|regalo/i.test(t))return{e:FinIcons.ic('gift'),c:'var(--purple)'};
  if(/interest|dividend|invest/i.test(t))return{e:FinIcons.ic('trend-up'),c:'var(--teal)'};
  return{e:FinIcons.ic('cash'),c:'var(--muted)'};
}

function renderBalances(){
  const wallets=state.wallets||[];
  const total=wallets.reduce((a,w)=>a+w.balance,0);
  document.getElementById('balance-cards').innerHTML=wallets.map(w=>walCardHTML(w)).join('')+walAddTile();
  // Net worth rows
  const nwRows=document.getElementById('nw-rows');
  if(nwRows){
    nwRows.innerHTML=wallets.map(w=>`<div class="row"><span class="lbl" style="display:inline-flex;align-items:center;gap:9px">${walDot(w)}${esc(w.label)}</span><span class="val ap">${fmtBal(w.balance)}</span></div>`).join('');
  }
  document.getElementById('nw-total').textContent=state.hideBalances?((window.FinX?FinX.sym():'₱')+' ••••••'):fmt(total);
  // update expense source dropdown
  const expSrc=document.getElementById('exp-source');
  if(expSrc){
    const cur=expSrc.value;
    expSrc.innerHTML=wallets.map(w=>`<option value="${w.id}">${esc(w.label)}</option>`).join('');
    if(wallets.find(w=>w.id===cur))expSrc.value=cur;
  }
  // update income wallet dropdown
  const incWal=document.getElementById('inc-wallet');
  if(incWal){
    const cur=incWal.value;
    incWal.innerHTML=wallets.map(w=>`<option value="${w.id}">${esc(w.label)}</option>`).join('');
    if(wallets.find(w=>w.id===cur))incWal.value=cur;
  }
  // update loan wallet dropdown (Add Loan form)
  const loanWal=document.getElementById('loan-wallet');
  if(loanWal){
    const cur=loanWal.value;
    loanWal.innerHTML='<option value=""> - Not tracked in a wallet - </option>'+wallets.map(w=>`<option value="${w.id}">${esc(w.label)}</option>`).join('');
    if(cur==='' || wallets.find(w=>w.id===cur))loanWal.value=cur;
  }
}

function renderExpenses(){
  // ── Recurring panel ──────────────────────────────────────
  var panel=document.getElementById('recurring-panel');
  if(panel){
    var n=new Date(), cm=n.getMonth(), cy=n.getFullYear();
    var loggedSet=new Set();
    state.expenses.forEach(function(e){
      var d=ldate(e.date);
      if(e.recurring && !isNaN(d) && d.getMonth()===cm && d.getFullYear()===cy) loggedSet.add(e.desc);
    });
    var templates=[];
    var seen={};
    for(var ti=state.expenses.length-1;ti>=0;ti--){
      var te=state.expenses[ti];
      if(te.recurring && !seen[te.desc]){ seen[te.desc]=true; templates.push(te); }
    }
    templates.reverse();
    if(templates.length){
      var rows=templates.map(function(e){
        var wl=(state.wallets||[]).find(function(w){return w.id===e.source;});
        var done=loggedSet.has(e.desc);
        var btn=done
          ? '<span style="font-size:12px;color:var(--accent);font-weight:600;white-space:nowrap">✓ Logged</span>'
          : '<button style="padding:6px 14px;background:var(--accent);color:#080808;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:var(--font-b)" onclick="window.logRecurring('+e.id+')">Log Now</button>';
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);gap:12px">'
          +'<div><div style="font-size:13px;font-weight:500">'+esc(e.desc)+'</div>'
          +'<div style="font-size:11px;color:var(--muted);margin-top:2px">'+fmt(e.amount)+(wl?' · '+esc(wl.label):'')+' · monthly</div></div>'
          +btn+'</div>';
      }).join('');
      panel.innerHTML='<div style="background:var(--surface);border:1px solid rgba(167,139,250,.35);border-radius:14px;padding:18px 20px;margin-bottom:14px">'
        +'<div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--purple);font-weight:700;margin-bottom:12px">↺ Recurring This Month</div>'
        +rows+'</div>';
      panel.style.display='';
    } else {
      panel.style.display='none';
    }
  }

  // ── Expense list ─────────────────────────────────────────
  var _expSearch=document.getElementById('exp-search');var searchQ=(_expSearch?_expSearch.value:'').toLowerCase().trim();
  var list=[...state.expenses].reverse();
  if(expFilter!=='all') list=list.filter(function(e){return (e.cat||'other-exp')===expFilter;});
  if(searchQ) list=list.filter(function(e){return String(e.desc||'').toLowerCase().includes(searchQ)||String(e.source||'').toLowerCase().includes(searchQ)||(e.note||'').toLowerCase().includes(searchQ);});
  var totalExp=state.expenses.reduce(function(a,b){return a+b.amount;},0);
  var filtered=list.reduce(function(a,b){return a+b.amount;},0);
  var badge=document.getElementById('exp-total-badge');
  if(badge) badge.textContent=state.expenses.length?(searchQ||expFilter!=='all'?fmt(filtered)+' of '+fmt(totalExp):fmt(totalExp)):'';
  document.getElementById('expense-list').innerHTML=list.length
    ?list.map(function(e){
        var wl=(state.wallets||[]).find(function(w){return w.id===e.source;});
        var srcLabel=wl?wl.label:e.source;
        return '<div class="entry"><div class="info"><div class="name">'+esc(e.desc)+(e.recurring?'<span class="badge badge-recurring" style="margin-left:6px;font-size:9px">↺ recurring</span>':'')+'</div>'
          +'<div class="meta">'+fmtDate(e.date)+' · '+esc(srcLabel)+(e.note?' · <em style="color:var(--muted)">'+esc(e.note)+'</em>':'')+'<span class="badge badge-'+(e.cat||'other-exp')+'">'+catHTML(e.cat||'other-exp')+'</span></div></div>'
          +'<div class="right"><span class="amt an">'+fmt(e.amount)+'</span>'
          +'<button type="button" class="row-more" aria-label="More actions" aria-haspopup="menu" onclick="rowMenu(event,\'expense\','+e.id+')">'+FinIcons.ic('more')+'</button></div></div>';
      }).join('')
    :'<div class="empty"><div class="empty-icon">'+FinIcons.ic(searchQ?'search':'receipt')+'</div><div class="empty-title">'+(searchQ?'No matching expenses':'No expenses yet')+'</div><div class="empty-sub">'+(searchQ?'Try a different term.':'Start logging above.')+'</div></div>';
}


function renderLoans(){
  const today_=today();
  const nowMs=new Date().setHours(0,0,0,0);
  function loanStatus(l){
    if(l.settled||!l.due)return null;
    const dueMs=ldate(l.due).setHours(0,0,0,0);
    const diff=Math.round((dueMs-nowMs)/(1000*60*60*24));
    if(diff<0)return{type:'overdue',days:Math.abs(diff)};
    if(diff<=7)return{type:'due-soon',days:diff};
    return{type:'ok',days:diff};
  }
  const payTotal=state.loans.filter(l=>l.type==='payable'&&!l.settled).reduce((a,b)=>a+b.amount,0);
  const recTotal=state.loans.filter(l=>l.type==='receivable'&&!l.settled).reduce((a,b)=>a+b.amount,0);
  document.getElementById('payable-total').textContent=fmt(payTotal);
  document.getElementById('receivable-total').textContent=fmt(recTotal);
  // Sort: unsettled overdue first, then due-soon, then has-due-date, then no-date, then settled last
  function loanSortKey(l){
    if(l.settled)return 999;
    if(!l.due)return 50;
    const s=loanStatus(l);
    if(s.type==='overdue')return 0;
    if(s.type==='due-soon')return 1;
    return 10;
  }
  const sortedAll=[...state.loans].sort((a,b)=>loanSortKey(a)-loanSortKey(b));
  const _lq=loanQ.trim().toLowerCase();
  const sorted=sortedAll.filter(l=>{
    if(loanFilter==='payable'&&!(l.type==='payable'&&!l.settled))return false;
    if(loanFilter==='receivable'&&!(l.type==='receivable'&&!l.settled))return false;
    if(loanFilter==='overdue'){const s=loanStatus(l);if(!s||s.type!=='overdue')return false;}
    if(loanFilter==='settled'&&!l.settled)return false;
    return !_lq||[l.name,l.note,l.amount].join(' ').toLowerCase().includes(_lq);
  });
  document.getElementById('loan-list').innerHTML=sorted.length
    ?sorted.map(l=>{
      const st=loanStatus(l);
      let statusBadge='';
      let dueLine='';
      if(l.due&&!l.settled){
        const dueDisplay=fmtDate(l.due);
        if(st.type==='overdue'){
          statusBadge=`<span class="badge badge-overdue">⚠ Overdue by ${st.days}d</span>`;
          dueLine=`<span style="color:var(--red);font-size:11px">Due ${dueDisplay}</span>`;
        } else if(st.type==='due-soon'){
          statusBadge=`<span class="badge badge-due-soon">⏰ ${st.days===0?'Due Today':'Due in '+st.days+'d'}</span>`;
          dueLine=`<span style="color:var(--amber);font-size:11px">Due ${dueDisplay}</span>`;
        } else {
          dueLine=`<span style="font-size:11px;color:var(--muted)">Due ${dueDisplay}</span>`;
        }
      }
      const srcWallet=l.sourceWallet?(state.wallets||[]).find(w=>w.id===l.sourceWallet):null;
      const walletLine=srcWallet?`<span style="font-size:11px;color:var(--muted)">${l.type==='payable'?'→ ':'from '}${esc(srcWallet.label)}</span>`:'';
      return `<div class="entry" style="flex-direction:column;align-items:stretch;gap:8px" id="loan-entry-${l.id}">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <div class="info"><div class="name" style="${l.settled?'opacity:.4':''}">${esc(l.name)}${l.note?' · '+esc(l.note):''}</div>
        <div class="meta"><span class="badge ${l.settled?'badge-settled':l.type==='payable'?'badge-payable':'badge-receivable'}">${l.settled?'Settled':l.type==='payable'?'I owe':'Owes me'}</span>${statusBadge}${dueLine}${walletLine}</div></div>
        <div class="right">
          <span class="amt ${l.settled?'aw':l.type==='payable'?'an':'ap'}" style="${l.settled?'opacity:.4':''}">${fmt(l.amount)}</span>
          <button class="btn btn-settle btn-sm" onclick="settle(${l.id})">${l.settled?'Undo':'Settle'}</button>
          <button type="button" class="row-more" aria-label="More actions" aria-haspopup="menu" onclick="rowMenu(event,'loan',${l.id})">${FinIcons.ic('more')}</button>
        </div>
      </div>
      ${!l.settled?`<div class="adj-row">
        <span style="font-size:11px;color:var(--muted);flex-shrink:0">Adjust:</span>
        <input type="number" id="adj-${l.id}" placeholder="Amount" min="0" style="flex:1;padding:5px 9px;font-size:12.5px">
        <button class="btn btn-ghost btn-sm" onclick="adjustLoan(${l.id},'add')" title="Add to balance" style="padding:5px 10px;color:var(--accent)">${FinIcons.ic('plus')} Add</button>
        <button class="btn btn-ghost btn-sm" onclick="adjustLoan(${l.id},'deduct')" title="Deduct from balance" style="padding:5px 10px;color:var(--red)">${FinIcons.ic('minus')} Deduct</button>
      </div>`:''}
    </div>`;
    }).join('')
    :sortedAll.length?'<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-search"/></svg></div><div class="empty-title">No matches</div><div class="empty-sub">Try a different search or filter.</div></div>'
    :'<div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-swap"/></svg></div><div class="empty-title">No loans tracked yet</div><div class="empty-sub">Add a loan above to get started.</div></div>';
}

/* ACTIONS */
function addIncome(){
  const month=document.getElementById('inc-month').value;
  const year=parseInt(document.getElementById('inc-year').value);
  const type=document.getElementById('inc-type').value;
  const amount=parseFloat(document.getElementById('inc-amount').value);
  const note=document.getElementById('inc-note').value.trim();
  const walletId=document.getElementById('inc-wallet').value;
  if(!amount||amount<=0||isNaN(amount)){toast('Enter a valid amount','error');return;}
  // Add to wallet balance
  const wallet=(state.wallets||[]).find(w=>w.id===walletId);
  if(wallet){
    wallet.balance=Math.round((wallet.balance+amount)*100)/100;
    wallet.updated=today();
  }
  state.income.push({id:uid(),month,year,type,amount,note,wallet:walletId,dateAdded:today()});
  document.getElementById('inc-amount').value='';document.getElementById('inc-note').value='';
  save();renderAfterIncome();toast('Income added'+(wallet?' - '+wallet.label+' updated':'')+' ✓');
  window.dispatchEvent(new CustomEvent('fin:income-added',{detail:{amount,walletId}}));
}
function walletOptionsHTML(selectedId){
  return (state.wallets||[]).map(w=>`<option value="${w.id}"${w.id===selectedId?' selected':''}>${esc(w.label)}</option>`).join('');
}
function yearOptionsHTML(selectedYear){
  let html='';
  for(let y=2030;y>=2018;y--)html+=`<option value="${y}"${y===selectedYear?' selected':''}>${y}</option>`;
  return html;
}
function openEditIncome(id){
  const e=state.income.find(x=>x.id===id);
  if(!e)return;
  document.getElementById('edit-inc-id').value=e.id;
  document.getElementById('edit-inc-month').value=e.month;
  document.getElementById('edit-inc-year').innerHTML=yearOptionsHTML(e.year||new Date().getFullYear());
  document.getElementById('edit-inc-type').value=e.type;
  document.getElementById('edit-inc-amount').value=e.amount;
  document.getElementById('edit-inc-wallet').innerHTML=walletOptionsHTML(e.wallet);
  document.getElementById('edit-inc-note').value=e.note||'';
  document.getElementById('edit-income-modal').style.display='flex';
}
function closeEditIncome(){
  document.getElementById('edit-income-modal').style.display='none';
}
function saveEditIncome(){
  const id=parseInt(document.getElementById('edit-inc-id').value);
  const e=state.income.find(x=>x.id===id);
  if(!e)return;
  const amount=parseFloat(document.getElementById('edit-inc-amount').value);
  if(!amount||amount<=0||isNaN(amount)){toast('Enter a valid amount','error');return;}
  const newWalletId=document.getElementById('edit-inc-wallet').value;
  // Revert old wallet effect, then apply new one
  const oldWallet=(state.wallets||[]).find(w=>w.id===e.wallet);
  if(oldWallet){oldWallet.balance=Math.round((oldWallet.balance-e.amount)*100)/100;oldWallet.updated=today();}
  const newWallet=(state.wallets||[]).find(w=>w.id===newWalletId);
  if(newWallet){newWallet.balance=Math.round((newWallet.balance+amount)*100)/100;newWallet.updated=today();}
  e.month=document.getElementById('edit-inc-month').value;
  e.year=parseInt(document.getElementById('edit-inc-year').value);
  e.type=document.getElementById('edit-inc-type').value;
  e.amount=amount;
  e.wallet=newWalletId;
  e.note=document.getElementById('edit-inc-note').value.trim();
  closeEditIncome();
  save();renderAfterIncome();toast('Income entry updated ✓');
}
function onExpCatChange(){
  const cat=document.getElementById('exp-cat').value;
  const grp=document.getElementById('loan-select-group');
  if(cat==='loan-payment'){
    grp.style.display='block';
    // populate with unsettled payable loans
    const sel=document.getElementById('exp-loan-id');
    const payable=state.loans.filter(l=>l.type==='payable'&&!l.settled);
    if(payable.length){
      sel.innerHTML=payable.map(l=>`<option value="${l.id}">${esc(l.name)}${l.note?' ('+esc(l.note)+')':''} - ${fmt(l.amount)}</option>`).join('');
    } else {
      sel.innerHTML='<option value="">No outstanding payable loans</option>';
    }
  } else {
    grp.style.display='none';
  }
}

function onLoanTypeChange(){
  const type=document.getElementById('loan-type').value;
  const grp=document.getElementById('loan-wallet-group');
  if(grp)grp.style.display=type==='receivable'?'block':'none';
}
function deductWalletBalance(walletId,amount){
  const wallet=(state.wallets||[]).find(w=>w.id===walletId);
  if(wallet){
    wallet.balance=Math.round((wallet.balance-amount)*100)/100;
    wallet.updated=today();
  }
  return wallet;
}
function pushExpense({desc,amount,cat,source,date,note,recurring,recurringTemplateId,loanId,loanApplied}){
  const entry={id:uid(),desc,amount,cat,source,date,note,recurring:!!recurring};
  if(recurringTemplateId)entry.recurringTemplateId=recurringTemplateId;
  if(loanId){entry.loanId=loanId;entry.loanApplied=loanApplied||0;}   // remembers which loan this payment reduced, and by how much
  state.expenses.push(entry);
  return entry;
}
function openEditExpense(id){
  const e=state.expenses.find(x=>x.id===id);
  if(!e)return;
  document.getElementById('edit-exp-id').value=e.id;
  document.getElementById('edit-exp-desc').value=e.desc;
  document.getElementById('edit-exp-amount').value=e.amount;
  document.getElementById('edit-exp-cat').value=e.cat||'other-exp';
  document.getElementById('edit-exp-source').innerHTML=walletOptionsHTML(e.source);
  document.getElementById('edit-exp-date').value=e.date||today();
  document.getElementById('edit-exp-note').value=e.note||'';
  document.getElementById('edit-expense-modal').style.display='flex';
}
function closeEditExpense(){
  document.getElementById('edit-expense-modal').style.display='none';
}
function saveEditExpense(){
  const id=parseInt(document.getElementById('edit-exp-id').value);
  const e=state.expenses.find(x=>x.id===id);
  if(!e)return;
  const desc=document.getElementById('edit-exp-desc').value.trim();
  const amount=parseFloat(document.getElementById('edit-exp-amount').value);
  if(!desc){toast('Add a description','error');return;}
  if(!amount||amount<=0||isNaN(amount)){toast('Enter a valid amount','error');return;}
  const newSource=document.getElementById('edit-exp-source').value;
  const newCat=document.getElementById('edit-exp-cat').value;
  // Keep a linked loan in step with the edited payment (amount changed, or no longer a loan payment).
  if(e.loanId){
    const ln=state.loans.find(l=>l.id===e.loanId);
    if(ln){
      const restored=Math.round((ln.amount+(e.loanApplied||0))*100)/100;   // loan balance before this payment
      if(newCat==='loan-payment'){
        const applied=Math.min(amount,restored);
        ln.amount=Math.round((restored-applied)*100)/100;
        e.loanApplied=applied;
      }else{
        ln.amount=restored;e.loanApplied=0;delete e.loanId;
      }
      if(!ln.settledTxn){
        if(ln.amount===0)ln.settled=true;
        else if(ln.settled)ln.settled=false;
      }
    }
  }
  // Revert old wallet effect (expense had subtracted), then apply new one
  const oldWallet=(state.wallets||[]).find(w=>w.id===e.source);
  if(oldWallet){oldWallet.balance=Math.round((oldWallet.balance+e.amount)*100)/100;oldWallet.updated=today();}
  const newWallet=(state.wallets||[]).find(w=>w.id===newSource);
  if(newWallet){newWallet.balance=Math.round((newWallet.balance-amount)*100)/100;newWallet.updated=today();}
  e.desc=desc;
  e.amount=amount;
  e.cat=newCat;
  e.source=newSource;
  e.date=document.getElementById('edit-exp-date').value||today();
  e.note=document.getElementById('edit-exp-note').value.trim();
  closeEditExpense();
  save();renderAfterExpense();toast('Expense updated ✓');
}
async function addExpense(){
  const desc=document.getElementById('exp-desc').value.trim();
  const amount=parseFloat(document.getElementById('exp-amount').value);
  const cat=document.getElementById('exp-cat').value;
  const source=document.getElementById('exp-source').value;
  const date=document.getElementById('exp-date').value||today();
  const note=document.getElementById('exp-note').value.trim();
  const recurring=document.getElementById('exp-recurring').checked;
  if(!desc){toast('Add a description','error');return;}
  if(!amount||amount<=0){toast('Enter a valid amount','error');return;}

  const walletPreview=(state.wallets||[]).find(w=>w.id===source);
  if(walletPreview&&walShort(walletPreview,amount)){
    const goNeg=await mtConfirm(walShortMsg(walletPreview),'⚠️','Continue','var(--amber)');
    if(!goNeg)return;
  }
  const wallet=deductWalletBalance(source,amount);

  let loanRef='',payLoanId=0,payApplied=0;
  if(cat==='loan-payment'){
    const loanId=parseInt(document.getElementById('exp-loan-id').value);
    const loan=state.loans.find(l=>l.id===loanId);
    if(loan){
      const before=loan.amount;
      loan.amount=Math.max(0,Math.round((loan.amount-amount)*100)/100);
      payLoanId=loan.id;payApplied=Math.round((before-loan.amount)*100)/100;
      loanRef=` → ${loan.name}`;
      if(loan.amount===0){loan.settled=true;toast(`Loan to ${loan.name} fully settled ✓`);window.dispatchEvent(new CustomEvent('fin:loan-settled',{detail:{loan}}));}
    }
  }

  pushExpense({desc:desc+(loanRef?loanRef:''),amount,cat,source,date,note,recurring,loanId:payLoanId,loanApplied:payApplied});
  document.getElementById('exp-desc').value='';document.getElementById('exp-amount').value='';
  document.getElementById('exp-date').value=today();document.getElementById('exp-note').value='';
  document.getElementById('exp-recurring').checked=false;
  rcHideBanner();
  save();renderAfterExpense();toast('Expense logged'+(wallet?' - '+wallet.label+' updated':'')+' ✓');
  window.dispatchEvent(new CustomEvent('fin:expense-logged',{detail:{desc,amount,cat,source}}));
}
/* ══ RECEIPT SCANNER (free, on-device OCR via Tesseract.js) ══
   The photo is read on the phone and never uploaded or stored. Only the reader software
   is downloaded (once) from a public CDN. It is a free reader, so it can misread - 
   the result always lands in the normal expense form to be checked before saving. */
/*RC-PARSE-START*/
const RC_MON={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
function rcAmounts(str){
  const out=[],re=/(\d{1,3}(?:[,\s]\d{3})+|\d+)\s?[.,]\s?(\d{2})(?!\d)/g;let m;
  while((m=re.exec(str))){const v=parseFloat(m[1].replace(/[,\s]/g,'')+'.'+m[2]);if(v>0&&v<10000000)out.push(v);}
  return out;
}
function rcIntAmount(str){
  const re=/(\d{1,3}(?:,\d{3})+|\d+)(?![\d.,]\d)/g;let m,last=null;
  while((m=re.exec(str))){const v=parseFloat(m[1].replace(/,/g,''));if(v>0&&v<10000000)last=v;}
  return last;
}
function rcParseTotal(lines){
  const STRONG=/grand\s*total|amount\s*due|total\s*due|total\s*amount|amount\s*payable|balance\s*due|net\s*amount|amt\s*due|total\s*sales?/i;
  const WEAK=/\bt[o0]tal\b/i;
  const NOT_STRONG=/sub\s*-?\s*total/i;
  const EXCL=/sub\s*-?\s*total|vat|tax|change|cash|tender|discount|exempt|zero\s*rated|service\s*charge|items?\b|qty|pcs|card|gcash|maya|points?|tip|saving/i;
  const pick=(idx)=>{
    let a=rcAmounts(lines[idx]);
    if(a.length)return a[a.length-1];
    let n=rcIntAmount(lines[idx].replace(/total|due|amount|payable|balance|net|grand|sales?/ig,''));
    if(n)return n;
    for(let j=idx+1;j<Math.min(lines.length,idx+3);j++){a=rcAmounts(lines[j]);if(a.length)return a[0];}
    return null;
  };
  const strong=[],weak=[];
  lines.forEach((ln,i)=>{
    if(NOT_STRONG.test(ln))return;
    if(STRONG.test(ln)){const v=pick(i);if(v)strong.push(v);}
    else if(WEAK.test(ln)&&!EXCL.test(ln)){const v=pick(i);if(v)weak.push(v);}
  });
  if(strong.length)return {amount:Math.max.apply(null,strong),conf:'high'};
  if(weak.length)return {amount:Math.max.apply(null,weak),conf:'high'};
  // fallback: biggest plausible amount that isn't cash/change/etc - low confidence
  const BAD=/change|cash|tender|tel|phone|tin\b|vat\s*reg|acct|ref|invoice|terminal|serial|\d{1,2}:\d{2}|sub\s*-?\s*total/i;
  let best=0;lines.forEach(ln=>{if(BAD.test(ln))return;rcAmounts(ln).forEach(v=>{if(v>best)best=v;});});
  return best?{amount:best,conf:'low'}:{amount:0,conf:'none'};
}
function rcParseDate(text,now){
  now=now||new Date();
  const cands=[];let m;
  const r1=/(20\d{2})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/g;
  while((m=r1.exec(text)))cands.push([+m[1],+m[2],+m[3]]);
  const r2=/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4}|\d{2})(?!\d)/g;
  while((m=r2.exec(text))){let a=+m[1],b=+m[2],y=+m[3],mo,d;if(y<100)y+=2000;
    if(a>12){d=a;mo=b;}else if(b>12){mo=a;d=b;}else{mo=a;d=b;}   // PH receipts are usually MM/DD/YYYY
    cands.push([y,mo,d]);}
  const r3=/\b(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\.?\s+(\d{1,2}),?\s+(20\d{2})/gi;
  while((m=r3.exec(text)))cands.push([+m[3],RC_MON[m[1].toLowerCase()],+m[2]]);
  const r4=/\b(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\.?,?\s+(20\d{2})/gi;
  while((m=r4.exec(text)))cands.push([+m[3],RC_MON[m[2].toLowerCase()],+m[1]]);
  const maxT=now.getTime()+86400000,minT=now.getTime()-400*86400000;
  for(const [y,mo,d] of cands){
    if(!(mo>=1&&mo<=12&&d>=1&&d<=31))continue;
    const dt=new Date(y,mo-1,d);
    if(dt.getMonth()!==mo-1)continue;
    const t=dt.getTime();if(t>maxT||t<minT)continue;
    return y+'-'+String(mo).padStart(2,'0')+'-'+String(d).padStart(2,'0');
  }
  return '';
}
function rcParseMerchant(lines){
  const SKIP=/receipt|invoice|official|\btin\b|vat\s*reg|non[\s-]?vat|\btel\b|phone|mobile|www\.|\.com|@|branch|\b(st|street|ave|avenue|blvd|brgy|barangay|road|rd|unit|floor|flr|bldg|bldg\.)\b|permit|serial|thank|welcome|cashier|terminal|\bpos\b|\bmin\b|date|time|total|qty|amount|subtotal|\bvat\b|cash\b|change/i;
  for(let i=0;i<Math.min(lines.length,8);i++){
    const ln=lines[i];
    const letters=(ln.match(/[a-z]/gi)||[]).length;
    if(letters<3||letters/ln.length<0.6||/\d{3,}/.test(ln)||SKIP.test(ln))continue;
    let s=ln.replace(/[^A-Za-z0-9'&.\- ]+/g,' ').replace(/\s+/g,' ').trim();
    if(s.length<3)continue;
    if(s===s.toUpperCase())s=s.split(' ').map(w=>(w.length<=2||/\d/.test(w))?w:w.charAt(0)+w.slice(1).toLowerCase()).join(' ');
    return s.slice(0,40);
  }
  return '';
}
function rcParse(text,now){
  const lines=String(text||'').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const t=rcParseTotal(lines);
  const date=rcParseDate(text||'',now);
  const merchant=rcParseMerchant(lines);
  return {amount:t.amount,amountConf:t.conf,date:date,merchant:merchant};
}
/*RC-PARSE-END*/

let _rcBusy=false,_rcCancel=false,_rcWorker=null,_rcLoading=null;
function rcEl(id){return document.getElementById(id);}
function rcProgress(msg,pct){
  const s=rcEl('rc-status'),b=rcEl('rc-bar');
  if(s)s.textContent=msg;
  if(b&&pct!=null)b.style.width=Math.max(3,Math.min(100,pct))+'%';
}
function rcOpenProgress(){rcEl('receipt-progress-modal').style.display='flex';rcProgress('Preparing photo…',4);}
function rcCloseProgress(){rcEl('receipt-progress-modal').style.display='none';}
function scanReceiptStart(){
  if(_rcBusy)return;
  let seen=false;try{seen=!!localStorage.getItem('finScanInfoSeen');}catch(e){}
  if(!seen){rcEl('receipt-info-modal').style.display='flex';return;}
  rcEl('receipt-file').click();
}
function scanReceiptInfoOk(){
  try{localStorage.setItem('finScanInfoSeen','1');}catch(e){}
  rcEl('receipt-info-modal').style.display='none';
  rcEl('receipt-file').click();
}
function scanReceiptInfoClose(){rcEl('receipt-info-modal').style.display='none';}
function scanReceiptCancel(){
  _rcCancel=true;
  if(_rcWorker){try{_rcWorker.terminate();}catch(e){}_rcWorker=null;}
  rcCloseProgress();
}
function rcLoadTesseract(){
  if(window.Tesseract)return Promise.resolve();
  if(_rcLoading)return _rcLoading;
  _rcLoading=new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.onload=()=>res();
    s.onerror=()=>{_rcLoading=null;rej(new Error('reader-download'));};
    document.head.appendChild(s);
  });
  return _rcLoading;
}
/* shrink big phone photos, grayscale and stretch contrast so the reader is faster and more accurate */
async function rcPrepareImage(file){
  let bmp;
  try{bmp=await createImageBitmap(file,{imageOrientation:'from-image'});}
  catch(e){
    bmp=await new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{URL.revokeObjectURL(u);res(im);};im.onerror=()=>rej(new Error('bad-image'));im.src=u;});
  }
  const w0=bmp.width||bmp.naturalWidth,h0=bmp.height||bmp.naturalHeight;
  const longest=Math.max(w0,h0);
  const target=longest>2000?2000:(longest<1200?1400:longest);
  const k=target/longest,w=Math.round(w0*k),h=Math.round(h0*k);
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const ctx=c.getContext('2d',{willReadFrequently:true});
  ctx.drawImage(bmp,0,0,w,h);
  const img=ctx.getImageData(0,0,w,h),d=img.data,hist=new Uint32Array(256);
  for(let i=0;i<d.length;i+=4){const g=(d[i]*0.299+d[i+1]*0.587+d[i+2]*0.114)|0;d[i]=g;hist[g]++;}
  const total=w*h;let acc=0,lo=0,hi=255;
  for(let v=0;v<256;v++){acc+=hist[v];if(acc>=total*0.02){lo=v;break;}}
  acc=0;for(let v=255;v>=0;v--){acc+=hist[v];if(acc>=total*0.02){hi=v;break;}}
  const span=Math.max(40,hi-lo);
  for(let i=0;i<d.length;i+=4){let g=(d[i]-lo)*255/span;g=g<0?0:g>255?255:g;d[i]=d[i+1]=d[i+2]=g;}
  ctx.putImageData(img,0,0);
  return c;
}
async function scanReceiptFile(inp){
  const f=inp.files&&inp.files[0];inp.value='';
  if(!f)return;
  if(!/^image\//.test(f.type||'')){toast('Please choose a photo of the receipt','error');return;}
  if(_rcBusy)return;
  _rcBusy=true;_rcCancel=false;rcOpenProgress();
  try{
    const canvas=await rcPrepareImage(f);
    if(_rcCancel)return;
    rcProgress('Loading the receipt reader… (first time needs internet)',10);
    await rcLoadTesseract();
    if(_rcCancel)return;
    const worker=await Tesseract.createWorker('eng',1,{logger:m=>{
      if(_rcCancel)return;
      const p=m.progress||0;
      if(m.status==='recognizing text')rcProgress('Reading the receipt…',45+p*50);
      else if(/language/.test(m.status||''))rcProgress('Downloading reader data… (one time)',20+p*20);
      else if(/loading tesseract core/.test(m.status||''))rcProgress('Loading the receipt reader…',12+p*8);
      else rcProgress('Getting ready…',40);
    }});
    _rcWorker=worker;
    try{await worker.setParameters({tessedit_pageseg_mode:'4',preserve_interword_spaces:'1'});}catch(e){}
    const res=await worker.recognize(canvas);
    try{await worker.terminate();}catch(e){}
    _rcWorker=null;
    if(_rcCancel)return;
    rcCloseProgress();
    rcApply(rcParse(res.data.text||''),res.data.text||'');
  }catch(e){
    if(!_rcCancel){
      rcCloseProgress();
      console.warn('Receipt scan failed',e);
      toast(e&&e.message==='reader-download'?'The receipt reader needs internet the first time - please connect and try again':'Could not read this receipt. Try a clearer photo, or type it in.','error');
    }
  }finally{
    if(_rcWorker){try{_rcWorker.terminate();}catch(e){}_rcWorker=null;}
    _rcBusy=false;
  }
}
function rcHideBanner(){const b=rcEl('receipt-banner');if(b)b.style.display='none';}
function rcApply(r,rawText){
  const gc=(typeof window.finGuessCat==='function')?window.finGuessCat:(()=>'');
  const catSel=rcEl('exp-cat');
  let cat=(r.merchant&&gc(r.merchant))||gc(String(rawText||'').split(/\r?\n/).slice(0,12).join(' '))||gc(rawText||'')||'other-exp';
  if(![...catSel.options].some(o=>o.value===cat))cat='other-exp';
  rcEl('exp-desc').value=r.merchant||'Receipt';
  if(r.amount)rcEl('exp-amount').value=r.amount.toFixed(2);
  rcEl('exp-date').value=r.date||today();
  catSel.value=cat;
  if(typeof onExpCatChange==='function')onExpCatChange();
  const warn=[];
  if(r.amountConf==='none')warn.push('I couldn\'t find the total - please type the amount.');
  else if(r.amountConf==='low')warn.push('I couldn\'t find a clear “TOTAL” line, so the amount is a guess - please check it.');
  if(!r.date)warn.push('No date found, so today\'s date is used.');
  if(!r.merchant)warn.push('Couldn\'t read the store name - please type it.');
  const b=rcEl('receipt-banner');
  if(b){
    b.innerHTML='<div style="display:flex;gap:8px;align-items:flex-start"><div style="flex:1"><strong style="color:var(--text)"><svg class="ic" aria-hidden="true"><use href="#i-receipt"/></svg> Receipt scanned</strong> - check the amount, date and store below, then tap <em>Add Expense</em>. This free on-device reader can misread blurry, faded or crumpled receipts.'
      +(warn.length?'<div style="color:var(--amber);margin-top:6px">'+warn.map(esc).join('<br>')+'</div>':'')
      +'</div><button class="btn btn-ghost btn-sm" style="padding:2px 9px" onclick="rcHideBanner()" aria-label="Dismiss"><svg class="ic" aria-hidden="true"><use href="#i-x"/></svg></button></div>';
    b.style.display='block';
  }
  ['exp-desc','exp-amount','exp-date'].forEach(id=>{const e=rcEl(id);if(e){e.style.transition='box-shadow .3s';e.style.boxShadow='0 0 0 2px var(--accent)';setTimeout(()=>{e.style.boxShadow='';},2400);}});
  try{rcEl('exp-desc').scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}
  toast(r.amount?'Receipt read - please double-check the details':'Receipt read - some details need your input');
}

async function addLoan(){
  const name=document.getElementById('loan-name').value.trim();
  const amount=parseFloat(document.getElementById('loan-amount').value)||0;
  const type=document.getElementById('loan-type').value;
  const note=document.getElementById('loan-note').value.trim();
  const due=document.getElementById('loan-due').value||'';
  const walletId=type==='receivable'?document.getElementById('loan-wallet').value:'';
  if(!name){toast('Enter a name','error');return;}
  if(!amount||amount<=0){toast('Enter a valid amount','error');return;}

  const loan={id:uid(),name,amount,type,note,due,settled:false};
  let walletMsg='';
  if(walletId){
    const wallet=(state.wallets||[]).find(w=>w.id===walletId);
    if(wallet){
      if(walShort(wallet,amount)){
        const goNeg=await mtConfirm(walShortMsg(wallet),'⚠️','Continue','var(--amber)');
        if(!goNeg)return;
      }
      wallet.balance=Math.round((wallet.balance-amount)*100)/100;
      wallet.updated=today();
      loan.sourceWallet=walletId;
      walletMsg=' - '+wallet.label+' updated';
    }
  }
  state.loans.push(loan);
  document.getElementById('loan-name').value='';document.getElementById('loan-amount').value='';document.getElementById('loan-note').value='';document.getElementById('loan-due').value='';document.getElementById('loan-wallet').value='';
  save();renderAfterLoan();toast('Loan added'+walletMsg+' ✓');
  window.dispatchEvent(new CustomEvent('fin:loan-added',{detail:{loan}}));
}
function openEditLoan(id){
  const l=state.loans.find(x=>x.id===id);
  if(!l)return;
  document.getElementById('edit-loan-id').value=l.id;
  document.getElementById('edit-loan-name').value=l.name;
  document.getElementById('edit-loan-amount').value=l.amount;
  document.getElementById('edit-loan-type').value=l.type;
  document.getElementById('edit-loan-due').value=l.due||'';
  document.getElementById('edit-loan-note').value=l.note||'';
  document.getElementById('edit-loan-wallet').innerHTML='<option value=""> - Not tracked in a wallet - </option>'+walletOptionsHTML(l.sourceWallet||'');
  onEditLoanTypeChange();
  document.getElementById('edit-loan-modal').style.display='flex';
}
function onEditLoanTypeChange(){
  const type=document.getElementById('edit-loan-type').value;
  const grp=document.getElementById('edit-loan-wallet-group');
  if(grp)grp.style.display=type==='receivable'?'block':'none';
}
function closeEditLoan(){
  document.getElementById('edit-loan-modal').style.display='none';
}
async function saveEditLoan(){
  const id=parseInt(document.getElementById('edit-loan-id').value);
  const l=state.loans.find(x=>x.id===id);
  if(!l)return;
  const name=document.getElementById('edit-loan-name').value.trim();
  const amount=parseFloat(document.getElementById('edit-loan-amount').value)||0;
  const type=document.getElementById('edit-loan-type').value;
  const due=document.getElementById('edit-loan-due').value||'';
  const note=document.getElementById('edit-loan-note').value.trim();
  const newWalletId=type==='receivable'?document.getElementById('edit-loan-wallet').value:'';
  if(!name){toast('Enter a name','error');return;}
  if(!amount||amount<=0){toast('Enter a valid amount','error');return;}

  // Revert the wallet deduction this loan originally had (if any - only ever set for "they owe me" loans)
  const oldWalletId=l.sourceWallet;
  const oldAmount=l.amount;
  if(oldWalletId){
    const oldWallet=(state.wallets||[]).find(w=>w.id===oldWalletId);
    if(oldWallet){
      oldWallet.balance=Math.round((oldWallet.balance+oldAmount)*100)/100;
      oldWallet.updated=today();
    }
  }
  let walletMsg='';
  if(newWalletId){
    const newWallet=(state.wallets||[]).find(w=>w.id===newWalletId);
    if(newWallet){
      if(walShort(newWallet,amount)){
        const goNeg=await mtConfirm(walShortMsg(newWallet),'⚠️','Continue','var(--amber)');
        if(!goNeg){
          // Undo the revert we just did, since we're bailing out
          if(oldWalletId){
            const oldWallet=(state.wallets||[]).find(w=>w.id===oldWalletId);
            if(oldWallet){oldWallet.balance=Math.round((oldWallet.balance-oldAmount)*100)/100;oldWallet.updated=today();}
          }
          return;
        }
      }
      newWallet.balance=Math.round((newWallet.balance-amount)*100)/100;
      newWallet.updated=today();
      walletMsg=' - '+newWallet.label+' updated';
    }
  }
  l.name=name;l.amount=amount;l.type=type;l.due=due;l.note=note;
  if(newWalletId)l.sourceWallet=newWalletId;else delete l.sourceWallet;
  closeEditLoan();
  save();renderAfterLoan();toast('Loan updated'+walletMsg+' ✓');
}
async function confirmRemoveWallet(walletId){
  const w=(state.wallets||[]).find(x=>x.id===walletId);
  if(!w)return;
  if((state.wallets||[]).length<=1){toast('Cannot remove last wallet','error');return;}
  const ok=await mtConfirm(`Remove "${w.label}"? Balance of ${fmt(w.balance)} will be lost. Expenses logged to this wallet stay.`,'⚠️','Yes, remove it');
  if(ok)removeWallet(walletId);
}
function removeWallet(walletId){
  if((state.wallets||[]).length<=1){toast('Cannot remove last wallet','error');return;}
  const w=state.wallets.find(x=>x.id===walletId);
  if(!w)return;
  state.wallets=state.wallets.filter(x=>x.id!==walletId);
  save();renderAfterWallet();toast(w.label+' wallet removed');
}
function settle(id){
  const l=state.loans.find(x=>x.id===id);
  if(!l)return;
  if(l.settled){undoSettle(id);}
  else{openSettleLoan(id);}
}
function openSettleLoan(id){
  const l=state.loans.find(x=>x.id===id);
  if(!l)return;
  if(!(state.wallets||[]).length){toast('Add a wallet first','error');return;}
  document.getElementById('settle-loan-id').value=l.id;
  document.getElementById('settle-loan-label').textContent=(l.type==='payable'?'Paying off ':'Receiving payment from ')+l.name+' - '+fmt(l.amount);
  document.getElementById('settle-loan-wallet').innerHTML=walletOptionsHTML(state.wallets[0].id);
  document.getElementById('settle-loan-date').value=today();
  document.getElementById('settle-loan-note').value='';
  document.getElementById('settle-loan-modal').style.display='flex';
}
function closeSettleLoan(){
  document.getElementById('settle-loan-modal').style.display='none';
}
async function confirmSettleLoan(){
  const id=parseInt(document.getElementById('settle-loan-id').value);
  const l=state.loans.find(x=>x.id===id);
  if(!l){closeSettleLoan();return;}
  if(l.settled){closeSettleLoan();return;} // already settled elsewhere (e.g. two tabs) - avoid double-applying
  const walletId=document.getElementById('settle-loan-wallet').value;
  const date=document.getElementById('settle-loan-date').value||today();
  const note=document.getElementById('settle-loan-note').value.trim();
  const wallet=(state.wallets||[]).find(w=>w.id===walletId);
  if(!wallet){toast('Pick a wallet','error');return;}
  if(!l.amount||l.amount<=0){toast('This loan has no outstanding amount','error');closeSettleLoan();return;}

  if(l.type==='payable'){
    if(walShort(wallet,l.amount)){
      const goNeg=await mtConfirm(walShortMsg(wallet),'⚠️','Continue','var(--amber)');
      if(!goNeg)return;
    }
    deductWalletBalance(walletId,l.amount);
    const entry=pushExpense({desc:'Loan settled → '+l.name,amount:l.amount,cat:'loan-payment',source:walletId,date,note});
    l.settledTxn={kind:'expense',id:entry.id};
  } else {
    wallet.balance=Math.round((wallet.balance+l.amount)*100)/100;
    wallet.updated=today();
    const entryId=uid();
    const [dy,dm,dd]=date.split('-').map(Number);
    const dObj=new Date(dy,(dm||1)-1,dd||1);
    state.income.push({id:entryId,month:dObj.toLocaleString('en-US',{month:'long'}),year:dy,type:'Loan Repayment',amount:l.amount,note:('From '+l.name+(note?' · '+note:'')),wallet:walletId,dateAdded:date});
    l.settledTxn={kind:'income',id:entryId};
  }
  l.settledWallet=walletId;
  l.settledDate=date;
  l.settled=true;
  closeSettleLoan();
  save();renderAfterLoan();
  toast('Loan settled - '+wallet.label+' updated ✓');
  window.dispatchEvent(new CustomEvent('fin:loan-settled',{detail:{loan:l,wallet}}));
}
async function undoSettle(id){
  const l=state.loans.find(x=>x.id===id);
  if(!l)return;
  if(l.settledTxn){
    const ok=await mtConfirm('This will reverse the linked '+(l.settledTxn.kind==='expense'?'expense':'income')+' entry and restore the wallet balance. Continue?','↩️','Undo Settle','var(--amber)');
    if(!ok)return;
    if(l.settledTxn.kind==='expense'){
      const txn=state.expenses.find(e=>e.id===l.settledTxn.id);
      const txnAmt=txn?txn.amount:l.amount; // use the entry's live amount/wallet in case it was edited since settling
      const wallet=(state.wallets||[]).find(w=>w.id===(txn?txn.source:l.settledWallet));
      state.expenses=state.expenses.filter(e=>e.id!==l.settledTxn.id);
      if(wallet){wallet.balance=Math.round((wallet.balance+txnAmt)*100)/100;wallet.updated=today();}
    } else {
      const txn=state.income.find(e=>e.id===l.settledTxn.id);
      const txnAmt=txn?txn.amount:l.amount;
      const wallet=(state.wallets||[]).find(w=>w.id===(txn?txn.wallet:l.settledWallet));
      state.income=state.income.filter(e=>e.id!==l.settledTxn.id);
      if(wallet){wallet.balance=Math.round((wallet.balance-txnAmt)*100)/100;wallet.updated=today();}
    }
    delete l.settledTxn;delete l.settledWallet;delete l.settledDate;
    l.settled=false;
    save();renderAfterLoan();
    toast('Marked as outstanding - balance reverted');
    return;
  }
  l.settled=false;
  save();renderAfterLoan();
  toast('Marked as outstanding');
}
function adjustLoan(id,mode,amountOverride){
  const inp=document.getElementById('adj-'+id);
  const val=amountOverride!==undefined?(parseFloat(amountOverride)||0):(parseFloat(inp&&inp.value)||0);
  if(isNaN(val)||val<=0){toast('Enter a valid amount','error');return;}
  const l=state.loans.find(x=>x.id===id);
  if(!l)return;
  if(mode==='add'){
    l.amount=Math.round((l.amount+val)*100)/100;
    toast(`Added ${fmt(val)} to ${l.name}'s loan ✓`);
  } else {
    l.amount=Math.max(0,Math.round((l.amount-val)*100)/100);
    if(l.amount===0){l.settled=true;toast(`Loan to ${l.name} fully settled ✓`);window.dispatchEvent(new CustomEvent('fin:loan-settled',{detail:{loan:l}}));}
    else toast(`Deducted ${fmt(val)} from ${l.name}'s loan ✓`);
  }
  if(inp)inp.value='';
  save();renderAfterLoan();
  window.dispatchEvent(new CustomEvent('fin:loan-adjusted',{detail:{loan:l}}));
}
async function del(type,id){
  const targetLoan=type==='loans'?state.loans.find(x=>x.id===id):null;
  const willUnwind=type==='loans'&&targetLoan&&(targetLoan.settledTxn||targetLoan.sourceWallet);
  const ok=await mtConfirm(willUnwind?'This loan is linked to a wallet. Removing it will also reverse that balance change. Continue?':'Remove this entry?','🗑️','Remove','var(--red)');
  if(!ok)return;
  // If removing income, reverse the wallet balance
  if(type==='income'){
    const entry=state.income.find(x=>x.id===id);
    if(entry&&entry.wallet){
      const w=(state.wallets||[]).find(w=>w.id===entry.wallet);
      if(w){w.balance=Math.round((w.balance-entry.amount)*100)/100;w.updated=today();}
    }
  }
  // If removing expense, restore the wallet balance
  if(type==='expenses'){
    const entry=state.expenses.find(x=>x.id===id);
    if(entry&&entry.source){
      const w=(state.wallets||[]).find(w=>w.id===entry.source);
      if(w){w.balance=Math.round((w.balance+entry.amount)*100)/100;w.updated=today();}
    }
    // A loan payment also reduced the loan: put that amount back, otherwise the debt silently stays paid off.
    if(entry&&entry.loanId&&entry.loanApplied>0){
      const ln=state.loans.find(l=>l.id===entry.loanId);
      if(ln){
        ln.amount=Math.round((ln.amount+entry.loanApplied)*100)/100;
        if(ln.settled&&!ln.settledTxn&&ln.amount>0)ln.settled=false;
      }
    }
  }
  // If this entry is the linked transaction for a settled loan, unlink it so a later
  // "Undo" on that loan doesn't try to reverse a balance change that's already been undone here.
  if(type==='income'||type==='expenses'){
    const kind=type==='income'?'income':'expense';
    const linkedLoan=state.loans.find(l=>l.settledTxn&&l.settledTxn.kind===kind&&l.settledTxn.id===id);
    if(linkedLoan){delete linkedLoan.settledTxn;delete linkedLoan.settledWallet;delete linkedLoan.settledDate;}
  }
  // If removing a loan, unwind BOTH its original lend/borrow wallet effect AND any settle-flow repayment
  if(type==='loans'&&targetLoan){
    // Reverse the original wallet deduction/addition made when the loan was created (or last edited)
    if(targetLoan.sourceWallet){
      const w=(state.wallets||[]).find(w=>w.id===targetLoan.sourceWallet);
      if(w){w.balance=Math.round((w.balance+(targetLoan.type==='receivable'?targetLoan.amount:-targetLoan.amount))*100)/100;w.updated=today();}
    }
    // Reverse the settle-flow repayment, if this loan was settled that way
    if(targetLoan.settledTxn){
      if(targetLoan.settledTxn.kind==='expense'){
        const txn=state.expenses.find(e=>e.id===targetLoan.settledTxn.id);
        const txnAmt=txn?txn.amount:targetLoan.amount;
        const w=(state.wallets||[]).find(w=>w.id===(txn?txn.source:targetLoan.settledWallet));
        state.expenses=state.expenses.filter(e=>e.id!==targetLoan.settledTxn.id);
        if(w){w.balance=Math.round((w.balance+txnAmt)*100)/100;w.updated=today();}
      } else {
        const txn=state.income.find(e=>e.id===targetLoan.settledTxn.id);
        const txnAmt=txn?txn.amount:targetLoan.amount;
        const w=(state.wallets||[]).find(w=>w.id===(txn?txn.wallet:targetLoan.settledWallet));
        state.income=state.income.filter(e=>e.id!==targetLoan.settledTxn.id);
        if(w){w.balance=Math.round((w.balance-txnAmt)*100)/100;w.updated=today();}
      }
    }
  }
  state[type]=state[type].filter(x=>x.id!==id);
  save();renderAfterLoan();toast('Removed');
}

/* EXPORT */
function dlFile(content,filename,mime){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([content],{type:mime}));
  a.download=filename;a.style.display='none';
  document.body.appendChild(a);a.click();
  // revoking immediately can cancel the download on Safari/Firefox - give the browser time to start it
  setTimeout(function(){a.remove();URL.revokeObjectURL(a.href);},1500);
}
function exportCSV(type){
  let rows,filename;
  if(type==='income'){rows=[['Month','Year','Type','Amount','Note'],...state.income.map(e=>[e.month,e.year||new Date().getFullYear(),e.type,e.amount,e.note||''])];filename='income.csv';}
  else if(type==='expenses'){rows=[['Date','Description','Category','Amount','Source'],...state.expenses.map(e=>{const _w=(state.wallets||[]).find(w=>w.id===e.source);return [fmtDate(e.date),e.desc,CAT_LABELS[e.cat||'other-exp']||'Other',e.amount,_w?_w.label:e.source];})];filename='expenses.csv';}
  else{rows=[['Name','Amount','Type','Note','Due Date','Settled'],...state.loans.map(l=>[l.name,l.amount,l.type,l.note||'',l.due||'',l.settled?'Yes':'No'])];filename='loans.csv';}
  const csv=rows.map(r=>r.map(c=>{let v=String(c);if(typeof c==='string'&&/^[=+\-@\t\r]/.test(v))v="'"+v;return `"${v.replace(/"/g,'""')}"`;}).join(',')).join('\n');
  dlFile(csv,filename,'text/csv');toast('CSV downloaded ✓');
}
function backupData(){
  const backup=JSON.stringify(state,null,2);
  const d=today();
  dlFile(backup,`finuity-backup-${d}.json`,'application/json');toast('Backup saved ✓');
}
function migrateBackup(parsed){
  // Convert old balances/balanceDates format to wallets array
  if(parsed.balances && !parsed.wallets){
    const b=parsed.balances; const d=parsed.balanceDates||{};
    parsed.wallets=[
      {id:'maya',label:'Maya',balance:b.maya||0,updated:d.maya||today()},
      {id:'gcash',label:'GCash',balance:b.gcash||0,updated:d.gcash||today()},
      {id:'coh',label:'Cash on Hand',balance:b.coh||0,updated:d.coh||today()},
    ];
    delete parsed.balances; delete parsed.balanceDates;
  }
  // Add missing year to income entries
  if(Array.isArray(parsed.income)) parsed.income=parsed.income.map(i=>({year:(parseInt(String(i&&i.dateAdded||'').slice(0,4),10)||new Date().getFullYear()),...i}));
  // Fix expenses with old 'Cash' source to 'coh'
  if(Array.isArray(parsed.expenses)) parsed.expenses=parsed.expenses.map(e=>({...e,source:e.source==='Cash'?'coh':e.source}));
  return parsed;
}
async function restoreData(){
  const file=document.getElementById('restore-file').files[0];
  if(!file){toast('Pick a backup file first','error');return;}
  if(!(await confirmRestoreOverwrite()))return;
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      let parsed=JSON.parse(e.target.result);
      if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||(!parsed.income&&!parsed.wallets&&!parsed.balances)){toast('Invalid backup file','error');return;}
      parsed=migrateBackup(parsed);
      // Replace the WHOLE state (not merge): the old Object.assign kept stale loans/goals/expenses that the
      // backup didn't contain, and a backup with a low/missing nextId made new entries reuse existing ids.
      const keep={username:state.username,termsAccepted:state.termsAccepted,onboarding:state.onboarding};
      if(!parsed.username&&keep.username)parsed.username=keep.username;
      if(!parsed.termsAccepted&&keep.termsAccepted)parsed.termsAccepted=keep.termsAccepted;
      if(!parsed.onboarding&&keep.onboarding)parsed.onboarding=keep.onboarding;
      replaceState(parsed);
      await migratePlaintextSecrets();
      saveImmediate();scheduleRender();toast('Data restored ✓');
    }catch(err){toast('Could not read file','error');console.error(err);}
  };
  reader.readAsText(file);
}
// Restoring a file overwrites whatever is currently loaded - including cloud-synced
// data, since save() pushes to Firestore right after. Warn first if there's a cloud
// account attached (guest or signed-in) so a stale local file can't silently clobber it.
function confirmRestoreOverwrite(){
  if(!cloudUser)return Promise.resolve(true);
  return mtConfirm('This will replace your current data - including anything already synced to the cloud - with the contents of this backup file. This can\'t be undone. Continue?','⚠️','Restore & Overwrite','var(--red)');
}

/* FORMAL REPORT */
function buildReportHTML(){
  const sel=document.getElementById('report-month').value;
  const isAll=sel==='all';
  const isYear=sel.startsWith('year-');
  const filterYear=isYear?parseInt(sel.replace('year-','')):null;
  // For month filter, detect if it's a plain month name (filter current year only)
  const isMonthOnly=!isAll&&!isYear;
  const curYear=new Date().getFullYear();

  const totalBal=(state.wallets||[]).reduce((a,w)=>a+w.balance,0);
  const payTotal=state.loans.filter(l=>l.type==='payable'&&!l.settled).reduce((a,b)=>a+b.amount,0);
  const recTotal=state.loans.filter(l=>l.type==='receivable'&&!l.settled).reduce((a,b)=>a+b.amount,0);
  const genDate=new Date().toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'});
  const genTime=new Date().toLocaleTimeString('en-PH',{hour:'2-digit',minute:'2-digit'});

  let filteredIncome=state.income,filteredExp=state.expenses;
  if(isYear){
    filteredIncome=state.income.filter(i=>(i.year||curYear)===filterYear);
    filteredExp=state.expenses.filter(e=>{const d=ldate(e.date);return !isNaN(d)&&d.getFullYear()===filterYear;});
  }else if(isMonthOnly){
    // Month name only → filter to current year
    filteredIncome=state.income.filter(i=>i.month===sel&&(i.year||curYear)===curYear);
    filteredExp=state.expenses.filter(e=>{const d=ldate(e.date);return !isNaN(d)&&MONTH_ORDER[d.getMonth()]===sel&&d.getFullYear()===curYear;});
  }
  // KPI totals derived from the filtered period (not all-time)
  const totalInc=filteredIncome.reduce((a,b)=>a+b.amount,0);
  const totalExp=filteredExp.reduce((a,b)=>a+b.amount,0);
  const netSav=totalInc-totalExp;

  const monthYearKeys=[];const seen=new Set();
  [...filteredIncome].forEach(i=>{const k=`${i.year||curYear}-${i.month}`;if(!seen.has(k)){seen.add(k);monthYearKeys.push({year:i.year||curYear,month:i.month});}});
  filteredExp.forEach(e=>{const d=ldate(e.date);if(isNaN(d))return;const month=MONTH_ORDER[d.getMonth()];const year=d.getFullYear();const k=`${year}-${month}`;if(!seen.has(k)){seen.add(k);monthYearKeys.push({year,month});}});
  monthYearKeys.sort((a,b)=>a.year!==b.year?a.year-b.year:MONTH_ORDER.indexOf(a.month)-MONTH_ORDER.indexOf(b.month));

  const fp=n=>fmt(n);

  const monthBlocks=monthYearKeys.map(({year,month:m})=>{
    const mInc=filteredIncome.filter(i=>i.month===m&&(i.year||new Date().getFullYear())===year);
    const mExp=filteredExp.filter(e=>{const d=ldate(e.date);return !isNaN(d)&&MONTH_ORDER[d.getMonth()]===m&&d.getFullYear()===year;});
    const mTI=mInc.reduce((a,b)=>a+b.amount,0);
    const mTE=mExp.reduce((a,b)=>a+b.amount,0);
    const mNet=mTI-mTE;
    const incRows=mInc.map(e=>`<tr><td>${esc(e.type)}</td><td>${esc(e.note)||'-'}</td><td class="num pos">${fp(e.amount)}</td></tr>`).join('');
    const expRows=mExp.map(e=>`<tr><td>${esc(e.desc)}</td><td>${CAT_LABELS[e.cat||'other-exp']||'Other'}</td><td>${esc(((state.wallets||[]).find(w=>w.id===e.source)||{label:e.source}).label)} · ${fmtDate(e.date)}</td><td class="num neg">${fp(e.amount)}</td></tr>`).join('');
    return `<div class="month-block">
      <div class="month-title">${m} ${year}</div>
      <div class="sum-row">
        <div class="sbox"><div class="sbox-l">Total Income</div><div class="sbox-v pos">${fp(mTI)}</div></div>
        <div class="sbox"><div class="sbox-l">Total Expenses</div><div class="sbox-v neg">${fp(mTE)}</div></div>
        <div class="sbox hl"><div class="sbox-l">Net Income</div><div class="sbox-v ${mNet>=0?'pos':'neg'}">${fp(mNet)}</div></div>
      </div>
      ${mInc.length?`<div class="section-lbl">Income</div><table><thead><tr><th>Type</th><th>Note</th><th class="num">Amount</th></tr></thead><tbody>${incRows}</tbody></table>`:''}
      ${mExp.length?`<div class="section-lbl">Expenses</div><table><thead><tr><th>Description</th><th>Category</th><th>Source / Date</th><th class="num">Amount</th></tr></thead><tbody>${expRows}</tbody></table>`:''}
    </div>`;
  }).join('');

  const loanRows=state.loans.map(l=>`<tr><td>${esc(l.name)}</td><td>${l.type==='payable'?'Payable (I Owe)':'Receivable (Owes Me)'}</td><td>${esc(l.note)||'-'}</td><td class="num ${l.type==='payable'?'neg':'pos'}">${fp(l.amount)}</td><td><span class="status-badge ${l.settled?'settled':'pending'}">${l.settled?'Settled':'Pending'}</span></td></tr>`).join('');
  const reportLabel=isAll?'All Time':isYear?`Year ${filterYear}`:sel;

  const reportHTML=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Financial Report - ${reportLabel}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12.5px;color:#1a1a1a;background:#fff;padding:48px 56px;max-width:860px;margin:0 auto;line-height:1.5}
  /* HEADER */
  .report-header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:20px;border-bottom:2.5px solid #1a1a1a;margin-bottom:28px}
  .report-brand{font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#1a1a1a}
  .report-brand span{color:#5a8a1a}
  .report-meta{text-align:right;font-size:11px;color:#888;line-height:1.8}
  .report-meta strong{color:#1a1a1a;font-size:13px;display:block;margin-bottom:2px}
  /* SUMMARY SECTION */
  .summary-title{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#999;font-weight:700;margin-bottom:10px}
  .kpi-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:20px}
  .kpi{border:1px solid #e8e8e8;border-radius:6px;padding:12px 14px;border-top:3px solid #e8e8e8}
  .kpi.green{border-top-color:#16a34a}.kpi.red{border-top-color:#dc2626}.kpi.amber{border-top-color:#d97706}.kpi.blue{border-top-color:#2563eb}
  .kpi-l{font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#999;font-weight:600;margin-bottom:5px}
  .kpi-v{font-size:16px;font-weight:800;color:#1a1a1a}
  .kpi-v.pos{color:#16a34a}.kpi-v.neg{color:#dc2626}.kpi-v.amb{color:#d97706}.kpi-v.blu{color:#2563eb}
  /* WALLET ROW */
  .wallet-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:28px}
  .wcard{background:#f9fafb;border:1px solid #ececec;border-radius:6px;padding:12px 14px}
  .wcard-l{font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#999;font-weight:600;margin-bottom:5px}
  .wcard-v{font-size:18px;font-weight:800;color:#16a34a}
  /* DIVIDER */
  .sec-divider{height:1px;background:#f0f0f0;margin:24px 0}
  /* MONTH BLOCK */
  .month-block{margin-bottom:32px}
  .month-title{font-size:15px;font-weight:800;color:#1a1a1a;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #1a1a1a;display:flex;align-items:center;gap:8px}
  .sum-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px}
  .sbox{border:1px solid #ebebeb;border-radius:5px;padding:10px 12px}
  .sbox.hl{border-color:#1a1a1a;background:#fafafa}
  .sbox-l{font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#999;font-weight:600;margin-bottom:4px}
  .sbox-v{font-size:15px;font-weight:800}
  .section-lbl{font-size:9.5px;text-transform:uppercase;letter-spacing:.08em;color:#aaa;font-weight:700;margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid #ececec}
  table{width:100%;border-collapse:collapse;margin-bottom:6px}
  th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#aaa;padding:7px 10px;border-bottom:1px solid #e8e8e8;font-weight:700}
  td{padding:8px 10px;border-bottom:1px solid #f5f5f5;font-size:12px;vertical-align:middle}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:#fafafa}
  .num{text-align:right;font-weight:700;font-size:12.5px}
  .pos{color:#16a34a}.neg{color:#dc2626}
  /* LOANS */
  .status-badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
  .status-badge.settled{background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0}
  .status-badge.pending{background:#fef3c7;color:#92400e;border:1px solid #fde68a}
  /* FOOTER */
  .report-footer{margin-top:40px;padding-top:16px;border-top:1px solid #e8e8e8;display:flex;justify-content:space-between;font-size:10.5px;color:#bbb}
  @media print{body{padding:24px}tr{page-break-inside:avoid}.month-block{page-break-inside:avoid}}
</style>
</head>
<body>
  <div class="report-header">
    <div>
      <div class="report-brand">FIN<span>UITY</span></div>
      <div style="font-size:11px;color:#999;margin-top:3px">Personal Financial Report</div>
    </div>
    <div class="report-meta">
      <strong>${reportLabel}</strong>
      Generated on ${genDate} at ${genTime}
    </div>
  </div>

  <div class="summary-title">Financial Summary</div>
  <div class="kpi-grid">
    <div class="kpi green"><div class="kpi-l">Total Balance</div><div class="kpi-v pos">${fp(totalBal)}</div></div>
    <div class="kpi"><div class="kpi-l">Total Earned</div><div class="kpi-v">${fp(totalInc)}</div></div>
    <div class="kpi amber"><div class="kpi-l">Total Expenses</div><div class="kpi-v amb">${fp(totalExp)}</div></div>
    <div class="kpi ${netSav>=0?'green':'red'}"><div class="kpi-l">Net Income</div><div class="kpi-v ${netSav>=0?'pos':'neg'}">${fp(netSav)}</div></div>
    <div class="kpi blue"><div class="kpi-l">Owed to Me</div><div class="kpi-v blu">${fp(recTotal)}</div></div>
  </div>

  <div class="summary-title" style="margin-top:4px">Wallet Balances</div>
  <div class="wallet-row" style="grid-template-columns:repeat(${Math.min((state.wallets||[]).length,4)},1fr)">
    ${(state.wallets||[]).map(w=>`<div class="wcard"><div class="wcard-l">${esc(w.label)}</div><div class="wcard-v">${fp(w.balance)}</div></div>`).join('')}
  </div>

  <div class="sec-divider"></div>
  <div class="summary-title">Monthly Breakdown</div>
  ${monthBlocks||'<p style="color:#aaa;padding:16px 0">No data for this period.</p>'}

  <div class="sec-divider"></div>
  <div class="summary-title">Loans & Obligations</div>
  <table>
    <thead><tr><th>Person</th><th>Type</th><th>Note</th><th class="num">Amount</th><th>Status</th></tr></thead>
    <tbody>${loanRows||'<tr><td colspan="5" style="color:#aaa;text-align:center;padding:16px">No loans recorded.</td></tr>'}</tbody>
  </table>
  ${payTotal>0?`<div style="text-align:right;margin-top:6px;font-size:11px;color:#999">Total outstanding payable: <strong style="color:#dc2626">${fp(payTotal)}</strong></div>`:''}

  <div class="report-footer">
    <span>FINUITY v2.4 - Personal Finance Tracker</span>
    <span>Confidential · For personal use only</span>
  </div>

</body>
</html>`;

  return {reportHTML,reportLabel};
}
function exportMonthlyReport(){
  const {reportHTML,reportLabel}=buildReportHTML();
  const d=today();
  dlFile(reportHTML,`financial-report-${reportLabel.toLowerCase().replace(/\s+/g,'-')}-${d}.html`,'text/html');
  toast('Report downloaded ✓');
}
function printReport(){
  const {reportHTML}=buildReportHTML();
  const win=window.open('','_blank');
  if(!win){toast('Please allow pop-ups to print the report','error');return;}
  win.document.open();
  win.document.write(reportHTML);
  win.document.close();
  setTimeout(()=>{try{win.focus();win.print();}catch(e){}},350);
  toast('Opening print preview…');
}

/* ── GOALS ── */
function renderGoals(){
  const goals=state.goals||[];
  // Budget status
  const now=new Date();
  const curMonthName=MONTH_ORDER[now.getMonth()];
  const curYear=now.getFullYear();
  const curExp=state.expenses.filter(e=>{const d=ldate(e.date);return !isNaN(d)&&d.getMonth()===now.getMonth()&&d.getFullYear()===curYear;}).reduce((a,b)=>a+b.amount,0);
  const bs=document.getElementById('budget-status');
  if(bs){
    if(state.budgetLimit>0){
      const pct=clamp(Math.round((curExp/state.budgetLimit)*100),0,100);
      const cls=pct>=100?'over':pct>=75?'warn':'safe';
      const clr=pct>=100?'var(--red)':pct>=75?'var(--amber)':'var(--accent)';
      bs.innerHTML=`<div class="prog-wrap" style="margin-top:8px"><div class="prog-lbl"><span style="color:${clr};font-weight:600">${fmt(curExp)} spent of ${fmt(state.budgetLimit)}</span><span>${pct}%</span></div><div class="prog-track"><div class="prog-fill ${cls}" style="width:${pct}%"></div></div><div style="font-size:11px;color:var(--muted);margin-top:5px">${curMonthName} ${curYear} · ${state.budgetLimit-curExp>=0?fmt(state.budgetLimit-curExp)+' remaining':'Over by '+fmt(curExp-state.budgetLimit)}</div></div>`;
      const _bi=document.getElementById('budget-input');if(_bi)_bi.placeholder=state.budgetLimit>0?state.budgetLimit:'e.g. 15000';
    } else {
      bs.innerHTML='<div style="font-size:12px;color:var(--muted2);margin-top:6px">No budget set yet.</div>';
    }
  }
  // Goals list
  const gl=document.getElementById('goals-list');
  if(!gl)return;
  if(!goals.length){gl.innerHTML='<div class="card" style="grid-column:1/-1"><div class="empty"><div class="empty-icon"><svg class="ic" aria-hidden="true"><use href="#i-target"/></svg></div><div class="empty-title">No goals yet</div><div class="empty-sub">Add your first savings goal above.</div></div></div>';return;}
  gl.innerHTML=goals.map(g=>{
    const pct=g.target>0?clamp(Math.round((g.saved/g.target)*100),0,100):0;
    return `<div class="goal-card">
      <div class="goal-name">${esc(g.name)}</div>
      <div class="goal-meta">${esc(g.note)||'Savings goal'}</div>
      <div class="goal-pct">${pct}%</div>
      <div class="goal-amounts"><span class="goal-saved">${fmt(g.saved)} saved</span><span class="goal-target">of ${fmt(g.target)}</span></div>
      <div class="prog-track"><div class="prog-fill ${pct>=100?'safe':pct>=75?'warn':'b'}" style="width:${pct}%;background:${pct>=100?'var(--accent)':pct>=75?'var(--amber)':'var(--blue)'}"></div></div>
      <div style="margin-top:10px;display:flex;gap:6px">
        <input type="number" id="gs-${g.id}" placeholder="Add savings..." min="0" style="flex:1;padding:6px 9px;font-size:12px">
        <button class="btn btn-primary btn-sm" onclick="addToGoal(${g.id})">+ Add</button>
        <button type="button" class="row-more" aria-label="More actions" aria-haspopup="menu" onclick="rowMenu(event,'goal',${g.id})">${FinIcons.ic('more')}</button>
      </div>
    </div>`;
  }).join('');
}
function saveBudget(){
  const v=parseFloat(document.getElementById('budget-input').value);
  if(isNaN(v)||v<0){toast('Enter a valid amount','error');return;}
  setBudgetLimit(v);
}
// Pure direct-set path (no DOM input required) so Fin can apply a budget
// value on the person's behalf, e.g. a "carry over last month's budget" nudge.
function setBudgetLimit(v){
  if(isNaN(v)||v<0)return;
  const previous=state.budgetLimit;
  state.budgetLimit=v;save();renderAfterBudget();toast('Budget saved ✓');
  window.dispatchEvent(new CustomEvent('fin:budget-saved',{detail:{amount:v,previous}}));
}
window.setBudgetLimit=setBudgetLimit;
function addGoal(){
  const name=document.getElementById('goal-name').value.trim();
  const target=parseFloat(document.getElementById('goal-target').value)||0;
  const saved=Math.max(0,parseFloat(document.getElementById('goal-saved').value)||0);
  const note=document.getElementById('goal-note').value.trim();
  if(!name){toast('Enter a goal name','error');return;}
  if(!target||target<=0){toast('Enter a target amount','error');return;}
  if(!state.goals)state.goals=[];
  state.goals.push({id:uid(),name,target,saved,note});
  document.getElementById('goal-name').value='';document.getElementById('goal-target').value='';
  document.getElementById('goal-saved').value='';document.getElementById('goal-note').value='';
  save();renderAfterGoal();toast('Goal added ✓');
  window.dispatchEvent(new CustomEvent('fin:goal-added',{detail:{goal:state.goals[state.goals.length-1]}}));
}
function addToGoal(id,amountOverride){
  const g=state.goals.find(x=>x.id===id);
  const inp=document.getElementById('gs-'+id);
  const v=amountOverride!==undefined?(parseFloat(amountOverride)||0):(parseFloat(inp&&inp.value)||0);
  if(!g||isNaN(v)||v<=0){toast('Enter a valid amount','error');return;}
  g.saved=Math.round((g.saved+v)*100)/100;
  const reached=g.saved>=g.target;
  if(reached){toast('🎉 Goal reached! '+g.name);}
  else toast(fmt(v)+' added to '+g.name+' ✓');
  save();renderAfterGoal();
  window.dispatchEvent(new CustomEvent('fin:goal-progress',{detail:{goal:g,reached,amountAdded:v}}));
}
async function delGoal(id){
  const ok=await mtConfirm('Remove this goal?','🗑️','Remove','var(--red)');
  if(!ok)return;
  state.goals=state.goals.filter(x=>x.id!==id);
  save();renderAfterGoal();toast('Goal removed');
}
function openEditGoal(id){
  const g=(state.goals||[]).find(x=>x.id===id);
  if(!g)return;
  document.getElementById('edit-goal-id').value=g.id;
  document.getElementById('edit-goal-name').value=g.name;
  document.getElementById('edit-goal-target').value=g.target;
  document.getElementById('edit-goal-saved').value=g.saved;
  document.getElementById('edit-goal-note').value=g.note||'';
  document.getElementById('edit-goal-modal').style.display='flex';
}
function closeEditGoal(){
  document.getElementById('edit-goal-modal').style.display='none';
}
function saveEditGoal(){
  const id=parseInt(document.getElementById('edit-goal-id').value);
  const g=(state.goals||[]).find(x=>x.id===id);
  if(!g)return;
  const name=document.getElementById('edit-goal-name').value.trim();
  const target=parseFloat(document.getElementById('edit-goal-target').value)||0;
  const saved=Math.max(0,parseFloat(document.getElementById('edit-goal-saved').value)||0);
  if(!name){toast('Enter a goal name','error');return;}
  if(!target||target<=0){toast('Enter a target amount','error');return;}
  g.name=name;g.target=target;g.saved=saved;
  g.note=document.getElementById('edit-goal-note').value.trim();
  closeEditGoal();
  save();renderAfterGoal();toast('Goal updated ✓');
}

/* ══════════════════════════════════════
   AUTH & ACCOUNT SYSTEM
═══════════════════════════════════════ */

/* ── AUTH SCREEN SWITCHER ── */
function hideAllAuthScreens(){
  ['auth-login','auth-terms','auth-onboard','auth-register','auth-secsetup','auth-forgot','auth-pin','auth-pinsetup','auth-clearconfirm'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.style.display='none';
  });
}

/* ── ACCOUNT LOGIN (Google / Email+Password / Anonymous) ── */
let authMode='signin'; // 'signin' or 'register'
let pendingRegNameFromLogin='';

function showLoginScreen(){
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-login').style.display='block';
  ['login-email','login-password','signup-email','signup-password','signup-confirm'].forEach(id=>{const e=document.getElementById(id);if(e){e.value='';e.type=id.includes('password')||id==='signup-confirm'?'password':'email';}});
  pendingRegNameFromLogin='';
  authShowView('landing');
  updateInstallBanner();
}

/* ── PWA INSTALL BUTTON ── */
let deferredInstallPrompt=null;
function isStandaloneApp(){return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;}
function isIOSDevice(){return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);}
function isAndroidDevice(){return /android/i.test(navigator.userAgent);}

function getInstallModal(){
  let modal=document.getElementById('pwa-install-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='pwa-install-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-labelledby','pwa-install-title');
    modal.innerHTML=`
      <div class="pwa-install-card">
        <div class="pwa-install-head">
          <div class="pwa-install-icon"><svg class="ic" aria-hidden="true"><use href="#i-phone"/></svg></div>
          <div>
            <div id="pwa-install-title" class="card-title" style="margin:0">Install FINUITY</div>
            <div id="pwa-install-device" style="font-size:11px;color:var(--muted);margin-top:2px"></div>
          </div>
        </div>
        <div id="pwa-install-steps" style="font-size:13px;color:var(--text);line-height:1.65"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:18px" onclick="closeInstallInstructions()">Got it</button>
      </div>`;
    document.body.appendChild(modal);
  }else if(modal.parentElement!==document.body){
    document.body.appendChild(modal);
  }
  return modal;
}

function closeInstallInstructions(){
  const modal=document.getElementById('pwa-install-modal');
  if(modal){
    modal.classList.remove('pwa-install-open');
    modal.style.display='none';
    document.body.style.overflow='';
  }
}

function showInstallInstructions(){
  const modal=getInstallModal();
  const device=modal.querySelector('#pwa-install-device');
  const steps=modal.querySelector('#pwa-install-steps');
  if(!device||!steps)return;

  if(isIOSDevice()){
    device.textContent='iPhone / iPad';
    steps.innerHTML=`
      <div style="font-weight:700;margin-bottom:8px">Add FINUITY to your Home Screen</div>
      <ol style="margin:0;padding-left:20px">
        <li>Open FINUITY in <strong>Safari</strong>.</li>
        <li>Tap the <strong>Share</strong> button <strong>↗</strong>.</li>
        <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
        <li>Tap <strong>Add</strong>.</li>
      </ol>
      <div style="margin-top:12px;padding:10px 12px;border-radius:10px;background:var(--surface2);color:var(--muted);font-size:11.5px">
        <strong>Important:</strong> iPhone/iPad installation must be done through Safari. FINUITY cannot open Apple’s Add to Home Screen menu automatically.
      </div>`;
  }else if(isAndroidDevice()){
    device.textContent='Android';
    steps.innerHTML=`
      <div style="font-weight:700;margin-bottom:8px">Install FINUITY</div>
      <ol style="margin:0;padding-left:20px">
        <li>Open FINUITY in <strong>Chrome</strong>.</li>
        <li>If an install prompt appears, tap <strong>Install</strong>.</li>
        <li>If it does not appear, tap Chrome’s <strong>⋮</strong> menu.</li>
        <li>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
        <li>Confirm the installation.</li>
      </ol>
      <div style="margin-top:12px;padding:10px 12px;border-radius:10px;background:var(--surface2);color:var(--muted);font-size:11.5px">
        If FINUITY is installable, the <strong>Install FINUITY</strong> button can also open Chrome’s installation prompt directly.
      </div>`;
  }else{
    device.textContent='Computer / other browser';
    steps.innerHTML=`
      <div style="font-weight:700;margin-bottom:8px">Install FINUITY</div>
      <ol style="margin:0;padding-left:20px">
        <li>Use a supported browser such as <strong>Chrome</strong> or <strong>Edge</strong>.</li>
        <li>Use the browser's <strong>Install</strong> option.</li>
        <li>Choose <strong>Install FINUITY</strong> and confirm.</li>
      </ol>`;
  }

  modal.style.display='flex';
  modal.classList.add('pwa-install-open');
  document.body.style.overflow='hidden';
}

function updateInstallBanner(){
  const banner=document.getElementById('pwa-install-banner');
  const btn=document.getElementById('pwa-install-btn');
  const sub=document.getElementById('pwa-install-sub');
  const settingsItem=document.getElementById('settings-install-item');
  if(!banner&&!settingsItem)return;

  if(isStandaloneApp()){
    if(banner)banner.style.display='none';
    if(settingsItem)settingsItem.style.display='none';
    return;
  }

  if(banner)banner.style.display='block';
  if(settingsItem)settingsItem.style.display='flex';

  if(deferredInstallPrompt){
    if(btn){btn.style.display='block';btn.textContent='Install FINUITY';}
    if(sub)sub.textContent='Install FINUITY directly on your device - no browser menu needed.';
  }else if(isIOSDevice()){
    if(btn){btn.style.display='block';btn.textContent='How to Install';}
    if(sub)sub.textContent='Add FINUITY to your Home Screen from Safari.';
  }else if(isAndroidDevice()){
    if(btn){btn.style.display='block';btn.textContent='Install FINUITY';}
    if(sub)sub.textContent='Install directly when Android provides the install prompt.';
  }else{
    if(btn){btn.style.display='block';btn.textContent='How to Install';}
    if(sub)sub.textContent='Install FINUITY as an app from a supported browser.';
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  updateInstallBanner();
});

window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  deferredInstallPrompt=e;
  updateInstallBanner();
});

window.addEventListener('appinstalled',()=>{
  deferredInstallPrompt=null;
  updateInstallBanner();
  closeInstallInstructions();
  if(typeof toast==='function')toast('FINUITY installed ✓');
});

async function installApp(){
  if(deferredInstallPrompt){
    try{
      deferredInstallPrompt.prompt();
      const choice=await deferredInstallPrompt.userChoice;
      deferredInstallPrompt=null;
      updateInstallBanner();
      if(choice&&choice.outcome==='accepted'&&typeof toast==='function')toast('Installing FINUITY…');
    }catch(err){
      console.warn('FINUITY install prompt failed:',err);
      deferredInstallPrompt=null;
      updateInstallBanner();
      showInstallInstructions();
    }
    return;
  }
  showInstallInstructions();
}

function handleInstallClick(){
  if(isStandaloneApp())return;
  if(deferredInstallPrompt){installApp();}
  else{showInstallInstructions();}
}

function authShowView(view){
  // 'landing' | 'signin' | 'register'
  ['landing','signin','register'].forEach(v=>{
    const el=document.getElementById('auth-view-'+v);
    if(el)el.style.display=(v===view)?'flex':'none';
  });
  authMode=(view==='register')?'register':'signin';
  ['login-error','signup-error'].forEach(id=>{const e=document.getElementById(id);if(e){e.textContent='';e.style.color='';}});
}
function authSetMode(mode){authShowView(mode==='register'?'register':'signin');}
function authTogglePw(id,btn){
  const inp=document.getElementById(id);if(!inp)return;
  const show=inp.type==='password';
  inp.type=show?'text':'password';
  btn.innerHTML=show?EYE_OFF_ICON:EYE_ON_ICON;
}

function authFriendlyError(e){
  const map={
    'auth/invalid-email':'That email address looks invalid.',
    'auth/user-not-found':'No account found with that email. Try Register instead.',
    'auth/wrong-password':'Incorrect password.',
    'auth/invalid-credential':'Incorrect email or password.',
    'auth/email-already-in-use':'That email is already registered. Try Sign In instead.',
    'auth/weak-password':'Password should be at least 6 characters.',
    'auth/too-many-requests':'Too many attempts. Please wait a bit and try again.',
    'auth/network-request-failed':'Network error - check your connection.',
    'auth/popup-closed-by-user':'Sign-in was cancelled.'
  };
  return map[e.code]||(e.message||'Something went wrong. Please try again.');
}

async function authEmailSubmit(){
  const isReg=authMode==='register';
  const p=isReg?'signup':'login';
  const email=document.getElementById(p+'-email').value.trim();
  const pw=document.getElementById(p+'-password').value;
  const errEl=document.getElementById(p+'-error');
  errEl.textContent='';errEl.style.color='';
  if(!email||!pw){errEl.textContent='Please enter both email and password.';return;}
  if(pw.length<6){errEl.textContent='Password should be at least 6 characters.';return;}
  if(isReg&&pw!==document.getElementById('signup-confirm').value){errEl.textContent='Passwords do not match.';return;}
  pendingRegNameFromLogin=''; // name is collected on the next setup screen
  const btn=document.getElementById(p+'-submit-btn');
  btn.disabled=true;
  try{
    if(isReg){
      await fbAuth.createUserWithEmailAndPassword(email,pw);
    }else{
      await fbAuth.signInWithEmailAndPassword(email,pw);
    }
    // onAuthStateChanged picks up from here
  }catch(e){
    console.error(e);
    errEl.textContent=authFriendlyError(e);
  }
  btn.disabled=false;
}

async function authForgotPassword(){
  const email=document.getElementById('login-email').value.trim();
  const errEl=document.getElementById('login-error');
  if(!email){errEl.textContent='Enter your email above first, then tap "Forgot password?"';return;}
  try{
    await fbAuth.sendPasswordResetEmail(email);
    errEl.style.color='var(--accent)';
    errEl.textContent='Password reset email sent - check your inbox.';
  }catch(e){
    errEl.style.color='';
    errEl.textContent=authFriendlyError(e);
  }
}

async function authGoogleSignIn(){
  const errEl=document.getElementById('login-error');
  errEl.textContent='';
  const provider=new firebase.auth.GoogleAuthProvider();
  try{
    if(cloudUser&&cloudUser.isAnonymous){
      await cloudUser.linkWithPopup(provider);
      toast('Account linked - your guest data is now saved to Google ✓');
    }else{
      await fbAuth.signInWithPopup(provider);
    }
  }catch(e){
    console.error(e);
    if(e.code==='auth/credential-already-in-use'){
      // that Google account already has its own data - sign into it directly instead
      try{ await fbAuth.signInWithPopup(provider); }
      catch(e2){ errEl.textContent=authFriendlyError(e2); }
    }else{
      errEl.textContent=authFriendlyError(e);
    }
  }
}

async function authAnonymousSignIn(){
  const errEl=document.getElementById('login-error');
  errEl.textContent='';
  try{
    await fbAuth.signInAnonymously();
  }catch(e){
    console.error(e);
    errEl.textContent=authFriendlyError(e);
  }
}

/* ── FIRST-TIME ONBOARDING (language · currency · where did you hear about us) ── */
// Flag emoji don't render on some desktops (Windows shows "PH" letters). Detect that once and
// fall back to a tidy country-code chip so it never looks broken.
const OB_FLAG_OK=(function(){
  try{
    const c=document.createElement('canvas');c.width=c.height=32;
    const x=c.getContext('2d');x.textBaseline='top';x.font='24px sans-serif';x.fillText('\uD83C\uDDF5\uD83C\uDDED',0,0);
    const d=x.getImageData(0,0,32,32).data;
    for(let i=0;i<d.length;i+=4){if(d[i+3]>0&&(Math.abs(d[i]-d[i+1])>30||Math.abs(d[i+1]-d[i+2])>30))return true;}
    return false;
  }catch(e){return true;}
})();
function obFlagChar(cc){return String.fromCodePoint(0x1F1E6+cc.charCodeAt(0)-65,0x1F1E6+cc.charCodeAt(1)-65);}
function obFlag(cc){return OB_FLAG_OK?'<span class="ob-flag" aria-hidden="true">'+obFlagChar(cc)+'</span>':'<span class="ob-flag cc" aria-hidden="true">'+cc+'</span>';}
// shared with the Settings dropdowns (script below): emoji only, '' when flags can't render
window.finFlagText=function(cc){return(OB_FLAG_OK&&cc)?obFlagChar(cc)+' ':'';};
window.FIN_CUR_CC={PHP:'PH',USD:'US',EUR:'EU',GBP:'GB',JPY:'JP',KRW:'KR',CNY:'CN',INR:'IN',AUD:'AU',SGD:'SG',CAD:'CA',AED:'AE',SAR:'SA',HKD:'HK',MYR:'MY',THB:'TH',IDR:'ID'};
window.FIN_LANG_CC={en:'US',fil:'PH',ja:'JP',ko:'KR',es:'ES'};

const OB_LANGS=[
  {k:'en',cc:'US',n:'English',fb:'United States'},
  {k:'fil',cc:'PH',n:'Filipino',fb:'Philippines'},
  {k:'ja',cc:'JP',n:'日本語',fb:'Japan'},
  {k:'ko',cc:'KR',n:'한국어',fb:'South Korea'},
  {k:'es',cc:'ES',n:'Español',fb:'Spain'}
];
const OB_SRC=[
  {k:'friend',e:'<svg class="ic" aria-hidden="true"><use href="#i-users"/></svg>'},{k:'facebook',e:'<svg class="ic" aria-hidden="true"><use href="#i-chat"/></svg>'},{k:'tiktok',e:'<svg class="ic" aria-hidden="true"><use href="#i-music"/></svg>'},{k:'instagram',e:'<svg class="ic" aria-hidden="true"><use href="#i-camera"/></svg>'},
  {k:'youtube',e:'<svg class="ic" aria-hidden="true"><use href="#i-play"/></svg>'},{k:'google',e:'<svg class="ic" aria-hidden="true"><use href="#i-search"/></svg>'},{k:'church',e:'<svg class="ic" aria-hidden="true"><use href="#i-church"/></svg>'},{k:'other',e:'<svg class="ic" aria-hidden="true"><use href="#i-sparkle"/></svg>'}
];
const OB_T={
  en:{step:'Step {n} of 3',t1:'Choose your language',s1:'You can change this anytime in Settings.',t2:'Pick your currency',s2:'Only the symbol changes. Amounts are never converted.',t3:'Where did you hear about us?',s3:'Just curious. It helps us reach more people like you.',cont:'Continue',back:'Back',skip:'Skip for now',sug:'Suggested',oph:'Tell us where…',
    src:{friend:'Friend or family',facebook:'Facebook',tiktok:'TikTok',instagram:'Instagram',youtube:'YouTube',google:'Google search',church:'Church / community',other:'Somewhere else'}},
  fil:{step:'Hakbang {n} sa 3',t1:'Piliin ang iyong wika',s1:'Mababago mo ito anumang oras sa Settings.',t2:'Piliin ang iyong pera',s2:'Simbolo lang ang magbabago. Hindi kino-convert ang mga halaga.',t3:'Saan mo kami nalaman?',s3:'Gusto lang naming malaman para mas marami pa kaming matulungan.',cont:'Magpatuloy',back:'Bumalik',skip:'Laktawan muna',sug:'Mungkahi',oph:'Sabihin kung saan…',
    src:{friend:'Kaibigan o pamilya',facebook:'Facebook',tiktok:'TikTok',instagram:'Instagram',youtube:'YouTube',google:'Google search',church:'Simbahan / komunidad',other:'Iba pa'}},
  ja:{step:'ステップ {n} / 3',t1:'言語を選択',s1:'設定からいつでも変更できます。',t2:'通貨を選択',s2:'記号のみ変わります。金額は換算されません。',t3:'FINUITYをどこで知りましたか？',s3:'より多くの方に届けるための参考にします。',cont:'続ける',back:'戻る',skip:'今はスキップ',sug:'おすすめ',oph:'どこで知りましたか…',
    src:{friend:'友人・家族',facebook:'Facebook',tiktok:'TikTok',instagram:'Instagram',youtube:'YouTube',google:'Google検索',church:'教会・コミュニティ',other:'その他'}},
  ko:{step:'{n}/3 단계',t1:'언어를 선택하세요',s1:'설정에서 언제든 바꿀 수 있어요.',t2:'통화를 선택하세요',s2:'기호만 바뀝니다. 금액은 환산되지 않아요.',t3:'FINUITY를 어떻게 알게 되셨나요?',s3:'더 많은 분들께 다가가는 데 도움이 돼요.',cont:'계속',back:'뒤로',skip:'나중에 하기',sug:'추천',oph:'어디에서 알게 되셨나요…',
    src:{friend:'친구 또는 가족',facebook:'Facebook',tiktok:'TikTok',instagram:'Instagram',youtube:'YouTube',google:'구글 검색',church:'교회 / 커뮤니티',other:'기타'}},
  es:{step:'Paso {n} de 3',t1:'Elige tu idioma',s1:'Puedes cambiarlo cuando quieras en Ajustes.',t2:'Elige tu moneda',s2:'Solo cambia el símbolo. Los montos no se convierten.',t3:'¿Dónde te enteraste de nosotros?',s3:'Solo por curiosidad. Nos ayuda a llegar a más personas.',cont:'Continuar',back:'Atrás',skip:'Omitir por ahora',sug:'Sugerido',oph:'Cuéntanos dónde…',
    src:{friend:'Amigo o familia',facebook:'Facebook',tiktok:'TikTok',instagram:'Instagram',youtube:'YouTube',google:'Búsqueda en Google',church:'Iglesia / comunidad',other:'Otro lugar'}}
};
const OB_TICK='<span class="ob-tick" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3.5 8.3L6.3 11.2L12.5 4.5"/></svg></span>';
const OB_ICONS=['globe','swap','megaphone'];
let OB={step:0,lang:'en',cur:'PHP',src:'',det:{}};

function obT(){return OB_T[OB.lang]||OB_T.en;}
function obEl(id){return document.getElementById(id);}
function obDN(type,code,fb){try{const n=new Intl.DisplayNames([OB.lang],{type:type}).of(code);if(n&&n!==code)return n;}catch(e){}return fb||code;}

// Best guess from the device so most people can just tap Continue.
function obDetect(){
  const nl=String((navigator.languages&&navigator.languages[0])||navigator.language||'en').toLowerCase();
  let lang='en',langFound=false;
  if(/^(fil|tl)/.test(nl)){lang='fil';langFound=true;}
  else if(nl.startsWith('ja')){lang='ja';langFound=true;}
  else if(nl.startsWith('ko')){lang='ko';langFound=true;}
  else if(nl.startsWith('es')){lang='es';langFound=true;}
  else if(nl.startsWith('en')){langFound=true;}
  let tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
  const TZ={'Asia/Manila':'PHP','Asia/Tokyo':'JPY','Asia/Seoul':'KRW','Asia/Shanghai':'CNY','Asia/Kolkata':'INR','Asia/Calcutta':'INR','Asia/Singapore':'SGD','Asia/Dubai':'AED','Asia/Riyadh':'SAR','Asia/Hong_Kong':'HKD','Asia/Kuala_Lumpur':'MYR','Asia/Bangkok':'THB','Asia/Jakarta':'IDR','Australia/Sydney':'AUD','Australia/Melbourne':'AUD','Australia/Perth':'AUD','Australia/Brisbane':'AUD','Europe/London':'GBP','America/Toronto':'CAD','America/Vancouver':'CAD','America/New_York':'USD','America/Chicago':'USD','America/Denver':'USD','America/Los_Angeles':'USD'};
  let cur=TZ[tz],curFound=!!cur;
  if(!cur&&/^Europe\//.test(tz)){cur='EUR';curFound=true;}
  if(!cur)cur='PHP';
  return{lang:lang,langFound:langFound,cur:cur,curFound:curFound};
}

function showOnboarding(){
  const ov=obEl('auth-overlay'),box=obEl('auth-onboard');
  // already on screen (e.g. auth state re-fired): don't wipe what they picked
  if(box&&box.style.display==='block'&&ov&&ov.style.display==='flex')return;
  const det=obDetect();
  let saved='';try{saved=localStorage.getItem('finLang')||'';}catch(e){}
  OB={step:0,lang:OB_T[saved]?saved:det.lang,cur:det.cur,src:'',det:det};
  ov.style.display='flex';
  hideAllAuthScreens();
  box.style.display='block';
  if(window.FinX&&FinX.setLang)FinX.setLang(OB.lang);
  obRender();
}

function obRender(){
  const body=obEl('ob-body'),t=obT();let h='';
  if(OB.step===0){
    h='<div class="ob-list" role="radiogroup">'+OB_LANGS.map(function(l){
      const sug=OB.det.langFound&&OB.det.lang===l.k;
      return '<button type="button" role="radio" aria-checked="'+(OB.lang===l.k)+'" class="ob-opt'+(OB.lang===l.k?' sel':'')+'" data-k="'+l.k+'" lang="'+l.k+'" onclick="obPickLang(\''+l.k+'\')">'
        +obFlag(l.cc)
        +'<span class="ob-main"><span class="ob-name">'+l.n+(sug?'<span class="ob-tag" data-sug></span>':'')+'</span><span class="ob-meta" data-region="'+l.cc+'" data-fb="'+l.fb+'"></span></span>'
        +OB_TICK+'</button>';
    }).join('')+'</div>';
  }else if(OB.step===1){
    const curs=(window.FinX&&FinX.curs)?Object.keys(FinX.curs()):['PHP','USD'];
    const order=curs.slice().sort(function(a,b){
      const w=function(k){return k===OB.det.cur&&OB.det.curFound?0:k==='PHP'?1:k==='USD'?2:3;};
      return w(a)-w(b);
    });
    h='<div class="ob-grid" role="radiogroup">'+order.map(function(k){
      const c=FinX.curs()[k],cc=window.FIN_CUR_CC[k]||'';
      const sug=OB.det.curFound&&OB.det.cur===k;
      return '<button type="button" role="radio" aria-checked="'+(OB.cur===k)+'" class="ob-opt'+(OB.cur===k?' sel':'')+'" data-k="'+k+'" onclick="obPickCur(\''+k+'\')">'
        +(cc?obFlag(cc):'')+OB_TICK
        +'<span class="ob-main"><span class="ob-name">'+(c[0].trim()!==k?c[0].trim()+' · ':'')+k+(sug?'<span class="ob-tag" data-sug></span>':'')+'</span><span class="ob-meta">'+obDN('currency',k,c[3])+'</span></span></button>';
    }).join('')+'</div>';
  }else{
    h='<div class="ob-grid" role="radiogroup">'+OB_SRC.map(function(s){
      return '<button type="button" role="radio" aria-checked="'+(OB.src===s.k)+'" class="ob-opt'+(OB.src===s.k?' sel':'')+'" data-k="'+s.k+'" onclick="obPickSrc(\''+s.k+'\')">'
        +'<span class="ob-emo" aria-hidden="true">'+s.e+'</span>'+OB_TICK
        +'<span class="ob-main"><span class="ob-name">'+t.src[s.k]+'</span></span></button>';
    }).join('')+'</div>'
    +'<input type="text" id="ob-other" class="ob-other" maxlength="60" style="display:none" autocomplete="off" onkeydown="if(event.key===\'Enter\')obNext()">';
  }
  body.innerHTML=h;
  const _ov=obEl('auth-overlay');if(_ov)_ov.scrollTop=0;
  body.classList.remove('ob-anim');void body.offsetWidth;body.classList.add('ob-anim');
  obChrome();
}

// Texts that depend on the chosen language / step (kept separate so picking never rebuilds the list)
function obChrome(){
  const t=obT();
  obEl('ob-step').textContent=t.step.replace('{n}',OB.step+1);
  obEl('ob-ico').innerHTML=FinIcons.ic(OB_ICONS[OB.step]);
  obEl('ob-title').textContent=t['t'+(OB.step+1)];
  obEl('ob-sub').textContent=t['s'+(OB.step+1)];
  obEl('ob-back').textContent='←  '+t.back;
  obEl('ob-back').style.display=OB.step>0?'':'none';
  const nx=obEl('ob-next');nx.textContent=t.cont+'  →';nx.disabled=(OB.step===2&&!OB.src);
  const sk=obEl('ob-skip');sk.textContent=t.skip;sk.style.display=OB.step===2?'':'none';
  obEl('ob-prog').querySelectorAll('.ob-seg').forEach(function(s,i){s.classList.toggle('on',i<=OB.step);});
  document.querySelectorAll('#ob-body [data-sug]').forEach(function(e){e.textContent=t.sug;});
  document.querySelectorAll('#ob-body [data-region]').forEach(function(e){e.textContent=obDN('region',e.getAttribute('data-region'),e.getAttribute('data-fb'));});
  const o=obEl('ob-other');if(o)o.placeholder=t.oph;
}
function obMarkSel(k){
  document.querySelectorAll('#ob-body .ob-opt').forEach(function(b){
    const on=b.getAttribute('data-k')===k;
    b.classList.toggle('sel',on);b.setAttribute('aria-checked',on);
  });
}
function obPickLang(k){
  OB.lang=k;obMarkSel(k);
  if(window.FinX&&FinX.setLang)FinX.setLang(k);   // the whole app switches language right away
  obChrome();
}
function obPickCur(k){OB.cur=k;obMarkSel(k);}
function obPickSrc(k){
  OB.src=(OB.src===k)?'':k;            // tap again to un-pick
  obMarkSel(OB.src);
  const o=obEl('ob-other');
  if(o){const show=OB.src==='other';o.style.display=show?'block':'none';if(show)setTimeout(function(){o.scrollIntoView({block:'center',behavior:'smooth'});o.focus({preventScroll:true});},80);}
  obChrome();
}
function obNext(){if(OB.step<2){OB.step++;obRender();}else obFinish(false);}
function obBack(){if(OB.step>0){OB.step--;obRender();}}
function obFinish(skip){
  const o=obEl('ob-other'),other=(!skip&&OB.src==='other'&&o)?o.value.trim().slice(0,60):'';
  state.onboarding={done:true,lang:OB.lang,cur:OB.cur,heardFrom:skip?'':OB.src,heardOther:other,at:new Date().toISOString()};
  if(window.FinX){if(FinX.setLang)FinX.setLang(OB.lang);if(FinX.setCur)FinX.setCur(OB.cur,true);}
  save();
  showRegisterScreen();
}
function showOnboardingOrRegister(){
  if(state.onboarding&&state.onboarding.done)showRegisterScreen();else showOnboarding();
}

/* ── REGISTRATION (new user) ── */
let regPinBuf='', regPinFirst='', regPinPhase='set'; // 'set' or 'confirm'

function showRegisterScreen(){
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-register').style.display='block';
  regPinBuf=''; regPinPhase='set';
  const nmInput=document.getElementById('reg-username');
  if(nmInput && !nmInput.value){
    if(pendingRegNameFromLogin){
      nmInput.value=pendingRegNameFromLogin;
    }else if(cloudUser && cloudUser.displayName){
      nmInput.value=cloudUser.displayName.split(' ')[0];
    }
  }
  updateRegDots();
}

function regPinKey(k){
  if(regPinPhase==='set'){
    if(regPinBuf.length>=4)return;
    regPinBuf+=k; updateRegDots();
    if(regPinBuf.length===4){
      // validate name first (optional for guest/anonymous accounts)
      const nmInput=document.getElementById('reg-username');
      let nm=nmInput.value.trim();
      const isGuest=cloudUser && cloudUser.isAnonymous;
      if(!nm && isGuest){ nm='Guest'; nmInput.value='Guest'; }
      if(!nm){
        document.getElementById('reg-pin-error').textContent='Please enter your name first.';
        nmInput.style.borderColor='var(--red)';
        regPinBuf=''; updateRegDots(); return;
      }
      regPinFirst=regPinBuf; regPinBuf=''; regPinPhase='confirm';
      document.getElementById('reg-pin-pad').style.display='none';
      document.getElementById('reg-confirm-wrap').style.display='block';
      document.getElementById('reg-confirm-pad').style.display='grid';
      document.getElementById('reg-pin-error').textContent='';
      updateRegConfirmDots();
    }
  }
}
function regPinBackspace(){
  if(regPinPhase!=='set')return;
  regPinBuf=regPinBuf.slice(0,-1); updateRegDots();
}
function updateRegDots(){
  for(let i=0;i<4;i++){const d=document.getElementById('rpd'+i);if(d)d.className='pin-dot'+(i<regPinBuf.length?' filled':'');}
}

let regConfirmBuf='';
function regConfirmKey(k){
  if(regConfirmBuf.length>=4)return;
  regConfirmBuf+=k; updateRegConfirmDots();
  if(regConfirmBuf.length===4){
    setTimeout(()=>{
      if(regConfirmBuf===regPinFirst){
        // PIN confirmed - hold username/pin, move to security question setup before finishing
        pendingRegUsername=document.getElementById('reg-username').value.trim();
        pendingRegPin=regPinFirst;
        regPinBuf=''; regConfirmBuf=''; regPinFirst=''; regPinPhase='set';
        if(cloudUser && cloudUser.isAnonymous){
          showSecSetupScreen();
        }else{
          finalizeRegistration('','');
        }
      } else {
        // shake and reset confirm
        shakeDotsEl('reg-confirm-dots');
        document.getElementById('reg-confirm-error').textContent="PINs don't match. Start over.";
        regConfirmBuf=''; regPinBuf=''; regPinFirst=''; regPinPhase='set';
        updateRegConfirmDots();
        setTimeout(()=>{
          document.getElementById('reg-confirm-wrap').style.display='none';
          document.getElementById('reg-confirm-pad').style.display='none';
          document.getElementById('reg-pin-pad').style.display='grid';
          document.getElementById('reg-pin-error').textContent='';
          document.getElementById('reg-confirm-error').textContent='';
        },600);
      }
    },120);
  }
}
function regConfirmBackspace(){
  regConfirmBuf=regConfirmBuf.slice(0,-1); updateRegConfirmDots();
}
function updateRegConfirmDots(){
  for(let i=0;i<4;i++){const d=document.getElementById('rpd2-'+i);if(d)d.className='pin-dot'+(i<regConfirmBuf.length?' filled':'');}
}

/* ── SECURITY QUESTION SETUP (registration step 2) ── */
let pendingRegUsername='', pendingRegPin='';

function showSecSetupScreen(){
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-secsetup').style.display='block';
  document.getElementById('secsetup-question').value='What was the name of your first pet?';
  document.getElementById('secsetup-custom-wrap').style.display='none';
  document.getElementById('secsetup-custom-q').value='';
  document.getElementById('secsetup-answer').value='';
  document.getElementById('secsetup-error').textContent='';
}

async function finalizeRegistration(question,answer){
  state.username=pendingRegUsername;
  const pinSalt=randomSalt();
  state.pinHash=await hashSecret(pendingRegPin,pinSalt);
  state.pinSalt=pinSalt;
  state.pin='';
  state.securityQuestion=question||'';
  if(answer){
    const aSalt=randomSalt();
    state.securityAnswerHash=await hashSecret(answer,aSalt);
    state.securityAnswerSalt=aSalt;
  } else {
    state.securityAnswerHash='';
    state.securityAnswerSalt='';
  }
  state.securityAnswer='';
  save();
  document.getElementById('auth-overlay').style.display='none';
  pendingRegUsername=''; pendingRegPin=''; pendingRegNameFromLogin='';
  updateSidebarUsername();
  if(!localStorage.getItem('mtTutDone')){showTutorial();}else{showSplash();}
  toast('Welcome, '+state.username+'! 🎉');
}

function finishRegistrationWithSecurity(){
  const sel=document.getElementById('secsetup-question').value;
  const question=sel==='__custom__'?document.getElementById('secsetup-custom-q').value.trim():sel;
  const answer=document.getElementById('secsetup-answer').value.trim();
  if(sel==='__custom__'&&!question){
    document.getElementById('secsetup-error').textContent='Please write your custom question.';
    return;
  }
  if(!answer){
    document.getElementById('secsetup-error').textContent='Please enter an answer so you can recover your PIN later.';
    return;
  }
  finalizeRegistration(question,answer.toLowerCase());
}

async function skipSecuritySetup(){
  const ok=await mtConfirm('Without a recovery question, you will NOT be able to recover your PIN if you forget it - your only option would be Clear All Data, which erases everything. Skip anyway?','⚠️','Skip Anyway','var(--amber)');
  if(!ok)return;
  finalizeRegistration('','');
}

/* ── PIN CHECK (returning user unlock) ── */
/* Brute-force throttle for the 4-digit PIN: 5 wrong tries, then a growing lock-out (30s, 1m, 2m, ... max ~32m). */
const PIN_MAX_TRIES=5;
function pinLockRemaining(){
  try{const o=JSON.parse(localStorage.getItem('finPinLock')||'null');if(o&&o.until>Date.now())return Math.ceil((o.until-Date.now())/1000);}catch(e){}
  return 0;
}
function pinRegisterFail(){
  let o={};
  try{o=JSON.parse(localStorage.getItem('finPinLock')||'{}')||{};}catch(e){o={};}
  o.fails=(o.fails||0)+1;
  if(o.fails>=PIN_MAX_TRIES)o.until=Date.now()+30000*Math.pow(2,Math.min(6,o.fails-PIN_MAX_TRIES));
  try{localStorage.setItem('finPinLock',JSON.stringify(o));}catch(e){}
  return pinLockRemaining();
}
function pinClearFails(){try{localStorage.removeItem('finPinLock');}catch(e){}}
function pinLockMsg(sec){return 'Too many wrong attempts. Try again in '+(sec>=60?Math.ceil(sec/60)+' min':sec+'s')+'.';}
let pinBuffer='';
function showPinScreen(){
  pinBuffer='';
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-pin').style.display='block';
  document.getElementById('pin-welcome-name').textContent=state.username?'Hi, '+state.username:'';
  document.getElementById('pin-error').textContent='';
  updatePinDots();
  updatePinBioButton();
  if(bioEnrolled()&&!pinRecoveryActive)setTimeout(()=>tryBiometricUnlock(true),400);   // silent auto-attempt
}
function pinKey(k){
  if(pinBuffer.length>=4)return;
  const _lock=pinLockRemaining();
  if(_lock>0){document.getElementById('pin-error').textContent=pinLockMsg(_lock);return;}
  pinBuffer+=k; updatePinDots();
  if(pinBuffer.length===4){
    setTimeout(async ()=>{
      const attempt=pinBuffer;
      const inputHash=state.pinSalt?await hashSecret(attempt,state.pinSalt):'';
      if(state.pinHash && inputHash===state.pinHash){
        pinClearFails();
        document.getElementById('auth-overlay').style.display='none';
        pinBuffer='';
        sessionStorage.setItem('mtUnlocked','1');
        showSplash();
      } else {
        shakeDotsEl('pin-dots');
        const _l=pinRegisterFail();
        document.getElementById('pin-error').textContent=_l>0?pinLockMsg(_l):'Incorrect PIN. Try again.';
        pinBuffer=''; updatePinDots();
      }
    },120);
  }
}
function pinBackspace(){pinBuffer=pinBuffer.slice(0,-1); updatePinDots();}
function updatePinDots(){for(let i=0;i<4;i++){const d=document.getElementById('pd'+i);if(d)d.className='pin-dot'+(i<pinBuffer.length?' filled':'');}}

/* ── BIOMETRIC UNLOCK (WebAuthn: Face ID / Touch ID / Android fingerprint) ──
   The phone's OS does the face/fingerprint check; the app never sees any biometric data.
   Only an on-device credential reference is kept in this browser's localStorage (per device,
   never synced to the cloud). It is a convenience lock like the PIN, and the PIN always works. */
const BIO_KEY='finBioCred';
let _bioBusy=false;
function bioGet(){try{return JSON.parse(localStorage.getItem(BIO_KEY)||'null');}catch(e){return null;}}
function bioClear(){try{localStorage.removeItem(BIO_KEY);}catch(e){}}
function bioToB64(buf){let s='';new Uint8Array(buf).forEach(b=>s+=String.fromCharCode(b));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function bioFromB64(str){str=str.replace(/-/g,'+').replace(/_/g,'/');while(str.length%4)str+='=';const bin=atob(str),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a;}
async function bioSupported(){
  try{return !!(window.PublicKeyCredential&&window.isSecureContext&&navigator.credentials&&await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable());}
  catch(e){return false;}
}
function bioEnrolled(){return !!bioGet()&&!!state.pinHash;}
function updatePinBioButton(){
  const b=document.getElementById('pin-bio-btn');
  if(b)b.style.display=bioEnrolled()?'':'none';
}
async function updateBioSettingsUI(){
  const blk=document.getElementById('bio-block');if(!blk)return;
  const ok=await bioSupported();
  blk.style.display=ok?'':'none';
  if(!ok)return;
  const st=document.getElementById('bio-status-text'),btn=document.getElementById('bio-toggle-btn');
  if(bioGet()){
    st.innerHTML='<span style="color:var(--accent);font-weight:600">✓ Biometric unlock is on</span> for this device. Your PIN still works as a backup.';
    btn.textContent='Turn Off';btn.className='btn btn-ghost btn-sm';
  }else{
    st.textContent=state.pinHash?'Open the app with your face or fingerprint instead of typing your PIN. Your PIN always still works as a backup.':'Set a PIN first - biometrics are an add-on to your PIN.';
    btn.textContent='Enable';btn.className='btn btn-primary btn-sm';
  }
}
async function toggleBiometric(){
  if(bioGet()){
    const ok=await mtConfirm('Turn off biometric unlock on this device? You will use your PIN instead.','👆','Turn Off','var(--amber)');
    if(!ok)return;
    bioClear();toast('Biometric unlock turned off');updateBioSettingsUI();return;
  }
  await enableBiometric();
}
async function enableBiometric(){
  if(!state.pinHash){toast('Set a PIN first - it stays as your backup','error');return;}
  if(!(await bioSupported())){toast("This device or browser doesn't support biometric unlock",'error');return;}
  try{
    const cred=await navigator.credentials.create({publicKey:{
      challenge:crypto.getRandomValues(new Uint8Array(32)),
      rp:{name:'FINUITY'},
      user:{id:crypto.getRandomValues(new Uint8Array(16)),name:'finuity-device',displayName:state.username||'FINUITY'},
      pubKeyCredParams:[{type:'public-key',alg:-7},{type:'public-key',alg:-257}],
      authenticatorSelection:{authenticatorAttachment:'platform',userVerification:'required',residentKey:'discouraged'},
      attestation:'none',timeout:60000
    }});
    if(!cred)throw new Error('no credential');
    localStorage.setItem(BIO_KEY,JSON.stringify({id:bioToB64(cred.rawId),at:Date.now()}));
    toast('Biometric unlock enabled ✓');
  }catch(e){
    if(e&&e.name==='NotAllowedError')toast('Cancelled - biometric unlock not enabled');
    else{console.warn('Biometric setup failed',e);toast('Could not set up biometrics on this device','error');}
  }
  updateBioSettingsUI();
}
async function tryBiometricUnlock(auto){
  const c=bioGet();
  if(!c||!state.pinHash||_bioBusy)return;
  const pinBox=document.getElementById('auth-pin');
  if(!pinBox||pinBox.style.display!=='block')return;      // only while the PIN screen is up
  _bioBusy=true;
  const errEl=document.getElementById('pin-error');
  try{
    const a=await navigator.credentials.get({publicKey:{
      challenge:crypto.getRandomValues(new Uint8Array(32)),
      allowCredentials:[{type:'public-key',id:bioFromB64(c.id),transports:['internal']}],
      userVerification:'required',timeout:60000
    }});
    if(a&&pinBox.style.display==='block'){
      document.getElementById('auth-overlay').style.display='none';
      pinBuffer='';
      sessionStorage.setItem('mtUnlocked','1');
      showSplash();
    }
  }catch(e){
    if(!auto&&errEl)errEl.textContent=(e&&e.name==='NotAllowedError')?'Biometric cancelled - enter your PIN.':'Biometric unavailable - use your PIN.';
  }
  _bioBusy=false;
}

/* ── FORGOT PIN (recovery) ── */
function showForgotPin(){
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-forgot').style.display='block';
  const isAnon=!cloudUser||cloudUser.isAnonymous;
  const hasQ=!!state.securityQuestion&&!!state.securityAnswerHash;
  document.getElementById('forgot-reauth-view').style.display=isAnon?'none':'block';
  document.getElementById('forgot-has-q-view').style.display=(!isAnon)?'none':(hasQ?'block':'none');
  document.getElementById('forgot-no-q-view').style.display=(!isAnon)?'none':(hasQ?'none':'block');
  if(hasQ){
    document.getElementById('forgot-question-text').textContent=state.securityQuestion;
    document.getElementById('forgot-answer-input').value='';
    document.getElementById('forgot-error').textContent='';
  } else {
    document.getElementById('forgot-noq-error').textContent='';
  }
}

let forcePinResetAfterAuth=false;
function authForgotPinReauth(){
  forcePinResetAfterAuth=true;
  sessionStorage.removeItem('mtUnlocked');
  stateLoadedForUid=null;
  document.getElementById('auth-overlay').style.display='none';
  fbAuth.signOut();
}

async function verifySecurityAnswer(){
  const input=document.getElementById('forgot-answer-input').value.trim().toLowerCase();
  const errEl=document.getElementById('forgot-error');
  if(!input){errEl.textContent='Please type your answer.';return;}
  const inputHash=state.securityAnswerSalt?await hashSecret(input,state.securityAnswerSalt):'';
  if(state.securityAnswerHash && inputHash===state.securityAnswerHash){
    pinRecoveryActive=true;
    showPinSetup();
  } else {
    errEl.textContent="That doesn't match our records. Try again.";
    document.getElementById('forgot-answer-input').value='';
  }
}

function clearAndResetAccount(){
  const errEl=document.getElementById('forgot-noq-error');
  if(errEl)errEl.textContent='';
  mtConfirm('This account has no recovery question, so there\'s no way to verify your PIN. This will permanently delete ALL your data (income, expenses, loans, goals, wallet balances) and reset the account so you can start fresh. This cannot be undone.','⚠️','Yes, Clear Everything','var(--red)').then(ok=>{
    if(!ok)return;
    state.income=[];state.expenses=[];state.loans=[];state.goals=[];state.budgetLimit=0;
    state.wallets.forEach(w=>{w.balance=0;w.updated=today();});
    state.username='';state.pin='';state.pinHash='';state.pinSalt='';bioClear();
    state.securityQuestion='';state.securityAnswer='';state.securityAnswerHash='';state.securityAnswerSalt='';
    save();
    sessionStorage.removeItem('mtUnlocked');
    toast('Account reset. Please set up your profile again.');
    showRegisterScreen();
  });
}

/* ── PIN SETUP (change PIN from settings, or after recovery) ── */
let setupPinBuf='', setupPinFirst='', setupPinPhase='set1';
let pinRecoveryActive=false;
function showPinSetup(){
  setupPinBuf=''; setupPinFirst=''; setupPinPhase='set1';
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-pinsetup').style.display='block';
  document.getElementById('pinsetup-sub').textContent=pinRecoveryActive?'Create a new 4-digit PIN':(state.pinHash?'Enter a new 4-digit PIN':'Set a 4-digit PIN to protect your app');
  document.getElementById('pinsetup-error').textContent='';
  updateSetupDots();
}
function setupPinKey(k){
  if(setupPinBuf.length>=4)return;
  setupPinBuf+=k; updateSetupDots();
  if(setupPinBuf.length===4){
    setTimeout(async ()=>{
      if(setupPinPhase==='set1'){
        setupPinFirst=setupPinBuf; setupPinBuf=''; setupPinPhase='set2';
        document.getElementById('pinsetup-sub').textContent='Confirm your new PIN';
        document.getElementById('pinsetup-error').textContent='';
        updateSetupDots();
      } else {
        if(setupPinBuf===setupPinFirst){
          const salt=randomSalt();
          state.pinHash=await hashSecret(setupPinBuf,salt);
          state.pinSalt=salt;
          state.pin='';
          pinClearFails();
          save();
          if(pinRecoveryActive){
            pinRecoveryActive=false;
            document.getElementById('auth-overlay').style.display='none';
            sessionStorage.setItem('mtUnlocked','1');
            toast('PIN reset - welcome back! ✓');
            showSplash();
          } else {
            renderAfterSettings();
            document.getElementById('auth-overlay').style.display='none';
            toast('PIN updated ✓');
          }
        } else {
          shakeDotsEl('pinsetup-dots');
          document.getElementById('pinsetup-error').textContent="PINs don't match. Try again.";
          setupPinBuf=''; setupPinPhase='set1'; setupPinFirst='';
          document.getElementById('pinsetup-sub').textContent=pinRecoveryActive?'Create a new 4-digit PIN':(state.pinHash?'Enter a new 4-digit PIN':'Set a 4-digit PIN');
          updateSetupDots();
        }
      }
    },120);
  }
}
function setupPinBackspace(){setupPinBuf=setupPinBuf.slice(0,-1); updateSetupDots();}
function updateSetupDots(){for(let i=0;i<4;i++){const d=document.getElementById('spd'+i);if(d)d.className='pin-dot'+(i<setupPinBuf.length?' filled':'');}}
function cancelPinSetup(){
  const wasRecovery=pinRecoveryActive;
  pinRecoveryActive=false; setupPinBuf=''; setupPinPhase='set1'; setupPinFirst='';
  if(wasRecovery){
    // Cancelling out of a PIN reset (recovery flow) must NOT grant access - 
    // send the user back to the locked PIN screen instead of hiding the overlay.
    showPinScreen();
    return;
  }
  document.getElementById('auth-overlay').style.display='none';
}

/* ── CLEAR ALL DATA PIN CONFIRM ── */
let clearPinBuf='';
function showClearConfirm(){
  if(!state.pinHash){
    // no pin set, use double confirm
    mtConfirm('This will permanently delete ALL your data. This cannot be undone.','⚠️','Yes, Delete Everything','var(--red)').then(ok=>{if(ok)doActualClear();});
    return;
  }
  clearPinBuf='';
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-clearconfirm').style.display='block';
  document.getElementById('clear-pin-error').textContent='';
  updateClearDots();
}
function clearPinKey(k){
  if(clearPinBuf.length>=4)return;
  const _lock=pinLockRemaining();
  if(_lock>0){document.getElementById('clear-pin-error').textContent=pinLockMsg(_lock);return;}
  clearPinBuf+=k; updateClearDots();
  if(clearPinBuf.length===4){
    setTimeout(async ()=>{
      const attempt=clearPinBuf;
      const inputHash=state.pinSalt?await hashSecret(attempt,state.pinSalt):'';
      if(state.pinHash && inputHash===state.pinHash){
        pinClearFails();
        document.getElementById('auth-overlay').style.display='none';
        clearPinBuf='';
        doActualClear();
      } else {
        shakeDotsEl('clear-dots');
        const _l=pinRegisterFail();
        document.getElementById('clear-pin-error').textContent=_l>0?pinLockMsg(_l):'Incorrect PIN.';
        clearPinBuf=''; updateClearDots();
      }
    },120);
  }
}
function clearPinBackspace(){clearPinBuf=clearPinBuf.slice(0,-1); updateClearDots();}
function updateClearDots(){for(let i=0;i<4;i++){const d=document.getElementById('cpd'+i);if(d)d.className='pin-dot'+(i<clearPinBuf.length?' filled':'');}}
function cancelClearConfirm(){document.getElementById('auth-overlay').style.display='none'; clearPinBuf='';}
function doActualClear(){
  state.income=[];state.expenses=[];state.loans=[];state.goals=[];state.budgetLimit=0;
  // Reset all wallet balances to 0
  state.wallets.forEach(w=>{w.balance=0;w.updated=today();});
  save();scheduleRender();toast('All data cleared');
}

/* ── SHAKE HELPER ── */
function shakeDotsEl(id){
  const el=document.getElementById(id);
  if(!el)return;
  el.style.animation='shake .3s ease';
  setTimeout(()=>el.style.animation='',400);
}
function shakeDots(){shakeDotsEl('pin-dots');}

function updateSidebarUsername(){
  const nm=state.username||'';
  const el=document.getElementById('sidebar-username');
  if(el)el.textContent=nm||'-';
  const sel=document.getElementById('settings-username');
  if(sel)sel.textContent=nm||'-';
  const pn=document.getElementById('set-panel-name');if(pn)pn.textContent=nm||'-';
  renderAvatar();
}
/* ── Profile picture ── */
function renderAvatar(){
  const nm=(state.username||'').trim(),img=state.avatar||'';
  const txt=document.getElementById('set-avatar-txt');
  const av=document.getElementById('set-avatar');
  if(av){
    const old=av.querySelector('img');if(old)old.remove();
    if(img){
      const i=document.createElement('img');i.src=img;i.alt='Profile picture';
      av.insertBefore(i,av.firstChild);
      if(txt)txt.style.display='none';
      av.style.background='transparent';
    }else{
      if(txt){txt.style.display='';txt.textContent=(nm.charAt(0)||'?').toUpperCase();}
      av.style.background='';
    }
  }
  const sb=document.getElementById('sidebar-avatar');
  if(sb){
    if(img){sb.innerHTML='';const i=document.createElement('img');i.src=img;i.alt='';sb.appendChild(i);}
    else sb.innerHTML=FinIcons.ic('user');
  }
  const nb=document.getElementById('bnav-avatar');
  if(nb){
    if(img){nb.src=img;nb.hidden=false;}else{nb.removeAttribute('src');nb.hidden=true;}
    nb.parentElement.classList.toggle('has-av',!!img);
  }
  const rb=document.getElementById('avatar-remove-btn');if(rb)rb.style.display=img?'':'none';
}
function pickAvatar(){const f=document.getElementById('avatar-file');if(f){f.value='';f.click();}}
function handleAvatarFile(input){
  const file=input.files&&input.files[0];
  if(!file)return;
  if(!/^image\//.test(file.type)){toast('Please choose an image file','error');return;}
  const reader=new FileReader();
  reader.onerror=()=>toast('Could not read that image','error');
  reader.onload=()=>{
    const img=new Image();
    img.onerror=()=>toast('Could not open that image','error');
    img.onload=()=>{
      try{
        // centre-crop to a square and shrink to 256px so it stays small for backup + cloud sync
        const N=256,side=Math.min(img.width,img.height);
        const sx=(img.width-side)/2,sy=(img.height-side)/2;
        const c=document.createElement('canvas');c.width=N;c.height=N;
        const ctx=c.getContext('2d');
        ctx.fillStyle='#fff';ctx.fillRect(0,0,N,N);
        ctx.drawImage(img,sx,sy,side,side,0,0,N,N);
        state.avatar=c.toDataURL('image/jpeg',0.85);
        save();renderAvatar();toast('Profile picture updated ✓');
      }catch(e){toast('Could not process that image','error');}
    };
    img.src=reader.result;
  };
  reader.readAsDataURL(file);
}
async function removeAvatar(){
  const ok=await mtConfirm('Remove your profile picture?','🖼️','Remove','var(--amber)');
  if(!ok)return;
  state.avatar='';save();renderAvatar();toast('Profile picture removed');
}

/* ── SETTINGS ── */
function renderSettings(){
  try{updateBioSettingsUI();}catch(e){}
  // PIN status
  const pinStatusEl=document.getElementById('pin-status-text');
  const pinRemoveBtn=document.getElementById('pin-remove-btn');
  const pinSetBtn=document.getElementById('pin-set-btn');
  if(pinStatusEl){
    if(state.pinHash){
      pinStatusEl.innerHTML='<span style="color:var(--accent);font-weight:600">✓ PIN is active.</span> Your app is locked on open.';
      if(pinRemoveBtn)pinRemoveBtn.style.display='';
      if(pinSetBtn)pinSetBtn.textContent='Change PIN';
    } else {
      pinStatusEl.textContent='No PIN set. Tap below to protect your app with a 4-digit PIN.';
      if(pinRemoveBtn)pinRemoveBtn.style.display='none';
      if(pinSetBtn)pinSetBtn.textContent='Set PIN';
    }
  }
  // Recovery question status
  const secqStatusEl=document.getElementById('secq-status-text');
  const secqSetBtn=document.getElementById('secq-set-btn');
  if(secqStatusEl){
    if(state.securityQuestion&&state.securityAnswerHash){
      secqStatusEl.innerHTML='<span style="color:var(--accent);font-weight:600">✓ Recovery question set.</span> You can reset your PIN if you forget it.';
      if(secqSetBtn)secqSetBtn.textContent='Update Recovery Question';
    } else {
      secqStatusEl.textContent='Not set - if you forget your PIN, you won\'t be able to recover this account.';
      if(secqSetBtn)secqSetBtn.textContent='Set Recovery Question';
    }
  }
  // Data & Privacy notice - depends on account type
  const pnBox=document.getElementById('privacy-notice-box');
  const pnIcon=document.getElementById('privacy-notice-icon');
  const pnTitle=document.getElementById('privacy-notice-title');
  const pnBody=document.getElementById('privacy-notice-body');
  if(pnBox){
    const signedIn=cloudUser && !cloudUser.isAnonymous;
    if(signedIn){
      pnBox.style.background='var(--accent-bg)';
      pnBox.style.border='1px solid rgba(var(--accent-rgb),.35)';
      pnIcon.innerHTML=FinIcons.ic('cloud');
      pnTitle.style.color='var(--accent)';
      pnTitle.textContent='Your data is backed up to the cloud';
      pnBody.innerHTML='Everything is synced to your account (<strong>'+esc(cloudUser.email||'signed-in account')+'</strong>) and will still be there if you clear this browser, switch devices, or reinstall. A manual backup is still good practice in case you ever need to move data outside the app.';
    } else {
      pnBox.style.background='var(--red-bg)';
      pnBox.style.border='1px solid rgba(240,72,72,.35)';
      pnIcon.innerHTML=FinIcons.ic('alert');
      pnTitle.style.color='var(--red)';
      pnTitle.textContent='Everything is stored only on this device';
      pnBody.innerHTML='You\'re using a <strong>guest account</strong> - nothing is synced to the cloud. If you clear your browser\'s site data or cache, uninstall the app, or switch devices/browsers, <strong>all your data will be lost - permanently.</strong> Download a backup regularly, or link your account to Google (button on the Settings screen) so this stops being a risk.';
    }
  }
  // Account
  updateSidebarUsername();
  updateSettingsHome();
  updateInstallBanner();
  // Sync settings theme toggle
  const isLight=document.body.classList.contains('light');
  const stEl=document.getElementById('theme-toggle-settings');
  const lbl=document.getElementById('theme-label');
  if(stEl)stEl.classList.toggle('on',isLight);
  if(lbl)lbl.textContent=isLight?'Light':'Dark';
  renderAccentSwatches();
  // Recurring list
  const rl=document.getElementById('recurring-list');
  if(rl){
    const recurrings=[...new Map(state.expenses.filter(e=>e.recurring).map(e=>[e.desc,e])).values()];
    const now2=new Date();
    const curMo2=now2.getMonth(),curYr2=now2.getFullYear();
    const loggedThisMo=new Set(state.expenses.filter(e=>{const d=ldate(e.date);return e.recurring&&!isNaN(d)&&d.getMonth()===curMo2&&d.getFullYear()===curYr2;}).map(e=>e.desc));
    rl.innerHTML=recurrings.length
      ?recurrings.map(e=>{
        const done=loggedThisMo.has(e.desc);
        return `<div class="row" style="align-items:center">
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:500;display:flex;align-items:center;gap:6px">${esc(e.desc)}<span class="badge badge-recurring" style="font-size:9px">↺</span></div>
            <div style="font-size:11px;color:var(--muted)">${fmt(e.amount)} · ${CAT_LABELS[e.cat||'other-exp']}</div>
          </div>
          ${done
            ?'<span style="font-size:11px;color:var(--accent);font-weight:600">✓ Logged</span>'
            :`<button class="btn btn-primary btn-sm" onclick="logRecurring(${e.id})">Log Now</button>`}
        </div>`;
      }).join('')
      :'<div style="font-size:13px;color:var(--muted2);padding:8px 0">No recurring expenses yet. Mark an expense as recurring when logging it.</div>';
  }
}
function changeName(){
  const nm=document.getElementById('settings-newname').value.trim();
  if(!nm){toast('Enter a new name','error');return;}
  state.username=nm; save(); renderAfterSettings(); toast('Name updated ✓');
  document.getElementById('settings-newname').value='';
}
async function removePin(){
  const ok=await mtConfirm('Remove PIN lock? Your app will no longer be protected.','🔓','Remove PIN','var(--amber)');
  if(!ok)return;
  state.pin='';state.pinHash='';state.pinSalt='';bioClear();save();renderAfterSettings();toast('PIN removed');
}
function showSettingsSecUpdate(){
  document.getElementById('secq-update-modal').style.display='flex';
  const sel=document.getElementById('secq-modal-question');
  const presets=[...sel.options].map(o=>o.value);
  if(state.securityQuestion && presets.includes(state.securityQuestion)){
    sel.value=state.securityQuestion;
    document.getElementById('secq-modal-custom-wrap').style.display='none';
  } else if(state.securityQuestion){
    sel.value='__custom__';
    document.getElementById('secq-modal-custom-wrap').style.display='block';
    document.getElementById('secq-modal-custom-q').value=state.securityQuestion;
  } else {
    sel.value=presets[0];
    document.getElementById('secq-modal-custom-wrap').style.display='none';
    document.getElementById('secq-modal-custom-q').value='';
  }
  document.getElementById('secq-modal-answer').value='';
  document.getElementById('secq-modal-error').textContent='';
}
async function saveSettingsSecQuestion(){
  const sel=document.getElementById('secq-modal-question').value;
  const question=sel==='__custom__'?document.getElementById('secq-modal-custom-q').value.trim():sel;
  const answer=document.getElementById('secq-modal-answer').value.trim();
  if(sel==='__custom__'&&!question){
    document.getElementById('secq-modal-error').textContent='Please write your custom question.';
    return;
  }
  if(!answer){
    document.getElementById('secq-modal-error').textContent='Please enter an answer.';
    return;
  }
  const salt=randomSalt();
  state.securityAnswerHash=await hashSecret(answer.toLowerCase(),salt);
  state.securityAnswerSalt=salt;
  state.securityQuestion=question;
  state.securityAnswer='';
  save();
  document.getElementById('secq-update-modal').style.display='none';
  renderAfterSettings();
  toast('Recovery question saved ✓');
}
async function restoreFromSettings(input){
  const file=input.files[0];if(!file)return;
  if(!(await confirmRestoreOverwrite())){input.value='';return;}
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      let parsed=JSON.parse(e.target.result);
      if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||(!parsed.income&&!parsed.wallets&&!parsed.balances)){toast('Invalid backup file','error');return;}
      parsed=migrateBackup(parsed);
      // Replace the WHOLE state (not merge): the old Object.assign kept stale loans/goals/expenses that the
      // backup didn't contain, and a backup with a low/missing nextId made new entries reuse existing ids.
      const keep={username:state.username,termsAccepted:state.termsAccepted,onboarding:state.onboarding};
      if(!parsed.username&&keep.username)parsed.username=keep.username;
      if(!parsed.termsAccepted&&keep.termsAccepted)parsed.termsAccepted=keep.termsAccepted;
      if(!parsed.onboarding&&keep.onboarding)parsed.onboarding=keep.onboarding;
      replaceState(parsed);
      await migratePlaintextSecrets();
      save();scheduleRender();updateSidebarUsername();toast('Data restored ✓');
    }catch(err){toast('Could not read file','error');console.error(err);}
  };
  reader.readAsText(file);
  input.value='';
}



/* ── SAFE TO SPEND TODAY ── */
function safeToSpendHTML(curExp){
  const now=new Date(),t=today();
  const dim=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const daysLeft=dim-now.getDate()+1; // counts today
  const spentToday=state.expenses.filter(e=>e.date===t).reduce((a,b)=>a+b.amount,0);
  const beforeToday=curExp-spentToday;
  const allowance=Math.max(0,(state.budgetLimit-beforeToday)/daysLeft);
  const left=allowance-spentToday;
  const over=left<0;
  const clr=over?'var(--red)':left<allowance*0.25?'var(--amber)':'var(--accent)';
  const big=state.hideBalances?((window.FinX?FinX.sym():'₱')+' ••••••'):fmt(Math.abs(left));
  return `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;margin-bottom:12px;background:var(--surface2);border:1px solid var(--border2);border-radius:var(--r-sm)">
    <div><div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600">${over?'Over today\'s limit by':'Safe to spend today'}</div>
    <div style="font-family:var(--font-d);font-size:22px;font-weight:700;color:${clr}">${big}</div></div>
    <div style="text-align:right;font-size:11px;color:var(--muted);line-height:1.5">${state.hideBalances?'':fmt(allowance)+' / day<br>'}${daysLeft} day${daysLeft===1?'':'s'} left</div>
  </div>`;
}

/* ── UTANG REMINDER (Taglish, copy in one tap) ── */
function utangMessage(l){
  const name=(l.name||'').split(' ')[0]||'kaibigan';
  const amt=fmt(l.amount);
  const ref=l.note?` (${l.note})`:'';
  if(l.due){
    const diff=Math.round((ldate(l.due).setHours(0,0,0,0)-new Date().setHours(0,0,0,0))/86400000);
    if(diff<-14)return `Hi ${name}, follow-up ko lang ulit yung ${amt}${ref} - ${-diff} araw na lampas sa due date. Kailangan ko na rin kasi siya. Pakibayaran na po as soon as possible, or sabihin mo kung kailan exactly mo maibabalik. Salamat sa pag-intindi! 🙏`;
    if(diff<0)return `Hi ${name}, kumusta? Lampas na ng ${-diff} araw ang due date ng ${amt}${ref} (${fmtDate(l.due)}). Pwede na ba natin ayusin ngayong linggo? Pakisabi lang kung kailan mo maibabalik. Salamat!`;
    if(diff===0)return `Hi ${name}! Paalala lang, due na ngayong araw ang ${amt}${ref}. Pwede mo na ba i-send? Salamat! 🙏`;
    if(diff<=7)return `Hi ${name}! Friendly reminder lang, due na sa ${fmtDate(l.due)} (${diff} araw na lang) ang ${amt}${ref}. Paki-ready na po ha. Thank you!`;
  }
  return `Hi ${name}! Friendly reminder lang po sa ${amt}${ref}. Pag may time ka, paki-send na lang ha. Thank you! 🙏`;
}
function copyText(txt){
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(txt);
  return new Promise((res,rej)=>{const ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')?res():rej();}catch(e){rej(e);}ta.remove();});
}
function copyReminder(id){
  const l=state.loans.find(x=>x.id===id);if(!l)return;
  copyText(utangMessage(l)).then(()=>toast('Reminder copied - paste it in Messenger/SMS')).catch(()=>toast('Could not copy','error'));
}

/* ── INCOME / LOAN SEARCH + FILTERS ── */
let incQ='',incType='',loanQ='',loanFilter='';
function setIncFilter(){incQ=(document.getElementById('inc-search')||{}).value||'';incType=(document.getElementById('inc-filter-type')||{}).value||'';renderIncome();}
function setLoanFilter(){loanQ=(document.getElementById('loan-search')||{}).value||'';loanFilter=(document.getElementById('loan-filter')||{}).value||'';renderLoans();}

/* ── ACCENT COLOR ── */
const ACCENT_PRESETS=[
  {name:'Lime',hex:null,c:'#a8e038'},
  {name:'Sky',hex:'#38b6f8'},
  {name:'Violet',hex:'#a78bfa'},
  {name:'Pink',hex:'#f472b6'},
  {name:'Orange',hex:'#fb923c'},
  {name:'Teal',hex:'#2dd4bf'},
  {name:'Red',hex:'#f87171'}
];
function _hex2hsl(h){
  const n=parseInt(h.slice(1),16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;
  let hh=0,ss=0;
  if(d){ss=d/(1-Math.abs(2*l-1));
    hh=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60;if(hh<0)hh+=360;}
  return [hh,ss,l];
}
function _hsl2rgb(h,s,l){
  const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;
  const [r,g,b]=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];
  return [r+m,g+m,b+m].map(v=>Math.round(v*255));
}
function _rgb2hex(a){return '#'+a.map(v=>v.toString(16).padStart(2,'0')).join('');}
function applyAccent(hex){
  const st=document.body.style;
  ['--accent','--accent-dim','--accent-hover','--accent-rgb','--accent-glow','--accent-bg','--on-accent'].forEach(k=>st.removeProperty(k));
  const meta=document.querySelector('meta[name="theme-color"]');
  if(!hex){ if(meta)meta.setAttribute('content',document.body.classList.contains('light')?'#f0f0ed':'#060608'); return; }
  const light=document.body.classList.contains('light');
  let [h,s,l]=_hex2hsl(hex);
  s=Math.max(s,.45);
  l=light?Math.min(l,.36):Math.min(Math.max(l,.58),.74);
  const main=_hsl2rgb(h,s,l),dim=_hsl2rgb(h,s,Math.max(l-.08,.15)),hov=_hsl2rgb(h,s,Math.min(l+.07,.85));
  const lum=(0.2126*main[0]+0.7152*main[1]+0.0722*main[2])/255;
  st.setProperty('--accent',_rgb2hex(main));
  st.setProperty('--accent-dim',_rgb2hex(dim));
  st.setProperty('--accent-hover',_rgb2hex(hov));
  st.setProperty('--accent-rgb',main.join(','));
  st.setProperty('--accent-glow','rgba('+main.join(',')+','+(light?.10:.12)+')');
  st.setProperty('--accent-bg','rgba('+main.join(',')+',.07)');
  st.setProperty('--on-accent',lum>.45?'#050605':'#ffffff');
}
function setAccent(hex){
  try{ if(hex)localStorage.setItem('mtAccent',hex); else localStorage.removeItem('mtAccent'); }catch(e){}
  applyAccent(hex);
  renderAccentSwatches();
}
/* Live update while the native color picker is open. It must NOT rebuild the swatches:
   replacing the <input type="color"> closes its popup, which made the picker "vanish" after one click.
   renderAccentSwatches() runs on `change` (picker closed) to tidy up the final state. */
function previewCustomAccent(inp){
  const hex=inp.value;
  try{ localStorage.setItem('mtAccent',hex); }catch(e){}
  applyAccent(hex);
  const lab=inp.closest('.swatch-custom');
  if(lab){ lab.style.setProperty('--sw-c',hex); lab.style.background=hex; lab.classList.add('sel'); }
  document.querySelectorAll('#accent-swatches .swatch:not(.swatch-custom)').forEach(b=>b.classList.remove('sel'));
  const lbl=document.getElementById('accent-label'); if(lbl)lbl.textContent='Custom';
}
function renderAccentSwatches(){
  const box=document.getElementById('accent-swatches');
  if(!box)return;
  let cur=null;try{cur=localStorage.getItem('mtAccent');}catch(e){}
  const isPreset=ACCENT_PRESETS.some(p=>p.hex===cur);
  box.innerHTML=ACCENT_PRESETS.map(p=>
    '<button type="button" class="swatch'+(p.hex===cur?' sel':'')+'" style="--sw-c:'+(p.hex||p.c)+'" title="'+p.name+'" aria-label="'+p.name+'" onclick="setAccent('+(p.hex?"'"+p.hex+"'":'null')+')"></button>'
  ).join('')+
  '<label class="swatch swatch-custom'+(cur&&!isPreset?' sel':'')+'" title="Pick any color"'+(cur&&!isPreset?' style="--sw-c:'+cur+';background:'+cur+'"':'')+'><input type="color" value="'+(cur||'#a8e038')+'" oninput="previewCustomAccent(this)" onchange="renderAccentSwatches()" aria-label="Pick a custom accent color"></label>';
  const lbl=document.getElementById('accent-label');
  if(lbl){const p=ACCENT_PRESETS.find(p=>p.hex===cur);lbl.textContent=!cur?'Lime':p?p.name:'Custom';}
}

/* ── THEME ── */
function toggleTheme(){
  document.body.classList.toggle('light');
  const on=document.body.classList.contains('light');
  const _tt=document.getElementById('theme-toggle');if(_tt)_tt.classList.toggle('on',on);
  const st=document.getElementById('theme-toggle-settings');
  if(st)st.classList.toggle('on',on);
  const lbl=document.getElementById('theme-label');
  if(lbl)lbl.textContent=on?'Light':'Dark';
  localStorage.setItem('mtTheme',on?'light':'dark');
  let _a=null;try{_a=localStorage.getItem('mtAccent');}catch(e){}
  applyAccent(_a);
}
function initTheme(){
  const t=localStorage.getItem('mtTheme');
  if(t!=='dark'){document.body.classList.add('light');['theme-toggle','theme-toggle-settings'].forEach(function(i){var e=document.getElementById(i);if(e)e.classList.add('on')});const _l=document.getElementById('theme-label');if(_l)_l.textContent='Light';}
  let a=null;try{a=localStorage.getItem('mtAccent');}catch(e){}
  applyAccent(a);
}

/* ── WORD FOR TODAY / MONEY TIP (alternates each time the splash opens) ── */
let verseTimer,verseProgTimer,verseProgVal=0,splashMode='verse',splashTip=null;
const VERSE_INTERVAL=30000;
function initSplash(){
  // Alternate: one visit shows a verse, the next shows a money tip.
  let last='';try{last=localStorage.getItem('finSplashMode')||'';}catch(e){}
  const mode=(last==='verse'&&window.FinLearn)?'tip':'verse';
  try{localStorage.setItem('finSplashMode',mode);}catch(e){}
  setSplashMode(mode,true);
  document.getElementById('splash-date').textContent=new Date().toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function setSplashMode(m,instant){
  if(m==='tip'&&!window.FinLearn)m='verse';
  splashMode=m;
  const tv=document.getElementById('st-verse'),tt=document.getElementById('st-tip'),b=document.getElementById('verse-next-btn');
  if(tv){tv.classList.toggle('on',m==='verse');tv.setAttribute('aria-selected',m==='verse');}
  if(tt){tt.classList.toggle('on',m==='tip');tt.setAttribute('aria-selected',m==='tip');}
  if(b)b.textContent=m==='tip'?'↻ Another tip':'↻ Another verse';
  showSplashCard(instant);startVerseTimer();
}
function showSplashCard(instant){
  if(splashMode==='tip'&&window.FinLearn){splashTip=FinLearn.tipOfDay();showVerse({tip:1,text:splashTip.text,ref:splashTip.ref},instant);}
  else{splashTip=null;showVerse(pickVerse('finSeenSplashVerses',0.7),instant);}
}
function showVerse(v,instant){
  const vEl=document.getElementById('splash-verse'),rEl=document.getElementById('splash-ref'),lb=document.getElementById('splash-learn');
  if(!vEl||!rEl||!v)return;
  const set=()=>{
    if(v.tip){vEl.textContent=v.text;vEl.dataset.kind='tip';rEl.dataset.kind='tip';rEl.textContent=v.ref;}
    else{vEl.textContent='\u201C'+v.text+'\u201D';vEl.dataset.kind='verse';rEl.dataset.kind='verse';rEl.textContent=v.ref;}
    if(lb)lb.style.display=v.tip?'':'none';
    vEl.style.opacity='1';rEl.style.opacity='1';
  };
  if(instant)set();else{vEl.style.transition=rEl.style.transition='opacity .4s';vEl.style.opacity='0';rEl.style.opacity='0';setTimeout(set,350)}
  verseProgVal=0;const p=document.getElementById('verse-prog');if(p)p.style.width='0%';
}
function nextVerse(){showSplashCard(false);startVerseTimer();}
function splashLearnMore(){if(window.FinLearn)FinLearn.open(splashTip&&splashTip.lesson);}
function closeSplashNow(){const el=document.getElementById('welcome-splash');if(el&&el.style.display!=='none')closeSplash();}
function startVerseTimer(){
  clearTimeout(verseTimer);clearInterval(verseProgTimer);verseProgVal=0;
  // Cache element reference once — avoids a DOM query every 100ms
  var _vp=document.getElementById('verse-prog');
  if(_vp) _vp.style.width='0%';
  verseProgTimer=setInterval(()=>{verseProgVal+=100/(VERSE_INTERVAL/100);if(_vp)_vp.style.width=Math.min(verseProgVal,100)+'%'},100);
  verseTimer=setTimeout(nextVerse,VERSE_INTERVAL);
}

/* ── SWIPE TO DELETE (mobile) ── */
let swipeStart=null,swipeEl=null,swipeY=0;
document.addEventListener('touchstart',e=>{
  const entry=e.target.closest('.entry');
  if(!entry||e.target.closest('input,select,textarea,button'))return;
  swipeEl=entry;swipeStart=e.touches[0].clientX;swipeY=e.touches[0].clientY;
},{passive:true});
document.addEventListener('touchmove',e=>{
  if(!swipeEl||swipeStart===null)return;
  const dx=e.touches[0].clientX-swipeStart;
  const dy=e.touches[0].clientY-swipeY;
  if(Math.abs(dy)>Math.abs(dx))return; // vertical scroll, not a swipe
  if(dx<-10&&dx>-120){swipeEl.style.transform=`translateX(${dx}px)`;swipeEl.style.transition='none';}
},{passive:true});
document.addEventListener('touchend',e=>{
  if(!swipeEl||swipeStart===null)return;
  const dx=e.changedTouches[0].clientX-swipeStart;
  const dyEnd=e.changedTouches[0].clientY-swipeY;
  swipeEl.style.transition='transform .25s ease';
  if(dx<-80&&Math.abs(dx)>Math.abs(dyEnd)){
    // find delete button and click it
    const delBtn=swipeEl.querySelector('.btn-danger');
    swipeEl.style.transform='translateX(0)';
    if(delBtn){setTimeout(()=>delBtn.click(),50);}
  } else {swipeEl.style.transform='translateX(0)';}
  swipeEl=null;swipeStart=null;
},{passive:true});


/* ── TUTORIAL ── */
const TUTORIAL_SLIDES=[
  {
    icon:'💵',
    title:'Welcome to <span style="color:var(--accent)">FINUITY</span>',
    desc:'Your personal finance tracker - track income, expenses, wallets, loans, and savings goals all in one place.',
    tip:null
  },
  {
    icon:'👛',
    title:'Your <span style="color:var(--accent)">Wallets</span>',
    desc:'FINUITY tracks your balances across wallets like GCash, Maya, and Cash on Hand. Update them anytime from the <b>Balances</b> page.',
    tip:'💡 You can add or remove wallets in the Balances section.'
  },
  {
    icon:'💰',
    title:'Log Your <span style="color:var(--accent)">Income</span>',
    desc:'Head to <b>Income</b> to record your salary, bonuses, or any other earnings by month. This powers your dashboard charts.',
    tip:'💡 Add income for each month to see your financial trends.'
  },
  {
    icon:'🧾',
    title:'Track <span style="color:var(--accent)">Expenses</span>',
    desc:'Every time you spend, log it under <b>Expenses</b>. Choose a category, pick the wallet it came from, and your balance updates automatically.',
    tip:'💡 Mark recurring expenses (like subscriptions) so you get monthly reminders.'
  },
  {
    icon:'🤝',
    title:'Manage <span style="color:var(--accent)">Loans</span>',
    desc:'Track money you owe or are owed in <b>Loans</b>. Mark them settled when paid - and even link a loan payment to an expense.',
    tip:null
  },
  {
    icon:'🎯',
    title:'Set <span style="color:var(--accent)">Goals</span>',
    desc:'Create savings goals and track your progress. Set a monthly budget too \u2014 you\'ll get a visual indicator when you\'re getting close to the limit.',
    tip:'💡 Set a monthly budget in the Goals page to stay on track.'
  },
  {
    icon:'📤',
    title:'<span style="color:var(--accent)">Export</span> Your Data',
    desc:'Download CSV reports or a full HTML financial report anytime from the <b>Export</b> page. Back up your data regularly.',
    tip:'💡 Use the Backup feature in Settings so you never lose your data.'
  },
  {
    icon:'🚀',
    title:"You're all set!",
    desc:'Start by updating your wallet balances, then log your first income entry. Your dashboard will come alive as you add data.',
    tip:null,
    last:true
  }
];
let tutIdx=0;

function showTutorial(){
  tutIdx=0;
  document.getElementById('tutorial-overlay').style.display='flex';
  renderTutSlide();
}
function skipTutorial(){
  document.getElementById('tutorial-overlay').style.display='none';
  localStorage.setItem('mtTutDone','1');
  showSplash();
}
function tutNext(){
  if(tutIdx>=TUTORIAL_SLIDES.length-1){skipTutorial();return;}
  tutIdx++;
  renderTutSlide();
}
function tutDotJump(i){tutIdx=i;renderTutSlide();}
function renderTutSlide(){
  const s=TUTORIAL_SLIDES[tutIdx];
  const pct=((tutIdx+1)/TUTORIAL_SLIDES.length)*100;
  document.getElementById('tut-progress').style.width=pct+'%';
  document.getElementById('tut-next-btn').textContent=s.last?'Get Started':'Next →';
  // dots
  document.getElementById('tut-dots').innerHTML=TUTORIAL_SLIDES.map((_,i)=>
    `<div onclick="tutDotJump(${i})" style="width:${i===tutIdx?'18px':'6px'};height:6px;border-radius:99px;background:${i===tutIdx?'var(--accent)':'var(--muted2)'};cursor:pointer;transition:width .2s,background .2s"></div>`
  ).join('');
  // slide content
  document.getElementById('tut-slides').innerHTML=`
    <div style="text-align:center">
      <div class="ic-plate lg">${FinIcons.fromEmoji(s.icon)}</div>
      <div style="font-family:var(--font-d);font-size:20px;font-weight:700;margin-bottom:12px;line-height:1.3">${s.title}</div>
      <div style="font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:${s.tip?'16px':'0'}">${s.desc}</div>
      ${s.tip?`<div style="background:var(--accent-bg);border:1px solid var(--accent-dim);border-radius:9px;padding:10px 14px;font-size:12.5px;color:var(--accent);text-align:left">${FinIcons.html(s.tip)}</div>`:''}
    </div>`;
}


/* ── CUSTOM CONFIRM ── */
let _confirmResolve=null;
// dialog icons: callers still pass an emoji string; show it as a matching icon on a tinted plate
function confirmIcon(e){const n=(window.FinIcons&&FinIcons.map[String(e).replace(/\uFE0F/g,'')])||(window.FinIcons&&FinIcons.map[e])||'alert';
  const tone=/^(alert|trash|logout|unlock)$/.test(n)?(n==='alert'?' warn':' bad'):'';return '<div class="ic-plate'+tone+'" style="margin-bottom:0">'+FinIcons.ic(n)+'</div>';}
function mtConfirm(msg,icon='⚠️',okLabel='Confirm',okColor='var(--red)'){
  return new Promise(resolve=>{
    if(_confirmResolve){_confirmResolve(false);_confirmResolve=null;}
    _confirmResolve=resolve;
    document.getElementById('confirm-modal').style.display='flex';
    document.getElementById('confirm-icon').innerHTML=confirmIcon(icon);
    document.getElementById('confirm-msg').textContent=msg;
    document.getElementById('confirm-ok-btn').textContent=okLabel;
    document.getElementById('confirm-ok-btn').style.background=okColor;
  });
}
function confirmResolve(val){
  document.getElementById('confirm-modal').style.display='none';
  if(_confirmResolve){_confirmResolve(val);_confirmResolve=null;}
}

/* ── CLOUD/LOCAL MERGE CHOICE ── */
let _mergeResolve=null;
function countEntries(s){
  return (s.income?.length||0)+(s.expenses?.length||0)+(s.loans?.length||0)+(s.goals?.length||0);
}
function showMergeChoice(remote,remoteUpdatedAt){
  return new Promise(resolve=>{
    _mergeResolve=resolve;
    const localCount=countEntries(state);
    const remoteCount=countEntries(remote);
    const remoteDate=remoteUpdatedAt?new Date(remoteUpdatedAt).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}):'an earlier session';
    document.getElementById('merge-modal-detail').innerHTML=
      'This device has <strong>'+localCount+' entr'+(localCount===1?'y':'ies')+'</strong> saved locally. '+
      'This account\'s cloud copy has <strong>'+remoteCount+' entr'+(remoteCount===1?'y':'ies')+'</strong>, last synced '+esc(remoteDate)+'. '+
      'Pick which one to keep - the other copy will be overwritten.';
    document.getElementById('merge-modal').style.display='flex';
  });
}
function resolveMergeChoice(useRemote){
  document.getElementById('merge-modal').style.display='none';
  if(_mergeResolve){_mergeResolve(useRemote);_mergeResolve=null;}
}

/* ══ LEGAL: Terms of Use + Privacy Policy (single source, used at sign-up, login screen and Settings) ══ */
const LEGAL_VERSION='2.0', LEGAL_UPDATED='October 6, 2026';
const LEGAL_DEV='PCP-IS SOLUTIONS';                       // the company that runs FINUITY (shown in the Terms and Privacy Policy)
const LEGAL_EMAIL='PCPSERVICE@gmail.com';                 // public contact / privacy email (shown in the Terms and Privacy Policy)
const LEGAL_DOCS={
terms:[
['Acceptance of These Terms',`By creating an account, signing in, continuing as a Guest, or otherwise using FINUITY ("the App"), you agree to these Terms of Use and to our Privacy Policy. Ticking the agreement box is a valid electronic signature and creates a binding agreement under the Electronic Commerce Act of 2000 (Republic Act No. 8792). If you do not agree, do not use the App.`],
['Who May Use the App',`You must be at least 18 years old. If you are younger, a parent or legal guardian must read and accept these documents on your behalf and supervise your use. The App is for your own personal, non-commercial use.`],
['What FINUITY Is',`FINUITY is a personal, self-managed finance tracker for income, expenses, wallet balances (e.g. GCash, Maya, cash), loans and savings goals that <b>you</b> enter yourself. It is provided by ${LEGAL_DEV} ("we", "us") and is under active development.`],
['What FINUITY Is Not',`FINUITY is <b>not</b> a bank, e-wallet, electronic money issuer, lending or financing company, payment processor, remittance provider, broker or investment adviser, and is not supervised by the Bangko Sentral ng Pilipinas or the Securities and Exchange Commission. It has no connection to your real bank or e-wallet accounts and never moves money. Balances, loans and reports are figures you typed in; a loan entry is a personal note, not proof of a debt or a collection tool. Nothing in the App is financial, investment, tax, accounting or legal advice, and generated reports are unaudited and are not for tax filings or submission to any authority unless you verify them yourself.`],
['Your Account and Security',`You are responsible for your sign-in credentials, your device, your 4-digit PIN and your recovery answer, and for all activity under your account. The PIN (and optional device biometric unlock) is a convenience lock, <b>not</b> encryption. Guest accounts have no email, so we cannot recover them if you lose the device or clear its storage. Tell us promptly if you suspect unauthorized access.`],
['Your Data and Content',`You own the information you enter. You give us a limited, non-exclusive licence to store, process and sync it solely to run the App for you. You are responsible for its accuracy and for having the right to enter information about other people (for example names in loan records) - keep it to what is necessary. Do not enter government ID numbers, card numbers, bank credentials or passwords.`],
['Acceptable Use',`You agree not to: use the App for anything unlawful, fraudulent or for money laundering; try to access another person's account or data; probe, attack, overload, scrape or reverse-engineer the App or its services; upload malware; or bypass any security or usage limit.`],
['Backups and Availability',`The App is provided as available and may be interrupted, changed or discontinued. Syncing can fail or conflict between devices. You are responsible for exporting your own backups (Settings and Export). Restoring a backup overwrites current data.`],
['Third-Party Services',`The App relies on Google Firebase (authentication and database), Google Sign-In and Google Fonts, and, only if you use the optional receipt scanner, the jsDelivr content network to download the open-source Tesseract.js reader. Their own terms and privacy policies apply, and we are not responsible for their outages or acts.`],
['Intellectual Property',`The App, its design, code, name, logo and icons belong to us or our licensors. You receive a limited, revocable, non-exclusive, non-transferable licence to use it for personal purposes. Scripture excerpts remain the property of their respective translation rights holders and are shown for personal encouragement only.`],
['Devotional Content',`Any Bible verses or devotional content is for personal encouragement. It is not pastoral, financial or professional counsel.`],
['Disclaimer of Warranties',`To the extent permitted by law, the App is provided "as is" and "as available" without warranties of any kind, including accuracy, reliability, uninterrupted operation, or fitness for a particular purpose. Calculations may contain errors.`],
['Limitation of Liability',`To the extent permitted by Philippine law, we are not liable for indirect, incidental or consequential loss, loss of data, or any financial decision you make based on the App. Nothing in these Terms excludes liability that cannot be excluded under Philippine law, including liability for fraud, bad faith or gross negligence, or limits your rights as a data subject or consumer.`],
['Indemnity',`You agree to be responsible for claims and losses arising from your breach of these Terms or your unlawful use of the App, to the extent permitted by law.`],
['Suspension and Ending Use',`We may suspend or end access if you breach these Terms or to protect the App or other users. You may stop at any time and permanently delete your account and data in Settings (Legal and Data). Sections that by nature should survive (ownership, disclaimers, liability, governing law) continue after termination.`],
['Changes to These Terms',`We may update these Terms or the Privacy Policy. When we make a material change we will show the new version in the App and ask you to accept it again before you continue. Continued use after the notice period means you accept the update.`],
['Governing Law and Disputes',`These Terms are governed by the laws of the Republic of the Philippines. Please contact us first so we can try to resolve any concern in good faith; failing that, disputes go to the proper courts of the Philippines.`],
['General',`If any provision is unenforceable, the rest remains in force. Our failure to enforce a right is not a waiver. These Terms and the Privacy Policy are the entire agreement between you and us about the App. Contact: ${LEGAL_EMAIL}.`]
],
privacy:[
['Who We Are',`${LEGAL_DEV} is the Personal Information Controller of FINUITY. Privacy contact / Data Protection Officer: ${LEGAL_EMAIL}. This policy follows the Data Privacy Act of 2012 (Republic Act No. 10173), its Implementing Rules and Regulations, and issuances of the National Privacy Commission (NPC).`],
['Personal Data We Handle',`<b>Account data:</b> email address, sign-in method (Google, email/password or guest), display name, and a unique account ID.<br><b>Data you enter:</b> income, expenses, wallet names and balances, loans (including names of people and notes), savings goals, budget limit, notes, and app settings.<br><b>Security data:</b> a salted hash of your PIN, your recovery question, and a salted hash of your answer (we cannot read either).<br><b>Technical data:</b> authentication tokens and data your browser stores (localStorage/sessionStorage: theme, tutorial status, unlock state). Google may receive your IP address and device details when you sign in, sync, or load fonts.<br><b>We do not collect:</b> bank or e-wallet credentials, card numbers, precise location, contacts, photos, or microphone/camera data, and we do not run advertising or third-party analytics.`],
['Why We Use It and Our Legal Basis',`We process data to (1) create and secure your account, (2) store, sync and display your records across your devices, (3) provide backups, exports and reports you request, and (4) keep the service safe and fix problems. Our bases under Section 12 of the Data Privacy Act are your <b>consent</b> (given when you accept these documents), performance of the service you asked for, and our legitimate interest in security and reliability. We do not sell your data, use it for profiling or advertising, or make automated decisions about you.`],
['Where Your Data Is Kept',`A copy is stored in your browser on your device. If you use an account, a copy is also stored in Google Cloud Firestore under your account ID. Google servers may be located outside the Philippines, so your data may be transferred and processed abroad; Google acts as our processor under its own security and data-protection commitments, and we remain accountable for your data.`],
['Who We Share It With',`Only with service providers needed to run the App: Google (Firebase Authentication, Firestore, Google Sign-In, Google Fonts). We disclose data to authorities only when required by law or lawful order. The optional receipt scanner runs entirely on your device: your receipt photo is not uploaded or stored, and only the open-source reader software and its language data are downloaded from a public content network (jsDelivr) the first time you use it, which may see your IP address. We do not otherwise share, rent or sell personal data. The developer does not routinely view your individual records.`],
['How Long We Keep It',`Local data stays until you clear it or your browser storage. Cloud data stays until you delete it or your account, which you can do any time in Settings (Legal and Data). Backups you download are yours to manage. Inactive guest accounts may be removed after a long period. Deleted data may persist briefly in provider backups before being overwritten.`],
['Security',`We use HTTPS/TLS in transit, Google's access controls, and salted hashing (SHA-256) for your PIN and recovery answer. Your records are <b>not</b> end-to-end encrypted, and the PIN is a convenience lock: someone with access to your unlocked device may see your data. <b>Optional biometric unlock:</b> if you turn it on, your device's operating system checks your face or fingerprint through the browser's WebAuthn feature; the App never receives, stores or transmits your face or fingerprint data, and keeps only an on-device credential reference in this browser. Your PIN always still works. No system is perfectly secure; use a device passcode and keep backups.`],
['Your Rights as a Data Subject',`Under Section 16 of the Data Privacy Act you may: be informed; object to processing; access your data; correct it; request erasure or blocking; withdraw consent; receive your data in a portable format; and claim damages for violations. In-app: edit any entry, download a JSON/CSV backup, or permanently delete your account and cloud data in Settings. Otherwise email ${LEGAL_EMAIL}; we aim to respond within 30 days. You may also complain to the National Privacy Commission (privacy.gov.ph). Withdrawing consent or deleting your account means we can no longer provide cloud sync.`],
['Data Breach Notification',`If a personal data breach that puts you at risk occurs, we will notify the NPC and affected users within 72 hours of knowledge or reasonable belief, as required by NPC rules, and tell you what happened and what to do.`],
['Other People\'s Data',`If you enter details about others (such as a person who owes you money), do so only as needed for your personal records and keep them accurate. You are responsible for that entry.`],
['Children',`The App is not directed to children. Users under 18 need a parent or guardian to accept these documents and supervise. If we learn we hold a minor's data without proper consent, we will delete it on request.`],
['Cookies and Local Storage',`We use browser storage and Firebase tokens that are strictly necessary to keep you signed in and remember settings. We do not use advertising or tracking cookies.`],
['Changes and Contact',`We will update this policy when practices or the law change, show the new version, and ask for acceptance again where required. Questions, requests or complaints: ${LEGAL_EMAIL}.`]
]};
function legalHTML(tab){
  const title=tab==='terms'?'Terms of Use':'Privacy Policy';
  const head=`<p style="color:var(--muted);margin-bottom:14px"><b style="color:var(--text)">${title}</b><br>Version ${LEGAL_VERSION} · Last updated ${LEGAL_UPDATED}</p>`;
  return head+LEGAL_DOCS[tab].map((sec,i)=>`<p style="font-weight:700;margin-bottom:4px">${i+1}. ${sec[0]}</p><p style="margin-bottom:12px">${sec[1]}</p>`).join('')+`<p style="margin:16px 0 0;padding-top:12px;border-top:1px dashed var(--border2);color:var(--muted);font-size:11.5px;text-align:center"> - End of ${title} - </p>`;
}
function legalTabStyle(btn,on,read){
  if(!btn)return;
  btn.style.background=on?'var(--accent)':'transparent';
  btn.style.color=on?'#080808':'var(--muted)';
  btn.textContent=(btn.dataset.label)+(read?' ✓':'');
}
/* viewer (login screen + Settings) */
let legalTab='terms';
function openLegal(tab){document.getElementById('legal-modal').style.display='flex';setLegalTab(tab||'terms');}
function closeLegal(){document.getElementById('legal-modal').style.display='none';}
function setLegalTab(t){
  legalTab=t;
  legalTabStyle(document.getElementById('legal-tab-terms'),t==='terms');
  legalTabStyle(document.getElementById('legal-tab-privacy'),t==='privacy');
  const b=document.getElementById('legal-body');b.innerHTML=legalHTML(t);b.scrollTop=0;
}
/* consent screen (must read both to the end) */
let termsTab='terms',termsRead={terms:false,privacy:false};
function setTermsTab(t){
  termsTab=t;
  const box=document.getElementById('terms-scroll');
  legalTabStyle(document.getElementById('terms-tab-terms'),t==='terms',termsRead.terms);
  legalTabStyle(document.getElementById('terms-tab-privacy'),t==='privacy',termsRead.privacy);
  box.innerHTML=legalHTML(t);box.scrollTop=0;
  box.onscroll=checkTermsScroll;
  setTimeout(checkTermsScroll,0);
}
function checkTermsScroll(){
  const box=document.getElementById('terms-scroll');
  if(box.scrollTop+box.clientHeight>=box.scrollHeight-8&&!termsRead[termsTab]){
    termsRead[termsTab]=true;
    legalTabStyle(document.getElementById('terms-tab-'+termsTab),true,true);
  }
  if(termsRead.terms&&termsRead.privacy){
    const chk=document.getElementById('terms-agree-check'),lbl=document.getElementById('terms-agree-label'),hint=document.getElementById('terms-scroll-hint');
    if(chk&&chk.disabled){chk.disabled=false;chk.style.cursor='pointer';if(lbl){lbl.style.opacity='1';lbl.style.cursor='pointer';}if(hint)hint.style.display='none';}
  }
}
function showTermsScreen(){
  document.getElementById('auth-overlay').style.display='flex';
  hideAllAuthScreens();
  document.getElementById('auth-terms').style.display='block';
  termsRead={terms:false,privacy:false};
  ['terms','privacy'].forEach(k=>{const b=document.getElementById('terms-tab-'+k);if(b)b.dataset.label=k==='terms'?'Terms of Use':'Privacy Policy';});
  const chk=document.getElementById('terms-agree-check'),btn=document.getElementById('terms-continue-btn'),lbl=document.getElementById('terms-agree-label'),hint=document.getElementById('terms-scroll-hint');
  if(chk){chk.checked=false;chk.disabled=true;chk.style.cursor='not-allowed';}
  if(btn)btn.disabled=true;
  if(lbl){lbl.style.opacity='.45';lbl.style.cursor='not-allowed';}
  if(hint)hint.style.display='flex';
  const err=document.getElementById('terms-error');if(err)err.textContent='';
  setTermsTab('terms');
}
function acceptTermsAndContinue(){
  const chk=document.getElementById('terms-agree-check'),err=document.getElementById('terms-error');
  if(!chk||chk.disabled){if(err)err.textContent='Please read both documents to the end first.';return;}
  if(!chk.checked){if(err)err.textContent='Please tick the box to confirm you agree before continuing.';return;}
  state.termsAccepted={accepted:true,version:LEGAL_VERSION,date:new Date().toISOString()};
  save();
  // Existing users re-accepting an updated version go straight back in; new users continue to profile setup.
  if(state.username){stateLoadedForUid=cloudUser?cloudUser.uid:null;handleAuthState(cloudUser);}else showOnboardingOrRegister();
}
/* Right to erasure: delete cloud data, the account, and the local copy */
async function deleteAccountAndData(){
  if(!cloudUser){toast('Not signed in','error');return;}
  const ok=await mtConfirm('This permanently deletes your account, your cloud data and everything on this device. It cannot be undone. Download a backup first if you want to keep a copy.','🗑️','Delete Everything','var(--red)');
  if(!ok)return;
  const u=cloudUser;
  clearTimeout(cloudSyncTimer);cloudPushPending=false;
  try{
    await fbDb.collection('users').doc(u.uid).delete();
    await u.delete();
  }catch(e){
    console.error(e);
    if(e.code==='auth/requires-recent-login'){toast('Cloud data removed. For security, sign out, sign back in, then tap Delete again to finish removing the account.','error');}
    else toast('Could not delete: '+authFriendlyError(e),'error');
    return;
  }
  sessionStorage.removeItem('mtUnlocked');stateLoadedForUid=null;
  Object.keys(state).forEach(k=>delete state[k]);Object.assign(state,defaultState());
  ['kwentadoV1','mtTutDone','mtGuestBannerDismissAt','mtGuestNudge3Shown','mtGuestRemindAt','mtMoneyTab','finCloudLinked','finBioCred','finPinLock'].forEach(k=>localStorage.removeItem(k));
  toast('Account and data deleted');
}

/* INIT */
document.getElementById('exp-date').value=today();
document.getElementById('topbar-date').textContent=new Date().toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
populateYearDropdown();
initTheme();
onLoanTypeChange();
// Hide splash initially - auth flow controls when to show it
document.getElementById('welcome-splash').style.display='none';
// Lock immediately from the local copy: don't wait for Firebase/cloud before asking for the PIN.
if(state.pinHash&&!sessionStorage.getItem('mtUnlocked')){showPinScreen();}
document.documentElement.classList.remove('finlock');
scheduleRender();
updateSidebarUsername();
// Auth entry point is now driven entirely by fbAuth.onAuthStateChanged → handleAuthState()
// Recurring reminder: check if any recurring expenses haven't been logged this month
setTimeout(()=>whenAppReady(()=>{
  const now=new Date();
  const curMo=now.getMonth(),curYr=now.getFullYear();
  // Dedup by description: each unique recurring expense name is one template
  const recurringDescs=[...new Set(state.expenses.filter(e=>e.recurring).map(e=>e.desc))];
  const loggedDescs=new Set(state.expenses.filter(e=>{
    const d=ldate(e.date);
    return e.recurring&&!isNaN(d)&&d.getMonth()===curMo&&d.getFullYear()===curYr;
  }).map(e=>e.desc));
  const missing=recurringDescs.filter(desc=>!loggedDescs.has(desc));
  if(missing.length){
    toast('↺ '+missing.length+' recurring expense'+(missing.length>1?'s':'')+' not yet logged - go to Expenses');
    // One template (most recent) per missing description, so Fin can offer a direct "Log it" action.
    const items=missing.map(desc=>{
      const matches=state.expenses.filter(e=>e.recurring&&e.desc===desc);
      const t=matches[matches.length-1];
      return t?{desc,amount:t.amount,templateId:t.id}:null;
    }).filter(Boolean);
    if(items.length)window.dispatchEvent(new CustomEvent('fin:recurring-missing',{detail:{items}}));
  }
}),1800);

// Loan due-date reminder: check overdue or due-soon loans
setTimeout(()=>whenAppReady(()=>{
  const nowMs=new Date().setHours(0,0,0,0);
  const urgent=state.loans.filter(l=>{
    if(l.settled||!l.due)return false;
    const dueMs=ldate(l.due).setHours(0,0,0,0);
    return Math.round((dueMs-nowMs)/(1000*60*60*24))<=7;
  });
  const overdue=urgent.filter(l=>{const dueMs=ldate(l.due).setHours(0,0,0,0);return dueMs<nowMs;});
  const dueSoon=urgent.filter(l=>{const dueMs=ldate(l.due).setHours(0,0,0,0);return dueMs>=nowMs;});
  if(overdue.length)toast('⚠ '+overdue.length+' loan'+(overdue.length>1?'s':'')+' overdue - check Loans','error');
  else if(dueSoon.length)toast('⏰ '+dueSoon.length+' loan'+(dueSoon.length>1?'s':'')+' due soon - check Loans');
}),2600);

window.logRecurring = function(templateId){
  var id = parseInt(String(templateId), 10);
  var template = null;
  for(var i=0;i<state.expenses.length;i++){
    if(parseInt(String(state.expenses[i].id),10)===id){ template=state.expenses[i]; break; }
  }
  if(!template){ toast('Could not find expense template','error'); return; }
  var now=new Date(), cm=now.getMonth(), cy=now.getFullYear();
  var alreadyLogged=state.expenses.some(function(e){
    var d=ldate(e.date);
    return e.recurring && e.desc===template.desc && !isNaN(d) && d.getMonth()===cm && d.getFullYear()===cy;
  });
  if(alreadyLogged){ toast(template.desc+' already logged this month','error'); return; }
  var wallet=deductWalletBalance(template.source, template.amount);
  pushExpense({desc:template.desc, amount:template.amount, cat:template.cat, source:template.source, date:today(), note:template.note||'', recurring:true, recurringTemplateId:template.id});
  save(); renderAfterExpense();
  toast(template.desc+' logged ✓'+(wallet?' - '+wallet.label+' updated':''));
  window.dispatchEvent(new CustomEvent('fin:expense-logged',{detail:{desc:template.desc,amount:template.amount,cat:template.cat,source:template.source,recurring:true}}));
};


