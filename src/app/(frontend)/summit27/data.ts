/**
 * Content for the Summit 2027 page. Dates are provisional.
 *
 * Speakers and sponsors are the ones published on aiforgood.itu.int/summit27;
 * their images live under public/img and were pulled from that page.
 */

/** The single brand accent: the ticker dots. */
export const ACCENT = '#fbd207'

/** Destinations on the main AI for Good site. */
export const LINKS = {
  sponsorshipOpportunities: 'https://aiforgood.itu.int/engage/sponsor/',
  becomeASponsor: 'https://aiforgood.itu.int/sponsor/',
  exhibitors2026: 'https://aiforgood.itu.int/summit26/exhibitors/',
  about: 'https://aiforgood.itu.int/about-ai-for-good/',
  blog: 'https://aiforgood.itu.int/ai-for-good-blog/',
} as const

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

export type Speaker = {
  name: string
  role: string
  img: string
  /** The speaker's page on aiforgood.itu.int. */
  href: string
}

export const SPEAKERS: Speaker[] = [
  {
    name: 'Doreen Bogdan-Martin',
    role: 'Secretary-General, ITU',
    img: '/img/speakers/doreen-bogdan-martin.jpg',
    href: 'https://aiforgood.itu.int/speaker/doreen-bogdan-martin/',
  },
  {
    name: 'H.E. Mr. Alar Karis',
    role: 'President, Republic of Estonia',
    img: '/img/speakers/h-e-mr-alar-karis.jpg',
    href: 'https://aiforgood.itu.int/speaker/h-e-mr-alar-karis/',
  },
  {
    name: 'H.E. Ms. Halla Tómasdóttir',
    role: 'President, Iceland',
    img: '/img/speakers/h-e-ms-halla-tomasdottir.jpg',
    href: 'https://aiforgood.itu.int/speaker/h-e-ms-halla-tomasdottir/',
  },
  {
    name: 'Maria Ressa',
    role: 'Nobel Peace Prize Laureate; Co-Founder and CEO, Rappler',
    img: '/img/speakers/maria-ressa.jpg',
    href: 'https://aiforgood.itu.int/speaker/maria-ressa/',
  },
  {
    name: 'Björn Ulvaeus',
    role: 'Co-founder of ABBA and President, CISAC',
    img: '/img/speakers/bjorn-ulvaeus.jpg',
    href: 'https://aiforgood.itu.int/speaker/bjorn-ulvaeus/',
  },
  {
    name: 'Volker Türk',
    role: 'United Nations High Commissioner for Human Rights, OHCHR',
    img: '/img/speakers/volker-turk.jpg',
    href: 'https://aiforgood.itu.int/speaker/volker-turk/',
  },
  {
    name: 'Puyr Tembé',
    role: 'Former Secretary of Indigenous Peoples, Indigenous Leader',
    img: '/img/speakers/puyr-tembe.jpg',
    href: 'https://aiforgood.itu.int/speaker/puyr-tembe/',
  },
  {
    name: 'John Legend',
    role: 'Singer, Songwriter & Philanthropist',
    img: '/img/speakers/john-legend.jpg',
    href: 'https://aiforgood.itu.int/speaker/john-legend/',
  },
  {
    name: 'Marc Benioff',
    role: 'Chair & CEO, Salesforce',
    img: '/img/speakers/marc-benioff.jpg',
    href: 'https://aiforgood.itu.int/speaker/marc-benioff/',
  },
  {
    name: 'Yoshua Bengio',
    role: 'Professor; Founder and Scientific Advisor; Co-President, Université de Montréal; Mila; LawZero',
    img: '/img/speakers/yoshua-bengio.jpg',
    href: 'https://aiforgood.itu.int/speaker/yoshua-bengio/',
  },
  {
    name: 'Wang Jian',
    role: 'Founder of Alibaba Cloud, Director, Zhejiang Lab',
    img: '/img/speakers/wang-jian.jpg',
    href: 'https://aiforgood.itu.int/speaker/wang-jian/',
  },
  {
    name: 'Avye Couloute',
    role: 'Founder, Girls Into Coding',
    img: '/img/speakers/avye-couloute.jpg',
    href: 'https://aiforgood.itu.int/speaker/avye-couloute/',
  },
]

export type Logo = { name: string; src: string; href: string }

export type SponsorTier = { label: string; logos: Logo[] }

/** Past sponsors, grouped as on aiforgood.itu.int/summit27. */
export const SPONSOR_TIERS: SponsorTier[] = [
  {
    label: 'Co-convener',
    logos: [
      {
        name: 'Swiss Confederation',
        src: '/img/sponsors/swiss-confederation.jpg',
        href: 'https://www.admin.ch/gov/en/start.html',
      },
    ],
  },
  {
    label: 'Diamond sponsors',
    logos: [
      { name: 'Microsoft', src: '/img/sponsors/microsoft.jpg', href: 'https://www.microsoft.com/' },
      {
        name: 'Technology Innovation Institute',
        src: '/img/sponsors/tii.png',
        href: 'https://www.tii.ae/',
      },
      {
        name: 'China Mobile',
        src: '/img/sponsors/chinamobile.png',
        href: 'http://chinamobile.com/en/',
      },
      {
        name: 'China Telecom',
        src: '/img/sponsors/china-telecom.jpg',
        href: 'https://www.chinatelecom-h.com/',
      },
      {
        name: 'China Unicom',
        src: '/img/sponsors/cuguplus.jpg',
        href: 'https://www.cuguplus.com/company',
      },
      {
        name: 'Ministry of Science and ICT, Republic of Korea',
        src: '/img/sponsors/msit-korea.png',
        href: 'https://www.msit.go.kr/eng/index.do',
      },
      {
        name: 'Ministry of Internal Affairs and Communications, Japan',
        src: '/img/sponsors/mic-japan.png',
        href: 'https://www.soumu.go.jp/english/',
      },
      { name: 'ZTE', src: '/img/sponsors/zte.jpg', href: 'https://www.zte.com.cn/' },
      { name: 'DLA Piper', src: '/img/sponsors/dlapiper.png', href: 'https://www.dlapiper.com/' },
      { name: 'AWS', src: '/img/sponsors/aws.png', href: 'https://aws.amazon.com/' },
    ],
  },
  {
    label: 'Gold sponsors',
    logos: [
      {
        name: 'EY',
        src: '/img/sponsors/ey.jpg',
        href: 'https://www.ey.com/en_gl/services/ai/platform',
      },
      { name: 'Wiley', src: '/img/sponsors/wiley.jpg', href: 'https://www.wiley.com/' },
    ],
  },
  {
    label: 'Silver sponsors',
    logos: [{ name: 'LEGO', src: '/img/sponsors/lego.png', href: 'https://www.lego.com/' }],
  },
  {
    label: 'Youth Zone sponsors',
    logos: [
      { name: 'Lenovo', src: '/img/sponsors/lenovo.jpg', href: 'https://www.lenovo.com/' },
      { name: 'TikTok', src: '/img/sponsors/tiktok.png', href: 'https://www.tiktok.com/about' },
      { name: 'Giga', src: '/img/sponsors/giga.png', href: 'https://giga.global/' },
      {
        name: 'Human Change',
        src: '/img/sponsors/humanchange.jpg',
        href: 'https://humanchange.com/',
      },
      { name: 'Zurich', src: '/img/sponsors/zurich.png', href: 'https://www.zurich.com/' },
    ],
  },
  {
    label: 'Networking partners',
    logos: [
      { name: 'HP', src: '/img/sponsors/hp.png', href: 'http://www.hp.com/' },
      { name: 'IBM', src: '/img/sponsors/ibm.png', href: 'https://www.ibm.com/' },
      {
        name: 'NPSM by Advance Solutions',
        src: '/img/sponsors/advancesolutions.png',
        href: 'https://www.advancesolutions.com/',
      },
      { name: 'ACM', src: '/img/sponsors/acm.jpg', href: 'https://www.acm.org/' },
      { name: 'D-Teach', src: '/img/sponsors/d-teach.jpg', href: 'https://d-teach.com/' },
      {
        name: 'QAI Ventures',
        src: '/img/sponsors/qai-ventures.png',
        href: 'https://qai-ventures.com/',
      },
      { name: 'AWS', src: '/img/sponsors/aws.png', href: 'https://aws.amazon.com/' },
      { name: 'Siemens', src: '/img/sponsors/siemens.png', href: 'https://www.siemens.com/' },
      { name: 'UNDP', src: '/img/sponsors/undp.png', href: 'https://www.undp.org/' },
      {
        name: 'UK Mission to the United Nations in Geneva',
        src: '/img/sponsors/gov.png',
        href: 'https://www.gov.uk/world/organisations/uk-mission-to-the-wto-un-and-other-international-organisations-geneva',
      },
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

export type Article = { tag: string; dot: string; title: string; date: string; href: string }

/** The three most recent posts from the AI for Good blog. */
export const NEWS: Article[] = [
  {
    tag: 'Summit 2026',
    dot: 'var(--dot-summit)',
    title:
      'From bit flow to token flow: China Telecom’s blueprint for talking to machines that think',
    date: '21 September 2026',
    href: 'https://aiforgood.itu.int/from-bit-flow-to-token-flow-china-telecoms-blueprint-for-talking-to-machines-that-think/',
  },
  {
    tag: 'Summit 2026',
    dot: 'var(--dot-summit)',
    title: 'From plan to plate: Connecting production decisions with material use',
    date: '18 September 2026',
    href: 'https://aiforgood.itu.int/from-plan-to-plate-connecting-production-decisions-with-material-use/',
  },
  {
    tag: 'AI for Good',
    dot: 'var(--dot-standards)',
    title: 'The ITU AI Readiness Hackathon names four winning solutions in Riyadh',
    date: '15 September 2026',
    href: 'https://aiforgood.itu.int/the-itu-ai-readiness-hackathon-names-four-winning-solutions-in-riyadh/',
  },
]

export type Testimonial = { quote: string; name: string; role: string; img: string }

/** From the closing carousel on aiforgood.itu.int/summit27. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We are more than the AI generation. We are the generation that is determined, ladies and gentlemen, determined to shape AI for Good. So no matter how fast technology moves, let us never stop putting AI at the service of all people and our planet.',
    name: 'Doreen Bogdan-Martin',
    role: 'Secretary-General, International Telecommunication Union (ITU)',
    img: '/img/testimonials/doreen-bogdan-martin.jpg',
  },
  {
    quote:
      'If we want an AI literate society, meaning resilient and ready for the future, we need to integrate these new tools into school curriculum.',
    name: 'H.E. Mr. Alar Karis',
    role: 'President, Republic of Estonia',
    img: '/img/testimonials/h-e-mr-alar-karis.jpg',
  },
  {
    quote:
      'It is no coincidence that this era of profound innovation has prompted many to reflect on what it means to be human and on humanity’s role in the world.',
    name: 'Message on behalf of His Holiness Pope Leo XIV',
    role: '',
    img: '/img/testimonials/pope-leo-xiv.jpg',
  },
  {
    quote:
      'We all now have I think a much greater level of awareness around AI and we all need to shift into that as fast as possible because this technology is moving so fast.',
    name: 'Marc Benioff',
    role: 'Chair and CEO, Salesforce',
    img: '/img/testimonials/marc-benioff.jpg',
  },
]

/* ── Footer, mirroring aiforgood.itu.int/summit27 ── */

export type FooterColumn = { title: string; links: { label: string; href: string }[] }

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Events',
    links: [
      { label: 'Global Summit', href: 'https://aiforgood.itu.int/summit26' },
      {
        label: 'In-person events',
        href: 'https://aiforgood.itu.int/ai-events-calendar?attendance=in-person',
      },
      {
        label: 'Online events',
        href: 'https://aiforgood.itu.int/ai-events-calendar?attendance=online',
      },
      { label: 'View all speakers', href: 'https://aiforgood.itu.int/speakers-ai-for-good/' },
    ],
  },
  {
    title: 'AI Skills & Capacity',
    links: [
      // The live site points this at an empty anchor; kept as given.
      { label: 'AI challenges & competitions', href: 'https://aiforgood.itu.int/summit27/#' },
      { label: 'AI Skills Coalition', href: 'https://aiforgood.itu.int/ai-skills-coalition/' },
      { label: 'Impact Initiative', href: 'https://aiforgood.itu.int/impact-initiative/' },
    ],
  },
  {
    title: 'AI Standards & Policy',
    links: [
      {
        label: 'AI Standards Exchange Database',
        href: 'https://aiforgood.itu.int/ai-standards-exchange/',
      },
      {
        label: 'AI Policy Dialogue 2025',
        href: 'https://aiforgood.itu.int/summit25/programme/?theme=ai-Policy-dialogue',
      },
      { label: 'UN AI Resource Hub', href: 'https://unaihub.aiforgood.itu.int/' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'About us', href: LINKS.about },
      // The live site's own placeholder anchor; the real sponsor page is used
      // instead since the hero already links there under the same label.
      { label: 'Sponsorship opportunities', href: LINKS.sponsorshipOpportunities },
    ],
  },
]

export const LEGAL_LINKS = [
  { label: 'Terms of Use', href: 'https://www.itu.int/en/about/Pages/terms-of-use.aspx' },
  { label: 'Privacy Policy', href: 'https://aiforgood.itu.int/privacy-policy' },
]

export type SocialId =
  'x' | 'facebook' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok' | 'bilibili'

export const SOCIALS: { id: SocialId; label: string; href: string }[] = [
  { id: 'x', label: 'AI for Good on X', href: 'https://x.com/AIforGood' },
  { id: 'facebook', label: 'AI for Good on Facebook', href: 'https://www.facebook.com/AIforGood/' },
  {
    id: 'linkedin',
    label: 'AI for Good on LinkedIn',
    href: 'https://www.linkedin.com/company/ai-for-good-global-summit-un/',
  },
  {
    id: 'instagram',
    label: 'AI for Good on Instagram',
    href: 'https://www.instagram.com/aiforgood/',
  },
  {
    id: 'youtube',
    label: 'AI for Good on YouTube',
    href: 'https://www.youtube.com/channel/UC4e35vN3-tSBZMNLE-wm45A',
  },
  { id: 'tiktok', label: 'AI for Good on TikTok', href: 'https://www.tiktok.com/@itu_aiforgood' },
  {
    id: 'bilibili',
    label: 'AI for Good on Bilibili',
    href: 'https://space.bilibili.com/1855109650/',
  },
]

export const NAV_LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#exhibition', label: 'Exhibition' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#news', label: 'Newsroom' },
]
