import {
  categories,
  menuItems,
} from '../mocks';

export const getNormalizedMenu = async (locale: Locale) => {
  const formattedMenuItems = menuItems.map((menuItem) => ({
    ...menuItem,
    name: menuItem.Name[locale],
    description: menuItem.Description?.[locale],
    sub: menuItem.Subtitle?.[locale],
  }));

  return categories.map((category) => {
    const items = formattedMenuItems.filter(({ CategoryIds }) => CategoryIds.includes(category.CategoryId))

    return {
      ...category,
      name: category.Name[locale],
      description: category.Description?.[locale],
      items,
    };
  });
};
