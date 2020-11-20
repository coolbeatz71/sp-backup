import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import qs from "query-string";
import { IRootState } from "redux/initialStates";
import getPlatformUrl from "helpers/getPlatformUrl";
import SharePopover from "components/common/SharePopover";

import Layout from "components/LayoutWrapper";
import fire from "utils/fire-confetti";

import { clear } from "redux/actions/cause/create";

import styles from "./index.module.scss";
import Link from "next/link";

import { useTranslation } from "react-i18next";

const { NEXT_PUBLIC_SAVE_PLUS_IMAGES_URL = "" } = process.env;

const genData = (data: any) => {
  if (data) {
    const url = `${getPlatformUrl()}/causes/${data.slug}`;
    return {
      url,
      fb: qs.stringifyUrl({
        url: "https://www.facebook.com/sharer/sharer.php",
        query: { display: "page", u: url, quote: data.name },
      }),
      wa: qs.stringifyUrl({
        url: "https://api.whatsapp.com/send",
        query: {
          text: `${data.name}

      ${url}`,
        },
      }),
      tw: qs.stringifyUrl({
        url: "http://twitter.com/share",
        query: {
          url,
          text: data.name,
          via: "SavePlusHQ",
        },
      }),
    };
  }
  return null;
};

const Success = () => {
  const { data: success } = useSelector(
    (state: IRootState) => state.cause.create,
  );

  const [data, setData] = React.useState<any>(success);

  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    if (!success.id && !data.id) {
      router.replace("/causes/create");
    } else {
      if (success.id) {
        [2000, 2100, 2200, 2300, 2500].map((t) => setTimeout(() => fire(), t));
        setData(success);
        clear()(dispatch);
      }
    }
  }, [success, data]);

  const d = genData(data);

  const { t } = useTranslation();

  return (
    <div className={styles.success}>
      <Layout title="Success!" isForm>
        <div data-content-padding>
          {data.id && (
            <Row>
              <Col
                xxl={{ span: 8, offset: 8 }}
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 14, offset: 5 }}
                md={{ span: 18, offset: 3 }}
                sm={{ span: 24, offset: 0 }}
                xs={{ span: 24, offset: 0 }}
              >
                <Typography.Title
                  level={4}
                  className={styles.success__centered}
                >
                  {data.status === "pending" ? (
                    <>
                      {t("thank you")}!
                      <br />
                      {t("cause is pending for")}
                      <br />
                      {t("verification")}
                    </>
                  ) : (
                    "Cause Created Successfully!"
                  )}
                </Typography.Title>
                <Card
                  cover={
                    <div
                      className={styles.dashboard__banner}
                      data-aspect-ratio=""
                    >
                      <img
                        src={`${NEXT_PUBLIC_SAVE_PLUS_IMAGES_URL}/${data.image}`}
                        data-aspect-ratio=""
                        alt="cause cover"
                      />
                    </div>
                  }
                >
                  <div className={styles.success__centered}>
                    <Typography.Title level={3}>{data.name}</Typography.Title>
                    {data.status !== "pending" && (
                      <>
                        <Typography.Paragraph>
                          <strong>{t("share the cause").toUpperCase()}</strong>
                        </Typography.Paragraph>
                        <Typography.Paragraph
                          ellipsis
                          code
                          copyable={{ text: `${data.till_number}` }}
                        >
                          {t("till number")} #: {data.till_number}
                        </Typography.Paragraph>
                        <SharePopover
                          standalone
                          isCreateSuccess
                          slug={data.slug}
                          code={data.till_number}
                          title={data.name}
                          isPrivate={data.access === "private"}
                        />
                      </>
                    )}
                    <Typography.Paragraph underline>
                      <Link href="/">{t("back home").toUpperCase()}</Link>
                    </Typography.Paragraph>
                    {data.status !== "pending" && (
                      <Typography.Paragraph
                        ellipsis
                        copyable
                        className={styles.success__copyable}
                      >
                        {d?.url}
                      </Typography.Paragraph>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Success;
