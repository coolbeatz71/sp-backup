import React from "react";
import { Form, Input, Button, Divider } from "antd";

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

const ResetPin: React.FC<Props> = ({
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
      title="Reset PIN"
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
        <Form.Item name="phone_number">
          <StackedLabel label="Phone Number" phone="+250" required>
            <Input autoComplete="phone_number" type="tel" />
          </StackedLabel>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            RESET PIN
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
            Remember PIN? SIGN IN with <Icon type="save" />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPin;
