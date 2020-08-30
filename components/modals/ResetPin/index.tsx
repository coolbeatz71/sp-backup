import React from "react";
import { Form, Input, Button, Divider, Alert, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import showAuthDialog, {
  changeAuthContext,
} from "redux/actions/Auth/showAuthDialog";

import reset from "redux/actions/pin/reset";
import update from "redux/actions/pin/reset-update";

import { normalize } from "dev-rw-phone";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import Icon from "components/common/CustomIcon";
import formPinValidator from "utils/validators/form-pin-validator";
import formPinMatchValidator from "utils/validators/form-pin-match-validator";

const ResetPin: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const [ph, setPh] = React.useState("");

  const {
    loading,
    error: { message: error = null },
  } = useSelector(({ pin: { reset: resetState } }: IRootState) => resetState);

  const {
    loading: loadingUpdate,
    error: { message: errorUpdate = null },
  } = useSelector(({ pin: { reset_update } }: IRootState) => reset_update);

  const { state, context } = useSelector(
    ({ auth: { showAuthDialog } }: IRootState) => showAuthDialog,
  );

  return (
    <Modal
      title="Reset PIN"
      visible={state && ["pin-reset", "pin-reset-update"].includes(context)}
      onCloseClick={() => {
        showAuthDialog(false)(dispatch);
      }}
    >
      {context === "pin-reset" ? (
        <Form
          validateTrigger={["onFinish"]}
          onFinish={({ phone_number }) => {
            const fph = normalize(phone_number);
            reset({ phone_number: fph })(dispatch);
            setPh(fph);
          }}
        >
          <Form.Item name="phone_number">
            <StackedLabel label="Phone Number" phone="+250" required>
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
              RESET PIN
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
              Remember PIN? SIGN IN with <Icon type="save" />
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
            <Typography.Text>
              Enter the verification code sent to your phone number
            </Typography.Text>
          </Form.Item>
          <Form.Item name="code">
            <StackedLabel label="Verification Code" required>
              <Input disabled={loadingUpdate} />
            </StackedLabel>
          </Form.Item>
          <Form.Item name="new_password" rules={formPinValidator("New PIN")}>
            <StackedLabel label="New PIN">
              <Input
                placeholder="New PIN"
                type="password"
                disabled={loadingUpdate}
              />
            </StackedLabel>
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={formPinMatchValidator("new_password", "New PIN and Confirm")}
          >
            <StackedLabel label="Confirm PIN">
              <Input
                placeholder="Confirm PIN"
                type="password"
                disabled={loadingUpdate}
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
              RESET PIN
            </Button>
            <Divider>OR</Divider>
            <Button
              disabled={loadingUpdate}
              type="text"
              block
              onClick={() => {
                changeAuthContext("login")(dispatch);
              }}
            >
              Remember PIN? SIGN IN with <Icon type="save" />
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ResetPin;
