import {
  categories,
  menuItems,
} from '../mocks';

export const getNormalizedMenu = async (locale: Locale) => {
  const formattedMenuItems = menuItems.map((menuItem) => ({
    ...menuItem,
    name: menuItem.name[locale],
    description: menuItem.description?.[locale],
    sub: menuItem.sub?.[locale],
  }));

  return categories.map((category) => {
    const items = formattedMenuItems.filter(({ categoryIds }) => categoryIds.includes(category.CategoryId))

    return {
      ...category,
      name: category.Name[locale],
      description: category.Description?.[locale],
      items,
    };
  });
};
