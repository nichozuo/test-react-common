import { createContext, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import { useSetState } from 'ahooks';

export type MyModalProps = ModalProps & {
  /**
   * 默认数据
   */
  defaultData?: Record<string, any>;
  /**
   * 子节点
   */
  child: JSX.Element;
};

export type MyModalRefType = {
  showModal: (data: MyModalProps) => void;
  hideModal: () => void;
};

export const MyModalDataContext = createContext<
  Record<string, any> | undefined
>({});

const _MyModal = (_: any, ref: any) => {
  const [state, setState] = useSetState<MyModalProps>({
    width: 700,
    child: <p>弹窗</p>,
  });

  // 点击ok
  const onOk = () => {
    setState({ visible: false });
  };

  // 外部调用的方法
  useImperativeHandle(ref, () => ({
    showModal: (props: MyModalProps) => {
      setState({
        ...props,
        width: props.width || 700,
        visible: true,
      });
    },
    hideModal: () => {
      setState({ visible: false });
    },
  }));

  return (
    <Modal
      destroyOnClose
      footer={null}
      maskClosable={false}
      onOk={onOk}
      onCancel={onOk}
      {...state}
    >
      <MyModalDataContext.Provider value={state.defaultData}>
        {state.child}
      </MyModalDataContext.Provider>
    </Modal>
  );
};

export const MyModal = forwardRef(_MyModal);
