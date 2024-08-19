'use client'

import Image from 'next/image';
import { useFormatter, useLocale } from 'next-intl';

import {
  Button,
  ContentHolder,
  LocaleSwitcher,
  PageLayout,
} from '@app/components';
import { useRouter } from '@app/navigation';
import { formatCurrency } from '@app/utils';

import ArrowBack from '@public/icon-arrow-left.svg';

interface Props {
  menuItem?: MenuItem,
};

const formatWeight = (formatter: any, menuItem: MenuItem) => {
  const weight = formatter
    .number(menuItem.Weight, { style: 'unit', unit: 'gram' })
    .replaceAll(' ', '');

  return weight;
}

export default function MenuItemView({ menuItem }: Props) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const formatter = useFormatter();

  return (
    <PageLayout
      component="div"
      className="min-h-svh bg-color-secondary text-color-primary"
    >
      <header>
        <ContentHolder className="pt-5 pb-3 flex items-center justify-between">
          <Button onClick={() => router.back()}>
            <ArrowBack width="24" height="24" />
          </Button>

          <LocaleSwitcher />
        </ContentHolder>
      </header>
      <main>
        {menuItem && (
          <ContentHolder className="">
            <figure className="mb-4 relative h-60 w-full">
              <Image
                src={menuItem.PictureURL}
                alt={menuItem.Name[locale]}
                className="rounded-2xl"
                fill={true}
                objectFit="cover"
              />
            </figure>
            <div className="py-4 flex gap-2 items-end">
              <h1 className="text-xl font-semibold">{menuItem.Name[locale]}</h1>
              {!!menuItem.Weight && <span className="text-sm/[0.75rem] leading-7 text-color-text-secondary">{formatWeight(formatter, menuItem)}</span>}
            </div>
            <p className="py-4">{menuItem.Description?.[locale]}</p>
            <p className="py-4">{menuItem.Subtitle?.[locale]}</p>
            <h2 className="text-xl font-medium">{formatCurrency(formatter, menuItem.Price, menuItem.Currency)}</h2>
          </ContentHolder>
        )}
      </main>
    </PageLayout>
  )
}