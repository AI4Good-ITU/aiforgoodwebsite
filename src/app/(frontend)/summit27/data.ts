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
  description: string
  /** The speaker's page on aiforgood.itu.int. */
  href: string
}

export const SPEAKERS: Speaker[] = [
  {
    name: 'Doreen Bogdan-Martin',
    role: 'Secretary-General, ITU',
    img: '/img/speakers/doreen-bogdan-martin.jpg',
    description: 'Doreen Bogdan-Martin took office as Secretary-General of the International Telecommunication Union (ITU) on 1 January 2023. Ms Bogdan-Martin was elected as ITU’s first-ever female Secretary-General by Member States at the Union’s Plenipotentiary Conference in Bucharest, Romania. Ms Bogdan-Martin was previously the…',
    href: 'https://aiforgood.itu.int/speaker/doreen-bogdan-martin/',
  },
  {
    name: 'H.E. Mr. Alar Karis',
    role: 'President, Republic of Estonia',
    img: '/img/speakers/h-e-mr-alar-karis.jpg',
    description: 'President Alar Karis was born on 26 March 1958 in Tartu. President Karis graduated from the Estonian Agricultural Academy (now the Estonian University of Life Sciences) in 1981. He earned a Master of Science degree in parasitology in 1987, with his later research focussing on molecular genetics and developmental…',
    href: 'https://aiforgood.itu.int/speaker/h-e-mr-alar-karis/',
  },
  {
    name: 'H.E. Ms. Halla Tómasdóttir',
    role: 'President, Iceland',
    img: '/img/speakers/h-e-ms-halla-tomasdottir.jpg',
    description: 'Halla Tómasdóttir took office as the 7th President of Iceland on 1 August 2024. A business leader and advocate for responsible leadership, she has a background in finance, higher education, and social change. She co-founded Auður Capital, a female-led investment firm, and led The B Team, a global nonprofit focused on…',
    href: 'https://aiforgood.itu.int/speaker/h-e-ms-halla-tomasdottir/',
  },
  {
    name: 'H.E. Mr. Paul Kagame',
    role: 'President, Republic of Rwanda',
    img: '/img/speakers/h-e-mr-paul-kagame.jpg',
    description: 'Paul Kagame is the President of the Republic of Rwanda. He serves as the African Union (AU) Champion for Domestic Health Financing. President Kagame previously served as the Commonwealth Chair-in-Office for two years from 2022. He also Chaired the African Union from 2018 to 2019 as well as the East African Community…',
    href: 'https://aiforgood.itu.int/speaker/h-e-mr-paul-kagame/',
  },
  {
    name: 'Björn Ulvaeus',
    role: 'Co-founder of ABBA and President, CISAC',
    img: '/img/speakers/bjorn-ulvaeus.jpg',
    description: 'Björn Ulvaeus is a Swedish songwriter, producer, entrepreneur and creators’ rights advocate. Best known as co-founder and member of ABBA, he has helped shape global music and entertainment for more than five decades. Together with his longtime collaborator Benny Andersson, he co-wrote some of the most successful songs…',
    href: 'https://aiforgood.itu.int/speaker/bjorn-ulvaeus/',
  },
  {
    name: 'Volker Türk',
    role: 'United Nations High Commissioner for Human Rights, OHCHR',
    img: '/img/speakers/volker-turk.jpg',
    description: 'United Nations High Commissioner for Human Rights, OHCHR',
    href: 'https://aiforgood.itu.int/speaker/volker-turk/',
  },
  {
    name: 'Puyr Tembé',
    role: 'Former Secretary of Indigenous Peoples, Indigenous Leader',
    img: '/img/speakers/puyr-tembe.jpg',
    description: 'Puyr Tembé is an Indigenous leader of the Tembé people from the Alto Rio Guamá Indigenous Territory in the Brazilian Amazon. Widely recognized for her advocacy of Indigenous rights, the protection of ancestral territories, and the preservation of traditional knowledge, she has become one of the most respected and…',
    href: 'https://aiforgood.itu.int/speaker/puyr-tembe/',
  },
  {
    name: 'Maria Ressa',
    role: 'Nobel Peace Prize Laureate; Co-Founder and CEO, Rappler',
    img: '/img/speakers/maria-ressa.jpg',
    description: 'Maria Ressa co-founded Rappler, the top digital-only news site that is leading the fight for press freedom in the Philippines. As Rappler’s CEO, Maria has endured constant political harassment and arrests by the Duterte government, forced to post bail eleven times to stay free. Rappler’s battle for truth and democracy…',
    href: 'https://aiforgood.itu.int/speaker/maria-ressa/',
  },
  {
    name: 'Marc Benioff',
    role: 'Chair & CEO, Salesforce',
    img: '/img/speakers/marc-benioff.jpg',
    description: 'Chair & CEO, Salesforce',
    href: 'https://aiforgood.itu.int/speaker/marc-benioff/',
  },
  {
    name: 'Yoshua Bengio',
    role: 'Professor; Founder and Scientific Advisor; Co-President, Université de Montréal; Mila; LawZero',
    img: '/img/speakers/yoshua-bengio.jpg',
    description: 'Yoshua Bengio is Full Professor of Computer Science at Université de Montreal, Co-President and Scientific Director of LawZero, as well as the Founder and Scientific Advisor of Mila. He also holds a Canada CIFAR AI Chair. Considered one of the world’s leaders in Artificial Intelligence and Deep Learning, he is the…',
    href: 'https://aiforgood.itu.int/speaker/yoshua-bengio/',
  },
  {
    name: 'Wang Jian',
    role: 'Founder of Alibaba Cloud, Director, Zhejiang Lab',
    img: '/img/speakers/wang-jian.jpg',
    description: 'Dr. Jian Wang is an Academician of the Chinese Academy of Engineering, Director of Zhejiang Lab, and Founder of Alibaba Cloud. The Cloud ranks third as a public cloud provider globally and first in Asia. He was also the chief architect of Apsara, its computing foundation, and took the lead in proposing the industrial…',
    href: 'https://aiforgood.itu.int/speaker/wang-jian/',
  },
  {
    name: 'Avye Couloute',
    role: 'Founder, Girls Into Coding',
    img: '/img/speakers/avye-couloute.jpg',
    description: 'Avye Couloute is the 18-year-old Founder of Girls Into Coding, a UK organisation she started at age 10 after noticing that most of the young people at the tech workshops she was running were boys. Eight years on, Girls Into Coding has reached 20,000+ girls across the UK through free hands-on workshops in coding,…',
    href: 'https://aiforgood.itu.int/speaker/avye-couloute/',
  },
]

export type Exhibitor = {
  name: string
  img: string
  description: string
  /** The exhibitor's page on aiforgood.itu.int. */
  href: string
}

/** From the exhibitor showcase on aiforgood.itu.int/summit27. */
export const EXHIBITORS_2026: Exhibitor[] = [
  {
    name: 'Aperobot',
    img: '/img/exhibitors/aperobot.jpg',
    description: 'Workshop 4.0, the Haute Ecole d’Ingénierie (HEI) and Les Celliers de Sion have developed the first robot capable of serving you a glass of Swiss wine. This new robot was used for the first time at the 2020 Open Cellar Days in Valais. Since then, the robot has evolved considerably, with a linear and circular axis…',
    href: 'https://aiforgood.itu.int/speaker/aperobot/',
  },
  {
    name: 'Jupiter',
    img: '/img/exhibitors/jupiter.jpg',
    description: 'Zeroth Jupiter is a humanoid robot designed for versatile real-world applications. It supports both teleoperation and autonomous modes, adapting seamlessly to different task requirements and balancing human-robot collaboration with independent operation. Jupiter targets the emerging need for human-scaled robots in…',
    href: 'https://aiforgood.itu.int/speaker/jupiter/',
  },
  {
    name: 'Live Biosonification Performance',
    img: '/img/exhibitors/live-biosonification-performance.png',
    description: 'In this live demonstration, plants and fungi generate music and movement in real time using their own bio‑electrical signals. Electrodes placed on the organism detect tiny fluctuations in conductivity caused by changes in water movement, ionic concentration, and environmental stimuli. These signals are translated into…',
    href: 'https://aiforgood.itu.int/speaker/live-biosonification-performance/',
  },
  {
    name: 'N1',
    img: '/img/exhibitors/n1.jpeg',
    description: 'N1 is the first home robot that truly enters your home—and your heart, featuring an innovative ultra-compact design that is easy to store, easy to move, and built to blend naturally into the home environment, a first-of-its-kind heterogeneous arm system with a telescopic arm + cable-driven arm delivering high…',
    href: 'https://aiforgood.itu.int/speaker/n1/',
  },
  {
    name: 'Roboclette',
    img: '/img/exhibitors/roboclette.jpg',
    description: 'A true emblem of Valais genius, Roboclette is the first machine in the world capable of scraping melted cheese. Starting from a joint idea between Emmanuel Pignat, Sylvain Calinon and Nicolas Fontaine, the idea was made concrete by the development of Roboclette at the Idiap Research Institute. The success of…',
    href: 'https://aiforgood.itu.int/speaker/roboclette/',
  },
  {
    name: 'uMe',
    img: '/img/exhibitors/ume.jpg',
    description: 'uMe by United Robotics Group helps students experience humanoid robotics in a practical, intuitive, and engaging way. Instead of only learning from theory, students can interact directly with a humanoid robot, observe its behavior, and understand how humans and robots can work together. This makes robotics more…',
    href: 'https://aiforgood.itu.int/speaker/ume/',
  },
  {
    name: 'Unitree G1',
    img: '/img/exhibitors/unitree-g1.jpg',
    description: 'Unitree’s embodied AI robots integrate advanced motion control, multimodal perception and deep learning to operate reliably across industrial, home and entertainment scenarios. They deliver stable locomotion, precise manipulation and adaptive interaction, supporting industrial inspection, logistics, home assistance…',
    href: 'https://aiforgood.itu.int/speaker/unitree-g1/',
  },
  {
    name: 'WallBo',
    img: '/img/exhibitors/wallbo.jpg',
    description: 'Washing hands properly is one of the best ways to stop the spread of illness, but getting young children to do it thoroughly can be a real challenge. Standard reminders like posters and signage often fail to hold children’s attention over time. That is where WallBo comes in a friendly, portable robot buddy designed to…',
    href: 'https://aiforgood.itu.int/speaker/wallbo-the-handwashing-robot-buddy/',
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

export type Article = {
  tag: string
  dot: string
  title: string
  date: string
  img: string
  description: string
  href: string
}

/** The three most recent posts from the AI for Good blog. */
export const NEWS: Article[] = [
  {
    tag: 'Summit 2026',
    dot: 'var(--dot-summit)',
    title:
      'From bit flow to token flow: China Telecom’s blueprint for talking to machines that think',
    date: '21 September 2026',
    img: '/img/news/bit-flow-to-token-flow.jpg',
    description: 'For decades, the receiver has been the passive side of communication. Initially, it was a simple speaker with no intelligence. As digital technology improved, it gained a screen and a decoder, but the end user of information remained a person. With the advent of 6G, this changes: the listener at the receiving end…',
    href: 'https://aiforgood.itu.int/from-bit-flow-to-token-flow-china-telecoms-blueprint-for-talking-to-machines-that-think/',
  },
  {
    tag: 'Summit 2026',
    dot: 'var(--dot-summit)',
    title: 'From plan to plate: Connecting production decisions with material use',
    date: '18 September 2026',
    img: '/img/news/plan-to-plate.jpg',
    description: 'Every day, in large factories that manufacture heavy machinery such as excavators and bulldozers, planners decide which parts to produce together. But that decision, taken without considering the downstream process, can prove costly. Speaking during the session “From Plan to Plate: AI that Designs Out Waste” at the…',
    href: 'https://aiforgood.itu.int/from-plan-to-plate-connecting-production-decisions-with-material-use/',
  },
  {
    tag: 'AI for Good',
    dot: 'var(--dot-standards)',
    title: 'The ITU AI Readiness Hackathon names four winning solutions in Riyadh',
    date: '15 September 2026',
    img: '/img/news/ai-readiness-hackathon.jpg',
    description: 'From financial regulation and clinical safety to agricultural protection, a range of responsible AI principles can be translated into practical, locally grounded solutions. In Riyadh, innovators put responsible AI into action at the ITU AI Readiness Hackathon 2026, transforming complex governance and readiness…',
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

/** Photos from the Summit floor, shown as a full-width 6×2 grid before Testimonials. */
export const GALLERY: string[] = [
  '/img/gallery/reception-courtyard.jpg',
  '/img/gallery/cinema-screening.jpg',
  '/img/gallery/innovation-factory-winners.jpg',
  '/img/gallery/humanoid-robot.jpg',
  '/img/gallery/keynote-podium.jpg',
  '/img/gallery/stage-performance.jpg',
  '/img/gallery/keynote-code-screen.jpg',
  '/img/gallery/media-interview.jpg',
  '/img/gallery/group-photo-stage.jpg',
  '/img/gallery/reception-mingling.jpg',
  '/img/gallery/robot-crowd.jpg',
  '/img/gallery/gala-dinner.jpg',
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
