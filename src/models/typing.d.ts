type IModelState = {
  auth: IAuthModelState;
  request: IRequestModelState;
};

type IAuthModelState = {
  user?: any;
  permissions?: any[];
};

type IRequestModelState = {
  count: number;
};
