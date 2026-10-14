// Contenido del sitio, extraído de iconmm.com/es (octubre 2026).
// Mismas secciones y textos que la home original: hero + InnoTrans, cuatro soluciones,
// clientes, ICEX, noticias y pie con oficinas y asociaciones.

export const nav = [
  { name: "Soluciones", link: "#soluciones" },
  { name: "Clientes", link: "#clientes" },
  { name: "Presencia", link: "#presencia" },
  { name: "Noticias", link: "#noticias" },
  { name: "Conócenos", link: "https://www.iconmm.com/about-us/" },
];

export const event = {
  eyebrow: "Próximo evento",
  title: "DENEVA en InnoTrans 2026",
  body: "DENEVA estará presente en InnoTrans 2026, que se celebrará del 22 al 25 de septiembre de 2026, mostrando sus soluciones de Sistemas de Información al Viajero (SIV) y Digital Signage para entornos de movilidad.",
  city: "Berlín",
  dates: "22–25 sept. 2026",
  image: "/images/news-innotrans.png",
  url: "https://www.iconmm.com/news/",
};

export type Solution = {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  link: string;
};

export const solutions: Solution[] = [
  {
    id: "deneva",
    code: "01",
    name: "DENEVA",
    category: "Cartelería digital",
    description:
      "El software de Digital Signage DENEVA permite crear y optimizar experiencias de cliente únicas a través de soluciones innovadoras.",
    tags: ["Retail", "Transporte", "Corporativo"],
    image: "/images/signage.jpg",
    imageAlt: "Videowall de DENEVA bajo la cúpula de un centro comercial",
    link: "https://www.iconmm.com/deneva-digital-signage/",
  },
  {
    id: "transit",
    code: "02",
    name: "DENEVA.transit",
    category: "Sistema de información al viajero",
    description:
      "DENEVA.transit proporciona un avanzado sistema de gestión de contenidos para administrar Sistemas de Información al Pasajero en estaciones inteligentes.",
    tags: ["Tren", "Metro", "Autobús"],
    image: "/images/transit.jpg",
    imageAlt: "Pantallas de información al pasajero de DENEVA.transit en una estación de Adif",
    link: "https://www.iconmm.com/deneva-passenger-information-system/",
  },
  {
    id: "mirandda",
    code: "03",
    name: "MIRANDDA",
    category: "Smart mirror",
    description:
      "Mirandda es la potente solución para el sector retail que da vida a la experiencia de compra omnicanal en el área de probadores.",
    tags: ["Moda", "RFID", "Omnicanal"],
    image: "/images/mirror.jpg",
    imageAlt: "Espejo inteligente MIRANDDA en un probador de moda",
    link: "https://www.iconmm.com/mirandda-smart-mirror/",
  },
  {
    id: "kommanda",
    code: "04",
    name: "KOMMANDA",
    category: "Kiosko de autoservicio",
    description:
      "Kommanda es la solución de quiosco de pedidos de vanguardia basada en IA, que se integra con los sistemas POS existentes para optimizar el proceso de compra de los clientes.",
    tags: ["QSR", "IA", "TPV"],
    image: "/images/kiosk.jpg",
    imageAlt: "Clienta eligiendo su menú en un kiosco KOMMANDA",
    link: "https://www.iconmm.com/kommanda-digital-kiosk/",
  },
];

export const clients = [
  { name: "BBVA", src: "/images/clients/1.png" },
  { name: "Hyundai", src: "/images/clients/2.png" },
  { name: "Brittany Ferries", src: "/images/clients/3.png" },
  { name: "Adif", src: "/images/clients/4.png" },
  { name: "Metro de Santiago de Chile", src: "/images/clients/5.png" },
  { name: "Metro de Medellín", src: "/images/clients/6.png" },
  { name: "Decathlon", src: "/images/clients/7.png" },
  { name: "Repsol", src: "/images/clients/8.png" },
  { name: "Pizza Hut", src: "/images/clients/9.png" },
  { name: "Toy Planet", src: "/images/clients/10.png" },
  { name: "Metro de Madrid", src: "/images/clients/11.png" },
  { name: "GSK", src: "/images/clients/12.png" },
];

export const icex = {
  text: "ICON Multimedia, S.L. ha participado en el Programa de Iniciación a la Exportación ICEX-Next, y ha contado con el apoyo de ICEX, así como con la cofinanciación de Fondos europeos FEDER, habiendo contribuido, según la medida de los mismos, al crecimiento económico de esta empresa, su región y de España en su conjunto.",
  logos: [
    { name: "ICEX · Fondos FEDER de la Unión Europea", src: "/images/icex.png", className: "h-7" },
    { name: "Certificaciones ISO", src: "/images/isos.png", className: "h-12" },
    { name: "Esquema Nacional de Seguridad", src: "/images/ens.png", className: "h-12" },
    { name: "RGPD", src: "/images/gdpr.jpg", className: "h-12" },
  ],
};

// Presencia internacional: sedes y rutas hacia ciudades con clientes o eventos de ICON.
export const presence = {
  hubs: [
    { name: "Palencia", region: "EMEA", lat: 42.01, lng: -4.53 },
    { name: "Ciudad de México", region: "LATAM", lat: 19.36, lng: -99.26 },
  ],
  routes: [
    { from: "Palencia", to: "Madrid", lat: 40.42, lng: -3.7, note: "Metro de Madrid · Adif" },
    { from: "Palencia", to: "Berlín", lat: 52.52, lng: 13.4, note: "InnoTrans 2026" },
    { from: "Palencia", to: "Plymouth", lat: 50.37, lng: -4.14, note: "Brittany Ferries" },
    { from: "Palencia", to: "Ciudad de México", lat: 19.36, lng: -99.26, note: "Sede LATAM" },
    { from: "Ciudad de México", to: "Santiago de Chile", lat: -33.45, lng: -70.67, note: "Metro de Santiago" },
    { from: "Ciudad de México", to: "Medellín", lat: 6.24, lng: -75.58, note: "Metro de Medellín" },
  ],
  regions: [
    { name: "Europa", detail: "Sede en Palencia. Adif, Metro de Madrid, Brittany Ferries, BBVA, Repsol." },
    { name: "Latinoamérica", detail: "Sede en Ciudad de México. Metro de Santiago de Chile y Metro de Medellín." },
    { name: "Oriente Medio y África", detail: "Cobertura desde la oficina EMEA, con soporte 24/7." },
  ],
};

export const offices = [
  {
    region: "EMEA",
    city: "Palencia, España",
    address: ["Avda. Santiago Amón 3-5", "34005 Palencia (Spain)"],
    phone: "+34 979 70 29 06",
  },
  {
    region: "LATAM",
    city: "Ciudad de México",
    address: ["Av. Javier Barros Sierra 495, Santa Fe", "Álvaro Obregón, 01210 CDMX"],
    phone: "+52 55 7008 7238",
  },
];

export const news = [
  {
    date: "19 ago 2026",
    title: "ICON Multimedia estará en InnoTrans 2026",
    image: "/images/news-innotrans.png",
    link: "https://www.iconmm.com/news/",
  },
  {
    date: "8 jul 2026",
    title: "DENEVA y Unilumin impulsan nuevas alianzas en México",
    image: "/images/news-unilumin.jpg",
    link: "https://www.iconmm.com/news/",
  },
  {
    date: "15 jun 2026",
    title: "ICON Multimedia impulsa junto a Siloé una nueva estación de Bosque Sonoro",
    image: "/images/news-siloe.jpg",
    link: "https://www.iconmm.com/news/",
  },
  {
    date: "27 may 2026",
    title: "DENEVA impulsa la experiencia digital del Rugby Europeo en Bilbao",
    image: "/images/news-rugby.png",
    link: "https://www.iconmm.com/news/",
  },
];

export const social = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/iconmultimedia" },
  { name: "Instagram", href: "https://www.instagram.com/iconmultimedia/" },
  { name: "X", href: "https://x.com/iconmultimedia" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UC0KTNHJpBfXdKHHeFKMDpgQ" },
  { name: "Facebook", href: "https://www.facebook.com/ICONMultimediaES/" },
];

export const members = [
  { name: "AVIXA", src: "/images/members/avixa.png" },
  { name: "DS LATAM", src: "/images/members/dslatam.png" },
  { name: "MAFEX", src: "/images/members/mafex.png" },
  { name: "PTFE", src: "/images/members/ptfe.png" },
  { name: "AETICAL", src: "/images/members/aetical.png" },
  { name: "EFCL", src: "/images/members/efcl.png" },
  { name: "CEOE", src: "/images/members/ceoe.png" },
];

export const legal = [
  { name: "Aviso legal", href: "https://www.iconmm.com/legal-notice/" },
  { name: "Política de privacidad", href: "https://www.iconmm.com/gdpr/" },
  { name: "Política de cookies", href: "https://www.iconmm.com/cookie-policy/" },
];
