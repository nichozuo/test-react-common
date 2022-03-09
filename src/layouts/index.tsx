import { MyLoading } from '@nichozuo/react-common';
import { useSelector } from 'umi';
import MyInspector from './MyInspector';

export default (props: any) => {
  const count = useSelector<IModelState>(({ request }) => request.count);

  return (
    <>
      <MyInspector>
        <MyLoading count={count as number} />
        {props.children}
      </MyInspector>
    </>
  );
};
