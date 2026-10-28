/* Fin dock: rests in the dashboard's main card at the top of the page,
   glides to his usual corner once you scroll past it, and glides back. */
(function(){
  'use strict';
  var GLIDE_MS=520, TOP_GAP=64, root=null, docked=null, glideT=null, raf=0;
  function reduced(){return window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;}
  function size(){var r=root.getBoundingClientRect();return {w:r.width,h:r.height};}
  function corner(){
    var s=size(),pos=null;
    try{pos=JSON.parse(localStorage.getItem('finPetPos')||'null');}catch(e){}
    if(!pos){try{
      for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);
        if(/pos/i.test(k)&&/fin/i.test(k)){var v=JSON.parse(localStorage.getItem(k));if(v&&typeof v.x==='number'){pos=v;break;}}}
    }catch(e){}}
    var x=pos?pos.x:window.innerWidth-18-s.w, y=pos?pos.y:window.innerHeight-22-s.h;
    return {x:Math.max(4,Math.min(x,window.innerWidth-s.w-4)),y:Math.max(4,Math.min(y,window.innerHeight-s.h-4))};
  }
  function place(x,y){root.style.right='auto';root.style.bottom='auto';root.style.left=x+'px';root.style.top=y+'px';}
  function glide(){
    if(reduced())return;
    root.classList.add('fin-glide');clearTimeout(glideT);
    glideT=setTimeout(function(){root.classList.remove('fin-glide');},GLIDE_MS+40);
  }
  function update(){
    raf=0;
    if(!root||root.classList.contains('fin-dragging')||root.classList.contains('fin-minimized'))return;
    var slot=document.getElementById('fin-slot'),dash=document.getElementById('dashboard');
    var on=!!(slot&&dash&&dash.classList.contains('active')&&slot.offsetParent);
    var s=size();
    if(on){slot.style.width=s.w+'px';slot.style.height=s.h+'px';}
    var r=on?slot.getBoundingClientRect():null;
    var want=!!(r&&r.top>=TOP_GAP&&r.bottom<=window.innerHeight);
    if(want!==docked){docked=want;glide();}
    if(want)place(r.left,r.top);else{var c=corner();place(c.x,c.y);}
    root.classList.toggle('fin-docked',want);
    fitBubble();
  }
  // Keep the speech bubble on screen: if it would poke out of the left or top edge, open it the other way.
  function fitBubble(){
    if(!root)return;
    var b=root.querySelector('.fin-bubble');
    if(!b||!b.classList.contains('fin-show')||root.classList.contains('fin-docked'))return;
    root.classList.remove('fin-bub-flip');
    var r=b.getBoundingClientRect();
    if(r.left<6||r.top<6)root.classList.add('fin-bub-flip');
  }
  function queue(){if(!raf)raf=requestAnimationFrame(update);}
  function boot(){
    root=document.getElementById('fin-pet-root');
    if(!root)return false;
    window.addEventListener('scroll',queue,{passive:true});
    window.addEventListener('resize',queue);
    var snap=document.getElementById('month-snapshot'),dash=document.getElementById('dashboard');
    if(snap)new MutationObserver(function(){docked=null;queue();}).observe(snap,{childList:true});
    if(dash)new MutationObserver(function(){docked=null;queue();}).observe(dash,{attributes:true,attributeFilter:['class']});
    root.addEventListener('transitionend',queue);
    var bub=root.querySelector('.fin-bubble');
    if(bub){
      new MutationObserver(fitBubble).observe(bub,{attributes:true,attributeFilter:['class']});
      window.addEventListener('resize',fitBubble);
    }
    queue();return true;
  }
  var tries=0,t=setInterval(function(){if(boot()||++tries>40)clearInterval(t);},500);
})();
