import { history, getDvaApp } from 'umi';
import { message as msg, notification } from 'antd';
import type { RequestConfig } from 'umi';

const loading = {
  add: () => {
    const dispatch = getDvaApp()?._store?.dispatch;
    if (dispatch) {
      dispatch({
        type: 'request/addCount',
      });
    }
  },
  sub: () => {
    const dispatch = getDvaApp()?._store?.dispatch;
    if (dispatch) {
      dispatch({
        type: 'request/subCount',
      });
    }
  },
};

export type ResponseDataType = {
  code: number;
  message: string;
  description?: string | undefined;
  type?: string | undefined;
  data: any;
  meta?: any;
  additions?: any;
};

export const request = {
  timeout: 20000,
  method: 'POST',
  prefix: process.env.BASE_URL,
  // 统一错误处理
  errorHandler: (error: any) => {
    const { response } = error;
    if (response) {
      const { code, message, description, type } = response as ResponseDataType;
      switch (type) {
        case '2':
          msg.error(message);
          break;
        default:
          notification['error']({
            message: message,
            description: description,
          });
          break;
      }
      switch (code) {
        case 10000:
          history.push('/login');
          break;
      }
    }
    return Promise.reject(response);
  },
  // 错误适配器
  errorConfig: {
    adaptor: (res: any) => {
      return {
        success: res.code == 0,
      };
    },
    errorPage: '/error',
  },
  // 请求拦截，加token
  requestInterceptors: [
    (url, options) => {
      loading.add();
      return {
        url: url,
        options: {
          ...options,
          headers: {
            authorization:
              'Bearer ' +
              localStorage.getItem(process.env.TOKEN_NAME as string),
          },
        },
      };
    },
  ],
  // 响应拦截
  responseInterceptors: [
    async (response) => {
      loading.sub();
      return response;
    },
  ],
} as RequestConfig;
