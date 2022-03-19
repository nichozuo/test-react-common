import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { getItemByKeyPath } from '../helper';
import _ from 'lodash';
import { MenuItemType } from '../';
import { MyIcon } from '../../MyIcon';

type IProps = {
  /**
   * 子菜单的数据
   */
  menus: MenuItemType[];
  /**
   * 默认选中项
   */
  defaultSelectedKeys: string[];
  /**
   * 子菜单点击事件
   */
  onSubMenuClick: (url: string) => void;
};

export default (props: IProps) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    props.defaultSelectedKeys,
  );

  // 展开所有子菜单
  useEffect(() => {
    const k = props.menus?.map((item: { id: any }) => item.id.toString());
    setOpenKeys(k);
  }, [props.menus]);

  // 点击菜单跳转
  const onClick = (e: any) => {
    const item = getItemByKeyPath(props.menus, e.keyPath) as MenuItemType;
    setSelectedKeys([e.key]);
    props.onSubMenuClick(item?.url);
  };

  // 点击收缩/展开子菜单
  const onTitleClick = (e: any) => {
    console.log('openKeys.includes(e.key)', openKeys.includes(e.key));
    if (openKeys.includes(e.key)) {
      setOpenKeys(_.difference(openKeys, [e.key]));
    } else {
      setOpenKeys(openKeys.concat([e.key]));
    }
  };

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClick={onClick}
      >
        {props.menus?.map((item: any) => (
          <Menu.SubMenu
            key={item.id}
            icon={item.icon && <MyIcon type={item.icon} size={12} />}
            title={item.name}
            onTitleClick={onTitleClick}
          >
            {item.children?.map((subItem: any) => {
              return (
                <Menu.Item
                  key={subItem.id}
                  icon={
                    subItem.icon && <MyIcon type={subItem.icon} size={12} />
                  }
                >
                  {subItem.name}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  );
};
