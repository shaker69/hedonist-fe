'use server'

import httpClient from "../../utils/ky";

export const createTag = async (tag: Omit<Tag, 'TagId'>): Promise<Tag | never> => {
  return httpClient.post(`tags`, { body: JSON.stringify(tag) }).json();
}
