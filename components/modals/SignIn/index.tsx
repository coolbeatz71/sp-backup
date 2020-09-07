import React from "react";
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

import login from "redux/actions/Auth/login";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import showAuthDialog, {
  changeAuthContext,
} from "redux/actions/Auth/showAuthDialog";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";

import { normalize } from "dev-rw-phone";
import formPinValidator from "utils/validators/form-pin-validator";
import formPhoneValidator from "utils/validators/form-phone-validator";

import styles from "./index.module.scss";

const SignIn: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error: { message: error = null },
  } = useSelector(({ auth: { login } }: IRootState) => login);

  const { state, context } = useSelector(
    ({ auth: { showAuthDialog } }: IRootState) => showAuthDialog,
  );

  return (
    <Modal
      title="Welcome back!"
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
            dispatch,
          );
        }}
      >
        <Form.Item
          name="phone_number"
          rules={formPhoneValidator("Phone Number")}
        >
          <StackedLabel label="Phone Number" phone="+250" required>
            <Input autoComplete="phone_number" type="tel" disabled={loading} />
          </StackedLabel>
        </Form.Item>
        <Form.Item name="password" rules={formPinValidator("PIN")}>
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
            SIGN IN
          </Button>
          <Divider>OR</Divider>
          <Row justify="space-between">
            <Col>
              <Button
                className={styles.sign_in__button_left}
                type="text"
                onClick={() => {
                  changeAuthContext("pin-reset")(dispatch);
                }}
                disabled={loading}
              >
                Forgot PIN?&nbsp;
                <Typography.Text underline>Reset PIN</Typography.Text>
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
                Don't have an account?&nbsp;
                <Typography.Text underline>Create</Typography.Text>
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignIn;
