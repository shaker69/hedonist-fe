import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Link, locales, usePathname } from '../navigation';
import { Dropdown } from './Dropdown';
import { useSearchParams } from 'next/navigation';

/* TODO: right now translations are not required */
const labelsMap = {
  en: 'En',
  ka: 'Ge',
  ru: 'Ru',
}

interface Props {
  className?: string;
}

export default function LocaleSwitcher({ className }: Props) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formatOption = useCallback((option: DropdownOption) => {
    return (
      <Link
        key={option.value}
        href={`${pathname}?${searchParams.toString()}`}
        locale={option.value}
        className={`
          block
          w-[4.4rem]
          pl-4
          py-2
          text-sm
          text-color-primary
          first:rounded-t-xs
          first:pt-3
          last:rounded-b-xs
          last:pb-3
          hover:bg-[#e6e6e6]
          active:bg-[#d1d1d1]
        `}
      >
        {labelsMap[option.value as Locale]}
      </Link>
    );
  }, [pathname, searchParams]);

  const options = useMemo(() => {
    return locales.map((l) => ({
      label: labelsMap[l],
      value: l,
    }));
  }, []);

  return (
    <Dropdown
      options={options}
      formatOption={formatOption}
      initialSelected={locale}
      className={`w-[4.5rem]`.concat(className ? ` ${className}` : '')}
    />
  )
}
