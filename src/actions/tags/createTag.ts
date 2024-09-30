'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const createTag = async (tag: Omit<Tag, 'TagId'>, { revalidatePaths = [] }: ActionOptions = {}): Promise<Tag | never> => {
  const res = await httpClient.post(`tags`, { body: JSON.stringify(tag) }).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as Tag;
}
