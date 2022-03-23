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
import { Tag } from 'antd';

export default () => {
  const { resData, params, setParams, actions, modalRef } = useActions({
    baseUri: 'admins',
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
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '角色',
        render: (_: any, record: any) => {
          return record.roles.map((item: any) => (
            <Tag key={item.id} color={item.color}>
              {item.name}
            </Tag>
          ));
        },
      },
      columns.created_at(),
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
                title: '编辑管理员',
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
        title="添加管理员"
        onClick={() =>
          modalRef.current?.showModal({
            title: '添加管理员',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="管理员管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <QueryFilter {...search}>
            <ProFormText name="username" label="用户名" />
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
