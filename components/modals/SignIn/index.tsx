import { FC } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
  Typography,
  Alert,
} from "antd";
import { useTranslation } from "react-i18next";

import login from "redux/actions/auth/login";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import { IRootState } from "redux/initialStates";
import showAuthDialog, {
  changeAuthContext,
} from "redux/actions/auth/showAuthDialog";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";

import { normalize } from "@exuus/rwanda-phone-utils";
import formPhoneValidator from "utils/validators/form-phone-validator";

import styles from "./index.module.scss";

const SignIn: FC<{}> = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error: { message: error = null },
  } = useSelector(({ auth: { login } }: IRootState) => login);

  const { state, context } = useSelector(
    ({ auth: { showAuthDialog } }: IRootState) => showAuthDialog
  );

  const { t } = useTranslation();

  const isMobile = useMedia("(max-width: 768px)");

  return (
    <Modal
      title={t("welcome back")}
      visible={state && ["login"].includes(context)}
      onCloseClick={() => {
        showAuthDialog(false)(dispatch);
      }}
    >
      <Form
        className={styles.sign_in}
        validateTrigger={["onFinish"]}
        onFinish={(form) => {
          login({ ...form, phone_number: normalize(form.phone_number) })(
            dispatch
          );
        }}
      >
        <Form.Item
          name="phone_number"
          rules={formPhoneValidator(t("phone number"))}
        >
          <StackedLabel label={t("phone number")} phone="+250" required>
            <Input autoComplete="phone_number" type="tel" disabled={loading} />
          </StackedLabel>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t("required") }]}
        >
          <StackedLabel label="PIN" required>
            <Input.Password
              maxLength={5}
              autoComplete="password"
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
            {t("sign_in_button")}
          </Button>
          <Divider>{t("or").toUpperCase()}</Divider>
          <Row justify={isMobile ? "center" : "space-between"}>
            <Col>
              <Button
                className={styles.sign_in__button_left}
                type="text"
                onClick={() => {
                  changeAuthContext("pin-reset")(dispatch);
                }}
                disabled={loading}
              >
                {t("forgot pin")}&nbsp;
                <Typography.Text underline>{t("reset pin")}</Typography.Text>
              </Button>
            </Col>
            <Col>
              <Button
                className={styles.sign_in__button_right}
                type="text"
                onClick={() => {
                  changeAuthContext("signup")(dispatch);
                }}
                disabled={loading}
              >
                {t("don't have account")}&nbsp;
                <Typography.Text underline>
                  {t("create account")}
                </Typography.Text>
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignIn;
