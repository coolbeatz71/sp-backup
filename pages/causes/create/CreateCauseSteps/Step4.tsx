import { FC } from "react";
import { Row, Col, Button, Input, Form, Switch, Alert, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { phone, isOk } from "dev-rw-phone";
import { IRootState } from "redux/initialStates";
import { Props } from "./Step1";
import StackedLabel from "components/common/StackedLabel";

const Step4: FC<Props> = ({
  alerts,
  data,
  setForm,
  cb,
  issue = [],
  steps = [],
}) => {
  const { t } = useTranslation();
  const { loading, error } = useSelector(
    (state: IRootState) => state.cause.create,
  );

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      ref={(ref) => setForm(ref)}
      initialValues={{
        ...data,
        payment_account_name:
          phone(data.account).telco === "MTN" ? "MTN_Rwanda" : "Airtel_Rwanda",
      }}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        if (Object.keys(dt).includes("payment_account_name")) {
          if (dt.payment_account_name === "MTN_Rwanda") {
            form.setFieldsValue({
              account: "78",
            });
          } else if (dt.payment_account_name === "Airtel_Rwanda") {
            form.setFieldsValue({
              account: "73",
            });
          }
        }
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        cb({ ...dt, step: 0, submit: true });
      }}
    >
      <Form.Item>
        <span>{t("how you want to receive donations")}</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="payment_account_name"
        rules={[{ required: true, message: t("payment method is required") }]}
      >
        <StackedLabel label={t("select payment method")} select>
          <Select placeholder={t("select payment method")}>
            <Select.Option key="MTN_Rwanda" value="MTN_Rwanda">
              MTN Mobile Money
            </Select.Option>
            <Select.Option key="Airtel_Rwanda" value="Airtel_Rwanda">
              Airtel Money
            </Select.Option>
          </Select>
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="account"
        rules={[
          { required: true, message: `${t("phone number")} ${t("required")}` },
          () => ({
            validator(_rule: any, value: any) {
              if (
                data.payment_account_name === "MTN_Rwanda" &&
                phone(value).telco !== "MTN"
              ) {
                return Promise.reject("Should be a valid MTN Number");
              }

              if (
                data.payment_account_name === "Airtel_Rwanda" &&
                phone(value).telco !== "Airtel"
              ) {
                return Promise.reject(t("should be a valid airtel"));
              }

              if (!isOk(value)) {
                return Promise.reject(t("phone number should be valid"));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <StackedLabel label={t("phone number")} phone="+250">
          <Input
            placeholder={t("phone number")}
            disabled={loading}
            maxLength={9}
          />
        </StackedLabel>
      </Form.Item>
      <Form.Item id="isPrivate" label={t("private cause")}>
        <Switch
          checked={data.isPrivate}
          onChange={(isPrivate) => cb({ isPrivate, step: 0 })}
          disabled={loading}
        />
      </Form.Item>
      {data.isPrivate && (
        <Form.Item>
          <strong>{t("note")}:</strong>{" "}
          {t("this cause will not be published publicly")}
        </Form.Item>
      )}
      {issue.length > 0 && (
        <Form.Item>
          <Alert
            message={
              issue.length === 1
                ? t("a step has an issue")
                : t("steps have an issue")
            }
            description={
              <ul>
                {issue.map(
                  (iss, ind) =>
                    iss && (
                      <li key={`step-${ind}`}>
                        {t("step")} {ind + 1}: {steps[ind].title}
                      </li>
                    ),
                )}
              </ul>
            }
            type="error"
          />
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
              {t("create").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step4;
