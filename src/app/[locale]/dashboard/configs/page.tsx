import { getAllTags, getConfigs } from "@app/actions";

import SectionConfigs from "./SectionConfigs";

export default async function AboutUsPage() {
  const configs = await getConfigs().catch(() => ({}));
  const tags = await getAllTags();

  return (
    <SectionConfigs
      configs={configs}
      tags={tags}
    />
  )
}