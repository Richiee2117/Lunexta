export const BRAND = {
  name: "Lunexta",
  domain: "lunextasoft.com",
  tagline: "Tomamos tus problemas. Los hacemos soluciones.",
  taglinesAlt: [
    "Tecnología con visión de negocio.",
    "Software a la medida de tu crecimiento.",
    "De la idea al sistema, sin fricción.",
  ],
};

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Experiencia", href: "/experiencia" },
  { label: "Contacto", href: "/contacto" },
];

export const PAGES_PREVIEW = [
  {
    index: "01",
    href: "/nosotros",
    title: "Nosotros",
    teaser: "La historia detrás del nombre, y la razón por la que existimos.",
  },
  {
    index: "02",
    href: "/servicios",
    title: "Servicios",
    teaser: "Web, ecommerce, punto de venta y software a la medida.",
  },
  {
    index: "03",
    href: "/experiencia",
    title: "Experiencia",
    teaser: "Trayectoria, capacidades y compromiso de calidad.",
  },
  {
    index: "04",
    href: "/contacto",
    title: "Contacto",
    teaser: "Cuéntanos qué necesita tu negocio.",
  },
];

export const CONTACT = {
  email: `contacto@${BRAND.domain}`,
  location: "México",
  altTagline: BRAND.taglinesAlt[0],
};

export const HISTORY = {
  eyebrow: "Nuestra historia",
  heading: "El nombre encierra la idea.",
  originParagraphs: [
    "Lunexta nace de la fusión entre “luz” y “siguiente” — el paso que ilumina el que sigue. No es una casualidad: encierra la razón por la que existimos. Cada negocio que atendemos está a punto de dar un paso que aún no puede ver con claridad, y nuestro trabajo es construir el sistema que lo hace visible, posible y sólido.",
    "No llegamos a este oficio por moda. Llegamos porque entendimos temprano que el software mal hecho cuesta más de lo que ahorra, y que la tecnología bien construida se vuelve invisible — deja de ser un problema y se convierte en una ventaja que ya nadie cuestiona.",
  ],
  mission:
    "Construir el software que las empresas ambiciosas necesitan para escalar sin fricción — con la precisión de un artesano y la mirada de un estratega de negocio.",
  vision:
    "Ser el estudio de referencia para negocios que entienden que la tecnología, bien hecha, es una ventaja competitiva silenciosa.",
  values: [
    {
      title: "Precisión",
      description:
        "Cada línea de código responde a un problema real, nunca a una moda pasajera.",
    },
    {
      title: "Confianza",
      description:
        "Construimos relaciones de largo plazo con quienes nos contratan, no proyectos de una sola entrega.",
    },
    {
      title: "Ambición serena",
      description:
        "Perseguimos la excelencia técnica sin necesidad de gritarla en cada frase.",
    },
    {
      title: "Criterio",
      description:
        "Decimos que no a lo que no sirve, incluso cuando sería más fácil decir que sí.",
    },
  ],
};

export type ServiceSlug = "web" | "ecommerce" | "pos" | "a-medida";

export type Service = {
  slug: ServiceSlug;
  index: string;
  title: string;
  shortDescription: string;
  heroTagline: string;
  description: string;
  features: string[];
  deviceType: "browser" | "phone" | "pos";
};

export const SERVICES: Service[] = [
  {
    slug: "web",
    index: "01",
    title: "Web",
    shortDescription:
      "Sitios corporativos e institucionales rápidos, elegantes y construidos para convertir visitantes en clientes.",
    heroTagline: "Tu presencia digital, a la altura de tu ambición.",
    description:
      "Un sitio web no es una tarjeta de presentación digital — es la primera impresión que tu negocio da a escala. Diseñamos y construimos sitios corporativos que comunican solidez desde el primer segundo: rápidos, cuidados al detalle, y sin una sola plantilla genérica de por medio.",
    features: [
      "Diseño a medida, nunca sobre plantillas",
      "Rendimiento y SEO técnico desde la base",
      "Animaciones con propósito, nunca decorativas",
      "Integraciones con las herramientas que ya usa tu negocio",
    ],
    deviceType: "browser",
  },
  {
    slug: "ecommerce",
    index: "02",
    title: "Ecommerce",
    shortDescription:
      "Tiendas en línea a medida, integradas con pagos, inventario y logística — pensadas para vender, no solo para mostrar.",
    heroTagline: "Cada clic, un paso menos hacia la venta.",
    description:
      "Una tienda en línea exitosa no se trata de mostrar productos — se trata de eliminar cada fricción entre el interés y la compra. Construimos ecommerce a medida donde el checkout, el inventario y la logística funcionan como un solo sistema, no como piezas sueltas.",
    features: [
      "Checkout optimizado para conversión real",
      "Integración con pasarelas de pago y logística",
      "Gestión de inventario sincronizada en tiempo real",
      "Suscripciones y recompra automatizada",
    ],
    deviceType: "phone",
  },
  {
    slug: "pos",
    index: "03",
    title: "Punto de Venta",
    shortDescription:
      "Sistemas POS a medida para negocios físicos: ventas, inventario y reportes en tiempo real, desde cualquier dispositivo.",
    heroTagline: "El mostrador, ahora tan inteligente como tu negocio.",
    description:
      "Un negocio físico merece herramientas tan precisas como uno digital. Diseñamos sistemas de punto de venta que registran cada transacción, sincronizan el inventario al instante y entregan reportes claros — sin depender de hardware costoso ni procesos manuales.",
    features: [
      "Ventas e inventario sincronizados al instante",
      "Reportes y analítica en tiempo real",
      "Funciona en tablet, terminal o mostrador",
      "Pensado para el ritmo real de tu negocio",
    ],
    deviceType: "pos",
  },
  {
    slug: "a-medida",
    index: "04",
    title: "Software a medida",
    shortDescription:
      "Herramientas internas y plataformas hechas para tus procesos específicos — sin pagar por funciones que nunca usarás.",
    heroTagline: "El sistema que se adapta a ti, no al revés.",
    description:
      "Cuando un proceso es único, una herramienta genérica nunca es suficiente. Diseñamos software interno y plataformas a medida que resuelven exactamente el problema que tienes — ni una función de más, ni una limitación de menos.",
    features: [
      "Procesos únicos, soluciones diseñadas desde cero",
      "Integraciones con los sistemas que ya operas",
      "Arquitectura pensada para escalar desde el primer día",
      "Acompañamiento técnico continuo, no solo entrega",
    ],
    deviceType: "browser",
  },
];

export const EXPERIENCE = {
  eyebrow: "Experiencia",
  heading: "Trayectoria que se nota sin necesidad de mostrarla.",
  intro:
    "No medimos nuestro trabajo en logos de clientes ni casos de estudio — lo medimos en la solidez de lo que construimos y en cuántas veces vuelven a buscarnos.",
  stats: [
    { value: 8, suffix: "+", label: "años de trayectoria" },
    { value: 120, suffix: "+", label: "proyectos entregados" },
    { value: 30, suffix: "+", label: "industrias atendidas" },
    { value: 99, suffix: "%", label: "clientes que vuelven" },
  ],
  capabilities: [
    {
      title: "Ingeniería de producto",
      description:
        "Del primer boceto a la arquitectura final, diseñamos sistemas pensados para durar años, no sprints.",
    },
    {
      title: "Integraciones complejas",
      description:
        "Pagos, logística, inventario, CRMs — conectamos tu negocio sin dejar cabos sueltos.",
    },
    {
      title: "Infraestructura y escala",
      description:
        "Construimos sobre bases que soportan crecimiento real, no demos que se rompen con tráfico.",
    },
    {
      title: "Diseño con criterio",
      description:
        "Cada interfaz se diseña para el usuario que realmente la va a usar, no para un portafolio.",
    },
  ],
  commitment:
    "Cada proyecto que aceptamos lleva nuestro nombre puesto. Eso significa revisar dos veces, cuestionar los atajos, y entregar solo lo que estaríamos dispuestos a usar nosotros mismos.",
};
