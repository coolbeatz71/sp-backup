import React from "react";
import { Row, Col, Button, Input, Form } from "antd";
import StackedLabel from "components/common/StackedLabel";
import { Props } from "./Step1";

const Step3: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
  return (
    <Form
      ref={(ref) => setForm(ref)}
      initialValues={data}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        cb({ ...dt, step: 1 });
      }}
    >
      <Form.Item>
        <span>Tell us how we can contact you</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="contact_phone_number"
        rules={[{ required: true, message: "Phone number is required!" }]}
      >
        <StackedLabel label="Phone Number" phone="+250">
          <Input placeholder="Phone Number" maxLength={9} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="contact_email"
        rules={[
          { type: "email", message: "Valid email is required!" },
          { required: true, message: "Email is required!" },
        ]}
      >
        <StackedLabel label="Email Address">
          <Input placeholder="Email Address" />
        </StackedLabel>
      </Form.Item>
      <br />
      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>
            <Button onClick={() => cb({ step: -1 })}>PREVIOUS</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              NEXT
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step3;
