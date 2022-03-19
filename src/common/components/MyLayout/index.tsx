import React, { useRef, useState } from 'react';
import { useHistory } from 'umi';
import { MyModal, MyModalRefType } from '../MyModal';
import StyleOne from './StyleOne';

export type MyLayoutProps = {
  /**
   * 登录态
   */
  auth: { user?: any; permissions?: any };
  /**
   * 初始化一次的pathname
   */
  initPathname?: string;
  /**
   * 基本设置
   */
  setting?: {
    title?: string;
    logo?: string;
  };
  /**
   * 子组件
   */
  children: any;
  /**
   * 退出登录的方法
   */
  onLogout: () => void;
  /**
   * 子菜单点击事件
   */
  onSubMenuClick: (url: string) => void;
};

export type MenuItemType = {
  id: number;
  name: string;
  title: string;
  type: string;
  url: string;
  icon: string;
  _lft: number;
  parent_id: null | number;
  // permission: null | string;
  children: MenuItemType[];
};

export const MyModalRefContext = React.createContext({});

export const MyLayout = (props: MyLayoutProps) => {
  const { location } = useHistory();
  const [pathname] = useState(() => location.pathname);

  const ref = useRef<MyModalRefType>();

  return (
    <MyModalRefContext.Provider value={ref}>
      <MyModal ref={ref} />
      <StyleOne {...props} initPathname={pathname} />
    </MyModalRefContext.Provider>
  );
};
