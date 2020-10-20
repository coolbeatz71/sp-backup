import React from "react";
import { Row, Col, Button, Input, Form, InputNumber } from "antd";
import StackedLabel from "components/common/StackedLabel";
import styles from "./index.module.scss";

export interface Props {
  data: any;
  setForm: (form: any) => void;
  cb: (data: any) => void;
  issue?: boolean[];
  steps?: any[];
}

const Step1: React.FC<Props> = ({ data, setForm, cb }) => {
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
      <Form.Item
        name="amount"
        rules={[
          {
            required: true,
            message: "The amount is required!",
          },
          {
            pattern: /([1-9][\d,]{2,})$$/g,
            message: "The amount should be valid with a minimum of 100 rwf!",
          },
        ]}
        validateTrigger={["onSubmit", "onBlur"]}
      >
        <StackedLabel label="Amount" formatNumber>
          <InputNumber placeholder="Amount" />
        </StackedLabel>
      </Form.Item>

      <Form.Item
        name="reason"
        rules={[
          { required: true, message: "Reason is required!" },
          {
            min: 10,
            max: 100,
            message: "Reason's length must be between 10 and 100 characters!",
          },
        ]}
      >
        <StackedLabel label="Reason" charCount={[10, 100]}>
          <Input.TextArea
            className={styles.steps__text_area}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder="Reason"
            maxLength={100}
          />
        </StackedLabel>
      </Form.Item>

      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>{/* */}</Col>
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

export default Step1;
