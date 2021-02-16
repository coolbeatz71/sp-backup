import { FC, Fragment, ReactElement, useEffect, useRef, useState } from "react";
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
  Tooltip,
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
import { ALL_CAUSES_PATH } from "helpers/paths";
import { useTranslation } from "react-i18next";
import { upperFirst } from "lodash";
import { getDonationTime } from "helpers/dateFormatter";
import { getLanguage } from "helpers/getLanguage";

interface Props {
  cause: { [key: string]: any };
  myCause: boolean;
  hasBanner: boolean;
  content: ReactElement;
  contact: ReactElement;
}

const CauseSider: FC<Props> = ({
  cause,
  myCause,
  hasBanner,
  content,
  contact,
}) => {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const comparer = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState("");
  const [causeDonors, setCauseDonors] = useState<any[]>([]);

  const { data: userData } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const lang = userData.lang || getLanguage();

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

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
  }, [scrollHandler]);

  useEffect(() => {
    getDonors(cause.slug, false, { limit: 5 })(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setCauseDonors(donorsList);
  }, [donorsList]);

  const Wrapper: FC<{ children: ReactElement }> = ({ children }) =>
    screens.lg ? (
      <div
        className={styles.cause_sider}
        style={{ width: "100%" }}
        data-has-banner={hasBanner}
      >
        {children}
      </div>
    ) : (
      <Fragment>{children}</Fragment>
    );

  const DonationWrapper: FC<{ children: ReactElement }> = ({ children }) =>
    screens.lg ? (
      <Affix data-scrolled={scrolled} offsetTop={hasBanner ? 148 : 100}>
        {children}
      </Affix>
    ) : (
      <Fragment>{children}</Fragment>
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
                <Row
                  gutter={[24, 12]}
                  className={styles.cause_sider__content__sidebar__button}
                >
                  {cause.status === "active" && (
                    <Col flex={1}>
                      <PreDonation slug={cause.slug}>
                        <Button type="primary" block>
                          {t("donate")}
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
                  <Card className={styles.cause_sider__content__share}>
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
          {myCause && (
            <>
              <Card className={styles.cause_sider__content__balance}>
                <Row align="middle">
                  <Col flex={1}>
                    <Typography.Paragraph ellipsis style={{ marginBottom: 0 }}>
                      {t("current balance")}
                    </Typography.Paragraph>
                  </Col>
                  <Col>
                    <strong>
                      {numeral(cause.current_balance).format()} {cause.currency}
                    </strong>
                  </Col>
                </Row>
              </Card>
            </>
          )}

          {!screens.lg && content}
          {!screens.lg && <br />}
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
                  <Empty description={t("no donors yet")} />
                ) : (
                  <>
                    <Card.Meta
                      title={`${t("list of donors")} (${total})`}
                      className={styles.cause_sider__content__primary_title}
                      data-meta-not-lg={!screens.lg}
                    />
                    {causeDonors.map((donor: any) => (
                      <Row
                        key={donor.id}
                        className={styles.cause_sider__content__sidebar__item}
                      >
                        <Col flex={1}>
                          <Typography.Text ellipsis>
                            {donor.donor_source ? (
                              <Tooltip
                                placement="bottomLeft"
                                title={donor.donor_source.name}
                              >
                                <a
                                  href={`${ALL_CAUSES_PATH}/${donor.donor_source.slug}?lang=${lang}`}
                                >
                                  {donor.donor_source.till_number}
                                </a>
                              </Tooltip>
                            ) : (
                              donor.user_names
                            )}
                          </Typography.Text>
                        </Col>
                        <Col>
                          <Row justify="end">
                            <Typography.Text>
                              {numeral(donor.amount).format()} {cause.currency}
                            </Typography.Text>
                          </Row>
                          <Row justify="end">
                            <Typography.Text
                              className={
                                styles.cause_sider__content__sidebar__item__donationTime
                              }
                            >
                              {upperFirst(getDonationTime(donor.created_at))}
                            </Typography.Text>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                    {total >= 5 && (
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
                          {t("view all")}
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
