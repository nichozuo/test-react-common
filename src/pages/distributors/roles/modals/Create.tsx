import { request } from 'umi';
import { message } from 'antd';
import { ProFormText } from '@ant-design/pro-form';
import { MyModalForm } from '@nichozuo/react-common';

export default (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        request('sys_roles/store', { data: values }).then(() => {
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
