import React from "react";
import { Row, Col, Typography, Button, Grid } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

import styles from "./index.module.scss";

interface Props {
  hideSignedIn?: boolean;
}

const Jumbotron: React.FC<Props> = ({ hideSignedIn = false }) => {
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();

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
          <Button
            size="large"
            onClick={() => showAuthDialog(true, "signup")(dispatch)}
          >
            JOIN US
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Jumbotron;
