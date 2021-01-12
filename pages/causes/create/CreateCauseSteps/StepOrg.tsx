import { FC } from "react";
import { Row, Col, Button, Input, Form } from "antd";
import { phone } from "dev-rw-phone";
import { useTranslation } from "react-i18next";
import { Props } from "./Step1";
import StackedLabel from "components/common/StackedLabel";

const StepOrg: FC<Props> = ({ alerts, data, setForm, cb }) => {
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
        name="org_name"
        rules={[{ required: true, message: t("name is required") }]}
      >
        <StackedLabel label={t("name")}>
          <Input placeholder={t("name")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="org_email"
        rules={[
          { type: "email", message: t("email should be valid") },
          { required: true, message: t("email is required") },
        ]}
      >
        <StackedLabel label={t("email")}>
          <Input placeholder={t("email")} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="org_phone_number"
        rules={[
          { required: true, message: t("phone number is required") },
          () => ({
            validator(_rule: any, value: any) {
              if (!phone(value).isOk) {
                return Promise.reject(t("phone number should be valid"));
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <StackedLabel label={t("phone number")} phone="+250">
          <Input placeholder={t("phone number")} maxLength={9} />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="org_field"
        rules={[{ required: true, message: t("field is required") }]}
      >
        <StackedLabel label={t("field")}>
          <Input placeholder={t("field")} />
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

export default StepOrg;
