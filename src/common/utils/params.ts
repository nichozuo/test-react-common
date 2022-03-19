import _ from 'lodash';

export type ParamsType = {
  search?: Record<string, any>;
  table?: {
    orderBy?: string[];
  };
  pagination?: {
    page: number;
    perPage: number;
    // current_page: number;
    // last_page: number;
    // per_page: number;
    // total: number;
  };
};

export const getDataFromParams = (params: ParamsType) => {
  return {
    data: _.assign(params?.search, params?.table, params?.pagination),
  };
};

export const getParamsFromUrl = (
  q: string | undefined,
  defaultParams: Record<string, any> | undefined = undefined,
) => {
  q = q == '{}' || q == undefined ? undefined : JSON.parse(q);
  if (!q && !defaultParams) return undefined;
  else if (!q && defaultParams) return { search: defaultParams };
  else if (q && !defaultParams) return q;
  else return q;
};

export const getUrl = (baseUri: string, uri: string, defaultUri: string) => {
  uri = uri == undefined ? defaultUri : uri;
  return baseUri + '/' + uri;
};
