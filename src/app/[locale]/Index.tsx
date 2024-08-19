'use client'

import Image from 'next/image';
import { Session } from 'next-auth';
import { useLocale, useTranslations } from 'next-intl';

import {
  ContentHolder,
  Footer,
  Header,
  MenuItem,
  PageLayout,
  Rune,
  ScrollToTopButton,
  Tags,
} from '@app/components';
import { useViewContext } from '@app/contexts';

import chipsEn from '@public/all-day-en.svg';
import chipsRu from '@public/all-day-ru.svg';
import chipsKa from '@public/all-day-ka.svg';

import './index.css';

type Props = {
  session: Session | null;
  // TODO: specify interface
  menu: any;
  appConfigs: AppConfigs;
  filterTags: Tag[];
};

const chipsMap = {
  en: chipsEn,
  ru: chipsRu,
  ka: chipsKa,
}

export default function Index({ appConfigs, session, menu, filterTags }: Props) {
  const { isGrid } = useViewContext();
  const locale = useLocale() as Locale;
  const translation = useTranslations();

  const Chips = chipsMap[locale] || chipsEn;

  return (
    <PageLayout>
      <Header withLayoutSwitcher />

      <div className="h-8 w-full bg-red bg-color-secondary rounded-t-[2rem]" />

      <Tags
        className="sticky -top-[1px] z-[999]"
        tags={filterTags}
      />

      <main className="flex-auto flex justify-center bg-color-secondary py-8 pb-20 text-color-primary overflow-hidden z-20">
        <ContentHolder className="flex flex-col gap-10">
          {
            Boolean(menu.length)
              ? (
                menu.map(({ CategoryId, name, isAllDay, items, description }: Menu, catIndx: number) => (
                  <ul
                    key={CategoryId}
                    className="relative flex flex-col gap-5"
                  >
                    <hgroup className="flex flex-col gap-1 z-10">
                      <div className="flex z-10">
                        <div className="relative">
                          <h2 className={`category category-${catIndx} inline-block uppercase font-bold text-xl leading-6`}>{name}</h2>

                          {isAllDay && (
                            <Chips className={`chips absolute ${locale}`} />
                          )}
                        </div>
                      </div>

                      {description && <p className="text-xs/[1.1rem] self-end w-8/12 z-10">{description}</p>}

                      {catIndx !== 0 && (
                        <Rune
                          index={catIndx}
                          anchor="category"
                        />
                      )}
                    </hgroup>
                    <div className={`category-items gap-5 z-10`.concat(isGrid ? ' isGrid' : '')}>
                      {items.map((item: any, itemIndx: number, arr) => (
                        <>
                          <MenuItem
                            key={item.MenuItemId}
                            MenuItemId={item.MenuItemId}
                            className={`menu-item-${itemIndx} z-10 ${isGrid && itemIndx === items.length - 1 && items.length % 2 !== 0 ? 'lastItem' : ''}`}
                            name={item.name}
                            PictureURL={item.PictureURL}
                            PictureObjectPosition={item.PictureObjectPosition}
                            isRecommended={item.isRecommended}
                            subTitle={item.sub}
                            Price={item.Price}
                            Currency={item.Currency}
                          />

                          {itemIndx === arr.length - 1 && (
                            <Rune
                              index={catIndx}
                              anchor="menu-item"
                            />
                          )}
                        </>
                      ))}
                    </div>
                  </ul>
                ))
              )
              : (
                <p className='flex-auto flex justify-center items-center font-semibold text-gray-500'>
                  {translation('Index.empty')}
                </p>
              )
          }
        </ContentHolder>
      </main>
      <Footer appConfigs={appConfigs} />
      <ScrollToTopButton />
    </PageLayout>
  );
}
