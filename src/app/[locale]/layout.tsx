import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import { ViewContextProvider } from '@app/contexts';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <title>Hedonist</title>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="flex flex-col min-h-svh">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorInfo: "#191919",
                  colorError: "#ed7f7f",
                  colorWarning: "#f4cd6a",
                  colorLink: "#1677ff",
                  wireframe: true,
                  colorSuccess: "#dffa5a"
                },
                components: {
                  Button: {
                    colorPrimary: "#191919",
                    // colorBgContainerDisabled: "rgb(148,148,148)",
                    // colorTextDisabled: "rgb(245,245,245)",
                    colorPrimaryHover: "#191919",
                    colorPrimaryActive: "#191919",
                    defaultHoverBg: "#f5f5f5",
                    defaultHoverBorderColor: "#D1D1D1",
                    defaultActiveBg: "#e6e6e6",
                    defaultActiveBorderColor: "#bdbdbd",
                    defaultActiveColor: "#191919",
                    defaultShadow: '',
                    primaryShadow: '',
                  },
                  Input: {
                    activeBorderColor: "#1677ff",
                    hoverBorderColor: "#4096ff"
                  },
                  DatePicker: {
                    colorPrimary: "#1677ff",
                  },
                  Form: {
                    itemMarginBottom: 0,
                  },
                }
              }}
            >
              <ViewContextProvider>
                {children}
              </ViewContextProvider>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
