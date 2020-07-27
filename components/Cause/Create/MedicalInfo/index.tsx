import React from "react";
import { Form } from "antd";
import { Input } from "components/common/Input";
import isLocation from "helpers/isLocation";

export interface MedicalInfoProps {}

const MedicalInfo: React.FC<MedicalInfoProps> = () => {
  const isEditing = isLocation(["causes", "edit"]);
  return (
    <div>
      <Form.Item
        name="institution_name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input disabled={isEditing}  placeholder="Name of Hospital" />
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
        name="institution_phone_number"
      >
        <Input
          placeholder="Hospital Phone Number"
          disabled={isEditing}
          addonBefore="+250"
          maxLength={9}
        />
      </Form.Item>
      <h5 className="form__title">Next Of Kin</h5>
      <Form.Item
        name="next_keen_names"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input disabled={isEditing} placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        name="next_keen_relationship"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input disabled={isEditing} placeholder="Relationship with person" />
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
        name="next_keen_phone_number"
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

export default MedicalInfo;
