export default {
  namespace: 'count',
  state: {
    count: 0,
  },
  effects: {},
  reducers: {
    addCount: (state: ICountState) => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    subCount: (state: ICountState) => {
      return {
        ...state,
        count: state.count - 1,
      };
    },
  },
};
