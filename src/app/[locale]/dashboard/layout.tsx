'use client'

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ReactNode, useMemo } from 'react';

import { Button, LocaleSwitcher } from '@app/components';
import { DashboardSections } from '@app/constants';
import { Link, usePathname } from '@app/navigation';

import Logo from '@public/icon-hedonist-letter.svg';
import Icon1 from '@public/icon-storefront.svg';
import Icon2 from '@public/icon-location.svg';
import Icon3 from '@public/icon-bell.svg';
import Icon4 from '@public/icon-egg.svg';
import Icon5 from '@public/icon-settings.svg';
import IconExit from '@public/icon-exit.svg';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const iconsMap = {
  [DashboardSections.about]: <Icon1 />,
  [DashboardSections.tags]: <Icon2 />,
  [DashboardSections.categories]: <Icon3 />,
  [DashboardSections.menuItems]: <Icon4 />,
  [DashboardSections.configs]: <Icon5 />,
}

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
      <aside className="w-[18rem] p-3 flex flex-col gap-3 justify-between bg-color-primary rounded-3xl">
        <div className="flex flex-col gap-5">
          <div className="mt-4 flex items-center">
            <Link
              className="flex-auto mx-4 flex gap-2 items-center"
              href="/"
              locale={locale as Locale}
            >
              <Logo className="inline-block" />
              <span className="text-lg">{translation('appTitle')}</span>
            </Link>

            <LocaleSwitcher />
          </div>

          <menu className="flex flex-col gap-3">
            {[...Object.values(DashboardSections)].map((section) => (
              <Link
                className={`block px-4 py-3 text-sm rounded-xl ${activeSection === section ? activeSegmentClass : 'hover:bg-white/30'}`}
                key={section}
                href={`/dashboard/${section}`}
                locale={locale as Locale}
              >
                <span className="flex gap-2 items-center">
                  {iconsMap[section]} {translation(`section.${section}.title`)}
                </span>
              </Link>
            ))}
          </menu>
        </div>
        <section className="flex flex-col gap-3 items-start">
          <Button onClick={() => signOut()}>
            <span className="p-4 rounded-xl inline-flex gap-1 items-center hover:bg-white/30">
              <IconExit />
              <span className="text-sm">{translation('logout')}</span>
            </span>
          </Button>
        </section>
      </aside>

      <section className="flex-auto flex flex-col gap-2 text-color-primary font-semibold">
        {children}
      </section>
    </div>
  )
}