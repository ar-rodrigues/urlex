type ContactEmailField = {
  label: string;
  value: string;
  href?: string;
};

export type ContactEmailContent = {
  eyebrow: string;
  title: string;
  fields: ContactEmailField[];
  message?: string;
};

const BRAND = {
  primary: "#144672",
  primaryHover: "#0f3558",
  accent: "#E7C018",
  bgMuted: "#F7F5F1",
  text: "#1a1a1a",
  textMuted: "#5c6570",
  border: "#e2e0db",
  white: "#ffffff",
} as const;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMultiline(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function renderFieldRows(fields: ContactEmailField[]): string {
  return fields
    .map((field, index) => {
      const valueHtml = field.href
        ? `<a href="${escapeHtml(field.href)}" style="color:${BRAND.primary};text-decoration:underline;">${escapeHtml(field.value)}</a>`
        : escapeHtml(field.value);
      const border =
        index < fields.length - 1
          ? `border-bottom:1px solid ${BRAND.border};`
          : "";

      return `
        <tr>
          <td style="padding:14px 0;${border}">
            <p style="margin:0 0 4px;font-size:12px;line-height:1.4;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.textMuted};font-family:Georgia,'Times New Roman',serif;">
              ${escapeHtml(field.label)}
            </p>
            <p style="margin:0;font-size:16px;line-height:1.5;color:${BRAND.text};font-family:Arial,Helvetica,sans-serif;">
              ${valueHtml}
            </p>
          </td>
        </tr>`;
    })
    .join("");
}

export function buildContactEmailHtml(content: ContactEmailContent): string {
  const messageBlock = content.message
    ? `
      <tr>
        <td style="padding-top:8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bgMuted};border-radius:8px;">
            <tr>
              <td style="padding:18px 20px;">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.4;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.textMuted};font-family:Georgia,'Times New Roman',serif;">
                  Mensaje
                </p>
                <p style="margin:0;font-size:16px;line-height:1.6;color:${BRAND.text};font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">
                  ${formatMultiline(content.message)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(content.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bgMuted};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bgMuted};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.white};border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
          <tr>
            <td style="background:${BRAND.primary};padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:4px;background:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:28px 28px 24px;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.accent};font-family:Arial,Helvetica,sans-serif;">
                      ${escapeHtml(content.eyebrow)}
                    </p>
                    <h1 style="margin:0;font-size:24px;line-height:1.25;color:${BRAND.white};font-family:Georgia,'Times New Roman',serif;font-weight:700;">
                      ${escapeHtml(content.title)}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${renderFieldRows(content.fields)}
                ${messageBlock}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 22px;border-top:1px solid ${BRAND.border};background:${BRAND.bgMuted};">
              <p style="margin:0;font-size:12px;line-height:1.5;color:${BRAND.textMuted};font-family:Arial,Helvetica,sans-serif;">
                Enviado desde el sitio web de
                <strong style="color:${BRAND.primary};">URLEX</strong>.
                Puedes responder este correo para contactar al solicitante.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailText(content: ContactEmailContent): string {
  const lines = [
    content.title,
    "",
    ...content.fields.map((field) => `${field.label}: ${field.value}`),
  ];

  if (content.message) {
    lines.push("", "Mensaje:", content.message);
  }

  return lines.join("\n");
}

export function buildGeneralContactEmail(data: {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}): ContactEmailContent {
  return {
    eyebrow: "URLEX · Formulario web",
    title: "Nueva solicitud de contacto",
    fields: [
      { label: "Nombre", value: data.fullName },
      {
        label: "Teléfono",
        value: data.phone,
        href: `tel:${data.phone.replace(/\s+/g, "")}`,
      },
      {
        label: "Correo",
        value: data.email,
        href: `mailto:${data.email}`,
      },
      { label: "Servicio", value: data.service },
    ],
    message: data.message,
  };
}

export function buildArrendamientoContactEmail(data: {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  hasTenant: string;
}): ContactEmailContent {
  return {
    eyebrow: "URLEX · Arrendamiento Seguro",
    title: "Nueva solicitud de arrendamiento",
    fields: [
      { label: "Nombre", value: data.fullName },
      {
        label: "Teléfono",
        value: data.phone,
        href: `tel:${data.phone.replace(/\s+/g, "")}`,
      },
      {
        label: "Correo",
        value: data.email,
        href: `mailto:${data.email}`,
      },
      { label: "Tipo de inmueble", value: data.propertyType },
      { label: "¿Ya tiene arrendatario?", value: data.hasTenant },
    ],
  };
}
