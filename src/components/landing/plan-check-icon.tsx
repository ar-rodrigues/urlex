import Image from "next/image";

type Props = {
  className?: string;
  size?: number;
};

/** Gold seal with a white check centered on top (Arrendamiento plans). */
export function PlanCheckIcon({ className = "", size = 20 }: Props) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src="/images/arrendamiento/icon-check.png"
        alt=""
        width={89}
        height={89}
        className="absolute inset-0 h-full w-full object-contain"
      />
      <svg
        viewBox="0 0 24 24"
        width={Math.round(size * 0.68)}
        height={Math.round(size * 0.68)}
        className="relative"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.2 16.6L4.8 12.2L6.9 10.1L9.2 12.4L16.4 5.2L18.5 7.3L9.2 16.6Z"
          fill="var(--color-text-on-primary)"
        />
      </svg>
    </span>
  );
}
