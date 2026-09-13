import type { ButtonHTMLAttributes, ReactNode } from "react";

export type UIButtonVariant =
  | "primary"
  | "secondary"
  | "secondaryLight"
  | "onAccent"
  | "muted";

export type UIButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "color"
> & {
  variant?: UIButtonVariant;
  /** Mirrors previous antd `htmlType` API used by forms. */
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
  /** Accepted for compatibility with former antd Button API; sizing is CSS-driven. */
  size?: "small" | "middle" | "large";
  children?: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  htmlType = "button",
  loading = false,
  disabled,
  children,
  size: _size,
  ...props
}: UIButtonProps) {
  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={["ui-btn", `ui-btn--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
