'use client'

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ReactNode, useMemo } from 'react';

import { Button, LocaleSwitcher } from '@app/components';
import { DashboardSections } from '@app/constants';
import { Link, usePathname } from '@app/navigation';

import Logo from '@public/icon-hedonist-letter.svg';
import IconExit from '@public/icon-exit.svg';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function DashboardLayout({ children, params: { locale } }: Props) {
  const translation = useTranslations('Dashboard');
  const pathname = usePathname();

  const activeSegmentClass = 'bg-color-secondary text-color-primary'

  const activeSection = useMemo(() => (
    pathname
      .replace('/dashboard', '')
      .split('/')
      .filter(Boolean)
      .at(0)
  ), [pathname]);

  return (
    <div className="p-5 min-h-svh flex bg-color-secondary gap-8">
      <aside className="w-[15rem] p-3 flex flex-col gap-3 justify-between bg-color-primary rounded-3xl">
        <div className="flex flex-col gap-5">
          <Link
            className="mx-4 mt-4 flex gap-2 items-center"
            href="/"
            locale={locale as Locale}
          >
            <Logo className="inline-block" />
            <span className="text-lg">{translation('appTitle')}</span>
          </Link>

          <menu className="flex flex-col gap-3">
            {[...Object.values(DashboardSections)].map((section) => (
              <Link
                className={`block px-4 py-3 text-sm rounded-xl ${activeSection === section ? activeSegmentClass : ''}`}
                key={section}
                href={`/dashboard/${section}`}
                locale={locale as Locale}
              >
                {translation(`section.${section}.title`)}
              </Link>
            ))}
          </menu>
        </div>
        <section className="m-4 flex flex-col gap-3 items-start">
          <LocaleSwitcher />
          <span className="flex gap-1">
            <Button onClick={() => signOut()}>
              <span className="inline-flex gap-1 items-center">
                <IconExit />
                <span className="text-sm">{translation('logout')}</span>
              </span>
            </Button>
          </span>
        </section>
      </aside>

      <section className="flex-auto flex flex-col gap-2 text-color-primary font-semibold">
        {children}
      </section>
    </div>
  )
}