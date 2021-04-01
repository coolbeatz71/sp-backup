import { FC } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Switch,
  Alert,
  Typography,
  Select,
} from "antd";
import { capitalize, isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { phone, isOk } from "dev-rw-phone";
import { IRootState } from "redux/initialStates";
import { Props } from "./Step1";
import StackedLabel from "components/common/StackedLabel";
import styles from "./index.module.scss";
import { banks } from "helpers/banksList";

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
    <div className={styles.create}>
      <Form
        form={form}
        ref={(ref) => setForm(ref)}
        initialValues={data}
        validateTrigger={["onFinish"]}
        onValuesChange={(dt) => {
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
          name="account"
          rules={[
            {
              required: true,
              message: `${capitalize(t("mobile money number"))} ${t(
                "required",
              )}`,
            },
            () => ({
              validator(_rule: any, value: any) {
                if (value.startsWith("78") && phone(value).telco !== "MTN") {
                  return Promise.reject("Should be a valid MTN Number");
                }

                if (value.match(/^7[23]/) && phone(value).telco !== "Airtel") {
                  return Promise.reject(t("should be a valid airtel"));
                }

                if (!isEmpty(value) && !isOk(value)) {
                  return Promise.reject(t("phone number should be valid"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <StackedLabel label={t("mobile money number")} phone="+250">
            <Input
              placeholder={t("mobile money number")}
              disabled={loading}
              maxLength={9}
            />
          </StackedLabel>
        </Form.Item>

        <Form.Item
          data-payment
          id="accepts_card_payments"
          className={styles.create__switch}
          label={t("add debit/credit card")}
        >
          <Switch
            disabled={loading}
            checked={data.accepts_card_payments}
            onChange={(accepts_card_payments) =>
              cb({ accepts_card_payments, step: 0 })
            }
          />
        </Form.Item>

        {data.accepts_card_payments && (
          <div className={styles.create__bank_details}>
            <Typography.Text>{t("add recipient bank details")}</Typography.Text>

            <Form.Item
              name="bank_name"
              rules={[{ required: true, message: t("bank name is required") }]}
            >
              <StackedLabel label={t("select bank")} select>
                <Select placeholder={t("select bank")}>
                  {banks.map((bank) => (
                    <Select.Option key={bank} value={bank}>
                      {bank}
                    </Select.Option>
                  ))}
                </Select>
              </StackedLabel>
            </Form.Item>

            <Form.Item
              name="payment_account_name"
              rules={[
                { required: true, message: t("account name is required") },
              ]}
            >
              <StackedLabel label={t("account names")}>
                <Input placeholder={t("account names")} />
              </StackedLabel>
            </Form.Item>

            <Form.Item
              name="bank_account_number"
              rules={[
                { required: true, message: t("account number is required") },
              ]}
            >
              <StackedLabel label={t("account number")}>
                <Input placeholder={t("account number")} />
              </StackedLabel>
            </Form.Item>
          </div>
        )}

        <Form.Item
          id="isPrivate"
          className={styles.create__switch}
          label={t("private cause")}
        >
          <Switch
            checked={data.isPrivate}
            onChange={(isPrivate) => cb({ isPrivate, step: 0 })}
            disabled={loading}
          />
        </Form.Item>
        {data.isPrivate && (
          <Form.Item className={styles.create__private_note}>
            {t("note")}: {t("this cause will not be published publicly")}
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
                          {t("step")} {ind + 1}: {t(steps[ind].title)}
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
        <Form.Item className={styles.create__buttons}>
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
    </div>
  );
};

export default Step4;
