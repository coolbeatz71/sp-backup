import React from "react";
import { useTranslation } from "react-i18next";

import { Row, Col, Button, Input, Form } from "antd";

import StackedLabel from "components/common/StackedLabel";

import styles from "./index.module.scss";

import { Props } from "./Step1";

const StepMed: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
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
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="hospital"
        rules={[{ required: true, message: t("name of hospital is required") }]}
      >
        <StackedLabel label={t("name of hospital")}>
          <Input placeholder={t("name of hospital")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="hospital_phone_number"
        rules={[{ required: true, message: t("name of hospital is required") }]}
      >
        <StackedLabel label={t("hospital phone number")} phone="+250">
          <Input placeholder={t("hospital phone number")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="hospital_email"
        rules={[
          { type: "email", message: t("email should be valid") },
          { required: true, message: t("email is required") },
        ]}
      >
        <StackedLabel label={t("hospital email")}>
          <Input placeholder={t("hospital email")} />
        </StackedLabel>
      </Form.Item>
      <br />
      <div className={styles.create__title_separator}>
        <strong>{t("next of keen")}</strong>
      </div>
      <Form.Item
        name="nok_name"
        rules={[{ required: true, message: t("full name is required") }]}
      >
        <StackedLabel label={t("full name")}>
          <Input placeholder={t("full name")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="nok_relationship"
        rules={[{ required: true, message: t("relationship is required") }]}
      >
        <StackedLabel label={t("next of keen relationship")}>
          <Input placeholder={t("next of keen relationship")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="nok_phone_number"
        rules={[{ required: true, message: t("phone number is required") }]}
      >
        <StackedLabel label={t("phone number")} phone="+250">
          <Input placeholder={t("phone number")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="nok_email"
        rules={[
          { type: "email", message: t("email should be valid") },
          { required: true, message: t("email is required") },
        ]}
      >
        <StackedLabel label={t("email")}>
          <Input placeholder={t("email")} />
        </StackedLabel>
      </Form.Item>
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

export default StepMed;
