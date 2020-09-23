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
  const [fixPosition, setFixPosition] = React.useState("");
  const comparer = React.useRef<any>(null);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const [causeDonors, setCauseDonors] = React.useState<any[]>([]);

  const { data, loading, error } = useSelector(
    ({ cause: { donors } }: IRootState) => donors,
  );

  React.useEffect(() => {
    getDonors(cause.slug, { limit: 10 })(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setCauseDonors(data);
  }, [data]);

  const [width, setWidth] = React.useState(0);

  const Wrapper: React.FC<{ children: React.ReactElement }> = ({ children }) =>
    screens.lg ? (
      <div
        className={styles.cause_sider}
        style={{ width: width === 0 ? "100%" : width }}
        data-affix-position={fixPosition}
        data-has-banner={hasBanner}
      >
        {children}
      </div>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );

  const scrollHandler = () => {
    setWidth(comparer.current?.getBoundingClientRect().width);
    if (window.pageYOffset < 100) {
      setFixPosition("");
    } else {
      setFixPosition("top");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  }, [scrollHandler]);

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
