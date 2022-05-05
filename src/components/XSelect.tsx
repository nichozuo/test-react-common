import { MyProFormSelect } from '@nichozuo/react-common';
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

const JsonType = (props: any) => {
  const doRequest = () => {
    return [
      {
        id: '普通活动',
        name: '普通活动',
      },
      {
        id: '影子活动',
        name: '影子活动',
      },
    ];
  };

  return (
    <MyProFormSelect
      name="type"
      label="Json组件分类"
      placeholder="请选择"
      request={doRequest}
      allowClear
      fieldProps={{
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      }}
      onChange={props.onChange}
    />
  );
};

const XSelect: {
  SysRoles: typeof SysRoles;
  JsonType: typeof JsonType;
} = {} as any;

XSelect.SysRoles = SysRoles;
XSelect.JsonType = JsonType;

export default XSelect;
