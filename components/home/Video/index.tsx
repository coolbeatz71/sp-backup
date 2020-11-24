import React from "react";

import { Row, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";

const Video = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.video}>
      <div className={styles.video__text}>
        <Typography.Title level={4}>
          {t("view save plus video")}
        </Typography.Title>
      </div>
      <Row justify="space-around">
        <Col>
          <div className={styles.video__item}>
            <iframe
              src="https://www.youtube.com/embed/u1eWK3WMjKU"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
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
