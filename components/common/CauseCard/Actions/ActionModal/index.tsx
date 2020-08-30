import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Typography, Input, Row, Col, Alert } from "antd";
import styles from "./actionModal.module.scss";
import { IRootState } from "redux/initialStates";
import { validateMessages } from "constants/validationMessages";
import pauseCause from "redux/actions/cause/pauseCause";
import { Store } from "antd/lib/form/interface";
import { ActionType } from "..";
import cancelCause from "redux/actions/cause/cancelCause";
import { RESET_CANCEL_ERROR } from "redux/action-types/cause/cancelCause";
import { RESET_PAUSE_ERROR } from "redux/action-types/cause/pauseCause";
import { RESET_RESUME_ERROR } from "redux/action-types/cause/resumeCause";
import resumeCause from "redux/actions/cause/resumeCause";
import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";

interface IActionModalProps {
  slug: string;
  plainAccessCode?: string;
  visible: boolean;
  context?: ActionType | "";
  closeModal: () => void;
}

const ActionModal: FC<IActionModalProps> = ({
  slug,
  plainAccessCode = "",
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
            "By pausing this cause, donors will not be able to donate money for it again, already donated money will be remitted to you at the end date you already choose.",
          successMessage: "Cause paused",
        };
      case ActionType.cancel:
        return {
          title: "Cancel a Cause",
          subTitle:
            "By canceling this cause it will not be visible to other users and the donations already made will be remitted to donors at the end date you already choose.",
          successMessage: "Cause cancelled",
        };
      case ActionType.resume:
        return {
          title: "Resume a Cause",
          subTitle: "Are you sure to resume this cause?",
          successMessage: "Cause resumed",
        };
      case ActionType.accessCode:
        return {
          title: "Access Code",
          subTitle: `The access code for this cause is </br> <strong>${plainAccessCode}</strong>`,
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
      title={
        actionSuccessful
          ? getModalContent()?.successMessage
          : getModalContent()?.title
      }
      titleType="danger"
      visible={visible}
      onCancel={() => handleModalClose()}
    >
      <div className={styles.pause__modalContent}>
        {actionSuccessful ? (
          <div className={styles.pause__modalContent__successful}>
            <img src="/success-action.gif" alt="pause success" />
          </div>
        ) : (
          <>
            <Typography.Paragraph
              className={styles.pause__modalContent__subTitle}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: getModalContent()?.subTitle,
                }}
              />
            </Typography.Paragraph>
            {errorPause || errorCancel || errorResume ? (
              <Alert
                type="error"
                message={errorPause || errorCancel || errorResume}
              />
            ) : (
              context !== ActionType.accessCode && (
                <Typography.Paragraph type="danger">
                  To Continue Enter Your PIN
                </Typography.Paragraph>
              )
            )}
            {context !== ActionType.accessCode && (
              <Form
                onFinish={handleSubmit}
                validateMessages={validateMessages}
                className={styles.pause__modalContent__form}
              >
                <Form.Item
                  rules={[
                    {
                      len: 5,
                      required: true,
                      pattern: /^[0-9]{5}$/,
                      message: "PIN must be 5 digits",
                    },
                  ]}
                  validateTrigger={["onSubmit", "onBlur"]}
                  name="password"
                >
                  <StackedLabel label="PIN" required>
                    <Input.Password
                      maxLength={5}
                      disabled={loadingPause || loadingCancel || loadingResume}
                    />
                  </StackedLabel>
                </Form.Item>
                <Row justify="end">
                  <Col>
                    <Button
                      htmlType="submit"
                      loading={loadingPause || loadingCancel || loadingResume}
                      type="primary"
                    >
                      {context?.toUpperCase()}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ActionModal;
