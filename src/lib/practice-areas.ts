export type PracticeAreaId =
  | "arrendamiento"
  | "familiar"
  | "mercantil"
  | "contratos"
  | "civil"
  | "laboral"
  | "licencias";

export type PracticeAreaConfig = {
  id: PracticeAreaId;
  href: `/${PracticeAreaId}`;
  heroImage: string;
  itemKeys: readonly string[];
  otherAreaIds: readonly PracticeAreaId[];
};

export const PRACTICE_AREAS: Record<PracticeAreaId, PracticeAreaConfig> = {
  arrendamiento: {
    id: "arrendamiento",
    href: "/arrendamiento",
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
  },
  familiar: {
    id: "familiar",
    href: "/familiar",
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
    href: "/mercantil",
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
    href: "/contratos",
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
    href: "/civil",
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
    href: "/laboral",
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
    href: "/licencias",
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

export const TRUST_KEYS = [
  "experience",
  "personalized",
  "preventive",
  "integral",
] as const;
