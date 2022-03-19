import { useState } from 'react';
import { Menu } from 'antd';
import { MenuItemType } from '../';
import { MyIcon } from '../../MyIcon';

type IProps = {
  /**
   * 菜单数据
   */
  menus: MenuItemType[];
  /**
   * 默认选中的
   */
  defaultSelectedKeys: string[];
  /**
   * 点击菜单事件
   */
  onChange: (e: any) => void;
};

export default (props: IProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    props.defaultSelectedKeys,
  );

  return (
    <>
      <Menu theme="dark" mode="vertical" selectedKeys={selectedKeys}>
        {props.menus?.map((item: any) => {
          return (
            <Menu.Item
              key={item.id}
              icon={item.icon && <MyIcon size="12" type={item.icon} />}
              onClick={(e: any) => {
                console.log(e, item);
                setSelectedKeys([e.key]);
                props.onChange(item);
              }}
            >
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu>
      )
    </>
  );
};
