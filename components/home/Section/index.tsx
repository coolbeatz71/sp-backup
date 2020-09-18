import React from "react";

import { Typography, Row, Col, Card, Button } from "antd";
import Cause from "components/cards/Cause";
import CauseSkeleton from "components/cards/CauseSkeleton";

import styles from "./index.module.scss";
import Link from "next/link";

const howItWorksItems = [
  {
    icon: "/images/beans.svg",
    title: "Sign Up on SAVE Plus",
    description:
      "With just your phone number, you can sign up and start a cause on SAVE Plus. With this account you can monitor your cause(s), donate to other cause(s) and collect raised funds seamlessly.",
  },
  {
    icon: "/images/seed.svg",
    title: "Create a Cause and Donate",
    description:
      "Create a cause and set the target of how much you want to fund raise with ease. Once done, the cause will be viewed publicly for public causes and privately for private causes.",
  },
  {
    icon: "/images/forest.svg",
    title: "Invite Others to Donate",
    description:
      "After successfully creating a cause, invite friends and family to start donating. Upon hitting the target, funds are automatically disbursed to the cause creator account (MTN MoMo or Airtel Money).",
  },
];

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

const Section: React.FC<Props> = ({
  title,
  icon,
  fetched,
  error,
  data,
  howItWorks = false,
  myCauses = false,
  more,
}) => {
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
          Track all your causes here
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
          <Row data-section-row={3} gutter={[24, 24]}>
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
          <Row data-section-row="items" gutter={[24, 24]}>
            {data.map((cause: any, index: number) => (
              <Col span={8} key={index}>
                <Cause cause={cause} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {fetched && data.length >= 3 && more && (
        <div data-section-scroll>
          <Row data-section-row="more" justify="end" gutter={[24, 24]}>
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
