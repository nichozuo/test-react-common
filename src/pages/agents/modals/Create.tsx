import { MyModalForm } from '@nichozuo/react-common';
import { ProFormText } from '@ant-design/pro-form';

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText name="phone_number" label="手机号" />
      <ProFormText name="real_name" label="真实姓名" />
    </MyModalForm>
  );
};
