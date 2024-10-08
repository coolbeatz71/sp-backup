import { FC, useEffect, useState } from "react";
import { Button, Form, Input, Row, Col, Modal, message, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import StackedLabel from "components/common/StackedLabel";

// import { cancelCause, clear } from "redux/reducers/cancelCause";

const cancelCause = (_sl: string, _pa: string) => {
  //
};

const clear = () => {
  //
};

interface Props {
  record: { [key: string]: any };
  reload: () => void;
  className: any;
  type?: any;
}

const CancelModal: FC<Props> = ({
  record,
  reload,
  className,
  type = "text",
}) => {
  const { loading, error, success } = useSelector(
    (state: any) => state.cancelCause,
  );

  const dispatch = useDispatch();

  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (success) {
      message.success(`Cancelled cause "${record.name}"`);
      dispatch(clear());
      reload();
      setVisible(false);
    }
  }, [success]);

  return (
    <>
      {["active", "paused"].includes(record.status) && (
        <Button
          className={className}
          type={type}
          danger
          onClick={() => {
            dispatch(clear());
            setVisible(true);
            setPassword("");
          }}
        >
          Cancel Cause
        </Button>
      )}
      <Modal
        title={`Cancel cause "${record.name}"`}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form
          initialValues={{ password }}
          validateTrigger={["onFinish"]}
          onValuesChange={({ password: ps }) => {
            setPassword(ps);
          }}
          onFinish={({ password }) => {
            dispatch(cancelCause(record.slug, password));
          }}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "PIN is required!" }]}
          >
            <StackedLabel label="PIN">
              <Input
                size="large"
                placeholder="PIN"
                type="password"
                disabled={loading}
              />
            </StackedLabel>
          </Form.Item>
          {error && (
            <Form.Item>
              <Alert message="Error" description={error} type="error" />
            </Form.Item>
          )}
          <Form.Item>
            <Row gutter={20} justify="space-between">
              <Col>{` `}</Col>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  danger
                >
                  CANCEL
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CancelModal;
