import { MyModalForm } from '@nichozuo/react-common';
import { MyModalDataContext } from '@nichozuo/react-common';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form';
import { useContext, useEffect, useRef } from 'react';

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue({ ...item });
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText name="phone_number" label="手机号" />
      <ProFormText name="real_name" label="真实姓名" />
    </MyModalForm>
  );
};
