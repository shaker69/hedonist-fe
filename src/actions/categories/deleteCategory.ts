'use server'

import httpClient from "../../utils/ky";

export const deleteCategory = async (category: Category): Promise<Category | never> => {
  return httpClient.delete(`categories/${category.CategoryId}`).json();
}
