'use server'

import httpClient from "../../utils/ky";

export const createCategory = async (category: Omit<Category, 'CategoryId'>): Promise<Category | never> => {
  return httpClient.post(`categories`, { body: JSON.stringify(category) }).json();
}
