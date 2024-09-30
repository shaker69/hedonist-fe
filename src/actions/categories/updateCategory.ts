'use server'

import { revalidatePath } from "next/cache";
import httpClient from "../../utils/ky";

export const updateCategory = async (category: Category, { revalidatePaths = [] }: ActionOptions = {}): Promise<Category | never> => {
  const res = await httpClient.put(`categories/${category.CategoryId}`, { body: JSON.stringify(category) }).json();
  
  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as Category;
}
