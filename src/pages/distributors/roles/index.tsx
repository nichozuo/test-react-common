import { usePage } from '@/hooks/usePage';
import { QueryFilter, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  MyEditButton,
  MyModal,
  MyPagination,
  MySoftDeleteButton,
  MyStatistic,
} from '@nichozuo/react-common';
import { Button } from 'antd';

export default () => {
  const { pagination, statistic, search, table, modal } = usePage();

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
        title: '操作',
        key: 'action',
        valueType: 'option',
        render: (_: any, record: any) => [
          <MyEditButton
            onClick={() => {
              //   modalRef.current?.showModal({
              //     type: 'update',
              //     title: '编辑角色',
              //   });
              //   setUpdateData(record);
            }}
          />,
          <MySoftDeleteButton
            deleted_at={record.deleted_at}
            onConfirm={() => console.log('onConfirm')}
          />,
        ],
      },
    ] as any[],
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
              create: <h1>create</h1>,
              update: <h1>update</h1>,
              permission: <h1>permission</h1>,
            }}
          />
        </>
      }
    />
  );
};
