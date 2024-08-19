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

export default async function LocaleLayout({children, params: {locale}}: Props) {
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
                  colorPrimary: "#191919",
                  colorInfo: "#191919",
                  colorError: "#ed7f7f",
                  colorWarning: "#f4cd6a",
                  colorLink: "#1677ff",
                  wireframe: true,
                  colorSuccess: "#dffa5a"
                },
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
