export interface TranslationSchema {
  nav_projects: string;
  nav_stack: string;
  nav_contacto: string;
  nav_cta: string;
  
  hero_tag_hiring: string;
  hero_tag_github: string;
  hero_tag_linux: string;
  hero_heading_white1: string;
  hero_heading_gradient: string;
  hero_heading_white2: string;
  hero_heading_gradient_orange: string;
  hero_paragraph: string;
  hero_badge_title: string;
  hero_badge_desc: string;
  hero_cta_send: string;
  hero_cta_copy: string;
  hero_cta_copied: string;
  hero_cta_projects: string;
  hero_proof_eng: string;
  hero_proof_linux: string;
  hero_proof_docker: string;
  hero_proof_cicd: string;
  hero_proof_ai: string;
  
  stat_docker_title: string;
  stat_docker_label: string;
  stat_docker_desc: string;
  stat_multi_title: string;
  stat_multi_label: string;
  stat_multi_desc: string;
  stat_sql_title: string;
  stat_sql_label: string;
  stat_sql_desc: string;
  stat_cicd_title: string;
  stat_cicd_label: string;
  stat_cicd_desc: string;
  
  projects_title: string;
  projects_tag: string;
  projects_subtitle: string;
  projects_desc: string;
  projects_all_github: string;
  projects_visit: string;
  projects_details: string;
  
  projects_nutri_tag: string;
  projects_nutri_focus_title: string;
  projects_nutri_focus_desc: string;
  projects_nutri_perf_title: string;
  projects_nutri_perf_desc: string;
  projects_nutri_tech_title: string;
  projects_nutri_tech_item1: string;
  projects_nutri_tech_item2: string;
  projects_nutri_tech_item3: string;
  projects_nutri_status_title: string;
  projects_nutri_hosting: string;
  projects_nutri_load: string;
  projects_nutri_ux: string;
  projects_nutri_details_long: string;

  projects_dorologi_tag: string;
  projects_dorologi_focus_title: string;
  projects_dorologi_focus_desc: string;
  projects_dorologi_perf_title: string;
  projects_dorologi_perf_desc: string;
  projects_dorologi_tech_title: string;
  projects_dorologi_tech_item1: string;
  projects_dorologi_tech_item2: string;
  projects_dorologi_tech_item3: string;
  projects_dorologi_status_title: string;
  projects_dorologi_domain: string;
  projects_dorologi_opt: string;
  projects_dorologi_status: string;
  projects_dorologi_details_long: string;
  
  repos_title: string;
  repos_desc: string;
  repos_visit: string;

  stack_title: string;
  stack_subtitle: string;
  stack_linux_title: string;
  stack_linux_subtitle: string;
  stack_linux_item1: string;
  stack_linux_item2: string;
  stack_linux_item3: string;
  stack_linux_item4: string;
  stack_web_title: string;
  stack_web_subtitle: string;
  stack_web_item1: string;
  stack_web_item2: string;
  stack_web_item3: string;
  stack_web_item4: string;
  stack_mobile_title: string;
  stack_mobile_subtitle: string;
  stack_mobile_item1: string;
  stack_mobile_item2: string;
  stack_mobile_item3: string;
  stack_mobile_item4: string;
  stack_ai_title: string;
  stack_ai_subtitle: string;
  stack_ai_item1: string;
  stack_ai_item2: string;
  stack_ai_item3: string;
  stack_ai_item4: string;
  
  contact_tag: string;
  contact_title: string;
  contact_desc: string;
  contact_info_title: string;
  contact_info_desc: string;
  contact_location_label: string;
  contact_location: string;
  contact_quote: string;
  contact_label_name: string;
  contact_label_email: string;
  contact_label_msg: string;
  contact_btn_send: string;
  contact_btn_sending: string;
  contact_success_title: string;
  contact_success_desc: string;
  
  footer_copy: string;
  
  modal_booking_title: string;
  modal_booking_subtitle: string;
  modal_booking_candidate: string;
  modal_booking_candidate_val: string;
  modal_booking_duration: string;
  modal_booking_duration_val: string;
  modal_booking_modality: string;
  modal_booking_confirm: string;
  
  modal_case_guarantee_title: string;
  modal_case_guarantee_item1: string;
  modal_case_guarantee_item2: string;
  modal_case_guarantee_item3: string;
  modal_case_close: string;
  
  lang_disclaimer: string;
  
  terminal_welcome: string;
  terminal_placeholder: string;
}

export const esTranslations: TranslationSchema = {
  nav_projects: "/proyectos",
  nav_stack: "/stack",
  nav_contacto: "/contacto",
  nav_cta: "Contactar",
  
  hero_tag_hiring: "Disponible para Trabajo / Contratación",
  hero_tag_github: "github.com/ErPyrex",
  hero_tag_linux: "Linux Native User & Sysadmin",
  hero_heading_white1: "Ingeniero en Informática. Construyo ",
  hero_heading_gradient: "sistemas web, apps móviles",
  hero_heading_white2: " e infraestructura en ",
  hero_heading_gradient_orange: "Linux & Docker",
  hero_paragraph: "Especializado en Next.js, Expo (React Native), Linux, Docker, Bash, PostgreSQL y Supabase. Integro flujos CI/CD con GitHub Workflows e impulso el ciclo de desarrollo con asistentes de IA. Despliego en Vercel y Render.",
  hero_badge_title: "Perfil de Ingeniería & Sysadmin",
  hero_badge_desc: "Linux nativo, scripting en Bash, contenedorización en Docker, consultas SQL (PostgreSQL/SQLite) y desarrollo Web/Móvil con Next.js y Expo.",
  hero_cta_send: "Enviar Propuesta Laboral",
  hero_cta_copy: "Copiar Email Directo",
  hero_cta_copied: "¡Correo Copiado!",
  hero_cta_projects: "Ver Proyectos",
  hero_proof_eng: "Ing. en Informática",
  hero_proof_linux: "Linux OS Primario",
  hero_proof_docker: "Docker & Bash Scripts",
  hero_proof_cicd: "GitHub Workflows",
  hero_proof_ai: "AI Tooling (Antigravity)",
  
  stat_docker_title: "100%",
  stat_docker_label: "Ambientes Contenedorizados",
  stat_docker_desc: "Docker compose & scripts Bash automatizados.",
  stat_multi_title: "Multi",
  stat_multi_label: "Plataforma Móvil & Web",
  stat_multi_desc: "Expo (iOS/Android) y Next.js en producción.",
  stat_sql_title: "SQL",
  stat_sql_label: "PostgreSQL, SQLite & Supabase",
  stat_sql_desc: "Diseño de esquemas y consultas eficientes.",
  stat_cicd_title: "CI/CD",
  stat_cicd_label: "Render, Vercel & Git",
  stat_cicd_desc: "Despliegues automatizados y continuos.",
  
  projects_title: "Featured Projects",
  projects_tag: "// Experiencia Práctica y Proyectos Reales",
  projects_subtitle: "Sistemas Web, E-Commerce & Apps en Producción",
  projects_desc: "Proyectos reales desplegados en producción donde aplico desarrollo Web/Móvil, optimización de rendimiento e infraestructura cloud.",
  projects_all_github: "Ver todos en GitHub",
  projects_visit: "Visitar Proyecto",
  projects_details: "Detalles",
  
  projects_nutri_tag: "Web App / Salubridad & Nutrición",
  projects_nutri_focus_title: "01. Enfoque del Proyecto",
  projects_nutri_focus_desc: "Herramienta web interactiva enfocada en el cálculo instantáneo de métricas nutricionales, macros y necesidades calóricas con una interfaz reactiva de alta velocidad.",
  projects_nutri_perf_title: "Despliegue & Rendimiento:",
  projects_nutri_perf_desc: "Desplegado en Vercel con renderizado instantáneo y respuesta inmediata al cálculo del usuario.",
  projects_nutri_tech_title: "02. Solución Técnica",
  projects_nutri_tech_item1: "Desarrollado sobre arquitectura SSR/CSR ligera en Next.js.",
  projects_nutri_tech_item2: "Lógica matemática optimizada en cliente para cálculos en tiempo real.",
  projects_nutri_tech_item3: "Diseño responsivo fluido adaptable a móviles y escritorio.",
  projects_nutri_status_title: "03. Estado en Producción",
  projects_nutri_hosting: "Hosting: Vercel Edge",
  projects_nutri_load: "Tiempo Carga: < 1.0s FCP",
  projects_nutri_ux: "UX Mobile: 100% Optimizado",
  projects_nutri_details_long: "Plataforma web de cálculo nutricional desarrollada con Next.js y desplegada en Vercel. Cuenta con renderizado en el borde e interfaz reactiva para cómputo inmediato en el cliente.",

  projects_dorologi_tag: "E-Commerce Platform",
  projects_dorologi_focus_title: "01. Enfoque Comercial",
  projects_dorologi_focus_desc: "Tienda en línea completa orientada a la exhibición de catálogo, conversión de ventas, navegación fluida de productos y experiencia de compra optimizada.",
  projects_dorologi_perf_title: "Resultado E-Commerce:",
  projects_dorologi_perf_desc: "Diseño web limpio, rápida carga de imágenes de catálogo y estructuración optimizada para comercio.",
  projects_dorologi_tech_title: "02. Solución Técnica",
  projects_dorologi_tech_item1: "Arquitectura web orientada a catálogo interactivo y velocidad.",
  projects_dorologi_tech_item2: "Diseño e interfaz de usuario estilizada con adaptación mobile-first.",
  projects_dorologi_tech_item3: "Integración de dominio personalizado y configuración de producción.",
  projects_dorologi_status_title: "03. Métricas en Producción",
  projects_dorologi_domain: "Dominio Vivo: dorologistore.com",
  projects_dorologi_opt: "Optimización: SEO & Mobile First",
  projects_dorologi_status: "Estado: En Línea (100% Uptime)",
  projects_dorologi_details_long: "Plataforma e-commerce completa para Dorologi Store con diseño adaptativo, pasarela estructurada y catálogo interactivo fluido.",

  repos_title: "Herramientas de Consola & Scripts",
  repos_desc: "Código Abierto & Automatización en GitHub",
  repos_visit: "ver repo →",

  stack_title: "Stack Tecnológico Principal",
  stack_subtitle: "Dominio Técnico & Herramientas",
  stack_linux_title: "Linux & Servidores",
  stack_linux_subtitle: "Sistema Operativo & DevOps",
  stack_linux_item1: "Linux (Distros) • OS Base",
  stack_linux_item2: "Docker & Compose • Contenedores",
  stack_linux_item3: "Bash Scripting • Automatización",
  stack_linux_item4: "Render & Vercel • Despliegue",
  stack_web_title: "Desarrollo Web",
  stack_web_subtitle: "Sistemas & Landing Pages",
  stack_web_item1: "Next.js / React • Frontend Framework",
  stack_web_item2: "HTML5, CSS3, JS • Fundamentos Web",
  stack_web_item3: "Tailwind CSS • Estilos & UI",
  stack_web_item4: "REST APIs & Node • Integración",
  stack_mobile_title: "Móvil & Datos",
  stack_mobile_subtitle: "Apps & Almacenamiento",
  stack_mobile_item1: "Expo (React Native) • Apps Móviles",
  stack_mobile_item2: "PostgreSQL • Base de Datos SQL",
  stack_mobile_item3: "Supabase (BaaS) • Auth & DB",
  stack_mobile_item4: "SQLite • Base de Datos Local",
  stack_ai_title: "AI & Productividad",
  stack_ai_subtitle: "Flujos de Trabajo Inteligentes",
  stack_ai_item1: "Antigravity & CLI • Asistente AI",
  stack_ai_item2: "OpenCode • Herramienta Dev",
  stack_ai_item3: "Google Stitch • Integración",
  stack_ai_item4: "GitHub Actions • CI/CD Autómata",

  contact_tag: "Contacto Directo",
  contact_title: "¿Buscas un Ingeniero de Software para tu equipo?",
  contact_desc: "Estoy listo para sumarme a proyectos o vacantes de desarrollo. Envíame un mensaje directo o copia mi correo de contacto.",
  contact_info_title: "Información de Contacto",
  contact_info_desc: "No dudes en contactarme directamente vía email o a través de este formulario. Respondo habitualmente en menos de 24 horas.",
  contact_location_label: "Ubicación",
  contact_location: "Venezuela (Remoto)",
  contact_quote: "// Construyamos algo increíble juntos.",
  contact_label_name: "Nombre / Empresa",
  contact_label_email: "Correo Electrónico",
  contact_label_msg: "Mensaje / Requerimientos",
  contact_btn_send: "Enviar Mensaje Directo",
  contact_btn_sending: "Enviando…",
  contact_success_title: "¡Mensaje Enviado!",
  contact_success_desc: "Gracias por ponerte en contacto. Te responderé a la brevedad.",
  
  footer_copy: "© 2026 Sergio Rodriguez (Pyrex64) — Ingeniero en Informática. Linux, Docker & Desarrollo Web/Móvil.",
  
  modal_booking_title: "Agendar Entrevista",
  modal_booking_subtitle: "Conecta directamente con Sergio Rodriguez (Pyrex64).",
  modal_booking_candidate: "Candidato:",
  modal_booking_candidate_val: "Sergio Rodriguez (Pyrex64) - Ing. Informática",
  modal_booking_duration: "Duración:",
  modal_booking_duration_val: "15 - 30 minutos",
  modal_booking_modality: "Modalidad: Google Meet / Zoom",
  modal_booking_confirm: "Confirmar Vía Correo Directo",
  
  modal_case_guarantee_title: "// Garantía de Ingeniería:",
  modal_case_guarantee_item1: "✓ Ambientes probados en Linux OS local y servidores remotos",
  modal_case_guarantee_item2: "✓ Automatización mediante scripts Bash y Docker",
  modal_case_guarantee_item3: "✓ Persistencia de datos limpia en PostgreSQL / SQLite",
  modal_case_close: "Cerrar",
  
  lang_disclaimer: "Nota: Poseo nivel de inglés técnico adecuado para comprender requerimientos y documentación.",
  
  terminal_welcome: "Terminal Interactiva de Sergio Rodriguez (Pyrex64). Escribe 'help' para comandos.",
  terminal_placeholder: "Escribe 'skills', 'deploy', 'contact', 'hire'…"
};

export const enTranslations: TranslationSchema = {
  nav_projects: "/projects",
  nav_stack: "/stack",
  nav_contacto: "/contact",
  nav_cta: "Contact Me",
  
  hero_tag_hiring: "Available for Hire / Contract Work",
  hero_tag_github: "github.com/ErPyrex",
  hero_tag_linux: "Linux Native User & Sysadmin",
  hero_heading_white1: "Computer Engineer. I build ",
  hero_heading_gradient: "web systems, mobile apps",
  hero_heading_white2: " and infrastructure using ",
  hero_heading_gradient_orange: "Linux & Docker",
  hero_paragraph: "Specialized in Next.js, Expo (React Native), Linux, Docker, Bash, PostgreSQL, and Supabase. I integrate CI/CD pipelines via GitHub Workflows and accelerate cycles using AI-driven development. I deploy on Vercel and Render.",
  hero_badge_title: "Engineering & Sysadmin Profile",
  hero_badge_desc: "Native Linux, Bash scripting, containerization with Docker, SQL queries (PostgreSQL/SQLite), and Web/Mobile development with Next.js and Expo.",
  hero_cta_send: "Send Job Proposal",
  hero_cta_copy: "Copy Direct Email",
  hero_cta_copied: "Email Copied!",
  hero_cta_projects: "View Projects",
  hero_proof_eng: "B.S. Computer Engineering",
  hero_proof_linux: "Linux Primary OS",
  hero_proof_docker: "Docker & Bash Scripts",
  hero_proof_cicd: "GitHub Workflows",
  hero_proof_ai: "AI Tooling (Antigravity)",
  
  stat_docker_title: "100%",
  stat_docker_label: "Containerized Environments",
  stat_docker_desc: "Docker compose & automated Bash scripts.",
  stat_multi_title: "Multi",
  stat_multi_label: "Mobile & Web Platforms",
  stat_multi_desc: "Expo (iOS/Android) and Next.js in production.",
  stat_sql_title: "SQL",
  stat_sql_label: "PostgreSQL, SQLite & Supabase",
  stat_sql_desc: "Efficient database schema design and querying.",
  stat_cicd_title: "CI/CD",
  stat_cicd_label: "Render, Vercel & Git",
  stat_cicd_desc: "Automated and continuous delivery pipelines.",
  
  projects_title: "Featured Projects",
  projects_tag: "// Hands-on Experience & Real Projects",
  projects_subtitle: "Web Systems, E-Commerce & Apps in Production",
  projects_desc: "Real-world projects deployed in production, applying Web/Mobile development, performance optimization, and cloud infrastructure.",
  projects_all_github: "View all on GitHub",
  projects_visit: "Visit Project",
  projects_details: "Details",
  
  projects_nutri_tag: "Web App / Health & Nutrition",
  projects_nutri_focus_title: "01. Project Scope",
  projects_nutri_focus_desc: "An interactive web tool focused on instant calculation of nutritional metrics, macros, and caloric needs with a high-speed reactive interface.",
  projects_nutri_perf_title: "Deployment & Performance:",
  projects_nutri_perf_desc: "Deployed on Vercel with instant rendering and immediate response to user inputs.",
  projects_nutri_tech_title: "02. Technical Solution",
  projects_nutri_tech_item1: "Developed on a lightweight SSR/CSR architecture in Next.js.",
  projects_nutri_tech_item2: "Client-side optimized mathematical logic for real-time calculations.",
  projects_nutri_tech_item3: "Fluid responsive design adaptable to mobile and desktop.",
  projects_nutri_status_title: "03. Production Status",
  projects_nutri_hosting: "Hosting: Vercel Edge",
  projects_nutri_load: "Load Time: < 1.0s FCP",
  projects_nutri_ux: "Mobile UX: 100% Optimized",
  projects_nutri_details_long: "A web platform for nutritional calculation developed with Next.js and deployed on Vercel. Features edge rendering and a reactive interface for immediate client-side computation.",

  projects_dorologi_tag: "E-Commerce Platform",
  projects_dorologi_focus_title: "01. Commercial Focus",
  projects_dorologi_focus_desc: "Complete online store oriented towards catalog display, sales conversion, smooth product navigation, and optimized buying experience.",
  projects_dorologi_perf_title: "E-Commerce Outcome:",
  projects_dorologi_perf_desc: "Clean web design, fast loading catalog images, and optimized structures for commerce.",
  projects_dorologi_tech_title: "02. Technical Solution",
  projects_dorologi_tech_item1: "Web architecture designed for interactive catalog speed and checkout flow.",
  projects_dorologi_tech_item2: "Stylized UI layout using a mobile-first approach.",
  projects_dorologi_tech_item3: "Custom domain integration and production environments config.",
  projects_dorologi_status_title: "03. Production Metrics",
  projects_dorologi_domain: "Live Domain: dorologistore.com",
  projects_dorologi_opt: "Optimization: SEO & Mobile First",
  projects_dorologi_status: "Status: Online (100% Uptime)",
  projects_dorologi_details_long: "A comprehensive e-commerce platform for Dorologi Store, built with responsive layout, customized checkout steps, and fluid interactive catalog.",

  repos_title: "CLI Tools & Console Utilities",
  repos_desc: "Open Source & Automation on GitHub",
  repos_visit: "view repo →",

  stack_title: "Core Technology Stack",
  stack_subtitle: "Technical Expertise & Tools",
  stack_linux_title: "Linux & Servers",
  stack_linux_subtitle: "Operating System & DevOps",
  stack_linux_item1: "Linux (Distros) • Base OS",
  stack_linux_item2: "Docker & Compose • Containers",
  stack_linux_item3: "Bash Scripting • Automation",
  stack_linux_item4: "Render & Vercel • Deployment",
  stack_web_title: "Web Development",
  stack_web_subtitle: "Systems & Landing Pages",
  stack_web_item1: "Next.js / React • Frontend Framework",
  stack_web_item2: "HTML5, CSS3, JS • Web Fundamentals",
  stack_web_item3: "Tailwind CSS • Styles & UI",
  stack_web_item4: "REST APIs & Node • Integration",
  stack_mobile_title: "Mobile & Data",
  stack_mobile_subtitle: "Apps & Storage",
  stack_mobile_item1: "Expo (React Native) • Mobile Apps",
  stack_mobile_item2: "PostgreSQL • SQL Database",
  stack_mobile_item3: "Supabase (BaaS) • Auth & DB",
  stack_mobile_item4: "SQLite • Local Database",
  stack_ai_title: "AI & Productivity",
  stack_ai_subtitle: "Intelligent Workflows",
  stack_ai_item1: "Antigravity & CLI • AI Assistant",
  stack_ai_item2: "OpenCode • Dev Tools",
  stack_ai_item3: "Google Stitch • Integration",
  stack_ai_item4: "GitHub Actions • Automated CI/CD",

  contact_tag: "Direct Contact",
  contact_title: "Looking for a Software Engineer for your team?",
  contact_desc: "I am ready to join projects or development vacancies. Send me a direct message or copy my contact email.",
  contact_info_title: "Contact Information",
  contact_info_desc: "Feel free to reach out directly via email or through this form. I usually respond in less than 24 hours.",
  contact_location_label: "Location",
  contact_location: "Venezuela (Remote)",
  contact_quote: "// Let's build something incredible together.",
  contact_label_name: "Name / Company",
  contact_label_email: "Email Address",
  contact_label_msg: "Message / Requirements",
  contact_btn_send: "Send Direct Message",
  contact_btn_sending: "Sending…",
  contact_success_title: "Message Sent!",
  contact_success_desc: "Thank you for getting in touch. I will respond to you shortly.",
  
  footer_copy: "© 2026 Sergio Rodriguez (Pyrex64) — Computer Engineer. Linux, Docker & Web/Mobile Development.",
  
  modal_booking_title: "Schedule Interview",
  modal_booking_subtitle: "Connect directly with Sergio Rodriguez (Pyrex64).",
  modal_booking_candidate: "Candidate:",
  modal_booking_candidate_val: "Sergio Rodriguez (Pyrex64) - Comp. Engineer",
  modal_booking_duration: "Duration:",
  modal_booking_duration_val: "15 - 30 minutes",
  modal_booking_modality: "Format: Google Meet / Zoom",
  modal_booking_confirm: "Confirm via Direct Email",
  
  modal_case_guarantee_title: "// Engineering Guarantee:",
  modal_case_guarantee_item1: "✓ Environments verified on local Linux OS & remote servers",
  modal_case_guarantee_item2: "✓ Automation via Bash scripts and Docker",
  modal_case_guarantee_item3: "✓ Clean data persistence on PostgreSQL / SQLite",
  modal_case_close: "Close",
  
  lang_disclaimer: "Note: I possess technical English proficiency sufficient for understanding requirements and docs.",
  
  terminal_welcome: "Sergio Rodriguez (Pyrex64) Interactive Terminal. Type 'help' for commands.",
  terminal_placeholder: "Type 'skills', 'deploy', 'contact', 'hire'…"
};
