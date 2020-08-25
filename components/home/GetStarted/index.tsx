import React from "react";

import { Grid, Row, Col, Typography, Button } from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { useRouter } from "next/router";

import SignUp from "components/modals/SignUp";
import SignIn from "components/modals/SignIn";
import ResetPin from "components/modals/ResetPin";

import styles from "./index.module.scss";

const GetStarted = () => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();

  const [signUp, setSignUp] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [resetPin, setResetPin] = React.useState(false);

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
            {!user.currentUser.isLoggedin ? (
              <>
                <SignUp
                  trigger={
                    <Button
                      type="primary"
                      size="large"
                      className={styles.get_started__container__button}
                    >
                      GET STARTED
                    </Button>
                  }
                  visible={signUp}
                  onVisible={() => setSignUp(true)}
                  onCancel={() => setSignUp(false)}
                  signIn={() => setSignIn(true)}
                />
                <SignIn
                  visible={signIn}
                  onVisible={() => setSignIn(true)}
                  onCancel={() => setSignIn(false)}
                  signUp={() => setSignUp(true)}
                  resetPin={() => setResetPin(true)}
                />
                <ResetPin
                  visible={resetPin}
                  onVisible={() => setResetPin(true)}
                  onCancel={() => setResetPin(false)}
                  signIn={() => setSignIn(true)}
                />
              </>
            ) : (
              <Button
                type="primary"
                size="large"
                className={styles.get_started__container__button}
                onClick={() => router.push("/causes/create")}
              >
                CREATE A CAUSE
              </Button>
            )}
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
