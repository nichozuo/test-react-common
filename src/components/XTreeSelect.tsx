import { MyProFormTreeSelect } from '@nichozuo/react-common';
import { request } from 'umi';

const SysPermissions = () => {
  const doRequest = async () => {
    const res = await request('sys_permissions/tree');
    if (res.code == 0) return res.data;
  };

  return (
    <MyProFormTreeSelect
      name="parent_id"
      label="上级菜单"
      placeholder="请选择上级菜单，不选则为根节点"
      request={doRequest}
    />
  );
};

const XTreeSelect: {
  SysPermissions: typeof SysPermissions;
} = {} as any;

XTreeSelect.SysPermissions = SysPermissions;

export default XTreeSelect;
