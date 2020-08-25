import React from "react";

import { Modal as AntdModal, Typography } from "antd";

import styles from "./index.module.scss";
import Head from "next/head";

interface Props {
  title: string | string[];
  trigger?: React.ReactElement;
  visible?: boolean;
  titleLevel?: 1 | 2 | 3 | 4;
  icon?: string;
  onVisible?: () => void;
  onCancel?: () => void;
  children: string | string[] | React.ReactElement | React.ReactElement[];
}

const Modal: React.FC<Props> = ({
  title,
  trigger,
  visible: vs = false,
  titleLevel = 2,
  icon,
  onVisible = () => {
    //
  },
  onCancel = () => {
    //
  },
  children,
}) => {
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
          <Typography.Title level={titleLevel} ellipsis>
            {title}
          </Typography.Title>
        }
        visible={visible}
        className={styles[icon ? "modal_icon" : "modal"]}
        footer={null}
        onCancel={() => {
          setVisible(false);
          onCancel();
        }}
      >
        <Head>
          <title>{title} | Save Plus</title>
        </Head>
        {icon && <img src={icon} className={styles.modal_icon__icon} />}
        {children}
      </AntdModal>
    </>
  );
};

export default Modal;
