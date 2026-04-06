export type Language = "en" | "es";

export const translations = {
  en: {
    nav: {
      howItWorks: "How It Works",
      medications: "Medications",
      pricing: "Pricing",
      physicianLogin: "Physician Login",
      getStarted: "Get Started",
      getStartedFull: "Get Started — Free Consultation",
      langLabel: "EN",
    },
    hero: {
      badge: "Prescription Sleep Medicine",
      headline1: "Sleep Medicine,",
      headline2: "Delivered to",
      headline3: "Your Door.",
      tagline: "Stop trying to sleep. Start treating it.",
      description:
        "Tap start. Answer in 1 minute. A licensed doctor reviews and prescribes. Medication arrives in 24 hours.",
      steps: [
        "1) Start intake",
        "2) Answer by voice",
        "3) Licensed doctor Rx",
        "4) 24h delivery",
      ],
      cta: "Get Your Prescription — Free Consult",
      seeHow: "See how it works ↓",
      trustStats: [
        { value: "12,400+", label: "patients" },
        { value: "4.9/5", label: "rating" },
        { value: "< 24hr", label: "delivery" },
        { value: "Non-addictive", label: "only" },
      ],
      physicianLed: "Physician-led",
      fromVoice: "From your voice to care",
      autoDemo: "Auto demo running",
      liveFlow: "Live flow",
      step: "Step",
      whySomnaFlow: "Why SomnaFlow",
      comparisonTitle: "Stop settling for another sleepless night.",
      comparisonSubtitleHighlight: "Doctor + prescription care, fast.",
      oldWay: "The old way",
      somnaFlowWay: "The SomnaFlow way",
      ctaComparison: "Get Started — Free Consultation",
      before: [
        "Sleep clinic waitlists (months)",
        "Sleep studies: $2k–$4k out-of-pocket",
        "Grogginess + dependency risk",
        "Supplements that miss the root cause",
      ],
      after: [
        "Board-certified consult from home (5 min)",
        "Clinical brief from your transcription",
        "Non-addictive sleep care — no dependency risk",
        "Discreet delivery to your doorstep (tomorrow)",
      ],
      systemSteps: [
        {
          kicker: "1 MIN",
          title: "Answer",
          desc: "Speak once. We transcribe instantly.",
        },
        {
          kicker: "CLINICAL BRIEF",
          title: "Clinical brief",
          desc: "Your doctor gets summary-ready notes.",
        },
        {
          kicker: "IN 5 MIN",
          title: "Physician consult",
          desc: "Board-certified next steps in minutes.",
        },
        {
          kicker: "DISCREET DELIVERY",
          title: "Medication arrives",
          desc: "Discreetly shipped to your door.",
        },
      ],
    },
    howItWorks: {
      sectionLabel: "How It Works",
      title: "From consultation to bedside —",
      titleHighlight: "in 24 hours",
      subtitle: "1 minute intake. Licensed doctor review. Delivery by tomorrow.",
      cta: "Start Free Consultation",
      finePrint: "No credit card required · Cancel anytime",
      steps: [
        {
          step: "01",
          title: "1-minute intake",
          subtitle: "1 min",
          description:
            "Answer by voice or text. We generate a clinical summary instantly.",
          details: ["Voice or text", "HIPAA-encrypted"],
        },
        {
          step: "02",
          title: "Licensed doctor review",
          subtitle: "Under 2 hrs",
          description:
            "A licensed physician in your state reviews and prescribes the right medication.",
          details: ["State-licensed physician", "Digitally signed Rx"],
        },
        {
          step: "03",
          title: "24-hour delivery",
          subtitle: "By tomorrow",
          description:
            "Prescription ships fast in discreet packaging from a licensed pharmacy.",
          details: ["FedEx Priority Overnight", "Live tracking"],
        },
      ],
    },
    medications: {
      sectionLabel: "Our Medications",
      title: "No dependency. No grogginess.",
      titleHighlight: "Just sleep.",
      subtitle:
        "We only prescribe non-addictive, modern sleep medications. No Ambien. No benzodiazepines. Ever.",
      cta: "Get Your Prescription — Start Tonight",
      physicianNote:
        "Your physician selects the right formula based on your sleep profile. No guessing.",
      items: [
        {
          id: "s1",
          name: "Formula S1",
          dose: "Ramelteon 8mg",
          tag: "Best for: Trouble falling asleep",
          mechanism:
            "Melatonin receptor agonist — resets your circadian rhythm without sedation.",
          badges: ["Non-Addictive", "No Grogginess", "Circadian Support"],
          benefits: [
            "Non-addictive — no dependency risk",
            "No next-day grogginess",
            "Safe for long-term use",
            "Works with your body's natural clock",
          ],
        },
        {
          id: "d1",
          name: "Formula D1",
          dose: "Daridorexant 25mg",
          tag: "Best for: Waking up at night",
          mechanism:
            "Dual orexin receptor antagonist — blocks the wakefulness signal so you stay asleep.",
          badges: ["Non-Addictive", "Overnight Delivery", "Stay Asleep"],
          benefits: [
            "Non-addictive — no controlled substance",
            "Zero morning hangover effect",
            "FDA-approved in 2023",
            "Targets root cause, not symptoms",
          ],
        },
      ],
    },
    pricing: {
      sectionLabel: "Pricing",
      title: "The smart choice is",
      titleHighlight: "obvious",
      subtitle: "Compare your options. The math speaks for itself.",
      finePrint: "Cancel anytime. No contracts. First consultation is free.",
      options: [
        {
          name: "Typical Sleep Clinic",
          price: "$3,000+",
          period: "per course",
          description: "Traditional in-person sleep medicine",
          tag: null,
          cta: null,
          features: [
            { text: "3–6 month wait for appointment", included: false },
            { text: "In-person only", included: false },
            { text: "Insurance nightmare", included: false },
            { text: "Generic one-size treatment", included: false },
            { text: "No ongoing support", included: false },
            { text: "Expensive out-of-pocket", included: false },
          ],
        },
        {
          name: "Generic Supplements",
          price: "$30",
          period: "per month",
          description: "Melatonin gummies, OTC sleep aids",
          tag: "Doesn't Work",
          cta: null,
          features: [
            { text: "No clinical evidence", included: false },
            { text: "Builds tolerance quickly", included: false },
            { text: "Doesn't fix root cause", included: false },
            { text: "Morning grogginess", included: false },
            { text: "No physician oversight", included: false },
            { text: "Hit-or-miss results", included: false },
          ],
        },
        {
          name: "SomnaFlow",
          price: "$79",
          period: "per month",
          description: "Everything included — start tonight",
          tag: "Best Value",
          cta: "Start for $79/mo",
          features: [
            { text: "AI consultation in 5 minutes", included: true },
            { text: "Licensed physician review", included: true },
            { text: "Custom prescription Rx", included: true },
            { text: "Delivered to your door", included: true },
            { text: "Ongoing physician access", included: true },
            { text: "No dependency formulas", included: true },
          ],
        },
      ],
    },
    testimonials: {
      sectionLabel: "Patient Stories",
      title: "Real people, real results",
      verifiedReviews: "from 2,847 verified reviews",
      items: [
        {
          name: "Marcus T.",
          title: "Software Engineer",
          avatar: "MT",
          rating: 5,
          text: "After 4 years of terrible sleep and $800 in OTC supplements, SomnaFlow had me sleeping through the night in the first week. The doctor call took 10 minutes and the prescription arrived next morning.",
          medication: "Formula D1",
          time: "3 months ago",
          highlight: "sleeping through the night in the first week",
        },
        {
          name: "Jennifer K.",
          title: "Healthcare Administrator",
          avatar: "JK",
          rating: 5,
          text: "I was skeptical about online sleep medicine. But the doctor was thorough, asked the right questions, and prescribed something that actually targets the root cause. No more 3am wake-ups.",
          medication: "Formula S1",
          time: "6 weeks ago",
          highlight: "No more 3am wake-ups",
        },
        {
          name: "David R.",
          title: "Executive, Finance",
          avatar: "DR",
          rating: 5,
          text: "My sleep clinic appointment was 6 months away. SomnaFlow had me consulting with a physician the same day I signed up. Performance at work has never been better since fixing my sleep.",
          medication: "Formula D1",
          time: "2 months ago",
          highlight: "consulting with a physician the same day",
        },
        {
          name: "Priya M.",
          title: "Nurse Practitioner",
          avatar: "PM",
          rating: 5,
          text: "As a healthcare professional, I was initially skeptical. But the clinical rigor here is impressive — real physicians, real medications, real protocols. And actually more convenient than what I prescribe at work.",
          medication: "Formula S1",
          time: "1 month ago",
          highlight: "clinical rigor here is impressive",
        },
        {
          name: "Carlos E.",
          title: "College Professor",
          avatar: "CE",
          rating: 5,
          text: "What I love most is zero morning grogginess. I tried everything — Ambien left me like a zombie, melatonin did nothing. Formula D1 is genuinely different. I wake up refreshed and sharp.",
          medication: "Formula D1",
          time: "5 weeks ago",
          highlight: "zero morning grogginess",
        },
        {
          name: "Sarah L.",
          title: "Entrepreneur",
          avatar: "SL",
          rating: 5,
          text: "The AI intake questionnaire surfaced patterns I never noticed myself. The doctor explained that I had delayed sleep phase disorder, not just insomnia. Finally a diagnosis after years of confusion.",
          medication: "Formula S1",
          time: "8 weeks ago",
          highlight: "Finally a diagnosis after years",
        },
      ],
    },
    trust: {
      sectionLabel: "Trust & Safety",
      title: "Medical-grade care,",
      titleHighlight: "zero compromise",
      subtitle:
        "We hold ourselves to the highest clinical standards because your health depends on it.",
      bigBadges: [
        {
          title: "FDA-Regulated Pharmacy",
          desc: "All compounds sourced from FDA-registered pharmacies with strict quality controls and third-party testing.",
        },
        {
          title: "Licensed US Physicians",
          desc: "Board-certified sleep medicine specialists. Real doctors, real licenses — verified in all 50 states.",
        },
        {
          title: "HIPAA Secure",
          desc: "Military-grade 256-bit encryption on all data. Your medical information stays 100% private.",
        },
      ],
      smallBadges: [
        "BBB Accredited",
        "HIPAA Compliant",
        "50-State Licensed",
        "SOC 2 Type II",
      ],
      finalTitle: "Your best night's sleep",
      finalTitle2: "starts tonight.",
      finalDesc:
        "Join 12,400+ patients who stopped settling for bad sleep. No waiting rooms. No insurance hassle. Just results.",
      finalCta: "Start Your Free Consultation",
      finalNote: "No credit card required to start",
    },
    footer: {
      description:
        "Professional sleep medicine, delivered to your doorstep. Fix your sleep tonight — not in 15 months.",
      groups: {
        Platform: "Platform",
        Company: "Company",
        Support: "Support",
      },
      links: {
        Platform: [
          { label: "How It Works", href: "#how-it-works" },
          { label: "Medications", href: "#medications" },
          { label: "Pricing", href: "#pricing" },
          { label: "Track Your Rx", href: "/tracking" },
        ],
        Company: [
          { label: "About Us", href: "#" },
          { label: "Our Physicians", href: "#" },
          { label: "Science & Research", href: "#" },
          { label: "Press", href: "#" },
        ],
        Support: [
          { label: "Help Center", href: "#" },
          { label: "Contact Us", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      },
      complianceBadges: [
        "256-bit SSL Encryption",
        "50-State Licensed",
        "HIPAA Compliant",
        "SOC 2 Type II",
      ],
      medicalDisclaimerLabel: "Medical Disclaimer:",
      medicalDisclaimerText:
        "SomnaFlow is a telehealth platform that connects patients with independent, licensed physicians. Physicians exercise independent medical judgment. SomnaFlow does not practice medicine. Not for emergency use — if you are experiencing a medical emergency, call 911.",
      controlledLabel: "Controlled Substances:",
      controlledText:
        "Controlled substances (Schedule II–V) are not prescribed through SomnaFlow. All medications prescribed are non-controlled. Individual results may vary.",
      copyright: "© 2026 SomnaFlow, Inc. All rights reserved.",
      availability:
        "Available in all 50 states · Physicians licensed in your state",
    },
    intake: {
      title: "Your Sleep Consultation",
      description:
        "Answer 4 quick questions. Our AI analyzes your sleep profile and generates a clinical summary for your physician.",
      stats: [
        { value: "2 min", label: "To complete" },
        { value: "100%", label: "Confidential" },
        { value: "Free", label: "No obligation" },
      ],
      preferText: "Prefer text?",
      preferTextLink: "Use text questions instead",
      generating: "Generating your clinical summary...",
      analyzingPoints: "AI analyzing 47 data points",
      clinicalSummaryReady: "Clinical Summary Ready",
      yourSleepProfile: "Your Sleep Profile",
      aiRecommendation: "AI Recommendation",
      match: "match",
      keyInsights: "Key Insights",
      sleepProfile: "Sleep Profile:",
      connectPhysician: "Connect with a Licensed Physician",
      viewDashboard: "View Physician Dashboard →",
      stepLabels: [
        "Welcome",
        "Sleep Onset",
        "Supplements",
        "Mornings",
        "Dependency",
        "Results",
      ],
      qaFlow: [
        {
          question:
            "How long does it typically take you to fall asleep after getting into bed?",
          options: [
            "Less than 15 min",
            "15–30 min",
            "30–60 min",
            "More than 1 hour",
          ],
        },
        {
          question:
            "Have you tried melatonin or other sleep supplements before?",
          options: [
            "Never tried",
            "Tried, didn't work",
            "Tried, helped a little",
            "Still using them",
          ],
        },
        {
          question:
            'Do you experience grogginess or "brain fog" the morning after?',
          options: [
            "Never",
            "Occasionally",
            "Most mornings",
            "Every single morning",
          ],
        },
        {
          question:
            "Are you concerned about dependency or addiction to sleep medication?",
          options: [
            "Not at all",
            "Somewhat concerned",
            "Very concerned",
            "That's my #1 concern",
          ],
        },
      ],
    },
  },

  es: {
    nav: {
      howItWorks: "Cómo Funciona",
      medications: "Medicamentos",
      pricing: "Precios",
      physicianLogin: "Acceso Médico",
      getStarted: "Comenzar",
      getStartedFull: "Comenzar — Consulta Gratuita",
      langLabel: "ES",
    },
    hero: {
      badge: "Medicina del Sueño con Receta",
      headline1: "Medicina del Sueño,",
      headline2: "Entregada en",
      headline3: "Tu Puerta.",
      tagline: "Deja de intentar dormir. Comienza a tratarlo.",
      description:
        "Presiona inicio. Responde en 1 minuto. Un médico licenciado revisa y receta. El medicamento llega en 24 horas.",
      steps: [
        "1) Inicia",
        "2) Responde por voz",
        "3) Receta médica",
        "4) Entrega en 24h",
      ],
      cta: "Obtén Tu Receta — Consulta Gratis",
      seeHow: "Ver cómo funciona ↓",
      trustStats: [
        { value: "12,400+", label: "pacientes" },
        { value: "4.9/5", label: "calificación" },
        { value: "< 24hr", label: "entrega" },
        { value: "Sin adicción", label: "solo" },
      ],
      physicianLed: "Liderado por médicos",
      fromVoice: "De tu voz a la atención",
      autoDemo: "Demo automático",
      liveFlow: "Flujo en vivo",
      step: "Paso",
      whySomnaFlow: "Por qué SomnaFlow",
      comparisonTitle: "Deja de conformarte con otra noche sin dormir.",
      comparisonSubtitleHighlight: "Médico + receta, rápido.",
      oldWay: "La forma antigua",
      somnaFlowWay: "El método SomnaFlow",
      ctaComparison: "Comenzar — Consulta Gratuita",
      before: [
        "Listas de espera en clínicas del sueño (meses)",
        "Estudios del sueño: $2k–$4k de bolsillo",
        "Somnolencia + riesgo de dependencia",
        "Suplementos que no atacan la causa raíz",
      ],
      after: [
        "Consulta certificada desde casa (5 min)",
        "Resumen clínico de tu transcripción",
        "Cuidado del sueño sin adicción — sin riesgo de dependencia",
        "Entrega discreta a tu puerta (mañana)",
      ],
      systemSteps: [
        {
          kicker: "1 MIN",
          title: "Responde",
          desc: "Habla una vez. Transcribimos al instante.",
        },
        {
          kicker: "RESUMEN CLÍNICO",
          title: "Resumen clínico",
          desc: "Tu médico recibe notas listas.",
        },
        {
          kicker: "EN 5 MIN",
          title: "Consulta médica",
          desc: "Próximos pasos certificados en minutos.",
        },
        {
          kicker: "ENTREGA DISCRETA",
          title: "Medicamento llega",
          desc: "Enviado discretamente a tu puerta.",
        },
      ],
    },
    howItWorks: {
      sectionLabel: "Cómo Funciona",
      title: "De la consulta al dormitorio —",
      titleHighlight: "en 24 horas",
      subtitle:
        "1 minuto de intake. Revisión médica licenciada. Entrega mañana.",
      cta: "Comenzar Consulta Gratuita",
      finePrint: "Sin tarjeta de crédito · Cancela cuando quieras",
      steps: [
        {
          step: "01",
          title: "Intake de 1 minuto",
          subtitle: "1 min",
          description:
            "Responde por voz o texto. Generamos un resumen clínico al instante.",
          details: ["Voz o texto", "Cifrado HIPAA"],
        },
        {
          step: "02",
          title: "Revisión médica licenciada",
          subtitle: "Menos de 2 hrs",
          description:
            "Un médico licenciado en tu estado revisa y receta el medicamento correcto.",
          details: ["Médico con licencia estatal", "Rx firmada digitalmente"],
        },
        {
          step: "03",
          title: "Entrega en 24 horas",
          subtitle: "Mañana",
          description:
            "La receta se envía rápidamente en empaque discreto desde una farmacia licenciada.",
          details: ["FedEx Prioridad Noche", "Seguimiento en vivo"],
        },
      ],
    },
    medications: {
      sectionLabel: "Nuestros Medicamentos",
      title: "Sin dependencia. Sin somnolencia.",
      titleHighlight: "Solo sueño.",
      subtitle:
        "Solo recetamos medicamentos para el sueño modernos y no adictivos. Sin Ambien. Sin benzodiacepinas. Jamás.",
      cta: "Obtén Tu Receta — Comienza Esta Noche",
      physicianNote:
        "Tu médico selecciona la fórmula correcta según tu perfil de sueño. Sin adivinanzas.",
      items: [
        {
          id: "s1",
          name: "Fórmula S1",
          dose: "Ramelteon 8mg",
          tag: "Ideal para: Dificultad para dormirse",
          mechanism:
            "Agonista del receptor de melatonina — restablece tu ritmo circadiano sin sedación.",
          badges: ["No Adictivo", "Sin Somnolencia", "Soporte Circadiano"],
          benefits: [
            "No adictivo — sin riesgo de dependencia",
            "Sin somnolencia al día siguiente",
            "Seguro para uso a largo plazo",
            "Trabaja con el reloj natural de tu cuerpo",
          ],
        },
        {
          id: "d1",
          name: "Fórmula D1",
          dose: "Daridorexant 25mg",
          tag: "Ideal para: Despertar de noche",
          mechanism:
            "Antagonista dual del receptor de orexina — bloquea la señal de vigilia para que permanezcas dormido.",
          badges: ["No Adictivo", "Entrega Nocturna", "Permanecer Dormido"],
          benefits: [
            "No adictivo — no es sustancia controlada",
            "Cero efecto de resaca matutina",
            "Aprobado por la FDA en 2023",
            "Ataca la causa raíz, no los síntomas",
          ],
        },
      ],
    },
    pricing: {
      sectionLabel: "Precios",
      title: "La elección inteligente es",
      titleHighlight: "obvia",
      subtitle: "Compara tus opciones. Los números hablan solos.",
      finePrint:
        "Cancela cuando quieras. Sin contratos. Primera consulta gratuita.",
      options: [
        {
          name: "Clínica de Sueño Típica",
          price: "$3,000+",
          period: "por tratamiento",
          description: "Medicina del sueño presencial tradicional",
          tag: null,
          cta: null,
          features: [
            { text: "3–6 meses de espera para cita", included: false },
            { text: "Solo presencial", included: false },
            { text: "Pesadilla con el seguro", included: false },
            { text: "Tratamiento genérico", included: false },
            { text: "Sin apoyo continuo", included: false },
            { text: "Caro de bolsillo", included: false },
          ],
        },
        {
          name: "Suplementos Genéricos",
          price: "$30",
          period: "por mes",
          description: "Gummies de melatonina, ayudas sin receta",
          tag: "No Funciona",
          cta: null,
          features: [
            { text: "Sin evidencia clínica", included: false },
            { text: "Genera tolerancia rápidamente", included: false },
            { text: "No resuelve la causa raíz", included: false },
            { text: "Somnolencia matutina", included: false },
            { text: "Sin supervisión médica", included: false },
            { text: "Resultados impredecibles", included: false },
          ],
        },
        {
          name: "SomnaFlow",
          price: "$79",
          period: "por mes",
          description: "Todo incluido — comienza esta noche",
          tag: "Mejor Valor",
          cta: "Comenzar por $79/mes",
          features: [
            { text: "Consulta AI en 5 minutos", included: true },
            { text: "Revisión médica licenciada", included: true },
            { text: "Receta personalizada", included: true },
            { text: "Entregado a tu puerta", included: true },
            { text: "Acceso continuo a médicos", included: true },
            { text: "Fórmulas sin dependencia", included: true },
          ],
        },
      ],
    },
    testimonials: {
      sectionLabel: "Historias de Pacientes",
      title: "Personas reales, resultados reales",
      verifiedReviews: "de 2,847 reseñas verificadas",
      items: [
        {
          name: "Marcus T.",
          title: "Ingeniero de Software",
          avatar: "MT",
          rating: 5,
          text: "Después de 4 años de mal sueño y $800 en suplementos sin receta, SomnaFlow me hizo dormir toda la noche en la primera semana. La llamada con el médico tomó 10 minutos y la receta llegó a la mañana siguiente.",
          medication: "Fórmula D1",
          time: "hace 3 meses",
          highlight: "dormir toda la noche en la primera semana",
        },
        {
          name: "Jennifer K.",
          title: "Administradora de Salud",
          avatar: "JK",
          rating: 5,
          text: "Era escéptica sobre la medicina del sueño en línea. Pero el médico fue exhaustivo, hizo las preguntas correctas y recetó algo que realmente ataca la causa raíz. No más despertares a las 3am.",
          medication: "Fórmula S1",
          time: "hace 6 semanas",
          highlight: "No más despertares a las 3am",
        },
        {
          name: "David R.",
          title: "Ejecutivo, Finanzas",
          avatar: "DR",
          rating: 5,
          text: "Mi cita en la clínica del sueño estaba a 6 meses. SomnaFlow me permitió consultar con un médico el mismo día que me registré. Mi rendimiento en el trabajo nunca ha sido mejor desde que solucioné mi sueño.",
          medication: "Fórmula D1",
          time: "hace 2 meses",
          highlight: "consultar con un médico el mismo día",
        },
        {
          name: "Priya M.",
          title: "Enfermera Practicante",
          avatar: "PM",
          rating: 5,
          text: "Como profesional de la salud, inicialmente era escéptica. Pero el rigor clínico aquí es impresionante — médicos reales, medicamentos reales, protocolos reales. Y en realidad más conveniente que lo que yo receto en el trabajo.",
          medication: "Fórmula S1",
          time: "hace 1 mes",
          highlight: "el rigor clínico aquí es impresionante",
        },
        {
          name: "Carlos E.",
          title: "Profesor Universitario",
          avatar: "CE",
          rating: 5,
          text: "Lo que más me encanta es cero somnolencia matutina. Probé todo — Ambien me dejaba como zombie, la melatonina no hacía nada. La Fórmula D1 es genuinamente diferente. Me despierto descansado y alerta.",
          medication: "Fórmula D1",
          time: "hace 5 semanas",
          highlight: "cero somnolencia matutina",
        },
        {
          name: "Sarah L.",
          title: "Emprendedora",
          avatar: "SL",
          rating: 5,
          text: "El cuestionario de intake de IA reveló patrones que yo nunca había notado. El médico explicó que tenía trastorno de fase de sueño retrasada, no solo insomnio. Finalmente un diagnóstico después de años de confusión.",
          medication: "Fórmula S1",
          time: "hace 8 semanas",
          highlight: "Finalmente un diagnóstico después de años",
        },
      ],
    },
    trust: {
      sectionLabel: "Confianza y Seguridad",
      title: "Cuidado de grado médico,",
      titleHighlight: "cero compromiso",
      subtitle:
        "Nos mantenemos en los más altos estándares clínicos porque tu salud depende de ello.",
      bigBadges: [
        {
          title: "Farmacia Regulada por la FDA",
          desc: "Todos los compuestos provienen de farmacias registradas en la FDA con estrictos controles de calidad y pruebas de terceros.",
        },
        {
          title: "Médicos Estadounidenses Licenciados",
          desc: "Especialistas en medicina del sueño certificados. Médicos reales, licencias reales — verificadas en los 50 estados.",
        },
        {
          title: "Seguro HIPAA",
          desc: "Cifrado militar de 256 bits en todos los datos. Tu información médica permanece 100% privada.",
        },
      ],
      smallBadges: [
        "Acreditado BBB",
        "Cumple HIPAA",
        "Licenciado en 50 Estados",
        "SOC 2 Tipo II",
      ],
      finalTitle: "Tu mejor noche de sueño",
      finalTitle2: "comienza esta noche.",
      finalDesc:
        "Únete a más de 12,400 pacientes que dejaron de conformarse con el mal sueño. Sin salas de espera. Sin líos con el seguro. Solo resultados.",
      finalCta: "Inicia Tu Consulta Gratuita",
      finalNote: "No se requiere tarjeta de crédito para comenzar",
    },
    footer: {
      description:
        "Medicina del sueño profesional, entregada a tu puerta. Soluciona tu sueño esta noche — no en 15 meses.",
      groups: {
        Platform: "Plataforma",
        Company: "Empresa",
        Support: "Soporte",
      },
      links: {
        Platform: [
          { label: "Cómo Funciona", href: "#how-it-works" },
          { label: "Medicamentos", href: "#medications" },
          { label: "Precios", href: "#pricing" },
          { label: "Rastrear Tu Rx", href: "/tracking" },
        ],
        Company: [
          { label: "Sobre Nosotros", href: "#" },
          { label: "Nuestros Médicos", href: "#" },
          { label: "Ciencia e Investigación", href: "#" },
          { label: "Prensa", href: "#" },
        ],
        Support: [
          { label: "Centro de Ayuda", href: "#" },
          { label: "Contáctanos", href: "#" },
          { label: "Política de Privacidad", href: "#" },
          { label: "Términos de Servicio", href: "#" },
        ],
      },
      complianceBadges: [
        "Cifrado SSL 256 bits",
        "Licenciado en 50 Estados",
        "Cumple HIPAA",
        "SOC 2 Tipo II",
      ],
      medicalDisclaimerLabel: "Aviso Médico:",
      medicalDisclaimerText:
        "SomnaFlow es una plataforma de telesalud que conecta pacientes con médicos independientes y licenciados. Los médicos ejercen juicio médico independiente. SomnaFlow no practica medicina. No para uso de emergencia — si estás experimentando una emergencia médica, llama al 911.",
      controlledLabel: "Sustancias Controladas:",
      controlledText:
        "Las sustancias controladas (Programas II–V) no se recetan a través de SomnaFlow. Todos los medicamentos recetados no son controlados. Los resultados individuales pueden variar.",
      copyright: "© 2026 SomnaFlow, Inc. Todos los derechos reservados.",
      availability:
        "Disponible en los 50 estados · Médicos licenciados en tu estado",
    },
    intake: {
      title: "Tu Consulta de Sueño",
      description:
        "Responde 4 preguntas rápidas. Nuestra IA analiza tu perfil de sueño y genera un resumen clínico para tu médico.",
      stats: [
        { value: "2 min", label: "Para completar" },
        { value: "100%", label: "Confidencial" },
        { value: "Gratis", label: "Sin compromiso" },
      ],
      preferText: "¿Prefieres texto?",
      preferTextLink: "Usa preguntas de texto en su lugar",
      generating: "Generando tu resumen clínico...",
      analyzingPoints: "IA analizando 47 puntos de datos",
      clinicalSummaryReady: "Resumen Clínico Listo",
      yourSleepProfile: "Tu Perfil de Sueño",
      aiRecommendation: "Recomendación de IA",
      match: "coincidencia",
      keyInsights: "Perspectivas Clave",
      sleepProfile: "Perfil de Sueño:",
      connectPhysician: "Conectar con un Médico Licenciado",
      viewDashboard: "Ver Panel del Médico →",
      stepLabels: [
        "Bienvenida",
        "Inicio del Sueño",
        "Suplementos",
        "Mañanas",
        "Dependencia",
        "Resultados",
      ],
      qaFlow: [
        {
          question:
            "¿Cuánto tiempo suele tardar en quedarse dormido después de acostarse?",
          options: [
            "Menos de 15 min",
            "15–30 min",
            "30–60 min",
            "Más de 1 hora",
          ],
        },
        {
          question:
            "¿Ha probado melatonina u otros suplementos para dormir antes?",
          options: [
            "Nunca lo probé",
            "Lo probé, no funcionó",
            "Lo probé, ayudó un poco",
            "Todavía los uso",
          ],
        },
        {
          question:
            '¿Experimenta somnolencia o "niebla cerebral" a la mañana siguiente?',
          options: [
            "Nunca",
            "Ocasionalmente",
            "La mayoría de las mañanas",
            "Cada mañana",
          ],
        },
        {
          question:
            "¿Está preocupado por la dependencia o adicción a los medicamentos para dormir?",
          options: [
            "Para nada",
            "Algo preocupado",
            "Muy preocupado",
            "Es mi principal preocupación",
          ],
        },
      ],
    },
  },
} as const;

export type TranslationKeys = (typeof translations)["en"];
