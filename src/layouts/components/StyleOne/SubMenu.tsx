import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { MyIconPark } from '@nichozuo/react-common';
import { getItemByKeyPath } from '../helper';
import { history } from 'umi';
import _ from 'lodash';

type IProps = {
  menus: MenuType[];
  defaultSelectedKeys: string[];
};

export default (props: IProps) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys(props.defaultSelectedKeys);
  }, [props.defaultSelectedKeys]);

  useEffect(() => {
    // 展开子菜单
    const k = props.menus?.map((item: { id: any }) => item.id.toString());
    setOpenKeys(k);
    // setMenuActive(props.items);
  }, [props.menus]);

  // 点击菜单跳转
  const onClick = (e: any) => {
    const item = getItemByKeyPath(props.menus, e.keyPath) as MenuType;
    setSelectedKeys([e.key]);
    history.push(item?.url);
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
            icon={item.icon && <MyIconPark type={item.icon} size={12} />}
            title={item.title}
            onTitleClick={onTitleClick}
          >
            {item.children?.map((subItem: any) => {
              return (
                <Menu.Item
                  key={subItem.id}
                  icon={
                    subItem.icon && <MyIconPark type={subItem.icon} size={12} />
                  }
                >
                  {subItem.title}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  );
};
