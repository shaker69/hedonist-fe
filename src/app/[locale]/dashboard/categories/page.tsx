import { getAllCategories, getAllTags } from "@app/actions";
import SectionCategories from "./SectionCategories";

export default async function CategoriesPage() {
  const tags = await getAllTags();
  const categories = await getAllCategories();

  return (
    <SectionCategories
      categories={categories}
      tags={tags}
    />
  );
};
