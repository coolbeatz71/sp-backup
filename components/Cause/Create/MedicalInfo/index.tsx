import React from "react";
import { Form } from "antd";
import { Input } from "components/common/Input";
import PhoneCountrySelector from "components/common/PhoneCountrySelector";

export interface MedicalInfoProps {}

const MedicalInfo: React.FC<MedicalInfoProps> = () => {
  return (
    <div>
      <Form.Item
        name="institution_name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Name of Hospital" />
      </Form.Item>
      <Form.Item
        className="form-group"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ len: 9, required: true }]}
        name="institution_phone_number"
      >
        <Input
          placeholder="Hospital Phone Number"
          addonBefore={PhoneCountrySelector}
          maxLength={9}
        />
      </Form.Item>
      <h5 className="form__title">Next Of Kin</h5>
      <Form.Item
        name="next_keen_names"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        name="next_keen_relationship"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Relationship with person" />
      </Form.Item>
      <Form.Item
        className="form-group"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ len: 9, required: true }]}
        name="next_keen_phone_number"
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

export default MedicalInfo;
