import { usePage } from '@/hooks/usePage';
import { QueryFilter, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  MyDeleteButton,
  MyEditButton,
  MyModal,
  MyPagination,
  MySoftDeleteButton,
  MyStatistic,
} from '@nichozuo/react-common';
import { Button } from 'antd';
import { useState } from 'react';
import Create from './modals/Create';
import Update from './modals/Update';

export default () => {
  const { pagination, statistic, search, table, modal, actions } = usePage({
    baseUri: 'sys_roles',
  });

  const [item, setItem] = useState();

  const tableProps = {
    columns: [
      {
        title: 'id',
        dataIndex: 'id',
        search: false,
        sorter: true,
      },
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '设置权限',
        render: (_: any, record: any) => [
          <Button
            key="edit"
            type="primary"
            size="small"
            // onClick={() => {
            //   modalRef.current?.showModal({
            //     type: 'permission',
            //     title: '权限设置',
            //   });
            //   setUpdateData(record);
            // }}
          >
            设置权限
          </Button>,
        ],
      },
      {
        title: '创建时间',
        valueType: 'dateTime',
        dataIndex: 'created_at',
      },
      {
        title: '创建时间',
        valueType: 'dateTime',
        dataIndex: 'updated_at',
      },
      {
        title: '启/禁用',
        align: 'center',
        render: (_: any, record: any) => (
          <MySoftDeleteButton
            deleted_at={record.deleted_at}
            onConfirm={() => console.log('onConfirm')}
          />
        ),
      },
      {
        title: '操作',
        key: 'action',
        valueType: 'option',
        align: 'right',
        render: (_: any, record: any) => [
          <MyEditButton
            key={'edit' + record.id}
            onClick={() => {
              setItem(record);
              modal.ref.current?.showModal({
                type: 'update',
                title: '编辑角色',
              });
            }}
          />,
          <MyDeleteButton
            key={'delete' + record.id}
            onConfirm={() => {
              actions.delete({ id: record.id });
            }}
          />,
        ],
      },
    ] as ProColumns<Record<string, any>, 'text'>[] | undefined,
    toolBarRender: () => [
      <Button
        key="add"
        onClick={() =>
          modal.ref.current?.showModal({
            type: 'create',
            title: '新增角色',
          })
        }
        type="primary"
      >
        新增角色
      </Button>,
    ],
  };
  return (
    <PageContainer
      title="角色管理"
      footer={[<MyPagination {...pagination} />]}
      content={
        <>
          <MyStatistic {...statistic} />
          <QueryFilter {...search}>
            <ProFormText name="name" label="名称" />
          </QueryFilter>
          <ProTable {...table} {...tableProps} />
          <MyModal
            {...modal}
            content={{
              create: <Create onFinish={actions.list} />,
              update: <Update data={item} onFinish={actions.list} />,
              permission: <h1>permission</h1>,
            }}
          />
        </>
      }
    />
  );
};
