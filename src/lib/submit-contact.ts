export type GeneralContactPayload = {
  formType: "general";
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  privacyConsent: boolean;
  website?: string;
};

export type ArrendamientoContactPayload = {
  formType: "arrendamiento";
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  hasTenant: string;
  privacyConsent: boolean;
  website?: string;
};

export type ContactPayload =
  | GeneralContactPayload
  | ArrendamientoContactPayload;

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: "network" | "server" | "validation" };

export async function submitContactForm(
  payload: ContactPayload,
): Promise<SubmitContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }

    if (response.status === 400) {
      return { ok: false, error: "validation" };
    }

    return { ok: false, error: "server" };
  } catch {
    return { ok: false, error: "network" };
  }
}
