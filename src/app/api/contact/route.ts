import { NextResponse } from "next/server";
import {
  buildArrendamientoContactEmail,
  buildContactEmailHtml,
  buildContactEmailText,
  buildGeneralContactEmail,
} from "@/lib/contact-email-template";
import { sendContactEmail } from "@/lib/mail";
import type { ContactPayload } from "@/lib/submit-contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = {
  fullName: 120,
  phone: 40,
  email: 160,
  service: 60,
  message: 4000,
  propertyType: 60,
  hasTenant: 20,
} as const;

const SERVICE_LABELS: Record<string, string> = {
  family: "Derecho Familiar",
  lease: "Arrendamiento Seguro",
  commercial: "Derecho Mercantil",
  contracts: "Resolución de Contratos",
  civil: "Derecho Civil",
  labor: "Derecho Laboral",
  permits: "Permisos y Licencias",
  other: "Otro",
};

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  house: "Casa",
  apartment: "Departamento",
  commercial: "Local comercial",
  office: "Oficina",
  other: "Otro",
};

const TENANT_LABELS: Record<string, string> = {
  yes: "Sí",
  no: "No",
};

function isNonEmptyString(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as Record<string, unknown>;

  if (data.website) {
    return null;
  }

  if (data.privacyConsent !== true) {
    return null;
  }

  if (
    !isNonEmptyString(data.fullName, MAX_LENGTH.fullName) ||
    !isNonEmptyString(data.phone, MAX_LENGTH.phone) ||
    !isNonEmptyString(data.email, MAX_LENGTH.email) ||
    !EMAIL_RE.test(data.email.trim())
  ) {
    return null;
  }

  if (data.formType === "general") {
    if (
      !isNonEmptyString(data.service, MAX_LENGTH.service) ||
      !isNonEmptyString(data.message, MAX_LENGTH.message)
    ) {
      return null;
    }

    return {
      formType: "general",
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message,
      privacyConsent: true,
    };
  }

  if (data.formType === "arrendamiento") {
    if (
      !isNonEmptyString(data.propertyType, MAX_LENGTH.propertyType) ||
      !isNonEmptyString(data.hasTenant, MAX_LENGTH.hasTenant)
    ) {
      return null;
    }

    return {
      formType: "arrendamiento",
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      propertyType: data.propertyType,
      hasTenant: data.hasTenant,
      privacyConsent: true,
    };
  }

  return null;
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const payload = parsePayload(json);

  // Honeypot: silent success so bots think it worked
  if (
    json &&
    typeof json === "object" &&
    "website" in json &&
    Boolean((json as { website?: unknown }).website)
  ) {
    return NextResponse.json({ ok: true });
  }

  if (!payload) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  try {
    if (payload.formType === "general") {
      const content = buildGeneralContactEmail({
        fullName: payload.fullName.trim(),
        phone: payload.phone.trim(),
        email: payload.email.trim(),
        service:
          SERVICE_LABELS[payload.service.trim()] ?? payload.service.trim(),
        message: payload.message.trim(),
      });

      await sendContactEmail({
        subject: `[URLEX] Contacto — ${payload.fullName.trim()}`,
        text: buildContactEmailText(content),
        html: buildContactEmailHtml(content),
        replyTo: payload.email.trim(),
      });
    } else {
      const content = buildArrendamientoContactEmail({
        fullName: payload.fullName.trim(),
        phone: payload.phone.trim(),
        email: payload.email.trim(),
        propertyType:
          PROPERTY_TYPE_LABELS[payload.propertyType.trim()] ??
          payload.propertyType.trim(),
        hasTenant:
          TENANT_LABELS[payload.hasTenant.trim()] ?? payload.hasTenant.trim(),
      });

      await sendContactEmail({
        subject: `[URLEX] Arrendamiento — ${payload.fullName.trim()}`,
        text: buildContactEmailText(content),
        html: buildContactEmailHtml(content),
        replyTo: payload.email.trim(),
        cc:
          process.env.email_arrendamiento?.trim() ||
          process.env.EMAIL_ARRENDAMIENTO?.trim() ||
          undefined,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Error al enviar correo:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
