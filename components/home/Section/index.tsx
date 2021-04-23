import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Typography, Row, Col, Card, Button } from "antd";
import Cause from "components/cards/Cause";
import CauseSkeleton from "components/cards/CauseSkeleton";

import styles from "./index.module.scss";
import Link from "next/link";
import { useMedia } from "react-use";

interface Props {
  title: string;
  icon: string;
  fetched: boolean;
  error: string | null;
  data: any[];
  howItWorks?: boolean;
  myCauses?: boolean;
  more?: { title: string; link: string };
}

const Section: FC<Props> = ({
  title,
  icon,
  fetched,
  error,
  data,
  howItWorks = false,
  myCauses = false,
  more,
}) => {
  const { t } = useTranslation();

  const isXL = useMedia("(max-width: 1200px)");

  const howItWorksItems = [
    {
      icon: "/images/beans.svg",
      title: t("sign up on save plus"),
      description: t("how_it_works_1"),
    },
    {
      icon: "/images/seed.svg",
      title: t("create a cause and donate"),
      description: t("how_it_works_2"),
    },
    {
      icon: "/images/forest.svg",
      title: t("invite others to donate"),
      description: t("how_it_works_3"),
    },
  ];
  return error ? (
    <div />
  ) : (
    <div data-section className={styles.section}>
      {(!fetched || data.length !== 0 || howItWorks || myCauses) && (
        <div
          data-section-title
          className={styles.section__title}
          style={{ backgroundImage: `url(${icon})` }}
        >
          <Typography.Title level={2}>{title}</Typography.Title>
        </div>
      )}
      {myCauses && (
        <Typography.Title level={4}>
          {t("track all your causes here")}
        </Typography.Title>
      )}
      {howItWorks && (
        <div data-section-scroll>
          <Row
            data-section-row={3}
            gutter={[24, 24]}
            className={styles.section__cards}
          >
            {howItWorksItems.map((item) => (
              <Col
                span={8}
                key={item.icon}
                className={styles.section__cards__col}
              >
                <Card className={styles.section__cards__col__card}>
                  <img
                    src={item.icon}
                    className={styles.section__cards__col__card__icon}
                    alt="cause icon"
                    width="45"
                    height="45"
                  />
                  <Typography.Title
                    level={4}
                    className={styles.section__cards__col__card__title}
                  >
                    {item.title}
                  </Typography.Title>
                  <Typography.Text>{item.description}</Typography.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      {!fetched ? (
        <div data-section-scroll>
          <Row data-section-row={3} gutter={[24, 24]} align="middle">
            {[1, 2, 3].map((index: number) => (
              <Col span={8} key={index}>
                <CauseSkeleton />
              </Col>
            ))}
          </Row>
        </div>
      ) : data.length === 0 ? (
        <div />
      ) : (
        <div data-section-scroll={data.length}>
          <Row data-section-row="items" gutter={[24, 24]} align="middle">
            {data.map((cause: any, index: number) => (
              <Col span={8} key={index}>
                <Cause cause={cause} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {fetched && data.length >= 3 && more && (
        <div data-section-scroll data-more>
          <Row
            data-section-row="more"
            justify={isXL ? "start" : "end"}
            gutter={[24, 24]}
          >
            <Col>
              <Link href={more.link}>
                <Button type="primary" ghost>
                  {more.title}
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Section;
