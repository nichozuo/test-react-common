import { Effect, Reducer, request, history } from 'umi';
import { message } from 'antd';

type IAuthModelType = {
  namespace: 'auth';
  state: IAuthModelState;
  effects: {
    login: Effect;
    me: Effect;
    logout: Effect;
  };
  reducers: {
    setState: Reducer<IAuthModelState>;
  };
};

const TOKEN_NAME = process.env.TOKEN_NAME as string;

const AuthModel: IAuthModelType = {
  namespace: 'auth',

  state: {
    user: undefined, // 用户信息
    permissions: [], // 权限信息
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(async () => {
        try {
          const res = await request('auth/login', { data: payload });
          return res;
        } catch {
          return undefined;
        }
      });

      console.log('login effect res:::', res);
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
    *me({ _ }, { call, put }) {
      const res = yield call(async () => {
        try {
          const res = await request('auth/me');
          return res;
        } catch {
          return undefined;
        }
      });

      console.log('me effect res', res);
      if (res) {
        yield put({
          type: 'setState',
          payload: res.data,
        });
        if (['', '/', '/login'].includes(history.location.pathname))
          history.push('/welcome');
      }
    },
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
