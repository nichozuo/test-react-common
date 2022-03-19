type ModelsState = {
  auth: ModelsAuthStateType;
  request: ModelRequestStateType;
};

type ModelsAuthStateType = {
  user?: any;
  permissions?: any[];
};

type ModelRequestStateType = {
  count: number;
};
