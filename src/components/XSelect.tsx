import { MyProFormSelect } from '@/common';
import { request } from 'umi';

const SysRoles = () => {
  const doRequest = async () => {
    const res = await request('sys_roles/select');
    if (res.code == 0) return res.data;
  };

  return (
    <MyProFormSelect
      name="roles_id"
      label="所属角色"
      placeholder="请选择所属角色"
      request={doRequest}
      mode="multiple"
      allowClear
    />
  );
};

const XSelect: {
  SysRoles: typeof SysRoles;
} = {} as any;

XSelect.SysRoles = SysRoles;

export default XSelect;
