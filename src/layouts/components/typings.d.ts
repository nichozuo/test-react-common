interface MenuType {
  id: number;
  name: string;
  title: string;
  type: string;
  url: string;
  icon: string;
  _lft: number;
  parent_id: null | number;
  // permission: null | string;
  children: MenuType[];
}
