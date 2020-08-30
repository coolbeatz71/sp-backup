import React from "react";
import ReactPlayer from "react-player";

import { Row, Col, Typography } from "antd";

import styles from "./index.module.scss";

const Video = () => {
  return (
    <div className={styles.video}>
      <div className={styles.video__text}>
        <Typography.Title level={4}>Short video on Save Plus</Typography.Title>
      </div>
      <Row justify="space-around">
        <Col>
          <div className={styles.video__item}>
            <ReactPlayer
              controls
              url="https://www.youtube.com/watch?v=3_SusAjQjnw"
              width="100%"
              height="100%"
            />
          </div>
        </Col>
      </Row>
      <div className={styles.video__text}>
        <Typography.Text>Android & IOS App Coming soon</Typography.Text>
      </div>
    </div>
  );
};

export default Video;
