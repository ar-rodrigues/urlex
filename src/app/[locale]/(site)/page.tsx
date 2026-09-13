import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/landing/about-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { Hero } from "@/components/landing/hero";
import { HomeArrendamientoBanner } from "@/components/landing/home-arrendamiento-banner";
import { ServicesSection } from "@/components/landing/services-section";
import { StatsSection } from "@/components/landing/stats-section";
import { SuccessCasesSection } from "@/components/landing/success-cases-section";

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
