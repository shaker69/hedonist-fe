import { getServerSession } from 'next-auth';

import { getNormalizedMenu } from '@app/utils';

import auth from '../../auth';
import Index from './Index';
import { getConfigs } from '@app/actions';

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  const session = await getServerSession(auth);
  const menu = await getNormalizedMenu(locale as Locale);
  const appConfigs = await getConfigs().catch(() => ({}));

  return (
    <Index
      session={session}
      menu={menu}
      appConfigs={appConfigs}
    />
  );
}
