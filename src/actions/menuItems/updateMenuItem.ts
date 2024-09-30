'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const updateMenuItem = async (menuItem: MenuItem, { revalidatePaths = [] }: ActionOptions = {}): Promise<MenuItem> => {
  const res = await httpClient.put(`menu-items/${menuItem.MenuItemId}`, { body: JSON.stringify(menuItem) }).json();
  
  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return res as MenuItem;
}
