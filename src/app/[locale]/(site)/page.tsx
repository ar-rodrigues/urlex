import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/landing/about-section";
import { Hero } from "@/components/landing/hero";
import { ServicesSection } from "@/components/landing/services-section";

/** Below-fold: defer client JS (motion / forms) until after first paint. */
const StatsSection = dynamic(
  () =>
    import("@/components/landing/stats-section").then((mod) => mod.StatsSection),
  { ssr: true },
);
const HomeArrendamientoBanner = dynamic(
  () =>
    import("@/components/landing/home-arrendamiento-banner").then(
      (mod) => mod.HomeArrendamientoBanner,
    ),
  { ssr: true },
);
const BenefitsSection = dynamic(
  () =>
    import("@/components/landing/benefits-section").then(
      (mod) => mod.BenefitsSection,
    ),
  { ssr: true },
);
const SuccessCasesSection = dynamic(
  () =>
    import("@/components/landing/success-cases-section").then(
      (mod) => mod.SuccessCasesSection,
    ),
  { ssr: true },
);
const ContactSection = dynamic(
  () =>
    import("@/components/landing/contact-section").then(
      (mod) => mod.ContactSection,
    ),
  { ssr: true },
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <HomeArrendamientoBanner />
      <BenefitsSection />
      <SuccessCasesSection />
      <ContactSection />
    </>
  );
}
