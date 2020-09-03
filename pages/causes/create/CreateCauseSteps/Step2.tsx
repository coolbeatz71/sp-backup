import React from "react";

import { Row, Col, Button, Input, Form, Switch } from "antd";
import ReactPlayer from "react-player";

import StackedLabel from "components/common/StackedLabel";
import VideoPlayer from "components/common/VideoPlayer";

import styles from "./index.module.scss";
import { PlayCircleOutlined } from "@ant-design/icons";

import { Props } from "./Step1";

const Step2: React.FC<Props> = ({ alerts, data, setForm, cb }) => {
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
        <span>Give us detailed and elaborate information on your cause</span>
      </Form.Item>
      {alerts && <Form.Item>{alerts}</Form.Item>}
      <Form.Item
        name="summary"
        rules={[
          { required: true, message: "Cause summary is required!" },
          {
            min: 100,
            max: 280,
            message:
              "Cause summary's length must be between 100 and 280 characters!",
          },
        ]}
      >
        <StackedLabel label="Summary of this cause" charCount={[100, 280]}>
          <Input.TextArea
            className={styles.create__text_area}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder="Summary of this cause"
          />
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="video"
        rules={[
          {
            max: 1000,
            message: "The Video URL should be less than 1,000 characters!",
          },
          () => ({
            validator(_rule: any, value: any) {
              if ([undefined, null, ""].includes(value)) {
                return Promise.resolve();
              }
              if (ReactPlayer.canPlay(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The Video URL should be a valid Video URL!",
              );
            },
          }),
        ]}
      >
        <StackedLabel label="Video URL (Optional)">
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
            message:
              "Cause details' length must be between 800 and 1,000 characters!",
          },
        ]}
      >
        <StackedLabel label="Details about the cause" charCount={[800, 1000]}>
          <Input.TextArea
            className={styles.create__text_area}
            autoSize={{ minRows: 1, maxRows: 10 }}
            placeholder="Details about the cause"
          />
        </StackedLabel>
      </Form.Item>
      <Form.Item>
        <div className={styles.create__row}>
          <div className={styles.create__row__col}>
            <strong>Is this cause affiliated to any organization/NGO?</strong>
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
            <Button onClick={() => cb({ step: -1 })}>PREVIOUS</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              NEXT
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step2;
