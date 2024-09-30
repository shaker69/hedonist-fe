'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const createMenuItem = async (menuItem: Omit<MenuItem, 'MenuItemId'>, { revalidatePaths = [] }: ActionOptions = {}): Promise<MenuItem> => {
  const res = await httpClient.post(`menu-items`, { body: JSON.stringify(menuItem) }).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as MenuItem;
}
