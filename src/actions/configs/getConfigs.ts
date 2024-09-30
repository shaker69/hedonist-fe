'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const getConfigs = async ({ revalidatePaths = [] }: ActionOptions = {}): Promise<AppConfigs> => {
  const res = await httpClient.get('configs').json();
  
  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as AppConfigs;
}
