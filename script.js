/* ============================================================
   Social Grove — script.js (shared across all pages)
   injects SVG icon sprite · nav scroll · mobile menu · reveal · counters · form
   ============================================================ */
(function () {
  'use strict';

  /* ---- inline SVG sprite (logo + line icons, no emoji) ---- */
  var SPRITE =
  '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<g id="grove-mark" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 40 C18 50 26 54 32 54 C38 54 46 50 50 40"/>' +
      '<path d="M14 40 C12 42 11 44 12 46"/><path d="M50 40 C52 42 53 44 52 46"/>' +
      '<path d="M32 54 L32 40"/>' +
      '<path d="M32 46 C28 44 26 42 26 39 C29 39 31 41 32 44"/>' +
      '<path d="M32 44 C36 42 38 40 38 37 C35 37 33 39 32 42"/>' +
      '<circle cx="20" cy="22" r="7"/><path d="M20 29 L20 18 M20 22 L16 19 M20 23 L24 20"/>' +
      '<circle cx="32" cy="16" r="7"/><path d="M32 23 L32 12 M32 16 L28 13 M32 17 L36 14"/>' +
      '<circle cx="44" cy="22" r="7"/><path d="M44 29 L44 18 M44 22 L40 19 M44 23 L48 20"/>' +
      '<circle cx="26" cy="30" r="6"/><path d="M26 36 L26 27 M26 30 L23 28 M26 31 L29 29"/>' +
      '<circle cx="40" cy="30" r="6"/><path d="M40 36 L40 27 M40 30 L37 28 M40 31 L43 29"/>' +
    '</g>' +
    // 24x24 line icons
    '<g id="ic-people"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><circle cx="16.7" cy="9" r="2.3"/><path d="M15.4 14.3c2.7.4 4.6 2.2 4.6 4.7"/></g>' +
    '<g id="ic-make"><path d="M12 3.2c4.8 0 8 3.2 8 7 0 2.2-1.8 3.6-3.9 3.6h-1.3c-1 0-1.6.9-1.2 1.8.3.7 0 1.6-.7 2-.8.4-1.8.6-2.9.6C6.2 18.2 4 14.8 4 11c0-4.3 3.5-7.8 8-7.8Z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="10.5" r="1"/></g>' +
    '<g id="ic-chat"><path d="M4 5.5h16v10h-9.5L6 19v-3.5H4z"/><path d="M8.5 10.5h7M8.5 13h4.5"/></g>' +
    '<g id="ic-heart"><path d="M12 20S3.7 14.6 3.7 9C3.7 6.2 5.8 4.2 8.3 4.2c1.7 0 3 .9 3.7 2.1.7-1.2 2-2.1 3.7-2.1 2.5 0 4.6 2 4.6 4.8C20.3 14.6 12 20 12 20Z"/></g>' +
    '<g id="ic-leaf"><path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z"/><path d="M5.5 18.5C8.5 14 12 11 16 9"/></g>' +
    '<g id="ic-tree"><path d="M12 21v-6"/><path d="M12 15c-3.6 0-5.2-2.3-5.2-5.2C6.8 6.4 9 3.2 12 .9c3 2.3 5.2 5.5 5.2 8.9C17.2 12.7 15.6 15 12 15Z"/><path d="M12 9.5 9.5 7M12 12l2.6-2.4"/></g>' +
    '<g id="ic-plant"><path d="M6.2 13h11.6l-1.1 7.2H7.3L6.2 13Z"/><path d="M12 13c0-3 1.9-5.2 4.7-5.4-.1 2.9-1.9 4.9-4.7 5.4Z"/><path d="M12 13c0-2.4-1.6-4.1-4.1-4.3.1 2.4 1.6 3.9 4.1 4.3Z"/><path d="M12 13V8.6"/></g>' +
    '<g id="ic-flame"><rect x="7.5" y="11" width="9" height="9.4" rx="1.2"/><path d="M12 11V7.4"/><path d="M12 3.6c1.6 1.6 2.3 2.9 2.3 4.1a2.3 2.3 0 1 1-4.6 0c0-1.2.7-2.5 2.3-4.1Z"/></g>' +
    '<g id="ic-cup"><path d="M5 8h11.5v5.2A5 5 0 0 1 11.5 18h-1.5A5 5 0 0 1 5 13.2V8Z"/><path d="M16.5 9.2h2.2a2 2 0 0 1 0 4h-2.2"/><path d="M8 3.5v2M11 3.5v2M14 3.5v2"/></g>' +
    '<g id="ic-pencil"><path d="M4 20l1.2-4L16 5.2l2.8 2.8L8 18.8 4 20Z"/><path d="M14.2 7l2.8 2.8"/></g>' +
    '<g id="ic-host"><circle cx="10" cy="8" r="3.2"/><path d="M4 19.5c0-3.3 2.7-5.7 6-5.7 1 0 1.9.2 2.7.6"/><path d="M17.5 14v6M14.5 17h6"/></g>' +
    '<g id="ic-check"><path d="M4 12.5l5 5L20 6.5"/></g>' +
    '<g id="ic-arrow"><path d="M5 12h13M12.5 6l6 6-6 6"/></g>' +
    '<g id="ic-quote"><path d="M9.5 7C6.7 8 5.5 10 5.5 13v4h5v-6H7.4c0-1.9.8-2.9 2.1-3.4L9.5 7Zm9 0c-2.8 1-4 3-4 6v4h5v-6h-3.1c0-1.9.8-2.9 2.1-3.4L18.5 7Z"/></g>' +
  '</defs></svg>';
  document.body.insertAdjacentHTML('afterbegin', SPRITE);

  /* ---- nav scroll state ---- */
  var nav = document.getElementById('nav');
  function onScroll(){ if (window.scrollY > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
  window.addEventListener('scroll', onScroll, { passive:true }); onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('navMenu');
  if (burger) {
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:0.12 });
    reveals.forEach(function(el){ io.observe(el); });
  } else { reveals.forEach(function(el){ el.classList.add('in'); }); }

  /* ---- counters ---- */
  var counted = false;
  function runCounters(){
    var stats = document.querySelectorAll('[data-to]');
    if (!stats.length || counted) return;
    if (stats[0].getBoundingClientRect().top > window.innerHeight - 60) return;
    counted = true;
    stats.forEach(function(el){
      var to = parseInt(el.getAttribute('data-to'),10)||0, suffix = el.getAttribute('data-suffix')||'', t0=null;
      function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/1400,1); var e=1-Math.pow(1-p,3);
        el.textContent = Math.round(to*e)+suffix; if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }
  window.addEventListener('scroll', runCounters, { passive:true }); runCounters();

  /* ---- join form ---- */
  window.SG = window.SG || {};
  window.SG.submit = function(e){
    e.preventDefault();
    var note = document.getElementById('joinNote');
    if (note){ note.textContent = '신청 완료! 가장 가까운 그로브 소식을 보내드릴게요. 함께해줘서 고마워요.'; note.classList.add('ok'); }
    e.target.reset();
    return false;
  };
})();
