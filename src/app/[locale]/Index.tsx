'use client'

import Image from 'next/image';
import { Session } from 'next-auth';

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

import chips from '@public/chips.svg?url';

import './index.css';

type Props = {
  session: Session | null;
  // TODO: specify interface
  menu: any;
};

export default function Index({ session, menu }: Props) {
  const { isGrid } = useViewContext();

  return (
    <PageLayout>
      <Header withLayoutSwitcher />

      <div className="h-8 w-full bg-red bg-color-secondary rounded-t-[2rem]" />

      <Tags className="px-4 sticky -top-[1px] z-[999]" />

      <main className="flex-auto flex justify-center bg-color-secondary px-4 py-8 pb-20 text-color-primary overflow-hidden z-20">
        <ContentHolder className="flex flex-col gap-10">
          {menu.map(({ id, name, isAllDay, items, description }: Menu, catIndx: number) => (
            <ul
              key={id}
              className="relative flex flex-col gap-5"
            >
                <hgroup className="flex flex-col gap-1 z-10">
                <div className="flex z-10">
                  <div className="relative">
                    <h2 className={`category category-${catIndx} inline-block uppercase font-bold text-xl leading-6`}>{name}</h2>
            
                    {isAllDay && (
                      <Image
                        className="chips absolute"
                        src={chips}
                        alt={name}
                      />
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
                      key={item.id}
                      id={item.id}
                      className={`menu-item-${itemIndx} z-10 ${isGrid && itemIndx === items.length - 1 && items.length % 2 !== 0 ? 'lastItem' : ''}`}
                      name={item.name}
                      pictureSrc={item.pictureURL}
                      objectPosition={item.objectPosition}
                      ingredients={item.ingredients}
                      isHit={item.hit}
                      subTitle={item.sub}
                      price={item.price}
                      currency={item.currency}
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
          ))}
        </ContentHolder>
      </main>
      <Footer />
      <ScrollToTopButton />
    </PageLayout>
  );
}
