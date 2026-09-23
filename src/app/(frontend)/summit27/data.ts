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
  becomeASponsor: 'https://aiforgood.itu.int/sponsor/',
  exhibitors2026: 'https://aiforgood.itu.int/summit26/exhibitors/',
  about: 'https://aiforgood.itu.int/about-ai-for-good/',
  blog: 'https://aiforgood.itu.int/ai-for-good-blog/',
} as const

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
    name: 'H.E. Mr. Paul Kagame',
    role: 'President, Republic of Rwanda',
    img: '/img/speakers/h-e-mr-paul-kagame.jpg',
    href: 'https://aiforgood.itu.int/speaker/h-e-mr-paul-kagame/',
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
    name: 'Maria Ressa',
    role: 'Nobel Peace Prize Laureate; Co-Founder and CEO, Rappler',
    img: '/img/speakers/maria-ressa.jpg',
    href: 'https://aiforgood.itu.int/speaker/maria-ressa/',
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

export type Logo = { name: string; src: string; href?: string }

/** The UN agencies AI for Good partners with, as shown on aiforgood.itu.int/summit27. */
export const UN_PARTNERS: Logo[] = [
  { name: 'UNAIDS', src: '/img/un-partners/unaids.jpg', href: 'https://www.unaids.org/en' },
  { name: 'World Bank', src: '/img/un-partners/world-bank.jpg', href: 'https://www.worldbank.org/' },
  { name: 'WMO', src: '/img/un-partners/wmo.jpg', href: 'https://public.wmo.int/en' },
  { name: 'WIPO', src: '/img/un-partners/wipo.jpg', href: 'https://www.wipo.int/portal/en/index.html' },
  { name: 'WHO', src: '/img/un-partners/who.jpg', href: 'https://www.who.int/' },
  { name: 'WFP', src: '/img/un-partners/wfp.jpg', href: 'https://www.wfp.org/' },
  { name: 'UNWTO', src: '/img/un-partners/unwto.jpg', href: 'https://www.unwto.org/' },
  { name: 'UNU', src: '/img/un-partners/unu.jpg', href: 'https://unu.edu/' },
  { name: 'UNRISD', src: '/img/un-partners/unrisd.jpg', href: 'https://www.unrisd.org/' },
  { name: 'CTBTO', src: '/img/un-partners/ctbto.png', href: 'https://www.ctbto.org/' },
  { name: 'UNOOSA', src: '/img/un-partners/unoosa.jpg', href: 'https://www.unoosa.org/' },
  { name: 'UNODC', src: '/img/un-partners/unodc.jpg', href: 'https://www.unodc.org/' },
  { name: 'UNODA', src: '/img/un-partners/unoda.jpg', href: 'https://www.un.org/disarmament/' },
  { name: 'UNITAR', src: '/img/un-partners/unitar.jpg', href: 'https://unitar.org/' },
  { name: 'UNDRR', src: '/img/un-partners/undrr.png', href: 'https://www.undrr.org/' },
  { name: 'UNIDO', src: '/img/un-partners/unido.jpg', href: 'https://www.unido.org/' },
  { name: 'UNIDIR', src: '/img/un-partners/unidir.jpg', href: 'https://unidir.org/' },
  { name: 'UNICRI', src: '/img/un-partners/unicri.jpg', href: 'http://www.unicri.it/' },
  { name: 'UNHCR', src: '/img/un-partners/unhcr.jpg', href: 'https://www.unhcr.org/' },
  { name: 'UN-Habitat', src: '/img/un-partners/un-habitat.jpg', href: 'https://unhabitat.org/' },
  { name: 'UNFPA', src: '/img/un-partners/unfpa.jpg', href: 'https://www.unfpa.org/' },
  { name: 'UNFCCC', src: '/img/un-partners/unfccc.jpg', href: 'https://unfccc.int/' },
  { name: 'UNESCO', src: '/img/un-partners/unesco.jpg', href: 'https://en.unesco.org/' },
  { name: 'UNEP', src: '/img/un-partners/unep.jpg', href: 'https://www.unep.org/' },
  { name: 'UNECE', src: '/img/un-partners/unece.jpg', href: 'https://www.unece.org/info/ece-homepage.html' },
  { name: 'UN DESA', src: '/img/un-partners/un-desa.jpg', href: 'https://www.un.org/en/desa' },
  { name: 'UNCTAD', src: '/img/un-partners/unctad.jpg', href: 'https://unctad.org/' },
  { name: 'UN Women', src: '/img/un-partners/un-women.jpg', href: 'https://www.unwomen.org/en' },
  { name: 'IOM', src: '/img/un-partners/iom.jpg', href: 'https://www.iom.int/' },
  { name: 'IMO', src: '/img/un-partners/imo.jpg', href: 'https://www.imo.org/en' },
  { name: 'ILO', src: '/img/un-partners/ilo.png', href: 'https://www.ilo.org/global/lang--en/index.htm' },
  { name: 'UN Global Pulse', src: '/img/un-partners/un-global-pulse.webp', href: 'https://www.unglobalpulse.org/' },
  { name: 'FAO', src: '/img/un-partners/fao.png', href: 'http://www.fao.org/home/en/' },
  { name: 'UN DPPA', src: '/img/un-partners/un-dppa.jpg', href: 'https://dppa.un.org/en' },
  { name: 'UNOCHA', src: '/img/un-partners/unocha.webp', href: 'https://www.unocha.org/' },
  { name: 'IAEA', src: '/img/un-partners/iaea.jpg', href: 'https://www.iaea.org/' },
  { name: 'IMF', src: '/img/un-partners/imf.jpg', href: 'https://www.imf.org/' },
  { name: 'IFAD', src: '/img/un-partners/ifad.png', href: 'https://www.ifad.org/en/' },
  { name: 'ITC', src: '/img/un-partners/itc.png', href: 'https://www.intracen.org/' },
  { name: 'ITU', src: '/img/un-partners/itu.jpg', href: 'https://www.itu.int/' },
  { name: 'UNDP', src: '/img/un-partners/undp.jpg', href: 'https://www.undp.org/' },
  { name: 'OHCHR', src: '/img/un-partners/ohchr.png', href: 'https://www.ohchr.org/' },
  { name: 'UNCCD', src: '/img/un-partners/unccd.png', href: 'https://www.unccd.int/' },
  { name: 'UNESCWA', src: '/img/un-partners/unescwa.png', href: 'https://www.unescwa.org/' },
  { name: 'UN Global Compact', src: '/img/un-partners/un-global-compact.png', href: 'https://unglobalcompact.org/' },
  { name: 'UNICC', src: '/img/un-partners/unicc.png', href: 'https://www.unicc.org/' },
  { name: 'UNJSPF', src: '/img/un-partners/unjspf.png', href: 'https://www.unjspf.org/' },
  { name: 'UNOCT', src: '/img/un-partners/unoct.png', href: 'https://www.un.org/counterterrorism/' },
  { name: 'UNSSC', src: '/img/un-partners/unssc.jpg', href: 'https://www.unssc.org/' },
  { name: 'UPU', src: '/img/un-partners/upu.png', href: 'https://www.upu.int/en/home' },
  { name: 'WTO', src: '/img/un-partners/wto.png', href: 'https://www.wto.org/' },
  {
    name: 'UN Digital & Emerging Technologies',
    src: '/img/un-partners/un-digital-emerging-tech.png',
    href: 'https://www.un.org/digital-emerging-technologies/',
  },
  { name: 'Unite', src: '/img/un-partners/unite.png', href: 'https://unite.un.org/en' },
]

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
        src: '/img/sponsors/china-unicom.jpg',
        href: 'https://www.cuguplus.com/company',
      },
    ],
  },
  {
    label: 'Gold sponsors',
    logos: [
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
    label: 'Silver sponsors',
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
    label: 'Youth Zone sponsors',
    logos: [{ name: 'LEGO', src: '/img/sponsors/lego.png', href: 'https://www.lego.com/' }],
  },
  {
    label: 'Networking partners',
    logos: [
      { name: 'Lenovo', src: '/img/sponsors/lenovo.png', href: 'https://www.lenovo.com/us/en/' },
      { name: 'TikTok', src: '/img/sponsors/tiktok.png', href: 'https://www.tiktok.com/about' },
      { name: 'Giga', src: '/img/sponsors/giga.png', href: 'https://giga.global/' },
      {
        name: 'Human Change',
        src: '/img/sponsors/humanchange.jpg',
        href: 'https://humanchange.com/',
      },
      { name: 'Zurich', src: '/img/sponsors/zurich.png', href: 'https://www.zurich.com/' },
      { name: 'HP', src: '/img/sponsors/hp.png', href: 'http://www.hp.com/' },
      { name: 'IBM', src: '/img/sponsors/ibm.png', href: 'https://www.ibm.com/' },
      {
        name: 'NPSM by Advance Solutions',
        src: '/img/sponsors/advancesolutions.png',
        href: 'https://www.advancesolutions.com/',
      },
      { name: 'ACM', src: '/img/sponsors/acm.jpeg', href: 'https://www.acm.org/' },
      { name: 'D-Teach', src: '/img/sponsors/d-teach.png', href: 'https://d-teach.com/' },
      {
        name: 'QAI Ventures',
        src: '/img/sponsors/qai-ventures.png',
        href: 'https://qai-ventures.com/',
      },
      { name: 'AWS', src: '/img/sponsors/aws.png', href: 'https://aws.amazon.com/' },
      { name: 'Siemens', src: '/img/sponsors/siemens.png', href: 'https://www.siemens.com/en-gb/' },
      { name: 'UNDP', src: '/img/sponsors/undp.png', href: 'https://www.undp.org/' },
      {
        name: 'UK Mission to the United Nations in Geneva',
        src: '/img/sponsors/uk-mission.png',
        href: 'https://www.gov.uk/world/organisations/uk-mission-to-the-wto-un-and-other-international-organisations-geneva',
      },
      { name: 'Google', src: '/img/sponsors/google.png', href: 'https://google.com/' },
      {
        name: 'Special Competitive Studies Project',
        src: '/img/sponsors/scsp.png',
        href: 'https://www.scsp.ai/',
      },
    ],
  },
  {
    label: 'Session partners',
    logos: [
      { name: 'CAICT', src: '/img/sponsors/caict.jpg', href: 'https://www.caict.ac.cn/english/' },
      { name: 'GTI', src: '/img/sponsors/gti.png', href: 'https://www.gtigroup.org/' },
      { name: 'WIC', src: '/img/sponsors/wic.png', href: 'https://www.wicinternet.org/' },
      { name: 'S&P Global', src: '/img/sponsors/sp-global.png', href: 'https://www.spglobal.com/en' },
      {
        name: 'AutonomousXMobility',
        src: '/img/sponsors/autonomous-x-mobility.png',
        href: 'https://aiforgood.itu.int/event/autonomous-x-mobility-the-global-congress-on-ai-powered-mobility/',
      },
      { name: 'Microsoft', src: '/img/sponsors/microsoft.jpg', href: 'https://www.microsoft.com/en-us/' },
      { name: 'Cisco', src: '/img/sponsors/cisco.png', href: 'https://www.cisco.com/' },
      {
        name: 'Access Partnership',
        src: '/img/sponsors/access-partnership.png',
        href: 'https://accesspartnership.com/',
      },
      { name: 'FAB', src: '/img/sponsors/fab.jpg', href: 'https://fsab.sa.com/' },
      { name: 'Eraneos', src: '/img/sponsors/eraneos.png', href: 'https://www.eraneos.com/' },
      { name: 'EY', src: '/img/sponsors/ey.jpg', href: 'https://www.ey.com/en_gl/services/ai/platform' },
      {
        name: 'Zhejiang Lab',
        src: '/img/sponsors/zhejiang-lab.png',
        href: 'https://en.zhejianglab.com/',
      },
      { name: 'PixVerse', src: '/img/sponsors/pixverse.png', href: 'https://app.pixverse.ai/' },
      { name: 'WYF', src: '/img/sponsors/wyf.jpeg' },
      {
        name: 'Huawei',
        src: '/img/sponsors/huawei.png',
        href: 'https://www.huawei.com/en/',
      },
    ],
  },
  {
    label: 'Innovation Factory Local Chapters',
    logos: [
      {
        name: 'Government of Catalonia',
        src: '/img/sponsors/gencat.png',
        href: 'https://web.gencat.cat/ca/ciutadania/inici',
      },
      {
        name: 'Akbank LAB',
        src: '/img/sponsors/akbank-lab.png',
        href: 'https://www.akbanklab.com/tr/ana-sayfa',
      },
      {
        name: 'Innovate Australia',
        src: '/img/sponsors/innovate-australia.jpg',
        href: 'https://innovateaustralia.org/',
      },
    ],
  },
  {
    label: 'Media partners',
    logos: [
      { name: 'AI Magazine', src: '/img/sponsors/ai-magazine.png', href: 'https://aimagazine.com/' },
      { name: 'Devex', src: '/img/sponsors/devex.jpg', href: 'https://www.devex.com/' },
      { name: 'Digitel Talk', src: '/img/sponsors/digitel-talk.png' },
      { name: 'GZERO Media', src: '/img/sponsors/gzero-media.png', href: 'https://www.gzeromedia.com/' },
      {
        name: 'Knowledge Networks',
        src: '/img/sponsors/knowledge-networks.jpg',
        href: 'https://knowledgenetworks.org/',
      },
      { name: 'Léman Bleu', src: '/img/sponsors/leman-bleu.png', href: 'https://www.lemanbleu.ch/' },
      {
        name: 'Telecom Review Europe',
        src: '/img/sponsors/telecom-review-europe.jpg',
        href: 'https://www.telecomrevieweurope.com/',
      },
      {
        name: 'The Mainstream',
        src: '/img/sponsors/the-mainstream.jpeg',
        href: 'https://themainstream.co.in/',
      },
    ],
  },
  {
    label: 'Technology partners',
    logos: [
      { name: 'Dorier', src: '/img/sponsors/dorier.png', href: 'https://dorier-group.com/' },
      { name: 'Interprefy', src: '/img/sponsors/interprefy.png', href: 'https://www.interprefy.com/' },
      { name: 'Myonvent', src: '/img/sponsors/myonvent.png', href: 'https://myonvent.com/' },
      { name: 'Polomarco', src: '/img/sponsors/polomarco.png', href: 'https://polomarco.ch/' },
      { name: 'UFOTech', src: '/img/sponsors/ufotech.png', href: 'https://ufotech.com/aiforgood/voyages/' },
    ],
  },
]

export const TICKER_ITEMS = [
  '21–24 June 2027',
  '1,200+ speakers',
  '250+ exhibitors',
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

export type Theme = { title: string; img: string }

/** The Summit's programme themes, as shown on aiforgood.itu.int/summit27. */
export const THEMES: Theme[] = [
  { title: 'AI & the future of work', img: '/img/themes/ai-future-of-work.jpg' },
  { title: 'AI creativity & culture', img: '/img/themes/ai-creativity-culture.jpg' },
  { title: 'AI for food & agriculture', img: '/img/themes/ai-food-agriculture.png' },
  { title: 'AI for health', img: '/img/themes/ai-health.png' },
  { title: 'AI for planet', img: '/img/themes/ai-planet.jpg' },
  { title: 'AI policy', img: '/img/themes/ai-policy.jpg' },
  { title: 'AI skills & education', img: '/img/themes/ai-skills-education.png' },
  { title: 'AI Standards Exchange', img: '/img/themes/ai-standards-exchange.png' },
  { title: 'Frontier technologies', img: '/img/themes/frontier-technologies.jpg' },
  { title: 'AI & mobility', img: '/img/themes/ai-mobility.jpg' },
  { title: 'Impact & innovation', img: '/img/themes/impact-innovation.png' },
  { title: 'Quantum for Good', img: '/img/themes/quantum-for-good.png' },
  { title: 'Robotics for Good', img: '/img/themes/robotics-for-good.png' },
  { title: 'AI infrastructure', img: '/img/themes/ai-infrastructure.png' },
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
    title: 'AI Standards',
    links: [
      {
        label: 'AI Standards Exchange Database',
        href: 'https://aiforgood.itu.int/ai-standards-exchange/',
      },
      { label: 'UN AI Resource Hub', href: 'https://unaihub.aiforgood.itu.int/' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'About us', href: LINKS.about },
      { label: 'Sponsorship opportunities', href: LINKS.becomeASponsor },
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
