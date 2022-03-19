import { ProFormInstance } from '@ant-design/pro-form';
import { ProTableProps } from '@ant-design/pro-table';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import type { ValueType } from 'rc-cascader/lib/Cascader';
import { history } from 'umi';
import { ParamsType } from '../utils/params';

type ResDataType = {
  code: number;
  data: any;
  meta?: any;
  additions?: any;
};

type UsePageProps = {
  resData: ResDataType | undefined;
  params?: ParamsType;
  setParams: Dispatch<SetStateAction<ParamsType>>;
  actions: {
    [key: string]: (...args: any) => void;
  };
};

export const usePage = ({
  resData,
  params,
  setParams,
  actions,
}: UsePageProps) => {
  const pagination = {
    key: 'pagination',
    meta: resData?.meta,
    onChange: (page: number, pageSize: number) => {
      setParams({
        ...params,
        pagination: {
          page: page,
          perPage: pageSize,
        },
      });
    },
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
        search: {},
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
            : {},
      });
    },
  };

  const columns = {
    id: {
      title: 'id',
      dataIndex: 'id',
    },
    created_at: (title: string = '创建时间') => {
      return {
        title: title,
        dataIndex: 'created_at',
      };
    },
  };

  useEffect(() => {
    search.formRef.current?.setFieldsValue(params?.search);
  }, []);

  useEffect(() => {
    if (JSON.stringify(params) !== '{}' && params) {
      history.replace({
        query: { q: JSON.stringify(params) },
      });
    }
    actions.list();
  }, [params]);

  return {
    pagination,
    statistic,
    search,
    table,
    columns,
  };
};
