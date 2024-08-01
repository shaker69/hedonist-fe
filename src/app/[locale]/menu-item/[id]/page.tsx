import { getMenuItem } from '@app/utils';

import MenuItemView from './MenuItemView';

interface Props {
  params: {
    locale: string;
    id: string;
  }
}

export default async function MenuItemPage({ params }: Props) {
  const menuItem = await getMenuItem(params.id);

  console.log('menuItem', menuItem);

  return (
    <MenuItemView />
  );
}
