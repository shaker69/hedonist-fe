import Image from 'next/image';
import { useTranslations } from 'next-intl';

import ContentHolder from './ContentHolder';

import logo2 from '../../public/logo-2.svg';

export default function Footer () {
  const translation = useTranslations('Header');

  return (
    <footer className="flex-auto flex justify-center bg-color-secondary py-4 text-color-primary z-10">
      <ContentHolder className="flex flex-col items-center gap-2">
        <Image
          src={logo2}
          alt="hedonist-logo"
        />

        {/* TODO: store on the DB */}
        <section className="flex flex-col items-center text-xs gap-2">
          <span>9:00 - 21:00</span>
          <span>{translation('address')}</span>
        </section>
      </ContentHolder>
    </footer>
  );
}