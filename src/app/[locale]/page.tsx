import { getServerSession } from 'next-auth';

import {
  getAllTags,
  getConfigs,
  getNormalizedMenu,
} from '@app/actions';

import auth from '../../auth';
import Index from './Index';

type Props = {
  params: { locale: string };
  searchParams: { filter?: string },
};

export default async function IndexPage({
  params: { locale },
  searchParams: { filter },
}: Props) {
  const session = await getServerSession(auth);
  const menu = await getNormalizedMenu(locale as Locale, filter);
  const appConfigs = await getConfigs().catch(() => ({}));
  const filterTags = await getAllTags();

  return (
    <Index
      session={session}
      menu={menu}
      appConfigs={appConfigs}
      filterTags={filterTags}
    />
  );
}
