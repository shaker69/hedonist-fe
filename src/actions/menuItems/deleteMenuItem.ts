'use server'

import { revalidatePath } from "next/cache";

import httpClient from "../../utils/ky";

export const deleteMenuItem = async (menuItem: MenuItem, { revalidatePaths = [] }: ActionOptions = {}): Promise<boolean> => {
  await httpClient.delete(`menu-items/${menuItem.MenuItemId}`).json();

  revalidatePaths.length && revalidatePaths.forEach((path) => revalidatePath(path));

  return true;
}
