import { MyTag } from '@/common';

const SysPermissionsType = ({ value }: { value: string }) => {
  return (
    <MyTag colors={{ 目录: 'red', 页面: 'blue', 按钮: 'cyan' }} value={value} />
  );
};

const Boolean = ({ value }: { value: string }) => {
  return (
    <MyTag
      colors={{ 是: '#7cb305', 否: '#bfbfbf' }}
      value={value ? '是' : '否'}
    />
  );
};

const XTag: {
  SysPermissionsType: typeof SysPermissionsType;
  Boolean: typeof Boolean;
} = {} as any;

XTag.SysPermissionsType = SysPermissionsType;
XTag.Boolean = Boolean;

export default XTag;
