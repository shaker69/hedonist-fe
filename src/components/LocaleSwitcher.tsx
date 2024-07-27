import { useLocale, useTranslations } from 'next-intl';

import { Link, locales, usePathname } from '../navigation';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();

  return locales.filter((l) => l !== locale).map((l) => {
    return (
      <Link
        key={l}
        href={pathname}
        locale={l}
      >
        {t('switchLocale', { locale: l })}
      </Link>
    );
  })

}
