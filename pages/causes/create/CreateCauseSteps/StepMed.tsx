import React from "react";

import { Row, Col, Button, Input, Form } from "antd";

import StackedLabel from "components/common/StackedLabel";

import styles from "./index.module.scss";

import { Props } from "./Step1";

const StepMed: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
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
        name="hospital"
        rules={[{ required: true, message: "Name of hospital is required!" }]}
      >
        <StackedLabel label="Name of Hospital">
          <Input placeholder="Name of Hospital" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="hospital_phone_number"
        rules={[
          { required: true, message: "Hospital phone number is required!" },
        ]}
      >
        <StackedLabel label="Hospital Phone Number" phone="+250">
          <Input placeholder="Hospital Phone Number" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="hospital_email"
        rules={[
          { type: "email", message: "Valid email is required!" },
          { required: true, message: "Email is required!" },
        ]}
      >
        <StackedLabel label="Hospital Email">
          <Input placeholder="Hospital Email" />
        </StackedLabel>
      </Form.Item>
      <Form.Item>
        <span>{` `}</span>
      </Form.Item>
      <div className={styles.create__title_separator}>
        <strong>Next of Kin</strong>
      </div>
      <Form.Item
        name="nok_name"
        rules={[{ required: true, message: "Full name is required!" }]}
      >
        <StackedLabel label="Full Name">
          <Input placeholder="Full Name" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="nok_relationship"
        rules={[{ required: true, message: "Relationship is required!" }]}
      >
        <StackedLabel label="Relationship">
          <Input placeholder="Relationship" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="nok_phone_number"
        rules={[{ required: true, message: "Phone number is required!" }]}
      >
        <StackedLabel label="Phone Number" phone="+250">
          <Input placeholder="Phone Number" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="nok_email"
        rules={[
          { type: "email", message: "Valid email is required!" },
          { required: true, message: "Email is required!" },
        ]}
      >
        <StackedLabel label="Email">
          <Input placeholder="Email" />
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

export default StepMed;
