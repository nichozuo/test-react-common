import { request } from 'umi';
import { useRef, useEffect } from 'react';
import { message } from 'antd';
import { ProFormText } from '@ant-design/pro-form';
import { MyModalForm } from '@nichozuo/react-common';
import type { ProFormInstance } from '@ant-design/pro-form';

export default (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    formRef?.current?.setFieldsValue({
      name: props.data.name,
      id: props.data.id,
    });
  }, [props.data]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={() => {
        const data = formRef.current?.getFieldFormatValue?.();
        request('sys_roles/update', { data: data }).then(() => {
          props.onFinish();
          message.success('操作成功');
        });
        return Promise.resolve();
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入角色名称',
          },
        ]}
        name="name"
        placeholder="角色名称"
        label="角色"
      />
    </MyModalForm>
  );
};
