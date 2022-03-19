export const useColumns = () => {
  const columns = {
    id: {
      title: 'id',
      dataIndex: 'id',
      search: false,
      sorter: true,
    },
    created_at: {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
    },
    updated_at: {
      title: '更新时间',
      valueType: 'dateTime',
      dataIndex: 'updated_at',
    },
  };

  return { columns };
};
