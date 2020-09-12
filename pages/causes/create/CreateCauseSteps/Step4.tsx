import React from "react";
import { useSelector } from "react-redux";
import { phone } from "dev-rw-phone";
import { IRootState } from "redux/initialStates";

import { Row, Col, Button, Input, Form, Switch, Alert, Select } from "antd";

import StackedLabel from "components/common/StackedLabel";

import { Props } from "./Step1";

const Step4: React.FC<Props> = ({
  alerts,
  data,
  setForm,
  cb,
  issue = [],
  steps = [],
}) => {
  const { loading, error } = useSelector(
    (state: IRootState) => state.cause.create
  );

  return (
    <Form
      ref={(ref) => setForm(ref)}
      initialValues={{
        ...data,
        payment_account_name:
          phone(data.account).telco === "MTN" ? "MTN_Rwanda" : "Airtel_Rwanda",
      }}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        cb({ ...dt, step: 0, submit: true });
      }}
    >
      <Form.Item>
        <span>How do you want to receive your donations</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="payment_account_name"
        rules={[{ required: true, message: "Payment method is required" }]}
      >
        <StackedLabel label="Select Payment Method" select>
          <Select placeholder="Payment Method">
            <Select.Option key="MTN_Rwanda" value="MTN_Rwanda">
              MTN Mobile Money
            </Select.Option>
            <Select.Option key="Airtel_Rwanda" value="Airtel_Rwanda">
              Airtel Money
            </Select.Option>
          </Select>
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="account"
        rules={[
          { required: true, message: "Phone number is required!" },
          () => ({
            validator(_rule: any, value: any) {
              if (
                data.payment_account_name === "MTN_Rwanda" &&
                phone(value).telco !== "MTN"
              ) {
                return Promise.reject("Should be a valid MTN Number");
              }

              if (
                data.payment_account_name === "Airtel_Rwanda" &&
                phone(value).telco !== "Airtel"
              ) {
                return Promise.reject("Should be a valid Airtel Number");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <StackedLabel label="Phone Number" phone="+250">
          <Input placeholder="Phone Number" disabled={loading} />
        </StackedLabel>
      </Form.Item>
      <Form.Item id="isPrivate" label="Private cause">
        <Switch
          checked={data.isPrivate}
          onChange={(isPrivate) => cb({ isPrivate, step: 0 })}
          disabled={loading}
        />
      </Form.Item>
      {data.isPrivate && (
        <Form.Item>
          <strong>Note:</strong> This cause will not be published publicly on
          our website.
        </Form.Item>
      )}
      {issue.length > 0 && (
        <Form.Item>
          <Alert
            message={
              issue.length === 1
                ? "A step has an issue:"
                : "Some steps have issues:"
            }
            description={
              <ul>
                {issue.map(
                  (iss, ind) =>
                    iss && (
                      <li key={`step-${ind}`}>
                        Step {ind + 1}: {steps[ind].title}
                      </li>
                    )
                )}
              </ul>
            }
            type="error"
          />
        </Form.Item>
      )}
      {error && (
        <Form.Item>
          <Alert message="Error" description={error} type="error" />
        </Form.Item>
      )}
      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>
            <Button onClick={() => cb({ step: -1 })} disabled={loading}>
              PREVIOUS
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              CREATE
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step4;
