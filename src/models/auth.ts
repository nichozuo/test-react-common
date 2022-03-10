import { Effect, Reducer, request, history } from 'umi';

type IAuthModelType = {
  namespace: 'auth';
  state: IAuthModelState;
  effects: {
    login: Effect;
    // logout: Effect;
    me: Effect;
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
      const { code, data } = yield call(() =>
        request('auth/login', { data: payload }),
      );
      if (code == 0) {
        localStorage.setItem(TOKEN_NAME, data.token.access_token);
        yield put({
          type: 'setState',
          payload: data,
        });
        history.push('/welcome');
      }
    },
    *me({ _ }, { call, put }) {
      const { code, data } = yield call(() => request('auth/me'));
      if (code == 0) {
        yield put({
          type: 'setState',
          payload: data,
        });
        if (['', '/', '/login'].includes(history.location.pathname))
          history.push('/welcome');
      }
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
