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

const solidVariants: UIButtonVariant[] = ["primary", "onAccent", "muted"];

export function Button({
  variant = "primary",
  className,
  ...props
}: UIButtonProps) {
  return (
    <AntButton
      type={solidVariants.includes(variant) ? "primary" : "default"}
      className={["ui-btn", `ui-btn--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
