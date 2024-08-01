'use client'

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import PageLayout from '@app/components/PageLayout';

interface Props {
  session: Session | null;
}

export default function Dashboard({ session }: Props) {
  const translation = useTranslations('Dashboard');
  const locale = useLocale();

  function onLogoutClick() {
    signOut();
  }

  return (
    <PageLayout>
      <main className="min-h-svh bg-color-secondary">
        <section className="height-40 w-20 bg-color-primary">
          <h1>{translation('title')}</h1>

          {session ? (
            <>
              <button onClick={onLogoutClick} type="button">
                {translation('logout')}
              </button>
            </>
          ) : (
            <>
              who are you?
            </>
          )}
        </section>
      </main>
    </PageLayout>
  );
}
