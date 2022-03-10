import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { MyIconPark } from '@nichozuo/react-common';

type IProps = {
  menus: MenuType[];
  defaultSelectedKeys: string[];
  onChange: (e: any) => void;
};

export default (props: IProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys(props.defaultSelectedKeys);
  }, [props.defaultSelectedKeys]);

  return (
    <>
      <Menu theme="dark" mode="vertical" selectedKeys={selectedKeys}>
        {props.menus?.map((item: any) => {
          return (
            <Menu.Item
              key={item.id}
              icon={item.icon && <MyIconPark size="12" type={item.icon} />}
              onClick={(e: any) => {
                console.log(e, item);
                setSelectedKeys([e.key]);
                props.onChange(item);
              }}
            >
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
      )
    </>
  );
};
