import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Divider, Alert, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import showAuthDialog, {
  changeAuthContext,
} from "redux/actions/auth/showAuthDialog";

import reset from "redux/actions/pin/reset";
import update from "redux/actions/pin/reset-update";

import PhoneUtils from "@exuus/rwanda-phone-utils";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import Icon from "components/common/CustomIcon";
import formPinValidator from "utils/validators/form-pin-validator";
import formPinMatchValidator from "utils/validators/form-pin-match-validator";
import formPhoneValidator from "utils/validators/form-phone-validator";

const ResetPin: FC<{}> = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [ph, setPh] = useState("");

  const {
    loading,
    error: { message: error = null },
  } = useSelector(({ pin: { reset: resetState } }: IRootState) => resetState);

  const {
    loading: loadingUpdate,
    error: { message: errorUpdate = null },
  } = useSelector(({ pin: { reset_update } }: IRootState) => reset_update);

  const { state, context } = useSelector(
    ({ auth: { showAuthDialog } }: IRootState) => showAuthDialog
  );

  const signinWithMsg = () => (
    <>
      {t("remember pin")} {t("signin with")}&nbsp;
      <span style={{ fontSize: "11px" }}>
        <Icon type="save" />
      </span>
    </>
  );

  return (
    <Modal
      title={t("reset pin")}
      visible={state && ["pin-reset", "pin-reset-update"].includes(context)}
      onCloseClick={() => {
        showAuthDialog(false)(dispatch);
      }}
    >
      {context === "pin-reset" ? (
        <Form
          validateTrigger={["onFinish"]}
          onFinish={({ phone_number }) => {
            const fph: any = PhoneUtils(phone_number).unformatted;
            reset({ phone_number: fph })(dispatch);
            setPh(fph);
          }}
        >
          <Form.Item
            name="phone_number"
            rules={formPhoneValidator(t("phone number"))}
          >
            <StackedLabel label={t("phone number")} phone="+250" required>
              <Input
                autoComplete="phone_number"
                type="tel"
                disabled={loading}
              />
            </StackedLabel>
          </Form.Item>
          {error && (
            <Form.Item>
              <Alert message={error} type="error" showIcon />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              {t("reset pin").toUpperCase()}
            </Button>
            <Divider>{t("or").toUpperCase()}</Divider>
            <Button
              disabled={loading}
              type="text"
              block
              onClick={() => {
                changeAuthContext("login")(dispatch);
              }}
            >
              {signinWithMsg()}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          validateTrigger={["onFinish"]}
          onFinish={({ confirm_password, ...form }) => {
            update({ ...form, phone_number: ph })(dispatch);
          }}
        >
          <Form.Item>
            <Typography.Text>{t("enter verification code")}</Typography.Text>
          </Form.Item>
          <Form.Item name="code">
            <StackedLabel label={t("verification code")} required>
              <Input disabled={loadingUpdate} autoComplete="new-password" />
            </StackedLabel>
          </Form.Item>
          <Form.Item name="new_password" rules={formPinValidator(t("new pin"))}>
            <StackedLabel label={t("new pin")}>
              <Input.Password
                placeholder={t("new pin")}
                autoComplete="new-password"
                disabled={loadingUpdate}
                maxLength={5}
              />
            </StackedLabel>
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={formPinMatchValidator("new_password", "New PIN and Confirm")}
          >
            <StackedLabel label={t("confirm pin")}>
              <Input.Password
                placeholder={t("confirm pin")}
                autoComplete="new-password"
                disabled={loadingUpdate}
                maxLength={5}
              />
            </StackedLabel>
          </Form.Item>
          {errorUpdate && (
            <Form.Item>
              <Alert message={errorUpdate} type="error" showIcon />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              loading={loadingUpdate}
            >
              {t("reset pin").toUpperCase()}
            </Button>
            <Divider>{t("or").toUpperCase()}</Divider>
            <Button
              disabled={loadingUpdate}
              type="text"
              block
              onClick={() => {
                changeAuthContext("login")(dispatch);
              }}
            >
              {signinWithMsg()}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ResetPin;
