import React from "react";
import { Form, Input, Row, Col, Button, Divider } from "antd";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import Icon from "components/common/CustomIcon";

interface Props {
  trigger?: React.ReactElement;
  signIn?: () => void;
  visible?: boolean;
  onVisible?: () => void;
  onCancel?: () => void;
}

const SignUp: React.FC<Props> = ({
  trigger,
  signIn = () => {
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
      title="Create a save account"
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
      <Form>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="first_name">
              <StackedLabel label="First Name" required>
                <Input autoComplete="first_name" />
              </StackedLabel>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="last_name">
              <StackedLabel label="Last Name" required>
                <Input autoComplete="last_name" />
              </StackedLabel>
            </Form.Item>
          </Col>
        </Row>
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
            CREATE ACCOUNT
          </Button>
          <Divider>OR</Divider>
          <Button
            type="text"
            block
            onClick={() => {
              setVisible(false);
              onCancel();
              signIn();
            }}
          >
            Got an account? SIGN IN with <Icon type="save" />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUp;
