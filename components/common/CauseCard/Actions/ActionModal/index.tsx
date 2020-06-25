import React, { FC, useState } from "react";
import Link from "next/link";
import { USER_CAUSES_PATH } from "helpers/paths";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./actionModal.module.scss";
import { IRootState } from "redux/initialStates";
import { validateMessages } from "constants/validationMessages";
import { InputPassword } from "components/common/Input";
import stopCause from "redux/actions/cause/stopCause";
import { Store } from "antd/lib/form/interface";
import { ActionType } from "..";
import cancelCause from "redux/actions/cause/cancelCause";

interface IStopCauseProps {
  slug: string;
  visible: boolean;
  context?: ActionType | "";
  closeModal: () => void;
}

const StopCause: FC<IStopCauseProps> = ({
  slug,
  visible,
  context,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [actionSuccessful, setActionSuccessful] = useState<boolean>(false);
  const { loading } = useSelector(({ cause: { stop } }: IRootState) => stop);
  const { loading: LoadingCancel } = useSelector(({ cause: { cancel } }: IRootState) => cancel);

  const handleSubmit = (data: Store) => {
    switch (context) {
      case ActionType.stop:
        stopCause(slug, data)(setActionSuccessful, dispatch);
        break;
      case ActionType.cancel:
        cancelCause(slug, data)(setActionSuccessful, dispatch);
        break;
      default:
        break;
    }
  };

  const getModalContent = () => {
    switch (context) {
      case ActionType.stop:
        return {
          title: "Stop a Cause",
          subTitle:
            "By stopping this cause, donours will not be able to donate money for it again, already donated money will be remitted to you at the end date you already choose.",
          successMessage: "Cause stopped",
        };
      case ActionType.cancel:
        return {
          title: "Cancel a Cause",
          subTitle:
            "By canceling this cause it will not be visible to other users and the donations already made will be remitted to you at the end date you already choose. To Continue Enter Your PIN.",
          successMessage: "Cause cancelled",
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
      {!actionSuccessful && (
        <div className={styles.stop__modalHeader}>
          <CloseOutlined
            className={styles.stop__modalHeader__icon}
            onClick={closeModal}
          />
        </div>
      )}

      <div className={styles.stop__modalContent}>
        <h4>
          {actionSuccessful ? getModalContent()?.successMessage : getModalContent()?.title}
        </h4>

        {actionSuccessful ? (
          <div className={styles.stop__modalContent__successful}>
            <img src="/success-stop.gif" alt="stop success" />
            <Link href={USER_CAUSES_PATH}>
              <a onClick={closeModal}>Back Home</a>
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.stop__modalContent__subTitle}>
              {getModalContent()?.subTitle}
            </p>
            <p className={styles.stop__modalContent__continue}>
              To Continue Enter Your PIN
            </p>

            <Form
              onFinish={handleSubmit}
              validateMessages={validateMessages}
              className={styles.stop__modalContent__form}
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
                <InputPassword
                  maxLength={5}
                  placeholder="PIN"
                />
              </Form.Item>
              <div className="d-flex mb-3">
                <Button
                  htmlType="submit"
                  loading={loading || LoadingCancel}
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

export default StopCause;
