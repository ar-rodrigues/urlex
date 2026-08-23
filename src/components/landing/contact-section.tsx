"use client";

import { Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ContactValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const SERVICE_OPTIONS = [
  "family",
  "lease",
  "commercial",
  "contracts",
  "civil",
  "labor",
  "permits",
  "other",
] as const;

export function ContactSection({
  hideTitle = false,
  submitLabel,
  privacyNote,
}: {
  hideTitle?: boolean;
  submitLabel?: string;
  privacyNote?: string;
} = {}) {
  const t = useTranslations("ContactSection");
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm<ContactValues>();

  return (
    <section
      id="contacto"
      className="landing-section w-full"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container flex flex-col items-center gap-6 md:gap-8">
        {hideTitle ? null : (
          <h2
            className="font-display text-center text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
            style={{ color: "var(--color-text)" }}
          >
            {t("title")}
          </h2>
        )}

        <div
          className="w-full max-w-[842px] bg-white px-4 py-8 md:px-8 md:py-12"
          style={{
            borderRadius: "var(--radius-form)",
            border: hideTitle ? "1px solid var(--color-accent)" : undefined,
          }}
        >
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={() => {
              setSubmitted(true);
              form.resetFields();
            }}
            className="mx-auto w-full max-w-[786px]"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Form.Item
                name="fullName"
                label={t("fullName")}
                rules={[{ required: true, message: t("fullName") }]}
              >
                <Input
                  size="large"
                  placeholder={t("fullNamePlaceholder")}
                  style={{
                    height: 56,
                    borderRadius: "var(--radius-input)",
                    borderColor: "var(--color-border)",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label={t("phone")}
                rules={[{ required: true, message: t("phone") }]}
              >
                <Input
                  size="large"
                  placeholder={t("phonePlaceholder")}
                  style={{
                    height: 56,
                    borderRadius: "var(--radius-input)",
                    borderColor: "var(--color-border)",
                  }}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label={t("email")}
              rules={[
                { required: true, message: t("email") },
                { type: "email", message: t("email") },
              ]}
            >
              <Input
                size="large"
                placeholder={t("emailPlaceholder")}
                style={{
                  height: 56,
                  borderRadius: "var(--radius-input)",
                  borderColor: "var(--color-border)",
                }}
              />
            </Form.Item>

            <Form.Item
              name="service"
              label={t("service")}
              rules={[{ required: true, message: t("service") }]}
            >
              <Select
                size="large"
                placeholder={t("servicePlaceholder")}
                options={SERVICE_OPTIONS.map((key) => ({
                  value: key,
                  label: t(`services.${key}`),
                }))}
              />
            </Form.Item>

            <Form.Item
              name="message"
              label={t("message")}
              rules={[{ required: true, message: t("message") }]}
            >
              <Input.TextArea
                rows={5}
                placeholder={t("messagePlaceholder")}
                style={{
                  borderRadius: "var(--radius-input)",
                  borderColor: "var(--color-border)",
                }}
              />
            </Form.Item>

            <div className="flex flex-col items-center gap-3 pt-2">
              <Button variant="secondaryLight" htmlType="submit">
                {submitLabel ?? t("submit")}
              </Button>
              {privacyNote ? (
                <p className="text-center text-sm" style={{ color: "var(--color-placeholder)" }}>
                  {privacyNote}
                </p>
              ) : null}
              {submitted ? (
                <p className="text-sm" style={{ color: "var(--color-primary)" }}>
                  {t("success")}
                </p>
              ) : null}
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
