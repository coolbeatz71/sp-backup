import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Button, Input, Form } from "antd";
import { Props } from "./Step1";
import StackedLabel from "components/common/StackedLabel";

const Step3: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
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
        <span>{t("how can we contact you")}</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="contact_phone_number"
        rules={[{ required: true, message: t("phone number is required") }]}
      >
        <StackedLabel label={t("phone number")} phone="+250">
          <Input placeholder={t("phone number")} maxLength={9} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="contact_email"
        rules={[
          { type: "email", message: t("phone number should be valid") },
          { required: true, message: t("email is required") },
        ]}
      >
        <StackedLabel label={t("email")}>
          <Input placeholder={t("email")} />
        </StackedLabel>
      </Form.Item>
      <br />
      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>
            <Button onClick={() => cb({ step: -1 })}>
              {t("previous").toUpperCase()}
            </Button>
          </Col>
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

export default Step3;
