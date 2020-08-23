import React from "react";
import { Form, Input, Row, Col, Button, Divider, Typography } from "antd";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";

import styles from "./index.module.scss";

interface Props {
  trigger?: React.ReactElement;
  signUp?: () => void;
  resetPin?: () => void;
  visible?: boolean;
  onVisible?: () => void;
  onCancel?: () => void;
}

const SignIn: React.FC<Props> = ({
  trigger,
  signUp = () => {
    //
  },
  resetPin = () => {
    //
  },
  visible: vs = false,
  onVisible = () => {
    //
  },
  onCancel = () => {
    //
  },
}) => {
  const [visible, setVisible] = React.useState(vs);

  React.useEffect(() => {
    if (visible !== vs) setVisible(vs);
  }, [vs]);

  return (
    <Modal
      title="Welcome back!"
      trigger={trigger}
      visible={visible}
      onVisible={() => {
        setVisible(true);
        onVisible();
      }}
      onCancel={() => {
        setVisible(false);
        onCancel();
      }}
    >
      <Form className={styles.sign_in}>
        <Form.Item name="phone_number">
          <StackedLabel label="Phone Number" phone="+250" required>
            <Input autoComplete="phone_number" type="tel" />
          </StackedLabel>
        </Form.Item>
        <Form.Item name="password">
          <StackedLabel label="PIN" required>
            <Input.Password autoComplete="password" />
          </StackedLabel>
        </Form.Item>
        <Form.Item name="email">
          <StackedLabel label="Email Address">
            <Input type="email" autoComplete="email" />
          </StackedLabel>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            SIGN IN
          </Button>
          <Divider>OR</Divider>
          <Row justify="space-between">
            <Col>
              <Button
                className={styles.sign_in__button_left}
                type="text"
                onClick={() => {
                  setVisible(false);
                  onCancel();
                  resetPin();
                }}
              >
                Forgot PIN?&nbsp;
                <Typography.Text underline>Reset</Typography.Text>
              </Button>
            </Col>
            <Col>
              <Button
                className={styles.sign_in__button_right}
                type="text"
                onClick={() => {
                  setVisible(false);
                  onCancel();
                  signUp();
                }}
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
