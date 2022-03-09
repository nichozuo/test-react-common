import { Inspector } from 'react-dev-inspector';

export default ({ children }: any) => {
  return process.env.NODE_ENV === 'development' ? (
    <Inspector
      // props docs see:
      // https://github.com/zthxxx/react-dev-inspector#inspector-component-props
      keys={['control', 'shift', 'command', 'c']}
    >
      {children}
    </Inspector>
  ) : (
    children
  );
};
