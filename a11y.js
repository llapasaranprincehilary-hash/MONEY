/* Keyboard access: anything made clickable with onclick on a non-button element
   (spans, divs, cards) becomes focusable, gets role=button, and answers Enter/Space. */
(function(){
  'use strict';
  var SEL='[onclick]:not(button):not(a):not(input):not(select):not(textarea):not(summary):not([tabindex]):not([role])';
  var SKIP=/overlay|backdrop|scrim|modal-bg/i, REAL=/^(BUTTON|A|INPUT|SELECT|TEXTAREA|SUMMARY)$/;
  function named(el){return (el.textContent||'').trim()||el.getAttribute('aria-label')||el.getAttribute('title');}
  function enhance(){
    document.querySelectorAll(SEL).forEach(function(el){
      if(SKIP.test(el.className||'')||el.hidden||el.closest('[aria-hidden="true"]'))return;
      if(!named(el))return;
      el.setAttribute('role','button');el.setAttribute('tabindex','0');
    });
  }
  document.addEventListener('keydown',function(e){
    if(e.key!=='Enter'&&e.key!==' ')return;
    var el=e.target;
    if(!el||el.nodeType!==1||REAL.test(el.tagName))return;
    if(el.getAttribute('role')==='button'&&el.hasAttribute('onclick')){e.preventDefault();el.click();}
  });
  var raf=0;
  function queue(){if(!raf)raf=requestAnimationFrame(function(){raf=0;enhance();});}
  function start(){enhance();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
