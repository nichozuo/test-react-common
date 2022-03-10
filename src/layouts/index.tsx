import { useEffect } from 'react';
import { useSelector, useDispatch, history } from 'umi';
import MyLayoutWrapper from './components/MyLayoutWrapper';
import MyLayout from './components/StyleOne/index';

export default (props: any) => {
  const { auth, request } = useSelector<IModelState>(
    (state) => state,
  ) as IModelState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (history.location.pathname != '/login') dispatch({ type: 'auth/me' });
  }, []);

  return (
    <>
      <MyLayoutWrapper count={request.count}>
        {history.location.pathname == '/login' ? (
          props.children
        ) : (
          <MyLayout
            auth={{ user: auth.user, permissions: auth.permissions }}
            onLogout={() => dispatch({ type: 'auth/logout' })}
          >
            {props.children}
          </MyLayout>
        )}
      </MyLayoutWrapper>
    </>
  );
};
