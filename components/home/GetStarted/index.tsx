import { useEffect, useState } from "react";

import Image from "react-optimized-image";
import { Grid, Row, Col, Typography, Button, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import showAuthDialog from "redux/actions/auth/showAuthDialog";

import getStartedImg from "public/images/get-started.png";

import styles from "./index.module.scss";

const GetStarted = () => {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: IRootState) => state.user);
  const [refresh, setRefresh] = useState(1);
  const [status, setStatus] = useState("");
  const [btn, setBtn] = useState("get started");

  useEffect(() => {
    setBtn(user.currentUser.isLoggedin ? "create a cause" : "get started");
  }, [user.currentUser.isLoggedin]);

  return (
    <div className={styles.get_started}>
      {(screens.xs || screens.sm || screens.md) && !screens.lg && (
        <div className={styles.get_started__image_mobile}>
          <div data-home-image-ratio>
            <Image
              webp
              key={refresh}
              data-home-image-ratio
              src={getStartedImg}
              onError={() => {
                setRefresh(refresh + 1);
                setStatus("");
              }}
              onLoad={() => setStatus("loaded")}
              alt="illustration image"
            />
            {status !== "loaded" && <Skeleton.Image />}
          </div>
        </div>
      )}
      <Row align="middle">
        <Col flex={1}>
          <div
            className={styles.get_started__container}
            data-size={screens.lg ? "" : "small"}
          >
            <Typography.Title>
              {t("put_smile_1")}
              {screens.lg ? <br /> : " "}
              {t("put_smile_2")}
            </Typography.Title>
            <Button
              type="primary"
              size="large"
              className={styles.get_started__container__button}
              data-cy="getStarted"
              onClick={() => {
                if (user.currentUser.isLoggedin) router.push("/causes/create");
                else showAuthDialog(true, "signup")(dispatch);
              }}
            >
              {t(btn).toUpperCase()}
            </Button>
          </div>
        </Col>
        {screens.lg && (
          <Col className={styles.get_started__image}>
            <div data-home-image-ratio>
              <Image
                webp
                key={refresh}
                data-home-image-ratio
                src={getStartedImg}
                onError={() => {
                  setRefresh(refresh + 1);
                  setStatus("");
                }}
                onLoad={() => setStatus("loaded")}
                alt="illustration image"
              />
              {status !== "loaded" && <Skeleton.Image />}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GetStarted;
