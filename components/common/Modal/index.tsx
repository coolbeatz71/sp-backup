import React from "react";

import { Modal as AntdModal, Typography } from "antd";

import styles from "./index.module.scss";
import Head from "next/head";

interface Props {
  title: string | string[];
  trigger?: React.ReactElement;
  visible?: boolean;
  onVisible?: () => void;
  onCancel?: () => void;
  children: string | string[] | React.ReactElement | React.ReactElement[];
}

const Modal: React.FC<Props> = ({
  title,
  trigger,
  visible: vs = false,
  onVisible = () => {
    //
  },
  onCancel = () => {
    //
  },
  children,
}) => {
  console.log(vs);
  const [visible, setVisible] = React.useState(vs);

  React.useEffect(() => {
    if (visible !== vs) setVisible(vs);
  }, [vs]);

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          onClick: () => {
            setVisible(true);
            onVisible();
          },
        })}
      <AntdModal
        destroyOnClose
        title={
          <Typography.Title level={2} ellipsis>
            {title}
          </Typography.Title>
        }
        visible={visible}
        className={styles.modal}
        footer={null}
        onCancel={() => {
          setVisible(false);
          onCancel();
        }}
      >
        <Head>
          <title>{title} | Save Plus</title>
        </Head>
        {children}
      </AntdModal>
    </>
  );
};

export default Modal;
