/* eslint-disable react/jsx-key */
import { Pagination } from 'antd';

export type ResDataMetaProps = {
  /**
   * 当前页
   * @default 1
   */
  current_page: number;
  /**
   * 最后一页
   */
  last_page: number;
  /**
   * 每页记录数
   * @default 20
   */
  per_page: number;
  /**
   * 总记录数
   * @default 0
   */
  total: number;
};

export type MyPaginationProps = {
  /**
   * 后端直接返回的meta信息
   */
  meta?: ResDataMetaProps;
  /**
   * 当分页变更的时候触发事件
   */
  onChange: (page: number, pageSize: number) => void;
};

export const MyPagination = ({ meta, onChange }: MyPaginationProps) => {
  return meta ? (
    <div style={{ padding: '10px 0' }}>
      <Pagination
        current={meta?.current_page || 1}
        total={meta?.total || 0}
        pageSize={meta?.per_page || 20}
        onChange={onChange}
        size="small"
        showTotal={(total) => `总共${total}条`}
        showSizeChanger
        showQuickJumper
      />
    </div>
  ) : null;
};
