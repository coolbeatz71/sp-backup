import React from "react";
import { phone } from "dev-rw-phone";

import { Row, Col, Button, Input, Form } from "antd";

import StackedLabel from "components/common/StackedLabel";

import { Props } from "./Step1";

const StepOrg: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
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
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="org_name"
        rules={[{ required: true, message: "Name is required!" }]}
      >
        <StackedLabel label="Name">
          <Input placeholder="Name" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="org_email"
        rules={[
          { type: "email", message: "Valid email is required!" },
          { required: true, message: "Email is required!" },
        ]}
      >
        <StackedLabel label="Email">
          <Input placeholder="Email" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="org_phone_number"
        rules={[
          { required: true, message: "Phone number is required!" },
          () => ({
            validator(_rule: any, value: any) {
              if (!phone(value).isOk) {
                return Promise.reject("Phone number should be valid");
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <StackedLabel label="Phone Number" phone="+250">
          <Input placeholder="Phone Number" maxLength={9} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="org_field"
        rules={[{ required: true, message: "Field is required!" }]}
      >
        <StackedLabel label="Field">
          <Input placeholder="Field" />
        </StackedLabel>
      </Form.Item>
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

export default StepOrg;
