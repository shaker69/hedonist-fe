'use server'

import { revalidatePath } from "next/cache";
import httpClient from "../../utils/ky";

export const createCategory = async (category: Omit<Category, 'CategoryId'>, { revalidatePaths = [] }: ActionOptions = {}): Promise<Category> => {
  const res = await httpClient.post(`categories`, { body: JSON.stringify(category) }).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as Category;
}
