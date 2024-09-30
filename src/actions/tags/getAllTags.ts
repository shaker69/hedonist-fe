'use server'

import httpClient from "../../utils/ky";

export const getAllTags = async (): Promise<Tag[] | never> => {
  return httpClient.get('tags').json();
}
