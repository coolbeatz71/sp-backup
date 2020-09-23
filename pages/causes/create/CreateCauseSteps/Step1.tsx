import React from "react";

import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Select,
  InputNumber,
  DatePicker,
} from "antd";

import moment from "moment";

import StackedLabel from "components/common/StackedLabel";
import CropImage from "components/common/CropImage";

export interface Props {
  alerts: React.ReactElement | null;
  categories?: any[];
  data: any;
  setForm: (form: any) => void;
  cb: (data: any) => void;
  issue?: boolean[];
  steps?: any[];
}

const Step1: React.FC<Props> = ({
  alerts,
  categories = [],
  data,
  setForm,
  cb,
}) => {
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
        <span>Start by giving us the basic information on the Cause</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Cause name is required!" },
          {
            min: 20,
            max: 50,
            message:
              "Cause name's length must be between 20 and 50 characters!",
          },
        ]}
      >
        <StackedLabel label="Cause Name" charCount={[20, 50]}>
          <Input placeholder="Cause Name" />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="category"
        rules={[{ required: true, message: "Cause category is required!" }]}
      >
        <StackedLabel label="Category" select>
          <Select placeholder="Category">
            {categories.map((cat) => (
              <Select.Option
                key={cat.id}
                value={JSON.stringify({ id: cat.id, slug: cat.slug })}
              >
                {cat.title}
              </Select.Option>
            ))}
          </Select>
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="target"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
            message: "Cause fundraising target is required!",
          },
        ]}
      >
        <StackedLabel label="Cause Fundraising Target" formatNumber>
          <InputNumber placeholder="Cause Fundraising Target" />
        </StackedLabel>
      </Form.Item>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            name="start"
            rules={[
              { required: true, message: "Cause start is required!" },
              () => ({
                validator(_rule, value) {
                  if ([null, undefined, ""].includes(value)) {
                    return Promise.resolve();
                  }

                  if (!moment(value).isValid()) {
                    return Promise.reject("Invalid date!");
                  }

                  if (moment(value).isBefore(moment().startOf("day"))) {
                    return Promise.reject(
                      "Cause start should not be in the past!",
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <StackedLabel label="Start Date" datePicker>
              <DatePicker inputReadOnly />
            </StackedLabel>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="end"
            rules={[
              { required: true, message: "Cause end is required!" },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if ([null, undefined, ""].includes(value)) {
                    return Promise.resolve();
                  }

                  if (!moment(value).isValid()) {
                    return Promise.reject("Invalid date!");
                  }

                  const start = moment(getFieldValue("start"));

                  if (start.isValid() && moment(value).isBefore(start)) {
                    return Promise.reject("Should not be before start date");
                  }

                  if (moment(value).isBefore(moment().startOf("day"))) {
                    return Promise.reject("Should not be in the past");
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <StackedLabel label="End Date" datePicker>
              <DatePicker inputReadOnly />
            </StackedLabel>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <CropImage
          file={data.file || []}
          image={data.image || null}
          uploadFile={data.uploadFile || null}
          onCancel={() => {
            cb({ image: null, file: [], step: 0 });
          }}
          onOk={(image: any, file: any[], uploadFile: any) => {
            cb({ image, file, uploadFile, step: 0 });
          }}
        />
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
