import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Empty,
  Button,
  Grid,
  Modal,
  Skeleton,
  Alert,
  Affix,
} from "antd";
import numeral from "numeral";
import Progress from "../CauseProgress";
import SharePopover from "components/common/SharePopover";
import CausesActions from "components/common/CausesActions";
import PreDonation from "components/modals/PreDonation";
import Donors from "./Donors";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import getDonors from "redux/actions/cause/getDonors";

import styles from "./index.module.scss";

interface Props {
  cause: { [key: string]: any };
  myCause: boolean;
  hasBanner: boolean;
  content: React.ReactElement;
  contact: React.ReactElement;
}

const CauseSider: React.FC<Props> = ({
  cause,
  myCause,
  hasBanner,
  content,
  contact,
}) => {
  const screens = Grid.useBreakpoint();
  const comparer = React.useRef<any>(null);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const [causeDonors, setCauseDonors] = React.useState<any[]>([]);

  const { data, loading, error } = useSelector(
    ({ cause: { donors } }: IRootState) => donors
  );

  React.useEffect(() => {
    getDonors(cause.slug, { limit: 5 })(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setCauseDonors(data);
  }, [data]);

  const Wrapper: React.FC<{ children: React.ReactElement }> = ({ children }) =>
    screens.lg ? (
      <div
        className={styles.cause_sider}
        style={{ width: "100%" }}
        data-has-banner={hasBanner}
      >
        {children}
      </div>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );

  const DonationWrapper: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) =>
    screens.lg ? (
      <Affix offsetTop={hasBanner ? 148 : 100}>{children}</Affix>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );

  return (
    <>
      <Modal
        title={<Typography.Link>Donors</Typography.Link>}
        bodyStyle={{ padding: 0 }}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Donors slug={cause.slug} />
      </Modal>
      <Wrapper>
        <div className={styles.cause_sider__content__sidebar}>
          <DonationWrapper>
            <>
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
            </>
          </DonationWrapper>
          {cause.status === "active" && (
            <>
              <br />
              <Card>
                <SharePopover
                  slug={cause.slug}
                  code={cause.till_number}
                  title={cause.name}
                  standalone
                  isPrivate={cause.access === "private"}
                />
              </Card>
            </>
          )}
          {!screens.lg && content}
          <br />
          <Card data-not-lg={!screens.lg} bordered={screens.lg}>
            {loading && <Skeleton active />}
            {error?.message && (
              <Alert
                message={error?.message}
                type="error"
                closeText="RETRY"
                onClose={() => getDonors(cause.slug, { limit: 10 })(dispatch)}
                showIcon
              />
            )}
            {!loading && !error && (
              <>
                {causeDonors.length === 0 ? (
                  <Empty description="No donors yet" />
                ) : (
                  <>
                    <Card.Meta
                      title="LIST OF DONORS"
                      className={styles.cause_sider__content__primary_title}
                      data-meta-not-lg={!screens.lg}
                    />
                    {causeDonors.map((donor: any) => (
                      <Row
                        key={donor.id}
                        className={styles.cause_sider__content__sidebar__item}
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
                    {causeDonors.length >= 5 && (
                      <div
                        className={styles.cause_sider__content__sidebar__more}
                        data-more-not-lg={!screens.lg}
                      >
                        <Button type="link" onClick={() => setVisible(true)}>
                          View All
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Card>
          {!screens.lg && contact}
        </div>
      </Wrapper>
      <div ref={comparer}>&nbsp;</div>
    </>
  );
};

export default CauseSider;
