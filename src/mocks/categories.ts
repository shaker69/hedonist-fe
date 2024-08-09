import { tags } from "./tags";

export const categories: Category[] = [
  {
    CategoryId: 'cat-1',
    Name: {
        en: 'Breakfast',
        ru: 'Завтрак',
        ka: 'საუზმე',
      },
    isAllDay: true,
    TagIds: [tags[3].TagId, tags[1].TagId]
  },
  {
    CategoryId: 'cat-2',
    Name: {
      en: 'Hokkaido Toasts',
      ru: 'Хоккайдо тосты',
      ka: 'ჰოკაიდოს სადღეგრძელოები',
    },
    Description: {
      en: 'served with supremely soft and incredibly fluffy japanese milk bread',
      ru: 'подается с невероятно мягким и невероятно воздушным японским молочным хлебом',
      ka: 'მიირთვით უაღრესად რბილი და წარმოუდგენლად ფუმფულა იაპონური რძის პურით',
    },
    TagIds: [tags[4].TagId],
  },
  {
    CategoryId: 'cat-3',
    Name: {
      en: 'Sandwich',
      ru: 'Сэндвич',
      ka: 'სენდვიჩი',
    },
    Description: {
      en: 'served with freshly baked, signature ciabatta',
      ru: 'подается со свежеиспеченной фирменной чиабаттой',
      ka: 'მიირთვით ახლად გამომცხვარ, საფირმო ციაბატასთან ერთად',
    },
    TagIds: [],
  },
  {
    CategoryId: 'cat-4',
    Name: {
      en: 'Bakery',
      ru: 'Выпечка',
      ka: 'საცხობი',
    },
    TagIds: [tags[3].TagId],
  },
]
