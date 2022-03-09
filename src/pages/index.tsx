import { MyDeleteButton, MyEditButton } from '@nichozuo/react-common';

export default () => {
  return (
    <div>
      <MyEditButton onClick={() => console.log('clicked')} />
      <MyDeleteButton
        onConfirm={function (): void {
          console.log('onConfirm');
        }}
      />
      <h1>Page index</h1>
      UMI_ENV:::{process.env.ENV}:::
    </div>
  );
};
