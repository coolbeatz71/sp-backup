import { useEffect, useState } from "react";

import Image from "react-optimized-image";
import { Grid, Row, Col, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import showAuthDialog from "redux/actions/auth/showAuthDialog";

import getStartedLazy from "public/images/get-started-lazy.png";
import getStartedImg from "public/images/get-started.png";

import mtnMomo from "public/icons/mtn-momo.svg";
import airtelMomo from "public/icons/airtel-momo.svg";
import visa from "public/icons/visa.svg";
import mastercard from "public/icons/mastercard.svg";

import styles from "./index.module.scss";

const GetStarted = () => {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: IRootState) => state.user);
  const [refresh, setRefresh] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lazyLoaded, setLazyLoaded] = useState<boolean>(false);
  const [btn, setBtn] = useState("get started");

  useEffect(() => {
    setBtn(user.currentUser.isLoggedin ? "create a cause" : "get started");
  }, [user.currentUser.isLoggedin]);

  const setImageLazyLoaded = () => {
    const delay = 500 + Math.random() * 1500;
    setTimeout(() => {
      setLoading(false);
      setLazyLoaded(true);
    }, delay);
  };

  const getStartedLazyImage = (
    <Image
      webp
      data-home-image-ratio
      data-img-loading={lazyLoaded}
      src={getStartedLazy}
      alt="illustration image"
    />
  );

  const getStartedFullImage = (
    <Image
      webp
      key={refresh}
      data-home-image-ratio
      data-img-loading={loading}
      src={getStartedImg}
      onError={() => {
        setRefresh(refresh + 1);
        setLoading(true);
      }}
      onLoad={() => setImageLazyLoaded()}
      alt="illustration image"
    />
  );

  return (
    <div className={styles.get_started}>
      {(screens.xs || screens.sm || screens.md) && !screens.lg && (
        <div className={styles.get_started__image_mobile}>
          <div data-home-image-ratio>
            {getStartedLazyImage}
            {getStartedFullImage}
          </div>
        </div>
      )}
      <Row>
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

            <div className={styles.get_started__container__payment}>
              <Typography.Text>{t("you_can_donate_using")}</Typography.Text>
              <div className={styles.get_started__container__payment__content}>
                <Image src={mtnMomo} alt="mtn momo" />
                <Image src={airtelMomo} alt="airtel momo" />
                <Image src={visa} alt="visa card" data-visa />
                <Image src={mastercard} alt="master card" />
              </div>
            </div>
          </div>
        </Col>
        {screens.lg && (
          <Col className={styles.get_started__image}>
            <div data-home-image-ratio>
              {getStartedLazyImage}
              {getStartedFullImage}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GetStarted;
