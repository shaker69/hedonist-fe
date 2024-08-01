import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Link, locales, usePathname } from '../navigation';
import { Dropdown } from './Dropdown';

/* TODO: right now translations are not required */
const labelsMap = {
  en: 'En',
  ka: 'Ka',
  ru: 'Ru',
}

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();

  const formatOption = useCallback((option: DropdownOption<Locale>) => {
    return (
      <Link
        key={option.value}
        href={pathname}
        locale={option.value}
        className="block w-full px-6 py-2 text-sm text-color-primary"
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
    />
  )
}
