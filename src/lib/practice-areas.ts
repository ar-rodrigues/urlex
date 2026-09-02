export type PracticeAreaId =
  | "arrendamiento"
  | "familiar"
  | "mercantil"
  | "contratos"
  | "civil"
  | "laboral"
  | "licencias";

export type PracticeExtraSectionId = "arrendamientoSeguro";

export type PracticeLayoutVariant = "standard" | "extended";

export type PracticeAreaConfig = {
  id: PracticeAreaId;
  href: `/servicios/${PracticeAreaId}`;
  heroImage: string;
  itemKeys: readonly string[];
  otherAreaIds: readonly PracticeAreaId[];
  layoutVariant?: PracticeLayoutVariant;
  extraSections?: readonly PracticeExtraSectionId[];
};

export const PRACTICE_AREA_IDS = [
  "arrendamiento",
  "familiar",
  "mercantil",
  "contratos",
  "civil",
  "laboral",
  "licencias",
] as const satisfies readonly PracticeAreaId[];

export function isPracticeAreaId(value: string): value is PracticeAreaId {
  return (PRACTICE_AREA_IDS as readonly string[]).includes(value);
}

export const PRACTICE_AREAS: Record<PracticeAreaId, PracticeAreaConfig> = {
  arrendamiento: {
    id: "arrendamiento",
    href: "/servicios/arrendamiento",
    heroImage: "/images/arrendamiento/hero.jpg",
    itemKeys: [
      "policies",
      "review",
      "drafting",
      "advice",
      "prevention",
      "conflicts",
    ],
    otherAreaIds: [
      "mercantil",
      "familiar",
      "contratos",
      "civil",
      "laboral",
      "licencias",
    ],
    layoutVariant: "extended",
    extraSections: ["arrendamientoSeguro"],
  },
  familiar: {
    id: "familiar",
    href: "/servicios/familiar",
    heroImage: "/images/familiar/hero.jpg",
    itemKeys: [
      "divorces",
      "litigation",
      "alimony",
      "custody",
      "visits",
      "alimonyChange",
      "inheritance",
      "other",
    ],
    otherAreaIds: [
      "mercantil",
      "arrendamiento",
      "contratos",
      "civil",
      "laboral",
      "licencias",
    ],
  },
  mercantil: {
    id: "mercantil",
    href: "/servicios/mercantil",
    heroImage: "/images/mercantil/hero.png",
    itemKeys: [
      "debts",
      "incorporation",
      "ip",
      "contracts",
      "negotiable",
      "dissolution",
      "amparo",
      "registry",
    ],
    otherAreaIds: [
      "familiar",
      "arrendamiento",
      "contratos",
      "civil",
      "laboral",
      "licencias",
    ],
  },
  contratos: {
    id: "contratos",
    href: "/servicios/contratos",
    heroImage: "/images/contratos/hero.jpg",
    itemKeys: [
      "efficacy",
      "nullity",
      "annullability",
      "rescission",
      "obligations",
      "termination",
    ],
    otherAreaIds: [
      "mercantil",
      "arrendamiento",
      "familiar",
      "civil",
      "laboral",
      "licencias",
    ],
  },
  civil: {
    id: "civil",
    href: "/servicios/civil",
    heroImage: "/images/civil/hero.png",
    itemKeys: [
      "eviction",
      "executive",
      "possessory",
      "granting",
      "judgmentNullity",
      "corporateAdvice",
      "associations",
      "notarial",
      "propertyRegistry",
      "condo",
    ],
    otherAreaIds: [
      "mercantil",
      "arrendamiento",
      "contratos",
      "familiar",
      "laboral",
      "licencias",
    ],
  },
  laboral: {
    id: "laboral",
    href: "/servicios/laboral",
    heroImage: "/images/laboral/hero.jpg",
    itemKeys: [
      "contracts",
      "terminations",
      "agreements",
      "conflicts",
      "conciliation",
      "prevention",
      "advice",
      "strategy",
    ],
    otherAreaIds: [
      "mercantil",
      "arrendamiento",
      "contratos",
      "civil",
      "familiar",
      "licencias",
    ],
  },
  licencias: {
    id: "licencias",
    href: "/servicios/licencias",
    heroImage: "/images/licencias/hero.jpg",
    itemKeys: [
      "government",
      "operating",
      "municipal",
      "documents",
      "followUp",
      "regularization",
      "compliance",
    ],
    otherAreaIds: [
      "mercantil",
      "arrendamiento",
      "contratos",
      "civil",
      "laboral",
      "familiar",
    ],
  },
};

export const SERVICE_CARDS = [
  {
    key: "family",
    areaId: "familiar",
    icon: "/images/landing/icon-familia.svg",
  },
  {
    key: "lease",
    areaId: "arrendamiento",
    icon: "/images/landing/icon-arrendamiento.svg",
  },
  {
    key: "commercial",
    areaId: "mercantil",
    icon: "/images/landing/icon-mercantil.svg",
  },
  {
    key: "contracts",
    areaId: "contratos",
    icon: "/images/landing/icon-contrato.svg",
  },
  {
    key: "civil",
    areaId: "civil",
    icon: "/images/landing/icon-civil.svg",
  },
  {
    key: "labor",
    areaId: "laboral",
    icon: "/images/landing/icon-laboral.svg",
  },
  {
    key: "permits",
    areaId: "licencias",
    icon: "/images/landing/icon-permisos.svg",
  },
] as const;

export const TRUST_KEYS = [
  "experience",
  "personalized",
  "preventive",
  "integral",
] as const;
