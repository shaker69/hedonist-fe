'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../utils/ky";

export const getSignedUrl = async (fileName: string, fileType: string, revalidatePaths = []): Promise<string> => {
  const response = await httpClient.post(`upload`, { body: JSON.stringify({ fileName, fileType }) }).json();
  const uploadURL = (response as { uploadURL: 'string' }).uploadURL;

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return uploadURL;
}
