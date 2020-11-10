import React from "react";
import numeral from "numeral";
import { Row, Col, Button, Input, Form, InputNumber, Alert } from "antd";
import StackedLabel from "components/common/StackedLabel";
import styles from "./index.module.scss";

export interface Props {
  data: any;
  setForm: (form: any) => void;
  cb: (data: any) => void;
  issue?: boolean[];
  steps?: any[];
  currentBalance?: number;
  currency?: string;
}

const Step1: React.FC<Props> = ({
  data,
  setForm,
  cb,
  currentBalance,
  currency,
}) => {
  const [isMaxError, setMaxError] = React.useState<boolean>(false);

  const maxErrorMsg = `The maximum cashout amount is 2,000,000 ${currency} in 24 hours.`;
  const maxErrorDesc = (
    <>
      For more details email us on{" "}
      <a href="mailto:support@saveplus.io">support@saveplus.io</a> or call on
      0735240491
    </>
  );

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
        <span>
          The balance is {numeral(currentBalance).format()} {currency}
        </span>
      </Form.Item>

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
          {
            type: "number",
            max: 2000000,
            message: " ",
          },
        ]}
        validateTrigger={["onSubmit", "onBlur"]}
      >
        <StackedLabel label="Amount" formatNumber>
          <InputNumber
            placeholder="Amount"
            onKeyUp={(e) => {
              const amount = numeral(e.currentTarget.value).value();
              setMaxError(amount > 2000000);
            }}
          />
        </StackedLabel>
      </Form.Item>

      {isMaxError && (
        <Form.Item>
          <Alert
            message={maxErrorMsg}
            description={maxErrorDesc}
            type="error"
            showIcon
            className={styles.steps__maxError}
          />
        </Form.Item>
      )}

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
