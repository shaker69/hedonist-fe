import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import {
  ContentHolder,
  Footer,
  MenuItem,
  PageLayout,
  Rune,
  Tags,
} from '@app/components';

import chips from '../../../public/chips.svg';
import './index.css';

type Props = {
  session: Session | null;
  // TODO: specify interface
  menu: any;
};

export default function Index({ session, menu }: Props) {
  // TODO: an example - remove later
  // const translation = useTranslations('Index');
  // const locale = useLocale();

  // function onLogoutClick() {
  //   signOut();
  // }

  return (
    <PageLayout>
      <Tags className="p-4 sticky -top-[1px] z-[999]" />

      <main className="flex-auto flex justify-center bg-color-secondary px-4 py-8 text-color-primary overflow-hidden z-20 pb-20">
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
              <div className="category-items gap-5 z-10">
                {items.map((item: any, itemIndx: number, arr) => (
                  <>
                    <MenuItem
                      key={item.id}
                      className={`menu-item-${itemIndx} z-10`}
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
      {/* TODO: remove this part of code */}
      {/* {session ? (
        <>
          <p>{translation('loggedIn', {username: session.user?.name})}</p>
          <p>
            <Link href={locale + '/secret'}>{translation('secret')}</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            {translation('logout')}
          </button>
        </>
      ) : (
        <>
          <p>{translation('loggedOut')}</p>
          <Link href={locale + '/login'}>{translation('login')}</Link>
        </>
      )} */}

      <Footer />
    </PageLayout>
  );
}
