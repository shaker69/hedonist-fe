import { getConfigs } from "@app/actions";
import SectionAbout from "./SectionAbout";

export default async function AboutUsPage() {
  const configs = await getConfigs().catch(() => ({}));

  return (
    <SectionAbout configs={configs} />
  )
}