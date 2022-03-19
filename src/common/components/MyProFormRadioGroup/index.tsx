import { ProFormRadio } from '@ant-design/pro-form';
import { ProFormRadioGroupProps } from '@ant-design/pro-form/lib/components/Radio';

export const MyProFormRadioGroup = ({ ...rest }: ProFormRadioGroupProps) => {
  return (
    <ProFormRadio.Group
      radioType="button"
      fieldProps={{ buttonStyle: 'solid' }}
      {...rest}
    />
  );
};
