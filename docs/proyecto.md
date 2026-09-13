# URLEX — Documentación del proyecto

Guía para quien retome el desarrollo del sitio web de **URLEX**, bufete jurídico en Puebla. Complementa la [guía de estilo](./style-guide.md).

---

## Qué es

Sitio marketing / corporativo de URLEX: landing, páginas de áreas de práctica, contenido institucional (nosotros, trayectoria, instalaciones) y formularios de contacto que envían correo por SMTP.

No hay autenticación de usuarios ni CMS: el contenido vive en código (`messages/es.json` + componentes) e imágenes estáticas en `public/`.

---

## Stack

| Pieza | Tecnología | Notas |
|-------|------------|--------|
| Framework | **Next.js 16** (App Router) | En este repo el middleware i18n vive en `src/proxy.ts` (no `middleware.ts`). Ver `AGENTS.md` / docs locales de Next. |
| UI | **React 19**, **Tailwind CSS 4**, **Ant Design 6** | Ant Design solo donde hace falta (formularios, Drawer, Checkbox). |
| Animación | **Motion** (`motion`) | Preferir carga diferida en secciones below-the-fold. |
| i18n | **next-intl** | Locale único hoy: `es`, siempre con prefijo `/es`. |
| Correo | **Nodemailer** | API Route `POST /api/contact`. |
| Tipografía | Libre Baskerville + Figtree | Vía `next/font` en `src/app/[locale]/layout.tsx`. |
| Lenguaje | TypeScript | Paths con alias `@/` → `src/`. |

Scripts:

```bash
npm run dev    # desarrollo
npm run build  # producción
npm run start  # servir build
npm run lint   # ESLint
```

---

## Estructura del repositorio

```
urlex/
├── docs/                 # Documentación (estilo + este archivo)
├── messages/
│   └── es.json           # Todas las cadenas visibles (next-intl)
├── public/
│   ├── images/           # Assets por área / landing / clientes
│   ├── Logo.svg
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── api/contact/  # Endpoint de formularios
│   │   ├── globals.css   # Tokens CSS de marca
│   │   ├── layout.tsx    # Root mínimo (pasa children)
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       └── (site)/   # Nav + footer + páginas públicas
│   ├── components/
│   │   ├── landing/      # Secciones y páginas del sitio
│   │   ├── providers/    # AntdProvider
│   │   └── ui/           # Button, Reveal, PageTransition, etc.
│   ├── hooks/
│   ├── i18n/             # routing + request config
│   ├── lib/              # Datos de negocio, mail, navegación
│   └── proxy.ts          # Middleware next-intl (locale)
├── .cursorrules          # Convenciones para agentes / equipo
└── package.json
```

### Dónde poner código nuevo

| Tipo | Ubicación |
|------|-----------|
| Sección / página de marketing | `src/components/landing/` |
| UI genérica reutilizable | `src/components/ui/` |
| Datos de áreas, planes, metadata | `src/lib/` |
| Texto visible | `messages/es.json` (namespace por componente) |
| Tokens de color / tipografía | `src/app/globals.css` |

Convenciones: archivos `kebab-case.tsx`, componentes `PascalCase`, Server Components por defecto; `'use client'` solo con estado, efectos o Ant Design interactivo.

---

## Internacionalización y rutas

### Locale

- Definido en `src/i18n/routing.ts`: `locales: ["es"]`, `localePrefix: "always"`.
- El proxy (`src/proxy.ts`) redirige y valida el locale; excluye `api`, estáticos y `_next`.
- Enlaces internos: usar `Link` / `useRouter` / `usePathname` de `src/lib/navigation.ts` (no `next/link` directo).
- Traducciones: `getTranslations` (server) / `useTranslations` (client). Claves con namespace, p. ej. `Hero.title`.

URLs públicas siempre llevan el prefijo `/es` (ej. `/es/contacto`).

### Páginas del sitio

Todas bajo `src/app/[locale]/(site)/`. El layout de grupo monta `LandingNav`, `PageTransition` y `SiteFooter`.

| Ruta (sin locale) | Archivo | Descripción |
|-------------------|---------|-------------|
| `/` | `(site)/page.tsx` | Home: hero, about, stats, servicios, banner arrendamiento, beneficios, casos, contacto |
| `/servicios` | `(site)/servicios/page.tsx` | Índice de áreas de práctica |
| `/servicios/[areaId]` | `(site)/servicios/[areaId]/page.tsx` | Página por área (ver IDs abajo) |
| `/nosotros` | `(site)/nosotros/page.tsx` | Quiénes somos + FAQ |
| `/trayectoria` | `(site)/trayectoria/page.tsx` | Timeline / historia |
| `/instalaciones` | `(site)/instalaciones/page.tsx` | Espacios del bufete |
| `/contacto` | `(site)/contacto/page.tsx` | Contacto dedicado |
| `/aviso-de-privacidad` | `(site)/aviso-de-privacidad/page.tsx` | Aviso de privacidad |

### Áreas de práctica (`areaId`)

Fuente de verdad: `src/lib/practice-areas.ts`.

| `areaId` | Ruta | Layout |
|----------|------|--------|
| `arrendamiento` | `/servicios/arrendamiento` | **Extended** → `ArrendamientoPage` (planes, proceso, FAQ, formulario propio) |
| `familiar` | `/servicios/familiar` | Standard → hero + servicios + CTA |
| `mercantil` | `/servicios/mercantil` | Standard |
| `contratos` | `/servicios/contratos` | Standard |
| `civil` | `/servicios/civil` | Standard |
| `laboral` | `/servicios/laboral` | Standard |
| `licencias` | `/servicios/licencias` | Standard |

`PracticePage` elige el layout según `layoutVariant`. Copy e ítems de cada área: namespaces `Practice.{areaId}` y `PracticeShared` en `messages/es.json`. Cards del home: `SERVICE_CARDS` en el mismo módulo de lib.

Para **añadir un área nueva**:

1. Extender `PracticeAreaId`, `PRACTICE_AREA_IDS` y `PRACTICE_AREAS`.
2. Añadir card en `SERVICE_CARDS` si debe salir en el home.
3. Agregar traducciones `Practice.{nuevoId}` (+ iconos/hero en `public/images/`).
4. `generateStaticParams` ya itera `PRACTICE_AREA_IDS`.

### API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/contact` | Envío de formularios (fuera del matcher i18n) |

---

## Formularios de contacto

Flujo:

1. Cliente arma el payload y llama `submitContactForm` (`src/lib/submit-contact.ts`) → `POST /api/contact`.
2. La route valida, construye HTML/texto (`src/lib/contact-email-template.ts`) y envía con Nodemailer (`src/lib/mail.ts`).

### Tipos de formulario (`formType`)

| Tipo | Campos clave | Uso |
|------|--------------|-----|
| `general` | nombre, teléfono, email, servicio, mensaje, `privacyConsent` | Home / contacto |
| `arrendamiento` | nombre, teléfono, email, tipo de inmueble, ¿tiene inquilino?, `privacyConsent` | Página de arrendamiento |

Anti-spam / privacidad:

- Campo honeypot `website`: si viene lleno, responde `{ ok: true }` sin enviar.
- `privacyConsent` debe ser `true` o la validación falla.

Arrendamiento puede CC a `email_arrendamiento` / `EMAIL_ARRENDAMIENTO` si está definida.

---

## Variables de entorno

No hay `.env.example` en el repo; configurar en el host (Railway, Vercel, etc.).

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `email` o `EMAIL` | Sí (para correo) | Cuenta SMTP / remitente y destinatario principal |
| `email_password` o `EMAIL_PASSWORD` | Sí | Contraseña o app password |
| `email_host` o `EMAIL_HOST` | Sí | Host SMTP |
| `email_port` o `EMAIL_PORT` | No (default `465`) | `465` = TLS implícito; `587` usa `requireTLS` |
| `email_arrendamiento` o `EMAIL_ARRENDAMIENTO` | No | CC en leads de arrendamiento |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical / metadata (default `https://www.urlex.com.mx`) |

Contacto público (WhatsApp, mapa): constantes en `src/lib/contact-info.ts`.

---

## UI, marca y Ant Design

- Paleta y tipografía: `docs/style-guide.md` + `src/app/globals.css`. **No** hex literales en JSX.
- Botones: `src/components/ui/button.tsx` (variantes primary / secondary).
- Ant Design: montar `AntdProvider` solo donde se usen Form / Drawer / Checkbox. Tokens alineados a navy; `cssVar: true`.
- Drawer v6: `size`, `classNames.section` / `styles.section` (no `width` ni `content`).
- Motion: `Reveal`, `PageTransition`, `AnimatedStat`; home usa `dynamic()` para secciones pesadas.

---

## Datos de negocio en `src/lib`

| Módulo | Rol |
|--------|-----|
| `practice-areas.ts` | IDs, heroes, ítems, cards del home, layout por área |
| `arrendamiento-plans.ts` | Planes Alpha / Beta / Gamma, features, comparación, FAQ keys |
| `content-pages.ts` | Metadata de páginas institucionales |
| `page-metadata.ts` | Helper Open Graph / título |
| `contact-info.ts` | WhatsApp y mapa |
| `mail.ts` / `contact-email-template.ts` / `submit-contact.ts` | Pipeline de correo |

---

## Assets

- Imágenes de marketing: `public/images/` (subcarpetas por área: `arrendamiento`, `familiar`, `landing`, `clientes`, etc.).
- Logo: `public/Logo.svg`.
- Favicons / PWA icons / OG: `public/` y también `src/app/` (`icon.png`, `opengraph-image.png`, …).
- Con `next/image` en iconos cuadrados: fijar ambos ejes CSS (`h-7 w-7`), no solo `w-auto`.

---

## Criterios al contribuir

1. Texto de usuario → `messages/es.json` + next-intl (español de México).
2. Seguir la guía de estilo; evitar cards en el hero y patrones visuales genéricos.
3. Preferir Server Components; no duplicar secciones (extraer a landing/ui/lib).
4. Tras tocar dependencias, verificar `npm audit` (Next se pincha a versiones parcheadas; hoy `next@^16.3.5`).
5. Antes de APIs nuevas de Next, revisar `node_modules/next/dist/docs/` — este proyecto no siempre coincide con la documentación “clásica” de internet.

---

## Mapa rápido para onboarding

1. Arrancar con `npm run dev` → abrir `http://localhost:3000/es`.
2. Leer `docs/style-guide.md` y `.cursorrules`.
3. Home: `src/app/[locale]/(site)/page.tsx` + componentes en `landing/`.
4. Una página de servicio estándar: `practice-page.tsx` + `Practice.*` en mensajes.
5. Arrendamiento (caso especial): `arrendamiento-page.tsx` + `ArrendamientoPage` en mensajes + `arrendamiento-plans.ts`.
6. Contacto: formulario → `submit-contact` → `api/contact` → SMTP.

