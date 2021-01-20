import { FC } from "react";
import { Row, Col, Button, Input, Form, Alert } from "antd";
import { IRootState } from "redux/initialStates";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import StackedLabel from "components/common/StackedLabel";
import { Props } from "./Step1";
import formPinValidator from "utils/validators/form-pin-validator";

const Step2: FC<Props> = ({ data, setForm, cb, issue = [] }) => {
  const [form] = Form.useForm();

  const { loading, error } = useSelector(
    ({ cause: { cashout } }: IRootState) => cashout,
  );

  const { t } = useTranslation();

  return (
    <Form
      form={form}
      ref={(ref) => setForm(ref)}
      initialValues={{ ...data }}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        cb({ ...dt, step: 0, submit: true });
      }}
    >
      <Form.Item name="password" rules={formPinValidator("PIN")}>
        <StackedLabel label="PIN">
          <Input.Password
            maxLength={5}
            placeholder="PIN"
            type="password"
            disabled={loading}
          />
        </StackedLabel>
      </Form.Item>

      {issue.length > 0 && (
        <Form.Item>
          <Alert message={t("previous step has issue")} type="error" />
        </Form.Item>
      )}
      {error && (
        <Form.Item>
          <Alert message="Error" description={error} type="error" />
        </Form.Item>
      )}
      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>
            <Button onClick={() => cb({ step: -1 })} disabled={loading}>
              {t("previous").toUpperCase()}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t("next").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step2;
