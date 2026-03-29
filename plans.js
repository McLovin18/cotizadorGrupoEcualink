// Archivo central de datos de planes y extras
// Modifica aquí cuando necesites cambiar precios, nombres o agregar servicios.

const webPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 399,
    days: '2-7 días hábiles',
    shortDesc: 'Para validar ideas y tener presencia inmediata',
    tagline: 'Simple y Rápido',
    desc: 'Landing Page de 1 página • Diseño responsive estándar (plantilla personalizada)',
    features: [
      'Landing Page de 1 página',
      'Diseño responsive estándar (plantilla personalizada)',
      '1 formulario o WhatsApp',
      'SEO básico (títulos/meta)',
      '1 ronda de revisión',
      'Entrega: 2–7 días hábiles'
    ],
    idealFor: ['MVPs', 'Emprendedores', 'Negocios que necesitan algo rápido', 'Sin blog, sin e-commerce']
  },
  {
    id: 'business',
    name: 'Business',
    price: 499,
    days: '7-14 días hábiles',
    shortDesc: 'Sitio institucional de varias páginas para crecer profesionalmente',
    tagline: 'Profesional y flexible',
    desc: 'Sitio de 3-6 páginas • Diseño a medida • Formularios y mapa',
    features: [
      '3-6 páginas (Inicio, Servicios, Nosotros, Contacto)',
      'Diseño a medida responsive',
      'Formularios / integración WhatsApp',
      'SEO inicial (títulos, meta, sitemap)',
      '1 integración básica (Google Maps, Analytics)',
      '2 rondas de revisión'
    ],
    idealFor: ['Pequeñas empresas', 'Profesionales', 'Portafolios con contacto activo']
  },
  {
    id: 'pro',
    name: 'Pro Plus',
    price: 999,
    days: '14-30 días hábiles',
    shortDesc: 'Paquete completo para marcas y tiendas en línea. WordPress o Shopify.',
    tagline: 'Completo y escalable',
    desc: 'Tienda o sitio corporativo • Integraciones • Soporte',
    features: [
      'Tienda básica o sitio complejo',
      'Integraciones de pago y pasarelas',
      'Soporte premium y SLA',
      'Optimización de rendimiento',
      'SEO avanzado',
      '3 rondas de revisión'
    ],
    idealFor: ['Marcas', 'E-commerce pequeño', 'Proyectos con crecimiento planificado']
  },
];

const services = [
  // SEO
  { id: 'seo-10',  name: 'SEO 10 Keywords',  price: 399,  type: 'monthly' },
  { id: 'seo-20',  name: 'SEO 20 Keywords',  price: 499,  type: 'monthly' },
  { id: 'seo-100', name: 'SEO 100 Keywords', price: 999,  type: 'monthly' },
  { id: 'seo-250', name: 'SEO 250 Keywords', price: 1499, type: 'monthly' },
  // Mantenimiento
  { id: 'mant-starter',  name: 'Mantenimiento Plan Starter',   price: 150, type: 'monthly' },
  { id: 'mant-business', name: 'Mantenimiento Plan Business',  price: 250, type: 'monthly' },
  { id: 'mant-pro',      name: 'Mantenimiento Plan Pro Plus',  price: 500, type: 'monthly' },
  // Dominios
  { id: 'dominio-com', name: 'Dominio .com', price: 20, type: 'one-time' },
  { id: 'dominio-ec',  name: 'Dominio .ec',  price: 40, type: 'one-time' },
];

// Opciones de urgencia: multiplier aplicado al precio del plan (porcentaje)
const urgencies = [
  { id: 'standard', name: 'Estándar', label: '5-10 días hábiles', mult: 0, desc: 'Sin cargo adicional' },
  { id: 'rapido', name: 'Rápido', label: '4-6 días hábiles', mult: 0.15, desc: 'Recargo +15%' },
  { id: 'express', name: 'Express', label: '2-3 días hábiles', mult: 0.35, desc: 'Recargo +35%' }
];
