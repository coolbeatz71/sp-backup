import React from "react";
import { Form, Switch } from "antd";
import { TextArea } from "components/common/Input";

export interface DetailedInfoProps {}

const DetailedInfo: React.FC<DetailedInfoProps> = () => {
  return (
    <div>
      <Form.Item
        name="summary"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, max: 280, min: 3 }]}
      >
        <TextArea maxLength={280} placeholder="Summary of this Cause. " />
      </Form.Item>
      <Form.Item
        name="description"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, max: 1000, min: 3 }]}
      >
        <TextArea rows={6}  maxLength={1000} placeholder="Details about the cause" />
      </Form.Item>
      <div className="d-flex justify-content-between my-4">
        <span className="font-weight-bold">Is this cause afflilated to any Organization/NGO </span>
        <Form.Item
          name="affiliated"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </div>
    </div>
  );
};

export default DetailedInfo;
