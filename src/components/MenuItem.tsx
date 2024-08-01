import Image from 'next/image';
import { useTranslations, useFormatter } from 'next-intl';

import { useRouter } from '@app/navigation';
import imagePlaceholder from '../../public/image-placeholder.svg?url';
import emoji from '../../public/emoji.png';

interface Props {
  id: string,
  name: string,
  className?: string,
  pictureSrc?: string,
  objectPosition?: [number, number]
  ingredients?: string[],
  subTitle?: string,
  isHit?: boolean,
  price: number,
  currency?: string,
}

export default function MenuItem({
  className = '',
  name,
  id,
  ingredients,
  pictureSrc,
  objectPosition,
  subTitle,
  price,
  currency = 'GEL',
  isHit,
}: Props) {
  const ingredientsString = ingredients?.join(', ');
  const format = useFormatter();
  const router = useRouter();

  const objectPosisionClass = objectPosition
    ? `object-[${objectPosition[0]}px]`
    : '';

  return (
    <figure
      className={`${className} h-60 max-w-sm relative bg-slate-600 rounded-2xl`}
      onClick={() => router.push(`/menu-item/${id}`)}
    >
      <Image
        className={`max-h-full rounded-2xl ${objectPosisionClass}`}
        // priority
        src={pictureSrc || imagePlaceholder}
        // width={250}
        // height={180}
        layout="fill"
        objectFit="cover"
        alt={name}
      />

      <figcaption className="absolute bottom-0 bg-color-primary text-color-secondary rounded-2xl w-full">
        <section className="relative px-4 py-3 flex flex-col gap-1">
          {isHit && (
            <Image
              className="absolute -top-5 -right-2 w-10 h-10 rotate-12"
              priority
              src={emoji}
              alt={name}
            />
          )}

          <h3 className="font-medium text-sm/[17px]">{name}</h3>
          {!!ingredientsString?.length && <p className="text-xxs/[0.75rem] text-color-text-secondary">{ingredientsString}</p>}
          {!!subTitle?.length && <p className="text-xxs/[0.75rem] text-color-text-secondary">{subTitle}</p>}
          <p className="font-medium text-sm/[17px]">{format.number(price, { style: 'currency', currency }).replace('GEL', '₾')}</p>
        </section>
      </figcaption>
    </figure>
  );
}
