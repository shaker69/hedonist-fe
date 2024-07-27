import { getServerSession } from 'next-auth';

import { getNormalizedMenu } from '@app/utils';

import auth from '../../auth';
import Index from './Index';

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  const session = await getServerSession(auth);
  const menu = await getNormalizedMenu(locale as Locale);

  return <Index session={session} menu={menu} />;
}
