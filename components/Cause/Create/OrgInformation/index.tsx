import React from "react";
import { Form } from "antd";
import { Input } from "components/common/Input";
import isLocation from "helpers/isLocation";

export interface OrgInformationProps {}

const OrgInformation: React.FC<OrgInformationProps> = () => {
  const isEditing = isLocation(["causes", "edit"]);
  return (
    <div>
      <Form.Item
        name="organization_name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Name of Organization/NGO" disabled={isEditing} />
      </Form.Item>
      <Form.Item
        name="organization_field"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Sector of Organization/NGO" disabled={isEditing} />
      </Form.Item>
      <Form.Item
        name="organization_email"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3, type: "email" }]}
      >
        <Input placeholder="Official Email Address" disabled={isEditing} />
      </Form.Item>
      <Form.Item
        className="form-group phone-code"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[
          { len: 9, required: true },
          {
            pattern: /^7[238]/,
            message: "Phone number format should be valid",
          },
        ]}
        name="organization_phone_number"
      >
        <Input
          placeholder="Contact Phone Number"
          disabled={isEditing}
          addonBefore="+250"
          maxLength={9}
        />
      </Form.Item>
    </div>
  );
};

export default OrgInformation;
