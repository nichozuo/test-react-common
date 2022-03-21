import { MyProFormTree } from '@nichozuo/react-common';
import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

const SysPermissions: React.FC<ProFormFieldItemProps<any>> = ({
  ...rest
}: ProFormFieldItemProps<any>) => {
  const [treeData, setTreeData] = useState<any[]>([]);

  useEffect(() => {
    request('sys_permissions/tree').then((res) => {
      setTreeData(res.data);
    });
  }, []);

  return (
    <Form.Item name="permissions_ids" label="选择菜单">
      <MyProFormTree treeData={treeData} {...rest} />
    </Form.Item>
  );
};

const XTree: {
  SysPermissions: typeof SysPermissions;
} = {} as any;

XTree.SysPermissions = SysPermissions;

export default XTree;
