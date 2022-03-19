import { Tag } from 'antd';
import type { TagProps } from 'antd';

export type MyTagProps = TagProps & {
  /**
   * 颜色数组
   */
  colors: Record<string, string>;
  /**
   * key值
   */
  value: string;
};

export const MyTag = ({ colors, value, ...rest }: MyTagProps) => {
  return (
    <Tag color={colors[value]} {...rest}>
      {value}
    </Tag>
  );
};
