import { ReactNode } from 'react';

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
    [l: string]: string;
  }

  interface Category {
    CategoryId: string;
    Name: Translations;
    Description?: Translations;
    isAllDay?: boolean;
    Icon?: any;
    TagIds: string[];
  }

  interface Ingredient {
    id: string;
    name: Translations;
    description?: Translations;
  }

  interface MenuItem {
    MenuItemId: string;
    Name: Translations;
    Description?: Translations,
    Subtitle?: Translations;
    CategoryIds: string[];
    IngredientIds?: string[];
    PictureURL: string;
    PictureObjectPosition?: [number | string, number | string];
    Price: number;
    Currency?: string;
    Weight?: number | null;
    Rating?: number;
    isRecommended?: boolean;
    TagIds: string[];
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

  interface Tag {
    TagId: string;
    Name: Translations;
  }

  interface DropdownOption<T = any> {
    label: string;
    value: T;
  }

  interface ActionOptions {
    revalidatePaths?: string[];
  }

  interface AppConfigs {
    ConfigId?: string;
    WorkingHours?: string;
    Address?: Translations;
    Instagram?: string;
    TagFilters?: string[];
  }
}