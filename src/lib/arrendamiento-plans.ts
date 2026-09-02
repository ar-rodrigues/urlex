export const ARRENDAMIENTO_PLAN_IDS = ["alpha", "beta", "gamma"] as const;

export type ArrendamientoPlanId = (typeof ARRENDAMIENTO_PLAN_IDS)[number];

export const ARRENDAMIENTO_INTRO_FEATURES = [
  { key: "investigation", icon: "/images/landing/icon-preventiva.svg" },
  { key: "contracts", icon: "/images/landing/icon-contrato.svg" },
  { key: "support", icon: "/images/landing/icon-integral.svg" },
  { key: "prevention", icon: "/images/landing/icon-atencion.svg" },
] as const;

export const ARRENDAMIENTO_PROCESS_STEPS = [
  { key: "investigation", icon: "/images/landing/icon-preventiva.svg" },
  { key: "contract", icon: "/images/landing/icon-contrato.svg" },
  { key: "followUp", icon: "/images/landing/icon-integral.svg" },
] as const;

export const ARRENDAMIENTO_PLAN_FEATURES: Record<
  ArrendamientoPlanId,
  readonly string[]
> = {
  alpha: ["contract", "investigation", "legalReview"],
  beta: [
    "contract",
    "investigation",
    "legalReview",
    "collection",
    "followUp",
  ],
  gamma: [
    "contract",
    "investigation",
    "legalReview",
    "collection",
    "followUp",
    "eviction",
    "representation",
  ],
};

export const ARRENDAMIENTO_COMPARISON_ROWS = [
  { key: "contract", alpha: true, beta: true, gamma: true },
  { key: "investigation", alpha: true, beta: true, gamma: true },
  { key: "legalReview", alpha: true, beta: true, gamma: true },
  { key: "collection", alpha: false, beta: true, gamma: true },
  { key: "followUp", alpha: false, beta: true, gamma: true },
  { key: "eviction", alpha: false, beta: false, gamma: true },
  { key: "representation", alpha: false, beta: false, gamma: true },
] as const;

export const ARRENDAMIENTO_FAQ_KEYS = [
  "includes",
  "investigationTime",
  "default",
  "existingTenant",
] as const;

export const ARRENDAMIENTO_TRUST_BADGES = [
  "experience",
  "personalized",
  "integral",
] as const;

export const ARRENDAMIENTO_PROPERTY_TYPES = [
  "house",
  "apartment",
  "commercial",
  "office",
  "other",
] as const;

export const ARRENDAMIENTO_TENANT_OPTIONS = ["yes", "no"] as const;
