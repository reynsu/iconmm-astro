// Contenido del sitio, extraído de iconmm.com (octubre 2026).

export const nav = [
  { name: "Soluciones", link: "#soluciones" },
  { name: "Plataforma", link: "#plataforma" },
  { name: "Presencia", link: "#presencia" },
  { name: "Noticias", link: "#noticias" },
  { name: "Contacto", link: "#contacto" },
];

export const event = {
  name: "InnoTrans 2026",
  city: "Berlín",
  dates: "22–25 sept.",
  url: "https://www.innotrans.de",
};

export type Solution = {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  link: string;
};

export const solutions: Solution[] = [
  {
    id: "deneva",
    code: "01",
    name: "DENEVA",
    category: "Digital Signage",
    description:
      "Plataforma de experiencia digital para automatizar y personalizar redes de cartelería. Gestiona una pantalla o miles desde un único lugar y adapta el contenido al negocio local y a cada audiencia.",
    features: ["Monitorización en tiempo real", "Multi-player y multi-dispositivo", "Omnicanal"],
    image: "/images/signage.jpg",
    imageAlt: "Videowall de DENEVA bajo la cúpula de un centro comercial",
    link: "https://www.iconmm.com/deneva-digital-signage/",
  },
  {
    id: "transit",
    code: "02",
    name: "DENEVA.transit",
    category: "Información al pasajero",
    description:
      "CMS para pantallas de información al pasajero en estaciones inteligentes y a bordo. Llegadas, salidas e incidencias en tiempo real, combinando datos de tren, metro, bus, tranvía y taxi.",
    features: ["Información multimodal", "Sincronización de alta precisión", "Locución accesible"],
    image: "/images/transit.jpg",
    imageAlt: "Pantallas de información al pasajero de DENEVA.transit en una estación de Adif",
    link: "https://www.iconmm.com/deneva-passenger-information-system/",
  },
  {
    id: "mirandda",
    code: "03",
    name: "MIRANDDA",
    category: "Smart Mirror",
    description:
      "Espejo inteligente que digitaliza el probador. El cliente ve tallas y colores disponibles, recibe sugerencias de look y pide otra prenda sin salir de la cabina.",
    features: ["Detección RFID", "Sensores de presencia", "Business intelligence"],
    image: "/images/mirror.jpg",
    imageAlt: "Espejo inteligente MIRANDDA en un probador de moda",
    link: "https://www.iconmm.com/mirandda-smart-mirror/",
  },
  {
    id: "kommanda",
    code: "04",
    name: "KOMMANDA",
    category: "Kiosco de autoservicio",
    description:
      "Software de kiosco para pedir y pagar sin colas. Funciona sobre cualquier hardware, se integra con el TPV existente y actualiza precios y stock en tiempo real.",
    features: ["Integración con TPV", "Control de stock automático", "Modo accesible"],
    image: "/images/kiosk.jpg",
    imageAlt: "Clienta eligiendo su menú en un kiosco KOMMANDA",
    link: "https://www.iconmm.com/kommanda-digital-kiosk/",
  },
];

export const stats = [
  { value: "+12.000", label: "ubicaciones digitalizadas en todo el mundo" },
  { value: "1.000 M", label: "de viajeros informados al año con DENEVA" },
  { value: "+100", label: "funcionalidades en la plataforma" },
  { value: "24/7", label: "equipo de soporte especializado" },
];

export const capabilities = [
  {
    title: "Una pantalla o miles",
    description: "Control centralizado de toda la red desde un único panel, con contenidos segmentados por zona, estación o línea.",
    icon: "layers",
  },
  {
    title: "Datos en tiempo real",
    description: "Integra fuentes externas —horarios, stock, precios, redes sociales— y las publica al instante.",
    icon: "activity",
  },
  {
    title: "Libertad de hardware",
    description: "Compatible con los SoC de los principales fabricantes. Reutiliza las pantallas que ya tienes.",
    icon: "cpu",
  },
  {
    title: "Ciberseguridad",
    description: "Perfiles de usuario, control de accesos y registro de actividad. Certificación ENS.",
    icon: "shield",
  },
  {
    title: "Medición de audiencias",
    description: "Big data, informes y analítica para decidir qué contenido funciona y dónde.",
    icon: "chart",
  },
];

export const sectors = ["Transporte", "Retail", "QSR", "Banca", "Corporativo", "Supermercados", "Cruceros"];

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

export const offices = [
  {
    region: "EMEA",
    city: "Palencia, España",
    address: ["Avda. Santiago Amón 3-5", "34005 Palencia"],
    phone: "+34 979 70 29 06",
    coords: { lat: 42.01, lng: -4.53 },
  },
  {
    region: "LATAM",
    city: "Ciudad de México",
    address: ["Av. Javier Barros Sierra 495, Santa Fe", "Álvaro Obregón, 01210 CDMX"],
    phone: "+52 55 7008 7238",
    coords: { lat: 19.36, lng: -99.26 },
  },
];

export const news = [
  {
    date: "19 ago 2026",
    title: "ICON Multimedia expondrá en InnoTrans 2026",
    image: "/images/news-innotrans.png",
    link: "https://www.iconmm.com/news/",
  },
  {
    date: "8 jul 2026",
    title: "DENEVA y Unilumin refuerzan su alianza en México",
    image: "/images/news-unilumin.jpg",
    link: "https://www.iconmm.com/news/",
  },
  {
    date: "15 jun 2026",
    title: "ICON Multimedia y Siloé lanzan un nuevo Bosque Sonoro",
    image: "/images/news-siloe.jpg",
    link: "https://www.iconmm.com/news/",
  },
  {
    date: "27 may 2026",
    title: "DENEVA impulsa la experiencia digital del European Rugby en Bilbao",
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
