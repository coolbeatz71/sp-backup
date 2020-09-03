import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import styles from "./single.module.scss";
import { Row, Col, Typography, message, Grid } from "antd";
import ReactPlayer from "react-player/lazy";
import getSingle from "redux/actions/cause/getSingle";
import { IRootState } from "redux/initialStates";
import Error from "components/common/Error";
import AccessCode from "components/Cause/Single/AccessCode";
import SingleCauseSkeleton from "components/common/Skeleton/SingleCause";
import getCauseInitialProps from "helpers/getCauseInitialProps";
import LayoutWrapper from "components/LayoutWrapper";
import CauseSider from "components/Cause/CauseSider";
import { format } from "dev-rw-phone";
import EditModal from "components/modals/EditModal";
import CauseCard from "components/cards/Cause";
import NotFound from "pages/404";

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
  const [cause, setCause] = React.useState(cs);
  const [error, setError] = React.useState(er);

  const [fetched, setFetched] = useState(error === null);
  const router = useRouter();
  const dispatch = useDispatch();
  // const [isVideoPlayerReady, setVideoPlayerReadiness] = useState(false);

  const { loading, data, error: _err } = useSelector(
    ({ cause: { single } }: IRootState) => single,
  );

  const user = useSelector((state: IRootState) => state.user);

  React.useEffect(() => {
    if (_err) setError(_err);
    if (data?.slug && !cause.id) {
      setCause(data);
      setError(null);
    }
  }, [_err, data]);

  React.useEffect(() => {
    if (!fetched && !cause.id) {
      getSingle(cause?.slug)(dispatch);
      setFetched(true);
    }
  }, [fetched]);

  const [editing, setEditing] = React.useState(edit);

  const myCause =
    user.currentUser.isLoggedin &&
    cause.user_id * 1 === user.currentUser.data?.id * 1;

  React.useEffect(() => {
    if (edit && cause.id) {
      if (cause.edit_count === 0) {
        setEditing(edit);
      } else {
        message.warning("This cause was already edited!");
        router.replace(`/causes/${data?.slug}`);
      }
    }
  }, [edit, cause]);

  const screens = Grid.useBreakpoint();

  const contact = (
    <>
      <h4 className={styles.dashboard__content__title}>
        CAUSE TEAM AND CONTACT
      </h4>
      <Typography.Paragraph className={styles.dashboard__content__paragraph}>
        You can reach out on{" "}
        <Typography.Link
          href={`tel:${cause.payment_account_number}`}
          target="_blank"
        >
          {format(cause.payment_account_number)}
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
          <ReactPlayer controls url={cause.video} width="100%" />
        </Typography.Paragraph>
      )}
      <h4 className={styles.dashboard__content__title}>USE OF FUNDS</h4>
      <Typography.Paragraph className={styles.dashboard__content__paragraph}>
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
      <div data-content-padding>
        {loading ? (
          <SingleCauseSkeleton />
        ) : (
          error && (
            <>
              {[400, 403].includes(error?.status) ? (
                <AccessCode slug={cause?.slug} error={error} />
              ) : error?.status === 404 ? (
                <NotFound noWrapper />
              ) : (
                <Error
                  status={error?.status || 500}
                  message={error?.message || "An unknown error ocurred!"}
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
              <Row gutter={[0, 24]}>
                <Col span={24} lg={15}>
                  <Typography.Title
                    level={2}
                    className={styles.dashboard__content__title}
                  >
                    {cause.name}
                  </Typography.Title>
                </Col>
              </Row>
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
