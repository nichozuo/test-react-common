import { ProFormInstance } from '@ant-design/pro-form';
import { ProTableProps } from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import type { ValueType } from 'rc-cascader/lib/Cascader';

export const usePage = () => {
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
      // reload: () => getData(),
    },
    // onChange: handleSort,
  };

  const modal = {
    ref: useRef<MyModalType>(),
  };

  return {
    pagination,
    statistic,
    search,
    table,
    modal,
  };
};
