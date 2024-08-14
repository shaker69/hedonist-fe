'use server'

import httpClient from "../../utils/ky";

export const getAllMenuItems = async (): Promise<MenuItem[]> => {
  return httpClient.get('menu-items').json();
}
