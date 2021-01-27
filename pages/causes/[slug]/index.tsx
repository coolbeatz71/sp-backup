import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "dev-rw-phone";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { useTranslation } from "react-i18next";
import styles from "./single.module.scss";
import { Row, Col, Typography, message, Grid } from "antd";
import ReactPlayer from "react-player";
import getSingle from "redux/actions/cause/getSingle";
import { IRootState } from "redux/initialStates";
import getCauseInitialProps from "helpers/getCauseInitialProps";
import getVideoId from "get-video-id";
import NotFound from "pages/404";

import Error from "components/common/Error";
import AccessCode from "components/Cause/Single/AccessCode";
import LayoutWrapper from "components/LayoutWrapper";
import CauseSider from "components/Cause/CauseSider";
import EditModal from "components/modals/EditModal";
import CauseCard from "components/cards/Cause";
import SingleCauseSkeleton from "components/common/Skeleton/SingleCause";

interface Props {
  cause: { [key: string]: any };
  error: null | { [key: string]: any };
  edit?: boolean;
}

const SingleCause: NextPage<Props> = ({
  cause: cs,
  error: er,
  edit = false,
}) => {
  const [cause, setCause] = useState(cs);
  const [error, setError] = useState(er);

  const [fetched, setFetched] = useState(error === null);
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, data, error: _err, accessCode } = useSelector(
    ({ cause: { single } }: IRootState) => single,
  );

  const user = useSelector((state: IRootState) => state.user);
  const { data: banner } = useSelector(
    ({ broadcasts: { broadcasts } }: IRootState) => broadcasts,
  );

  const { t } = useTranslation();

  useEffect(() => {
    if (_err) setError(_err);
    if (data?.slug && !cause.id) {
      setCause(data);
      setError(null);
    }
  }, [_err, data]);

  useEffect(() => {
    if (!fetched && !cause.id) {
      getSingle(
        cause?.slug,
        accessCode ? { access_code: accessCode } : {},
      )(dispatch);
      setFetched(true);
    }
  }, [fetched]);

  const [editing, setEditing] = useState(edit);

  const myCause =
    user.currentUser.isLoggedin &&
    cause.user_id * 1 === user.currentUser.data?.id * 1;

  useEffect(() => {
    if (edit && cause.id) {
      if (cause.edit_count === 0) {
        setEditing(edit);
      } else {
        message.warning(t("cause is already edited"));
        router.replace(`/causes/${data?.slug}`);
      }
    }
  }, [edit, cause]);

  const screens = Grid.useBreakpoint();

  const contactPhone = cause.organization
    ? cause.organization.phone_number
    : cause.contact_phone_number;

  const contactEmail = cause.organization
    ? cause.organization.email
    : cause.contact_email;

  const getYoutubeVideoID = () => {
    if (typeof cause.video === "string" && validator.isURL(cause.video)) {
      const { id, service }: any = getVideoId(cause.video);
      return service === "youtube" && id;
    }
    return false;
  };

  const contact = (
    <>
      <h4 className={styles.dashboard__content__title}>
        {t("cause team and contact")}
      </h4>
      <Typography.Paragraph className={styles.dashboard__content__paragraph}>
        {t("you can reach out on")}{" "}
        <Typography.Link
          href={`tel:${contactPhone}`}
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          {format(contactPhone)}
        </Typography.Link>{" "}
        {t("or")}{" "}
        <Typography.Link
          href={`mailto:${contactEmail}`}
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          {contactEmail}
        </Typography.Link>
      </Typography.Paragraph>
    </>
  );

  const content = (
    <>
      {" "}
      <Typography.Paragraph
        className={styles.dashboard__content__paragraph__first}
      >
        {cause.summary}
      </Typography.Paragraph>
      {typeof cause.video === "string" && validator.isURL(cause.video) && (
        <Typography.Paragraph className={styles.dashboard__content__video}>
          {getYoutubeVideoID() ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeVideoID()}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <ReactPlayer controls url={cause.video} width="100%" />
          )}
        </Typography.Paragraph>
      )}
      <h4 className={styles.dashboard__content__title}>{t("use of funds")}</h4>
      <Typography.Paragraph
        className={styles.dashboard__content__paragraph__details}
      >
        {cause.description}
      </Typography.Paragraph>
      {screens.lg && contact}
    </>
  );

  return (
    <LayoutWrapper
      isCause
      isForm
      title={error?.message || cause?.name}
      description={cause?.summary}
      image={cause?.image}
    >
      <div data-content-padding className={styles.dashboard}>
        {loading ? (
          <SingleCauseSkeleton />
        ) : (
          error && (
            <>
              {[400, 403].includes(error?.status) ? (
                <AccessCode slug={cause?.slug} error={error} length={4} />
              ) : error?.status === 404 ? (
                <NotFound noWrapper />
              ) : (
                <Error
                  status={error?.status || 500}
                  message={error?.message || t("unknown_error")}
                />
              )}
            </>
          )
        )}
        {!loading && !error && (
          <div>
            {cause?.edit_count === 0 && (
              <EditModal
                visible={editing}
                onClose={() => router.push(`/causes/${cause?.slug}`)}
                slug={cause?.slug}
                name={cause?.name}
                target={cause?.target_amount * 1}
                start={cause?.start_date}
                end={cause?.end_date}
              />
            )}
            <div className={styles.dashboard__inner}>
              <Row gutter={[24, 24]} className={styles.dashboard__content}>
                <Col span={24} lg={15}>
                  <div data-card-not-lg={!screens.lg}>
                    <CauseCard cause={cause} isView />
                  </div>
                  {screens.lg && content}
                </Col>
                <Col span={24} lg={9}>
                  <CauseSider
                    cause={cause}
                    myCause={myCause}
                    content={content}
                    contact={contact}
                    hasBanner={typeof banner.id !== "undefined"}
                  />
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
};

SingleCause.getInitialProps = getCauseInitialProps;

export default SingleCause;
