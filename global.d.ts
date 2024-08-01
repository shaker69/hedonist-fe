import en from './translations/en.json';

type Messages = typeof en;

declare global {
  declare module '*.svg' {
    import { FC, SVGProps } from 'react'
    const content: FC<SVGProps<SVGElement>>
    export default content
  }
  
  declare module '*.svg?url' {
    const content: any
    export default content
  }

  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  type Locale = 'en' | 'ru' | 'ka';

  interface Translations {
    en: string;
    ru: string;
    ka: string;
  }

  interface Category {
    id: string;
    name: Translations;
    description?: Translations;
    isAllDay?: boolean;
  }

  interface Ingredient {
    id: string;
    name: Translations;
    description?: Translations;
  }

  interface MenuItem {
    id: string;
    name: Translations;
    description?: Translations,
    sub?: Translations;
    categoryIds: string[];
    ingredientIds: string[];
    pictureURL: string;
    objectPosition?: [number, number];
    price: number;
    currency?: string;
    weight?: number | null;
    rating?: number;
    hit?: boolean;
  }

  interface Menu extends Category {
    name: string;
    description: string;
    items: MenuItem & {
      name: string,
      description?: string,
      sub?: string,
      ingredients: (string | undefined)[],
    }[]
  }
}