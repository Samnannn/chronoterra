// Pages: advisories, booking, journal (+articles), packing, faq, credits.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  destinations, advisories, advisorySections, advisoryFaq, returnProtocol, checklistBefore, RISK, CLASSES, PREFS,
  journal, packing, faqGroups, packages, KINDS,
} from './content.mjs';
import { esc, img, layout, riskMeter, kindTag, stamp, money, roman } from './lib.mjs';
import { byId, advById, fromPrice, readTime } from './pages1.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const link = (d) => `destination-${d.id}.html`;

/* ===================== ADVISORIES ===================== */
const bannerFor = {
  before: { tone: 'gold', head: 'Checklist required', text: 'Complete every item below before your gate time. Gates do not wait; they merely re-open.' },
  during: { tone: 'gold', head: 'Caution · you are the anachronism', text: 'The era will not adapt to you. Look, listen, and leave no trace of the twenty-first century.' },
  integrity: { tone: 'burgundy', head: 'Stop · Class IV advisories', text: 'Licensed guide required. These rules protect more than your return. They protect everyone’s yesterday.' },
  anomalies: { tone: 'ink', head: 'Anomaly watch', text: 'Report. Do not repair. Strange things, if left alone, are usually only strange.' },
  return: { tone: 'olive', head: 'Return protocol in force', text: 'Depart by the gate you arrived at. Declare what you carry. Drink the tea.' },
};

export function advisoriesPage() {
  const num = (a) => a.id.replace('ADV-', '');
  const related = (a) => destinations.filter((d) => d.advisories.includes(a.id));
  const section = (s, idx) => {
    const list = advisories.filter((a) => a.section === s.id);
    const b = bannerFor[s.id];
    return `<section class="adv-section" id="${s.id}" aria-labelledby="${s.id}-h">
      <header class="adv-section__head"><span class="adv-section__n">§ ${idx + 1}</span><h2 class="display display--md" id="${s.id}-h">${esc(s.name)}</h2><p class="muted">${esc(s.intro)}</p></header>
      <div class="banner banner--${b.tone}" role="note"><span class="banner__icon" aria-hidden="true">!</span><div><strong>${esc(b.head)}</strong><span>${esc(b.text)}</span></div></div>
      ${s.id === 'before' ? checklistHtml() : ''}
      <ol class="adv-list">
        ${list.map((a) => `<li class="adv" id="${a.id.toLowerCase()}" data-class="${a.cls}">
          <span class="adv__num" aria-hidden="true">${num(a)}</span>
          <div class="adv__main">
            <p class="adv__id">${a.id} <span class="notice__badge">Fictional advisory</span></p>
            <h3 class="adv__title">${esc(a.title)}</h3>
            <p>${esc(a.body)}</p>
            <p class="adv__meta">${riskMeter(a.cls, { compact: true })}${related(a).length ? `<span class="adv__dests">Applies to: ${related(a).map((d) => `<a href="${link(d)}">${esc(d.label)}</a>`).join(', ')}</span>` : ''}</p>
          </div>
        </li>`).join('')}
      </ol>
    </section>`;
  };

  const body = `
<section class="page-hero page-hero--ink grain" aria-labelledby="adv-h">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Travel advisories</p>
      <h1 class="display display--xl" id="adv-h">Every era has its <em>hazards.</em></h1>
    </div>
    <div class="page-hero__aside">
      <p class="lede">Time travel is an extraordinary privilege. Arriving unprepared is an avoidable tragedy.</p>
      <p class="small muted-light"><strong>This is fiction.</strong> These advisories are world-building for an imaginary tourism board. They are not real safety guidance, and no time travel is offered.</p>
    </div>
  </div>
</section>

<section class="section section--paper classes-sec" aria-labelledby="cls-h">
  <div class="container">
    <header class="section-head section-head--paper"><p class="eyebrow">The classification system</p><h2 class="display display--md" id="cls-h">Five classes of <em>temporal risk.</em></h2>
      <p class="section-head__aside">Every destination and every advisory carries a class. Higher classes demand more preparation, more paperwork and more humility.</p></header>
    <ol class="classes">
      ${[1, 2, 3, 4, 5].map((n) => `<li class="classes__item classes__item--${n}"><span class="classes__n">${roman(n)}</span>${riskMeter(n, { compact: true })}<strong>${RISK[n].name}</strong><p>${esc(RISK[n].blurb)}</p>
        <p class="classes__dests">${destinations.filter((d) => d.risk === n).map((d) => `<a href="${link(d)}">${esc(d.label)}</a>`).join(', ') || '<span class="muted">No current destination</span>'}</p></li>`).join('')}
    </ol>
  </div>
</section>

<div class="adv-wrap">
  <div class="container adv-layout">
    <nav class="adv-nav" aria-label="Advisory sections">
      <p class="eyebrow">On this page</p>
      <ol>${advisorySections.map((s, i) => `<li><a href="#${s.id}"><span>${i + 1}</span>${esc(s.name)}</a></li>`).join('')}
        <li><a href="#emergency"><span>!</span>Emergency return</a></li><li><a href="#advisory-faq"><span>?</span>Advisory FAQ</a></li></ol>
    </nav>
    <div class="adv-content">
      ${advisorySections.map(section).join('\n')}
    </div>
  </div>
</div>

<section class="section section--burgundy emergency grain" id="emergency" aria-labelledby="em-h">
  <div class="container">
    <header class="section-head"><p class="eyebrow">Emergency return protocol</p><h2 class="display display--lg" id="em-h">If something goes wrong: <em>R.E.T.U.R.N.</em></h2>
      <p class="section-head__aside">Memorise it. Print it. Sew it into something. Six steps, in order.</p></header>
    <ol class="protocol">
      ${returnProtocol.map((s, i) => `<li class="protocol__step"><span class="protocol__k">${s.k}</span><span class="protocol__i">0${i + 1}</span><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section--paper faq-sec" id="advisory-faq" aria-labelledby="afaq-h">
  <div class="container faq-sec__grid">
    <header><p class="eyebrow">Advisory FAQ</p><h2 class="display display--md" id="afaq-h">Questions you will <em>definitely ask.</em></h2>
      <p class="muted">More in the <a href="faq.html">Paradox FAQ</a>.</p></header>
    <div class="faq">${advisoryFaq.map((f) => faqItem(f.q, f.a)).join('')}</div>
  </div>
</section>

<section class="section section--ink grain cta-band" aria-labelledby="acta">
  <div class="container cta-band__inner">
    <div><p class="eyebrow">Prepared?</p><h2 class="display display--lg" id="acta">Then choose <em>your century.</em></h2>
      <p class="links-row"><a class="link-arrow" href="destinations.html">Browse destinations</a><a class="link-arrow" href="packing.html">Open the packing list</a><a class="link-arrow" href="faq.html">Read the Paradox FAQ</a></p></div>
    <a class="btn-ticket btn-ticket--lg" href="booking.html"><span>Plan Your Journey</span></a>
  </div>
</section>`;

  return layout({
    file: 'advisories.html',
    title: 'Travel Advisories',
    desc: 'Fictional travel-safety guidance for temporal tourists: a five-class risk system, numbered advisories, a pre-departure checklist and the R.E.T.U.R.N. emergency protocol.',
    body,
    headerTheme: 'dark',
    bodyClass: 'page-advisories',
  });
}

function faqItem(q, a) {
  return `<details class="faq__item"><summary><span>${esc(q)}</span><i aria-hidden="true"></i></summary><div class="faq__a"><p>${esc(a)}</p></div></details>`;
}

function checklistHtml() {
  return `<div class="checklist" data-checklist="ct-adv-before" aria-labelledby="chk-h">
    <div class="checklist__head"><h3 class="h3" id="chk-h">Pre-departure checklist</h3>
      <p class="checklist__progress"><span data-progress-text>0 of ${checklistBefore.length}</span><span class="bar" aria-hidden="true"><i data-progress-bar></i></span></p></div>
    <ul>${checklistBefore.map((t, i) => `<li><label class="check"><input type="checkbox" data-item="${i}"><span class="check__box" aria-hidden="true"></span><span class="check__label">${esc(t)}</span></label></li>`).join('')}</ul>
    <button class="btn btn--dark btn--small" type="button" data-reset>Reset checklist</button>
  </div>`;
}

/* ===================== BOOKING ===================== */
export function bookingPage() {
  const tiles = destinations.map((d) => `<label class="tile">
      <input class="tile__input" type="radio" name="dest" value="${d.id}" required>
      <span class="tile__box">
        <span class="tile__thumb">${img(d.image, { sizes: '96px', pos: d.pos })}</span>
        <span class="tile__text"><span class="tile__num">${d.num}</span><strong>${esc(d.name)}</strong><small>${esc(d.eraLine)}</small></span>
        <span class="tile__risk">${riskMeter(d.risk, { compact: true })}</span>
      </span></label>`).join('');

  const pkgs = packages.map((p) => {
    const d = byId(p.dest);
    return `<article class="pkg">
      <p class="meta">${esc(d.eraLine)}</p>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.blurb)}</p>
      <p class="pkg__meta"><span>${p.days} day${p.days > 1 ? 's' : ''}</span><span>${esc(CLASSES.find((c) => c.id === p.cls).name)} class</span>${riskMeter(d.risk, { compact: true })}</p>
      <p class="pkg__price" data-pkg-price="${p.id}">—</p>
      <button class="btn btn--dark btn--small" type="button" data-package="${p.id}">Use this package</button>
    </article>`;
  }).join('');

  const body = `
<section class="page-hero page-hero--paper" aria-labelledby="bk-h">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Booking · The concierge desk</p>
      <h1 class="display display--xl" id="bk-h">Your next life is a <em>departure away.</em></h1>
    </div>
    <div class="page-hero__aside">
      <p class="lede">Tell the concierge where, when and how. We will handle the centuries.</p>
      <p class="fiction-note"><span class="fiction-note__badge">Prototype</span><span>A design prototype. Prices are illustrative, in a fictional currency (<strong>TC</strong>, Time Credits). No real reservation or payment is made, and nothing leaves your browser.</span></p>
    </div>
  </div>
</section>

<section class="section section--paper-2 packages" aria-labelledby="pkg-h" data-packages>
  <div class="container">
    <header class="section-head section-head--paper"><p class="eyebrow">Sample packages</p><h2 class="display display--md" id="pkg-h">Four ways to <em>begin.</em></h2>
      <p class="section-head__aside">Curated itineraries to start from. Choose one to pre-fill the form below, then adjust anything you like.</p></header>
    <div class="pkgs">${pkgs}</div>
  </div>
</section>

<section class="section section--paper booking" id="plan" aria-labelledby="plan-h">
  <div class="container booking__grid">
    <div class="booking__formcol" data-form-col>
      <h2 class="display display--md" id="plan-h">Plan your <em>journey.</em></h2>
      <div class="errors" id="form-errors" role="alert" tabindex="-1" hidden></div>
      <form id="booking-form" novalidate>
        <fieldset class="fs">
          <legend><span class="fs__n">01</span> Destination</legend>
          <div class="tiles" id="dest-tiles">${tiles}</div>
          <p class="field__error" id="err-dest" hidden></p>
        </fieldset>

        <fieldset class="fs">
          <legend><span class="fs__n">02</span> Departure &amp; party</legend>
          <div class="fields">
            <div class="field">
              <label for="date">Departure date</label>
              <input type="date" id="date" name="date" required aria-describedby="date-help err-date">
              <p class="field__help" id="date-help">Your own calendar. We handle the arrival era.</p>
              <p class="field__error" id="err-date" hidden></p>
            </div>
            <div class="field">
              <label for="travellers">Travellers</label>
              <div class="stepper">
                <button type="button" class="stepper__btn" data-step="-1" aria-label="Fewer travellers">−</button>
                <input type="number" id="travellers" name="travellers" min="1" max="6" value="2" inputmode="numeric" aria-describedby="trav-help">
                <button type="button" class="stepper__btn" data-step="1" aria-label="More travellers">+</button>
              </div>
              <p class="field__help" id="trav-help">Between 1 and 6. Larger parties require a separate gate.</p>
            </div>
          </div>
        </fieldset>

        <fieldset class="fs">
          <legend><span class="fs__n">03</span> Duration &amp; class</legend>
          <p class="fs__label" id="dur-label">Journey duration (destination time)</p>
          <div class="segs" role="radiogroup" aria-labelledby="dur-label" id="dur-group">
            ${[1, 3, 7, 14].map((n) => `<label class="seg"><input type="radio" name="days" value="${n}"${n === 7 ? ' checked' : ''}><span>${n} day${n > 1 ? 's' : ''}</span></label>`).join('')}
          </div>
          <p class="field__help" id="dur-help">Choose a destination to see its available durations.</p>
          <p class="fs__label" id="cls-label">Travel class</p>
          <div class="classes-pick" role="radiogroup" aria-labelledby="cls-label">
            ${CLASSES.map((c, i) => `<label class="cpick"><input type="radio" name="cls" value="${c.id}"${i === 1 ? ' checked' : ''}><span class="cpick__box"><strong>${c.name}</strong><small>${esc(c.blurb)}</small><em>×${c.mult.toFixed(2)}</em></span></label>`).join('')}
          </div>
        </fieldset>

        <fieldset class="fs">
          <legend><span class="fs__n">04</span> Expedition preferences <span class="muted">(optional)</span></legend>
          <div class="prefs">
            ${PREFS.map((p) => `<label class="pref"><input type="checkbox" name="prefs" value="${p.id}"><span class="pref__box"><strong>${esc(p.label)}</strong><small>${esc(p.note)}</small><em>${p.price ? '+' + money(p.price) + ' / ' + p.per : 'No charge'}</em></span></label>`).join('')}
          </div>
        </fieldset>

        <fieldset class="fs">
          <legend><span class="fs__n">05</span> Manifest</legend>
          <div class="field">
            <label for="alias">Traveller alias</label>
            <input type="text" id="alias" name="alias" required minlength="2" maxlength="40" autocomplete="nickname" placeholder="A first name or nickname" aria-describedby="alias-help err-alias">
            <p class="field__help" id="alias-help">That’s all we ask. No email, no address, no payment details. This is a prototype.</p>
            <p class="field__error" id="err-alias" hidden></p>
          </div>
        </fieldset>

        <div class="form-actions">
          <button class="btn-ticket btn-ticket--lg" type="submit"><span>Review your journey</span></button>
          <p class="small muted">No real reservation or payment is made. Illustrative prices in fictional Time Credits (TC).</p>
        </div>
      </form>
    </div>

    <aside class="summary" id="summary" aria-label="Your journey summary" aria-live="polite">
      <div class="summary__empty" data-summary-empty>
        <p class="eyebrow">Your journey</p>
        <p class="display display--md">Choose a destination and <em>your itinerary will take shape here.</em></p>
        <p class="muted">The summary updates as you make each choice: the era, the risk, a day-by-day sketch and an itemised, entirely fictional cost.</p>
      </div>
      <div class="summary__full" data-summary-full hidden>
        <div class="summary__img" data-s-img></div>
        <div class="summary__body">
          <p class="meta" data-s-kind></p>
          <h3 class="summary__title" data-s-name></h3>
          <p class="summary__era" data-s-era></p>
          <p data-s-risk></p>
          <p class="small muted" data-s-hazard></p>
          <h4 class="summary__h">Itinerary preview</h4>
          <ol class="sitin" data-s-itin></ol>
          <h4 class="summary__h">Cost breakdown <span class="muted">· illustrative</span></h4>
          <table class="cost"><tbody data-s-cost></tbody><tfoot><tr><th scope="row">Total</th><td data-s-total>—</td></tr></tfoot></table>
          <p class="small muted">Fictional Time Credits. Not a real price, quote or offer.</p>
        </div>
      </div>
    </aside>
  </div>
</section>

<a class="mini" href="#summary" data-mini hidden><span class="mini__label">Your journey</span><span class="mini__name" data-mini-name></span><strong class="mini__total" data-mini-total></strong></a>

<section class="section section--ink grain confirm" id="confirmation" aria-labelledby="conf-h" tabindex="-1" hidden>
  <div class="container">
    <p class="eyebrow">Journey reviewed</p>
    <h2 class="display display--lg" id="conf-h">Your departure is <em>drafted.</em></h2>
    <p class="lede">Lovely choice. Here is your temporal boarding pass, a keepsake of a journey that exists only in this browser tab.</p>
    <div class="pass" data-pass>
      <div class="pass__main">
        <p class="pass__brand">CHRONOTERRA <span>Temporal boarding pass</span></p>
        <h3 class="pass__dest" data-c-name></h3>
        <p class="pass__era" data-c-era></p>
        <dl class="pass__grid">
          <div><dt>Traveller</dt><dd data-c-alias></dd></div>
          <div><dt>Departure</dt><dd data-c-date></dd></div>
          <div><dt>Party</dt><dd data-c-party></dd></div>
          <div><dt>Class</dt><dd data-c-class></dd></div>
          <div><dt>Duration</dt><dd data-c-days></dd></div>
          <div><dt>Coordinate</dt><dd data-c-coords class="mono"></dd></div>
          <div><dt>Risk</dt><dd data-c-risk></dd></div>
          <div><dt>Preferences</dt><dd data-c-prefs></dd></div>
        </dl>
      </div>
      <div class="pass__stub">
        <p class="meta-label">Reference</p>
        <p class="pass__ref mono" data-c-ref></p>
        <div class="pass__barcode" aria-hidden="true"></div>
        <p class="meta-label">Illustrative total</p>
        <p class="pass__total" data-c-total></p>
        <span class="pass__stamp" aria-hidden="true">${stamp('PROTOTYPE', 'REVIEWED · NOT A RESERVATION · FICTIONAL · ', '')}</span>
      </div>
    </div>
    <div class="confirm__disclaimer"><strong>Please note:</strong> this is a design prototype. <strong>No reservation or payment has been made</strong>, no data has been sent anywhere, and no time travel is available. The boarding pass is a souvenir.</div>
    <div class="confirm__next">
      <div><span class="steps__n">01</span><h3>Read the advisories</h3><p>Fictional, but charming, and good practice for the real world.</p><a class="link-arrow" href="advisories.html">Travel advisories</a></div>
      <div><span class="steps__n">02</span><h3>Pack for the century</h3><p>Check items off the interactive packing list.</p><a class="link-arrow" href="packing.html">Packing list</a></div>
      <div><span class="steps__n">03</span><h3>Learn the paradoxes</h3><p>Past selves, closed portals and souvenirs, answered.</p><a class="link-arrow" href="faq.html">Paradox FAQ</a></div>
    </div>
    <p class="confirm__actions"><button class="btn btn--gold" type="button" data-edit>Edit this journey</button><button class="btn btn--ghost" type="button" data-new>Plan another journey</button></p>
  </div>
</section>`;

  return layout({
    file: 'booking.html',
    title: 'Plan Your Journey',
    desc: 'A prototype booking concierge for time travel. Choose a destination, date, party and class, then review an illustrative itinerary and cost. No real booking or payment.',
    body,
    headerTheme: 'light',
    bodyClass: 'page-booking',
    scripts: ['assets/js/data.js'],
  });
}

export function dataJs() {
  const data = {
    destinations: destinations.map((d) => ({
      id: d.id, name: d.name, short: d.label, era: d.era, eraLine: d.eraLine, place: d.place, coords: d.coords,
      kind: d.kind, kindLabel: KINDS[d.kind].label, risk: d.risk, riskName: RISK[d.risk].name, hazard: d.hazard,
      days: d.days, allowedDays: d.allowedDays, perDay: d.perDay, levy: d.levy, image: d.image, pos: d.pos,
      expedition: d.expedition, itinerary: d.itinerary, url: link(d),
    })),
    classes: CLASSES,
    prefs: PREFS,
    packages,
    risk: RISK,
  };
  return `// Generated by tools/build.mjs — do not edit.\nwindow.CT = ${JSON.stringify(data, null, 1)};\n`;
}

/* ===================== JOURNAL ===================== */
export function journalPage() {
  const [first, ...rest] = journal;
  const meta = (j) => `<p class="meta">${esc(j.filed)} · ${readTime(j)} min read</p>`;
  const ref = (j) => {
    const d = byId(j.dest);
    return `<p class="note__ref">${esc(j.author)} · ${esc(j.role)} · <span class="mono">${esc(j.exp)}</span><br>Filed from <a href="${link(d)}">${esc(d.eraLine)}</a></p>`;
  };
  const body = `
<section class="page-hero page-hero--paper" aria-labelledby="j-h">
  <div class="container page-hero__grid">
    <div><p class="eyebrow">Field Journal</p><h1 class="display display--xl" id="j-h">Field notes from <em>elsewhen.</em></h1></div>
    <div class="page-hero__aside"><p class="lede">Dispatches from travellers who came back, filed within seventy-two hours, as the Board insists.</p>
      <p class="small muted"><span class="fiction-note__badge">Fiction</span> Every diarist, expedition and entry is invented. Historical settings are interpretive; speculative settings are pure imagination.</p></div>
  </div>
</section>

<section class="section section--paper journal-index">
  <div class="container">
    <article class="jfeature reveal">
      <a class="jfeature__media" href="journal-${first.id}.html" tabindex="-1" aria-hidden="true">${img(first.img, { sizes: '(min-width: 900px) 60vw, 100vw', pos: first.pos })}</a>
      <div class="jfeature__body"><p class="eyebrow">Latest entry</p>${meta(first)}
        <h2 class="jfeature__title"><a href="journal-${first.id}.html">${esc(first.title)}</a></h2>
        <p class="lede">${esc(first.excerpt)}</p>${ref(first)}
        <a class="link-arrow" href="journal-${first.id}.html">Read the entry <span class="sr-only">“${esc(first.title)}”</span></a></div>
    </article>
    <div class="jgrid">
      ${rest.map((j, i) => `<article class="jcard jcard--${i % 3} reveal"><a class="jcard__media" href="journal-${j.id}.html" tabindex="-1" aria-hidden="true">${img(j.img, { sizes: '(min-width: 900px) 34vw, 100vw', pos: j.pos })}</a>
        ${meta(j)}<h3 class="jcard__title"><a href="journal-${j.id}.html">${esc(j.title)}</a></h3><p>${esc(j.excerpt)}</p>${ref(j)}
        <a class="link-arrow link-arrow--small" href="journal-${j.id}.html">Read the entry <span class="sr-only">“${esc(j.title)}”</span></a></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--ink grain cta-band" aria-labelledby="jcta">
  <div class="container cta-band__inner"><div><p class="eyebrow">Your turn</p><h2 class="display display--lg" id="jcta">Make the <em>next entry.</em></h2><p class="muted-light">Fictional diaries need real itineraries. Well. Imaginary ones.</p></div>
    <a class="btn-ticket btn-ticket--lg" href="booking.html"><span>Plan Your Journey</span></a></div>
</section>`;
  return layout({
    file: 'journal.html',
    title: 'Field Journal',
    desc: 'Five fictional travel diaries from across time: a misjudged bow in Agra, arguments in Alexandria, the last day of Wi-Fi, dinner in the year 3000, and four minutes of the first dawn.',
    body,
    headerTheme: 'light',
    bodyClass: 'page-journal',
  });
}

export function journalArticle(j) {
  const i = journal.indexOf(j);
  const prev = journal[(i + journal.length - 1) % journal.length];
  const next = journal[(i + 1) % journal.length];
  const d = byId(j.dest);
  const body = `
<article class="article">
  <header class="article-hero grain">
    <div class="article-hero__media">${img(j.img, { sizes: '100vw', eager: true, pos: j.pos })}</div>
    <div class="article-hero__shade" aria-hidden="true"></div>
    <div class="container article-hero__inner">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="journal.html">Field Journal</a><span aria-hidden="true">/</span><span>${esc(j.title)}</span></nav>
      <p class="meta"><span class="fiction-note__badge">Fiction</span> A fictional field note</p>
      <h1 class="display display--xl">${esc(j.title)}</h1>
    </div>
  </header>
  <div class="container article__layout">
    <aside class="article__meta" aria-label="Entry details">
      <dl>
        <div><dt>Filed by</dt><dd>${esc(j.author)}</dd></div>
        <div><dt>Class</dt><dd>${esc(j.role)}</dd></div>
        <div><dt>Expedition</dt><dd class="mono">${esc(j.exp)}</dd></div>
        <div><dt>Travelled</dt><dd>${esc(j.travelled)}</dd></div>
        <div><dt>Filed</dt><dd>${esc(j.filed)}</dd></div>
        <div><dt>Reading time</dt><dd>${readTime(j)} min</dd></div>
      </dl>
    </aside>
    <div class="article__body">
      ${j.body.map((p, n) => `<p class="${n === 0 ? 'dropcap' : ''}">${esc(p)}</p>${n === 1 ? `<blockquote class="pull">${esc(j.excerpt)}</blockquote>` : ''}`).join('\n')}
      <p class="article__sign">— ${esc(j.author)}, ${esc(j.exp)}</p>
    </div>
  </div>
  <section class="article__dest container" aria-labelledby="ad-h">
    <div class="destcard">
      <a class="destcard__media" href="${link(d)}" tabindex="-1" aria-hidden="true">${img(d.image, { sizes: '(min-width: 900px) 30vw, 100vw', pos: d.pos })}</a>
      <div class="destcard__body"><p class="eyebrow" id="ad-h">Visit this destination</p><h2 class="display display--md">${esc(d.name)}</h2>
        <p class="muted">${esc(d.eraLine)}</p><p>${esc(d.tagline)}</p>${riskMeter(d.risk)}
        <p class="destcard__links"><a class="btn btn--dark" href="${link(d)}">View expedition</a><a class="link-arrow" href="booking.html?dest=${d.id}">Book this era</a></p></div>
    </div>
  </section>
</article>
<nav class="pager" aria-label="Other entries">
  <a class="pager__link" href="journal-${prev.id}.html" rel="prev"><span class="eyebrow">Previous entry</span><strong>${esc(prev.title)}</strong><span class="muted">${esc(prev.author)} · ${esc(prev.travelled)}</span></a>
  <a class="pager__link pager__link--next" href="journal-${next.id}.html" rel="next"><span class="eyebrow">Next entry</span><strong>${esc(next.title)}</strong><span class="muted">${esc(next.author)} · ${esc(next.travelled)}</span></a>
</nav>`;
  return layout({
    file: `journal-${j.id}.html`,
    title: j.title,
    desc: `${j.excerpt} A fictional field note from ${j.travelled}.`,
    body,
    headerTheme: 'dark',
    bodyClass: 'page-article',
    ogImage: `assets/img/${j.img}-md.jpg`,
  });
}

/* ===================== PACKING ===================== */
export function packingPage() {
  const total = packing.reduce((n, c) => n + c.items.length, 0);
  const body = `
<section class="page-hero page-hero--paper packing-hero" aria-labelledby="p-h">
  <div class="container page-hero__grid">
    <div><p class="eyebrow">Packing list</p><h1 class="display display--xl" id="p-h">Pack for the <em>century.</em></h1></div>
    <div class="page-hero__aside">
      <p class="lede">Every era has a dress code, and none of them is “whatever was clean.”</p>
      <p class="small muted">Tick items as you pack. Your list is saved on this device. Items marked <span class="prop-tag">Prop</span> are <strong>imaginary devices</strong> from the world of CHRONOTERRA; they are not real equipment.</p>
      <figure class="packing-hero__fig">${img('prop-astrolabe', { sizes: '250px', pos: '50% 40%' })}<figcaption>A brass astrolabe, a traveller’s trusted instrument before the satellite. Museum photograph, public domain (CC0).</figcaption></figure>
    </div>
  </div>
</section>

<section class="section section--paper pack" aria-label="Packing checklist">
  <div class="container pack__layout" data-checklist="ct-packing" data-total="${total}">
    <aside class="pack__side">
      <div class="progress-card">
        <svg class="ring" viewBox="0 0 120 120" role="img" aria-label="Packing progress"><circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-opacity=".15" stroke-width="6"/><circle class="ring__bar" cx="60" cy="60" r="52" fill="none" stroke="var(--gold)" stroke-width="6" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="326.7" transform="rotate(-90 60 60)"/></svg>
        <div class="progress-card__text"><p class="progress-card__pct" data-progress-pct>0%</p><p data-progress-text>0 of ${total} packed</p></div>
        <p class="progress-card__msg" data-progress-msg>Nothing packed yet. A bold choice.</p>
        <div class="bar" aria-hidden="true"><i data-progress-bar></i></div>
        <button class="btn btn--dark btn--small btn--block" type="button" data-reset>Reset the list</button>
      </div>
      <nav class="pack__jump" aria-label="Categories"><p class="eyebrow">Categories</p><ol>${packing.map((c) => `<li><a href="#${c.id}">${esc(c.name)}</a></li>`).join('')}</ol></nav>
    </aside>
    <div class="pack__cats">
      ${packing.map((c, ci) => `<fieldset class="pcat" id="${c.id}">
        <legend><span class="pcat__n">0${ci + 1}</span><span class="pcat__name">${esc(c.name)}</span></legend>
        <p class="pcat__note">${esc(c.note)}</p>
        <ul>${c.items.map((it, ii) => `<li><label class="check"><input type="checkbox" data-item="${c.id}-${ii}"><span class="check__box" aria-hidden="true"></span><span class="check__label"><strong>${esc(it.t)}</strong>${it.prop ? ' <span class="prop-tag">Prop</span>' : ''}<small>${esc(it.n.replace(/^PROP · /, ''))}</small></span></label></li>`).join('')}</ul>
      </fieldset>`).join('')}
    </div>
  </div>
</section>

<section class="section section--ink grain cta-band" aria-labelledby="pcta">
  <div class="container cta-band__inner"><div><p class="eyebrow">Packed?</p><h2 class="display display--lg" id="pcta">Then there is only <em>the departure.</em></h2><p class="links-row"><a class="link-arrow" href="advisories.html">Re-read the advisories</a><a class="link-arrow" href="faq.html">Paradox FAQ</a></p></div>
    <a class="btn-ticket btn-ticket--lg" href="booking.html"><span>Plan Your Journey</span></a></div>
</section>`;
  return layout({
    file: 'packing.html',
    title: 'Packing List',
    desc: 'An interactive temporal packing checklist: universal essentials, period clothing, future environments, documentation and emergency return equipment. Fictional props are clearly marked.',
    body,
    headerTheme: 'light',
    bodyClass: 'page-packing',
  });
}

/* ===================== FAQ ===================== */
export function faqPage() {
  const total = faqGroups.reduce((n, g) => n + g.items.length, 0);
  const body = `
<section class="page-hero page-hero--ink grain faq-hero" aria-labelledby="f-h">
  <div class="faq-hero__loop" aria-hidden="true"><svg viewBox="0 0 200 120"><path d="M100 60C100 20 40 20 40 60s60 40 60 0 60-40 60 0-60 40-60 0z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle class="loop-dot" r="3.5" fill="var(--gold)"><animateMotion dur="9s" repeatCount="indefinite" path="M100 60C100 20 40 20 40 60s60 40 60 0 60-40 60 0-60 40-60 0z"/></circle></svg></div>
  <div class="container page-hero__grid">
    <div><p class="eyebrow">Paradox FAQ</p><h1 class="display display--xl" id="f-h">Paradox, <em>answered.</em></h1></div>
    <div class="page-hero__aside"><p class="lede">Past selves, closed portals and the correct way to hold a souvenir.</p>
      <p class="small muted-light">Answers are fictional and internally consistent; the last one is the only one that is entirely true.</p></div>
  </div>
</section>

<section class="section section--paper faq-page" aria-label="Frequently asked questions" data-faq>
  <div class="container">
    <div class="faq-tools">
      <div class="field field--inline"><label for="faq-search">Search the paradoxes</label><input type="search" id="faq-search" placeholder="e.g. souvenirs, portal, past self" autocomplete="off"></div>
      <div class="faq-tools__btns"><button class="btn btn--dark btn--small" type="button" data-expand>Expand all</button><button class="btn btn--ghost-dark btn--small" type="button" data-collapse>Collapse all</button></div>
      <p class="small muted" role="status" aria-live="polite"><span data-faq-count>${total}</span> of ${total} questions shown</p>
    </div>
    ${faqGroups.map((g) => `<div class="faq-group" data-group><h2 class="faq-group__h"><span>${esc(g.name)}</span></h2><div class="faq">${g.items.map((f) => faqItem(f.q, f.a)).join('')}</div></div>`).join('')}
    <p class="faq-empty" data-faq-empty hidden>No paradox matches that. Try fewer words, or fewer centuries.</p>
  </div>
</section>

<section class="section section--ink grain cta-band" aria-labelledby="fcta">
  <div class="container cta-band__inner"><div><p class="eyebrow">Still curious?</p><h2 class="display display--lg" id="fcta">Ask the <em>centuries</em> in person.</h2><p class="links-row"><a class="link-arrow" href="advisories.html">Travel advisories</a><a class="link-arrow" href="journal.html">Field Journal</a></p></div>
    <a class="btn-ticket btn-ticket--lg" href="booking.html"><span>Plan Your Journey</span></a></div>
</section>`;
  return layout({
    file: 'faq.html',
    title: 'Paradox FAQ',
    desc: 'The Paradox FAQ: can I meet my past self, can I change history, what if my portal closes, and can I bring souvenirs back? Fictional answers, searchable.',
    body,
    headerTheme: 'dark',
    bodyClass: 'page-faq',
  });
}

/* ===================== CREDITS ===================== */
export const usedFor = {
  'hero': 'Homepage hero (composite artwork)',
  'mughal-jahangiri': 'The Mughal Court',
  'mughal-khas': 'The Mughal Court (gallery), Field Journal',
  'mughal-jali': 'The Mughal Court (gallery)',
  'mughal-arch': 'The Mughal Court (gallery)',
  'mughal-painting': 'The Mughal Court (gallery)',
  'future-a': 'New Earth', 'future-b': 'New Earth (gallery), Field Journal', 'future-c': 'New Earth, hero composite', 'future-d': 'New Earth (gallery)',
  'wifi-a': 'The Last Day of Wi-Fi', 'wifi-b': 'The Last Day of Wi-Fi (gallery), Field Journal',
  'alex-corniche': 'Alexandria, After Dark', 'alex-sunset': 'Alexandria (gallery), Field Journal',
  'alex-pillar': 'Alexandria (gallery)', 'alex-citadel': 'Alexandria (gallery)',
  'green-a': 'The Carbon-Free City', 'green-b': 'The Carbon-Free City',
  'dawn-a': 'The First Dawn', 'dawn-b': 'The First Dawn (gallery), Field Journal', 'dawn-c': 'The First Dawn (gallery)',
  'sky-bridge': 'Homepage invitation', 'prop-astrolabe': 'Packing list',
  'mughal-panch': 'Hero composite (source)', 'sky-milkyway': 'Hero composite (source)',
};

export function creditsPage() {
  const credits = JSON.parse(fs.readFileSync(path.join(here, 'credits.json'), 'utf8'));
  const rows = Object.entries(usedFor)
    .filter(([k]) => credits[k])
    .map(([k, use]) => {
      const c = credits[k];
      return `<tr><th scope="row"><a href="${esc(c.page)}" rel="noopener">${esc(c.title.replace(/_/g, ' '))}</a></th><td>${esc(c.author || 'Unknown')}</td><td>${c.licenseUrl ? `<a href="${esc(c.licenseUrl)}" rel="noopener">${esc(c.license)}</a>` : esc(c.license)}</td><td>${esc(use)}</td></tr>`;
    })
    .join('');
  const body = `
<section class="page-hero page-hero--paper" aria-labelledby="c-h">
  <div class="container page-hero__grid">
    <div><p class="eyebrow">Credits</p><h1 class="display display--xl" id="c-h">With <em>thanks.</em></h1></div>
    <div class="page-hero__aside"><p class="lede">Photographs, typefaces and tools used to build CHRONOTERRA.</p>
      <p class="small muted">CHRONOTERRA is a fictional agency. Its photographs are real images of real places and artefacts, found on Wikimedia Commons under open licences, shown here as stand-ins for imagined destinations. We did not take them and do not claim to.</p></div>
  </div>
</section>
<section class="section section--paper credits">
  <div class="container">
    <h2 class="display display--md">Photography</h2>
    <p class="muted">All images were resized, cropped and colour-graded for this site. The homepage hero is a composite of three of them and is therefore shared under <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="noopener">CC BY-SA 4.0</a>.</p>
    <div class="table-wrap"><table class="credit-table"><thead><tr><th scope="col">Work (Wikimedia Commons)</th><th scope="col">Author</th><th scope="col">Licence</th><th scope="col">Used for</th></tr></thead><tbody>${rows}</tbody></table></div>
    <h2 class="display display--md">Typefaces</h2>
    <ul class="plain"><li><strong>Instrument Serif</strong> by Rodrigo Fuenzalida &amp; Jordan Egstad, SIL Open Font Licence 1.1</li><li><strong>Hanken Grotesk</strong> by Hanken Design Co., SIL Open Font Licence 1.1</li><li><strong>IBM Plex Mono</strong> by IBM, SIL Open Font Licence 1.1</li></ul>
    <h2 class="display display--md">Everything else</h2>
    <p>All copy, layout, SVG artwork, motifs and code were created for this project. Historical statements are labelled as context and kept deliberately modest; all destinations marked fiction are invented.</p>
  </div>
</section>`;
  return layout({
    file: 'credits.html',
    title: 'Credits',
    desc: 'Photography, typeface and tool credits for the CHRONOTERRA design project.',
    body,
    headerTheme: 'light',
    bodyClass: 'page-credits',
  });
}
