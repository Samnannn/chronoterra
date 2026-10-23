// Pages: home, destinations index, destination detail.
import {
  destinations, advisories, journal, KINDS, BANDS, RISK, homeAdvisories, homeJournal, homeFeatured,
} from './content.mjs';
import { esc, img, layout, riskMeter, kindTag, stamp, portalRing, orbitDiagram, money, roman } from './lib.mjs';

export const byId = (id) => destinations.find((d) => d.id === id);
export const advById = (id) => advisories.find((a) => a.id === id);
export const fromPrice = (d) => d.perDay * d.days + d.levy;
const fmtDays = (d) => (d.id === 'the-first-dawn' ? '40-minute window' : d.days === 1 ? '1 day' : `${d.days} days`);
const link = (d) => `destination-${d.id}.html`;
const journalById = (id) => journal.find((j) => j.id === id);
export const readTime = (j) => Math.max(1, Math.ceil(j.body.join(' ').split(/\s+/).length / 200));

// Position on the (deliberately non-linear) timeline, 0–100.
const STOPS = [[-4.5e9, 7], [-200, 24], [1631, 44], [2026, 58], [2027, 62], [2189, 79], [3000, 95]];
export function timePos(year) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [y0, p0] = STOPS[i];
    const [y1, p1] = STOPS[i + 1];
    if (year >= y0 && year <= y1) return p0 + ((year - y0) / (y1 - y0)) * (p1 - p0);
  }
  return year < STOPS[0][0] ? 7 : 95;
}
const driftLabel = (y) => {
  const d = y - 2026;
  if (y <= -1e6) return '−4.5 billion yrs';
  return (d < 0 ? '−' : '+') + Math.abs(d).toLocaleString('en-US') + ' yrs';
};
const featLine = {
  'mughal-court': 'MUGHAL EMPIRE — AGRA, 1631 CE',
  'new-earth': 'NEW EARTH — YEAR 3000 CE',
  'last-day-of-wifi': 'THE LAST DAY OF WIFI — EARTH, 2027 CE',
};

function advCard(a, { dark = false } = {}) {
  return `<article class="notice${dark ? ' notice--dark' : ''}" id="${a.id.toLowerCase()}-card">
    <p class="notice__id"><span>${a.id}</span><span class="notice__badge">Fictional advisory</span></p>
    <h3 class="notice__title">${esc(a.title)}</h3>
    <p class="notice__body">${esc(a.body)}</p>
    <p class="notice__foot">${riskMeter(a.cls, { compact: true })}<a class="link-arrow link-arrow--small" href="advisories.html#${a.id.toLowerCase()}">Read advisory</a></p>
  </article>`;
}

/* ===================== HOME ===================== */
export function homePage() {
  const eras = destinations
    .slice()
    .sort((a, b) => a.year - b.year)
    .map((d) => ({ year: d.era, coord: d.coords, exp: d.expedition, place: d.place.split(',')[0], drift: driftLabel(d.year) }));

  const ruler = destinations
    .slice()
    .sort((a, b) => a.year - b.year)
    .map((d) => `<li style="--x:${timePos(d.year).toFixed(1)}%"><a href="${link(d)}"><span class="ruler__dot"></span><span class="ruler__lab">${esc(d.label)}<small>${esc(d.era)}</small></span></a></li>`)
    .join('');

  const featured = homeFeatured.map(byId);
  const featHtml = featured
    .map((d, i) => {
      const cls = ['feat--left', 'feat--right', 'feat--inset'][i];
      const ratio = ['feat__media--tall', 'feat__media--wide', 'feat__media--std'][i];
      const sizes = ['(min-width: 900px) 58vw, 100vw', '(min-width: 900px) 66vw, 100vw', '(min-width: 900px) 52vw, 100vw'][i];
      return `<article class="feat ${cls} reveal">
      <a class="feat__media ${ratio}" href="${link(d)}" tabindex="-1" aria-hidden="true">
        ${img(d.image, { sizes, pos: d.pos })}
        ${stamp(d.era.split(' ')[0] === '~4.5' ? '4.5 Ga' : d.era.replace(' CE', ''), undefined, 'feat__stamp')}
      </a>
      <div class="feat__body">
        <p class="meta"><span class="num">${d.num}</span> ${kindTag(d.kind)}</p>
        <p class="feat__era">${featLine[d.id]}</p>
        <h3 class="feat__title"><a href="${link(d)}">${esc(d.name)}</a></h3>
        <p class="feat__desc">${esc(d.short)}</p>
        <dl class="facts">
          <div><dt>Journey</dt><dd>${fmtDays(d)}</dd></div>
          <div><dt>From</dt><dd>${money(fromPrice(d))}<small>per traveller · illustrative</small></dd></div>
          <div class="facts__wide"><dt>Temporal risk</dt><dd>${riskMeter(d.risk, { compact: true })}</dd></div>
        </dl>
        <a class="link-arrow" href="${link(d)}">Explore expedition <span class="sr-only">to ${esc(d.name)}</span></a>
      </div>
    </article>`;
    })
    .join('\n');

  const sorted = destinations.slice().sort((a, b) => a.year - b.year);
  const groupOf = (d) => (d.year < 1900 ? 'past' : d.year <= 2100 ? 'near' : 'future');
  const nodes = sorted
    .map(
      (d) => `<li class="route__item" style="--x:${timePos(d.year).toFixed(1)}%">
        <button type="button" class="route__node" data-id="${d.id}" data-group="${groupOf(d)}" aria-pressed="false">
          <span class="route__pip"></span>
          <span class="route__year">${esc(d.era)}</span>
          <span class="route__name">${esc(d.label)}</span>
        </button>
      </li>`,
    )
    .join('');
  const panels = sorted
    .map(
      (d) => `<article class="route__panel" data-panel="${d.id}" hidden>
        <div class="route__img">${img(d.image, { sizes: '(min-width: 900px) 40vw, 100vw', pos: d.pos })}</div>
        <div class="route__txt">
          <p class="meta">${kindTag(d.kind)} <span class="muted">${esc(d.expedition)}</span></p>
          <h3 class="route__h">${esc(d.name)}</h3>
          <p class="route__coords">${esc(d.eraLine)} · ${esc(d.coords)}</p>
          <p>${esc(d.tagline)}</p>
          <p class="route__links"><a class="btn btn--gold" href="${link(d)}">View expedition</a> <a class="link-arrow" href="booking.html?dest=${d.id}">Book this era</a></p>
        </div>
      </article>`,
    )
    .join('');

  const notices = homeAdvisories.map((id) => advCard(advById(id), { dark: true })).join('');

  const entries = homeJournal.map(journalById);
  const [e1, e2, e3] = entries;
  const entryBig = (j) => {
    const d = byId(j.dest);
    return `<article class="note note--big reveal"><a class="note__media" href="journal-${j.id}.html" tabindex="-1" aria-hidden="true">${img(j.img, { sizes: '(min-width: 900px) 48vw, 100vw', pos: j.pos })}</a>
      <p class="meta">${esc(j.filed)} · ${readTime(j)} min read</p>
      <h3 class="note__title"><a href="journal-${j.id}.html">${esc(j.title)}</a></h3>
      <p class="note__excerpt">${esc(j.excerpt)}</p>
      <p class="note__ref">Filed from <a href="${link(d)}">${esc(d.eraLine)}</a> · ${esc(j.exp)}</p></article>`;
  };
  const entrySmall = (j) => {
    const d = byId(j.dest);
    return `<article class="note note--small reveal"><a class="note__media" href="journal-${j.id}.html" tabindex="-1" aria-hidden="true">${img(j.img, { sizes: '(min-width: 900px) 18vw, 40vw', pos: j.pos })}</a>
      <div><p class="meta">${esc(j.filed)} · ${readTime(j)} min read</p>
      <h3 class="note__title"><a href="journal-${j.id}.html">${esc(j.title)}</a></h3>
      <p class="note__excerpt">${esc(j.excerpt)}</p>
      <p class="note__ref">Filed from <a href="${link(d)}">${esc(d.eraLine)}</a></p></div></article>`;
  };

  const body = `
<section class="hero" id="top" data-eras='${esc(JSON.stringify(eras))}'>
  <div class="hero__media">${img('hero', { sizes: '100vw', eager: true, cls: 'hero__img' })}</div>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="hero__portal" aria-hidden="true">${portalRing()}</div>
  <div class="container hero__inner">
    <p class="eyebrow hero__eyebrow"><span class="pulse" aria-hidden="true"></span>The Temporal Tourism Board · Est. outside of time</p>
    <h1 class="hero__title"><span>The world is not</span> <span>a timeline.</span> <em class="hero__second">It’s your destination.</em></h1>
    <p class="hero__lede">Cross centuries, witness lost empires, and visit futures that haven’t happened yet. Your next journey exists beyond the present.</p>
    <div class="hero__actions">
      <a class="btn btn--gold" href="destinations.html">Explore the Eras</a>
      <a class="btn btn--ghost" href="#how">How Time Travel Works</a>
    </div>
  </div>
  <div class="hero__rail">
    <div class="container">
      <ol class="ruler" aria-label="Featured eras on a timeline, not to scale">
        <li class="ruler__now" style="--x:${timePos(2026).toFixed(1)}%"><span>You are here · 2026</span></li>
        ${ruler}
      </ol>
      <div class="rail">
        <div class="rail__cell"><span class="meta-label">Temporal coordinate</span><span class="rail__value" data-ticker="coord">27.1795° N, 78.0211° E</span><span class="rail__sub" data-ticker="era">1631 CE · Agra</span></div>
        <div class="rail__cell"><span class="meta-label">Expedition ID</span><span class="rail__value" data-ticker="exp">CT-1631-AGR</span><span class="rail__sub">Drift <span data-ticker="drift">−395 yrs</span></span></div>
        <div class="rail__cell rail__cell--clock"><span class="meta-label">Origin time</span><time class="rail__value" data-clock>--:--:--</time><span class="rail__sub">Your present, for now</span></div>
        <a class="rail__scroll" href="#how"><span>Select your century</span><svg viewBox="0 0 12 16" width="12" height="16" aria-hidden="true"><path d="M6 1v13M1.5 9.5L6 14l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></a>
      </div>
    </div>
  </div>
</section>

<section class="section section--paper intro" id="how" aria-labelledby="how-h">
  <div class="container intro__grid">
    <div class="intro__side reveal">
      <p class="eyebrow">A · The art of arriving</p>
      <div class="intro__orbit">${orbitDiagram}</div>
      <p class="small muted">Fig. 1 — Three orbits, one traveller. Not to scale. Not, strictly, to physics.</p>
    </div>
    <div class="intro__main">
      <h2 class="display display--lg reveal" id="how-h">Travel used to mean <em>distance.</em> Now it means <em>date.</em></h2>
      <div class="intro__copy reveal">
        <p class="lede">Temporal tourism begins with a simple confession: you have already seen most of the world. What you haven’t seen is <em>when.</em></p>
        <p>CHRONOTERRA arranges arrival in other centuries, carefully, respectfully and with extremely good luggage. We do not sell nostalgia and we do not sell prophecy. We sell attention: a few days of standing quietly in a moment that was, or might have been, or has not yet happened, and learning what it felt like.</p>
        <p class="small muted">Every expedition is labelled. <strong>Historical</strong> journeys are interpretive reconstructions. <strong>Speculative</strong> and <strong>alternate-timeline</strong> journeys are fiction, offered as such.</p>
      </div>
      <ol class="steps reveal">
        <li><span class="steps__n">01</span><h3>Choose</h3><p>Pick a century. Our desk assigns a historian, a coordinate and a polite warning.</p></li>
        <li><span class="steps__n">02</span><h3>Calibrate</h3><p>Be fitted, briefed and inoculated against nostalgia. Your return coordinate is sewn into your hem.</p></li>
        <li><span class="steps__n">03</span><h3>Cross</h3><p>Walk through the gate. Behave. Return before the tea goes cold.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="section section--ink grain select" id="select" aria-labelledby="select-h">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow">B · Select your century</p>
      <h2 class="display display--lg" id="select-h">Three centuries, <em>one</em> very particular itinerary.</h2>
      <p class="section-head__aside">Featured expeditions this season. Dates, coordinates and fictional premises are clearly marked. <a class="link-arrow link-arrow--small" href="destinations.html">See all six</a></p>
    </header>
    <div class="feats">${featHtml}</div>
  </div>
</section>

<section class="section section--paper route" id="route" aria-labelledby="route-h">
  <div class="container">
    <header class="section-head section-head--paper reveal">
      <p class="eyebrow">C · The temporal route finder</p>
      <h2 class="display display--lg" id="route-h">Where on the line do you <em>want to land?</em></h2>
      <p class="section-head__aside">Choose a stretch of time, then a stop along it. The line is not to scale. Neither, usually, is the bill.</p>
    </header>
    <div class="route__ui reveal" data-route>
      <div class="route__filters" role="group" aria-label="Filter the timeline">
        <button type="button" class="chip is-on" data-filter="all" aria-pressed="true">Whole timeline</button>
        <button type="button" class="chip" data-filter="past" aria-pressed="false">The past</button>
        <button type="button" class="chip" data-filter="near" aria-pressed="false">Near-present</button>
        <button type="button" class="chip" data-filter="future" aria-pressed="false">The future</button>
      </div>
      <div class="route__track">
        <div class="route__line" aria-hidden="true"><span class="route__you" style="--x:${timePos(2026).toFixed(1)}%"><i></i><b>You are here</b></span></div>
        <ol class="route__list">${nodes}</ol>
      </div>
      <div class="route__stage" aria-live="polite">${panels}</div>
    </div>
  </div>
</section>

<section class="section section--charcoal advisories-preview" id="within-reason" aria-labelledby="reason-h">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow">D · Travel advisories</p>
      <h2 class="display display--lg" id="reason-h">Travel, <em>within reason.</em></h2>
      <p class="section-head__aside">Every era has house rules. These are ours. <strong>Fictional guidance</strong> from an imaginary Board; not real safety advice.</p>
    </header>
    <div class="notices reveal">${notices}</div>
    <p class="center reveal"><a class="btn btn--ghost" href="advisories.html">Read all 17 advisories</a></p>
  </div>
</section>

<section class="section section--paper notes" id="notes" aria-labelledby="notes-h">
  <div class="container">
    <header class="section-head section-head--paper reveal">
      <p class="eyebrow">E · Field Journal</p>
      <h2 class="display display--lg" id="notes-h">Field notes from <em>elsewhen.</em></h2>
      <p class="section-head__aside">Dispatches from travellers who came back. Invented, every one, but sincerely so. <a class="link-arrow link-arrow--small" href="journal.html">Open the journal</a></p>
    </header>
    <div class="notes__grid">
      ${entryBig(e1)}
      <div class="notes__stack">${entrySmall(e2)}${entrySmall(e3)}</div>
    </div>
  </div>
</section>

<section class="invitation grain" id="invitation" aria-labelledby="inv-h">
  <div class="invitation__media">${img('sky-bridge', { sizes: '100vw', pos: '50% 40%' })}</div>
  <div class="invitation__shade" aria-hidden="true"></div>
  <div class="container invitation__inner">
    <p class="eyebrow">F · The expedition invitation</p>
    <h2 class="display display--xl" id="inv-h">Some places are worth travelling <em>centuries</em> for.</h2>
    <p class="invitation__lede">History isn’t behind you. The future isn’t ahead. Both are waiting for you.</p>
    <div class="invitation__actions"><a class="btn-ticket btn-ticket--lg" href="booking.html"><span>Plan Your Journey</span></a><a class="link-arrow" href="advisories.html">Read the advisories first</a></div>
  </div>
</section>`;

  return layout({
    file: 'index.html',
    title: 'Home',
    desc: 'CHRONOTERRA, the world’s first tourism board beyond the boundaries of time. Visit the Mughal court, a futuristic Earth in 3000 CE, and the last day of Wi-Fi. A fictional design project.',
    body,
    headerTheme: 'dark',
    bodyClass: 'page-home',
  });
}

/* ===================== DESTINATIONS INDEX ===================== */
export function destinationsPage() {
  const meta = (d) => `<dl class="facts facts--inline">
      <div><dt>Journey</dt><dd>${fmtDays(d)}</dd></div>
      <div><dt>From</dt><dd>${money(fromPrice(d))}</dd></div>
      <div class="facts__wide"><dt>Temporal risk</dt><dd>${riskMeter(d.risk, { compact: true })}</dd></div></dl>`;
  const cta = (d) => `<a class="link-arrow" href="${link(d)}">View expedition <span class="sr-only">to ${esc(d.name)}</span></a>`;
  const head = (d) => `<p class="meta"><span class="num">${d.num}</span> ${kindTag(d.kind)}</p>`;
  const attr = (d) => `data-kind="${d.kind}" data-band="${d.band}" id="${d.id}"`;
  const [mughal, earth, wifi, alex, green, dawn] = ['mughal-court', 'new-earth', 'last-day-of-wifi', 'alexandria-after-dark', 'carbon-free-city', 'the-first-dawn'].map(byId);

  const sorted = destinations.slice().sort((a, b) => a.year - b.year);
  const ruler = sorted
    .map((d) => `<li style="--x:${timePos(d.year).toFixed(1)}%"><a href="#${d.id}"><span class="ruler__dot"></span><span class="ruler__lab">${esc(d.label)}<small>${esc(d.era)}</small></span></a></li>`)
    .join('');

  const body = `
<section class="page-hero page-hero--paper" aria-labelledby="dest-h">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Destinations · Eras</p>
      <h1 class="display display--xl" id="dest-h">Where will you be, <em>when?</em></h1>
    </div>
    <div class="page-hero__aside">
      <p class="lede">Three thousand years of possibility. One very particular itinerary.</p>
      <p class="small muted">Six expeditions across deep time, history and imagined futures. Each is labelled: <strong>historical</strong> journeys rest on the record and are interpretive; the rest are <strong>fiction</strong>. We never present invention as fact.</p>
    </div>
  </div>
  <div class="container">
    <ol class="ruler ruler--page" aria-label="All six expeditions on a timeline, not to scale">
      <li class="ruler__now" style="--x:${timePos(2026).toFixed(1)}%"><span>You are here · 2026</span></li>${ruler}
    </ol>
  </div>
</section>

<div class="filterbar" id="filterbar" role="region" aria-label="Filter destinations">
  <div class="container filterbar__inner">
    <div class="filterbar__group" role="group" aria-label="Kind of journey">
      <span class="filterbar__label">Kind</span>
      <button class="chip is-on" type="button" data-group="kind" data-value="all" aria-pressed="true">All</button>
      ${Object.entries(KINDS).map(([k, v]) => `<button class="chip" type="button" data-group="kind" data-value="${k}" aria-pressed="false">${v.short}</button>`).join('')}
    </div>
    <div class="filterbar__group" role="group" aria-label="Era">
      <span class="filterbar__label">Era</span>
      <button class="chip is-on" type="button" data-group="band" data-value="all" aria-pressed="true">Any</button>
      ${Object.entries(BANDS).map(([k, v]) => `<button class="chip" type="button" data-group="band" data-value="${k}" aria-pressed="false">${v}</button>`).join('')}
    </div>
    <p class="filterbar__count" role="status" aria-live="polite"><span data-count>6</span> of 6 expeditions</p>
  </div>
</div>

<div class="dest-list" data-dest-list>

  <!-- 01 — editorial spread: image + overlapping card -->
  <article class="dest dest--court" ${attr(mughal)}>
    <div class="container dest--court__grid">
      <a class="dest__media" href="${link(mughal)}" tabindex="-1" aria-hidden="true">${img(mughal.image, { sizes: '(min-width: 900px) 62vw, 100vw', pos: '50% 35%' })}${stamp('1631', undefined, 'dest__stamp')}</a>
      <div class="dest__card">
        <span class="dest__numeral" aria-hidden="true">01</span>
        ${head(mughal)}
        <p class="dest__era">${esc(mughal.eraLine)}</p>
        <h2 class="dest__title">${esc(mughal.name)}</h2>
        <p>${esc(mughal.short)}</p>
        ${meta(mughal)}
        ${cta(mughal)}
      </div>
    </div>
  </article>

  <!-- 02 — dark horizontal feature row -->
  <article class="dest dest--earth" ${attr(earth)}>
    <div class="container dest--earth__grid">
      <div class="dest__card">
        <span class="dest__numeral" aria-hidden="true">02</span>
        ${head(earth)}
        <p class="dest__era">${esc(earth.eraLine)}</p>
        <h2 class="dest__title">${esc(earth.name)}</h2>
        <p>${esc(earth.short)}</p>
        ${meta(earth)}
        ${cta(earth)}
      </div>
      <div class="dest--earth__imgs">
        <a class="dest__media dest__media--a" href="${link(earth)}" tabindex="-1" aria-hidden="true">${img(earth.image, { sizes: '(min-width: 900px) 52vw, 100vw', pos: '50% 60%' })}</a>
        <div class="dest__media dest__media--b">${img('future-c', { sizes: '(min-width: 900px) 22vw, 50vw', pos: '50% 30%' })}</div>
        <p class="caption">Present-day photographs, used to imagine 3000 CE.</p>
      </div>
    </div>
  </article>

  <!-- 03 — cinematic banner -->
  <article class="dest dest--wifi" ${attr(wifi)}>
    <div class="dest--wifi__bg">${img(wifi.image, { sizes: '100vw', pos: '40% 55%' })}</div>
    <div class="dest--wifi__shade" aria-hidden="true"></div>
    <div class="container dest--wifi__inner">
      <div class="dest--wifi__signal" aria-hidden="true"><span>Signal</span><i></i><i></i><i></i><i></i><b>0%</b></div>
      <div class="dest__card">
        <span class="dest__numeral" aria-hidden="true">03</span>
        ${head(wifi)}
        <p class="dest__era">${esc(wifi.eraLine)}</p>
        <h2 class="dest__title">${esc(wifi.name)}</h2>
        <p>${esc(wifi.short)}</p>
        ${meta(wifi)}
        ${cta(wifi)}
      </div>
    </div>
  </article>

  <!-- 04 — arch frame -->
  <article class="dest dest--alex" ${attr(alex)}>
    <div class="container dest--alex__grid">
      <a class="dest__arch" href="${link(alex)}" tabindex="-1" aria-hidden="true">${img(alex.image, { sizes: '(min-width: 900px) 36vw, 80vw', pos: '55% 50%' })}</a>
      <div class="dest__card">
        <span class="dest__numeral" aria-hidden="true">04</span>
        ${head(alex)}
        <p class="dest__era dest__era--big">${esc(alex.era)}</p>
        <h2 class="dest__title">${esc(alex.name)}</h2>
        <p class="dest__place"><span>${esc(alex.place)}</span> · <span>${esc(alex.coords)}</span></p>
        <p>${esc(alex.short)}</p>
        <p class="note-inline"><strong>Interpretive reconstruction.</strong> The Library’s appearance and routines are not fully documented; the Board’s version is educated imagination.</p>
        ${meta(alex)}
        ${cta(alex)}
      </div>
    </div>
  </article>

  <!-- 05 — olive tall-portrait pair -->
  <article class="dest dest--green" ${attr(green)}>
    <div class="container dest--green__grid">
      <div class="dest--green__imgs">
        <a class="dest__media dest__media--a" href="${link(green)}" tabindex="-1" aria-hidden="true">${img(green.image, { sizes: '(min-width: 900px) 24vw, 50vw', pos: '50% 40%' })}</a>
        <div class="dest__media dest__media--b">${img('green-b', { sizes: '(min-width: 900px) 20vw, 40vw', pos: '45% 40%' })}</div>
      </div>
      <div class="dest__card">
        <span class="dest__vertical" aria-hidden="true">2189 CE</span>
        <span class="dest__numeral" aria-hidden="true">05</span>
        ${head(green)}
        <p class="dest__era">${esc(green.eraLine)}</p>
        <h2 class="dest__title">${esc(green.name)}</h2>
        <p>${esc(green.short)}</p>
        ${meta(green)}
        ${cta(green)}
      </div>
    </div>
  </article>

  <!-- 06 — the void -->
  <article class="dest dest--dawn" ${attr(dawn)}>
    <div class="dest--dawn__bg">${img(dawn.image, { sizes: '100vw', pos: '50% 55%' })}</div>
    <div class="dest--dawn__shade" aria-hidden="true"></div>
    <div class="container dest--dawn__inner">
      <p class="dest__giant" aria-hidden="true">4.5<small>Ga</small></p>
      <div class="dest__card">
        <span class="dest__numeral" aria-hidden="true">06</span>
        ${head(dawn)}
        <p class="dest__era">${esc(dawn.eraLine)}</p>
        <h2 class="dest__title">${esc(dawn.name)}</h2>
        <p>${esc(dawn.short)}</p>
        <p class="warning-inline"><strong>Warning · Class V.</strong> Molten surface, no breathable air, no rescue window. Observation only, from a sealed capsule.</p>
        ${meta(dawn)}
        ${cta(dawn)}
      </div>
    </div>
  </article>

  <div class="dest-empty container" data-empty hidden>
    <p class="display display--md">No expedition matches <em>that</em> combination.</p>
    <p>Time is flexible, but not that flexible.</p>
    <button class="btn btn--dark" type="button" data-reset>Reset the filters</button>
  </div>
</div>

<section class="section section--ink grain cta-band" aria-labelledby="dest-cta">
  <div class="container cta-band__inner">
    <h2 class="display display--lg" id="dest-cta">Found your century? <em>Reserve the departure.</em></h2>
    <a class="btn-ticket btn-ticket--lg" href="booking.html"><span>Plan Your Journey</span></a>
  </div>
</section>`;

  return layout({
    file: 'destinations.html',
    title: 'Destinations & Eras',
    desc: 'Six expeditions across time: the Mughal court, New Earth in 3000 CE, the last day of Wi-Fi, Alexandria after dark, a carbon-free city, and the first dawn. Filter by kind and era.',
    body,
    headerTheme: 'light',
    bodyClass: 'page-destinations',
  });
}

/* ===================== DESTINATION DETAIL ===================== */
export function destinationDetail(d) {
  const i = destinations.indexOf(d);
  const prev = destinations[(i + destinations.length - 1) % destinations.length];
  const next = destinations[(i + 1) % destinations.length];
  const relAdv = d.advisories.slice(0, 3).map(advById);
  const k = KINDS[d.kind];
  const isHist = d.kind === 'historical';

  const body = `
<section class="detail-hero grain" aria-labelledby="d-h">
  <div class="detail-hero__media">${img(d.image, { sizes: '100vw', eager: true, pos: d.pos })}</div>
  <div class="detail-hero__shade" aria-hidden="true"></div>
  <div class="container detail-hero__inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="destinations.html">Destinations</a><span aria-hidden="true">/</span><span>${esc(d.label)}</span></nav>
    <p class="meta">${kindTag(d.kind)} <span class="muted">Expedition ${esc(d.expedition)}</span></p>
    <h1 class="display display--xl" id="d-h">${esc(d.name)}</h1>
    <p class="detail-hero__era">${esc(d.eraLine)} <span aria-hidden="true">·</span> ${esc(d.coords)}</p>
    <p class="detail-hero__tag">${esc(d.tagline)}</p>
    <div class="detail-hero__actions">
      <a class="btn-ticket btn-ticket--lg" href="booking.html?dest=${d.id}"><span>Book this expedition</span></a>
      <a class="link-arrow" href="#itinerary">Preview the itinerary</a>
    </div>
  </div>
</section>

<section class="section section--paper detail-story">
  <div class="container detail-story__grid">
    <aside class="expcard reveal" aria-label="Expedition card">
      <p class="eyebrow">Expedition card</p>
      <dl>
        <div><dt>Expedition ID</dt><dd class="mono">${esc(d.expedition)}</dd></div>
        <div><dt>Era</dt><dd>${esc(d.era)}</dd></div>
        <div><dt>Place</dt><dd>${esc(d.place)}</dd></div>
        <div><dt>Temporal coordinate</dt><dd class="mono">${esc(d.coords)}</dd></div>
        <div><dt>Journey duration</dt><dd>${fmtDays(d)} <span class="muted">(recommended)</span></dd></div>
        <div><dt>Temporal risk</dt><dd>${riskMeter(d.risk, { compact: true })}<span class="expcard__hazard">${esc(d.hazard)}</span></dd></div>
        <div><dt>From</dt><dd class="price">${money(fromPrice(d))}<small>per traveller · illustrative, fictional currency</small></dd></div>
      </dl>
      <a class="btn btn--dark btn--block" href="booking.html?dest=${d.id}">Book this expedition</a>
      ${stamp(d.era.replace(' CE', '').replace('~4.5 billion years ago', '4.5 Ga'), undefined, 'expcard__stamp')}
    </aside>
    <div class="detail-story__text">
      <p class="eyebrow">The journey</p>
      ${d.long.map((p, n) => `<p class="${n === 0 ? 'lede dropcap' : ''}">${esc(p)}</p>`).join('\n')}
      <h2 class="h3">Highlights</h2>
      <ol class="highlights">${d.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ol>
    </div>
  </div>
</section>

<section class="section section--ink record" aria-labelledby="rec-h">
  <div class="container">
    <header class="section-head"><p class="eyebrow">Fact &amp; fiction</p><h2 class="display display--lg" id="rec-h">What we <em>know.</em> What we <em>imagine.</em></h2>
      <p class="section-head__aside">${esc(k.note)} We keep the two columns separate on purpose.</p></header>
    <div class="record__cols">
      <div class="record__col record__col--record">
        <p class="record__label"><span class="record__badge">${isHist ? 'The record' : d.kind === 'deep' ? 'The science' : 'Context'}</span></p>
        <ul>${d.record.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      </div>
      <div class="record__col record__col--fiction">
        <p class="record__label"><span class="record__badge record__badge--fiction">${isHist ? 'The reconstruction' : 'The fiction'}</span></p>
        <ul>${d.reconstruction.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>

<section class="section section--paper itinerary" id="itinerary" aria-labelledby="it-h">
  <div class="container itinerary__grid">
    <header class="itinerary__head"><p class="eyebrow">Sample itinerary</p><h2 class="display display--lg" id="it-h">The shape of <em>your stay.</em></h2>
      <p class="muted">A representative plan. Final timings are fixed at your pre-departure briefing, and the Board reserves the right to be surprised.</p></header>
    <ol class="timeline">${d.itinerary.map((s) => `<li><span class="timeline__t">${esc(s.t)}</span><div><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div></li>`).join('')}</ol>
  </div>
</section>

<section class="section section--paper-2 gallery" aria-labelledby="g-h">
  <div class="container">
    <header class="section-head section-head--paper"><p class="eyebrow">Gallery</p><h2 class="display display--md" id="g-h">Seen from <em>here and now.</em></h2>
      <p class="section-head__aside">Every photograph shows a real place or event as it is <strong>today</strong>. They stand in for what you will see; they are not pictures of the era itself.</p></header>
    <div class="gallery__grid gallery__grid--${d.gallery.length}">
      ${d.gallery.map((g) => `<figure class="gallery__item">${img(g.img, { sizes: '(min-width: 900px) 40vw, 100vw' })}<figcaption>${esc(g.cap)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section section--charcoal related" aria-labelledby="rel-h">
  <div class="container">
    <header class="section-head"><p class="eyebrow">Related advisories</p><h2 class="display display--md" id="rel-h">Before you <em>go.</em></h2>
      <p class="section-head__aside">Fictional guidance for an imaginary Board.</p></header>
    <div class="notices">${relAdv.map((a) => advCard(a, { dark: true })).join('')}</div>
  </div>
</section>

<section class="section section--ink grain cta-band" aria-labelledby="dcta-h">
  <div class="container cta-band__inner">
    <div><p class="eyebrow">Ready for ${esc(d.era)}?</p><h2 class="display display--lg" id="dcta-h">Reserve your <em>departure.</em></h2>
      <p class="muted-light">Illustrative pricing from ${money(fromPrice(d))} per traveller. No real reservation or payment is made.</p></div>
    <a class="btn-ticket btn-ticket--lg" href="booking.html?dest=${d.id}"><span>Book this expedition</span></a>
  </div>
</section>

<nav class="pager" aria-label="Other expeditions">
  <a class="pager__link" href="${link(prev)}" rel="prev"><span class="eyebrow">Previous expedition</span><strong>${esc(prev.name)}</strong><span class="muted">${esc(prev.eraLine)}</span></a>
  <a class="pager__link pager__link--next" href="${link(next)}" rel="next"><span class="eyebrow">Next expedition</span><strong>${esc(next.name)}</strong><span class="muted">${esc(next.eraLine)}</span></a>
</nav>`;

  return layout({
    file: `destination-${d.id}.html`,
    title: `${d.name} · ${d.era}`,
    desc: `${d.tagline} ${d.short}`,
    body,
    headerTheme: 'dark',
    bodyClass: 'page-detail',
    ogImage: `assets/img/${d.image}-md.jpg`,
  });
}
