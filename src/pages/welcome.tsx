import { useSelector } from 'umi';
import { useEffect } from 'react';

export default () => {
  const auth = useSelector<IModelState>(({ auth }) => auth) as IAuthModelState;

  useEffect(() => {
    console.log('welcome useEffect');
  }, []);

  return <h1>hahaha:{auth?.user?.username}</h1>;
};
