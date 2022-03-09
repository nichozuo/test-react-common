import { history, getDvaApp, ErrorShowType } from 'umi';
import { message, notification } from 'antd';
import { AUTHORIZATION } from '@/constants/storage';
import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 20000,
  method: 'POST',
  prefix: process.env.BASE_URL,
  errorHandler: (res: any) => {
    const { code, message: errorMessage, showType } = res || {};
    if (!code && code !== 0) {
      // 没有响应的情况
      const dispatch = getDvaApp()?._store?.dispatch;
      dispatch({
        type: 'request/subCount',
      });
    }
    switch (showType) {
      case ErrorShowType.SILENT:
        // do nothing
        break;
      case ErrorShowType.WARN_MESSAGE:
        message.warn(errorMessage);
        break;
      case ErrorShowType.ERROR_MESSAGE:
        message.error(errorMessage);
        break;
      case ErrorShowType.NOTIFICATION:
        notification.open({
          message: errorMessage,
        });
        break;
      case ErrorShowType.REDIRECT:
        history.push({
          pathname: '/error',
          query: { code, message: errorMessage },
        });
        // redirect to error page
        break;
      default:
        message.error(errorMessage);
        break;
    }
    // console.log('errorHandler', res);
    return Promise.reject({ message: '服务异常' });
  },
  requestInterceptors: [
    (url, options) => {
      const dispatch = getDvaApp()?._store?.dispatch;
      const token = localStorage.getItem(AUTHORIZATION) as string;
      if (dispatch) {
        dispatch({
          type: 'request/addCount',
        });
      }
      return {
        url: url,
        options: { ...options, headers: { authorization: 'Bearer ' + token } },
      };
    },
  ],
  responseInterceptors: [
    async (response) => {
      const dispatch = getDvaApp()?._store?.dispatch;
      if (dispatch) {
        dispatch({
          type: 'request/subCount',
        });
      }

      const data = await response.clone().json();
      // console.log('responseInterceptors', data);
      switch (data.code) {
        case 0:
          return Promise.resolve(data);
        case 10000:
          if (history.location.pathname != '/login') history.push('/login');
          return Promise.reject(data);
        default:
          return Promise.reject(data);
      }
    },
  ],
};

/**
 * 关于初始化的配置
 */
// interface IInitialStateType {
//   user?: any;
//   permissions?: any;
//   me?: () => Promise<any>;
//   loading: number;
// }

// const me = async () => {
//   try {
//     const msg = await requests('auth/me');
//     return msg.data;
//   } catch (error) {
//     history.push('/login');
//   }
//   return undefined;
// };

export async function getInitialState(): Promise<any> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/login') {
    const dispatch = getDvaApp()?._store?.dispatch;
    console.log('getInitialState');
    dispatch({ type: 'auth/me' });
  }
  return {};
}
