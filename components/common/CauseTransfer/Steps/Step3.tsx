import { FC } from "react";
import { Row, Col, Button, Input, Form, Alert, InputNumber } from "antd";
import { IRootState } from "redux/initialStates";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import StackedLabel from "components/common/StackedLabel";
import { Props } from "./Step1";
import formPinValidator from "utils/validators/form-pin-validator";

const Step3: FC<Props> = ({ data, setForm, cb, issue = [] }) => {
  const [form] = Form.useForm();

  const { loading, error } = useSelector(
    ({ cause: { transfer } }: IRootState) => transfer,
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
      <Form.Item
        name="amount"
        rules={[
          {
            required: true,
            message: t("required"),
          },
          {
            pattern: /([1-9][\d,]{2,})$$/g,
            message: t("should be 100 minimum"),
          },
        ]}
        validateTrigger={["onSubmit", "onBlur"]}
      >
        <StackedLabel label={t("amount")} formatNumber>
          <InputNumber placeholder={t("amount")} autoComplete="off" />
        </StackedLabel>
      </Form.Item>

      <Form.Item name="password" rules={formPinValidator("PIN")}>
        <StackedLabel label="PIN">
          <Input.Password
            maxLength={5}
            placeholder="PIN"
            type="password"
            autoComplete="new-password"
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
              {t("transfer").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step3;
