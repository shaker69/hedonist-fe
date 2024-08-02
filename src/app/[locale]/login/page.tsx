'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

import { PageLayout } from '@app/components';
import { useRouter } from '@app/navigation';

export default function Login() {
  const params = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const router = useRouter();

  const callbackUrl = params.get('callbackUrl');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(event.currentTarget);

    signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    }).then((result) => {
      console.log(result);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl || `/${locale}`);
      }
    });
  }

  return (
    <PageLayout>
      <h1>{t('title')}</h1>

      <form
        action="/api/auth/callback/credentials"
        method="post"
        onSubmit={onSubmit}
        style={{display: 'flex', flexDirection: 'column', gap: 10, width: 300}}
      >
        <label className="flex">
          {t('username')}
          <input name="username" type="text" />
        </label>
        <label className="flex">
          {t('password')}
          <input name="password" type="password" />
        </label>

        {error && <p>{t('error', {error})}</p>}
        <button type="submit">{t('submit')}</button>
      </form>
    </PageLayout>
  );
}
