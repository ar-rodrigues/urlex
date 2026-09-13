# Guía de estilo — URLEX

Documento de referencia visual y de implementación para el sitio de **URLEX**, bufete jurídico. Toda UI nueva debe alinearse con esta guía y con las variables CSS en `src/app/globals.css`.

Fuente de diseño: Figma Desktop (`node 1:64`), 1280px.

---

## Marca

- **Nombre:** URLEX
- **Posicionamiento:** Bufete jurídico en Puebla con más de 30 años de trayectoria
- **Tono:** Profesional, claro, confiable. Español de México. Sin jerga innecesaria.
- **Jerarquía de marca:** El nombre/logo debe ser señal fuerte en el primer viewport (hero), no solo texto de nav.

---

## Color

Usar siempre variables CSS (`var(--color-*)`). No hardcodear hex en componentes.

| Rol semántico | Token CSS | Hex | Uso |
|---------------|-----------|-----|-----|
| Primary | `--color-primary` | `#144672` | Fondos navy (hero, footer, iconos), texto de énfasis |
| Primary hover | `--color-primary-hover` | `#0F3558` | Hover de superficies/enlaces navy |
| Accent | `--color-accent` | `#E7C018` | CTAs primarios, highlights en titulares |
| Accent hover | `--color-accent-hover` | `#CFA910` | Hover de botones dorados |
| Accent contrast | `--color-accent-contrast` | `#030304` | Texto sobre botones accent |
| Background | `--color-bg` | `#FFFFFF` | Superficie principal |
| Background muted | `--color-bg-muted` | `#F7F5F1` | Secciones hueso (beneficios, formulario) |
| Quote bg | `--color-bg-quote` | `#D6DFEB` | Cinta de cita |
| Text | `--color-text` | `#030304` | Títulos y cuerpo principal |
| Text muted | `--color-text-muted` | `#4A4A4A` | Subtítulos, labels, cuerpo secundario |
| Text on primary | `--color-text-on-primary` | `#FFFFFF` | Texto sobre navy |
| Text soft on primary | `--color-text-on-primary-muted` | `rgba(247, 245, 241, 0.61)` | Meta del hero |
| Border | `--color-border` | `#D0CFCF` | Bordes de inputs y divisores |
| Placeholder | `--color-placeholder` | `#A1A1A1` | Placeholders de formulario |

**No usar:** púrpura por defecto, glows neón, degradados genéricos “AI”, ni dark mode automático que invierta la marca.

---

## Tipografía

| Rol | Familia | Token | Pesos | Notas |
|------|---------|-------|-------|-------|
| Display / H1–H3 | Libre Baskerville | `--font-family-display` | 400, 700 | Titulares, stats, citas |
| UI / cuerpo | Figtree | `--font-family` | 400, 500, 600 | Nav, párrafos, botones, cards |

### Escala (desktop)

| Estilo | Tamaño | Peso | Tracking | Línea |
|--------|--------|------|----------|-------|
| H1 display | 40px | Bold | 1.2px | 1.23 |
| H2 | 36px | Bold | ~1.08px | 1.1 |
| H3 | 28px | Regular (display) | -0.84px | ~33px |
| H4 / card title | 24px | SemiBold (UI) | -0.5px | 1.15 |
| H5 / lead | 22px | Medium (UI) | -0.5px | 1.4 |
| Body | 16px | Regular | 0 | 1.5–25px |
| Nav / botón pequeño | 12px | Medium | -0.5px | 1.45 |
| Botón grande | 18px | SemiBold | 0 | 1 |

En móvil, reducir H1 a ~28–32px y H2 a ~26–28px; mantener legibilidad del cuerpo en 16px.

---

## Layout y espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| `--max-width-container` | `1280px` | Ancho máximo de página |
| `--spacing-container` | `64px` (desktop) / `24px` (móvil) | Gutters laterales |
| `--spacing-section` | `48px`–`64px` | Padding vertical de secciones |
| `--radius-button` | `12px` | Botones |
| `--radius-card` | `15px`–`16px` | Cards de servicio / beneficio |
| `--radius-input` | `10px` | Campos de formulario |
| `--radius-form` | `24px` | Contenedor del formulario |

Breakpoints de referencia Figma: Desktop 1280 · Tablet 800 · Mobile 375.

Patrón de sección:

1. Un propósito, un titular, un apoyo corto.
2. Evitar cards en el hero.
3. Hero a ancho completo (fondo navy edge-to-edge), contenido con gutters.

---

## Componentes

### Botones

- Tamaño base: altura 52px, padding horizontal 40px, texto 15px, radio `--radius-button`.
- Hover: escala ligera (`1.04`) + sombra suave; colores según variante (ver Figma).
- **Primary (accent):** fondo `--color-accent` → hover blanco; texto negro. CTA principal.
- **Secondary (outline claro):** borde blanco + texto blanco sobre navy → hover fill translúcido.
- **Muted (sólido claro):** fondo blanco sobre navy → hover fill translúcido + texto blanco.
- **Secondary (outline oscuro):** borde `--color-primary` + texto primary → hover navy + texto blanco.
- **On accent:** fondo navy sobre amarillo → hover blanco + texto primary.
- **Ghost / texto:** solo para acciones terciarias.

Usar el wrapper `src/components/ui/button.tsx` con variantes; no inventar estilos ad hoc.

### Navegación

- Fondo navy, logo a la izquierda, links en mayúsculas (Figtree Medium 12px), CTA dorado a la derecha.
- En móvil: menú colapsable; no saturar el primer viewport.

### Cards de servicio

- Fondo blanco, sombra suave, icono en recuadro navy, título primary, descripción muted, botón accent “Conocer más”.

### Stats

- Número grande en display primary; etiqueta Figtree muted en mayúsculas.

### Formulario

- Fondo sección hueso; card blanca redondeada.
- Labels Figtree 16px muted; inputs borde `--color-border`, altura generosa (~70px).
- CTA de envío outline (borde primary) centrado — no backend en esta fase (`preventDefault`).

### Footer

- Fondo navy, tipografía on-primary, columnas Servicios / Navegación / Contacto, redes sociales, aviso de privacidad.

---

## Motion

Máximo 2–3 motions intencionales:

1. Fade/slide suave al entrar secciones (opcional, ~300–500ms).
2. Hover de botones (escala ligera + sombra + cambio de color).
3. Scroll horizontal del carrusel de servicios.

Evitar parallax agresivo, particles y animaciones decorativas sin propósito.

---

## i18n y código

- Todo texto visible en `messages/es.json` con namespace por componente (`Hero.title`, `LandingNav.cta`, …).
- Server Components por defecto; `'use client'` solo para formulario, menú móvil u Ant Design interactivo.
- Colores y tipografía solo vía CSS vars.
- Landing → `src/components/landing/`. UI genérica → `src/components/ui/`.
- Enlaces: `Link` de `src/lib/navigation.ts`.

---

## Do / Don’t

**Do**

- Seguir navy + gold + hueso.
- Marca fuerte en el hero.
- Reutilizar tokens y el Button del design system.
- Copiar en español claro y profesional.

**Don’t**

- Colores literales en JSX.
- Inter / Roboto / Arial como tipografía de marca.
- Cards, badges flotantes o stats dentro del primer hero.
- Dark mode que rompa la paleta de marca.
- Duplicar secciones; extraer patrones compartidos.
