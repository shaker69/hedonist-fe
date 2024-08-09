'use server'

import httpClient from "../../utils/ky";

export const updateCategory = async (category: Category): Promise<Category | never> => {
  return httpClient.put(`categories/${category.CategoryId}`, { body: JSON.stringify(category) }).json();
}
