import { MyColorPicker, MyModalForm } from '@/common';
import { ProFormText } from '@ant-design/pro-form';

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText name="name" placeholder="角色名称" label="角色名称" />
      <MyColorPicker name="color" label="选择颜色" />
    </MyModalForm>
  );
};
