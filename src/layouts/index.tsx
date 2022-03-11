import { useEffect } from 'react';
import { useSelector, useDispatch, history } from 'umi';
import { MyLayout } from '@nichozuo/react-common';

export default (props: any) => {
  // init dva
  const dispatch = useDispatch();
  const { auth, request } = useSelector<IModelState>(
    (state) => state,
  ) as IModelState;

  // initial login state
  useEffect(() => {
    if (history.location.pathname != '/login') dispatch({ type: 'auth/me' });
  }, []);

  // clic submenu
  const onSubMenuClick = (url: string) => {
    console.log(url);
    history.push(url);
  };

  return (
    <>
      <MyLayout
        auth={{ user: auth.user, permissions: auth.permissions }}
        onLogout={() => dispatch({ type: 'auth/logout' })}
        pathname={history.location.pathname}
        count={request.count}
        onSubMenuClick={onSubMenuClick}
      >
        {props.children}
      </MyLayout>
    </>
  );
};
