import { MyModalForm } from '@nichozuo/react-common';
import XSelect from '@/components/XSelect';
import { ProFormText } from '@ant-design/pro-form';

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText name="username" placeholder="用户名" label="用户名" />
      <ProFormText.Password name="password" placeholder="密码" label="密码" />
      <XSelect.SysRoles />
    </MyModalForm>
  );
};
