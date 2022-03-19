import { MyLayout, MyLoading } from '@/common';
import { useEffect, useState } from 'react';
import { history, useDispatch, useSelector } from 'umi';

const Loading = () => {
  const { request } = useSelector<ModelsState>((state) => state) as ModelsState;
  return <MyLoading count={request.count} />;
};

const AdminLayout = (props: any) => {
  // 是否已经登陆
  const [hasLogin, setHasLogin] = useState(false);

  // init dva
  const dispatch = useDispatch();
  const { auth } = useSelector<ModelsState>((state) => state) as ModelsState;

  // 初始化auth state
  useEffect(() => {
    dispatch({ type: 'auth/me' });
  }, []);

  // auth rerender
  useEffect(() => {
    setHasLogin(auth.user != undefined);
  }, [auth]);

  return hasLogin ? (
    <MyLayout
      auth={{ user: auth.user, permissions: auth.permissions }}
      onLogout={() => dispatch({ type: 'auth/logout' })}
      onSubMenuClick={(url: string) => {
        history.push(url);
      }}
    >
      {props.children}
    </MyLayout>
  ) : null;
};

export default (props: any) => {
  // 是否登录页
  const [isLoginPage, setIsLoginPage] = useState(() => {
    return history.location.pathname == '/login';
  });

  // 监控是否登录页
  useEffect(() => {
    setIsLoginPage(history.location.pathname == '/login');
  }, [history.location.pathname]);

  return (
    <>
      <Loading />
      {isLoginPage ? (
        props.children
      ) : (
        <AdminLayout>{props.children}</AdminLayout>
      )}
    </>
  );
};
