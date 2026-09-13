"use client";

import { Form, Input, Select } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PrivacyConsentCheckbox } from "@/components/landing/privacy-consent-checkbox";
import { AntdProvider } from "@/components/providers/antd-provider";
import { Button } from "@/components/ui/button";
import { Reveal, FormReveal, FormRevealBody, HERO_STEP, REVEAL_STEP } from "@/components/ui/reveal";
import { submitContactForm } from "@/lib/submit-contact";

type ContactValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  privacyConsent: boolean;
  website?: string;
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
}: {
  hideTitle?: boolean;
  submitLabel?: string;
} = {}) {
  return (
    <AntdProvider>
      <ContactSectionInner hideTitle={hideTitle} submitLabel={submitLabel} />
    </AntdProvider>
  );
}

function ContactSectionInner({
  hideTitle = false,
  submitLabel,
}: {
  hideTitle?: boolean;
  submitLabel?: string;
} = {}) {
  const t = useTranslations("ContactSection");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [form] = Form.useForm<ContactValues>();

  const handleFinish = async (values: ContactValues) => {
    if (values.website) {
      return;
    }

    setSubmitting(true);
    setSubmitError(false);

    const result = await submitContactForm({
      formType: "general",
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      service: values.service,
      message: values.message,
      privacyConsent: values.privacyConsent,
      website: values.website,
    });

    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(true);
      return;
    }

    setSubmitted(true);
    form.resetFields();
  };

  const handleSendAnother = () => {
    setSubmitted(false);
    setSubmitError(false);
    form.resetFields();
  };

  return (
    <section
      id="contacto"
      className="landing-section w-full"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container flex flex-col items-center gap-6 md:gap-8">
        {hideTitle ? null : (
          <Reveal emphasis>
            <h2
              className="font-display text-center text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
              style={{ color: "var(--color-text)" }}
            >
              {t("title")}
            </h2>
          </Reveal>
        )}

        <FormReveal
          playOnMount={hideTitle}
          delay={hideTitle ? HERO_STEP * 2 : REVEAL_STEP}
          from="up"
          className="w-full max-w-[842px]"
        >
          <div
            className="w-full bg-white px-4 py-8 md:px-8 md:py-12"
            style={{
              borderRadius: "var(--radius-form)",
              border: hideTitle ? "1px solid var(--color-accent)" : undefined,
            }}
          >
          <div className="mx-auto w-full max-w-[786px]">
            {submitted ? (
              <div
                className="flex min-h-[420px] flex-col items-center justify-center gap-8 py-12 text-center md:min-h-[480px] md:gap-10 md:py-16"
                role="status"
              >
                <div
                  className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-md border"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <Image
                    src="/images/shared/icon-check.svg"
                    alt=""
                    width={39}
                    height={39}
                    className="h-10 w-10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className="font-display text-2xl font-bold leading-tight tracking-[0.03em] md:text-[2rem]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t("successTitle")}
                  </p>
                  <p
                    className="text-lg leading-relaxed md:text-xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {t("successBody")}
                  </p>
                </div>
                <Button variant="secondaryLight" onClick={handleSendAnother}>
                  {t("sendAnother")}
                </Button>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleFinish}
                className="relative w-full"
              >
              <div
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                aria-hidden
              >
                <Form.Item name="website" noStyle>
                  <Input tabIndex={-1} autoComplete="off" />
                </Form.Item>
              </div>

              <FormRevealBody>
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

              <PrivacyConsentCheckbox className="!mb-4" />

              {submitError ? (
                <p
                  className="mb-3 text-center text-sm"
                  role="alert"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t("submitError")}
                </p>
              ) : null}

              <div className="flex flex-col items-center gap-3 pt-2">
                <Button
                  variant="secondaryLight"
                  htmlType="submit"
                  loading={submitting}
                  disabled={submitting}
                >
                  {submitLabel ?? t("submit")}
                </Button>
              </div>
              </FormRevealBody>
              </Form>
            )}
          </div>
          </div>
        </FormReveal>
      </div>
    </section>
  );
}
