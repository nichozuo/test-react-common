import { MyDeleteButton, MyEditButton } from '@nichozuo/react-common';
import { Link } from 'umi';
import { Button } from 'antd';

export default () => {
  return (
    <div>
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
    </div>
  );
};
