import React from "react";
import { Affix, Card, Row, Col, Typography, Empty } from "antd";
import Link from "next/link";
import numeral from "numeral";
import Progress from "../CauseProgress";
import Share from "components/common/SharePopover";

import styles from "./index.module.scss";

interface Props {
  cause: { [key: string]: any };
}

const CauseSider: React.FC<Props> = ({ cause }) => {
  const donors = cause.donors || [];
  return (
    <>
      <div className={styles.dashboard__content__sidebar}>
        <Card>
          {donors.length === 0 ? (
            <Empty description="No donors yet" />
          ) : (
            <>
              <Card.Meta
                title="List Of Donors"
                className={styles.dashboard__content__primary_title}
              />
              {donors.map((donor: any) => (
                <Row
                  key={donor.id}
                  className={styles.dashboard__content__sidebar__item}
                >
                  <Col flex={1}>
                    <Typography.Paragraph ellipsis>
                      {donor.user_names}
                    </Typography.Paragraph>
                  </Col>
                  <Col>
                    {numeral(donor.amount).format()} {cause.currency}
                  </Col>
                </Row>
              ))}
              <div className={styles.dashboard__content__sidebar__more}>
                <Link href={`/dashboard/causes/${cause.slug}/donors`}>
                  <a>View More</a>
                </Link>
              </div>
            </>
          )}
        </Card>
        {cause.status === "active" && (
          <>
            <br />
            <Card>
              <Share
                slug={cause.slug}
                code={cause.till_number}
                title={cause.title}
                standalone
              />
            </Card>
          </>
        )}
        <br />
        <Progress
          cause={cause}
          reload={() => {
            //
          }}
          edit={() => {
            //
          }}
          tiny
        />
      </div>
    </>
  );
};

export default CauseSider;
