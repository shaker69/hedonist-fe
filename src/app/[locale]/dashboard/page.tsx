'use client';

import { useTranslations } from 'next-intl';

import { PageLayout } from '@app/components';

export default function Dashboard() {
  const t = useTranslations('Dashboard');

  return (
    <PageLayout>
      <h1>{t('title')}</h1>
    </PageLayout>
  );
}
