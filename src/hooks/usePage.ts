import { ProFormInstance } from '@ant-design/pro-form';
import { ProTableProps } from '@ant-design/pro-table';
import { useEffect, useRef, useState } from 'react';
import type { ValueType } from 'rc-cascader/lib/Cascader';
import { request, history } from 'umi';
import { getDataFromParams, getParamsFromUrl, getUrl } from '@/utils/params';
import { message } from 'antd';

type IProps = {
  baseUri: string;
  uris?: {
    [key: string]: any;
  };
  defaultParams?: ParamsType['search']; // search参数
};

export const usePage = ({ baseUri, uris, defaultParams }: IProps) => {
  const [resData, setResData] = useState<ResDataType>();

  const [params, setParams] = useState<ParamsType>({
    search: undefined,
    table: undefined,
    pagination: undefined,
  });

  const pagination = {
    key: 'pagination',
    meta: resData?.meta,
    onChange: () => {},
  };

  const statistic = {
    items: resData?.additions?.statistics,
  };

  const search = {
    formRef: useRef<ProFormInstance>(),
    onFinish: (values: any) => {
      setParams({
        ...params,
        search: values,
      });
      return Promise.resolve();
    },
    onReset: () => {
      setParams({
        ...params,
        search: undefined,
      });
    },
  };

  const table: ProTableProps<Record<string, any>, ValueType, 'text'> = {
    rowKey: 'id',
    pagination: false,
    search: false,
    defaultSize: 'small',
    dataSource: resData?.data,
    options: {
      reload: () => actions.list(),
    },
    onChange: (_1: any, _2: any, sorter: any) => {
      setParams({
        ...params,
        table:
          sorter.order != undefined
            ? { orderBy: [sorter.field, sorter.order] }
            : undefined,
      });
    },
  };

  const modal = {
    ref: useRef<MyModalType>(),
  };

  const actions = {
    list: () => {
      modal.ref?.current?.hideModal();
      request(
        getUrl(baseUri, uris?.list, 'list'),
        getDataFromParams(params),
      ).then((res) => {
        setResData(res);
      });
    },
    // softDelete: (data: any) => {
    //   if(data.deleted_at)
    //   request(getUrl(baseUri, uris?.delete, 'delete'), data).then(() =>
    //     message.success('软删除成功！'),
    //   );
    // },
    delete: (data: any) => {
      request(getUrl(baseUri, uris?.delete, 'delete'), { data: data }).then(
        () => {
          message.success('删除成功！');
          actions.list();
        },
      );
    },
  };

  useEffect(() => {
    const _params = getParamsFromUrl(history.location.query?.q as string);
    if (_params != undefined || defaultParams) {
      let p = params;
      if (defaultParams) {
        p = { ...p, ...{ search: defaultParams } };
      }
      if (_params != undefined) {
        p = { ...p, ..._params };
      }
      setParams(p);
      if (_params?.search && search.formRef)
        search.formRef.current?.setFieldsValue(_params?.search);
    } else {
      actions.list();
    }
    return () => {
      modal.ref?.current?.hideModal();
    };
  }, []);

  useEffect(() => {
    if (JSON.stringify(params) !== '{}') {
      history.replace({
        query: { q: JSON.stringify(params) },
      });
      actions.list();
    }
  }, [params]);

  return {
    pagination,
    statistic,
    search,
    table,
    modal,
    actions,
  };
};
