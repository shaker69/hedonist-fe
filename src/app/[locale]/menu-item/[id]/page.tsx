import { getMenuItem } from '@app/actions';

import MenuItemView from './MenuItemView';

interface Props {
  params: {
    locale: string;
    id: string;
  }
}

export default async function MenuItemPage({ params }: Props) {
  const menuItem = await getMenuItem(params.id);

  return (
    <MenuItemView menuItem={menuItem} />
  );
}
