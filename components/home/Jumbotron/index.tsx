import React from "react";
import { Row, Col, Typography, Button, Grid } from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import SignUp from "components/modals/SignUp";
import SignIn from "components/modals/SignIn";
import ResetPin from "components/modals/ResetPin";

import styles from "./index.module.scss";

interface Props {
  hideSignedIn?: boolean;
}

const Jumbotron: React.FC<Props> = ({ hideSignedIn = false }) => {
  const screens = Grid.useBreakpoint();

  const [signUp, setSignUp] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [resetPin, setResetPin] = React.useState(false);

  const user = useSelector((state: IRootState) => state.user);

  return hideSignedIn && user.currentUser.isLoggedin ? (
    <div />
  ) : (
    <Row className={styles.jumbo} gutter={24} align="middle">
      <Col md={12} xs={24} className={styles.jumbo__image}>
        {` `}
      </Col>
      <Col md={12} xs={24} className={styles.jumbo__content}>
        {screens.md && (
          <div className={styles.jumbo__content__headers} data-floating-image>
            <Typography.Title level={2}>SAVE Plus</Typography.Title>
            <Typography.Title level={3}>Mission</Typography.Title>
          </div>
        )}
        <Typography.Paragraph className={styles.jumbo__content__paragraph}>
          We are a platform that connects socially
          <br />
          impactful causes with caring people
          <br />
          to create impacts that make a difference.
        </Typography.Paragraph>
        {!user.currentUser.isLoggedin && (
          <>
            <SignUp
              trigger={<Button size="large">JOIN US</Button>}
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
        )}
      </Col>
    </Row>
  );
};

export default Jumbotron;
