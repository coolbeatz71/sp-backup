import React, { useState, useEffect } from "react";
import { Form, Select, DatePicker, Upload } from "antd";
import { Input } from "components/common/Input";
import { FileImageOutlined } from "@ant-design/icons";
import splApi from "helpers/axios";
import { Icategories } from 'interfaces/categories';

export interface BasicInfoProps {}

const { RangePicker } = DatePicker;

const BasicInfo: React.FC<BasicInfoProps> = () => {
  const [categories, setCatories] = useState<Icategories[]>([]);
  useEffect(() => {
    splApi
    .get("/categories")
    .then((response: any) => {
      setCatories(response.categories);
    })
    .catch((error) => {
      console.error("here", error);
    });
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div>
      <Form.Item
        name="name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input  placeholder="Cause Name" />
      </Form.Item>
      <Form.Item
        name="category_id"
        validateTrigger={["onSubmit", "onBlur", "onChange"]}
        rules={[{ required: true }]}
      >
        <Select placeholder="Category">
          {categories.length > 0 && categories.map(({ id, title }) => (
            <Select.Option key={id} value={id}>
              {title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="target_amount"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input
          type="number"
          placeholder="Cause fundraising target"
          suffix="RWF"
        />
      </Form.Item>
      <Form.Item
        name="duration"
        validateTrigger={["onSubmit", "onChange"]}
        rules={[{ required: true }]}
      >
        <RangePicker className="w-100" />
      </Form.Item>
      <div className="mb-3">
        <p className="font-weight-bold">Image</p>
        <Form.Item>
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: true }]}
          >
            <Upload.Dragger beforeUpload={() => false} listType="picture" multiple={false} >
              <p className="ant-upload-drag-icon">
                <FileImageOutlined />
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </div>
    </div>
  );
};

export default BasicInfo;
