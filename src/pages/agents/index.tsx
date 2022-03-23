import { useActions } from '@nichozuo/react-common';
import { usePage } from '@nichozuo/react-common';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Create } from './modals/Create';
import { Update } from './modals/Update';
import { MyPagination } from '@nichozuo/react-common';
import { ProFormText, QueryFilter } from '@ant-design/pro-form';
import { MyButton } from '@nichozuo/react-common';

export default () => {
  const { resData, params, setParams, actions, modalRef } = useActions({
    baseUri: 'agents',
  });

  const { search, table, pagination, columns } = usePage({
    resData: resData,
    params: params,
    setParams: setParams,
    actions: actions,
  });

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '手机号',
        dataIndex: 'phone_number',
      },
      {
        title: '真实姓名',
        dataIndex: 'real_name',
      },
      columns.created_at(),
      {
        title: '启/禁用',
        dataIndex: 'deleted_at',
        render: (_: any, record: any) => (
          <MyButton.SoftDelete
            deleted_at={record.deleted_at}
            onConfirm={() => actions.softDelete(record)}
          />
        ),
      },
      {
        title: '操作',
        key: 'action',
        align: 'right',
        valueType: 'option',
        render: (_: any, record: any) => [
          <MyButton.Edit
            key={'edit_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: '编辑代理商',
                defaultData: record,
                child: <Update actions={actions} />,
              });
            }}
          />,
          <MyButton.Delete
            key={'delete_' + record.id}
            onConfirm={() => actions.delete({ id: record.id })}
          />,
        ],
      },
    ] as ProColumns<any, 'text'>[],
    toolBarRender: () => [
      <MyButton.Create
        key="create"
        title="添加代理商"
        onClick={() =>
          modalRef.current?.showModal({
            title: '添加代理商',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="代理商管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <QueryFilter {...search}>
            <ProFormText name="phone_number" label="手机号" />
            <ProFormText name="real_name" label="真实姓名" />
          </QueryFilter>
          <ProTable
            {...table}
            {...tableProps}
            expandable={{ defaultExpandAllRows: true }}
          />
        </>
      }
    />
  );
};
