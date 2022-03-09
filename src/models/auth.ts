import { Effect, Reducer, request, history } from 'umi';
import { AUTHORIZATION } from '@/constants/storage';

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

const AuthModel: IAuthModelType = {
  namespace: 'auth',

  state: {
    user: undefined, // 用户信息
    permissions: [], // 权限信息
  },

  effects: {
    *login({ payload }, { call, put }) {
      request('auth/login', { data: payload })
        .then((res) => {
          console.log('effects login', res);
          localStorage.setItem(AUTHORIZATION, res.data.token.access_token);
        })
        .catch((err) => console.log('err', err));
      // 请求登录
      // const { code, data } = yield call(services.login, payload);
      // console.log('login effects', code, data);
      // if (code === 0) {
      //   // 保存token到本地
      //   localStorage.setItem(AUTHORIZATION, data.token.access_token);
      //   // 更新state
      //   yield put({
      //     type: 'setState',
      //     payload: {
      //       user: data.user,
      //       permissions: data.permissions,
      //     },
      //   });
      //   // 跳转
      //   history.push('/welcome');
      // }
    },
    *me({ _ }, { call, put }) {
      console.log('effects me');
      request('auth/me')
        .then((res) => {
          localStorage.setItem(AUTHORIZATION, res.data.token.access_token);
        })
        .catch((err) => console.log('err', err));
    },
  },
  reducers: {
    setState: (state, action) => {
      console.log('action', action);
      return {
        ...state,
        ...action,
      };
    },
  },
};

export default AuthModel;
