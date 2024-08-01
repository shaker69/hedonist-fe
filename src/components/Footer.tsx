import Image from 'next/image';
import { useTranslations } from 'next-intl';

import ContentHolder from './ContentHolder';

import instagram from '../../public/instagram.svg?url';
import logo2 from '../../public/logo-2.svg?url';

/* TODO: keep on DB */
const socialLinks = [
  {
    src: instagram,
    type: 'instagram',
    link: 'https://www.instagram.com/hedonistbatumi',
  }
]

const SocialNetworks = () => {
  return socialLinks.map(({ link, src, type }) => (
    <a
      href={link}
      key={src}
      target="_blank"
    >
      <Image
        src={instagram}
        alt={type}
      />
    </a>
  ))
};

export default function Footer () {
  const translation = useTranslations('Header');

  return (
    <footer className="flex-auto flex justify-center bg-color-secondary pt-4 pb-8 text-color-primary z-10">
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

        <section>
          <SocialNetworks />
        </section>
      </ContentHolder>
    </footer>
  );
}