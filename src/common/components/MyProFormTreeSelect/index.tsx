import { ProFormTreeSelect } from '@ant-design/pro-form';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '@ant-design/pro-form/lib/interface';
import type { TreeSelectProps } from 'antd';

export type MyProFormTreeSelectProps = ProFormFieldItemProps<
  TreeSelectProps<any>
> &
  ProFormFieldRemoteProps;

export const MyProFormTreeSelect = ({
  name,
  label,
  placeholder,
  request,
  ...rest
}: MyProFormTreeSelectProps) => {
  return (
    <ProFormTreeSelect
      name={name}
      label={label}
      placeholder={placeholder}
      request={request}
      width={300}
      allowClear
      fieldProps={{
        fieldNames: {
          label: 'name',
          value: 'id',
          children: 'children',
          showSearch: true,
          treeNodeFilterProp: 'name',
        },
        treeDefaultExpandAll: true,
      }}
      {...rest}
    />
  );
};
