import { MyColorPicker, MyModalForm } from '@/common';
import { MyModalDataContext } from '@/common/components/MyModal';
import { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { useContext, useEffect, useRef } from 'react';

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText name="name" placeholder="角色名称" label="角色名称" />
      <MyColorPicker name="color" label="选择颜色" />
    </MyModalForm>
  );
};
