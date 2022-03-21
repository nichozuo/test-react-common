import { MyModalForm } from '@nichozuo/react-common';
import XRadioGroup from '@/components/XRadioGroup';
import XTreeSelect from '@/components/XTreeSelect';
import { ProFormSwitch, ProFormText } from '@ant-design/pro-form';

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <XTreeSelect.SysPermissions />
      <ProFormText name="name" placeholder="菜单名称" label="菜单名称" />
      <XRadioGroup.SysPermissionsType />
      <ProFormText name="url" placeholder="链接" label="菜单链接" />
      <ProFormText name="permission" placeholder="按钮授权" label="按钮授权" />
      <ProFormText name="icon" placeholder="复制下方图标" label="图标设置" />
      <ProFormSwitch name="show_in_menu" label="菜单中显示" />
    </MyModalForm>
  );
};
