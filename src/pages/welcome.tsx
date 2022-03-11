import { Link, useSelector } from 'umi';
import { useEffect } from 'react';
import { MyEditButton, MyDeleteButton } from '@nichozuo/react-common';
import { Button } from 'antd';

export default () => {
  const auth = useSelector<IModelState>(({ auth }) => auth) as IAuthModelState;

  return (
    <>
      <h1>hahaha:{auth?.user?.username}</h1>
      <MyEditButton onClick={() => console.log('clicked')} />
      <MyDeleteButton
        onConfirm={function (): void {
          console.log('onConfirm');
        }}
      />
      <Link to="/login">
        <Button>login</Button>
      </Link>
      <Link to="/welcome">
        <Button>welcome</Button>
      </Link>
      UMI_ENV:::{process.env.ENV}:::
    </>
  );
};
