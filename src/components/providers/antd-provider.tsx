"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Scoped Ant Design provider — only mount where Form/Drawer/Checkbox are used. */
export function AntdProvider({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={esES}
        theme={{
          cssVar: { key: "urlex" },
          token: {
            colorPrimary: "#144672",
            colorLink: "#144672",
            borderRadius: 12,
            fontFamily: "var(--font-family)",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
