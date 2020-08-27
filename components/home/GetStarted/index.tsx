import React from "react";

import { Grid, Row, Col, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import { useRouter } from "next/router";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

import styles from "./index.module.scss";

const GetStarted = () => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: IRootState) => state.user);

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
              onClick={() => {
                if (user.currentUser.isLoggedin) router.push("/causes/create");
                else showAuthDialog(true, "signup")(dispatch);
              }}
            >
              {user.currentUser.isLoggedin ? "CREATE A CAUSE" : "GET STARTED"}
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
