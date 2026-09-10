export const ARRENDAMIENTO_PLAN_IDS = ["alpha", "beta", "gamma"] as const;

export type ArrendamientoPlanId = (typeof ARRENDAMIENTO_PLAN_IDS)[number];

export const ARRENDAMIENTO_INTRO_FEATURES = [
  { key: "investigation", icon: "/images/landing/icon-preventiva.svg" },
  { key: "contracts", icon: "/images/landing/icon-contrato.svg" },
  { key: "support", icon: "/images/landing/icon-integral.svg" },
  { key: "prevention", icon: "/images/landing/icon-atencion.svg" },
] as const;

export const ARRENDAMIENTO_PROCESS_STEPS = [
  { key: "investigation" },
  { key: "contract" },
  { key: "followUp" },
] as const;

export const ARRENDAMIENTO_PLAN_FEATURES: Record<
  ArrendamientoPlanId,
  readonly string[]
> = {
  alpha: [
    "contract",
    "investigation",
    "advice",
    "mediation",
    "notifications",
    "collection",
  ],
  beta: [
    "includesAlpha",
    "propertyDelivery",
    "servicesRecovery",
    "rentRecovery",
  ],
  gamma: ["includesBeta", "preferentialAdvice"],
};

export const ARRENDAMIENTO_COMPARISON_ROWS = [
  { key: "contract", alpha: true, beta: true, gamma: true },
  { key: "investigation", alpha: true, beta: true, gamma: true },
  { key: "advice", alpha: true, beta: true, gamma: true },
  { key: "mediation", alpha: true, beta: true, gamma: true },
  { key: "notifications", alpha: true, beta: true, gamma: true },
  { key: "collection", alpha: true, beta: true, gamma: true },
  { key: "propertyDelivery", alpha: false, beta: true, gamma: true },
  { key: "servicesRecovery", alpha: false, beta: true, gamma: true },
  { key: "rentRecovery", alpha: false, beta: true, gamma: true },
  { key: "preferentialAdvice", alpha: false, beta: false, gamma: true },
] as const;

export const ARRENDAMIENTO_FAQ_KEYS = [
  "includes",
  "investigationTime",
  "default",
  "existingTenant",
] as const;

export const ARRENDAMIENTO_PROPERTY_TYPES = [
  "house",
  "apartment",
  "commercial",
  "office",
  "other",
] as const;

export const ARRENDAMIENTO_TENANT_OPTIONS = ["yes", "no"] as const;
