import React from "react";
import { Button, Form, Input, Row, Col, Modal, message, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import StackedLabel from "components/common/StackedLabel";

// import { pauseCause, clear } from "redux/reducers/pauseCause";

const pauseCause = (sl: string, pa: string, st: boolean) => {
  console.log(sl, pa, st);
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

const PauseModal: React.FC<Props> = ({
  record,
  reload,
  className,
  type = "text",
}) => {
  const { loading, error, success } = useSelector(
    (state: any) => state.pauseCause,
  );

  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");

  React.useEffect(() => {
    if (success) {
      message.success(
        `${record.status === "paused" ? "Resumed" : "Paused"} cause "${
          record.name
        }"`,
      );
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
          onClick={() => {
            dispatch(clear());
            setVisible(true);
            setPassword("");
          }}
        >
          {record.status === "paused" ? "Resume" : "Pause"} Cause
        </Button>
      )}
      <Modal
        destroyOnClose
        title={`${record.status === "paused" ? "Resume" : "Pause"} cause "${
          record.name
        }"`}
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
            dispatch(
              pauseCause(record.slug, password, record.status === "active"),
            );
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
                  {record.status === "paused" ? "RESUME" : "PAUSE"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PauseModal;
