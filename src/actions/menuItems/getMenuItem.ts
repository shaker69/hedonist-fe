'use server'

import httpClient from "../../utils/ky";

export const getMenuItem = async (menuItemId: string): Promise<MenuItem> => {
  return httpClient.get(`menu-items/${menuItemId}`).json();
}
