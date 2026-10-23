// CHRONOTERRA — content & data. Everything on the site is generated from this module.
// All destinations, advisories and diaries are FICTION unless explicitly marked as historical context.

/* ---------- Image registry (large-variant dimensions; md = ~half) ---------- */
export const IMAGES = {
  'hero': { w: 2400, h: 1350, alt: 'The five-storey Panch Mahal of Fatehpur Sikri under a Milky Way sky, with the glowing canopy of a giant futuristic tree rising behind its tower. A composite artwork.' },
  'mughal-jahangiri': { w: 1800, h: 1197, alt: 'Carved red-sandstone balconies and courtyard of the Jahangiri Mahal inside Agra Fort, seen from below against a clear sky' },
  'mughal-khas': { w: 1800, h: 1197, alt: 'White marble pavilion of the Diwan-i-Khas at Agra Fort above a geometric garden' },
  'mughal-jali': { w: 1800, h: 1184, alt: 'A marble lattice window carved with floral motifs, framed by panels and Persian inscription, at Agra Fort' },
  'mughal-arch': { w: 1800, h: 1077, alt: 'A vaulted arch with geometric tilework and star motifs inside the Jahangiri Mahal, Agra Fort' },
  'mughal-sikri': { w: 1800, h: 1125, alt: 'Domed red-sandstone prayer hall and wide courtyard at Fatehpur Sikri near Agra' },
  'mughal-panch': { w: 1800, h: 1302, alt: 'The five-storey Panch Mahal pavilion at Fatehpur Sikri rising above a sandstone wall' },
  'mughal-taj': { w: 1800, h: 1200, alt: 'Red-sandstone domes and a chhatri silhouetted at sunset within the Taj Mahal complex, Agra' },
  'mughal-painting': { w: 1422, h: 2200, alt: 'A Mughal miniature painting showing Shah Jahan watching an elephant fight, from a Padshahnama folio' },
  'future-a': { w: 1800, h: 1200, alt: 'Giant illuminated tree-like structures and a glowing skyway against a night sky' },
  'future-b': { w: 1800, h: 1018, alt: 'A giant tree-like structure glowing blue and violet, flanked by others studded with golden lights' },
  'future-c': { w: 1467, h: 2200, alt: 'Looking up the green, planted trunk of a giant tree-like structure towards its glowing canopy' },
  'future-d': { w: 1800, h: 1200, alt: 'Canopies of illuminated tree-like structures seen from below at night' },
  'wifi-a': { w: 1800, h: 1198, alt: 'A quiet neon-lit city street at night with parked scooters and empty seating' },
  'wifi-b': { w: 1800, h: 1200, alt: 'An empty night street under a single bright streetlamp, with tangled overhead cables' },
  'alex-corniche': { w: 1800, h: 1350, alt: 'The curving waterfront of Alexandria at night, its road and buildings glowing beside a dark sea' },
  'alex-sunset': { w: 1800, h: 1350, alt: 'Storm clouds breaking over the Mediterranean at Alexandria, a low silhouette on the horizon' },
  'alex-pillar': { w: 1800, h: 1061, alt: 'Pompey’s Pillar rising above ruins in Alexandria, seen from a wooden walkway' },
  'alex-citadel': { w: 1800, h: 1575, alt: 'The Citadel of Qaitbay, a fifteenth-century fortress on the Alexandria shore' },
  'green-a': { w: 1650, h: 2200, alt: 'A residential tower with trees and plants growing on every balcony' },
  'green-b': { w: 1800, h: 1423, alt: 'A colourful tower wrapped in vertical gardens rising above heritage shophouses' },
  'dawn-a': { w: 1800, h: 1200, alt: 'A lava lake erupting inside a volcanic crater, steam drifting past a distant cone' },
  'dawn-b': { w: 1800, h: 1011, alt: 'A glowing river of molten lava in a volcanic fissure' },
  'dawn-c': { w: 1800, h: 1055, alt: 'Molten lava glowing across a dark landscape beneath volcanic smoke' },
  'dawn-d': { w: 1800, h: 1350, alt: 'Lava fountaining among palm trees at night' },
  'sky-bridge': { w: 1800, h: 1200, alt: 'A lone silhouetted figure on a railing beneath the Milky Way' },
  'sky-milkyway': { w: 1571, h: 2200, alt: 'The Milky Way arching over a dark horizon' },
  'prop-astrolabe': { w: 1684, h: 2200, alt: 'A worn brass astrolabe from Iran, photographed in a museum' },
};

/* ---------- Taxonomy ---------- */
export const RISK = {
  1: { name: 'Serene', blurb: 'A postcard with no consequences. Sensible shoes advised.' },
  2: { name: 'Mild', blurb: 'Minor etiquette, minor jet lag. Resolvable with apologies.' },
  3: { name: 'Elevated', blurb: 'Environmental or cultural hazards. Briefing attendance mandatory.' },
  4: { name: 'Severe', blurb: 'Rapid change, serious hazards. Licensed guide required.' },
  5: { name: 'Extreme', blurb: 'Board escort mandatory. Not survivable unassisted.' },
};

export const KINDS = {
  historical: { label: 'Historical reconstruction', short: 'Historical', note: 'Rooted in the historical record. Daily detail is interpretive.' },
  future: { label: 'Speculative future', short: 'Future', note: 'Imagined. A story about tomorrow, not a prediction.' },
  alternate: { label: 'Alternate-timeline fiction', short: 'Alternate', note: 'A timeline that never happened. Pure invention.' },
  deep: { label: 'Deep-time speculation', short: 'Deep time', note: 'Grounded in geology; everything else is conjecture.' },
};

export const BANDS = {
  deep: 'Deep time',
  antiquity: 'Antiquity',
  'early-modern': 'Early modern',
  present: 'Present day',
  future: 'Futures',
};

export const CLASSES = [
  { id: 'observer', name: 'Observer', mult: 1.0, blurb: 'Shared gate. Look, listen, do not touch.' },
  { id: 'voyager', name: 'Voyager', mult: 1.45, blurb: 'Private lodging, period wardrobe, a named historian-guide.' },
  { id: 'chronarch', name: 'Chronarch', mult: 2.2, blurb: 'Private gate, guaranteed return window, a personal archivist.' },
];

export const PREFS = [
  { id: 'historian', label: 'Guide-historian', price: 650, per: 'day', note: 'A licensed guide, in period dress.' },
  { id: 'cuisine', label: 'Local table', price: 420, per: 'party', note: 'Authentic meals, allergens declared.' },
  { id: 'photo', label: 'Sketch & photography permit', price: 260, per: 'traveller', note: 'Era-safe recording tools only.' },
  { id: 'night', label: 'Night excursions', price: 340, per: 'party', note: 'After-dark access with an escort.' },
  { id: 'quiet', label: 'Quiet itinerary', price: 0, per: 'party', note: 'Fewer crowds, gentler pace.' },
  { id: 'access', label: 'Accessibility support', price: 0, per: 'party', note: 'Step-free routes and extra time, at no charge.' },
];

/* ---------- Destinations ---------- */
export const destinations = [
  {
    id: 'mughal-court', num: '01', name: 'The Mughal Court', label: 'Mughal Court',
    era: '1631 CE', eraLine: 'Agra · 1631 CE', place: 'Agra, Mughal Empire', coords: '27.1795° N, 78.0211° E', year: 1631,
    kind: 'historical', band: 'early-modern', risk: 2,
    hazard: 'Etiquette. A misjudged bow is the likeliest incident of your stay.',
    days: 7, allowedDays: [1, 3, 7, 14], perDay: 2100, levy: 1400,
    expedition: 'CT-1631-AGR',
    tagline: 'Marble, music and the most carefully ranked room on Earth.',
    short: 'Step into the court of Shah Jahan, where imperial architecture, gardens and ceremony were arranged to the finest degree of precision. Wear linen. Speak softly. Bow correctly.',
    long: [
      'Agra in 1631 is a city at the crest of a wave. The Mughal court of Shah Jahan is rebuilding its fort in luminous white marble, its gardens follow the fourfold charbagh plan, and its craftsmen are perfecting the inlay of semi-precious stones into stone, a technique the empire will be remembered for.',
      'Your expedition is arranged around observation, not participation. From a leased riverside house you will watch the machinery of a great court at work: the ordered galleries, the scent of rosewater, the hierarchy of who stands where and for how long. A licensed guide-historian will teach you the salutations that keep visitors out of trouble.',
      'You will not meet the emperor. The Board guarantees nothing of the kind, and neither does history.',
    ],
    highlights: ['A court etiquette tutorial, including the formal salutations', 'Gallery seating at a public audience, at a respectful distance', 'An evening in a walled charbagh garden, with Persian verse', 'Visits to marble-working ateliers under imperial patronage'],
    record: [
      'Shah Jahan reigned from 1628 to 1658. Agra was the imperial capital until the court moved to Shahjahanabad (Delhi) in 1648.',
      'In 1631 Empress Mumtaz Mahal died, and Shah Jahan commissioned the Taj Mahal as her mausoleum. Construction began around 1632 and took roughly two decades.',
      'Court architecture combined Persianate, Timurid and Indian traditions, with red sandstone gradually giving way to white marble under Shah Jahan.',
    ],
    reconstruction: [
      'Your hosts, guide and the specific events you witness are invented for the Board’s itinerary.',
      'Conversation is imagined. Real individuals appear only as the historical record allows, and never speak for themselves in our scenes.',
    ],
    image: 'mughal-jahangiri', pos: '50% 82%',
    gallery: [
      { img: 'mughal-khas', cap: 'The Diwan-i-Khas, Agra Fort (present day). Shah Jahan’s marble building programme was under way in the 1630s.' },
      { img: 'mughal-jali', cap: 'A marble jali screen at Agra Fort (present day).' },
      { img: 'mughal-arch', cap: 'Geometric tilework beneath a vault, Jahangiri Mahal (present day).' },
      { img: 'mughal-painting', cap: 'A Padshahnama folio: Shah Jahan watching an elephant fight. A contemporary Mughal painting (The Met, public domain).' },
    ],
    itinerary: [
      { at: 0, t: 'Arrival', h: 'The riverside house', p: 'Emerge at a Board-leased house on the Yamuna. Fitting for period dress. Return coordinate checked, double-checked, and sewn into your hem.' },
      { at: 0.25, t: 'Etiquette', h: 'The salutation lesson', p: 'Your guide-historian teaches you the taslim and kornish, and how to avoid being noticed doing either badly.' },
      { at: 0.5, t: 'The court', h: 'A public audience', p: 'Observe a great audience from the visitors’ gallery. Count the ranks. Do not point.' },
      { at: 0.75, t: 'Evening', h: 'Garden & verse', p: 'Rosewater, lamps and recitation in a walled garden as the heat of the day breaks.' },
      { at: 1, t: 'Departure', h: 'The return gate', p: 'Dawn along the river. Your return coordinate is verified. Please leave nothing behind, including your sandals.' },
    ],
    advisories: ['ADV-01', 'ADV-07', 'ADV-10', 'ADV-15'],
    alt2: 'mughal-khas',
  },
  {
    id: 'new-earth', num: '02', name: 'New Earth', label: 'New Earth',
    era: '3000 CE', eraLine: 'Earth · 3000 CE', place: 'Earth, far future (imagined)', coords: '1.2816° N, 103.8636° E', year: 3000,
    kind: 'future', band: 'future', risk: 3,
    hazard: 'Disorientation. The city’s ecology is considerably smarter than you.',
    days: 5, allowedDays: [1, 3, 7, 14], perDay: 4200, levy: 3400,
    expedition: 'CT-3000-EAR',
    tagline: 'Where the forests grow upward and the city grows with them.',
    short: 'A speculative Earth of vertical forests, orbital cities and a quiet, negotiated peace between humanity and its machines. An invented future. Nothing here is a prediction.',
    long: [
      'By the year 3000 the old argument between city and wilderness has been settled by dissolving the border. The towers are planted. The canopy is infrastructure. Light is grown, not switched on, and the streets above the clouds are quieter than the ground ever was.',
      'This is the Board’s most speculative offering besides the Hadean one, and the most hopeful. You will dine in the lattice-forest at dusk, ride a lift to a ring-city that hangs where the sky thins, and spend an afternoon in a public conversation with a municipal intelligence that has opinions about your shoes.',
      'It is a story about tomorrow. We have no idea if the real tomorrow will look like it, and we hope it looks better.',
    ],
    highlights: ['Dinner beneath the glowing lattice-trees', 'A lift ascent to the orbital ring district', 'An audience with the municipal intelligence', 'A guided walk through the planted towers'],
    record: [
      'This destination is entirely imagined. There are no historical events to report.',
      'Real-world context: vertical gardens, urban rewilding and orbital engineering are active areas of present-day research and design.',
    ],
    reconstruction: [
      'The city, its people and its machines are invented for this itinerary. Nothing here is a forecast.',
      'The photographs show real structures today, used to suggest a future that does not yet exist.',
    ],
    image: 'future-a', pos: '50% 55%',
    gallery: [
      { img: 'future-b', cap: 'A glowing lattice-tree canopy. Photographed today; imagined here as 3000 CE municipal infrastructure.' },
      { img: 'future-c', cap: 'The planted trunk of a lattice-tree, looking up (present-day photograph).' },
      { img: 'future-d', cap: 'Canopies from below (present-day photograph).' },
    ],
    itinerary: [
      { at: 0, t: 'Arrival', h: 'Ring Gate', p: 'Step out into warm, humid air and a city that smells faintly of rain on leaves. Your clothes will adapt. Your expectations will take longer.' },
      { at: 0.25, t: 'Ascent', h: 'The planted towers', p: 'A guided walk up through terraced forest floors, each one a different climate.' },
      { at: 0.5, t: 'Dinner', h: 'Beneath the lattice-trees', p: 'A long table, a canopy that glows in time with the conversation below it.' },
      { at: 0.75, t: 'Orbit', h: 'The ring district', p: 'A lift ride to the thin edge of the sky. Mind the silence; it is intentional.' },
      { at: 1, t: 'Departure', h: 'Return gate', p: 'Hand back your adaptive garments. The city will remember you fondly, in the way cities do.' },
    ],
    advisories: ['ADV-05', 'ADV-06', 'ADV-12', 'ADV-13'],
    alt2: 'future-b',
  },
  {
    id: 'last-day-of-wifi', num: '03', name: 'The Last Day of Wi-Fi', label: 'Last Day of Wi-Fi',
    era: '2027 CE', eraLine: 'Alternate timeline · 2027 CE', place: 'Earth, alternate timeline B-27', coords: '12.9236° N, 100.8825° E', year: 2027,
    kind: 'alternate', band: 'present', risk: 2,
    hazard: 'Withdrawal. Severe, communal, and oddly poetic.',
    days: 1, allowedDays: [1, 3], perDay: 3900, levy: 600,
    expedition: 'CT-2027-B27',
    tagline: 'One last day, one last signal, twenty-four hours of unfiltered humanity.',
    short: 'A darkly comic expedition to the final day before the world’s Wi-Fi goes permanently silent. A timeline that never happened, and perhaps never could.',
    long: [
      'In Alternate Timeline B-27, a quiet engineering shrug will end the world’s wireless networks at midnight. Nobody knows why. Everybody knows when. This is the last full day of signal, and you have been granted a seat.',
      'Morning is panicked backups and strangers asking for directions out loud. By noon, somebody has organised a farewell group call that nobody can leave. At dusk, in the half-lit streets, the pavement fills with people discovering what a conversation is for.',
      'This is a satire, not a prophecy. The premise is invented, and the Board takes no position on whether you should put your phone down at home.',
    ],
    highlights: ['Noon: the farewell group call that never ends', 'A paper-map navigation lesson from an enthusiastic stranger', 'Dusk: the street fills for the Great Unplugging', 'Midnight: a minute of real, shared silence'],
    record: [
      'This destination is fiction. No known event threatens the world’s Wi-Fi networks.',
      'Real-world context: the premise satirises how much of daily life now depends on connectivity.',
    ],
    reconstruction: [
      'Everything about Timeline B-27 is invented, including the shrug.',
      'Sample photographs show quiet streets at night in the present day. They stand in for a world holding its breath.',
    ],
    image: 'wifi-a', pos: '40% 50%',
    gallery: [
      { img: 'wifi-b', cap: 'A street at night, present day. Imagined here as the last evening of signal.' },
    ],
    itinerary: [
      { at: 0, t: '08:00', h: 'Arrival', p: 'You arrive among people checking their phones with a new, desperate tenderness.' },
      { at: 0.25, t: '10:30', h: 'The last map', p: 'A stranger teaches you to read a paper street map. They are thrilled. You are terrified.' },
      { at: 0.5, t: '12:00', h: 'The group call', p: 'The farewell call begins. It will last for hours. No one remembers how to hang up.' },
      { at: 0.75, t: '19:00', h: 'The Great Unplugging', p: 'The street fills. People talk. A man teaches a dog to fetch with an old router.' },
      { at: 1, t: '23:59', h: 'The Silence', p: 'A minute of shared quiet. Then, somewhere, a radio. Then, gently, everyone laughs.' },
    ],
    advisories: ['ADV-02', 'ADV-06', 'ADV-12', 'ADV-16'],
    alt2: 'wifi-b',
  },
  {
    id: 'alexandria-after-dark', num: '04', name: 'Alexandria, After Dark', label: 'Alexandria',
    era: 'c. 200 BCE', eraLine: 'Alexandria · c. 200 BCE', place: 'Alexandria, Ptolemaic Egypt', coords: '31.2001° N, 29.9187° E', year: -200,
    kind: 'historical', band: 'antiquity', risk: 3,
    hazard: 'Open flame, ancient scholarly feuds, and an overwhelming urge to touch the scrolls.',
    days: 4, allowedDays: [1, 3, 7], perDay: 3000, levy: 2600,
    expedition: 'CT-200BC-ALX',
    tagline: 'Lamplight, scrolls and the first arguments about the shape of the world.',
    short: 'Walk the lamplit streets of the Hellenistic Mediterranean’s great city of learning. An interpretive reconstruction of Alexandria’s intellectual world as the lighthouse burns in the harbour.',
    long: [
      'It is perhaps two hundred years before the common era, and Alexandria is the most argumentative city on Earth. Scholars of a dozen origins gather around the Mouseion and its famous library, cataloguing, correcting and quarrelling. At the harbour mouth the great lighthouse burns, visible from the sea at night.',
      'You will arrive at dusk, as the city turns over to its second life. Lamps in the colonnades. Merchants closing up. A copyist hurrying past with something he is not certain he should be carrying. You will be guided through the city’s evening by a researcher of the Board’s Antiquity desk, whose job is to keep you curious and alive.',
      'A word about honesty: the exact appearance and daily operation of the Library are not known. Much of what you will see is the Board’s interpretation of limited evidence.',
    ],
    highlights: ['Dusk arrival in the harbour beneath the lighthouse fire', 'A lamplit evening in the scholars’ quarter, as a guest', 'An observation night: star-charts and spirited disagreement', 'A symposium supper in a Hellenistic courtyard'],
    record: [
      'Alexandria was founded in 331 BCE and became the capital of Ptolemaic Egypt. Its Mouseion and Library were centres of Hellenistic scholarship.',
      'The Pharos lighthouse was completed around 280 BCE. Eratosthenes, who calculated the Earth’s circumference, worked in the city in the third century BCE.',
      'Around 200 BCE scholars including Aristophanes of Byzantium were active in the Library.',
    ],
    reconstruction: [
      'The Library’s appearance, collection and routines are poorly documented. The Board’s depiction is interpretive, not factual.',
      'Characters, conversations and the symposium you attend are invented. Photographs show present-day Alexandria; ancient structures survive in fragments.',
    ],
    image: 'alex-corniche', pos: '50% 50%',
    gallery: [
      { img: 'alex-sunset', cap: 'The Mediterranean off Alexandria at sunset (present day).' },
      { img: 'alex-citadel', cap: 'The Citadel of Qaitbay (built 1477 CE) stands on the traditional site of the Pharos.' },
      { img: 'alex-pillar', cap: 'Pompey’s Pillar (c. 297 CE) will not exist for another five centuries after your visit.' },
    ],
    itinerary: [
      { at: 0, t: 'Arrival', h: 'The harbour at dusk', p: 'Emerge near the quays as the lighthouse fire catches. Your guide hands you a lamp and a cautionary look.' },
      { at: 0.25, t: 'Evening', h: 'The scholars’ quarter', p: 'Colonnades, copyists and cheerful disagreement over a single line of poetry.' },
      { at: 0.5, t: 'Night', h: 'Observation night', p: 'Lie back on a rooftop and be taught the names of the stars by someone who is quite sure they are right.' },
      { at: 0.75, t: 'Supper', h: 'The symposium', p: 'A courtyard meal where every topic eventually becomes geometry.' },
      { at: 1, t: 'Departure', h: 'Dawn on the harbour', p: 'Return gate beside the water. Do not attempt to purchase a scroll. Yes, we saw you looking.' },
    ],
    advisories: ['ADV-03', 'ADV-07', 'ADV-09', 'ADV-11'],
    alt2: 'alex-sunset',
  },
  {
    id: 'carbon-free-city', num: '05', name: 'The Carbon-Free City', label: 'Carbon-Free City',
    era: '2189 CE', eraLine: 'Earth · 2189 CE', place: 'Earth, near future (imagined)', coords: '41.3275° N, 19.8187° E', year: 2189,
    kind: 'future', band: 'future', risk: 1,
    hazard: 'Unexpected sincerity. Residents will ask how you are, and wait for the answer.',
    days: 6, allowedDays: [1, 3, 7, 14], perDay: 1700, levy: 1100,
    expedition: 'CT-2189-REN',
    tagline: 'A metropolis that learned to give back more than it takes.',
    short: 'Visit an imagined sustainable metropolis built around ecological restoration and public life. A gentle, hopeful and entirely fictional future, and the Board’s easiest expedition.',
    long: [
      'In 2189 the city is a patient work of repair. Rivers run where roads once cut them. Every roof is a field, every facade a habitat. Public life has returned to the streets because there is, finally, enough clean air to stay out in.',
      'Our Class I rating is deserved: this is the one destination where we worry mostly about your enjoyment. You will eat at public kitchens, borrow tools from the seed-and-tool library, and join an evening river-restoration shift with neighbours who will insist on learning your name.',
      'All of it is imagined. We offer it as an itinerary for hope, which seems, on balance, a worthy thing for a tourism board to sell.',
    ],
    highlights: ['A morning at the public kitchens and seed library', 'A canopy-walk across the terraced residential towers', 'An evening river-restoration shift with neighbours', 'A quiet dusk concert on a living rooftop'],
    record: [
      'The Carbon-Free City is an invented place. There are no historical events to report.',
      'Real-world context: biophilic architecture, urban rewilding and low-carbon planning are real fields. Nothing here is a forecast.',
    ],
    reconstruction: [
      'The city, its customs and its residents are imagined for this itinerary.',
      'The photographs show real buildings today that hint at the idea of a planted city.',
    ],
    image: 'green-a', pos: '50% 45%',
    gallery: [
      { img: 'green-b', cap: 'A tower wrapped in gardens above heritage streets (present-day photograph).' },
    ],
    itinerary: [
      { at: 0, t: 'Arrival', h: 'The silent tram', p: 'Glide into the city on a tram you cannot hear. Someone is already waving at you from a balcony garden.' },
      { at: 0.25, t: 'Canopy', h: 'The terraced towers', p: 'A slow ascent through planted balconies where residents trade seedlings and advice.' },
      { at: 0.5, t: 'Midday', h: 'Public kitchens', p: 'Share a long table with strangers. You will be asked to peel something.' },
      { at: 0.75, t: 'Dusk', h: 'River shift', p: 'Join the neighbourhood’s evening restoration of the river, in borrowed boots.' },
      { at: 1, t: 'Departure', h: 'Return gate', p: 'You will be gifted a seed. Please declare it at the gate.' },
    ],
    advisories: ['ADV-04', 'ADV-05', 'ADV-08', 'ADV-17'],
    alt2: 'green-b',
  },
  {
    id: 'the-first-dawn', num: '06', name: 'The First Dawn', label: 'The First Dawn',
    era: '~4.5 billion years ago', eraLine: 'Earth · c. 4.5 billion years ago', place: 'Earth, Hadean Eon', coords: '0° N, 0° E (± ∞)', year: -4.5e9,
    kind: 'deep', band: 'deep', risk: 5,
    hazard: 'Everything. Molten, airless, and 4.5 billion years from help.',
    days: 1, allowedDays: [1, 3], perDay: 26000, levy: 36000,
    expedition: 'CT-HAD-000',
    tagline: 'Before oceans, before sky, before anyone to say “before.”',
    short: 'An extremely speculative expedition to witness the young Earth. Observation only, from inside a sealed capsule, for no longer than forty minutes. Dramatic environmental warnings apply.',
    long: [
      'This is the Board’s farthest journey, and the one we most strongly discourage you from booking. The planet you are visiting is newly formed, still molten at the surface, and scarcely recognisable as home. There is no sky to speak of, no ocean, no anyone.',
      'You will observe from within a sealed capsule, through a pane we are required to call “probably adequate.” The window opens for forty minutes, after which the capsule returns on a pre-set trigger regardless of your feelings. Bring nothing; wear nothing sentimental.',
      'The scenes you witness are scientific conjecture dressed in showmanship. We are very proud of the dress.',
    ],
    highlights: ['A forty-minute sealed-capsule observation window', 'A view of a lava-lit horizon and volcanic skies', 'The sound of a world without weather', 'A certificate: “I Saw It Before It Was Anything”'],
    record: [
      'Earth formed about 4.54 billion years ago. The Hadean Eon is the earliest part of its history.',
      'Scientists think the Moon formed from a giant impact around this period, and that the early surface was extensively molten and volcanic.',
      'There is no evidence of life in this era, and no breathable atmosphere.',
    ],
    reconstruction: [
      'The details of the surface, sky and light are scientific speculation, heavily dramatised.',
      'Photographs show present-day volcanic eruptions and are stand-ins, not the ancient Earth.',
    ],
    image: 'dawn-a', pos: '50% 50%',
    gallery: [
      { img: 'dawn-b', cap: 'A lava channel, present day (Iceland). A stand-in for the young Earth.' },
      { img: 'dawn-c', cap: 'Molten rock at night, present day (Hawai‘i).' },
    ],
    itinerary: [
      { at: 0, t: 'T-60', h: 'Sealing the capsule', p: 'Decontamination, a long silence, and a signature you will not forget making.' },
      { at: 0.25, t: 'T-0', h: 'Arrival', p: 'The capsule drops into a horizon the colour of a struck match.' },
      { at: 0.5, t: 'T+20', h: 'The window opens', p: 'Observe. Do not speak; the instruments are listening, and so, perhaps, is something else.' },
      { at: 0.75, t: 'T+40', h: 'The trigger', p: 'The capsule begins its return. You do not get to negotiate.' },
      { at: 1, t: 'T+41', h: 'Return gate', p: 'You are home. You will want a very long shower and a very ordinary sandwich.' },
    ],
    advisories: ['ADV-05', 'ADV-09', 'ADV-12', 'ADV-15'],
    alt2: 'dawn-b',
  },
];

/* ---------- Advisories ---------- */
export const advisorySections = [
  { id: 'before', name: 'Before Departure', intro: 'The most dangerous part of any journey is the part where you are certain you have prepared.' },
  { id: 'during', name: 'During Your Visit', intro: 'The era will not adapt to you. You are, as the Board politely reminds you, the anachronism.' },
  { id: 'integrity', name: 'Historical Integrity', intro: 'We borrow the past. We do not edit it.' },
  { id: 'anomalies', name: 'Temporal Anomalies', intro: 'When something is strange, assume it is. When something is familiar, assume it more.' },
  { id: 'return', name: 'Return Protocol', intro: 'Arrival is optional. Departure is the whole point.' },
];

export const advisories = [
  { id: 'ADV-01', section: 'before', cls: 2, title: 'Verify your return coordinate before departure.', body: 'Read it aloud. Read it again. Have your guide read it. A return coordinate that is correct to six decimal places is a promise; one that is correct to five is a story you will tell at dinner parties, if you get home.' },
  { id: 'ADV-02', section: 'before', cls: 1, title: 'Declare your timeline of origin.', body: 'Your Board manifest must record the timeline you are departing from. Travellers who cannot name their timeline will be asked, politely, to wait in a very calm room.' },
  { id: 'ADV-03', section: 'before', cls: 2, title: 'Pack for the era, not for the weather app.', body: 'Natural fibres only. No logos, no zips, no visible stitching from any decade you are not visiting. See the Packing List for era-specific guidance.' },
  { id: 'ADV-04', section: 'before', cls: 1, title: 'Attend the Orientation Seminar in full.', body: 'It lasts ninety minutes and includes a short film. The film is excellent and deeply upsetting. Sit near the front.' },

  { id: 'ADV-05', section: 'during', cls: 3, title: 'Never assume that the passage of time is synchronised between eras.', body: 'An afternoon in one century may be a fortnight in another. Consult your Drift Table before making dinner plans, and never promise anyone you will be back “in a minute.”' },
  { id: 'ADV-06', section: 'during', cls: 2, title: 'Chronological jet lag is real.', body: 'Crossing centuries unsettles the body’s sense of when it is. Expect odd appetites, unwarranted nostalgia and a feeling that you have forgotten something. You have: it is called Tuesday. Drink water and keep a field note.' },
  { id: 'ADV-07', section: 'during', cls: 3, title: 'Do not remove artifacts from protected historical sites.', body: 'Not a coin. Not a pebble. Not a fragment of mosaic. Anything you carry out of an era will, at best, be confiscated at the gate and, at worst, be discovered in a museum with your fingerprints on it.' },
  { id: 'ADV-08', section: 'during', cls: 1, title: 'Speak less than you know.', body: 'Idioms, slang and accurate opinions about the future are the quickest ways to be remembered. You are visiting to be forgotten.' },

  { id: 'ADV-09', section: 'integrity', cls: 4, title: 'Do not alter events of historical significance.', body: 'The Board’s Integrity Desk monitors every itinerary. If you find yourself wondering whether a small intervention might be harmless, it is not harmless, and you are already on the list.' },
  { id: 'ADV-10', section: 'integrity', cls: 4, title: 'Never disclose future events to historical figures.', body: 'Not a hint. Not a joke. Not a polite “you’ll love what happens next.” People remember who told them things, and so do their biographers.' },
  { id: 'ADV-11', section: 'integrity', cls: 3, title: 'Do not introduce technology.', body: 'No devices, no clever tools, no “just a quick demonstration.” If you must record, use era-safe materials: ink, charcoal, memory, and a very good sense of when to stop talking.' },

  { id: 'ADV-12', section: 'anomalies', cls: 3, title: 'Report any encounter with an alternate version of yourself.', body: 'Remain calm, do not shake hands, and do not compare notes. Alternate yourself will be equally suspicious. File Form 9-A within the hour and request a quiet room.' },
  { id: 'ADV-13', section: 'anomalies', cls: 4, title: 'Never accept an unverified invitation from your future self.', body: 'They sound very convincing. They know your middle name, your favourite sandwich and exactly what you want to hear. Verify via the Board’s authentication line and, if in doubt, decline politely and leave the room.' },
  { id: 'ADV-14', section: 'anomalies', cls: 2, title: 'If a clock runs backward, do not wind it.', body: 'Observe, note the time (such as it is) and move away. It is not your clock, and nobody will thank you for fixing it.' },

  { id: 'ADV-15', section: 'return', cls: 2, title: 'Return only through the gate you arrived by.', body: 'Other gates may look identical. They are not. Some of them lead to the same place a few minutes earlier, which is worse than it sounds.' },
  { id: 'ADV-16', section: 'return', cls: 1, title: 'Submit to the Chronological Decompression Quarter-Hour.', body: 'A mandatory fifteen minutes in a pleasant room with tea. You will want to leave. Do not leave.' },
  { id: 'ADV-17', section: 'return', cls: 1, title: 'File your field note within 72 hours.', body: 'The Board’s archive depends on honest, specific, slightly embarrassing accounts. The best entries are published in the Field Journal.' },
];

export const advisoryFaq = [
  { q: 'Are these advisories real safety guidance?', a: 'No. They are fictional world-building for a design project. Time travel is not available, and for real travel advice you should consult your national travel authority.' },
  { q: 'Who writes the advisories?', a: 'The Board’s Department of Cautionary Tales: three clerks, an archivist, and a kettle of considerable age. All of them have been very careful and some of them have been very wrong.' },
  { q: 'What does a Class IV rating actually mean?', a: 'It means the destination demands a licensed guide, a briefing in full and the understanding that the Board’s rescue window is narrow. Class V adds a mandatory escort and a signature on a document with an unusual number of pages.' },
  { q: 'What if I accidentally change something small?', a: 'The past is elastic. A dropped coin or an unwise remark is typically absorbed. File Form 7-b at the gate, describe it honestly and expect to be asked three follow-up questions. If the Integrity Desk calls twice, please sit down.' },
  { q: 'Is the Board liable for paradoxes?', a: 'The Board is liable for your return. Paradoxes, as the small print on every manifest explains, remain the traveller’s own.' },
];

export const returnProtocol = [
  { k: 'R', h: 'Remain calm', p: 'Stop. Breathe. Nobody has ever fixed a timeline while sprinting.' },
  { k: 'E', h: 'Establish your coordinate', p: 'Read the return coordinate sewn into your hem. Say it aloud.' },
  { k: 'T', h: 'Trigger the Tether', p: 'Hold the beacon for five seconds until it chimes. It will not chime on its first attempt.' },
  { k: 'U', h: 'Unclasp local anchors', p: 'Let go of artifacts, promises and any strong opinions about the local cuisine.' },
  { k: 'R', h: 'Reach the gate', p: 'Walk, don’t run, to your arrival gate. If it has moved, wait. It will return.' },
  { k: 'N', h: 'Notify the Board', p: 'On arrival, report to the Decompression Room, and tell the truth.' },
];

export const checklistBefore = [
  'Return coordinate verified aloud, twice',
  'Timeline of origin declared on the manifest',
  'Orientation Seminar attended in full',
  'Era-appropriate clothing packed and fitted',
  'Tether beacon charged and tested',
  'Drift Table consulted for your destination',
  'Emergency contact filed with the Board',
  'Souvenir declaration form read, and re-read',
];

/* ---------- Journal ---------- */
export const journal = [
  {
    id: 'i-bowed-wrong-in-agra', title: 'I Bowed Wrong in Agra', dest: 'mughal-court', img: 'mughal-khas', pos: '50% 50%',
    author: 'Rhea V.', role: 'Voyager class', exp: 'CT-1631-AGR / 07', travelled: 'Agra, autumn 1631 CE', filed: '12 March 2026',
    excerpt: 'The briefing described the kornish as a respectful inclination of the head. It did not describe what happens when you do it with a small wave.',
    body: [
      'The briefing described the kornish as “a respectful inclination of the head, with the palm of the right hand lifted toward the forehead.” It did not mention that the hand must follow the head, not lead it; that the courtier ahead of you has just performed it perfectly; or that my own nervous interpretation, a sort of small wave, would be visible from the far end of a very long gallery.',
      'My guide-historian, a patient woman who answered to a name I will not attempt to spell, took me aside afterwards and delivered the most elegant rebuke of my life. “You have the instincts of a courtier,” she said. “They are simply the wrong courtier’s.”',
      'We spent the afternoon rehearsing in the garden of our riverside house. Taslim, then kornish, then taslim again. Walk, pause, incline. By dusk I could do all three without wanting to apologise. The gallery had taught me something nobody mentions in the guidebooks: that ceremony is not a performance for rulers. It is a performance for everyone else, to make a thousand strangers feel, for an hour, that they know where to stand.',
      'The next morning I watched the whole court from our gallery seat. Rows of men in layered white and gold. Someone, far off, in a doorway of light. I did not see the emperor. I saw the room arranged around where he might be, and that was more eloquent than any portrait.',
      'I bowed correctly that day. Almost everyone else did too. The cost of getting it wrong is smaller than you think; the value of getting it right is larger. Mostly I remember the quiet: a hall of hundreds, all of them listening.',
    ],
  },
  {
    id: 'the-library-smelled-of-cedar', title: 'The Library Smelled of Cedar and Argument', dest: 'alexandria-after-dark', img: 'alex-sunset', pos: '50% 60%',
    author: 'Theo M.', role: 'Observer class', exp: 'CT-200BC-ALX / 12', travelled: 'Alexandria, c. 200 BCE', filed: '3 April 2026',
    excerpt: 'Two scholars were fighting over a comma. In Greek. At midnight. I have never been so happy to be lost.',
    body: [
      'The first thing you notice is the smell: cedar oil and papyrus and a warm, mineral hint of lamp smoke. The second is the noise. Everyone in Alexandria is arguing, and nobody is angry.',
      'The Board’s briefing describes this city as “a place of intense scholarly activity.” That is true in the way that saying the sea is “wet” is true. I stood in a colonnade at dusk and watched two men debate whether a single line of verse needed a pause. They had been debating, according to my guide, for eleven days. They were delighted.',
      'A word on honesty, since the Board insists. I did not see the Library as the books describe it. I saw something the Antiquity desk assembled from fragments and educated guesswork: a long hall, a lot of shelving, a feeling of enormous patience. Whether that is the real thing I cannot say. It felt right, and the Board assures me that is the most any traveller can ask.',
      'At night they took us to a rooftop. A man pointed at a bright star and told me, with total conviction, its name; another man, standing beside him, told me the name was wrong. I will never know who was right. I have never been so happy to be lost.',
      'On the last morning I stood at the harbour and looked at the lighthouse fire as it paled against the sunrise. The guide asked what I would take home. I said: the noise. She said: you cannot. I said: I know. I am, however, going to try.',
    ],
  },
  {
    id: 'twenty-four-hours-without-signal', title: 'Twenty-Four Hours Without Signal', dest: 'last-day-of-wifi', img: 'wifi-b', pos: '50% 50%',
    author: 'Imani K.', role: 'Observer class', exp: 'CT-2027-B27 / 03', travelled: 'Timeline B-27, 2027 CE', filed: '19 January 2026',
    excerpt: 'At noon a man asked me for directions out loud. He used his mouth. I almost cried.',
    body: [
      'At eight in the morning, everyone on the platform was looking at a screen, with an intimacy that I can only compare to prayer. Nobody knew why the networks would go quiet at midnight; they only knew that they would. People were sending each other pictures of their lunches. Somebody had written a very long email to a very old friend.',
      'At ten-thirty a stranger asked me for directions. Aloud. Using his actual mouth. I did the only sensible thing: I told him, and then I walked him there, because I could not bear the thought of him doing it alone. “Do people still do this?” he asked, and I realised he meant: do people still help each other. I said they do, mostly.',
      'The farewell group call began at noon. By two it contained three hundred and seven people and one dog. By four nobody could remember how to leave and nobody wanted to. A woman read a poem. A man cried quietly into a sandwich. A teenager, bless her, attempted to start a rebellion, and was immediately asked what time she would be home.',
      'At dusk the street filled. I had expected panic; what I got was a block party. People brought chairs. A man taught a dog to fetch with an old router. A child, who had never read a paper map, drew one for me on a napkin. It was wrong, and it was perfect.',
      'At 23:59 a hush went through the street like a held breath. Then, somewhere, a radio. Then, quietly, the whole street laughed. I came home and put my phone in a drawer for a full evening. It lasted until 9:40.',
    ],
  },
  {
    id: 'dinner-beneath-the-lattice-trees', title: 'Dinner Beneath the Lattice-Trees', dest: 'new-earth', img: 'future-b', pos: '50% 40%',
    author: 'Daniel O.', role: 'Chronarch class', exp: 'CT-3000-EAR / 21', travelled: 'Earth, 3000 CE (imagined)', filed: '28 February 2026',
    excerpt: 'The canopy dimmed when we got quiet. The municipal intelligence apologised. It was entirely my fault.',
    body: [
      'You do not so much arrive on New Earth as get absorbed into it. The air is warm and slightly sweet. The ground is soft underfoot, planted, and everything vertical is alive. I stepped out of the Ring Gate and a leaf the size of a table gently dipped to let me pass.',
      'Dinner was served on a long platform beneath the lattice-trees. The trunks rose into the dark and spread into a canopy of light that pulsed, softly, in time with the conversation. When we laughed, it brightened. When we fell silent, it dimmed, as though it had been listening and did not want to interrupt.',
      'Around the second course the municipal intelligence joined the table. Not as a voice, not as a face. As a question. It asked, with great courtesy, whether the guest on my left might prefer a different chair. She had not said anything; it had simply noticed. I have never felt so well looked after or so lightly observed.',
      'I asked it, eventually, what it thought of us. It said we were “remarkably consistent.” I asked whether that was a compliment. It said it was an observation, and that it hoped it could be both.',
      'I can tell you nothing true about the year 3000. The Board is clear on that point and so, in fairness, am I. What I can tell you is that I walked back to the Ring Gate feeling that the future, if it looked like that, would be a thing to be glad of. I did not take a souvenir. I did take the feeling. Customs let it through.',
    ],
  },
  {
    id: 'four-minutes-of-dawn', title: 'Four Minutes of Dawn', dest: 'the-first-dawn', img: 'dawn-b', pos: '50% 50%',
    author: 'Mira S.', role: 'Chronarch class (escorted)', exp: 'CT-HAD-000 / 02', travelled: 'Earth, Hadean Eon (speculative)', filed: '9 May 2026',
    excerpt: 'I had forty minutes. I stopped taking notes at four. Some things are not for the record.',
    body: [
      'I should say at once that this is a speculative account. Nobody has been to the Hadean Earth. Everything below is the Board’s best educated guess, dressed up by an exceptionally talented set designer.',
      'The capsule drops, and for a moment there is no light at all. Then the horizon appears: a long line the colour of a struck match, glowing beneath a sky that is not a sky but a heavy, low ceiling of smoke and heat. The ground below is a skin, black and cracked and lit from beneath, like the surface of something very much alive.',
      'There is no sound. The Board’s engineers have, in their wisdom, piped in a faint low hum “for comfort.” I asked them to turn it off and they did, and the silence that followed was the kind you can feel in your teeth.',
      'I had forty minutes. I took notes for four of them. After that I put down the pen. There was nothing to note. Just a very old, very new world, doing the only thing it knew how to do, which was to exist, loudly, with no one watching.',
      'When the trigger fired and the capsule began to rise, I found I was crying, which surprised me. A technician handed me tea. I asked what she would say to someone who wanted to go back. She said: “Wait a billion years.” I think that is excellent advice.',
    ],
  },
];

/* ---------- Packing ---------- */
export const packing = [
  { id: 'universal', name: 'Universal essentials', note: 'For every era, every time.', items: [
    { t: 'Plain linen shirt', n: 'No logos, no visible seams from later decades.' },
    { t: 'Walking shoes, broken in', n: 'Eras do not provide pavement.' },
    { t: 'Water flask, unmarked', n: 'Metal or leather, no branding.' },
    { t: 'Pocket notebook & permanent ink', n: 'The only recording device the Board always approves.' },
    { t: 'Folded Board travel certificate', n: 'Keep it where you can find it with one hand.' },
    { t: 'A short, polite phrase in the local tongue', n: 'It will open more doors than any gate.' },
  ] },
  { id: 'historical', name: 'Historical-era clothing', note: 'Match the century, then match the social class.', items: [
    { t: 'Period-appropriate outer garment', n: 'Fitted by a Board tailor before departure.' },
    { t: 'Natural-fibre underlayers', n: 'Wool, linen, silk. Nothing stretchy.' },
    { t: 'Appropriate head covering', n: 'For sun, for court, for the room you are about to enter.' },
    { t: 'Soft-soled leather shoes', n: 'Quiet on stone, forgiving on dirt.' },
    { t: 'Plain belt or sash', n: 'No buckles from later centuries.' },
    { t: 'Modest outer layer', n: 'Err on the side of more cloth.' },
  ] },
  { id: 'future', name: 'Future environments', note: 'For destinations beyond today. Fictional props marked PROP.', items: [
    { t: 'Adaptive-weave jacket', n: 'PROP · Imaginary garment that adjusts to the local climate.', prop: true },
    { t: 'Spectral glasses', n: 'PROP · Imaginary lenses that reveal local network layers.', prop: true },
    { t: 'Translation lozenge', n: 'PROP · An imaginary dissolving lozenge. Do not swallow.', prop: true },
    { t: 'Low-gravity grip socks', n: 'PROP · For orbital districts. They only exist here.', prop: true },
    { t: 'Offline map shard', n: 'PROP · An imaginary device that works when the network does not.', prop: true },
    { t: 'Open mind, fully charged', n: 'Not a prop. Strongly recommended.' },
  ] },
  { id: 'docs', name: 'Chronological documentation', note: 'Paperwork keeps you where you belong.', items: [
    { t: 'Temporal passport', n: 'Stamped at departure. Never loan it out.' },
    { t: 'Visa stamp page for your era', n: 'Collect all five. Frame them.' },
    { t: 'Printed itinerary', n: 'In ink, on paper, with a time zone you can trust.' },
    { t: 'Declared-contents manifest', n: 'Everything you carry, listed honestly.' },
    { t: 'Field note log', n: 'Mandatory. Filing deadline: 72 hours.' },
    { t: 'Souvenir declaration form', n: 'Even if you intend to declare nothing.' },
  ] },
  { id: 'emergency', name: 'Emergency return equipment', note: 'You will not need it. Bring it anyway.', items: [
    { t: 'Tether beacon', n: 'PROP · Imaginary return-signal device. Press five seconds.', prop: true },
    { t: 'Spare Tether battery', n: 'PROP · Pack it where you can reach it.', prop: true },
    { t: 'Return coordinate card', n: 'Laminated, and sewn into a hem for redundancy.' },
    { t: 'Chrono-flare', n: 'PROP · An imaginary signal flare, era-safe, silent.', prop: true },
    { t: 'Anchor chalk', n: 'PROP · An imaginary chalk that marks your arrival gate.', prop: true },
    { t: 'Era-appropriate emergency rations', n: 'Dried fruit, hard bread, a very good attitude.' },
  ] },
];

/* ---------- Paradox FAQ ---------- */
export const faqGroups = [
  { id: 'self', name: 'Selves & timelines', items: [
    { q: 'Can I meet my past self?', a: 'Technically, yes. The Board’s gates are scheduled so that two versions of you never share an hour, but accidents happen. If you do meet, the Board’s guidance is “wave, do not speak,” followed by a firm handshake and no advice. Your past self will not take it, and you will resent that they will not.' },
    { q: 'What if I visit a timeline that never existed?', a: 'Alternate-timeline destinations, such as the Last Day of Wi-Fi, are catalogued as “Branch B.” They are real in the sense that you can walk around in them, and imaginary in the sense that they cannot be verified. Souvenirs from Branch B dissolve at the gate. We recommend memories, which travel well.' },
    { q: 'Do I age while travelling?', a: 'You age at the speed of your own days, wherever you are. If you spend a week in 1631, you are a week older when you return, even if only nine minutes have passed at home. The Board offers no refunds on this.' },
  ] },
  { id: 'history', name: 'History & its customs', items: [
    { q: 'Can I change history?', a: 'The Board’s Elastic Timeline Principle holds that the past absorbs small perturbations: a dropped coin, an unwise remark. Larger changes are intercepted by the Integrity Desk, usually before you know you have made them. In short: you may be surprised which events the Board considers “large,” but you will not be surprised by the paperwork.' },
    { q: 'Can I talk to historical figures?', a: 'Listening is permitted. Telling is not. You may not mention future events, future technologies or the outcome of anything. If a famous person asks you a direct question, smile and ask them one in return. It works better than you would think.' },
    { q: 'Will anyone believe I am from the future?', a: 'Almost nobody asks. The Board’s Linen Principle applies: dress correctly, speak softly, and let the era’s own confidence carry you. The people most likely to detect a visitor are small children and cats, and neither will tell.' },
  ] },
  { id: 'logistics', name: 'Time, return & souvenirs', items: [
    { q: 'What happens if my return portal closes?', a: 'Portals do not close; they wait. Each gate re-opens at its anchor coordinate within twenty-four local hours. If it does not, activate your Tether and follow the R.E.T.U.R.N. protocol. In the rare event of a long delay, the Board retrieves travellers within seventy-two hours. Bring a book.' },
    { q: 'Does time pass at the same rate everywhere?', a: 'No. Every era has a drift ratio between Origin Time (your home) and Local Time (the destination). Most expeditions return within minutes of departure; a few, notably Class V, do not. Always consult your Drift Table, and never promise to be back “in a minute.”' },
    { q: 'Can I bring souvenirs back?', a: 'Yes, with conditions. Class A (consumables you ate, photographs of permitted sites, memories) require no declaration. Class B (period-appropriate trinkets, bought legitimately) must be declared at the gate. Anything from a protected site, or anything that sits in a museum today, is prohibited. Yes, even that one.' },
    { q: 'Is any of this real?', a: 'No. CHRONOTERRA is a fictional tourism board created for a web-design competition. No time travel is offered, no booking is real, and nothing here is safety or historical advice. The imagined destinations are fiction, and historical context is labelled as such.' },
  ] },
];

/* ---------- Homepage copy bits ---------- */
export const homeAdvisories = ['ADV-09', 'ADV-06', 'ADV-13'];
export const homeJournal = ['i-bowed-wrong-in-agra', 'twenty-four-hours-without-signal', 'four-minutes-of-dawn'];
export const homeFeatured = ['mughal-court', 'new-earth', 'last-day-of-wifi'];

/* ---------- Packages ---------- */
export const packages = [
  { id: 'pkg-courtier', name: 'The Courtier’s Week', dest: 'mughal-court', days: 7, cls: 'voyager', prefs: ['historian', 'cuisine'], blurb: 'Seven days at the Mughal court, with a guide-historian and a table of local dishes.' },
  { id: 'pkg-tomorrow', name: 'Tomorrow Weekend', dest: 'new-earth', days: 3, cls: 'voyager', prefs: ['night', 'photo'], blurb: 'A long weekend in the year 3000, with night excursions and a permit for sketching.' },
  { id: 'pkg-unplugged', name: 'The Disconnect', dest: 'last-day-of-wifi', days: 1, cls: 'observer', prefs: ['quiet'], blurb: 'A single, unforgettable day. Pack a paper map.' },
  { id: 'pkg-scholar', name: 'Scholar’s Circuit', dest: 'alexandria-after-dark', days: 3, cls: 'chronarch', prefs: ['historian', 'night'], blurb: 'Three nights in Alexandria with a personal archivist and a rooftop observation evening.' },
];
