import { MyProFormRadioGroup } from '@nichozuo/react-common';

const SysPermissionsType = () => {
  return (
    <MyProFormRadioGroup
      name="type"
      label="菜单类型"
      rules={[
        {
          required: true,
          message: '请选择类型',
        },
      ]}
      options={[
        {
          label: '目录',
          value: '目录',
        },
        {
          label: '页面',
          value: '页面',
        },
        {
          label: '按钮',
          value: '按钮',
        },
      ]}
    />
  );
};

const XRadioGroup: {
  SysPermissionsType: typeof SysPermissionsType;
} = {} as any;

XRadioGroup.SysPermissionsType = SysPermissionsType;

export default XRadioGroup;
