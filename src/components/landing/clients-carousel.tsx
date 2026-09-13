import Image from "next/image";
import { getTranslations } from "next-intl/server";

const CLIENTS = [
  { key: "arquitectos", src: "/images/clientes/urlex__arquitectos.webp" },
  { key: "cyma", src: "/images/clientes/urlex__cyma.webp" },
  { key: "espiral", src: "/images/clientes/urlex__espiral.webp" },
  { key: "gutierrez", src: "/images/clientes/urlex__gutierrez.webp" },
  { key: "keiko", src: "/images/clientes/urlex__keiko.webp" },
  { key: "transmorva", src: "/images/clientes/urlex__transmorva.webp" },
  { key: "volkanic", src: "/images/clientes/urlex__volkanic.webp" },
] as const;

export async function ClientsCarousel() {
  const t = await getTranslations("SuccessCasesSection");

  const loopedClients = [...CLIENTS, ...CLIENTS];

  return (
    <div className="overflow-hidden" aria-label={t("title")}>
      <ul className="service-carousel-track flex w-max items-center gap-10 py-2 md:gap-14">
        {loopedClients.map(({ key, src }, index) => (
          <li
            key={`${key}-${index}`}
            className="flex h-28 w-[220px] shrink-0 items-center justify-center md:h-36 md:w-[280px]"
          >
            <Image
              src={src}
              alt={t(`logos.${key}`)}
              width={251}
              height={201}
              className="h-24 w-auto max-w-full object-contain md:h-32"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
