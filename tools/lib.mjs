// Shared components and helpers for the CHRONOTERRA static-site generator.
import { IMAGES, RISK, KINDS } from './content.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const roman = (n) => ['', 'I', 'II', 'III', 'IV', 'V'][n];
export const money = (n) => 'TC ' + Math.round(n).toLocaleString('en-US');

/* ---------- Images ---------- */
export function img(key, { alt, cls = '', sizes = '100vw', eager = false, pos } = {}) {
  const m = IMAGES[key];
  if (!m) throw new Error('Unknown image key: ' + key);
  const mdW = key === 'hero' ? 1400 : Math.round(Math.min(900, (1200 * m.w) / m.h));
  const attrs = [
    cls ? `class="${cls}"` : '',
    `src="assets/img/${key}-md.jpg"`,
    `srcset="assets/img/${key}-md.jpg ${mdW}w, assets/img/${key}-lg.jpg ${m.w}w"`,
    `sizes="${sizes}"`,
    `width="${m.w}" height="${m.h}"`,
    `alt="${esc(alt ?? m.alt)}"`,
    eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"',
    pos ? `style="object-position:${pos}"` : '',
  ].filter(Boolean);
  return `<img ${attrs.join(' ')}>`;
}

/* ---------- SVG motifs ---------- */
export const logoMark = `<svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="16" cy="16" rx="13.5" ry="5.2" transform="rotate(-28 16 16)" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="26.7" cy="8.2" r="2.1" fill="var(--gold)"/><path d="M16 1.2v3M16 27.8v3" stroke="currentColor" stroke-width="1"/></svg>`;

let stampN = 0;
export function stamp(center, top = 'CHRONOTERRA · VERIFIED EXPEDITION · TEMPORAL TOURISM BOARD · ', cls = '') {
  const id = 'stp' + ++stampN;
  return `<svg class="stamp ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><path id="${id}" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs><circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" stroke-width=".8"/><text font-family="var(--mono)" font-size="7.4" fill="currentColor"><textPath href="#${id}" textLength="276" lengthAdjust="spacing">${esc(top)}</textPath></text><text x="60" y="64" text-anchor="middle" font-family="var(--serif)" font-size="17" fill="currentColor">${esc(center)}</text><path d="M44 74h32" stroke="currentColor" stroke-width=".8"/></svg>`;
}

// The temporal portal: an astrolabe-like ring of ticks, orbits and era markers.
export function portalRing() {
  const cx = 400;
  const pt = (r, deg) => [cx + r * Math.sin((deg * Math.PI) / 180), cx - r * Math.cos((deg * Math.PI) / 180)];
  let ticks = '';
  for (let d = 0; d < 360; d += 2) {
    const major = d % 10 === 0;
    const [x1, y1] = pt(392, d);
    const [x2, y2] = pt(major ? 372 : 382, d);
    ticks += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  const eras = [
    { d: 14, l: '−4.5 Ga' },
    { d: 72, l: '200 BCE' },
    { d: 138, l: '1631' },
    { d: 188, l: '2027' },
    { d: 246, l: '2189' },
    { d: 312, l: '3000' },
  ];
  let marks = '';
  for (const e of eras) {
    const [x, y] = pt(262, e.d);
    const [tx, ty] = pt(236, e.d);
    marks += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="var(--gold)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="none" stroke="var(--gold)" stroke-width=".8"/><text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-family="var(--mono)" font-size="11" letter-spacing="1.5" fill="currentColor">${e.l}</text>`;
  }
  return `<svg class="portal" viewBox="0 0 800 800" aria-hidden="true" focusable="false">
  <defs><path id="portalText" d="M400,400 m-352,0 a352,352 0 1,1 704,0 a352,352 0 1,1 -704,0"/></defs>
  <g class="portal__outer"><circle cx="400" cy="400" r="392" fill="none" stroke="currentColor" stroke-width="1"/><path d="${ticks}" stroke="currentColor" stroke-width="1" fill="none"/>
  <text font-family="var(--mono)" font-size="13" letter-spacing="4" fill="currentColor"><textPath href="#portalText" textLength="2200" lengthAdjust="spacing">SOME PLACES ARE WORTH TRAVELLING CENTURIES FOR · SOME PLACES ARE WORTH TRAVELLING CENTURIES FOR ·</textPath></text></g>
  <circle cx="400" cy="400" r="326" fill="none" stroke="currentColor" stroke-width=".8"/>
  <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="2 7"/>
  <g class="portal__inner">${marks}<circle cx="400" cy="400" r="262" fill="none" stroke="var(--gold)" stroke-width="1" opacity=".7"/></g>
  <circle cx="400" cy="400" r="196" fill="none" stroke="currentColor" stroke-width=".6"/>
  <path d="M400 150v500M150 400h500" stroke="currentColor" stroke-width=".5" opacity=".6"/>
  <circle cx="400" cy="400" r="5" fill="var(--gold)"/>
</svg>`;
}

export const orbitDiagram = `<svg class="orbits" viewBox="0 0 420 420" role="img" aria-label="Diagram: three orbits labelled Past, Present and Future around a single point">
  <circle cx="210" cy="210" r="190" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 6"/>
  <circle cx="210" cy="210" r="128" fill="none" stroke="currentColor" stroke-width=".8"/>
  <circle cx="210" cy="210" r="66" fill="none" stroke="currentColor" stroke-width=".8"/>
  <path d="M210 8v404M8 210h404" stroke="currentColor" stroke-width=".5" opacity=".5"/>
  <circle cx="210" cy="210" r="7" fill="var(--burgundy)"/>
  <circle cx="210" cy="20" r="6" fill="var(--gold)"/><text x="222" y="16" font-family="var(--mono)" font-size="14" letter-spacing="1.5" fill="currentColor">FUTURE</text>
  <circle cx="338" cy="210" r="6" fill="var(--olive)"/><text x="326" y="192" text-anchor="end" font-family="var(--mono)" font-size="14" letter-spacing="1.5" fill="currentColor">PRESENT</text>
  <circle cx="210" cy="276" r="6" fill="var(--burgundy)"/><text x="222" y="294" font-family="var(--mono)" font-size="14" letter-spacing="1.5" fill="currentColor">PAST</text>
  <text x="210" y="228" text-anchor="middle" font-family="var(--mono)" font-size="12" letter-spacing="1.4" fill="currentColor" opacity=".7">YOU</text>
</svg>`;

/* ---------- Small components ---------- */
export function riskMeter(n, { compact = false } = {}) {
  const r = RISK[n];
  const pips = [1, 2, 3, 4, 5].map((i) => `<i${i <= n ? ' class="on"' : ''}></i>`).join('');
  return `<span class="risk risk--${n}${compact ? ' risk--compact' : ''}" role="img" aria-label="Temporal risk: Class ${roman(n)}, ${r.name} (${n} of 5)"><span class="risk__label">Temporal risk</span><span class="risk__pips" aria-hidden="true">${pips}</span><span class="risk__class">Class ${roman(n)} · ${r.name}</span></span>`;
}

export function kindTag(kind) {
  const k = KINDS[kind];
  return `<span class="tag tag--${kind}" title="${esc(k.note)}">${esc(k.label)}</span>`;
}

export function placeholderNote(text) {
  return `<p class="fiction-note"><span class="fiction-note__badge">Fiction</span>${esc(text)}</p>`;
}

/* ---------- Layout ---------- */
const NAV = [
  { href: 'destinations.html', label: 'Destinations', match: /^(destinations|destination-)/ },
  { href: 'advisories.html', label: 'Travel Advisories', match: /^advisories/ },
  { href: 'journal.html', label: 'Field Journal', match: /^journal/ },
];
const KIT = [
  { href: 'packing.html', label: 'Packing List', match: /^packing/ },
  { href: 'faq.html', label: 'Paradox FAQ', match: /^faq/ },
];

function header(file, theme) {
  const cur = (item) => (item.match.test(file) ? ' aria-current="page"' : '');
  const kitActive = KIT.some((k) => k.match.test(file));
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-theme="${theme}">
  <div class="site-header__inner">
    <a class="brand" href="index.html" aria-label="CHRONOTERRA, Temporal Tourism Board — home">
      ${logoMark}
      <span class="brand__text"><span class="brand__word">CHRONOTERRA</span><span class="brand__sub">Temporal Tourism Board</span></span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Primary">
      <ul class="nav__list">
        ${NAV.map((n) => `<li><a class="nav__link" href="${n.href}"${cur(n)}>${n.label}</a></li>`).join('\n        ')}
        <li class="nav__more${kitActive ? ' is-current' : ''}">
          <button class="nav__link nav__more-btn" type="button" aria-expanded="false" aria-controls="kit-menu">Traveller’s Kit <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></button>
          <ul class="nav__sub" id="kit-menu">
            ${KIT.map((n) => `<li><a class="nav__sublink" href="${n.href}"${cur(n)}>${n.label}</a></li>`).join('\n            ')}
          </ul>
        </li>
      </ul>
      <a class="btn-ticket nav__cta" href="booking.html"><span>Plan Your Journey</span></a>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span class="nav-toggle__bars" aria-hidden="true"></span></button>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <a class="brand brand--footer" href="index.html" aria-label="CHRONOTERRA — home">${logoMark}<span class="brand__text"><span class="brand__word">CHRONOTERRA</span><span class="brand__sub">Temporal Tourism Board</span></span></a>
        <p class="site-footer__statement">The world’s first tourism board beyond the boundaries of time.</p>
      </div>
      <nav class="site-footer__col" aria-label="Explore">
        <h2 class="eyebrow">Explore</h2>
        <ul><li><a href="destinations.html">Destinations</a></li><li><a href="advisories.html">Travel Advisories</a></li><li><a href="booking.html">Plan Your Journey</a></li></ul>
      </nav>
      <nav class="site-footer__col" aria-label="Traveller’s Kit">
        <h2 class="eyebrow">Traveller’s Kit</h2>
        <ul><li><a href="journal.html">Field Journal</a></li><li><a href="packing.html">Packing List</a></li><li><a href="faq.html">Paradox FAQ</a></li></ul>
      </nav>
      <div class="site-footer__col">
        <h2 class="eyebrow">The Agency</h2>
        <address>
          CHRONOTERRA Temporal Tourism Board<br>
          Registered outside of time<br>
          HQ: roughly 11:59, local<br>
          <a href="mailto:concierge@chronoterra.example">concierge@chronoterra.example</a><br>
          <span class="muted">Placeholder contact · no real inbox</span>
        </address>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p class="small">A fictional agency created for the Autumn of Code Website Design Competition. No bookings are real; no payment is taken. Photography is credited on the <a href="credits.html">credits page</a>. Built by Samnan &amp; Mohammad Shadab.</p>
      <p class="site-footer__closing">Present company excluded.</p>
    </div>
  </div>
</footer>
<button class="to-top" type="button" aria-label="Back to top" hidden><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>`;
}

const FAVICON = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='#11110F'/><circle cx='16' cy='16' r='11' fill='none' stroke='#F1EBDD' stroke-width='1.4'/><ellipse cx='16' cy='16' rx='11' ry='4.2' transform='rotate(-28 16 16)' fill='none' stroke='#F1EBDD' stroke-width='1.4'/><circle cx='24.6' cy='9.8' r='2.4' fill='#B89A62'/></svg>`)}`;

export function layout({ file, title, desc, body, headerTheme = 'dark', bodyClass = '', scripts = [], ogImage = 'assets/img/hero-md.jpg' }) {
  const fullTitle = file === 'index.html' ? 'CHRONOTERRA — Temporal Tourism Board' : `${title} — CHRONOTERRA`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#11110F">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ogImage}">
<link rel="icon" href="${FAVICON}">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/home.css">
<link rel="stylesheet" href="assets/css/destinations.css">
<link rel="stylesheet" href="assets/css/pages.css">
<link rel="stylesheet" href="assets/css/fantasy.css">
<script>document.documentElement.classList.add('js');document.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG'){t.classList.add('is-broken');if(t.parentElement)t.parentElement.classList.add('img-failed');}},true);</script>
</head>
<body class="${bodyClass}">
${header(file, headerTheme)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${scripts.map((s) => `<script src="${s}"></script>`).join('\n')}
<script src="assets/js/main.js"></script>
</body>
</html>
`;
}
