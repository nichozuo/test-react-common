import { MyColorPicker, MyModalForm } from '@nichozuo/react-common';
import XTree from '@/components/XTree';
import { ProFormText } from '@ant-design/pro-form';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { MyJsonEditor } from '@/components/XJsonEditor';
import XSelect from '@/components/XSelect';

type CustomerCtrlType = {
  value?: number[] | any[];
  onChange?: (value: number[] | any[]) => void;
};

const MyTest: React.FC<CustomerCtrlType> = ({
  value,
  onChange,
}: CustomerCtrlType) => {
  const [num1, setNum1] = useState<number | undefined>(() => {
    if (value) return value[0];
  });
  const [num2, setNum2] = useState<number | undefined>(() => {
    if (value) return value[1];
  });

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseInt(e.target.value);
    setNum1(t);
    onChange?.([t, num2]);
  };
  const onChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseInt(e.target.value);
    setNum2(t);
    onChange?.([num1, t]);
  };

  return (
    <>
      <Input value={num1} onChange={onChange1} />
      <Input value={num2} onChange={onChange2} />
    </>
  );
};
export default () => {
  const [type, setType] = useState('普通活动');
  return (
    <MyModalForm
      initialValues={{
        ctrl2: [1234, 4321],
        permissions_id: [7],
        color: 'white',
        type: '普通活动',
      }}
      onFinish={(values: any) => {
        console.log(values);
        return Promise.resolve();
      }}
    >
      <Form.Item label="标准受控组件" name="ctrl1">
        <Input />
      </Form.Item>

      <Form.Item label="自定义简单组件" name="ctrl2">
        <MyTest />
      </Form.Item>

      <XSelect.JsonType onChange={setType} />

      <Form.Item label="设置组件" name="ctrl3">
        <MyJsonEditor type={type} />
      </Form.Item>

      <MyColorPicker name="color" label="选择颜色" />

      <XTree.SysPermissions name="permissions_id" label="勾选权限" />

      <ProFormText name="name" placeholder="角色名称" label="ProForm组件" />
      <p className="text-6xl">
        <a
          href="https://windicss.org/utilities/general/typography.html"
          target="_blank"
          rel="noreferrer"
        >
          Click to visit WindiCSS
        </a>
      </p>
    </MyModalForm>
  );
};
