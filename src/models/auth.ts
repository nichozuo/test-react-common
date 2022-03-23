import type { Effect, Reducer } from 'umi';
import { request, history } from 'umi';
import { message } from 'antd';

type ModelsAuthType = {
  namespace: 'auth';
  state: ModelsAuthStateType;
  effects: {
    login: Effect;
    me: Effect;
    logout: Effect;
  };
  reducers: {
    setState: Reducer<ModelsAuthStateType>;
  };
};

const TOKEN_NAME = process.env.TOKEN_NAME as string;

const AuthModel: ModelsAuthType = {
  namespace: 'auth',

  state: {
    user: undefined, // 用户信息
    permissions: [], // 权限信息
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(async () => {
        try {
          return await request('auth/login', { data: payload });
        } catch {
          return undefined;
        }
      });

      // console.log('login effect res:::', res);
      if (res) {
        localStorage.setItem(TOKEN_NAME, res.data.token.access_token);
        yield put({
          type: 'setState',
          payload: res.data,
        });
        message.success('登录成功！');
        history.push('/welcome');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *me({ _ }, { call, put }) {
      const res = yield call(async () => {
        try {
          return await request('auth/me');
        } catch {
          return undefined;
        }
      });

      // console.log('me effect res', res);
      if (res) {
        yield put({
          type: 'setState',
          payload: res.data,
        });
        if (['', '/', '/login'].includes(history.location.pathname))
          history.push('/welcome');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *logout({ _ }, { _1, put }) {
      localStorage.removeItem(TOKEN_NAME);
      yield put({
        type: 'setState',
        payload: {
          user: undefined,
          permissions: [],
        },
      });
      message.success('您已退出系统，感谢您的使用！');
      history.push('/login');
    },
  },
  reducers: {
    setState: (_, { payload }) => {
      return {
        user: payload.user,
        permissions: payload.permissions,
      };
    },
  },
};

export default AuthModel;
