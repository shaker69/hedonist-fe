import Image from 'next/image';
import { useTranslations } from 'next-intl';

import logo from '../../public/logo.svg';
import ContentHolder from './ContentHolder';

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

        <section className="flex flex-col items-end text-xs gap-2">
          <span>9:00 - 21:00</span>
          <span>{translation('address')}</span>
        </section>
      </ContentHolder>
    </header>
  );
}
