'use server'

import httpClient from "../../utils/ky";

export const updateTag = async (tag: Tag): Promise<Tag[] | undefined | never> => {
  return httpClient.put(`tags/${tag.TagId}`, { body: JSON.stringify(tag) }).json();
}
