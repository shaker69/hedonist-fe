'use client'

import Image from 'next/image';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

import {
  Button,
  ContentHolder,
  LocaleSwitcher,
  PageLayout,
} from '@app/components';
import { useRouter } from '@app/navigation';
import { formatCurrency } from '@app/utils';

import ArrowBack from '@public/icon-arrow-left.svg';
import imagePlaceholder from '@public/image-placeholder.svg?url';

interface Props {
  menuItem?: MenuItem,
};

const formatWeight = (formatter: any, menuItem: MenuItem, translation: any) => {
  if (typeof menuItem.Weight === 'string') return `${menuItem.Weight}${translation('common.unit.gram.short')}`

  const weight = formatter
    .number(menuItem.Weight, { style: 'unit', unit: 'gram' })
    .replaceAll(' ', '');

  return weight;
}

export default function MenuItemView({ menuItem }: Props) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const formatter = useFormatter();
  const translation = useTranslations();

  return (
    <PageLayout
      component="div"
      className="min-h-svh bg-color-secondary text-color-primary"
    >
      <header>
        <ContentHolder className="py-[15px] flex items-center justify-between">
          <Button onClick={() => router.back()}>
            <ArrowBack width="24" height="24" />
          </Button>

          {/* <LocaleSwitcher /> */}
        </ContentHolder>
      </header>
      <main>
        {menuItem && (
          <ContentHolder className="text-sm">
            <figure className="my-[15px] relative h-60 w-full">
              <Image
                src={menuItem.PictureURL || imagePlaceholder}
                alt={menuItem.Name[locale]}
                className="rounded-2xl"
                fill={true}
                objectFit="cover"
              />
            </figure>
            <div className="mt-6 mb-4 flex gap-2 items-end">
              <h1 className="text-xl font-semibold">{menuItem.Name[locale]}{!!menuItem.Weight && <span className="pl-2.5 text-sm/[0.75rem] leading-7 text-color-text-secondary font-normal">{formatWeight(formatter, menuItem, translation)}</span>}</h1>
            </div>
            {menuItem.Description?.[locale] && <p className="my-4">{menuItem.Description[locale]}</p>}
            {menuItem.Subtitle?.[locale] && <p className="my-4">{translation('common.ingredients')}: {menuItem.Subtitle?.[locale]}</p>}
            <h2 className="text-xl font-medium">{formatCurrency(formatter, menuItem.Price, menuItem.Currency)}</h2>
          </ContentHolder>
        )}
      </main>
    </PageLayout>
  )
}