import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./single.module.scss";
import { Row, Col, Typography } from "antd";
import ReactPlayer from "react-player/lazy";
import getSingle from "redux/actions/cause/getSingle";
import { IRootState } from "redux/initialStates";
import Error from "components/common/Error";
import AccessCode from "components/Cause/Single/AccessCode";
import SingleCauseSkeleton from "components/common/Skeleton/SingleCause";
import getCauseInitialProps from "helpers/getCauseInitialProps";
import LayoutWrapper from "components/LayoutWrapper";
import Head from "next/head";
import getPlatformUrl from "helpers/getPlatformUrl";
import CauseProgress from "components/Cause/CauseProgress";
import CauseSider from "components/Cause/CauseSider";
import { format } from "dev-rw-phone";

interface Props {
  cause: { [key: string]: any };
  error: null | { [key: string]: any };
}

const SingleCause: NextPage<Props> = ({ cause: cs, error: er }) => {
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

  console.log(data);

  return (
    <LayoutWrapper title={error?.message || cause?.name} isForm>
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
            <Head>
              <meta property="og:type" content="website" />
              <meta property="description" content={cause?.description} />
              <meta property="og:title" content={cause?.name} />
              <meta property="description" content={cause?.summary} />
              <meta
                property="og:url"
                content={`${getPlatformUrl()}/causes/${cause?.slug}`}
              />
              <meta property="og:description" content={cause?.summary} />
              <meta property="og:image" content={cause?.image} />

              <meta name="twitter:title" content={cause?.name} />
              <meta name="twitter:description" content={cause?.summary} />
              <meta name="twitter:image" content={cause?.image} />
              <meta name="twitter:card" content={cause?.image} />
            </Head>

            <div className={styles.dashboard__inner}>
              <div className={styles.dashboard__banner} data-aspect-ratio="">
                <img src={cause?.image} data-aspect-ratio="" />
              </div>
              <Row className={styles.dashboard__content}>
                <Col span={18} offset={3}>
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
                  <Row gutter={24}>
                    <Col span={15}>
                      <Typography.Title
                        level={3}
                        className={styles.dashboard__content__title}
                      >
                        {cause.name}
                      </Typography.Title>
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
