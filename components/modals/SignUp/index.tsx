import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
  Alert,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";

import signup, { sendVerificationCode } from "redux/actions/Auth/signup";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import showAuthDialog, {
  changeAuthContext,
} from "redux/actions/Auth/showAuthDialog";
import { normalize } from "dev-rw-phone";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import Icon from "components/common/CustomIcon";

import formPinValidator from "utils/validators/form-pin-validator";
import formPhoneValidator from "utils/validators/form-phone-validator";

const SignUp: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const {
    currentUser,
    loading,
    error: { message: error = null },
  } = useSelector(
    ({ auth: { sendConfirmationCode } }: IRootState) => sendConfirmationCode,
  );

  const {
    loading: loadingSignUp,
    error: { message: errorSignUp = null },
  } = useSelector(({ auth: { signup } }: IRootState) => signup);

  const { state, context } = useSelector(
    ({ auth: { showAuthDialog } }: IRootState) => showAuthDialog,
  );

  const gotAccountMsg = () => (
    <>
      {t("got an account")}{" "}
      <span style={{ fontSize: "11px" }}>
        <Icon type="save" />
      </span>
      ? &nbsp;
      <span style={{ textDecoration: "underline" }}>{t("signin")}</span>
    </>
  );

  return (
    <Modal
      title={t("create a save account")}
      visible={state && ["verify-phone", "signup"].includes(context)}
      onCloseClick={() => {
        showAuthDialog(false)(dispatch);
      }}
    >
      {context === "verify-phone" ? (
        <Form
          validateTrigger={["onFinish"]}
          onFinish={(form) => {
            signup({ ...currentUser, ...form })(dispatch);
          }}
        >
          <Form.Item>
            <Typography.Text>{t("enter verification code")}</Typography.Text>
          </Form.Item>
          <Form.Item name="short_code">
            <StackedLabel label={t("verification code")} required>
              <Input disabled={loadingSignUp} autoComplete="new-password" />
            </StackedLabel>
          </Form.Item>
          {errorSignUp && (
            <Form.Item>
              <Alert message={errorSignUp} type="error" showIcon />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              loading={loadingSignUp}
            >
              {t("verify").toUpperCase()}
            </Button>
            <Divider>{t("or").toUpperCase()}</Divider>
            <Button
              disabled={loadingSignUp}
              type="text"
              block
              onClick={() => {
                changeAuthContext("login")(dispatch);
              }}
            >
              {gotAccountMsg()}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          validateTrigger={["onFinish"]}
          onFinish={({ phone_number, ...form }) => {
            sendVerificationCode({
              ...form,
              phone_number: normalize(phone_number),
            })(dispatch);
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: t("required"),
                  },
                  {
                    min: 3,
                    message: t("should be min", {
                      min: 3,
                    }),
                  },
                ]}
              >
                <StackedLabel label={t("first_name")} required>
                  <Input autoComplete="first_name" disabled={loading} />
                </StackedLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: t("required"),
                  },
                  {
                    min: 3,
                    message: t("should be min", {
                      min: 3,
                    }),
                  },
                ]}
              >
                <StackedLabel label={t("last_name")} required>
                  <Input autoComplete="last_name" disabled={loading} />
                </StackedLabel>
              </Form.Item>
            </Col>
          </Row>
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
          <Form.Item name="password" rules={formPinValidator("PIN")}>
            <StackedLabel label="PIN" required>
              <Input.Password maxLength={5} autoComplete="new-password" />
            </StackedLabel>
          </Form.Item>
          <Form.Item name="email">
            <StackedLabel label={`${t("email")}(${t("optional")})`}>
              <Input type="email" autoComplete="email" disabled={loading} />
            </StackedLabel>
          </Form.Item>
          {error && (
            <Form.Item>
              <Alert message={error} type="error" showIcon />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              {t("create account").toUpperCase()}
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
              {gotAccountMsg()}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default SignUp;
