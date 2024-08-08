import { getAllTags, updateTag } from "@app/actions";

import SectionTags from "./SectionTags"

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <SectionTags tags={tags} />
  );
}
