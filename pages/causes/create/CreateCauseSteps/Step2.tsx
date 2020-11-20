import React from "react";

import { Row, Col, Button, Input, Form, Switch } from "antd";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

import StackedLabel from "components/common/StackedLabel";
import VideoPlayer from "components/common/VideoPlayer";

import styles from "./index.module.scss";
import { PlayCircleOutlined } from "@ant-design/icons";

import { Props } from "./Step1";

const Step2: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
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
        <span>{t("give us detailed information")}</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="summary"
        rules={[
          { required: true, message: t("cause summary is required") },
          {
            min: 100,
            max: 280,
            message: t("cause_summary_range_error", {
              min: 100,
              max: 280,
            }),
          },
        ]}
      >
        <StackedLabel label={t("cause summary")} charCount={[100, 280]}>
          <Input.TextArea
            className={styles.create__text_area}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder={t("cause summary")}
            maxLength={280}
          />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="video"
        rules={[
          {
            max: 1000,
            message: t("video_url_range_error", {
              max: "1,000",
            }),
          },
          () => ({
            validator(_rule: any, value: any) {
              if ([undefined, null, ""].includes(value)) {
                return Promise.resolve();
              }
              if (ReactPlayer.canPlay(value)) {
                return Promise.resolve();
              }
              return Promise.reject(t("video_url_valid_error"));
            },
          }),
        ]}
      >
        <StackedLabel label={t("video url")}>
          <Input
            type="url"
            suffix={
              <VideoPlayer url={data.video}>
                <Button
                  size="small"
                  type="link"
                  icon={<PlayCircleOutlined />}
                />
              </VideoPlayer>
            }
          />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="details"
        rules={[
          {
            min: 800,
            max: 1000,
            message: t("cause_details_range_error", {
              min: 800,
              max: "1,000",
            }),
          },
          {
            required: true,
            message: t("cause details is required"),
          },
        ]}
      >
        <StackedLabel
          label={t("details about the cause")}
          charCount={[800, 1000]}
        >
          <Input.TextArea
            className={styles.create__text_area}
            autoSize={{ minRows: 1, maxRows: 10 }}
            placeholder={t("details about the cause")}
            maxLength={1000}
          />
        </StackedLabel>
      </Form.Item>
      <Form.Item>
        <div className={styles.create__row}>
          <div className={styles.create__row__col}>
            <strong>{t("affiliated")}</strong>
          </div>
          <Switch
            checked={data.affiliated}
            onChange={(affiliated) => cb({ affiliated, step: 0 })}
          />
        </div>
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

export default Step2;
