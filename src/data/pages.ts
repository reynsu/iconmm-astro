// Contenido de las páginas interiores, extraído de iconmm.com/es (octubre 2026):
// partners, empleo, responsabilidad social corporativa, noticias y contacto.

export const partners = {
  eyebrow: "Programa de partners",
  intro:
    "Recursos comerciales, técnicos y de marketing dedicados al canal para que tus proyectos de cartelería digital salgan adelante. Trabajamos contigo en cada paso.",
  benefits: [
    {
      code: "CERT",
      title: "Muestra tu experiencia con nuestras certificaciones",
      body: "Conviértete en socio autorizado de DENEVA para demostrar tus habilidades y competencias técnicas para afrontar un proyecto con éxito.",
      icon: "certificate",
    },
    {
      code: "LEARN",
      title: "Adquiere habilidades paso a paso",
      body: "Nuestros planes de formación son un conjunto de cursos confeccionados para ofrecerte conocimientos más profundos sobre las soluciones de DENEVA.",
      icon: "school",
    },
    {
      code: "24/7",
      title: "Consigue el soporte que necesitas para el éxito",
      body: "Nos esforzamos por ayudarte a triunfar. Nuestro equipo de soporte interno está disponible 24 horas, 365 días al año, para apoyarte a ti y a tus clientes.",
      icon: "headset",
    },
  ],
  journey: [
    {
      step: "01",
      title: "Conversación",
      body: "Nos cuentas tu negocio, tus clientes y los sectores en los que trabajas. Juntos vemos qué soluciones de DENEVA encajan con tu catálogo.",
      tags: ["Evaluación", "Modelo de negocio"],
    },
    {
      step: "02",
      title: "Formación",
      body: "Accedes a los planes de formación: cursos diseñados para profundizar en DENEVA, DENEVA.transit, MIRANDDA y KOMMANDA.",
      tags: ["Cursos", "Recursos técnicos"],
    },
    {
      step: "03",
      title: "Certificación",
      body: "Te conviertes en socio autorizado de DENEVA y acreditas tus competencias técnicas ante tus clientes.",
      tags: ["Socio autorizado", "DENEVA"],
    },
    {
      step: "04",
      title: "Al mercado",
      body: "Vendes e implantas con recursos comerciales y de marketing dedicados al canal, y con nuestro soporte interno 24/7/365 detrás de cada proyecto.",
      tags: ["Marketing de canal", "Soporte 24/7"],
    },
  ],
  cta: "Abre tu empresa a nuevas oportunidades de negocio",
};

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  modality: string;
  summary: string;
  functions: string[];
  profile: string[];
  offer: string[];
  link: string;
};

export const careers = {
  eyebrow: "Únete al equipo",
  intro:
    "Somos una empresa joven, vibrante y en crecimiento, ubicada en Palencia, que trabaja en proyectos nacionales e internacionales de cartelería digital. Siempre buscamos nuevas ideas y enfoques innovadores, y queremos que formes parte de esta aventura.",
  perks: [
    { title: "Horario flexible", body: "Para conciliar la vida profesional y personal.", icon: "clock" },
    { title: "Jornada intensiva", body: "Todos los viernes y los meses de julio y agosto.", icon: "sun" },
    { title: "Tu cumpleaños, libre", body: "Un día libre cada año para celebrarlo.", icon: "cake" },
    { title: "Formación continua", body: "Plan de desarrollo para que siempre estés aprendiendo y creciendo.", icon: "book" },
    { title: "Entorno saludable", body: "Acceso a programas de bienestar y salud.", icon: "heart" },
    { title: "Bono anual", body: "Salario acorde a tu valía y bono anual sobre desempeño.", icon: "trophy" },
  ],
  jobs: [
    {
      slug: "administrador-de-sistemas",
      title: "Administrador/a de sistemas informáticos",
      department: "Departamento IT",
      location: "Palencia",
      modality: "Presencial",
      summary:
        "Para nuestras oficinas centrales buscamos un/a técnico/a de sistemas. Un proyecto estable y de larga duración donde se valora, por encima de todo, el potencial y las ganas de aprender.",
      functions: [
        "Administración de Windows Server y Linux",
        "Directorio Activo, usuarios y permisos",
        "Redes, almacenamiento, firewalls, antivirus y backups",
        "Despliegue de software en clientes e implantación de nuevos sistemas",
      ],
      profile: [
        "Grado Superior en Administración de Sistemas Informáticos en Red",
        "Al menos 1 año de experiencia en administración de sistemas",
        "Soluciones Microsoft y Linux en entornos complejos; scripting",
        "Inglés técnico medio-alto",
        "Se valora Proxmox, VMware y Kubernetes",
      ],
      offer: [
        "Horario flexible y jornada intensiva los viernes y en verano",
        "Día libre por tu cumpleaños",
        "Plan de desarrollo y formación constante",
        "Programas de bienestar y salud",
        "Salario según valía y bono anual por desempeño",
      ],
      link: "https://www.iconmm.com/es/jobs/administrador-de-sistemas/",
    },
    {
      slug: "backend-developer",
      title: "Backend Developer .NET",
      department: "Departamento IT",
      location: "Palencia",
      modality: "Híbrido",
      summary:
        "Desarrollo de aplicaciones de servidor robustas y escalables con C# y ASP.NET Core para nuestra plataforma, en un proyecto estable y de larga duración.",
      functions: [
        "C# y ASP.NET Core / .NET 7",
        "MySQL, MongoDB y ElasticSearch",
        "Código testeable y clean code",
        "Planificación, diseño y documentación de nuevas aplicaciones",
      ],
      profile: [
        "2 años como desarrollador/a backend",
        "C# y .NET 7; EntityFramework, LINQ y NUnit",
        "Bases de datos relacionales y no relacionales",
        "Nociones de OWASP y experiencia con metodología ágil",
        "Se valora clean architecture y Git",
      ],
      offer: [
        "Proyectos nacionales e internacionales en crecimiento",
        "Jornada completa con horario híbrido y flexible",
        "Plan de desarrollo y formación",
        "Ambiente de compromiso, compañerismo y cercanía",
        "Salario según valía y bono anual por desempeño",
      ],
      link: "https://www.iconmm.com/es/jobs/backend-developer/",
    },
    {
      slug: "frontend-developer-angular",
      title: "Frontend Developer (Angular)",
      department: "Departamento de Contents",
      location: "Palencia",
      modality: "Híbrido",
      summary:
        "Nos apasiona emprender proyectos innovadores basados en tecnología. Buscamos un/a desarrollador/a frontend para evolucionar las aplicaciones web de nuestros productos.",
      functions: [
        "Planificación y diseño de nuevas características",
        "Desarrollo y mantenimiento con Angular, TypeScript, HTML y CSS",
        "Calidad y rendimiento junto al equipo de desarrollo",
        "TDD y revisiones de código",
      ],
      profile: [
        "2 años de experiencia frontend con HTML5, CSS3, SCSS y TypeScript",
        "Angular 12+ en aplicaciones complejas con múltiples módulos",
        "Metodologías ágiles y Scrum",
        "Clean code, clean architecture y Git",
        "Se valora NgRx y Angular Material",
      ],
      offer: [
        "Proyectos nacionales e internacionales en crecimiento",
        "Jornada completa con horario híbrido y flexible",
        "Plan de desarrollo y formación",
        "Ambiente de compromiso, compañerismo y cercanía",
        "Salario según valía y bono anual por desempeño",
      ],
      link: "https://www.iconmm.com/es/jobs/frontend-developer-angular/",
    },
    {
      slug: "helpdesk",
      title: "Técnico/a de soporte técnico · HelpDesk",
      department: "Soporte 24/7",
      location: "Palencia",
      modality: "Presencial, a turnos",
      summary:
        "Atención remota a clientes, diagnóstico y resolución de incidencias y mantenimiento preventivo de la plataforma, en un equipo coordinado con cobertura 24/7.",
      functions: [
        "Responder a peticiones de clientes por canales remotos",
        "Diagnosticar y resolver incidencias",
        "Mantenimiento preventivo y correctivo programado",
        "Documentar incidencias y hacer seguimiento",
      ],
      profile: [
        "Educación Secundaria Obligatoria",
        "Nociones de redes, sistemas operativos y hardware",
        "Inglés B2 hablado y escrito",
        "Proactividad, orientación al cliente y comunicación",
        "Se valora experiencia en puestos similares",
      ],
      offer: [
        "Turnos rotativos con cobertura 24/7",
        "Día libre por tu cumpleaños",
        "Plan de desarrollo y formación constante",
        "Programas de bienestar y salud",
        "Salario según valía y bono anual por desempeño",
      ],
      link: "https://www.iconmm.com/es/jobs/asistente-de-soporte-tecnico-helpdesk/",
    },
    {
      slug: "practicas",
      title: "¿Quieres hacer prácticas con nosotros?",
      department: "Programa de prácticas",
      location: "Palencia",
      modality: "Presencial o teletrabajo",
      summary:
        "Si buscas tu primera experiencia profesional, seleccionamos a los alumnos que mejor encajan con puestos con proyección y te acompañamos para que tu formación sea lo más rápida posible.",
      functions: [],
      profile: ["Estudiantes en busca de su primera experiencia profesional", "Perfiles con proyección en IT, desarrollo o soporte"],
      offer: ["Plan de desarrollo y formación", "Ambiente de compromiso, compañerismo y cercanía", "Presencial, con teletrabajo valorable"],
      link: "https://www.iconmm.com/es/jobs/quieres-hacer-practicas-con-nosotros/",
    },
  ] satisfies Job[],
};

export const csr = {
  eyebrow: "Responsabilidad social corporativa",
  commitments: [
    {
      id: "personas",
      index: "01",
      title: "Compromiso con las personas",
      body: "Para que nuestro negocio prospere, necesitamos que nuestra gente prospere. Creemos que un entorno diverso e inclusivo en todas las capas de la organización impulsa la innovación y el compromiso. Nuestro objetivo es brindar las mejores oportunidades, atraer y retener el mejor talento y, con ello, dar un mejor servicio a nuestros clientes.",
      points: [
        "Políticas laborales basadas en la diversidad, la inclusión y la igualdad de género",
        "Flexibilidad en el lugar de trabajo",
        "Programas internos de formación y desarrollo del talento",
      ],
      stats: [
        { value: 15, label: "mujeres en el equipo" },
        { value: 22, label: "hombres en el equipo" },
      ],
      link: { label: "Ver ofertas de empleo", href: "/empleo" },
    },
    {
      id: "medioambiente",
      index: "02",
      title: "Compromiso con el medio ambiente",
      body: "Desarrollamos nuestro negocio asegurando la sostenibilidad medioambiental y mejorando nuestro desempeño ambiental de forma continua. Con la iniciativa ICON Move, un movimiento ecológico basado en el reciclaje, la protección de la naturaleza y las energías renovables, promovemos además la movilidad sostenible: todo el equipo dispone de patinetes eléctricos para sus desplazamientos urbanos.",
      points: ["Reciclaje y protección de la naturaleza", "Energías renovables", "Movilidad sostenible con ICON Move"],
      stats: [
        { value: 12, label: "patinetes eléctricos" },
        { value: 9600, label: "kWh al año de energía sostenible" },
        { value: 450, label: "km al día recorridos a pie" },
        { value: 1000, label: "kg al año de material reciclable" },
      ],
    },
    {
      id: "sociedad",
      index: "03",
      title: "Compromiso con la sociedad",
      body: "Ponemos DENEVA a disposición de nuestros clientes para difundir alertas sobre personas desaparecidas. Nuestra tecnología está al servicio de la ciudadanía para aumentar el alcance de los mensajes de búsqueda y llegar a más personas que puedan aportar pistas. Somos conscientes de que, todos juntos, tenemos la obligación de contribuir a mejorar nuestro mundo.",
      points: ["Alertas de personas desaparecidas en pantallas DENEVA", "Tecnología al servicio de la ciudadanía"],
      stats: [
        { value: 4000, label: "visualizaciones al día de alertas" },
        { value: 1100, label: "pantallas que muestran alertas" },
      ],
    },
  ],
  certifications: [
    { name: "ISO 9001", detail: "Gestión de la calidad", src: "/images/isos.png" },
    { name: "ISO 27001", detail: "Seguridad de la información", src: "/images/isos.png" },
    { name: "ENS", detail: "Esquema Nacional de Seguridad", src: "/images/ens.png" },
  ],
};

export type NewsItem = {
  date: string;
  title: string;
  excerpt?: string;
  image?: string;
  link: string;
};

export const newsAll: NewsItem[] = [
  {
    date: "19 ago 2026",
    title: "ICON Multimedia estará en InnoTrans 2026",
    excerpt:
      "Del 22 al 25 de septiembre, ICON Multimedia estará en InnoTrans 2026, en Berlín, uno de los principales encuentros internacionales para la industria del transporte y la movilidad.",
    image: "/images/news-innotrans.png",
    link: "https://www.iconmm.com/es/2026/08/19/icon-multimedia-estara-en-innotrans-2026/",
  },
  {
    date: "8 jul 2026",
    title: "DENEVA y Unilumin impulsan nuevas alianzas en México",
    excerpt:
      "DENEVA continúa reforzando su presencia internacional con acciones dirigidas a estrechar la colaboración con clientes, fabricantes e integradores en mercados estratégicos.",
    image: "/images/news-unilumin.jpg",
    link: "https://www.iconmm.com/es/2026/07/08/deneva-y-unilumin-impulsan-nuevas-alianzas-en-mexico/",
  },
  {
    date: "15 jun 2026",
    title: "ICON Multimedia impulsa junto a Siloé una nueva estación de Bosque Sonoro",
    excerpt:
      "Hemos participado en la creación de una nueva estación de Bosque Sonoro, la iniciativa impulsada por el festival Palencia Sonora, el Ayuntamiento de Palencia y ZENIT Ingeniería.",
    image: "/images/news-siloe.jpg",
    link: "https://www.iconmm.com/es/2026/06/15/icon-multimedia-impulsa-junto-a-siloe-una-nueva-estacion-de-bosque-sonoro/",
  },
  {
    date: "27 may 2026",
    title: "DENEVA impulsa la experiencia digital del Rugby Europeo en Bilbao",
    excerpt:
      "DENEVA ha participado en la activación digital del Meeting Point Local del Rugby Europeo en Bilbao, durante las finales de la EPCR Challenge Cup y la Investec Champions Cup.",
    image: "/images/news-rugby.png",
    link: "https://www.iconmm.com/es/2026/05/27/deneva-impulsa-la-experiencia-digital-del-rugby-europeo-en-bilbao/",
  },
  {
    date: "27 ene 2026",
    title: "DENEVA en ISE 2026: innovación y experiencias que marcan el futuro",
    excerpt:
      "DENEVA confirma su participación en Integrated Systems Europe (ISE) 2026, la feria internacional de referencia para el sector audiovisual.",
    image: "/images/news-ise.png",
    link: "https://www.iconmm.com/es/2026/01/27/deneva-en-ise-2026-innovacion-y-experiencias-que-marcan-el-futuro/",
  },
  {
    date: "9 ene 2026",
    title: "ICON Multimedia impulsa la innovación en ciberseguridad dentro del proyecto Red Argos (2025)",
    excerpt:
      "Hemos desarrollado el proyecto «Certificación Ciberseguridad e Instalación SIEM» en el marco de las subvenciones para proyectos empresariales que fomentan la innovación en ciberseguridad.",
    image: "/images/news-ciber.jpg",
    link: "https://www.iconmm.com/es/2026/01/09/icon-multimedia-impulsa-la-innovacion-en-ciberseguridad-dentro-del-proyecto-red-argos-2025/",
  },
  {
    date: "3 dic 2025",
    title: "DENEVA participa en Rail Live 2025 mostrando soluciones avanzadas para el sector ferroviario",
    link: "https://www.iconmm.com/es/2025/12/03/deneva-participa-en-rail-live-2025-mostrando-soluciones-avanzadas-para-el-sector-ferroviario/",
  },
  {
    date: "17 oct 2025",
    title: "Qbic y DENEVA se unen estratégicamente",
    link: "https://www.iconmm.com/es/2025/10/17/qbic-y-deneva-se-unen-estrategicamente/",
  },
  {
    date: "8 oct 2025",
    title: "DENEVA, presente en InfoComm América Latina 2025",
    link: "https://www.iconmm.com/es/2025/10/08/deneva-presente-en-infocomm-america-latina-2025/",
  },
  {
    date: "5 jun 2025",
    title: "El Alcalde de Madrid visita el lab de ICON Multimedia en la Universidad Alfonso X el Sabio",
    link: "https://www.iconmm.com/es/2025/06/05/el-alcalde-de-madrid-visita-el-lab-de-icon-multimedia-en-la-universidad-alfonso-x-el-sabio/",
  },
];

export const contact = {
  eyebrow: "Contacto",
  paths: [
    {
      id: "comercial",
      title: "Equipo comercial",
      body: "Podemos ayudarte a encontrar la solución de señalización digital que mejor se adapte a tus necesidades.",
      cta: "Quiero hablar con el equipo comercial",
      icon: "briefcase",
    },
    {
      id: "soporte",
      title: "Especialistas en servicio al cliente",
      body: "Nuestro equipo está ahí 24/7 para asegurar que tu plataforma de digital signage esté siempre operativa.",
      cta: "Quiero hablar con un experto",
      icon: "headset",
    },
  ],
  privacy:
    "ICON Multimedia, como responsable del tratamiento, tratará tus datos con la finalidad de dar respuesta a tu consulta o petición. Puedes acceder, rectificar y suprimir tus datos, así como ejercer otros derechos, consultando la información adicional sobre protección de datos en nuestra Política de Privacidad.",
  privacyUrl: "https://www.iconmm.com/gdpr/",
};
