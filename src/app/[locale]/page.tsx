import { getServerSession } from 'next-auth';

import {
  getAllTags,
  getConfigs,
  getNormalizedMenu,
} from '@app/actions';

import auth from '../../auth';
import Index from './Index';
import queryString from 'query-string';

type Props = {
  params: { locale: string };
  searchParams: {
    [key: string]: string | string[];
  },
};

export default async function IndexPage({
  params: { locale },
  searchParams,
}: Props) {
  const session = await getServerSession(auth);
  const menu = await getNormalizedMenu(locale as Locale, new URLSearchParams(queryString.stringify(searchParams)));
  const appConfigs = await getConfigs();
  const allTags = await getAllTags();

  const filterTags = appConfigs.TagFilters?.reduce((acc: Tag[], tagId: string) => {
    const tag = allTags.find((tag) => tag.TagId === tagId);

    return tag ? [...acc, tag] : acc;
  }, []);

  return (
    <Index
      session={session}
      menu={menu}
      appConfigs={appConfigs}
      filterTags={filterTags || []}
    />
  );
}
