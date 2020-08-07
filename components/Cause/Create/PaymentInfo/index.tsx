import React, { useState } from "react";
import { Form, Switch } from "antd";
import { InputPhoneNumber } from "components/common/Input";
import isLocation from "helpers/isLocation";

export interface PaymentInfoProps {}

const PaymentInfo: React.FC<PaymentInfoProps> = () => {
  const [isPrivate, setPrivate] = useState<boolean>(false);
  const handleAccess = (isChecked: boolean) => setPrivate(isChecked);
  const isEditing = isLocation(["causes", "edit"]);

  return (
    <div>
      <Form.Item
        className="form-group"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[
          { required: true },
          {
            pattern: /^7[238]\d{7}/,
            message: "Should be a valid phone number",
          },
        ]}
        name="payment_account_number"
      >
        <InputPhoneNumber
          placeholder="Enter Phone Number"
          disabled={isEditing}
          maxLength={9}
        />
      </Form.Item>
      <div className="d-flex">
        <span className="font-weight-bold">Private Cause</span>
        <Form.Item
          className="form-group ml-3 mb-1"
          validateTrigger={["onSubmit", "onBlur"]}
          name="access"
        >
          <Switch onChange={handleAccess} disabled={isEditing} />
        </Form.Item>
      </div>
      {isPrivate && (
        <p className="note">
          Note: This cause will not be published on our website.
        </p>
      )}
      <style jsx>{`
        .note {
          font-size: 0.87em;
          color: rgba(51, 51, 51, 0.6);
        }
      `}</style>
    </div>
  );
};

export default PaymentInfo;
