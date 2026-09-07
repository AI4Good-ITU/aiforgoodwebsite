/**
 * Content for the Summit 2027 page, transcribed from the "Blend" design
 * direction prototype. Dates and prices are provisional.
 */

/** The two spectrum colours the Blend direction is built on. */
export const SPECTRUM = ['#7B5CFA', '#22D3EE'] as const

export const AMBER = '#F5B93D'

export type Part = {
  num: string
  title: string
  desc: string
  access: string
}

export const PARTS: Part[] = [
  {
    num: '01',
    title: 'Centre Stage',
    desc: 'Heads of state, laureates and the keynotes that set the agenda for the year.',
    access: 'All passes',
  },
  {
    num: '02',
    title: 'Solutions Stage',
    desc: 'Deployments that already work — health, climate, agriculture, disaster response.',
    access: 'All passes',
  },
  {
    num: '03',
    title: 'Standards & governance',
    desc: 'Working sessions with ITU, ISO and IEC, alongside the UN Global Dialogue.',
    access: 'Delegates',
  },
  {
    num: '04',
    title: 'The exhibition',
    desc: '200+ stands, live demos, humanoids and the Innovation Factory final.',
    access: 'Open to all',
  },
  {
    num: '05',
    title: 'Youth Zone',
    desc: 'A week-long programme and its own stage, for everyone aged 10 and up.',
    access: 'Free',
  },
  {
    num: '06',
    title: 'Impact Awards & gala',
    desc: 'The evening programme: film, AI art, awards and the invitation-only dinner.',
    access: 'Leaders',
  },
]

export const TRACKS = [
  'All',
  'Keynote',
  'Health',
  'Climate',
  'Governance',
  'Youth',
  'Robotics',
] as const

export type Track = (typeof TRACKS)[number]

/** Badge colour per track. */
export const TRACK_BADGE: Record<string, string> = {
  Keynote: 'brand',
  Health: 'success',
  Climate: 'blue',
  Governance: 'indigo',
  Youth: 'pink',
  Robotics: 'warning',
}

export const DAYS = [
  { label: 'Wed 7 July', sub: 'Opening' },
  { label: 'Thu 8 July', sub: 'Solutions' },
  { label: 'Fri 9 July', sub: 'Impact' },
  { label: 'Sat 10 July', sub: 'Open day' },
]

export type Session = {
  time: string
  title: string
  who: string
  stage: string
  track: string
}

/** Sessions per day, indexed to match DAYS. */
export const SESSIONS: Session[][] = [
  [
    {
      time: '09:30',
      title: 'Opening ceremony: the state of AI in 2027',
      who: 'Doreen Bogdan-Martin, António Guterres',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
    {
      time: '11:00',
      title: 'Frontier models and the compute frontier',
      who: 'Sam Altman, in conversation',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
    {
      time: '11:30',
      title: 'AI in primary care: what scaled, what stalled',
      who: 'WHO, Wellcome Trust, Ministry of Health Rwanda',
      stage: 'Solutions Stage',
      track: 'Health',
    },
    {
      time: '14:00',
      title: 'Grid forecasting for renewable-heavy systems',
      who: 'IEA and national grid operators',
      stage: 'Solutions Stage',
      track: 'Climate',
    },
    {
      time: '15:30',
      title: 'Drafting the interoperability standard',
      who: 'ITU, ISO and IEC working session',
      stage: 'Room B',
      track: 'Governance',
    },
    {
      time: '17:00',
      title: 'Humanoids on the floor: live demonstrations',
      who: 'Twelve robotics teams',
      stage: 'Exhibition',
      track: 'Robotics',
    },
  ],
  [
    {
      time: '09:00',
      title: 'Morning keynote: intelligence and the public good',
      who: 'Fei-Fei Li',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
    {
      time: '10:30',
      title: 'Early-warning systems for floods and heat',
      who: 'WMO and UNDRR',
      stage: 'Solutions Stage',
      track: 'Climate',
    },
    {
      time: '11:30',
      title: 'Diagnostics in low-resource settings',
      who: 'UNICEF, Médecins Sans Frontières',
      stage: 'Solutions Stage',
      track: 'Health',
    },
    {
      time: '13:30',
      title: 'Who audits the auditors?',
      who: 'Timnit Gebru and the DAIR institute',
      stage: 'Room B',
      track: 'Governance',
    },
    {
      time: '15:00',
      title: 'Youth Zone: build your first model',
      who: 'Open workshop, ages 10 and up',
      stage: 'Youth Stage',
      track: 'Youth',
    },
    {
      time: '16:30',
      title: 'Autonomy and safety in shared spaces',
      who: 'Robotics safety panel',
      stage: 'Room C',
      track: 'Robotics',
    },
  ],
  [
    {
      time: '09:30',
      title: 'Keynote: the story we tell about machines',
      who: 'Yuval Noah Harari',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
    {
      time: '11:00',
      title: 'Yield models for smallholder agriculture',
      who: 'FAO and CGIAR',
      stage: 'Solutions Stage',
      track: 'Climate',
    },
    {
      time: '12:00',
      title: 'Mental health tools and the evidence base',
      who: 'WHO and clinical partners',
      stage: 'Solutions Stage',
      track: 'Health',
    },
    {
      time: '14:00',
      title: 'The UN Global Dialogue reports back',
      who: 'Member state delegates',
      stage: 'Centre Stage',
      track: 'Governance',
    },
    {
      time: '15:30',
      title: 'Youth Zone: robotics final',
      who: 'Twenty school teams',
      stage: 'Youth Stage',
      track: 'Youth',
    },
    {
      time: '18:30',
      title: 'AI for Good Impact Awards',
      who: 'Ceremony and gala dinner',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
  ],
  [
    {
      time: '10:00',
      title: 'Open day: the exhibition, for everyone',
      who: 'Free entry, all halls',
      stage: 'Exhibition',
      track: 'Robotics',
    },
    {
      time: '11:00',
      title: 'Safety research in the open',
      who: 'Geoffrey Hinton',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
    {
      time: '12:30',
      title: 'Teaching AI in schools, ten countries on',
      who: 'UNESCO',
      stage: 'Room B',
      track: 'Youth',
    },
    {
      time: '14:00',
      title: 'Deploying in the field: three UN programmes',
      who: 'WFP, UNHCR, ITU',
      stage: 'Solutions Stage',
      track: 'Health',
    },
    {
      time: '15:30',
      title: 'Closing plenary and the 2028 handover',
      who: 'Doreen Bogdan-Martin, Lila Ibrahim',
      stage: 'Centre Stage',
      track: 'Keynote',
    },
  ],
]

export type Speaker = {
  name: string
  role: string
  img: string
  bio: string
  sessions: { when: string; title: string; stage: string }[]
}

export const SPEAKERS: Speaker[] = [
  {
    name: 'António Guterres',
    role: 'Secretary-General, United Nations',
    img: '/img/speakers/guterres.jpg',
    bio: 'Opens the Summit on behalf of the United Nations, setting out how AI intersects with the Sustainable Development Goals in the closing years of the 2030 Agenda.',
    sessions: [
      {
        when: 'Wed 7 July, 09:30',
        title: 'Opening ceremony: the state of AI in 2027',
        stage: 'Centre Stage',
      },
    ],
  },
  {
    name: 'Doreen Bogdan-Martin',
    role: 'Secretary-General, ITU',
    img: '/img/speakers/bogdan-martin.jpg',
    bio: 'Leads the agency convening the Summit. Her focus this year is connectivity as the precondition for any AI benefit reaching the 2.6 billion people still offline.',
    sessions: [
      {
        when: 'Wed 7 July, 09:30',
        title: 'Opening ceremony: the state of AI in 2027',
        stage: 'Centre Stage',
      },
      {
        when: 'Sat 10 July, 15:30',
        title: 'Closing plenary and the 2028 handover',
        stage: 'Centre Stage',
      },
    ],
  },
  {
    name: 'Geoffrey Hinton',
    role: 'Turing Award and Nobel laureate',
    img: '/img/speakers/hinton.jpg',
    bio: 'Returns to Geneva to argue for open safety research and for the international coordination he has called the only workable check on frontier systems.',
    sessions: [
      { when: 'Sat 10 July, 11:00', title: 'Safety research in the open', stage: 'Centre Stage' },
    ],
  },
  {
    name: 'Fei-Fei Li',
    role: 'Co-Director, Stanford Human-Centered AI Institute',
    img: '/img/speakers/feifei-li.jpg',
    bio: 'On human-centred design as an engineering discipline rather than a principle, drawing on a decade of deployments in hospitals and classrooms.',
    sessions: [
      {
        when: 'Thu 8 July, 09:00',
        title: 'Morning keynote: intelligence and the public good',
        stage: 'Centre Stage',
      },
    ],
  },
  {
    name: 'Sam Altman',
    role: 'CEO, OpenAI',
    img: '/img/speakers/altman.jpg',
    bio: 'In conversation on compute, capability and the commitments frontier labs have made to independent evaluation.',
    sessions: [
      {
        when: 'Wed 7 July, 11:00',
        title: 'Frontier models and the compute frontier',
        stage: 'Centre Stage',
      },
    ],
  },
  {
    name: 'Yuval Noah Harari',
    role: 'Historian and author, Sapienship',
    img: '/img/speakers/harari.jpg',
    bio: "A historian's read on the stories societies tell themselves about intelligence, and what those stories have cost before.",
    sessions: [
      {
        when: 'Fri 9 July, 09:30',
        title: 'Keynote: the story we tell about machines',
        stage: 'Centre Stage',
      },
    ],
  },
  {
    name: 'Timnit Gebru',
    role: 'Founder and Executive Director, DAIR',
    img: '/img/speakers/gebru.jpg',
    bio: 'On accountability structures for AI systems already in production, and who is qualified to audit them.',
    sessions: [{ when: 'Thu 8 July, 13:30', title: 'Who audits the auditors?', stage: 'Room B' }],
  },
  {
    name: 'Lila Ibrahim',
    role: 'Chief Operating Officer, Google DeepMind',
    img: '/img/speakers/ibrahim.jpg',
    bio: 'On the operational side of responsible deployment: review boards, staged releases and what a lab does when an evaluation fails.',
    sessions: [
      {
        when: 'Sat 10 July, 15:30',
        title: 'Closing plenary and the 2028 handover',
        stage: 'Centre Stage',
      },
    ],
  },
]

export const LOGOS = [
  { name: 'Microsoft', src: '/img/sponsors/microsoft.png' },
  { name: 'Amazon Web Services', src: '/img/sponsors/aws.jpeg' },
  { name: 'Huawei', src: '/img/sponsors/huawei.png' },
  { name: 'Samsung', src: '/img/sponsors/samsung.png' },
  { name: 'Deloitte', src: '/img/sponsors/deloitte.png' },
  { name: 'EY', src: '/img/sponsors/ey.webp' },
  { name: 'Cisco', src: '/img/sponsors/cisco.png' },
  { name: 'Alibaba DAMO Academy', src: '/img/sponsors/alibaba.jpg' },
  { name: 'Technology Innovation Institute', src: '/img/sponsors/tii.jpeg' },
  { name: 'Gen', src: '/img/sponsors/gen.png' },
]

export const MEDIA_LOGOS = [
  { name: 'MIT Technology Review', src: '/img/sponsors/mit.png' },
  { name: 'WIRED', src: '/img/sponsors/wired.png' },
  { name: 'euronews', src: '/img/sponsors/euronews.png' },
]

export const HIGHLIGHTS = [
  {
    title: 'Centre Stage',
    desc: 'Three thousand seats and a live stream to everywhere else.',
    img: '/img/hall-dark.jpg',
    color: '#22D3EE',
  },
  {
    title: 'Solutions Stage',
    desc: 'Deployments that already work — health, climate, agriculture, disaster response.',
    img: '/img/keynote-day.jpg',
    color: '#22D3EE',
  },
  {
    title: 'Nights in Geneva',
    desc: 'Film, music, AI art and the Impact Awards. It does not stop at 18:00.',
    img: '/img/concert.jpg',
    color: AMBER,
  },
]

export type Pass = {
  name: string
  tag: string
  accent: string
  cta: string
  primary: boolean
  early: string
  standard: string
  features: string[]
}

export const PASSES: Pass[] = [
  {
    name: 'Discovery',
    tag: '',
    accent: '#22D3EE',
    cta: 'Choose Discovery',
    primary: false,
    early: 'CHF 50',
    standard: 'CHF 70',
    features: [
      'Exhibition floor, demos and Innovation Factory',
      'Solutions and Frontier stage sessions',
      'Youth Zone and AI skills workshops',
    ],
  },
  {
    name: 'Gold',
    tag: 'Most popular',
    accent: AMBER,
    cta: 'Choose Gold',
    primary: true,
    early: 'CHF 890',
    standard: 'CHF 1,190',
    features: [
      'Everything in Discovery',
      'Centre Stage keynotes, in the room',
      'Full workshop programme and priority access',
    ],
  },
  {
    name: 'Leaders',
    tag: '',
    accent: '#7B5CFA',
    cta: 'Choose Leaders',
    primary: false,
    early: 'CHF 4,900',
    standard: 'CHF 5,600',
    features: [
      'Everything in Gold',
      'Leaders Lounge, welcome reception, gala dinner',
      'Impact Awards reception and priority check-in',
    ],
  },
]

export const TICKER_ITEMS = [
  '7–10 July 2027',
  '1,000+ speakers',
  '200+ exhibitors',
  '50+ UN agencies',
  'Palexpo, Geneva',
]

export const STATS = [
  { count: 1000, suffix: '+', label: 'Speakers across three stages and 300+ sessions' },
  { count: 200, suffix: '+', label: 'Exhibitors, from UN programmes to first-year startups' },
  { count: 50, suffix: '+', label: 'UN agencies convening the programme with ITU' },
]

export const PRACTICAL = [
  {
    num: '01',
    title: 'Five minutes from GVA',
    desc: 'Palexpo is one stop from Geneva Airport, and walkable from the terminal.',
  },
  {
    num: '02',
    title: 'Hotel rates',
    desc: 'Negotiated rates through the official accommodation partner. Book early.',
  },
  {
    num: '03',
    title: 'Free transport card',
    desc: 'Every hotel issues a card covering trams, buses and the lake boats.',
  },
  {
    num: '04',
    title: 'Visa letters',
    desc: 'Invitation letters open with registration and close four weeks before.',
  },
]

export const NEWS = [
  {
    tag: 'Summit 2027',
    dot: AMBER,
    title: 'Sponsorship and exhibition brochure is now open',
    date: 'August 2026',
    page: 'Article: sponsorship brochure',
  },
  {
    tag: 'Standards',
    dot: '#7B5CFA',
    title: 'From data centres to climate goals: the energy standards track',
    date: 'July 2026',
    page: 'Article: energy standards',
  },
  {
    tag: 'Youth',
    dot: '#22D3EE',
    title: 'The Youth Zone gets its own stage and a full week',
    date: 'July 2026',
    page: 'Article: Youth Zone',
  },
]

export const NAV_LINKS = [
  { href: '#programme', label: 'Programme' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#exhibition', label: 'Exhibition' },
  { href: '#passes', label: 'Passes' },
  { href: '#geneva', label: 'Geneva' },
  { href: '#news', label: 'Newsroom' },
]
