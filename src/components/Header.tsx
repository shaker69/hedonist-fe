import Image from 'next/image';
import { useTranslations } from 'next-intl';

import ContentHolder from './ContentHolder';
import LayoutSwitcher from './LayoutSwitcher/LayoutSwitcher';

import logo from '../../public/logo.svg?url';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const translation = useTranslations('Header');

  return (
    <header className="p-4 flex justify-center items-center">
      <ContentHolder className="flex justify-between items-center">
        <Image
          priority
          src={logo}
          alt={translation('logoAlt')}
        />

        <section className="flex gap-2 items-center">
          <LayoutSwitcher />
          <LocaleSwitcher />
        </section>
      </ContentHolder>
    </header>
  );
}
