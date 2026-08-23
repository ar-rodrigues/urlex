"use client";

import { Button as AntButton, type ButtonProps } from "antd";

export type UIButtonVariant =
  | "primary"
  | "secondary"
  | "secondaryLight"
  | "onAccent"
  | "muted";

export type UIButtonProps = Omit<ButtonProps, "type" | "variant" | "color"> & {
  variant?: UIButtonVariant;
};

const variantStyles: Record<UIButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--color-accent)",
    borderColor: "var(--color-accent)",
    color: "var(--color-accent-contrast)",
    fontWeight: 600,
    height: 43,
    paddingInline: 32,
    borderRadius: "var(--radius-button)",
    boxShadow: "none",
  },
  secondary: {
    background: "transparent",
    borderColor: "var(--color-text-on-primary)",
    color: "var(--color-text-on-primary)",
    fontWeight: 500,
    height: 43,
    paddingInline: 32,
    borderRadius: "var(--radius-button)",
    boxShadow: "none",
  },
  secondaryLight: {
    background: "transparent",
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
    fontWeight: 600,
    height: 48,
    paddingInline: 32,
    borderRadius: "var(--radius-button)",
    boxShadow: "none",
  },
  onAccent: {
    background: "var(--color-primary)",
    borderColor: "var(--color-primary)",
    color: "var(--color-text-on-primary)",
    fontWeight: 600,
    height: 43,
    paddingInline: 32,
    borderRadius: "var(--radius-button)",
    boxShadow: "none",
  },
  muted: {
    background: "var(--color-bg-muted)",
    borderColor: "var(--color-bg-muted)",
    color: "var(--color-text)",
    fontWeight: 600,
    height: 43,
    paddingInline: 32,
    borderRadius: "var(--radius-button)",
    boxShadow: "none",
  },
};

export function Button({
  variant = "primary",
  style,
  className,
  ...props
}: UIButtonProps) {
  return (
    <AntButton
      type={variant === "primary" || variant === "onAccent" || variant === "muted" ? "primary" : "default"}
      className={className}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    />
  );
}
