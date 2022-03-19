// import { ProFormInstance } from '@ant-design/pro-form';
// import { ProTableProps } from '@ant-design/pro-table';
// import { useEffect, useRef, useState } from 'react';
// import type { ValueType } from 'rc-cascader/lib/Cascader';
// import { request, history } from 'umi';
// import {
//   getDataFromParams,
//   getParamsFromUrl,
//   getUrl,
// } from '@/common/utils/params';
// import { message } from 'antd';

// type IProps = {
//   /**
//    * 请求的地址前面的部分，相当于后端的controllerName
//    */
//   baseUri: string;
//   /**
//    * 请求的地址后面的部分，相当于后端的actionName
//    */
//   uris?: {
//     [key: string]: any;
//   };
//   /**
//    * 默认的参数
//    */
//   defaultParams?: ParamsType['search']; // search参数
// };

// export const usePage = ({ baseUri, uris, defaultParams }: IProps) => {
//   const [resData, setResData] = useState<ResDataType>();

//   const [params, setParams] = useState<ParamsType>(
//     () => getParamsFromUrl(history.location.query?.q as string) as ParamsType,
//   );

//   const pagination = {
//     key: 'pagination',
//     meta: resData?.meta,
//     onChange: (page: number, pageSize: number) => {
//       setParams({
//         ...params,
//         pagination: {
//           page: page,
//           perPage: pageSize,
//         },
//       });
//     },
//   };

//   const statistic = {
//     items: resData?.additions?.statistics,
//   };

//   const search = {
//     formRef: useRef<ProFormInstance>(),
//     onFinish: (values: any) => {
//       setParams({
//         ...params,
//         search: values,
//       });
//       return Promise.resolve();
//     },
//     onReset: () => {
//       setParams({
//         ...params,
//         search: {},
//       });
//     },
//   };

//   const table: ProTableProps<Record<string, any>, ValueType, 'text'> = {
//     rowKey: 'id',
//     pagination: false,
//     search: false,
//     defaultSize: 'small',
//     dataSource: resData?.data,
//     options: {
//       reload: () => actions.list(),
//     },
//     onChange: (_1: any, _2: any, sorter: any) => {
//       setParams({
//         ...params,
//         table:
//           sorter.order != undefined
//             ? { orderBy: [sorter.field, sorter.order] }
//             : {},
//       });
//     },
//   };

//   const modal = {
//     ref: useRef<MyModalType>(),
//   };

//   const actions = {
//     list: () => {
//       modal.ref?.current?.hideModal();
//       request(
//         getUrl(baseUri, uris?.list, 'list'),
//         getDataFromParams(params),
//       ).then((res) => {
//         setResData(res);
//       });
//     },
//     store: (values: any) => {
//       request(getUrl(baseUri, uris?.store, 'store'), { data: values }).then(
//         () => {
//           message.success('操作成功');
//           actions.list();
//         },
//       );
//     },
//     update: (values: any) => {
//       request(getUrl(baseUri, uris?.update, 'update'), { data: values }).then(
//         () => {
//           message.success('操作成功');
//           actions.list();
//         },
//       );
//     },
//     // softDelete: (data: any) => {
//     //   if(data.deleted_at)
//     //   request(getUrl(baseUri, uris?.delete, 'delete'), data).then(() =>
//     //     message.success('软删除成功！'),
//     //   );
//     // },
//     delete: (data: any) => {
//       request(getUrl(baseUri, uris?.delete, 'delete'), { data: data }).then(
//         () => {
//           message.success('删除成功！');
//           actions.list();
//         },
//       );
//     },
//   } as any;

//   useEffect(() => {
//     search.formRef.current?.setFieldsValue(params?.search);
//   }, []);

//   useEffect(() => {
//     console.log('params', params);
//     if (JSON.stringify(params) !== '{}' && params) {
//       history.replace({
//         query: { q: JSON.stringify(params) },
//       });
//     }
//     actions.list();
//   }, [params]);

//   return {
//     pagination,
//     statistic,
//     search,
//     table,
//     modal,
//     actions,
//   };
// };
