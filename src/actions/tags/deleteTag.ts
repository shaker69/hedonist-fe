'use server'

import httpClient from "../../utils/ky";

export const deleteTag = async (tag: Tag): Promise<Tag | never> => {
  return httpClient.delete(`tags/${tag.TagId}`).json();
}
