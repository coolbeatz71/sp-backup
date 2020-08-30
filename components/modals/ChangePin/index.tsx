import React from "react";
import { Row, Col, Button, Input, Form, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import formPinValidator from "utils/validators/form-pin-validator";
import formPinMatchValidator from "utils//validators/form-pin-match-validator";

import change from "redux/actions/pin/change";

import { IRootState } from "redux/initialStates";
import { useRouter } from "next/router";

interface Props {
  visible: boolean;
  onVisible: () => void;
  onCancel: () => void;
}

const ChangePin: React.FC<Props> = ({ visible, onVisible, onCancel }) => {
  const dispatch = useDispatch();

  const [vis, setVis] = React.useState(visible);

  const router = useRouter();

  const {
    loading,
    error: { message: error = null },
  } = useSelector(({ pin: { change: ch } }: IRootState) => ch);

  React.useEffect(() => {
    setVis(visible);
  }, [visible]);

  return (
    <Modal
      title="Change PIN"
      visible={vis}
      onVisible={() => {
        setVis(true);
        onVisible();
      }}
      onCancel={() => {
        setVis(false);
        onCancel();
      }}
    >
      <Form
        initialValues={{}}
        validateTrigger={["onFinish"]}
        onFinish={({ old_pin: old_password, new_pin: new_password }) => {
          change(
            () => {
              setVis(false);
              router.reload();
            },
            { old_password, new_password },
          )(dispatch);
        }}
      >
        <Form.Item name="old_pin" rules={formPinValidator("Old PIN")}>
          <StackedLabel label="Old PIN">
            <Input placeholder="Old PIN" type="password" disabled={loading} />
          </StackedLabel>
        </Form.Item>
        <Form.Item name="new_pin" rules={formPinValidator("New PIN")}>
          <StackedLabel label="New PIN">
            <Input placeholder="New PIN" type="password" disabled={loading} />
          </StackedLabel>
        </Form.Item>
        <Form.Item
          name="confirm_pin"
          rules={formPinMatchValidator("new_pin", "New PIN and Confirm")}
        >
          <StackedLabel label="Confirm PIN">
            <Input
              placeholder="Confirm PIN"
              type="password"
              disabled={loading}
            />
          </StackedLabel>
        </Form.Item>
        {error && (
          <Form.Item>
            <Alert message={error} type="error" />
          </Form.Item>
        )}
        <Form.Item>
          <Row gutter={20} justify="space-between">
            <Col>{/* */}</Col>
            <Col>
              <Button type="primary" htmlType="submit" loading={loading}>
                CHANGE PIN
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePin;
