'use server'

import httpClient from "../../utils/ky";

export const getAllCategories = async (): Promise<Category[] | never> => {
  return httpClient.get('categories').json();
}
