'use server'

import { sortBy } from "lodash-es";
import { getAllCategories } from "./categories";
import { getAllMenuItems } from "./menuItems";

export const getNormalizedMenu = async (locale: Locale) => {
  const menuItems = await getAllMenuItems().then(data => sortBy(data, ['updatedAt'] ));
  const categories = await getAllCategories().then(data => sortBy(data, ['updatedAt'] ));

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
