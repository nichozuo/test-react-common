import { MyLoading } from '@nichozuo/react-common';
import { Inspector } from 'react-dev-inspector';

type IProps = {
  count: number;
  children: any;
};

const Content = (props: IProps) => (
  <>
    <MyLoading count={props.count} />
    {props.children}
  </>
);

export default (props: IProps) => {
  return process.env.NODE_ENV === 'development' ? (
    <Inspector keys={['control', 'shift', 'command', 'c']}>
      <Content {...props} />
    </Inspector>
  ) : (
    <Content {...props} />
  );
};
