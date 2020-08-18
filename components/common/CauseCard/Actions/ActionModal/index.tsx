import React, { FC, useState } from "react";
import Link from "next/link";
import { USER_CAUSES_PATH } from "helpers/paths";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Modal, Typography } from "antd";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./actionModal.module.scss";
import { IRootState } from "redux/initialStates";
import { validateMessages } from "constants/validationMessages";
import { InputPassword } from "components/common/Input";
import pauseCause from "redux/actions/cause/pauseCause";
import { Store } from "antd/lib/form/interface";
import { ActionType } from "..";
import cancelCause from "redux/actions/cause/cancelCause";
import { RESET_CANCEL_ERROR } from "redux/action-types/cause/cancelCause";
import { RESET_PAUSE_ERROR } from "redux/action-types/cause/pauseCause";
import { RESET_RESUME_ERROR } from "redux/action-types/cause/resumeCause";
import resumeCause from "redux/actions/cause/resumeCause";

const { Text } = Typography;

interface IPauseCauseProps {
  slug: string;
  visible: boolean;
  context?: ActionType | "";
  closeModal: () => void;
}

const PauseCause: FC<IPauseCauseProps> = ({
  slug,
  visible,
  context,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [actionSuccessful, setActionSuccessful] = useState<boolean>(false);
  const { loading: loadingPause, error: errorPause } = useSelector(
    ({ cause: { pause } }: IRootState) => pause,
  );
  const { loading: loadingCancel, error: errorCancel } = useSelector(
    ({ cause: { cancel } }: IRootState) => cancel,
  );
  const { loading: loadingResume, error: errorResume } = useSelector(
    ({ cause: { resume } }: IRootState) => resume,
  );

  const handleModalClose = () => {
    closeModal();
    setActionSuccessful(false);

    switch (context) {
      case ActionType.pause:
        dispatch({ type: RESET_PAUSE_ERROR });
        break;
      case ActionType.cancel:
        dispatch({ type: RESET_CANCEL_ERROR });
        break;
      case ActionType.resume:
        dispatch({ type: RESET_RESUME_ERROR });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (data: Store) => {
    switch (context) {
      case ActionType.pause:
        pauseCause(slug, data)(setActionSuccessful, dispatch);
        break;
      case ActionType.cancel:
        cancelCause(slug, data)(setActionSuccessful, dispatch);
        break;
      case ActionType.resume:
        resumeCause(slug, data)(setActionSuccessful, dispatch);
        break;
      default:
        break;
    }
  };

  const getModalContent = () => {
    switch (context) {
      case ActionType.pause:
        return {
          title: "Pause a Cause",
          subTitle:
            "By pausing this cause, donours will not be able to donate money for it again, already donated money will be remitted to you at the end date you already choose.",
          successMessage: "Cause paused",
        };
      case ActionType.cancel:
        return {
          title: "Cancel a Cause",
          subTitle:
            "By canceling this cause it will not be visible to other users and the donations already made will be remitted to donours at the end date you already choose.",
          successMessage: "Cause cancelled",
        };
      case ActionType.resume:
        return {
          title: "Resume a Cause",
          subTitle: "Are you sure to resume this cause?",
          successMessage: "Cause resumed",
        };
      default:
        return {
          title: "",
          subTitle: "",
        };
    }
  };

  return (
    <Modal
      visible={visible}
      footer={false}
      closable={false}
      destroyOnClose={true}
      maskStyle={{ background: "#000000b3" }}
    >
      <div className={styles.pause__modalHeader}>
        <CloseOutlined
          className={styles.pause__modalHeader__icon}
          onClick={handleModalClose}
        />
      </div>

      <div className={styles.pause__modalContent}>
        <h4>
          {actionSuccessful
            ? getModalContent()?.successMessage
            : getModalContent()?.title}
        </h4>

        {actionSuccessful ? (
          <div className={styles.pause__modalContent__successful}>
            <img src="/success-action.gif" alt="pause success" />
          </div>
        ) : (
          <>
            <p className={styles.pause__modalContent__subTitle}>
              {getModalContent()?.subTitle}
            </p>
            {errorPause || errorCancel || errorResume ? (
              <Text type="danger" className="mb-3 d-block text-center">
                <span className="d-block">
                  <ExclamationCircleOutlined className="auth-error-message" />
                  {errorPause || errorCancel || errorResume}
                </span>
              </Text>
            ) : (
              <p className={styles.pause__modalContent__continue}>
                To Continue Enter Your PIN
              </p>
            )}

            <Form
              onFinish={handleSubmit}
              validateMessages={validateMessages}
              className={styles.pause__modalContent__form}
            >
              <Form.Item
                className="form-group"
                rules={[
                  {
                    len: 5,
                    required: true,
                    pattern: /^[0-9]{5}$/,
                    message: "Pin must be number of 5 digits",
                  },
                ]}
                validateTrigger={["onSubmit", "onBlur"]}
                name="password"
              >
                <InputPassword maxLength={5} placeholder="PIN" />
              </Form.Item>
              <div className="d-flex mb-3">
                <Button
                  htmlType="submit"
                  loading={loadingPause || loadingCancel || loadingResume}
                  className="btn-primary ml-auto text-uppercase"
                >
                  {context}
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PauseCause;
