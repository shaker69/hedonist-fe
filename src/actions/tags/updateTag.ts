'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const updateTag = async (tag: Tag, { revalidatePaths = [] }: ActionOptions = {}): Promise<Tag | never> => {
  const res = await httpClient.put(`tags/${tag.TagId}`, { body: JSON.stringify(tag) }).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as Tag;
}
