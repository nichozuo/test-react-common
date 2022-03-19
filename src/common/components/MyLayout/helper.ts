import { MenuItemType } from './';

/**
 * 点击菜单后，获得keyPath，递归换取对象
 * @param menus
 * @param keyPath
 * @returns
 */
export const getItemByKeyPath = (menus: MenuItemType[], keyPath: string[]) => {
  for (const i1 of menus) {
    if (i1.id.toString() == keyPath[1]) {
      for (const i2 of i1.children) {
        if (i2.id.toString() == keyPath[0]) {
          return i2;
        }
      }
    }
  }
  return {};
};

/**
 * 获取主菜单数据
 * @param items
 * @returns
 */
export const getMainMenus = (items: MenuItemType[]) => {
  return items;
};

/**
 * 通过当前url，获取选中的菜单的树形结构
 * 一般用于刷新后，恢复高亮显示
 * @param pathName
 * @param items
 * @returns
 */
export const getDefaultSelectedKeysFromUrl = (
  pathName: string | undefined,
  items: MenuItemType[],
): string[] => {
  let matched: string[] = [];
  if (!pathName) return matched;
  for (const item of items) {
    // console.log('item:::', item.id, item.title, item.url);
    if (item.children != []) {
      const node = getDefaultSelectedKeysFromUrl(pathName, item.children);
      if (node.length) {
        // console.log('node', node);
        matched = node.concat([item.id.toString()]);
        break;
      }
    }
    if (item.url == pathName) {
      matched.push(item.id.toString());
      break;
    }
  }
  return matched;
};

/**
 * 通过选中的主菜单，获取子菜单数据
 * @param menus
 * @param selectedMainMenu
 * @returns
 */
export const getSubMenusFromSelectedMainMenu = (
  menus: MenuItemType[],
  mainMenuSelectedKey: string,
) => {
  if (!mainMenuSelectedKey) return [];
  let subMenus: MenuItemType[] = [];
  for (const menu of menus) {
    if (menu.id == parseInt(mainMenuSelectedKey)) {
      subMenus = menu.children;
      break;
    }
  }
  return subMenus;
};
