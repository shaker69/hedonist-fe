"use server";

import { sortBy } from "lodash-es";

import {
  RECOMMENDED_TAG_FILTER_INDEX,
  TAG_FILTER_INDEX,
} from "@app/constants";

import { getAllCategories } from "./categories";
import { getAllMenuItems } from "./menuItems";

export const getNormalizedMenu = async (
  locale: Locale,
  searchParams: URLSearchParams
) => {
  const tagsFilter = searchParams.get(TAG_FILTER_INDEX);
  const isRecommendedTag = tagsFilter === RECOMMENDED_TAG_FILTER_INDEX;

  const menuItems = await getAllMenuItems().then((data) => {
    const filteredData = data.filter((item) => {
      if (!tagsFilter) return item;

      const { TagIds, isRecommended } = item;

      return isRecommendedTag ? isRecommended : TagIds?.includes(tagsFilter);
    });

    return sortBy(filteredData, ["createdAt"]);
  });
  const categories = await getAllCategories().then((data) =>
    sortBy(data, ["createdAt"])
  );

  const formattedMenuItems = menuItems.map((menuItem) => ({
    ...menuItem,
    name: menuItem.Name[locale],
    description: menuItem.Description?.[locale],
    sub: menuItem.Subtitle?.[locale],
  }));

  return categories
    .map((category) => {
      const items = formattedMenuItems.filter(({ CategoryIds }) =>
        CategoryIds.includes(category.CategoryId)
      );

      return {
        ...category,
        name: category.Name[locale],
        description: category.Description?.[locale],
        items,
      };
    })
    .filter(({ items }) => Boolean(items.length));
};
