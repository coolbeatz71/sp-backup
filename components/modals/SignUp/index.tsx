import React from "react";
import { Form, Input, Row, Col, Button, Divider, Alert } from "antd";

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

const SignUp: React.FC<{}> = () => {
  const dispatch = useDispatch();

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

  return (
    <Modal
      title="Create a save account"
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
          <Form.Item name="short_code">
            <StackedLabel label="Verification Code" required>
              <Input disabled={loadingSignUp} />
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
              VERIFY
            </Button>
            <Divider>OR</Divider>
            <Button
              disabled={loadingSignUp}
              type="text"
              block
              onClick={() => {
                changeAuthContext("login")(dispatch);
              }}
            >
              Got an account? SIGN IN with <Icon type="save" />
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          validateTrigger={["onFinish"]}
          onFinish={(form) => {
            sendVerificationCode({
              ...form,
              phone_number: normalize(form.phone_number),
            })(dispatch);
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="first_name">
                <StackedLabel label="First Name" required>
                  <Input autoComplete="first_name" disabled={loading} />
                </StackedLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="last_name">
                <StackedLabel label="Last Name" required>
                  <Input autoComplete="last_name" disabled={loading} />
                </StackedLabel>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="phone_number">
            <StackedLabel label="Phone Number" phone="+250" required>
              <Input
                autoComplete="phone_number"
                type="tel"
                disabled={loading}
              />
            </StackedLabel>
          </Form.Item>
          <Form.Item name="password">
            <StackedLabel label="PIN" required>
              <Input.Password autoComplete="password" />
            </StackedLabel>
          </Form.Item>
          <Form.Item name="email">
            <StackedLabel label="Email Address">
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
              CREATE ACCOUNT
            </Button>
            <Divider>OR</Divider>
            <Button
              disabled={loading}
              type="text"
              block
              onClick={() => {
                changeAuthContext("login")(dispatch);
              }}
            >
              Got an account? SIGN IN with <Icon type="save" />
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default SignUp;
