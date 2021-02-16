import {
  cloneElement,
  CSSProperties,
  FC,
  ReactElement,
  useEffect,
  useState,
} from "react";

import { Modal as AntdModal, Typography } from "antd";

import styles from "./index.module.scss";
import Head from "next/head";
import { useDispatch } from "react-redux";
import {
  SEND_CONFIRMATION_CODE_ERROR_CLEAR,
  SIGNUP_ERROR_CLEAR,
} from "redux/action-types/auth/signup";
import { LOGIN_ERROR_CLEAR } from "redux/action-types/auth/login";
import { PIN_CHANGE_ERROR_CLEAR } from "redux/action-types/pin/change";
import { PIN_RESET_ERROR_CLEAR } from "redux/action-types/pin/reset";
import { PIN_RESET_UPDATE_ERROR_CLEAR } from "redux/action-types/pin/reset-update";

interface Props {
  title?: string | string[];
  trigger?: ReactElement;
  visible?: boolean;
  titleLevel?: 1 | 2 | 3 | 4;
  titleType?: "danger" | "secondary" | "warning";
  noTitle?: boolean;
  icon?: string;
  iconStyle?: CSSProperties;
  onVisible?: () => void;
  onCancel?: () => void;
  onCloseClick?: () => void;
  children: string | string[] | ReactElement | ReactElement[];
}

const Modal: FC<Props> = ({
  title = ` `,
  trigger,
  visible: vs = false,
  titleLevel = 2,
  titleType,
  noTitle = false,
  icon,
  iconStyle = {},
  onVisible = () => {
    //
  },
  onCancel = () => {
    //
  },
  onCloseClick,
  children,
}) => {
  const [visible, setVisible] = useState(vs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible !== vs) setVisible(vs);
  }, [vs]);

  useEffect(() => {
    if (visible) {
      dispatch({ type: SIGNUP_ERROR_CLEAR });
      dispatch({ type: LOGIN_ERROR_CLEAR });
      dispatch({ type: PIN_CHANGE_ERROR_CLEAR });
      dispatch({ type: PIN_RESET_ERROR_CLEAR });
      dispatch({ type: PIN_RESET_UPDATE_ERROR_CLEAR });
      dispatch({ type: SEND_CONFIRMATION_CODE_ERROR_CLEAR });
    }
  }, [visible]);

  return (
    <>
      {trigger &&
        cloneElement(trigger, {
          onClick: () => {
            setVisible(true);
            onVisible();
          },
        })}
      <AntdModal
        destroyOnClose
        title={
          noTitle ? (
            <div />
          ) : (
            <Typography.Title level={titleLevel} ellipsis type={titleType}>
              {title}
            </Typography.Title>
          )
        }
        visible={visible}
        className={styles[icon ? "modal_icon" : "modal"]}
        footer={null}
        onCancel={() => {
          setVisible(false);
          if (onCloseClick) {
            onCloseClick();
          } else {
            onCancel();
          }
        }}
      >
        <Head>
          <title>{title} | Save Plus</title>
        </Head>
        {icon && (
          <img
            src={icon}
            className={styles.modal_icon__icon}
            style={iconStyle}
            alt="modal icon"
          />
        )}
        {children}
      </AntdModal>
    </>
  );
};

export default Modal;
