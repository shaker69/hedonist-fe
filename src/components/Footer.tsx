import Image from 'next/image';
import { useLocale } from 'next-intl';

import ContentHolder from './ContentHolder';

import instagram from '@public/instagram.svg?url';
import logo2 from '@public/logo-2.svg?url';
import { parseTimeRange } from '@app/utils';

/* TODO: keep on DB */
// const socialLinks = [
//   {
//     src: instagram,
//     type: 'instagram',
//     link: 'https://www.instagram.com/hedonistbatumi',
//   }
// ]

// const SocialNetworks = () => {
//   return socialLinks.map(({ link, src, type }) => (
//     <a
//       href={link}
//       key={src}
//       target="_blank"
//     >
//       <Image
//         src={instagram}
//         alt={type}
//       />
//     </a>
//   ))
// };

interface Props {
  appConfigs: AppConfigs;
}

const getNormalizedWorkingHours = (value: string) => {
  return parseTimeRange(value)
    .map(d => d.format('HH:mm'))
    .join(' - ')
}

export default function Footer({ appConfigs }: Props) {
  const locale = useLocale();

  return (
    <footer className="flex-auto flex justify-center bg-color-secondary pt-4 pb-8 text-color-primary z-10">
      <ContentHolder className="flex flex-col items-center gap-2">
        <Image
          src={logo2}
          alt="hedonist-logo"
        />

        <section className="flex flex-col items-center text-xs gap-2">
          {appConfigs.WorkingHours && <span>{getNormalizedWorkingHours(appConfigs.WorkingHours)}</span>}
          <span>{appConfigs.Address?.[locale]}</span>
        </section>

        <section>
          {/* <SocialNetworks /> */}
          <a
            href={appConfigs.Instagram}
            target="_blank"
          >
            <Image
              src={instagram}
              alt="Instagram"
            />
          </a>
        </section>
      </ContentHolder>
    </footer>
  );
}