import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['ru', 'en', 'ka'] as const;
export const defaultLocale = 'en';
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({locales});
