import {
  categories,
  // ingredients,
  menuItems,
} from '../mocks';

export const getNormalizedMenu = async (locale: Locale) => {
  // const ingredientsMap = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
  
  const formattedMenuItems = menuItems.map((menuItem) => ({
    ...menuItem,
    name: menuItem.name[locale],
    description: menuItem.description?.[locale],
    sub: menuItem.sub?.[locale],
    // ingredients: (
    //   menuItem.ingredientIds
    //     .map((ingredientId) => ingredientsMap.get(ingredientId)?.name?.[locale])
    //     .filter(Boolean)
    // ),
  }));

  return categories.map((category) => {
    const items = formattedMenuItems.filter(({ categoryIds }) => categoryIds.includes(category.id))

    return {
      ...category,
      name: category.name[locale],
      description: category.description?.[locale],
      items,
    };
  });
};
