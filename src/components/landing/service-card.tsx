import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";

type Props = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: string;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  cta,
  href,
  icon,
  className = "flex w-[280px] shrink-0 flex-col gap-7 rounded-[var(--radius-card)] bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)] md:w-[293px]",
}: Props) {
  return (
    <article className={className}>
      <div
        className="flex h-11 w-12 items-center justify-center rounded-md"
        style={{ background: "var(--color-primary)" }}
      >
        <Image src={icon} alt="" width={28} height={28} className="h-7 w-7" />
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className="text-xl font-semibold leading-tight tracking-tight md:text-2xl"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h3>
        <p className="text-base leading-[25px]" style={{ color: "var(--color-text-muted)" }}>
          {description}
        </p>
      </div>
      <Link href={href} className="mt-auto">
        <Button variant="primary" className="w-full">
          {cta}
        </Button>
      </Link>
    </article>
  );
}
