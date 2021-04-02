import { FC, useState } from "react";
import Img from "react-optimized-image";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Typography, Input, Row, Col, Alert } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { IRootState } from "redux/initialStates";
import { validateMessages } from "constants/validationMessages";
import pauseCause from "redux/actions/cause/pauseCause";
import cancelCause from "redux/actions/cause/cancelCause";
import transfer from "redux/actions/cause/transfer";
import cashout from "redux/actions/cause/cashout";

import { RESET_CANCEL_ERROR } from "redux/action-types/cause/cancelCause";
import { RESET_PAUSE_ERROR } from "redux/action-types/cause/pauseCause";
import { RESET_RESUME_ERROR } from "redux/action-types/cause/resumeCause";
import { RESET_TRANSFER_ERROR } from "redux/action-types/cause/transfer";
import { RESET_CASHOUT_ERROR } from "redux/action-types/cause/cashout";

import resumeCause from "redux/actions/cause/resumeCause";
import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import CauseTransfer from "components/common/CauseTransfer";
import CauseCashout from "components/common/CauseCashout";
import { Store } from "antd/lib/form/interface";

import styles from "./actionModal.module.scss";
import { ActionType } from "components/common/CausesActions";

import successGif from "public/success-action.gif";

interface IActionModalProps {
  slug: string;
  plainAccessCode?: string;
  paymentAccountNumber?: string;
  currentBalance?: number;
  currentBalanceTelco?: number;
  currentBalanceCards?: number;
  currency?: string;
  isNoBankDetails: boolean;
  visible: boolean;
  context?: ActionType | "";
  closeModal: () => void;
}

const ActionModal: FC<IActionModalProps> = ({
  slug,
  plainAccessCode = "",
  paymentAccountNumber = "",
  currentBalance = 0,
  currentBalanceTelco = 0,
  currentBalanceCards = 0,
  currency = "Rwf",
  isNoBankDetails = true,
  visible,
  context,
  closeModal,
}) => {
  const router = useRouter();
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

  const { t } = useTranslation();

  const handleModalClose = () => {
    closeModal();

    if (actionSuccessful) {
      router.reload();
    } else {
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
        case ActionType.donationTransfer:
          dispatch({ type: RESET_TRANSFER_ERROR });
          break;
        case ActionType.cashOut:
          dispatch({ type: RESET_CASHOUT_ERROR });
          break;
        default:
          break;
      }
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
      case ActionType.donationTransfer:
        transfer(slug, data)(setActionSuccessful, dispatch);
        break;
      case ActionType.cashOut:
        cashout(slug, data)(setActionSuccessful, dispatch);
        break;
      default:
        break;
    }
  };

  const getModalContent = () => {
    switch (context) {
      case ActionType.pause:
        return {
          title: t("pause cause"),
          subTitle: t("pause_cause_warning"),
          successMessage: t("pause_success"),
        };
      case ActionType.cancel:
        return {
          title: t("cancel cause"),
          subTitle: t("cancel_cause_warning"),
          successMessage: t("cancel_success"),
        };
      case ActionType.resume:
        return {
          title: t("resume cause"),
          subTitle: t("resume_cause_warning"),
          successMessage: t("resume_success"),
        };
      case ActionType.accessCode:
        return {
          title: t("access code"),
          subTitle: `${t(
            "the access code for this cause is",
          )} </br> <strong>${plainAccessCode}</strong>`,
        };
      case ActionType.donationTransfer:
        return {
          title: t("transfer donations"),
          subTitle: "",
        };
      case ActionType.cashOut:
        return {
          title: t("cash out"),
          subTitle: "",
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
      noTitle={
        context === ActionType.donationTransfer ||
        context === ActionType.cashOut
      }
      title={
        actionSuccessful
          ? getModalContent()?.successMessage
          : getModalContent()?.title
      }
      titleType="danger"
      visible={visible}
      onCancel={() => handleModalClose()}
    >
      <>
        {context === ActionType.cashOut ? (
          <CauseCashout
            slug={slug}
            handleSubmit={handleSubmit}
            paymentAccountNumber={paymentAccountNumber}
            currentBalance={currentBalance}
            currentBalanceTelco={currentBalanceTelco}
            currentBalanceCards={currentBalanceCards}
            isNoBankDetails={isNoBankDetails}
            currency={currency}
            actionSuccessful={actionSuccessful}
          />
        ) : context === ActionType.donationTransfer ? (
          <CauseTransfer
            slug={slug}
            handleSubmit={handleSubmit}
            actionSuccessful={actionSuccessful}
            currentBalance={currentBalance}
            currentBalanceTelco={currentBalanceTelco}
            currentBalanceCards={currentBalanceCards}
            currency={currency}
          />
        ) : (
          <div className={styles.pause__modalContent}>
            {actionSuccessful ? (
              <div className={styles.pause__modalContent__successful}>
                <Img src={successGif} alt="pause success" />
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
                  context &&
                  context !== ActionType.accessCode && (
                    <Typography.Paragraph type="danger">
                      {t("to continue enter your pin")}
                    </Typography.Paragraph>
                  )
                )}
                {context && context !== ActionType.accessCode && (
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
                          message: t("must have 5 digits"),
                        },
                      ]}
                      validateTrigger={["onSubmit", "onBlur"]}
                      name="password"
                    >
                      <StackedLabel label="PIN" required>
                        <Input.Password
                          maxLength={5}
                          disabled={
                            loadingPause || loadingCancel || loadingResume
                          }
                        />
                      </StackedLabel>
                    </Form.Item>
                    <Row justify="end">
                      <Col>
                        <Button
                          htmlType="submit"
                          loading={
                            loadingPause || loadingCancel || loadingResume
                          }
                          type="primary"
                        >
                          {t(context).toUpperCase()}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </>
            )}
          </div>
        )}
      </>
    </Modal>
  );
};

export default ActionModal;
