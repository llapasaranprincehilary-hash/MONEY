/* Fin on the opening screens ("Word for Today" splash, sign-in / PIN).
   The real Fin floats above everything (z-index 1200) and used to sit on top of the
   "Let's go" button. While one of those full-screen gates is up we now:
     1. hide the real Fin (no clicks, no bubbles in the way), and
     2. show a faint, non-clickable copy of him in the BACKGROUND of the splash,
        gently bobbing and blinking, behind all of the splash content.
   When the gate closes the real Fin fades back in. Safe to delete this file + its
   <script> tag + the "fin-ambient" block at the bottom of pet.css. */
(function(){
  'use strict';
  var FIN_X='center';
  var GATES=['welcome-splash','auth-overlay'];
  var covered=false, ghost=null, blinkT=0, fillT=0, revealT=0;

  function shown(id){
    var e=document.getElementById(id);
    if(!e)return false;
    try{return getComputedStyle(e).display!=='none' && e.style.display!=='none';}catch(x){return false;}
  }
  function anyGate(){return GATES.some(shown);}

  /* ---- the background copy ---- */
  function ensureGhost(){
    var splash=document.getElementById('welcome-splash');
    if(!splash)return;
    if(!ghost){
      ghost=document.createElement('div');
      ghost.id='splash-fin';
      ghost.setAttribute('aria-hidden','true');
      splash.appendChild(ghost);
    }
    if(ghost.firstChild)return;
    var src=document.getElementById('fin-sprite');
    if(!src){ // Fin hasn't been built yet: try again shortly
      clearTimeout(fillT);fillT=setTimeout(function(){if(covered)ensureGhost();},400);
      return;
    }
    var c=src.cloneNode(true);
    c.removeAttribute('id');c.setAttribute('data-anim','idle');
    c.setAttribute('focusable','false');
    ghost.appendChild(c);
    place();
  }
  /* sit on the card's top-left corner; offsetTop/Left ignore the entrance transform, and an
     absolutely-positioned child of the (scrolling) splash scrolls with its content */
  function place(){
    var splash=document.getElementById('welcome-splash'),card=document.getElementById('splash-card');
    if(!ghost||!splash||!card)return;
    var x=0,y=0,n=card;
    while(n&&n!==splash){x+=n.offsetLeft;y+=n.offsetTop;n=n.offsetParent;}
    var s=ghost.offsetWidth||46;
    /* FIN_X: 'center' = on the card's centre axis (symmetrical, default); 'left' = over its top-left corner */
    var fx=FIN_X==='left'?Math.min(34,card.offsetWidth*.1):(card.offsetWidth-s)/2;
    ghost.style.left=Math.round(x+fx)+'px';
    ghost.style.top=Math.round(y-s*.84)+'px';   /* ~85% of him above the card edge when popped up */
    ghost.classList.add('fin-placed');
  }
  function blinkLoop(){
    clearTimeout(blinkT);
    if(!covered||!ghost||!ghost.firstChild)return;
    var s=ghost.firstChild,n=0;
    (function once(){
      s.setAttribute('data-anim','blink');
      setTimeout(function(){
        s.setAttribute('data-anim','idle');
        if(++n<2)setTimeout(once,150);
      },200);
    })();
    blinkT=setTimeout(blinkLoop,3800+Math.random()*3200);
  }

  /* ---- state ---- */
  function sync(){
    var now=anyGate();
    if(now===covered)return;
    covered=now;
    var b=document.body;
    if(!b)return;
    b.classList.toggle('fin-covered',covered);
    if(covered){
      clearTimeout(revealT);b.classList.remove('fin-reveal');
      if(shown('welcome-splash')){ensureGhost();clearTimeout(blinkT);blinkT=setTimeout(blinkLoop,1800);}
    }else{
      clearTimeout(blinkT);
      b.classList.add('fin-reveal');                       // real Fin fades back in
      revealT=setTimeout(function(){b.classList.remove('fin-reveal');},700);
    }
  }
  function watch(){
    var mo=new MutationObserver(sync),any=false;
    GATES.forEach(function(id){
      var e=document.getElementById(id);
      if(e){mo.observe(e,{attributes:true,attributeFilter:['style','class']});any=true;}
    });
    sync();
    return any;
  }
  function boot(){
    watch();
    window.addEventListener('resize',place);
    window.addEventListener('orientationchange',function(){setTimeout(place,150);});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);
    setInterval(function(){if(covered)place();},700);
    // gates can be shown by the app a moment after load; a light poll is a cheap safety net
    setInterval(sync,500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
