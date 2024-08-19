import Image from 'next/image';
import { useFormatter } from 'next-intl';
import { useCallback } from 'react';

import { useRouter } from '@app/navigation';
import { formatCurrency } from '@app/utils';

import imagePlaceholder from '@public/image-placeholder.svg?url';
import emoji from '@public/emoji.png';

interface Props extends Partial<MenuItem> {
  className?: string;
  subTitle?: string;
  name: string;
}

export default function MenuItem({
  className = '',
  name,
  MenuItemId,
  subTitle,
  PictureURL,
  PictureObjectPosition,
  Price,
  Currency = 'GEL',
  isRecommended,
}: Props) {
  // const ingredientsString = ingredients?.join(', ');
  const format = useFormatter();
  const router = useRouter();

  const objectPosisionClass = PictureObjectPosition
    ? `object-[${PictureObjectPosition[0]}px]`
    : '';

  const openMenuItemDetails = useCallback(() => router.push(`/menu-item/${MenuItemId}`), [MenuItemId, router])

  return (
    <figure
      className={`${className} h-60 max-w-sm relative bg-slate-600 rounded-2xl`}
      // onClick={openMenuItemDetails}
      onKeyUp={(e) => {
        e.preventDefault();
        ['Enter', ' '].includes(e.key) && openMenuItemDetails()
      }}
      tabIndex={1}
    >
      <Image
        className={`max-h-full rounded-2xl ${objectPosisionClass}`}
        // priority
        src={PictureURL || imagePlaceholder}
        // width={250}
        // height={180}
        layout="fill"
        objectFit="cover"
        alt={name}
      />

      <figcaption className="absolute bottom-0 bg-color-primary text-color-secondary rounded-2xl w-full">
        <section className="relative px-4 py-3 flex flex-col gap-1">
          {isRecommended && (
            <Image
              className="absolute -top-5 -right-2 w-10 h-10 rotate-12"
              priority
              src={emoji}
              alt={name}
            />
          )}

          <h3 className="font-medium text-sm/[17px]">{name}</h3>
          {/* TODO: requirements says that ingredients stored in subtitle, but... just for future */}
          {/* {!!ingredientsString?.length && <p className="text-xxs/[0.75rem] text-color-text-secondary">{ingredientsString}</p>} */}
          {!!subTitle?.length && <p className="text-xxs/[0.75rem] text-color-text-secondary">{subTitle}</p>}
          <p className="font-medium text-sm/[17px]">{formatCurrency(format, Price, Currency)}</p>
        </section>
      </figcaption>
    </figure>
  );
}
