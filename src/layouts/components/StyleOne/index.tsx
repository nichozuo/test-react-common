import { ReactNode, useEffect, useState } from 'react';
import { history } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { WaterMark } from '@ant-design/pro-layout';
import MainMenu from './MainMenu';
import SubMenu from './SubMenu';
import './index.less';
import {
  getMainMenus,
  getDefaultSelectedKeysFromUrl,
  getSubMenusFromSelectedMainMenu,
} from '../helper';

type IProps = {
  auth: { user?: any; permissions?: any };
  setting?: {
    title?: string;
  };
  onLogout: () => void;
  children: () => ReactNode;
};

export default ({ auth, setting, onLogout, children }: IProps) => {
  const [mainMenus, setMainMenus] = useState<MenuType[]>([]); // 主菜单数据
  const [subMenus, setSubMenus] = useState<MenuType[]>([]); // 子菜单数据
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]); // 页面刷新时，根据路径获得选中菜单的列表

  useEffect(() => {
    const children = auth.permissions?.children;
    const pathName = history.location.pathname;

    if (children) {
      // 初始化主菜单数据
      setMainMenus(getMainMenus(children));
      // 初始化选中菜单数据
      const arr = getDefaultSelectedKeysFromUrl(pathName, children);
      setDefaultSelectedKeys(arr);
      // 初始化子菜单数据
      const m3 = getSubMenusFromSelectedMainMenu(children, arr[arr.length - 1]);
      if (m3) setSubMenus(m3);
    }
  }, [auth.permissions]);

  const mainMenuOnchange = (item: MenuType) => {
    setSubMenus(item.children);
  };

  return (
    <Layout className="main-layout">
      <Layout.Sider className="sider" width={100}>
        <div className="logo">
          <div className="logo-div">
            <img
              src="data:image/png;base64,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"
              alt="logo"
            />
          </div>
        </div>
        <MainMenu
          menus={mainMenus}
          defaultSelectedKeys={defaultSelectedKeys}
          onChange={mainMenuOnchange}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="header">
          <div className="header-avatar">
            <div className="label">{setting?.title || '后台管理系统'}</div>
            <div className="">
              <Dropdown
                overlay={
                  <Menu
                    onClick={(e: any) => {
                      if (e.key == 'logout') {
                        onLogout();
                      }
                    }}
                  >
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <div className="header-admin-name">
                  <Avatar
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {auth.user?.username}
                  </Avatar>
                  <span className="name">{auth.user?.username}</span>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
          </div>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={150} className="sub-sider">
            <SubMenu
              menus={subMenus}
              defaultSelectedKeys={defaultSelectedKeys}
            />
          </Layout.Sider>
          <Layout.Content>
            <WaterMark
              rotate={-45}
              content={auth.user?.username}
              fontColor="rgba(0,0,0,.15)"
              fontSize={21}
            >
              {children}
            </WaterMark>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
