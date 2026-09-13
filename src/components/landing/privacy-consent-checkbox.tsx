"use client";

import { Checkbox, Form } from "antd";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

type Props = {
  className?: string;
};

export function PrivacyConsentCheckbox({ className }: Props) {
  const t = useTranslations("PrivacyConsent");

  return (
    <Form.Item
      name="privacyConsent"
      valuePropName="checked"
      className={className}
      rules={[
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject(new Error(t("required"))),
        },
      ]}
    >
      <Checkbox>
        <span className="text-sm leading-snug" style={{ color: "var(--color-text)" }}>
          {t.rich("label", {
            privacy: (chunks) => (
              <Link
                href="/aviso-de-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-opacity hover:opacity-80"
                style={{ color: "var(--color-primary)" }}
                onClick={(event) => event.stopPropagation()}
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </Checkbox>
    </Form.Item>
  );
}
