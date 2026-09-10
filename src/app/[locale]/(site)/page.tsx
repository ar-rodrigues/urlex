import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/landing/about-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Hero } from "@/components/landing/hero";
import { HomeArrendamientoBanner } from "@/components/landing/home-arrendamiento-banner";
import { ServicesSection } from "@/components/landing/services-section";
import { StatsSection } from "@/components/landing/stats-section";
import { SuccessCasesSection } from "@/components/landing/success-cases-section";

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
