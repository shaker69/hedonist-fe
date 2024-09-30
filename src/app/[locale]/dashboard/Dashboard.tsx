'use client'

import { Session } from 'next-auth';
import { useLocale, useTranslations } from 'next-intl';

import PageLayout from '@app/components/PageLayout';

interface Props {
  session: Session | null;
  params?: {
    section?: string;
  }
}

export default function Dashboard({ session, params }: Props) {
  const translation = useTranslations('Dashboard');
  const locale = useLocale() as Locale;

  return (
    <PageLayout>
      <main className="flex-auto">
        <h1>{translation('title')}</h1>

        
      </main>
    </PageLayout>
  );
}
