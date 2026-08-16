// ------------------------------------------------------------------
// MOCK DATA — DUNGA portfolio clone. All content below is placeholder
// data shaped to mirror the structure of the original experience.
// ------------------------------------------------------------------

export const COLORS = {
  bg: '#121010',
  ink: '#f4f2f0',
  dim: '#8f8c89',
  faint: '#55524f',
  line: '#2a2725',
};

export const FONTS = {
  black: '/fonts/unbounded-latin-900-normal.woff',
  bold: '/fonts/unbounded-latin-700-normal.woff',
  reg: '/fonts/unbounded-latin-400-normal.woff',
  thin: '/fonts/space-grotesk-latin-300-normal.woff',
  body: '/fonts/space-grotesk-latin-400-normal.woff',
  med: '/fonts/space-grotesk-latin-500-normal.woff',
};

export const SECTIONS = [
  'intro',
  'pitch',
  'the decade',
  'short story',
  'numbers',
  'case studies',
  'talks',
  'manifesto',
  "let's talk",
];

// Camera flight path — 9 stops flying into -Z
export const PATH = [
  [0, 0, 0],
  [2.4, 0.6, -34],
  [-2.2, -0.4, -68],
  [1.9, 0.8, -102],
  [-2.4, -0.6, -136],
  [0, 0.5, -170],
  [2.2, -0.5, -204],
  [-1.9, 0.6, -238],
  [0, 0, -272],
];

export const INTRO = {
  first: 'DANIEL',
  last: 'DUNGYOV',
  alias: '( DUNGA )',
  roles: ['Product', 'Designer', 'Entrepreneur', 'Educator'],
  photo:
    'https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
};

export const PITCH = {
  title: 'Elevator pitch',
  body:
    'I build products people actually need — through research, experiments, design and common sense. And AI, of course.',
};

export const DECADE = {
  title: 'One decade of helping start-ups find PMF and scale-ups — growth',
  logos: [
    'mass[finance]', 'figmaistor', 'AGENCY HYPE', 'CleverTap',
    'SoftUni', 'Quantive', 'finovation', 'NORTHSTAR',
    'orbitpay', 'kanbanly', 'DATAFORGE', 'NOVA LABS',
  ],
  timeline: [
    { role: 'Co-founder, Head of Product & Design @ mass[Finance]', period: '2k26 — present' },
    { role: 'CEO & Co-founder @ Figmaistor', period: '2k21 — present' },
    { role: 'Partner & Design lead @ Agency HYPE', period: '2k23 — present' },
    { role: 'Past' },
    { role: 'CleverTap — Sr. Manager, Product Design', period: '2k23 — 2k25' },
    { role: 'SoftUni Creative — Educator & Trainer', period: '2k22 — 2k25' },
    { role: 'Quantive — Design System Lead', period: '2k21 — 2k23' },
    { role: 'Finovation — Product Designer', period: '2k20 — 2k21' },
    { role: 'Freelance — Web Design, Branding', period: '2k16 — 2k20' },
  ],
};

export const STORY = {
  title: 'Short story',
  facts: [
    'In love with my wife and our dog',
    'Homebrew beer & amateur cooking',
    'Snowboards, cliffs and kayaks',
    'Travels — mostly to eat and drink',
    'Certified workaholic :(',
    '',
    '30 · male · Sofia',
  ],
};

export const NUMBERS = {
  title: 'Perspective in numbers',
  sub: 'Outcomes and outputs',
  stats: [
    { n: 10, suffix: '', label: 'years of design', pos: [-1.6, 0.6, 8] },
    { n: 6, suffix: '', label: 'years of product', pos: [1.3, -0.3, 3] },
    { n: 80, prefix: '+', suffix: '', label: 'companies elevated', pos: [-1.4, 0.4, -2] },
    { n: 7, suffix: '', label: 'awards won', pos: [1.5, 0.5, -7] },
    { n: 4, suffix: '', label: 'design systems built', pos: [-1.5, -0.4, -12] },
    { n: 4, suffix: '', label: 'years as educator', pos: [1.3, 0.3, -17] },
    { n: 40, prefix: '+', suffix: 'k', label: 'students', pos: [-0.8, -0.2, -22] },
  ],
};

export const CASES = [
  {
    title: 'Onboarding & activation experience',
    meta: 'CleverTap · 2k24',
    body:
      'Rebuilt the first-run journey of a complex analytics platform — a fourteen-step setup became a guided, role-aware flow. Activation is a design problem long before it becomes a growth one.',
    facts: ['Role — Design lead', 'Scope — Research → Ship', 'Outcome — +38% activation'],
    slides: 8,
  },
  {
    title: 'Product analytics, reframed',
    meta: 'CleverTap · 2k23',
    body:
      'Dashboards nobody opens are just decoration. We reframed analytics around questions instead of charts — so PMs compose answers rather than hunt through menus.',
    facts: ['Role — Senior manager', 'Scope — 3 squads', 'Outcome — see metrics'],
    slides: 10,
    video: { id: 'nMZfg_M7LPM', start: 9 },
    metrics: {
      title: '6 months in the building',
      items: [
        { value: '50%', label: 'Adoption', note: 'in the first 4 weeks' },
        { value: '60%', label: 'Daily retention', note: 'compared to 20% before' },
        { value: '2 min', label: 'Time-to-task', note: 'compared to ~10 mins before' },
      ],
    },
    figma: '#',
  },
  {
    title: 'Agent-ready design system',
    meta: 'Workboard · 2k26',
    badge: 'coming soon',
    body:
      'PMs, designers, developers and AI agents prototyping inside one shared environment — with ease, speed and an AI-first workflow.',
    facts: ['Role — Design System Lead', 'Status — Under confidentiality'],
    metrics: {
      title: 'In summary',
      items: [
        { value: '83%', label: 'Token usage reduction' },
        { value: 'x4', label: 'Speed increase', note: 'prototyping new features' },
        { value: '50%', label: 'Time-to-market reduction' },
        { value: '33%', label: 'Component consistency', note: 'boost in the first 3 months' },
      ],
    },
    note: 'The full workflow will be shared once the confidentiality period expires. Reach out and I will happily tell you more.',
  },
  {
    title: 'Pet adoption, reimagined',
    meta: 'Furever · with Perspective Unity',
    body:
      'A mobile app connecting adopters across Europe with shelters in Bulgaria — one place to find every pet waiting for a home. A strict care agreement protects every pet after adoption.',
    facts: [
      'Role — Design Lead',
      'Time to complete — 6 months',
      'Team — Senior Product Designer',
      'Team — Product Manager',
      'Team — Engineering Lead',
    ],
    process: [
      'Branding & Naming', 'Feature Ideation', 'Information Architecture', 'Wireframes',
      'Design', 'Development', 'Analytics & Telemetry', 'Campaigns', 'Release',
    ],
    metrics: {
      title: 'Impact',
      items: [
        { value: '1,500+', label: 'pets adopted' },
        { value: '3', label: 'countries' },
        { value: '10,000', label: 'users' },
        { value: '30+', label: 'shelters' },
      ],
    },
    note: 'And we are still improving it!',
    links: [
      { label: 'live on iOS ↗', href: '#' },
      { label: 'live on Android ↗', href: '#' },
    ],
    slides: 6,
  },
];

export const TALKS = [
  {
    img: 'https://images.unsplash.com/photo-1586207901481-f2f8b383c056?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'Designing a data visualisation engine',
    tags: ['Talk', 'English'],
    meta: 'UX Sofia @ 2k25',
    video: 'nMZfg_M7LPM',
    start: 9,
  },
  {
    img: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'Should we democratise user research?',
    tags: ['Panel', 'English'],
    meta: 'UX Sofia @ 2k23',
    video: '_6RbPFq2SCo',
    start: 1114,
  },
  {
    img: 'https://images.unsplash.com/photo-1546872006-42c78c0ccb29?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'The designer in the middle of the chaos',
    tags: ['Talk', 'Bulgarian'],
    meta: 'Design Ops BG @ 2k23',
    video: 'w7JJuG9hiLU',
    start: 4,
  },
  {
    img: 'https://images.unsplash.com/photo-1544531585-b3fadf704c02?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'UX strategies',
    tags: ['Panel', 'English'],
    meta: 'UX Sofia @ 2k24',
    video: 'UJ4p1uTh0Lw',
    start: 1097,
  },
  {
    img: 'https://images.unsplash.com/photo-1499720924051-6278c10ca474?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: 'Reinventing digital education',
    tags: ['Talk', 'English'],
    meta: 'PechaKucha @ 2k24',
    video: 'oFUuqjBLjHQ',
    start: 92,
  },
  {
    img: 'https://images.unsplash.com/photo-1639512420798-fe33a3f1bac1?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    title: '10 seconds decide everything',
    tags: ['Podcast', 'Bulgarian'],
    meta: 'UXPress @ 2k26',
    video: '3bszZ4SkjPw',
    start: 0,
  },
];

export const MANIFESTO = [
  'So why is everything black and white?\nAren\u2019t you a designer?',
  'Colour is always an option —\nrarely a requirement.',
  'Art is abstract. I don\u2019t make art.\nDesign is a function.\nI help people get things done.',
];

export const CONTACT = {
  title: "LET'S TALK",
  email: 'hello@dungyov.com',
  note: 'Sofia, Bulgaria · Earth',
};
