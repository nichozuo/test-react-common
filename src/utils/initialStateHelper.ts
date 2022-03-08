type IProps = {
  user?: any;
  permissions?: any;
  // me?: () => Promise<any>;
  loading: number;
};

export const addLoading = (
  initialState: IProps | undefined,
  setInitialState: (initialState: any) => Promise<void>,
) => {
  setInitialState((s: any) => ({
    ...s,
    loading: initialState?.loading || 0 + 1,
  }));
};
