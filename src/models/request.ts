import { Reducer } from 'umi';

type ModelRequestType = {
  namespace: 'request';
  state: ModelRequestStateType;
  reducers: {
    addCount: Reducer<ModelRequestStateType>;
    subCount: Reducer<ModelRequestStateType>;
  };
};

export default {
  namespace: 'request',
  state: {
    count: 0,
  },
  reducers: {
    addCount: (state) => {
      if (state)
        return {
          count: state.count + 1,
        };
    },
    subCount: (state) => {
      if (state)
        return {
          count: state.count - 1,
        };
    },
  },
} as ModelRequestType;
