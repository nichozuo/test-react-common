import _ from 'lodash';

export const getDataFromParams = ({ search, table, page }: any) => {
  return {
    data: _.assign(search, table, page),
  };
};

export const getParamsFromUrl = (q: string) => {
  if (q == '{}' || q == undefined) return undefined;
  const _q = JSON.parse(q);
  return _q;
};

export const getUrl = (baseUri: string, uri: string, defaultUri: string) => {
  uri = uri == undefined ? defaultUri : uri;
  // if (uri == undefined) uri = defaultUri;
  return baseUri + '/' + uri;
};
