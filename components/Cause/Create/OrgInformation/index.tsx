import React from "react";
import { Form } from "antd";
import { Input } from "components/common/Input";
import PhoneCountrySelector from 'components/common/PhoneCountrySelector';

export interface OrgInformationProps {}

const OrgInformation: React.FC<OrgInformationProps> = () => {
  return (
    <div>
      <Form.Item
        name="organization_name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Name of Organization/NGO" />
      </Form.Item>
      <Form.Item
        name="organization_field"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Sector of Organization/NGO" />
      </Form.Item>
      <Form.Item
        name="organization_email"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3, type: "email" }]}
      >
        <Input placeholder="Official Email Address" />
      </Form.Item>
      <Form.Item
        className="form-group"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ len: 9, required: true }]}
        name="organization_phone_number"
      >
        <Input
          placeholder="Contact Phone Number"
          addonBefore={PhoneCountrySelector}
          maxLength={9}
        />
      </Form.Item>
    </div>
  );
};

export default OrgInformation;
