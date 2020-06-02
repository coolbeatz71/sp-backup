import React from "react";
import { Form, Select, Switch } from "antd";
import { Input } from "components/common/Input";
import PhoneCountrySelector from "components/common/PhoneCountrySelector";
import { mobileMoney } from "constants/paymentMethods";

export interface PaymentInfoProps {}

const PaymentInfo: React.FC<PaymentInfoProps> = () => {
  return (
    <div>
      <Form.Item
        name="payment_method"
        validateTrigger={["onSubmit", "onBlur", "onChange"]}
        rules={[{ required: true }]}
      >
        <Select placeholder="Select Payment Method">
          {mobileMoney.map(({ name, text }) => (
            <Select.Option key={name} value={name}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="form-group"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ len: 9, required: true }]}
        name="payment_account_number"
      >
        <Input
          placeholder="Enter Phone Number"
          addonBefore={PhoneCountrySelector}
          maxLength={9}
        />
      </Form.Item>
      <Form.Item
        name="payment_account_name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input  placeholder="Account Name" />
      </Form.Item>
      <div className="d-flex">
        <span className="font-weight-bold">
            Private Cause
        </span>
        <Form.Item
          className="form-group ml-3 mb-1"
          validateTrigger={["onSubmit", "onBlur"]}
          name="access"
        >
          <Switch />
        </Form.Item>
      </div>
      <p className="note mb-4">Note: This cause will not be published on our website.</p>
    <style jsx>{`
        .note{
          font-size: 0.87em;
          font-weight: 500;
          color: rgba(51, 51, 51, 0.6);
        }
      `}</style>
    </div>
  );
};

export default PaymentInfo;
