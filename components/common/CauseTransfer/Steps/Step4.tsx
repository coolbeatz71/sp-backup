import { FC, useState } from "react";
import { Row, Col, Button, Input, Form, Alert } from "antd";
import { IRootState } from "redux/initialStates";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import StackedLabel from "components/common/StackedLabel";
import { Props } from "./Step1";
import formPinValidator from "utils/validators/form-pin-validator";
import { isEmpty } from "lodash";

const Step4: FC<Props> = ({ data, setForm, cb, issue = [] }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [channelErr, setChannelErr] = useState<boolean>(false);

  const { loading, error } = useSelector(
    ({ cause: { transfer } }: IRootState) => transfer,
  );

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
        if (isEmpty(data.channel)) {
          setChannelErr(true);
          cb({ ...dt, step: 0 });
        } else {
          setChannelErr(false);
          cb({ ...dt, step: 0, submit: true });
        }
      }}
    >
      <Form.Item>
        <span>{t("confirm_with_pin_transfer")}</span>
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

      {channelErr && (
        <Form.Item>
          <Alert
            closable
            showIcon
            type="error"
            message={t("select_transfer_channel")}
            onClose={() => {
              cb({ ...data, step: -1 });
              setChannelErr(false);
            }}
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
              {t("transfer").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step4;
