/* eslint-disable react/jsx-key */
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import './index.less';

export type MyLogin1Props = {
  /**
   * 标题
   */
  title: string;
  /**
   * 登录的点击事件
   */
  doLogin: (values: any) => Promise<boolean | void>;
  /**
   * 底部的内容
   */
  footer: React.ReactNode;
};

export const MyLogin1 = (props: MyLogin1Props) => {
  return (
    <>
      <div className="login1-container">
        <div className="form_content">
          <div className="form_title">{props.title}</div>
          <div>
            <LoginForm
              isKeyPressSubmit
              autoFocusFirstInput
              onFinish={props.doLogin}
            >
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入登录账号!',
                  },
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </LoginForm>
          </div>
        </div>
      </div>
      <div className="footer_protocol">{props.footer}</div>
    </>
  );
};
