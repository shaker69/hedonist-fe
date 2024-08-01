import { menuItems } from "@app/mocks"

export const getMenuItem = async (id: string): Promise<MenuItem | undefined | never> => {
  return menuItems.find((item) => id === item.id);
}
