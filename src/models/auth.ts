import { Effect, Reducer, request, history } from 'umi';
import { AUTHORIZATION } from '@/constants/storage';

type IAuthModelType = {
  namespace: 'auth';
  state: IAuthModelState;
  effects: {
    login: Effect;
    // logout: Effect;
    // me: Effect;
  };
  reducers: {
    setState: Reducer<IAuthModelState>;
  };
};

const services = {
  login: (payload: any) => request('auth/login', { data: payload }),
};

const AuthModel: IAuthModelType = {
  namespace: 'auth',

  state: {
    user: undefined, // 用户信息
    permissions: [], // 权限信息
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log('payload', payload);
      // 请求登录
      const { code, data } = yield call(services.login, payload);
      if (code === 0) {
        // 保存token到本地
        localStorage.setItem(AUTHORIZATION, data.token.access_token);
        // 更新state
        yield put({
          type: 'setState',
          payload: {
            user: data.user,
            permissions: data.permissions,
          },
        });
        // 跳转
        history.push('/welcome');
      }
    },
  },
  reducers: {
    setState: (payload: IAuthModelState | undefined) => {
      return {
        ...payload,
      };
    },
  },
};

export default AuthModel;
