import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
