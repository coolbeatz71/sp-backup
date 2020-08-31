import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./single.module.scss";
import { Row, Col, Typography, message } from "antd";
import ReactPlayer from "react-player/lazy";
import getSingle from "redux/actions/cause/getSingle";
import { IRootState } from "redux/initialStates";
import Error from "components/common/Error";
import AccessCode from "components/Cause/Single/AccessCode";
import SingleCauseSkeleton from "components/common/Skeleton/SingleCause";
import getCauseInitialProps from "helpers/getCauseInitialProps";
import LayoutWrapper from "components/LayoutWrapper";
import CauseProgress from "components/Cause/CauseProgress";
import CauseSider from "components/Cause/CauseSider";
import { format } from "dev-rw-phone";
import EditModal from "components/modals/EditModal";

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

  React.useEffect(() => {
    if (_err) setError(_err);
    if (data?.slug) {
      setCause(data);
      setError(null);
    }
  }, [_err, data]);

  React.useEffect(() => {
    if (!fetched) {
      getSingle(cause?.slug)(dispatch);
      setFetched(true);
    }
  }, [fetched]);

  const [editing, setEditing] = React.useState(edit);

  React.useEffect(() => {
    if (edit && cause.slug) {
      if (cause.edit_count === 0) {
        setEditing(edit);
      } else {
        message.warning("This cause was already edited!");
        router.replace(`/causes/${data?.slug}`);
      }
    }
  }, [edit, cause]);

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
            <EditModal
              visible={editing}
              onClose={() => router.push(`/causes/${cause?.slug}`)}
              slug={cause?.slug}
              name={cause?.name}
              target={cause?.target_amount * 1}
              start={cause?.start_date}
              end={cause?.end_date}
            />
            <Row>
              <Col xs={{ span: 24, offset: 0 }} xl={{ span: 20, offset: 2 }}>
                <div className={styles.dashboard__inner}>
                  <Row gutter={[0, 24]}>
                    <Col span={15}>
                      <Typography.Title
                        className={styles.dashboard__content__title}
                      >
                        {cause.name}
                      </Typography.Title>
                    </Col>
                  </Row>
                  <Row gutter={[24, 24]} className={styles.dashboard__content}>
                    <Col span={15}>
                      <Row gutter={[0, 24]}>
                        <Col>
                          <img src={cause?.image} style={{ width: "100%" }} />
                        </Col>
                      </Row>
                      <Row gutter={[0, 24]}>
                        <Col span={24}>
                          <CauseProgress
                            cause={cause}
                            edit={() => {
                              // setEditing(true);
                            }}
                            reload={(del) => {
                              if (!del) getSingle(cause?.slug)(dispatch);
                              else router.replace(`/causes`);
                            }}
                          />
                        </Col>
                      </Row>
                      <Typography.Paragraph
                        className={styles.dashboard__content__paragraph}
                      >
                        {cause.description}
                      </Typography.Paragraph>
                      {![null, "", undefined].includes(cause.video) && (
                        <Typography.Paragraph
                          className={styles.dashboard__content__video}
                        >
                          <ReactPlayer
                            controls
                            url={cause.video}
                            width="100%"
                          />
                        </Typography.Paragraph>
                      )}
                      <h4 className={styles.dashboard__content__title}>
                        USE OF FUNDS
                      </h4>
                      <Typography.Paragraph
                        className={styles.dashboard__content__paragraph}
                      >
                        {cause.summary}
                      </Typography.Paragraph>
                      <h4 className={styles.dashboard__content__title}>
                        CAUSE TEAM AND CONTACT
                      </h4>
                      <Typography.Paragraph
                        className={styles.dashboard__content__paragraph}
                      >
                        You can reach out on{" "}
                        <Typography.Link
                          href={`tel:${cause.payment_account_number}`}
                          target="_blank"
                        >
                          {format(cause.payment_account_number)}
                        </Typography.Link>
                      </Typography.Paragraph>
                    </Col>
                    <Col span={9}>
                      <CauseSider cause={cause} />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
};

SingleCause.getInitialProps = getCauseInitialProps;

export default SingleCause;
