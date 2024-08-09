'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const deleteTag = async (tag: Tag, { revalidatePaths = [] }: ActionOptions = {}): Promise<boolean> => {
  await httpClient.delete(`tags/${tag.TagId}`).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return true;
}
