import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Link, locales, usePathname } from '../navigation';
import { Dropdown } from './Dropdown';

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

  const formatOption = useCallback((option: DropdownOption<Locale>) => {
    return (
      <Link
        key={option.value}
        href={pathname}
        locale={option.value}
        className="block w-[4.4rem] pl-4 py-2 text-sm text-color-primary"
      >
        {labelsMap[option.value]}
      </Link>
    );
  }, [pathname]);

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
