import type { ServiceSlug } from "@/lib/constants";

export type Lang = "es" | "en";

type ServiceCopy = {
  slug: ServiceSlug;
  index: string;
  title: string;
  shortDescription: string;
  heroTagline: string;
  description: string;
  features: string[];
  deviceType: "browser" | "phone" | "pos";
};

type PagePreviewCopy = {
  index: string;
  href: string;
  title: string;
  teaser: string;
};

export type Dictionary = {
  brand: {
    name: string;
    tagline: string;
    taglineAlt: string;
  };
  nav: {
    links: { label: string; href: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    navigation: string;
    contact: string;
    location: string;
    rights: string;
  };
  home: {
    subtext: string;
    hint: string;
    exploreEyebrow: string;
  };
  pagesPreview: PagePreviewCopy[];
  nosotros: {
    eyebrow: string;
    heading: string;
    originParagraphs: string[];
    missionLabel: string;
    mission: string;
    visionLabel: string;
    vision: string;
    valuesLabel: string;
    values: { title: string; description: string }[];
    closingLine: string;
    ctaServices: string;
  };
  servicios: {
    eyebrow: string;
    heading: string;
    learnMore: string;
    servicesPrefix: string;
    needsService: (title: string) => string;
    ctaQuote: string;
    otherServices: string;
  };
  services: ServiceCopy[];
  experiencia: {
    eyebrow: string;
    heading: string;
    intro: string;
    stats: { value: number; suffix: string; label: string }[];
    capabilitiesLabel: string;
    capabilities: { title: string; description: string }[];
    commitment: string;
  };
  contacto: {
    eyebrow: string;
    heading: string;
    subtext: string;
  };
  contactForm: {
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    thanksName: (name: string) => string;
    receivedMessage: (email: string) => string;
  };
  servicePreview: {
    web: { brand: string; nav: string[]; headline: string; cta: string };
    ecommerce: { brand: string; catalog: string; newCollection: string; products: string[]; checkout: string };
    pos: {
      title: string;
      activeShift: string;
      items: string[];
      total: string;
      charge: string;
    };
  };
  orbShowcase: {
    back: string;
  };
};

const es: Dictionary = {
  brand: {
    name: "Lunexta",
    tagline: "Tomamos tus problemas. Los hacemos soluciones.",
    taglineAlt: "Tecnología con visión de negocio.",
  },
  nav: {
    links: [
      { label: "Inicio", href: "/" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Servicios", href: "/servicios" },
      { label: "Experiencia", href: "/experiencia" },
      { label: "Contacto", href: "/contacto" },
    ],
    cta: "Cotiza tu proyecto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  footer: {
    navigation: "Navegación",
    contact: "Contacto",
    location: "México",
    rights: "Todos los derechos reservados.",
  },
  home: {
    subtext:
      "Web, ecommerce, punto de venta y software a la medida — construidos para negocios que buscan crecer sin límites técnicos.",
    hint: "Haz clic en tus problemas →",
    exploreEyebrow: "Explora Lunexta",
  },
  pagesPreview: [
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
  ],
  nosotros: {
    eyebrow: "Nuestra historia",
    heading: "El nombre encierra la idea.",
    originParagraphs: [
      "Lunexta nace de la fusión entre “luz” y “siguiente” — el paso que ilumina el que sigue. No es una casualidad: encierra la razón por la que existimos. Cada negocio que atendemos está a punto de dar un paso que aún no puede ver con claridad, y nuestro trabajo es construir el sistema que lo hace visible, posible y sólido.",
      "No llegamos a este oficio por moda. Llegamos porque entendimos temprano que el software mal hecho cuesta más de lo que ahorra, y que la tecnología bien construida se vuelve invisible — deja de ser un problema y se convierte en una ventaja que ya nadie cuestiona.",
    ],
    missionLabel: "Misión",
    mission:
      "Construir el software que las empresas ambiciosas necesitan para escalar sin fricción — con la precisión de un artesano y la mirada de un estratega de negocio.",
    visionLabel: "Visión",
    vision:
      "Ser el estudio de referencia para negocios que entienden que la tecnología, bien hecha, es una ventaja competitiva silenciosa.",
    valuesLabel: "Valores",
    values: [
      {
        title: "Precisión",
        description: "Cada línea de código responde a un problema real, nunca a una moda pasajera.",
      },
      {
        title: "Confianza",
        description:
          "Construimos relaciones de largo plazo con quienes nos contratan, no proyectos de una sola entrega.",
      },
      {
        title: "Ambición serena",
        description: "Perseguimos la excelencia técnica sin necesidad de gritarla en cada frase.",
      },
      {
        title: "Criterio",
        description: "Decimos que no a lo que no sirve, incluso cuando sería más fácil decir que sí.",
      },
    ],
    closingLine: "Así pensamos. Así construimos.",
    ctaServices: "Ver nuestros servicios",
  },
  servicios: {
    eyebrow: "Servicios",
    heading: "Cuatro formas de resolver el mismo problema: hacer crecer tu negocio.",
    learnMore: "Conocer más →",
    servicesPrefix: "Servicios",
    needsService: (title) => `¿Tu negocio necesita ${title.toLowerCase()}?`,
    ctaQuote: "Cotiza tu proyecto",
    otherServices: "Otros servicios",
  },
  services: [
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
  ],
  experiencia: {
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
    capabilitiesLabel: "Capacidades",
    capabilities: [
      {
        title: "Ingeniería de producto",
        description:
          "Del primer boceto a la arquitectura final, diseñamos sistemas pensados para durar años, no sprints.",
      },
      {
        title: "Integraciones complejas",
        description: "Pagos, logística, inventario, CRMs — conectamos tu negocio sin dejar cabos sueltos.",
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
  },
  contacto: {
    eyebrow: "Contacto",
    heading: "Cuéntanos qué necesita tu negocio.",
    subtext:
      "Sin rodeos: te decimos qué construiríamos y cómo, antes de que decidas trabajar con nosotros.",
  },
  contactForm: {
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo electrónico",
    messagePlaceholder: "Cuéntanos sobre tu proyecto",
    submit: "Enviar mensaje",
    thanksName: (name) => `Gracias, ${name || "un placer conocerte"}.`,
    receivedMessage: (email) =>
      `Recibimos tu mensaje. Te contactaremos a ${email || "tu correo"} en menos de 24 horas.`,
  },
  servicePreview: {
    web: {
      brand: "Tu marca",
      nav: ["Servicios", "Nosotros", "Contacto"],
      headline: "Una presencia digital a la altura de tu marca.",
      cta: "Conoce más",
    },
    ecommerce: {
      brand: "Tu tienda",
      catalog: "Catálogo",
      newCollection: "Nueva colección",
      products: ["Producto A", "Producto B"],
      checkout: "Finalizar compra",
    },
    pos: {
      title: "Punto de venta",
      activeShift: "Turno activo",
      items: ["Artículo 1", "Artículo 2", "Artículo 3"],
      total: "Total",
      charge: "Cobrar",
    },
  },
  orbShowcase: {
    back: "← Volver",
  },
};

const en: Dictionary = {
  brand: {
    name: "Lunexta",
    tagline: "We take your problems. We turn them into solutions.",
    taglineAlt: "Technology with a business vision.",
  },
  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/nosotros" },
      { label: "Services", href: "/servicios" },
      { label: "Experience", href: "/experiencia" },
      { label: "Contact", href: "/contacto" },
    ],
    cta: "Get a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  footer: {
    navigation: "Navigation",
    contact: "Contact",
    location: "Mexico",
    rights: "All rights reserved.",
  },
  home: {
    subtext:
      "Web, ecommerce, point of sale, and custom software — built for businesses that want to grow without technical limits.",
    hint: "Click on your problems →",
    exploreEyebrow: "Explore Lunexta",
  },
  pagesPreview: [
    {
      index: "01",
      href: "/nosotros",
      title: "About",
      teaser: "The story behind the name, and the reason we exist.",
    },
    {
      index: "02",
      href: "/servicios",
      title: "Services",
      teaser: "Web, ecommerce, point of sale, and custom software.",
    },
    {
      index: "03",
      href: "/experiencia",
      title: "Experience",
      teaser: "Track record, capabilities, and a commitment to quality.",
    },
    {
      index: "04",
      href: "/contacto",
      title: "Contact",
      teaser: "Tell us what your business needs.",
    },
  ],
  nosotros: {
    eyebrow: "Our story",
    heading: "The name holds the idea.",
    originParagraphs: [
      "Lunexta comes from the fusion of “luz” (light) and “siguiente” (next) — the step that lights the one that follows. That's no coincidence: it holds the reason we exist. Every business we work with is about to take a step it can't yet see clearly, and our job is to build the system that makes it visible, possible, and solid.",
      "We didn't get into this craft because it was trendy. We got into it because we understood early on that badly built software costs more than it saves, and that well-built technology becomes invisible — it stops being a problem and becomes an advantage no one questions anymore.",
    ],
    missionLabel: "Mission",
    mission:
      "Build the software ambitious companies need to scale without friction — with the precision of a craftsman and the eye of a business strategist.",
    visionLabel: "Vision",
    vision:
      "Be the go-to studio for businesses that understand technology, done right, is a silent competitive advantage.",
    valuesLabel: "Values",
    values: [
      {
        title: "Precision",
        description: "Every line of code answers a real problem, never a passing trend.",
      },
      {
        title: "Trust",
        description: "We build long-term relationships with the people who hire us, not one-off deliveries.",
      },
      {
        title: "Quiet ambition",
        description: "We pursue technical excellence without needing to shout about it.",
      },
      {
        title: "Judgment",
        description: "We say no to what doesn't serve the work, even when it would be easier to say yes.",
      },
    ],
    closingLine: "This is how we think. This is how we build.",
    ctaServices: "See our services",
  },
  servicios: {
    eyebrow: "Services",
    heading: "Four ways to solve the same problem: growing your business.",
    learnMore: "Learn more →",
    servicesPrefix: "Services",
    needsService: (title) => `Does your business need ${title.toLowerCase()}?`,
    ctaQuote: "Get a quote",
    otherServices: "Other services",
  },
  services: [
    {
      slug: "web",
      index: "01",
      title: "Web",
      shortDescription:
        "Fast, elegant corporate and institutional sites built to convert visitors into clients.",
      heroTagline: "Your digital presence, matching your ambition.",
      description:
        "A website isn't a digital business card — it's the first impression your business makes at scale. We design and build corporate sites that communicate solidity from the first second: fast, detail-oriented, and without a single generic template involved.",
      features: [
        "Custom design, never off a template",
        "Performance and technical SEO from the ground up",
        "Purposeful animation, never decorative",
        "Integrations with the tools your business already uses",
      ],
      deviceType: "browser",
    },
    {
      slug: "ecommerce",
      index: "02",
      title: "Ecommerce",
      shortDescription:
        "Custom online stores, integrated with payments, inventory, and logistics — built to sell, not just to showcase.",
      heroTagline: "Every click, one step closer to the sale.",
      description:
        "A successful online store isn't about showing products — it's about removing every point of friction between interest and purchase. We build custom ecommerce where checkout, inventory, and logistics work as a single system, not separate pieces.",
      features: [
        "Checkout optimized for real conversion",
        "Integration with payment gateways and logistics",
        "Real-time synced inventory management",
        "Subscriptions and automated repeat purchases",
      ],
      deviceType: "phone",
    },
    {
      slug: "pos",
      index: "03",
      title: "Point of Sale",
      shortDescription:
        "Custom POS systems for physical businesses: sales, inventory, and reports in real time, from any device.",
      heroTagline: "The counter, now as smart as your business.",
      description:
        "A physical business deserves tools as precise as a digital one. We design point-of-sale systems that record every transaction, sync inventory instantly, and deliver clear reports — without relying on expensive hardware or manual processes.",
      features: [
        "Sales and inventory synced instantly",
        "Real-time reports and analytics",
        "Works on tablet, terminal, or counter",
        "Built for the real pace of your business",
      ],
      deviceType: "pos",
    },
    {
      slug: "a-medida",
      index: "04",
      title: "Custom software",
      shortDescription:
        "Internal tools and platforms built for your specific processes — without paying for features you'll never use.",
      heroTagline: "The system that adapts to you, not the other way around.",
      description:
        "When a process is unique, a generic tool is never enough. We design internal software and custom platforms that solve exactly the problem you have — not one feature more, not one limitation less.",
      features: [
        "Unique processes, solutions designed from scratch",
        "Integrations with the systems you already run",
        "Architecture built to scale from day one",
        "Ongoing technical support, not just delivery",
      ],
      deviceType: "browser",
    },
  ],
  experiencia: {
    eyebrow: "Experience",
    heading: "A track record that speaks for itself.",
    intro:
      "We don't measure our work in client logos or case studies — we measure it in how solid what we build is, and how often people come back.",
    stats: [
      { value: 8, suffix: "+", label: "years in business" },
      { value: 120, suffix: "+", label: "projects delivered" },
      { value: 30, suffix: "+", label: "industries served" },
      { value: 99, suffix: "%", label: "clients who return" },
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      {
        title: "Product engineering",
        description:
          "From the first sketch to the final architecture, we design systems built to last years, not sprints.",
      },
      {
        title: "Complex integrations",
        description: "Payments, logistics, inventory, CRMs — we connect your business without loose ends.",
      },
      {
        title: "Infrastructure and scale",
        description: "We build on foundations that support real growth, not demos that break under traffic.",
      },
      {
        title: "Design with judgment",
        description: "Every interface is designed for the user who'll actually use it, not for a portfolio.",
      },
    ],
    commitment:
      "Every project we take on carries our name. That means double-checking, questioning shortcuts, and delivering only what we'd be willing to use ourselves.",
  },
  contacto: {
    eyebrow: "Contact",
    heading: "Tell us what your business needs.",
    subtext: "No detours: we'll tell you what we'd build and how, before you decide to work with us.",
  },
  contactForm: {
    namePlaceholder: "Name",
    emailPlaceholder: "Email address",
    messagePlaceholder: "Tell us about your project",
    submit: "Send message",
    thanksName: (name) => `Thanks, ${name || "great to meet you"}.`,
    receivedMessage: (email) =>
      `We received your message. We'll reach out to ${email || "your email"} within 24 hours.`,
  },
  servicePreview: {
    web: {
      brand: "Your brand",
      nav: ["Services", "About", "Contact"],
      headline: "A digital presence that matches your brand.",
      cta: "Learn more",
    },
    ecommerce: {
      brand: "Your store",
      catalog: "Catalog",
      newCollection: "New collection",
      products: ["Product A", "Product B"],
      checkout: "Checkout",
    },
    pos: {
      title: "Point of sale",
      activeShift: "Active shift",
      items: ["Item 1", "Item 2", "Item 3"],
      total: "Total",
      charge: "Charge",
    },
  },
  orbShowcase: {
    back: "← Back",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { es, en };
