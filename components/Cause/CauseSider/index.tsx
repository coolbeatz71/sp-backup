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
import PreDonation from "components/modals/PreDonation";
import Donors from "./Donors";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import getDonors from "redux/actions/cause/donors";

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

  const [scrolled, setScrolled] = React.useState("");
  const [causeDonors, setCauseDonors] = React.useState<any[]>([]);

  const {
    data: { get: donorsList },
    loading: { get: loading },
    error: { get: getError },
    meta: {
      get: { total },
    },
  } = useSelector(({ cause: { donors } }: IRootState) => donors);

  const scrollHandler = () => {
    setScrolled(
      (!hasBanner && window.pageYOffset < 100) ||
        (hasBanner && window.pageYOffset < 148)
        ? "over"
        : "scrolled",
    );
  };

  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
  }, [scrollHandler]);

  React.useEffect(() => {
    getDonors(cause.slug, false, { limit: 5 })(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setCauseDonors(donorsList);
  }, [donorsList]);

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
      <Affix data-scrolled={scrolled} offsetTop={hasBanner ? 148 : 100}>
        {children}
      </Affix>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );

  return (
    <>
      <Modal
        title={<Typography.Link>Donors ({total})</Typography.Link>}
        bodyStyle={{ padding: 0, paddingBottom: "2.5rem" }}
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
            <div>
              {(myCause || cause.status === "active") && (
                <Row gutter={[24, 24]}>
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
            </div>
          </DonationWrapper>
          {!screens.lg && content}
          <br />
          <Card data-not-lg={!screens.lg} bordered={screens.lg}>
            {loading && <Skeleton active />}
            {getError?.message && (
              <Alert
                message={getError?.message}
                type="error"
                closeText="RETRY"
                onClose={() =>
                  getDonors(cause.slug, false, { limit: 10 })(dispatch)
                }
                showIcon
              />
            )}
            {!loading && !getError && (
              <>
                {causeDonors.length === 0 ? (
                  <Empty description="No donors yet" />
                ) : (
                  <>
                    <Card.Meta
                      title={`LIST OF DONORS (${total})`}
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
                        <Button
                          type="link"
                          onClick={() => {
                            window.scrollTo({ top: 0 });
                            setVisible(true);
                          }}
                        >
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
