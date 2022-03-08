import { Login1 } from '@nichozuo/react-common';
import { useDispatch, useSelector } from 'umi';

const Login = () => {
  const dispatch = useDispatch();
  const count = useSelector<ICountState>(({ count }) => count.count);
  const doLogin = (values: any) => {
    console.log('values', values);
    dispatch({ type: 'auth/login', payload: values });
    return Promise.resolve();
  };

  return (
    <Login1
      title="居有屋后台管理系统"
      doLogin={doLogin}
      footer={
        <>
          {count}
          <span>粤ICP备2021008767号</span> Copyright ©2021-2022
          深圳市居有屋有限公司
        </>
      }
    />
  );
};

export default Login;
