"use client";

import { Form, Input, Select } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ARRENDAMIENTO_PROPERTY_TYPES,
  ARRENDAMIENTO_TENANT_OPTIONS,
} from "@/lib/arrendamiento-plans";

const CONTACT_IMAGE = "/images/nosotros/hero.jpg";

const inputStyle: React.CSSProperties = {
  height: 44,
  borderRadius: "var(--radius-input)",
  borderColor: "var(--color-border)",
};

type ContactValues = {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  hasTenant: string;
  website?: string;
};

export function ArrendamientoContact() {
  const t = useTranslations("ArrendamientoPage.contact");
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm<ContactValues>();

  const handleFinish = (values: ContactValues) => {
    if (values.website) {
      return;
    }

    setSubmitted(true);
    form.resetFields();
  };

  const handleSendAnother = () => {
    setSubmitted(false);
    form.resetFields();
  };

  return (
    <section id="contacto-arrendamiento" className="w-full scroll-mt-20">
      <div
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,38%)_minmax(0,1fr)]"
        style={{ background: "var(--color-primary)" }}
      >
        <div className="flex flex-col justify-center gap-5 px-[var(--spacing-container)] py-12 lg:py-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-accent)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2.25rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("title")}
          </h2>
          <p
            className="max-w-md text-base font-medium leading-[1.45] md:text-lg"
            style={{ color: "var(--color-text-on-primary-muted)" }}
          >
            {t("body")}
          </p>
          <a href="#contacto-arrendamiento" className="w-fit">
            <Button
              variant="primary"
              style={{
                height: 48,
                paddingInline: 28,
                fontSize: 16,
              }}
            >
              <span className="flex items-center gap-2">
                {t("cta")}
                <span aria-hidden>→</span>
              </span>
            </Button>
          </a>
        </div>

        <div className="relative min-h-[240px] lg:min-h-[420px]">
          <Image
            src={CONTACT_IMAGE}
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 38vw"
          />
        </div>

        <div className="flex items-center justify-center px-[var(--spacing-container)] py-10 lg:py-12">
          <div
            className="w-full max-w-[400px] bg-white px-5 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:px-6 md:py-7"
            style={{ borderRadius: "var(--radius-form)" }}
          >
            {submitted ? (
              <div
                className="flex min-h-[280px] flex-col items-center justify-center gap-5 py-6 text-center"
                role="status"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <Image
                    src="/images/shared/icon-check.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className="font-display text-xl font-bold leading-tight"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t("successTitle")}
                  </p>
                  <p className="text-base" style={{ color: "var(--color-text)" }}>
                    {t("successBody")}
                  </p>
                </div>
                <Button
                  variant="secondaryLight"
                  style={{ background: "var(--color-bg)" }}
                  onClick={handleSendAnother}
                >
                  {t("sendAnother")}
                </Button>
              </div>
            ) : (
              <>
                <h3
                  className="mb-4 font-display text-xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t("formTitle")}
                </h3>
                <Form
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={handleFinish}
                  className="arrendamiento-contact-form relative w-full"
                >
                  <div
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                    aria-hidden
                  >
                    <Form.Item name="website" noStyle>
                      <Input tabIndex={-1} autoComplete="off" />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="fullName"
                    label={t("fullName")}
                    className="!mb-3"
                    rules={[{ required: true, message: t("fullName") }]}
                  >
                    <Input
                      placeholder={t("fullNamePlaceholder")}
                      style={inputStyle}
                    />
                  </Form.Item>

                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-3">
                    <Form.Item
                      name="email"
                      label={t("email")}
                      className="!mb-3"
                      rules={[
                        { required: true, message: t("email") },
                        { type: "email", message: t("email") },
                      ]}
                    >
                      <Input
                        placeholder={t("emailPlaceholder")}
                        style={inputStyle}
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label={t("phone")}
                      className="!mb-3"
                      rules={[{ required: true, message: t("phone") }]}
                    >
                      <Input
                        placeholder={t("phonePlaceholder")}
                        style={inputStyle}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="propertyType"
                    label={t("propertyType")}
                    className="!mb-3"
                    rules={[{ required: true, message: t("propertyType") }]}
                  >
                    <Select
                      placeholder={t("propertyTypePlaceholder")}
                      options={ARRENDAMIENTO_PROPERTY_TYPES.map((key) => ({
                        value: key,
                        label: t(`propertyTypes.${key}`),
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    name="hasTenant"
                    label={t("hasTenant")}
                    className="!mb-4"
                    rules={[{ required: true, message: t("hasTenant") }]}
                  >
                    <Select
                      placeholder={t("hasTenantPlaceholder")}
                      options={ARRENDAMIENTO_TENANT_OPTIONS.map((key) => ({
                        value: key,
                        label: t(`tenantOptions.${key}`),
                      }))}
                    />
                  </Form.Item>

                  <Button variant="onAccent" htmlType="submit" className="w-full">
                    {t("submit")}
                  </Button>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
