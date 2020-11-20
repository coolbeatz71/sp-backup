import React from "react";
import ReactPlayer from "react-player";

import { Row, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";

const Video = () => {

  const { t } = useTranslation();
  return (
    <div className={styles.video}>
      <div className={styles.video__text}>
        <Typography.Title level={4}>{t("view save plus video")}</Typography.Title>
      </div>
      <Row justify="space-around">
        <Col>
          <div className={styles.video__item}>
            <ReactPlayer
              controls
              url="https://www.youtube.com/watch?v=u1eWK3WMjKU"
              width="100%"
              height="100%"
            />
          </div>
        </Col>
      </Row>
      <div className={styles.video__text}>
        <Typography.Text>{t("android and ios soon")}</Typography.Text>
      </div>
    </div>
  );
};

export default Video;
