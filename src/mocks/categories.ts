import { tags } from "./tags";

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: {
        en: 'Breakfast',
        ru: 'Завтрак',
        ka: 'საუზმე',
      },
    isAllDay: true,
    tags: [tags[3].id, tags[1].id]
  },
  {
    id: 'cat-2',
    name: {
      en: 'Hokkaido Toasts',
      ru: 'Хоккайдо тосты',
      ka: 'ჰოკაიდოს სადღეგრძელოები',
    },
    description: {
      en: 'served with supremely soft and incredibly fluffy japanese milk bread',
      ru: 'подается с невероятно мягким и невероятно воздушным японским молочным хлебом',
      ka: 'მიირთვით უაღრესად რბილი და წარმოუდგენლად ფუმფულა იაპონური რძის პურით',
    },
    tags: [tags[4].id],
  },
  {
    id: 'cat-3',
    name: {
      en: 'Sandwich',
      ru: 'Сэндвич',
      ka: 'სენდვიჩი',
    },
    description: {
      en: 'served with freshly baked, signature ciabatta',
      ru: 'подается со свежеиспеченной фирменной чиабаттой',
      ka: 'მიირთვით ახლად გამომცხვარ, საფირმო ციაბატასთან ერთად',
    },
    tags: [],
  },
  {
    id: 'cat-4',
    name: {
      en: 'Bakery',
      ru: 'Выпечка',
      ka: 'საცხობი',
    },
    tags: [tags[3].id],
  },
]
