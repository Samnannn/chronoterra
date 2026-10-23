/* CHRONOTERRA — interactions. Vanilla JS, no dependencies. Every feature degrades gracefully without JS. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* storage unavailable */ } },
  };
  var money = function (n) { return 'TC ' + Math.round(n).toLocaleString('en-US'); };
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------------------------------------------------------------- header & nav */
  (function nav() {
    var header = $('.site-header');
    var toggle = $('.nav-toggle');
    var more = $('.nav__more');
    var moreBtn = $('.nav__more-btn');
    var isMobile = function () { return window.matchMedia('(max-width: 960px)').matches; };

    function closeMenu() {
      document.body.classList.remove('nav-open');
      if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
    }
    function setMore(open) {
      if (!more) return;
      more.classList.toggle('is-open', open);
      moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = !document.body.classList.contains('nav-open');
        document.body.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (open) { var first = $('.nav__link'); if (first && isMobile()) first.focus({ preventScroll: true }); }
      });
    }
    if (moreBtn) {
      moreBtn.addEventListener('click', function (e) { e.stopPropagation(); setMore(!more.classList.contains('is-open')); });
      more.addEventListener('mouseenter', function () { if (!isMobile()) setMore(true); });
      more.addEventListener('mouseleave', function () { if (!isMobile()) setMore(false); });
      more.addEventListener('focusout', function (e) { if (!more.contains(e.relatedTarget)) setMore(false); });
      document.addEventListener('click', function (e) { if (!more.contains(e.target)) setMore(false); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (more && more.classList.contains('is-open')) { setMore(false); moreBtn.focus(); }
      if (document.body.classList.contains('nav-open')) { closeMenu(); toggle.focus(); }
    });
    $$('.nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    window.addEventListener('resize', function () { if (!isMobile()) closeMenu(); });

    var solidAt = 24;
    var topBtn = $('.to-top');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle('is-solid', y > solidAt);
      if (topBtn) {
        var show = y > window.innerHeight * 1.2;
        topBtn.hidden = false;
        topBtn.classList.toggle('is-visible', show);
        topBtn.tabIndex = show ? 0 : -1;
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
  })();

  /* ---------------------------------------------------------------- reveal on scroll */
  (function reveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ---------------------------------------------------------------- hero ticker + clock */
  (function hero() {
    var hero = $('.hero');
    if (!hero) return;
    var clock = $('[data-clock]');
    function tick() {
      var d = new Date();
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      clock.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
      clock.setAttribute('datetime', d.toISOString());
    }
    if (clock) { tick(); setInterval(tick, 1000); }

    var eras;
    try { eras = JSON.parse(hero.getAttribute('data-eras')); } catch (e) { return; }
    var rail = $('.rail', hero);
    var f = { coord: $('[data-ticker="coord"]'), era: $('[data-ticker="era"]'), exp: $('[data-ticker="exp"]'), drift: $('[data-ticker="drift"]') };
    var i = eras.findIndex(function (e) { return e.year === '1631 CE'; });
    if (i < 0) i = 0;
    function show(n) {
      var e = eras[n];
      f.coord.textContent = e.coord;
      f.era.textContent = e.year + ' · ' + e.place;
      f.exp.textContent = e.exp;
      f.drift.textContent = e.drift;
    }
    show(i);
    if (reduceMotion) return;
    setInterval(function () {
      if (document.hidden) return;
      rail.classList.add('is-swapping');
      setTimeout(function () { i = (i + 1) % eras.length; show(i); rail.classList.remove('is-swapping'); }, 420);
    }, 4600);
  })();

  /* ---------------------------------------------------------------- route finder */
  (function route() {
    var ui = $('[data-route]');
    if (!ui) return;
    var nodes = $$('.route__node', ui);
    var panels = $$('.route__panel', ui);
    var chips = $$('[data-filter]', ui);
    var current = null;

    function select(id, focus) {
      current = id;
      nodes.forEach(function (n) { n.setAttribute('aria-pressed', n.getAttribute('data-id') === id ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== id; });
      if (focus) { var n = nodes.filter(function (x) { return x.getAttribute('data-id') === id; })[0]; if (n) n.focus(); }
    }
    function filter(group) {
      chips.forEach(function (c) { var on = c.getAttribute('data-filter') === group; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      var first = null;
      nodes.forEach(function (n) {
        var ok = group === 'all' || n.getAttribute('data-group') === group;
        n.disabled = !ok;
        if (ok && !first) first = n.getAttribute('data-id');
      });
      var cur = nodes.filter(function (n) { return n.getAttribute('data-id') === current; })[0];
      if (!cur || cur.disabled) select(first);
    }
    nodes.forEach(function (n) {
      n.addEventListener('click', function () { select(n.getAttribute('data-id')); });
      n.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var live = nodes.filter(function (x) { return !x.disabled; });
        var idx = live.indexOf(n) + (e.key === 'ArrowRight' ? 1 : -1);
        if (idx >= 0 && idx < live.length) { e.preventDefault(); select(live[idx].getAttribute('data-id'), true); }
      });
    });
    chips.forEach(function (c) { c.addEventListener('click', function () { filter(c.getAttribute('data-filter')); }); });
    select('mughal-court');
  })();

  /* ---------------------------------------------------------------- destination filters */
  (function destFilters() {
    var list = $('[data-dest-list]');
    if (!list) return;
    var items = $$('.dest', list);
    var chips = $$('.filterbar .chip');
    var count = $('[data-count]');
    var empty = $('[data-empty]', list);
    var state = { kind: 'all', band: 'all' };

    function apply() {
      var n = 0;
      items.forEach(function (it) {
        var ok = (state.kind === 'all' || it.dataset.kind === state.kind) && (state.band === 'all' || it.dataset.band === state.band);
        it.hidden = !ok;
        if (ok) n++;
      });
      count.textContent = n;
      empty.hidden = n !== 0;
      chips.forEach(function (c) {
        var on = state[c.dataset.group] === c.dataset.value;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { state[c.dataset.group] = c.dataset.value; apply(); }); });
    var reset = $('[data-reset]', list);
    if (reset) reset.addEventListener('click', function () { state.kind = 'all'; state.band = 'all'; apply(); });
    // Timeline links to a filtered-out destination should still work.
    $$('.ruler a').forEach(function (a) {
      a.addEventListener('click', function () {
        var t = document.getElementById(a.getAttribute('href').slice(1));
        if (t && t.hidden) { state.kind = 'all'; state.band = 'all'; apply(); }
      });
    });
  })();

  /* ---------------------------------------------------------------- checklists (advisories + packing) */
  (function checklists() {
    $$('[data-checklist]').forEach(function (box) {
      var key = box.getAttribute('data-checklist');
      var inputs = $$('input[type="checkbox"][data-item]', box);
      var total = inputs.length;
      var txt = $('[data-progress-text]', box);
      var bar = $('[data-progress-bar]', box);
      var pct = $('[data-progress-pct]', box);
      var msg = $('[data-progress-msg]', box);
      var ring = $('.ring__bar', box);
      var saved = store.get(key) || [];
      var packing = !!pct;

      function render() {
        var done = inputs.filter(function (i) { return i.checked; }).length;
        var p = total ? Math.round((done / total) * 100) : 0;
        if (txt) txt.textContent = packing ? done + ' of ' + total + ' packed' : done + ' of ' + total;
        if (bar) bar.style.width = p + '%';
        if (pct) pct.textContent = p + '%';
        if (ring) ring.style.strokeDashoffset = String(326.7 * (1 - p / 100));
        if (msg) msg.textContent = done === 0 ? 'Nothing packed yet. A bold choice.' : p < 50 ? 'A promising start. Keep going.' : p < 100 ? 'Nearly there. Check the emergency kit twice.' : 'Fully packed. The centuries await.';
      }
      inputs.forEach(function (i) {
        i.checked = saved.indexOf(i.getAttribute('data-item')) > -1;
        i.addEventListener('change', function () {
          store.set(key, inputs.filter(function (x) { return x.checked; }).map(function (x) { return x.getAttribute('data-item'); }));
          render();
        });
      });
      var reset = $('[data-reset]', box);
      if (reset) reset.addEventListener('click', function () { inputs.forEach(function (i) { i.checked = false; }); store.del(key); render(); });
      render();
    });
  })();

  /* ---------------------------------------------------------------- FAQ search / expand */
  (function faq() {
    var root = $('[data-faq]');
    if (!root) return;
    var items = $$('.faq__item', root);
    var groups = $$('[data-group]', root);
    var input = $('#faq-search', root);
    var count = $('[data-faq-count]', root);
    var empty = $('[data-faq-empty]', root);
    function run() {
      var words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      var n = 0;
      items.forEach(function (it) {
        var t = it.textContent.toLowerCase();
        var ok = words.every(function (w) { return t.indexOf(w) > -1; });
        it.hidden = !ok;
        if (ok) n++;
      });
      groups.forEach(function (g) { g.hidden = !$$('.faq__item', g).some(function (i) { return !i.hidden; }); });
      count.textContent = n;
      empty.hidden = n !== 0;
    }
    input.addEventListener('input', run);
    $('[data-expand]', root).addEventListener('click', function () { items.forEach(function (i) { if (!i.hidden) i.open = true; }); });
    $('[data-collapse]', root).addEventListener('click', function () { items.forEach(function (i) { i.open = false; }); });
    // Open the first answer so the page never looks empty.
    if (items[0]) items[0].open = true;
  })();

  /* ---------------------------------------------------------------- advisories: active section in the side nav */
  (function advNav() {
    var links = $$('.adv-nav a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  })();


  /* ---------------------------------------------------------------- enchanted embers (decorative) */
  (function embers() {
    if (reduceMotion) return;
    var hosts = $$('.hero, .invitation, .detail-hero, .article-hero, .page-hero--ink, .dest--dawn, .dest--wifi');
    if (!hosts.length) return;
    var small = window.matchMedia('(max-width: 700px)').matches;
    hosts.forEach(function (host) {
      var c = document.createElement('canvas');
      c.className = 'embers'; c.setAttribute('aria-hidden', 'true');
      host.insertBefore(c, host.firstChild);
      var ctx = c.getContext('2d');
      var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), parts = [], visible = true, raf = 0;
      function size() {
        var r = host.getBoundingClientRect(); w = r.width; h = r.height;
        c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.round(Math.min(70, (w * h) / (small ? 16000 : 22000)));
        parts = [];
        for (var i = 0; i < n; i++) parts.push(spawn(true));
      }
      function spawn(any) {
        return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, r: 0.6 + Math.random() * 1.9, vy: 0.12 + Math.random() * 0.4, sw: Math.random() * 6.28, sp: 0.004 + Math.random() * 0.012, a: 0.25 + Math.random() * 0.65, hue: Math.random() < 0.82 ? 42 : 188 };
      }
      function frame(t) {
        raf = 0;
        if (!visible || document.hidden) return;
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          p.y -= p.vy; p.sw += p.sp; p.x += Math.sin(p.sw) * 0.35;
          if (p.y < -10) parts[i] = spawn(false);
          var tw = 0.55 + 0.45 * Math.sin(t / 700 + p.sw * 3);
          var a = p.a * tw;
          var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          g.addColorStop(0, 'hsla(' + p.hue + ',80%,78%,' + a + ')');
          g.addColorStop(0.35, 'hsla(' + p.hue + ',80%,62%,' + a * 0.35 + ')');
          g.addColorStop(1, 'hsla(' + p.hue + ',80%,60%,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, 6.2832); ctx.fill();
        }
        raf = requestAnimationFrame(frame);
      }
      function start() { if (!raf && visible) raf = requestAnimationFrame(frame); }
      size();
      var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
      document.addEventListener('visibilitychange', start);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }, { threshold: 0 }).observe(host);
      }
      start();
    });
  })();

  /* ---------------------------------------------------------------- booking prototype */
  (function booking() {
    var form = $('#booking-form');
    var CT = window.CT;
    if (!form || !CT) return;

    var dests = {}; CT.destinations.forEach(function (d) { dests[d.id] = d; });
    var classes = {}; CT.classes.forEach(function (c) { classes[c.id] = c; });
    var prefs = {}; CT.prefs.forEach(function (p) { prefs[p.id] = p; });
    var pkgs = {}; CT.packages.forEach(function (p) { pkgs[p.id] = p; });

    var summary = $('#summary');
    var sEmpty = $('[data-summary-empty]', summary);
    var sFull = $('[data-summary-full]', summary);
    var errBox = $('#form-errors');
    var dateEl = $('#date');
    var travEl = $('#travellers');
    var aliasEl = $('#alias');
    var confirmEl = $('#confirmation');
    var submitted = false;

    /* dates */
    function ymd(d) { var p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var max = new Date(today); max.setFullYear(max.getFullYear() + 3);
    dateEl.min = ymd(today); dateEl.max = ymd(max);

    function state() {
      var fd = new FormData(form);
      return {
        dest: fd.get('dest') || '', date: fd.get('date') || '', travellers: parseInt(fd.get('travellers'), 10) || 0,
        days: parseInt(fd.get('days'), 10) || 0, cls: fd.get('cls') || 'voyager', prefs: fd.getAll('prefs'), alias: String(fd.get('alias') || '').trim(),
      };
    }

    function cost(s) {
      var d = dests[s.dest], c = classes[s.cls];
      var t = Math.min(6, Math.max(1, s.travellers || 1));
      var days = s.days || d.days;
      var passage = d.perDay * days * t;
      var lines = [{ l: 'Passage', sub: t + ' traveller' + (t > 1 ? 's' : '') + ' × ' + days + ' day' + (days > 1 ? 's' : '') + ' × ' + money(d.perDay), a: passage }];
      var supp = Math.round(passage * (c.mult - 1));
      if (supp > 0) lines.push({ l: c.name + ' class supplement', sub: '×' + c.mult.toFixed(2) + ' on passage', a: supp });
      lines.push({ l: 'Temporal displacement levy', sub: money(d.levy) + ' per traveller', a: d.levy * t });
      lines.push({ l: 'Chrono-jet-lag cover', sub: '5% of passage', a: Math.round(passage * 0.05) });
      s.prefs.forEach(function (id) {
        var p = prefs[id]; if (!p || !p.price) return;
        var mult = p.per === 'day' ? days : p.per === 'traveller' ? t : 1;
        lines.push({ l: p.label, sub: money(p.price) + ' per ' + p.per, a: p.price * mult });
      });
      var total = lines.reduce(function (n, x) { return n + x.a; }, 0);
      return { lines: lines, total: total };
    }

    function riskHtml(d) {
      var pips = '';
      for (var i = 1; i <= 5; i++) pips += '<i' + (i <= d.risk ? ' class="on"' : '') + '></i>';
      return '<span class="risk risk--' + d.risk + '" role="img" aria-label="Temporal risk: Class ' + ROMAN[d.risk] + ', ' + d.riskName + ' (' + d.risk + ' of 5)"><span class="risk__label">Temporal risk</span><span class="risk__pips" aria-hidden="true">' + pips + '</span><span class="risk__class">Class ' + ROMAN[d.risk] + ' · ' + d.riskName + '</span></span>';
    }

    /* duration availability per destination */
    function syncDurations(s) {
      var d = dests[s.dest];
      var radios = $$('input[name="days"]', form);
      var help = $('#dur-help');
      if (!d) { radios.forEach(function (r) { r.disabled = false; }); help.textContent = 'Choose a destination to see its available durations.'; return; }
      var cur = radios.filter(function (r) { return r.checked; })[0];
      radios.forEach(function (r) { r.disabled = d.allowedDays.indexOf(parseInt(r.value, 10)) < 0; });
      if (!cur || cur.disabled) {
        var pick = radios.filter(function (r) { return parseInt(r.value, 10) === d.days && !r.disabled; })[0] || radios.filter(function (r) { return !r.disabled; })[0];
        if (pick) pick.checked = true;
      }
      var extra = d.id === 'the-first-dawn' ? ' Only forty minutes of that is spent outside the capsule.' : d.id === 'last-day-of-wifi' ? ' The Last Day lasts 24 hours; three days adds “the Silence.”' : '';
      help.textContent = d.short + ' allows ' + d.allowedDays.join(', ') + ' day' + (d.allowedDays.length > 1 ? 's' : '') + '. Recommended: ' + d.days + '.' + extra;
    }

    function renderSummary() {
      var s = state();
      syncDurations(s);
      s = state();
      var d = dests[s.dest];
      var mini = $('[data-mini]');
      if (!d) { sEmpty.hidden = false; sFull.hidden = true; if (mini) mini.hidden = true; return; }
      sEmpty.hidden = true; sFull.hidden = false;
      var mdW = Math.round(900);
      $('[data-s-img]', summary).innerHTML = '<img src="assets/img/' + d.image + '-md.jpg" srcset="assets/img/' + d.image + '-md.jpg 900w, assets/img/' + d.image + '-lg.jpg 1800w" sizes="(min-width: 960px) 40vw, 100vw" alt="Photograph representing ' + esc(d.name) + '" style="object-position:' + d.pos + '" width="900" height="600">';
      $('[data-s-kind]', summary).innerHTML = '<span class="tag tag--' + d.kind + '">' + esc(d.kindLabel) + '</span>';
      $('[data-s-name]', summary).textContent = d.name;
      $('[data-s-era]', summary).textContent = d.eraLine + ' · ' + d.coords;
      $('[data-s-risk]', summary).innerHTML = riskHtml(d);
      $('[data-s-hazard]', summary).textContent = d.hazard;
      var days = s.days || d.days;
      $('[data-s-itin]', summary).innerHTML = d.itinerary.map(function (m) {
        var label = days === 1 ? m.t : 'Day ' + (Math.round(m.at * (days - 1)) + 1);
        return '<li><b>' + esc(label) + '</b><span><strong>' + esc(m.h) + '</strong>' + esc(m.p) + '</span></li>';
      }).join('');
      var c = cost(s);
      $('[data-s-cost]', summary).innerHTML = c.lines.map(function (x) { return '<tr><th scope="row">' + esc(x.l) + '<small>' + esc(x.sub) + '</small></th><td>' + money(x.a) + '</td></tr>'; }).join('');
      $('[data-s-total]', summary).textContent = money(c.total);
      if (mini) { mini.hidden = false; $('[data-mini-name]').textContent = d.short || d.name; $('[data-mini-total]').textContent = money(c.total); }
    }

    /* validation */
    function validate() {
      var s = state(), errs = [];
      function setErr(id, el, msg) {
        var p = $('#' + id);
        if (p) { p.hidden = !msg; p.textContent = msg || ''; }
        if (el) { if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); }
        if (msg) errs.push({ id: id, el: el, msg: msg });
      }
      var firstRadio = $('input[name="dest"]', form);
      setErr('err-dest', null, dests[s.dest] ? '' : 'Choose a destination to continue.');
      if (!dests[s.dest]) errs[errs.length - 1].el = firstRadio;
      var dm = '';
      if (!s.date) dm = 'Choose a departure date.';
      else {
        var parts = s.date.split('-').map(Number); var dt = new Date(parts[0], parts[1] - 1, parts[2]);
        if (isNaN(dt.getTime())) dm = 'That date does not look right.';
        else if (dt < today) dm = 'Departures must be today or later. Backward travel is a separate department.';
        else if (dt > max) dm = 'The concierge books up to three years ahead.';
      }
      setErr('err-date', dateEl, dm);
      var tn = parseInt(travEl.value, 10);
      var tm = (tn >= 1 && tn <= 6) ? '' : 'Choose between 1 and 6 travellers.';
      if (tm) { travEl.setAttribute('aria-invalid', 'true'); errs.push({ id: 'travellers', el: travEl, msg: tm }); } else travEl.removeAttribute('aria-invalid');
      if (dests[s.dest] && dests[s.dest].allowedDays.indexOf(s.days) < 0) errs.push({ id: 'dur-group', el: $('input[name="days"]:not(:disabled)', form), msg: 'Choose an available journey duration.' });
      setErr('err-alias', aliasEl, s.alias.length >= 2 ? '' : 'Enter a traveller alias (at least 2 characters).');
      return errs;
    }
    function showErrors(errs) {
      if (!errs.length) { errBox.hidden = true; errBox.innerHTML = ''; return; }
      errBox.hidden = false;
      errBox.innerHTML = '<strong>Please check ' + errs.length + ' thing' + (errs.length > 1 ? 's' : '') + ' before we review your journey</strong><ul>' + errs.map(function (e, i) { return '<li><a href="#' + (e.el && e.el.id ? e.el.id : e.id) + '" data-err="' + i + '">' + esc(e.msg) + '</a></li>'; }).join('') + '</ul>';
      $$('a[data-err]', errBox).forEach(function (a) {
        a.addEventListener('click', function (ev) { ev.preventDefault(); var el = errs[+a.getAttribute('data-err')].el; if (el) { el.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); el.focus({ preventScroll: true }); } });
      });
    }

    /* confirmation */
    function hash(str) { var h = 5381; for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; return h.toString(36).toUpperCase().padStart(4, '0').slice(-4); }
    function fillPass(s) {
      var d = dests[s.dest], c = classes[s.cls], t = Math.min(6, Math.max(1, s.travellers));
      var parts = s.date.split('-').map(Number);
      var dt = new Date(parts[0], parts[1] - 1, parts[2]);
      var set = function (k, v) { $('[data-c-' + k + ']', confirmEl).textContent = v; };
      set('name', d.name); set('era', d.eraLine); set('alias', s.alias);
      set('date', dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }));
      set('party', t + ' traveller' + (t > 1 ? 's' : '')); set('class', c.name); set('days', s.days + ' day' + (s.days > 1 ? 's' : ''));
      set('coords', d.coords);
      $('[data-c-risk]', confirmEl).innerHTML = riskHtml(d);
      set('prefs', s.prefs.length ? s.prefs.map(function (id) { return prefs[id].label; }).join(', ') : 'None');
      set('ref', d.expedition.replace('CT-', '') + '-' + hash(s.dest + s.date + s.alias + s.days + s.cls + t));
      set('total', money(cost(s).total));
    }
    function showConfirm(on) {
      var mn = $('[data-mini]'); if (mn && on) mn.hidden = true;
      $('[data-packages]').hidden = on;
      $('#plan').hidden = on;
      confirmEl.hidden = !on;
      if (on) { confirmEl.scrollIntoView({ behavior: 'auto' }); confirmEl.focus({ preventScroll: true }); }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitted = true;
      var errs = validate();
      showErrors(errs);
      if (errs.length) { errBox.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); errBox.focus({ preventScroll: true }); return; }
      fillPass(state());
      showConfirm(true);
    });
    form.addEventListener('input', function () { renderSummary(); if (submitted) showErrors(validate()); });
    form.addEventListener('change', function () { renderSummary(); if (submitted) showErrors(validate()); });
    $$('[data-step]', form).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = (parseInt(travEl.value, 10) || 1) + parseInt(b.getAttribute('data-step'), 10);
        travEl.value = Math.min(6, Math.max(1, v));
        travEl.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });
    $('[data-edit]', confirmEl).addEventListener('click', function () { showConfirm(false); $('#plan').scrollIntoView({ behavior: 'auto' }); });
    $('[data-new]', confirmEl).addEventListener('click', function () {
      form.reset(); submitted = false; showErrors([]); $$('[aria-invalid]', form).forEach(function (x) { x.removeAttribute('aria-invalid'); });
      $$('.field__error', form).forEach(function (x) { x.hidden = true; });
      renderSummary(); showConfirm(false); $('#plan').scrollIntoView({ behavior: 'auto' });
    });

    /* packages */
    function applyPackage(id, scroll) {
      var p = pkgs[id]; if (!p) return;
      var r = $('input[name="dest"][value="' + p.dest + '"]', form); if (r) r.checked = true;
      syncDurations(state());
      var dr = $('input[name="days"][value="' + p.days + '"]', form); if (dr && !dr.disabled) dr.checked = true;
      var cr = $('input[name="cls"][value="' + p.cls + '"]', form); if (cr) cr.checked = true;
      $$('input[name="prefs"]', form).forEach(function (c) { c.checked = p.prefs.indexOf(c.value) > -1; });
      renderSummary();
      if (scroll) { $('#plan').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); setTimeout(function () { dateEl.focus({ preventScroll: true }); }, reduceMotion ? 0 : 600); }
    }
    $$('[data-package]').forEach(function (b) { b.addEventListener('click', function () { applyPackage(b.getAttribute('data-package'), true); }); });
    CT.packages.forEach(function (p) {
      var el = $('[data-pkg-price="' + p.id + '"]');
      if (!el) return;
      var total = cost({ dest: p.dest, days: p.days, cls: p.cls, travellers: 1, prefs: p.prefs }).total;
      el.innerHTML = money(total) + ' <small style="font-family:var(--sans);font-size:.75rem;color:var(--muted)">per traveller · illustrative</small>';
    });

    /* deep links: booking.html?dest=… or ?pkg=… */
    var q = new URLSearchParams(window.location.search);
    if (q.get('pkg') && pkgs[q.get('pkg')]) { applyPackage(q.get('pkg'), false); $('#plan').scrollIntoView({ behavior: 'auto' }); }
    else if (q.get('dest') && dests[q.get('dest')]) {
      var pre = $('input[name="dest"][value="' + q.get('dest') + '"]', form);
      if (pre) { pre.checked = true; var dd = dests[q.get('dest')]; syncDurations(state()); var rr = $('input[name="days"][value="' + dd.days + '"]', form); if (rr && !rr.disabled) rr.checked = true; $('#plan').scrollIntoView({ behavior: 'auto' }); }
    }
    renderSummary();
  })();
})();
