import { getAllCategories, getAllMenuItems, getAllTags } from "@app/actions";

const { S3_URL } = process.env;

import SectionMenuItems from "./SectionMenuItems";

export default async function MenuItemsPage() {
  const tags = await getAllTags();
  const categories = await getAllCategories();
  const menuItems = await getAllMenuItems();

  return (
    <SectionMenuItems
      tags={tags}
      categories={categories}
      menuItems={menuItems}
      s3Url={S3_URL!}
    />
  );
};
