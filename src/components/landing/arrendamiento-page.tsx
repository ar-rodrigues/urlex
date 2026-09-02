import { ArrendamientoBanner } from "@/components/landing/arrendamiento-banner";
import { ArrendamientoComparison } from "@/components/landing/arrendamiento-comparison";
import { ArrendamientoContact } from "@/components/landing/arrendamiento-contact";
import { ArrendamientoFaq } from "@/components/landing/arrendamiento-faq";
import { ArrendamientoHero } from "@/components/landing/arrendamiento-hero";
import { ArrendamientoIntro } from "@/components/landing/arrendamiento-intro";
import { ArrendamientoPlans } from "@/components/landing/arrendamiento-plans";
import { ArrendamientoProcess } from "@/components/landing/arrendamiento-process";

export function ArrendamientoPage() {
  return (
    <>
      <ArrendamientoHero />
      <ArrendamientoIntro />
      <ArrendamientoBanner />
      <ArrendamientoProcess />
      <ArrendamientoPlans />
      <ArrendamientoComparison />
      <ArrendamientoFaq />
      <ArrendamientoContact />
    </>
  );
}
