import React from "react";
import { Card, Row, Col, Typography, Empty, Button, Grid, Affix } from "antd";
import Link from "next/link";
import numeral from "numeral";
import Progress from "../CauseProgress";
import Share from "components/common/SharePopover";
import CausesActions from "components/common/CausesActions";
import PreDonation from "components/modals/PreDonation";

import styles from "./index.module.scss";

interface Props {
  cause: { [key: string]: any };
  myCause: boolean;
  content: React.ReactElement;
  contact: React.ReactElement;
}

const CauseSider: React.FC<Props> = ({ cause, myCause, content, contact }) => {
  const donors = cause.donors || [];
  const screens = Grid.useBreakpoint();
  return (
    <Affix offsetTop={120}>
      <div className={styles.dashboard__content__sidebar}>
        {(myCause || cause.status === "active") && (
          <Row gutter={[24, 24]}>
            {myCause && (
              <Col>
                <CausesActions
                  viewing
                  record={cause}
                  reload={() => {
                    //
                  }}
                />
              </Col>
            )}
            {cause.status === "active" && (
              <Col flex={1}>
                <PreDonation slug={cause.slug}>
                  <Button type="primary" block>
                    DONATE
                  </Button>
                </PreDonation>
              </Col>
            )}
          </Row>
        )}
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
        {cause.status === "active" && (
          <>
            <br />
            <Card>
              <Share
                slug={cause.slug}
                code={cause.till_number}
                title={cause.title}
                standalone
                isPrivate={cause.access === "private"}
              />
            </Card>
          </>
        )}
        {!screens.lg && content}
        <br />
        <Card data-not-lg={!screens.lg} bordered={screens.lg}>
          {donors.length === 0 ? (
            <Empty description="No donors yet" />
          ) : (
            <>
              <Card.Meta
                title="LIST OF DONORS"
                className={styles.dashboard__content__primary_title}
                data-meta-not-lg={!screens.lg}
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
              <div
                className={styles.dashboard__content__sidebar__more}
                data-more-not-lg={!screens.lg}
              >
                <Link href={`/dashboard/causes/${cause.slug}/donors`}>
                  <a>View More</a>
                </Link>
              </div>
            </>
          )}
        </Card>
        {!screens.lg && contact}
      </div>
    </Affix>
  );
};

export default CauseSider;
