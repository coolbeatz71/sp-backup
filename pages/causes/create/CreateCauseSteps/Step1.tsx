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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        <span>{t("start by providing basic cause details")}</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="name"
        rules={[
          { required: true, message: t("cause name is required") },
          {
            min: 20,
            max: 50,
            message: t("cause_name_range_error", {
              min: 800,
              max: "1,000",
            }),
          },
        ]}
      >
        <StackedLabel label={t("cause name")} charCount={[20, 50]}>
          <Input placeholder={t("cause name")} maxLength={50} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="category"
        rules={[{ required: true, message: t("category is required") }]}
      >
        <StackedLabel label={t("category")} select>
          <Select placeholder="Category">
            {categories.map((cat) => (
              <Select.Option
                key={cat.id}
                value={JSON.stringify({ id: cat.id, slug: cat.slug })}
              >
                {t(cat.title)}
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
            message: t("cause target is required"),
          },
        ]}
      >
        <StackedLabel label={t("cause fundraising target")} formatNumber>
          <InputNumber placeholder={t("cause fundraising target")} />
        </StackedLabel>
      </Form.Item>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            name="start"
            rules={[
              { required: true, message: t("cause start date is required") },
              () => ({
                validator(_rule, value) {
                  if ([null, undefined, ""].includes(value)) {
                    return Promise.resolve();
                  }

                  if (!moment(value).isValid()) {
                    return Promise.reject(t("invalid date"));
                  }

                  if (moment(value).isBefore(moment().startOf("day"))) {
                    return Promise.reject(t("should not be in past"));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <StackedLabel label={t("start date")} datePicker>
              <DatePicker inputReadOnly />
            </StackedLabel>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="end"
            rules={[
              { required: true, message: t("cause end date is required") },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if ([null, undefined, ""].includes(value)) {
                    return Promise.resolve();
                  }

                  if (!moment(value).isValid()) {
                    return Promise.reject(t("invalid date"));
                  }

                  const start = moment(getFieldValue("start"));

                  if (start.isValid() && moment(value).isBefore(start)) {
                    return Promise.reject(
                      t("end date should not be before start date")
                    );
                  }

                  if (moment(value).isBefore(moment().startOf("day"))) {
                    return Promise.reject(t("should not be in past"));
                  }

                  if (
                    moment(value).isBefore(moment().add(1, "day").endOf("day"))
                  ) {
                    return Promise.reject(t("should be 2 days from now"));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <StackedLabel label={t("end date")} datePicker>
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
              {t("next").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step1;
