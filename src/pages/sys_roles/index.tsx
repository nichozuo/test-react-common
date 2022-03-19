import { useActions } from '@/common';
import { usePage } from '@/common';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Create } from './modals/Create';
import { Update } from './modals/Update';
import { request } from 'umi';
import { message, Button, Tag } from 'antd';
import { Permissions } from './modals/Permissions';
import { ProFormText, QueryFilter } from '@ant-design/pro-form';
import { PicRightOutlined } from '@ant-design/icons';
import { MyButton, MyPagination } from '@/common';

export default () => {
  const { resData, params, setParams, actions, modalRef } = useActions({
    baseUri: 'sys_roles',
    otherApi: {
      setPermissions: (id: number, permissions_ids: number[]) => {
        request('sys_roles/set_permissions', {
          data: { id: id, permissions_ids: permissions_ids },
        }).then(() => {
          message.success('操作成功');
          modalRef.current?.hideModal();
        });
      },
    },
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
        title: '角色名称',
        dataIndex: 'name',
        render: (_: any, record: any) => (
          <Tag color={record.color}>{record.name}</Tag>
        ),
      },
      {
        title: '设置权限',
        render: (_: any, record: any) => [
          <Button
            key="setPermission"
            type="primary"
            size="small"
            ghost
            icon={<PicRightOutlined />}
            onClick={() => {
              modalRef.current?.showModal({
                title: '权限设置',
                defaultData: record,
                child: <Permissions actions={actions} />,
              });
            }}
          >
            设置权限
          </Button>,
        ],
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
                title: '编辑角色',
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
        title="新建角色"
        onClick={() =>
          modalRef.current?.showModal({
            title: '新建角色',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="角色管理"
      footer={[<MyPagination {...pagination} />]}
      content={
        <>
          <QueryFilter {...search}>
            <ProFormText name="name" label="角色名称" />
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
