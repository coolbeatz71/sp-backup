import React from "react";

import { Grid, Row, Col, Typography, Button } from "antd";

import styles from "./index.module.scss";

const GetStarted = () => {
  const screens = Grid.useBreakpoint();

  return (
    <div className={styles.get_started}>
      {!screens.lg && (
        <img
          src="/images/get-started.png"
          className={styles.get_started__image_mobile}
        />
      )}
      <Row align="middle">
        <Col flex={1}>
          <div
            className={styles.get_started__container}
            data-size={screens.lg ? "" : "small"}
          >
            <Typography.Title>
              Put a Smile on
              {screens.lg ? <br /> : " "}
              Someone's Face
            </Typography.Title>
            <Button
              type="primary"
              size="large"
              className={styles.get_started__container__button}
            >
              GET STARTED
            </Button>
          </div>
        </Col>
        {screens.lg && (
          <Col>
            <img
              src="/images/get-started.png"
              className={styles.get_started__image}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GetStarted;
