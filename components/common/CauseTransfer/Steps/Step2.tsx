import { FC } from "react";
import { Row, Col, Button, Form, Result, Typography } from "antd";
import { Props } from "./Step1";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import CauseCard from "components/cards/Cause";
import styles from "./../index.module.scss";
import CauseProgress from "components/Cause/CauseProgress";

const Step2: FC<Props> = ({ data, setForm, cb }) => {
  const [form] = Form.useForm();

  const { transferTo: cause } = data;

  const { t } = useTranslation();

  return (
    <Form
      form={form}
      ref={(ref) => setForm(ref)}
      initialValues={{ ...data }}
      validateTrigger={["onFinish"]}
      onFinish={(dt) => {
        cb({ ...dt, step: 1 });
      }}
      className={styles.transfer__form}
    >
      <Form.Item>
        <span>{t("cause information to transfer to")}</span>
      </Form.Item>

      {isEmpty(cause) ? (
        <Result
          status="error"
          title={t("cause information failed")}
          subTitle={t("cause_information_failed_text")}
          extra={[
            <Button
              danger
              type="primary"
              key="back"
              onClick={() => cb({ step: -1 })}
            >
              {t("back")}
            </Button>,
          ]}
        />
      ) : (
        <>
          <Row justify="center">
            <Typography.Title
              level={2}
              className={styles.transfer__form__causeName}
              ellipsis
            >
              {cause.name}
            </Typography.Title>
          </Row>
          <CauseCard cause={cause} isView isDonate />
          <CauseProgress
            cause={cause}
            reload={() => {
              //
            }}
            edit={() => {
              //
            }}
            tiny
          />
          <br />
          <Row justify="center">
            <Typography.Paragraph>{cause.summary}</Typography.Paragraph>
          </Row>
        </>
      )}

      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>
            <Button onClick={() => cb({ step: -1 })}>
              {t("previous").toUpperCase()}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" disabled={isEmpty(cause)}>
              {t("next").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step2;
