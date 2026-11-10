/* FINUITY icon set
   Custom stroke icons drawn to match the app's navigation icons (24px grid, rounded 1.8px strokes, inherit text colour).
   Replaces emoji so the interface has one consistent visual language.
   Usage:  FinIcons.ic('flame')          -> '<svg class="ic"><use href="#i-flame"/></svg>'
           FinIcons.fromEmoji('📚')      -> icon html for an old emoji string ('' if it has no icon)
           FinIcons.html(str)            -> str with known emoji swapped for icons (escape user text BEFORE calling)
           FinIcons.strip(str)           -> str with decorative emoji removed (for plain-text places: Fin, toasts)
           FinIcons.leading('📚 Learn')  -> {icon:'book', text:'Learn'} (used for Fin's buttons) */
(function(){
'use strict';
var W=window;
var I={
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 minus:'<path d="M5 12h14"/>',
 alert:'<path d="M12 4.2l9 15.6H3z"/><path d="M12 10v4.4"/><path d="M12 17.3h.01"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.9h.01"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 114.1 2c-.9.7-1.7 1.2-1.7 2.4"/><path d="M12 16.8h.01"/>',
 bulb:'<path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 00-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0012 3z"/>',
 book:'<path d="M4 5.5A1.5 1.5 0 015.5 4H11v15H5.5A1.5 1.5 0 004 20.5zM20 5.5A1.5 1.5 0 0018.5 4H13v15h5.5a1.5 1.5 0 011.5 1.5z"/>',
 chart:'<path d="M5 20V11M12 20V4M19 20v-6"/>',
 pie:'<path d="M12 3v9h9"/><path d="M20.5 15A9 9 0 119 3.5"/>',
 'trend-up':'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
 'trend-down':'<path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 flag:'<path d="M6 21V4"/><path d="M6 5h11l-2 4 2 4H6"/>',
 trophy:'<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 6H5.5a2.5 2.5 0 002.8 3.9M16 6h2.5a2.5 2.5 0 01-2.8 3.9"/><path d="M12 13v4M8.5 20h7M10 17h4"/>',
 medal:'<circle cx="12" cy="15" r="5"/><path d="M8.6 10.6L7 3h4l1 4M15.4 10.6L17 3h-4l-1 4"/>',
 flame:'<path d="M12 3c.9 3.3 5 5.4 5 10a5 5 0 01-10 0c0-1.9.9-3.1 2-4 .3 1.1 1 1.9 2 2.2C10.4 8.2 10.9 5.6 12 3z"/>',
 snow:'<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/><path d="M9.6 4.9L12 6.6l2.4-1.7M9.6 19.1L12 17.4l2.4 1.7"/>',
 bolt:'<path d="M13 3L5 13.5h6L10.5 21 19 10.5h-6z"/>',
 star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"/>',
 diamond:'<path d="M12 3l7.5 9L12 21 4.5 12z"/><path d="M4.5 12h15"/>',
 crown:'<path d="M4 8l4 4 4-6 4 6 4-4-1.6 10H5.6z"/>',
 sprout:'<path d="M12 21v-8"/><path d="M12 13c0-3.2-2.2-5-6.5-5 0 3.3 2.2 5 6.5 5zM12 11c0-3.2 2.2-5 6.5-5 0 3.3-2.2 5-6.5 5z"/>',
 sparkle:'<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z"/><path d="M19 15v5M16.5 17.5h5"/>',
 rocket:'<path d="M12 3c3 1.6 5 4.6 5 8.2L14.6 14H9.4L7 11.2C7 7.6 9 4.6 12 3z"/><circle cx="12" cy="9.5" r="1.5"/><path d="M9.4 14L7 18.5l3.2-1.3M14.6 14l2.4 4.5-3.2-1.3M12 15.5v4.5"/>',
 graduation:'<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11.3V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.7"/><path d="M21.5 9v5"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>',
 map:'<path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>',
 receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
 pencil:'<path d="M4 20h4L19.5 8.5l-4-4L4 16z"/><path d="M13 7l4 4"/>',
 trash:'<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/>',
 repeat:'<path d="M17 3l3 3-3 3"/><path d="M4 11V9.5A3.5 3.5 0 017.5 6H20"/><path d="M7 21l-3-3 3-3"/><path d="M20 13v1.5a3.5 3.5 0 01-3.5 3.5H4"/>',
 more:'<circle cx="5.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18.5" cy="12" r="1.3"/>',
 gear:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.6a7.6 7.6 0 000-3.2l1.9-1.5-2-3.4-2.3.9a7.6 7.6 0 00-2.8-1.6L13.8 2.4h-3.6l-.4 2.4A7.6 7.6 0 007 6.4l-2.3-.9-2 3.4 1.9 1.5a7.6 7.6 0 000 3.2l-1.9 1.5 2 3.4 2.3-.9a7.6 7.6 0 002.8 1.6l.4 2.4h3.6l.4-2.4a7.6 7.6 0 002.8-1.6l2.3.9 2-3.4z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
 moon:'<path d="M20 14.6A8 8 0 019.4 4 8 8 0 1020 14.6z"/>',
 cloud:'<path d="M7 18.5a4.2 4.2 0 01-.6-8.3A5.6 5.6 0 0117 8.8a4.9 4.9 0 01.5 9.7z"/>',
 lock:'<rect x="5" y="11" width="14" height="9.5" rx="2.2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
 unlock:'<rect x="5" y="11" width="14" height="9.5" rx="2.2"/><path d="M8 11V8a4 4 0 017.6-1.7"/>',
 key:'<circle cx="8" cy="15.5" r="4"/><path d="M11 12.5L20 3.5M16.5 7l3 3"/>',
 shield:'<path d="M12 3l8 3v6c0 4.8-3.4 7.9-8 9-4.6-1.1-8-4.2-8-9V6z"/><path d="M8.8 12l2.2 2.2L15.3 10"/>',
 lifering:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="M5.6 5.6l3.8 3.8M14.6 14.6l3.8 3.8M18.4 5.6l-3.8 3.8M9.4 14.6l-3.8 3.8"/>',
 fingerprint:'<path d="M12 3.5a7.5 7.5 0 00-7.5 7.5v1.5"/><path d="M12 3.5a7.5 7.5 0 017.5 7.5v3.2c0 2.6.4 4.4 1 5.8"/><path d="M8 20c.8-1.7 1-3.2 1-5.5"/><path d="M12 20.5c.6-1.4.8-2.8.8-5v-3.5a1.8 1.8 0 00-3.6 0v1"/><path d="M15.8 15.5c0 1.8.2 3 .8 4.2"/><path d="M12 8a3.5 3.5 0 013.5 3.5"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 21c.9-4 3.7-6 7.5-6s6.6 2 7.5 6"/>',
 users:'<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20c.7-3.4 3.1-5 6.5-5s5.8 1.6 6.5 5"/><circle cx="17" cy="9.5" r="2.6"/><path d="M17.5 14.6c2.4.1 3.8 1.5 4.3 4.4"/>',
 wallet:'<path d="M4 7.5A2.5 2.5 0 016.5 5H17v3"/><path d="M4 7.5V18a2 2 0 002 2h13a1 1 0 001-1V9.5a1 1 0 00-1-1H6.5A2.5 2.5 0 014 6.5"/><circle cx="16.2" cy="14.2" r="1.2"/>',
 card:'<rect x="3" y="5.5" width="18" height="13" rx="2.6"/><path d="M3 10h18M7 15h3.5"/>',
 bank:'<path d="M3 9l9-5.5L21 9z"/><path d="M5.5 10.5v7M10 10.5v7M14 10.5v7M18.5 10.5v7M3.5 20h17"/>',
 cash:'<rect x="3" y="6.5" width="18" height="11" rx="2.2"/><circle cx="12" cy="12" r="2.4"/><path d="M6.5 12h.01M17.5 12h.01"/>',
 coin:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/>',
 savings:'<ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
 swap:'<path d="M7 4L3 8l4 4M3 8h14"/><path d="M17 20l4-4-4-4M21 16H7"/>',
 calendar:'<rect x="4" y="5.5" width="16" height="15" rx="2.6"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 bell:'<path d="M6 16.5V11a6 6 0 0112 0v5.5l1.6 2H4.4z"/><path d="M10 21a2 2 0 004 0"/>',
 'bell-off':'<path d="M6 16.5V11a6 6 0 019-5.2M18 11v5.5l1.6 2H4.4"/><path d="M10 21a2 2 0 004 0M3.5 3.5l17 17"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
 eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
 'eye-off':'<path d="M3 3l18 18M10.6 5.7A9 9 0 0112 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 01-3 3.7M6.5 7.3A16 16 0 002.5 12S6 18.5 12 18.5a9 9 0 004-.9"/><path d="M9.9 9.9a2.8 2.8 0 003.9 3.9"/>',
 camera:'<path d="M4 8h3l1.6-2.5h6.8L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.5"/>',
 download:'<path d="M12 4v11M7.5 11L12 15.5 16.5 11M5 20h14"/>',
 upload:'<path d="M12 15V4M7.5 8L12 3.5 16.5 8M5 20h14"/>',
 send:'<path d="M20.5 3.5L10 14"/><path d="M20.5 3.5L14 20.5l-4-6.5-6.5-4z"/>',
 home:'<path d="M4 11l8-7 8 7v8.5a.5.5 0 01-.5.5H15v-6H9v6H4.5a.5.5 0 01-.5-.5z"/>',
 megaphone:'<path d="M4 10v4h3l7 4V6L7 10z"/><path d="M17.5 9a4.2 4.2 0 010 6"/>',
 music:'<path d="M9 18V5.5l10-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
 play:'<rect x="3" y="5.5" width="18" height="13" rx="3.6"/><path d="M10.4 9.4v5.2l4.5-2.6z"/>',
 church:'<path d="M12 2.5v5M9.8 4.8h4.4"/><path d="M12 8l6 4v8H6v-8z"/><path d="M10 20v-4.5h4V20"/>',
 chat:'<path d="M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1h-8.5L6 20v-4H5a1 1 0 01-1-1V6a1 1 0 011-1z"/>',
 bag:'<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V7a3 3 0 016 0v1"/>',
 bus:'<rect x="4" y="3.5" width="16" height="13.5" rx="3"/><path d="M4 11h16M7.5 20v-3M16.5 20v-3M7.5 14.2h.01M16.5 14.2h.01"/>',
 utensils:'<path d="M6 3v7a2 2 0 004 0V3M8 3v18"/><path d="M17 3c-2.2 1.4-3 4-3 7 0 1.6 1.2 2.2 3 2.2V3zM17 12.2V21"/>',
 heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z"/>',
 gamepad:'<rect x="3" y="7.5" width="18" height="10.5" rx="5.2"/><path d="M8 10.8v3.6M6.2 12.6h3.6M15.6 11.8h.01M17.6 13.6h.01"/>',
 box:'<path d="M3.5 8L12 3.8 20.5 8v8L12 20.2 3.5 16z"/><path d="M3.5 8L12 12.2 20.5 8M12 12.2v8"/>',
 gift:'<rect x="4" y="9.5" width="16" height="10.5" rx="1.6"/><path d="M3 9.5h18v3H3zM12 9.5V20"/><path d="M12 9.5C10.6 6 6.5 5.5 7 7.9c.3 1.3 2.6 1.6 5 1.6zM12 9.5c1.4-3.5 5.5-4 5-1.6-.3 1.3-2.6 1.6-5 1.6z"/>',
 briefcase:'<rect x="3.5" y="7.5" width="17" height="12" rx="2.2"/><path d="M9 7.5v-2a1 1 0 011-1h4a1 1 0 011 1v2M3.5 13h17"/>',
 copy:'<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V6.5a2 2 0 00-2-2h-7a2 2 0 00-2 2v7a2 2 0 002 2h2"/>',
 clipboard:'<rect x="6" y="5" width="12" height="16" rx="2.2"/><path d="M9.5 5V4h5v1M9.5 11h5M9.5 15h3.5"/>',
 phone:'<rect x="7" y="3" width="10" height="18" rx="2.6"/><path d="M10.5 18h3"/>',
 image:'<rect x="3.5" y="5" width="17" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.5"/><path d="M4 17l5-4 4 3 3-2 4 3"/>',
 logout:'<path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4M10 8l-4 4 4 4M6 12h10"/>',
 'arrow-right':'<path d="M5 12h14M13 6l6 6-6 6"/>',
 'arrow-left':'<path d="M19 12H5M11 6l-6 6 6 6"/>',
 'chevron-right':'<path d="M9 6l6 6-6 6"/>',
 'chevron-down':'<path d="M6 9l6 6 6-6"/>',
 backspace:'<path d="M21 5H9l-6 7 6 7h12a1 1 0 001-1V6a1 1 0 00-1-1z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/>',
 gauge:'<path d="M4 17a8.5 8.5 0 1116 0"/><path d="M12 17l4-5"/><path d="M12 17h.01"/>',
 list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
 edit:'<path d="M5 4h9l5 5v11H5z"/><path d="M14 4v5h5M8.5 13h7M8.5 16.5h5"/>'
};
var E={
 '💡':'bulb','🎯':'target','📚':'book','📖':'book','📊':'chart','📈':'trend-up','📉':'trend-down','🧾':'receipt','💰':'cash','💵':'cash','💸':'swap','💳':'card','👛':'wallet','🪙':'coin','🏦':'bank',
 '🍜':'utensils','🚌':'bus','🛍️':'bag','🛍':'bag','💊':'heart','🎮':'gamepad','📦':'box','🤝':'swap','🎁':'gift','🎀':'gift','💼':'briefcase',
 '🔥':'flame','⚡':'bolt','🌟':'star','⭐':'star','💎':'diamond','👑':'crown','🌱':'sprout','🐣':'sprout','✨':'sparkle','🚀':'rocket','🎓':'graduation','🧭':'compass','🏆':'trophy','🏅':'medal','🏁':'flag','🌠':'sparkle','🎉':'sparkle',
 '🔒':'lock','🔓':'unlock','🔑':'key','🛡️':'shield','🛡':'shield','🛟':'lifering','👆':'fingerprint','👤':'user','👨‍👩‍👧':'users','☁️':'cloud','☁':'cloud',
 '🔔':'bell','🔕':'bell-off','⏰':'clock','📅':'calendar','🌐':'globe','💱':'swap','🔍':'search','🔎':'search','📷':'camera','📸':'camera','📲':'phone','📱':'phone','📤':'upload','📥':'download',
 '🗑️':'trash','🗑':'trash','✍️':'pencil','📝':'edit','📋':'clipboard','🖼️':'image','🖼':'image','🚪':'logout','⚙️':'gear','⚙':'gear','☀️':'sun','☀':'sun','🌤️':'sun','🌙':'moon','🌫️':'flame',
 '❓':'help','❔':'help','⚠️':'alert','⚠':'alert','ℹ️':'info','📣':'megaphone','🎵':'music','▶️':'play','⛪':'church','📘':'chat','🙏':'','➕':'plus','✕':'x','✓':'check','✔':'check','⌫':'backspace',
 '✏️':'pencil','🎨':'sparkle','🎭':'chat','🐖':'savings','📆':'calendar','🔁':'repeat','🔄':'repeat','🔈':'bell','🔮':'gauge','🗺️':'map','🗺':'map','🙋':'users','🥇':'medal','🧮':'chart','💬':'chat',
 '👋':'','😅':'','😤':'','😠':'','😡':'','😵':'','🥺':'','💛':'','💢':'','👀':'','😊':'','😄':'','🤔':'','😎':'','🙂':'','😬':'','😢':'','😴':'','🤗':'','😉':'','💪':'','🙌':'','🤞':'','👏':'','✅':'check','❌':'x'
};
var VS='[\\uFE0F\\u200D]*';
// decorative emoji only (keeps arrows, bullets, flags and typographic symbols)
var DECOR=new RegExp('(?:[\\u2600-\\u26FF\\u2700-\\u27BF\\u2B50\\u2B55\\u{1F200}-\\u{1FAFF}]'+VS+')+','gu');
var keys=Object.keys(E).sort(function(a,b){return b.length-a.length}).map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')});
var MAPRE=new RegExp(keys.join('|'),'gu');

function ic(name,cls){return I[name]?'<svg class="ic'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="#i-'+name+'"/></svg>':''}
function fromEmoji(e){var n=E[String(e).replace(/\uFE0F/g,'')]||E[e];return n?ic(n):''}
function html(str){return String(str==null?'':str).replace(MAPRE,function(m){var n=E[m];return n?ic(n):''}).replace(DECOR,'')}
function strip(str){return String(str==null?'':str).replace(/ ?✓/g,'').replace(DECOR,'').replace(/[ \t]{2,}/g,' ').replace(/^\s+|\s+$/g,'')}
var LEAD={'👋':'chat'};   // a wave means nothing in running text, but as a button label it is the "chat" button
function leading(label){
  var s=String(label||''),m=s.match(MAPRE);
  if(m&&s.indexOf(m[0])===0){var t=s.slice(m[0].length).replace(/^\s+/,'');return{icon:E[m[0]]||LEAD[m[0]]||'',text:t}}
  return{icon:'',text:s.replace(DECOR,'').replace(/^\s+/,'')};
}
function sprite(){
  if(document.getElementById('fin-icons'))return;
  var s='<svg id="fin-icons" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">';
  Object.keys(I).forEach(function(k){s+='<symbol id="i-'+k+'" viewBox="0 0 24 24">'+I[k]+'</symbol>'});
  document.body.insertAdjacentHTML('afterbegin',s+'</svg>');
}
if(document.body)sprite();else document.addEventListener('DOMContentLoaded',sprite);
W.FinIcons={ic:ic,html:html,strip:strip,fromEmoji:fromEmoji,leading:leading,names:Object.keys(I),map:E};
})();

/* FinArt: hand-drawn style illustrations shared across the app (hand holding money = cash, and the Learn hero).
   FinArt.handMoney(cls) -> inline <svg>. Gradient ids are unique per call so several can live on one page. */
(function(){
'use strict';
var n=0,H='M50.7 163.3C49.9 165.7 50.9 166.1 51.8 167.0C52.7 167.9 52.5 169.1 56.0 169.0C59.5 168.9 66.2 166.6 72.7 166.5C79.2 166.4 81.8 164.0 95.0 168.3C108.2 172.7 137.4 188.5 151.7 192.5C165.9 196.5 171.7 193.0 180.5 192.5C189.3 192.0 199.7 190.2 204.7 189.3C209.6 188.4 208.9 188.2 210.2 187.0C211.4 185.8 210.7 183.4 212.3 182.3C213.9 181.2 218.2 181.2 219.8 180.3C221.5 179.4 222.2 178.1 222.2 176.8C222.1 175.6 224.7 173.4 219.7 172.7C214.7 171.9 199.3 171.5 192.2 172.3C185.0 173.2 182.0 176.9 176.8 177.8C171.6 178.8 165.1 178.2 161.0 177.8C156.9 177.5 156.9 178.1 152.2 175.7C147.5 173.2 136.7 166.2 132.8 163.3C129.0 160.5 129.7 159.8 129.2 158.5C128.6 157.2 128.5 156.0 129.5 155.3C130.5 154.7 131.6 153.2 135.2 154.7C138.8 156.1 145.9 161.6 151.2 163.8C156.5 166.0 162.6 167.4 167.0 167.8C171.4 168.2 175.6 166.9 177.7 166.2C179.7 165.4 179.2 164.4 179.3 163.3C179.5 162.2 182.6 161.4 178.5 159.5C174.4 157.6 164.3 156.3 154.7 151.7C145.0 147.0 129.9 136.0 120.7 131.7C111.5 127.4 105.0 126.4 99.5 125.8C94.0 125.3 92.4 126.4 87.7 128.3C83.0 130.3 76.6 133.6 71.3 137.7C66.1 141.7 59.6 148.4 56.2 152.7C52.7 156.9 51.4 160.9 50.7 163.3Z',B='M189.8 76.7C189.1 76.6 188.3 76.3 187.3 77.7C186.3 79.0 185.7 82.6 183.8 84.7C181.9 86.8 177.5 88.6 176.0 90.2C174.5 91.7 174.7 92.4 174.7 94.0C174.6 95.6 174.9 98.0 175.8 99.8C176.8 101.7 178.2 103.4 180.2 105.2C182.1 106.9 186.4 109.1 187.7 110.3C188.9 111.6 188.4 112.0 187.8 112.5C187.2 113.0 185.8 113.9 184.0 113.3C182.2 112.8 178.9 109.4 176.8 109.2C174.7 108.9 171.9 110.4 171.3 111.7C170.8 112.9 172.0 115.0 173.3 116.7C174.7 118.4 178.3 119.8 179.3 121.8C180.4 123.9 179.1 127.3 179.5 128.8C179.9 130.4 180.6 130.8 181.5 131.0C182.4 131.2 183.9 131.2 184.8 130.0C185.8 128.8 185.5 125.3 187.0 123.7C188.5 122.0 192.3 121.7 194.0 120.2C195.7 118.7 196.6 116.8 197.0 114.7C197.4 112.5 197.4 109.6 196.5 107.3C195.6 105.1 193.7 103.1 191.7 101.2C189.6 99.2 185.2 97.1 184.3 95.8C183.4 94.6 184.6 93.4 186.2 93.5C187.8 93.6 191.9 96.6 194.0 96.7C196.1 96.8 198.1 95.1 198.8 94.2C199.5 93.2 199.1 92.6 198.2 91.2C197.2 89.7 194.1 87.5 193.0 85.3C191.9 83.1 192.4 79.4 191.8 78.0C191.3 76.6 190.6 76.7 189.8 76.7ZM115.5 60.0C113.7 59.9 113.5 56.3 114.8 61.5C116.1 66.7 121.7 81.3 123.3 91.3C124.9 101.3 123.1 115.1 124.5 121.5C125.9 127.9 128.3 127.1 131.7 130.0C135.0 132.9 141.8 138.0 144.7 139.0C147.6 140.0 147.2 138.6 149.0 135.8C150.8 133.1 152.8 129.3 155.3 122.7C157.9 116.1 161.9 105.4 164.3 96.2C166.8 86.9 168.6 75.5 169.8 67.3C171.0 59.2 170.4 50.5 171.5 47.2C172.6 43.8 169.4 43.5 176.5 47.2C183.6 50.8 207.7 62.6 214.0 69.2C220.3 75.8 215.2 80.1 214.5 86.7C213.8 93.3 213.5 98.1 210.0 108.8C206.5 119.6 196.1 143.5 193.5 151.0C190.9 158.5 193.8 153.3 194.7 153.7C195.6 154.0 197.0 155.6 199.0 153.0C201.0 150.4 203.6 145.5 206.7 138.0C209.7 130.5 214.8 117.2 217.2 107.8C219.6 98.5 220.4 88.4 221.0 82.0C221.6 75.6 221.0 72.5 220.7 69.7C220.4 66.9 227.9 71.2 219.2 65.2C210.4 59.2 177.0 38.6 168.0 33.7C159.0 28.7 165.8 33.1 165.3 35.3C164.9 37.6 165.6 44.7 165.3 47.2C165.1 49.6 167.0 50.8 163.8 50.2C160.7 49.6 149.8 44.4 146.5 43.7C143.2 42.9 144.6 43.9 144.3 45.8C144.1 47.8 145.2 53.1 145.2 55.2C145.1 57.2 146.8 58.3 143.8 58.0C140.9 57.7 130.3 53.9 127.3 53.3C124.3 52.8 126.1 53.4 125.8 54.8C125.6 56.3 127.6 61.3 125.8 62.2C124.1 63.0 117.3 60.1 115.5 60.0ZM122.8 68.5C123.7 68.4 126.1 68.6 127.0 69.0C127.9 69.4 128.2 67.3 128.5 70.8C128.8 74.4 128.9 87.4 128.5 90.2C128.1 92.9 127.1 90.6 126.0 87.2C124.9 83.8 122.2 72.8 121.7 69.7C121.1 66.6 121.9 68.6 122.8 68.5ZM135.8 64.7C137.2 64.2 141.3 65.0 142.8 65.5C144.4 66.0 144.9 62.4 145.0 67.8C145.1 73.3 144.6 90.5 143.7 98.2C142.8 105.8 140.5 112.0 139.5 113.7C138.5 115.3 138.6 115.5 137.8 108.0C137.1 100.5 135.2 75.7 134.8 68.5C134.5 61.3 134.5 65.2 135.8 64.7ZM155.2 55.0C156.8 55.4 161.1 56.5 162.7 57.8C164.2 59.1 165.2 56.5 164.3 62.8C163.5 69.2 159.2 88.3 157.5 96.0C155.8 103.7 154.9 106.3 153.8 108.8C152.8 111.4 151.9 111.5 151.3 111.3C150.8 111.2 150.1 111.9 150.3 107.8C150.6 103.8 152.8 95.0 153.0 86.8C153.2 78.6 151.9 63.9 151.8 58.7C151.8 53.5 152.1 56.3 152.7 55.7C153.2 55.1 153.5 54.6 155.2 55.0Z';
window.FinArt={handMoney:function(cls){var i='fa'+(++n);
 return '<svg class="'+(cls||'')+'" viewBox="47.7 30.7 177.5 165.1" aria-hidden="true" focusable="false"><defs>'
  +'<linearGradient id="'+i+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc98a"/><stop offset=".5" stop-color="#2f9d57"/><stop offset="1" stop-color="#14602f"/></linearGradient>'
  +'<linearGradient id="'+i+'h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d79b6c"/><stop offset="1" stop-color="#bf8559"/></linearGradient></defs>'
  +'<path d="'+H+'" fill="url(#'+i+'h)" fill-rule="evenodd"/><path d="'+B+'" fill="url(#'+i+'g)" fill-rule="evenodd"/></svg>';}};
})();
