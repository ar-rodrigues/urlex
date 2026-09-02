import { LandingNav } from "@/components/landing/landing-nav";
import { SiteFooter } from "@/components/landing/site-footer";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <>
      <LandingNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
