import { Reducer } from 'umi';

type IRequestModelType = {
  namespace: 'request';
  state: IRequestModelState;
  reducers: {
    addCount: Reducer<IRequestModelState>;
    subCount: Reducer<IRequestModelState>;
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
} as IRequestModelType;
