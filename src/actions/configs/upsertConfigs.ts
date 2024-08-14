'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const upsertConfigs = async (configs: AppConfigs, { revalidatePaths = [] }: ActionOptions = {}): Promise<AppConfigs> => {
  const res = await httpClient.post('configs', { body: JSON.stringify(configs) }).json();
  
  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as AppConfigs;
}
