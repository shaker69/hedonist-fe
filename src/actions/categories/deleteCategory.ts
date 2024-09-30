'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const deleteCategory = async (category: Category, { revalidatePaths = [] }: ActionOptions = {}): Promise<boolean> => {
  await httpClient.delete(`categories/${category.CategoryId}`).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return true;
}
