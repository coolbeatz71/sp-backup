import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import qs from "query-string";
import { IRootState } from "redux/initialStates";

import Layout from "components/LayoutWrapper";
import fire from "utils/fire-confetti";

import { clear } from "redux/actions/cause/create";

import styles from "./index.module.scss";
import Link from "next/link";
import {
  WhatsAppOutlined,
  FacebookFilled,
  TwitterOutlined,
} from "@ant-design/icons";

const genData = (data: any) => {
  if (data) {
    const url = `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/causes/${data.slug}`;
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
                  Cause Created Successfully!
                </Typography.Title>
                <Card
                  cover={
                    <div
                      className={styles.dashboard__banner}
                      data-aspect-ratio=""
                    >
                      <img src={data.image} data-aspect-ratio="" />
                    </div>
                  }
                >
                  <div className={styles.success__centered}>
                    <Typography.Title level={3}>{data.name}</Typography.Title>
                    <Typography.Paragraph>
                      <strong>SHARE THE CAUSE</strong>
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      ellipsis
                      code
                      copyable={{ text: `${data.till_number}` }}
                    >
                      Bill #: {data.till_number}
                    </Typography.Paragraph>
                    <Row gutter={[0, 20]}>
                      <Col
                        className={styles.success__facebook}
                        span={4}
                        offset={6}
                      >
                        <a href={d?.fb} target="_blank">
                          <FacebookFilled />
                        </a>
                      </Col>
                      <Col className={styles.success__whatsapp} span={4}>
                        <a href={d?.wa} target="_blank">
                          <WhatsAppOutlined />
                        </a>
                      </Col>
                      <Col className={styles.success__twitter} span={4}>
                        <a href={d?.tw} target="_blank">
                          <TwitterOutlined />
                        </a>
                      </Col>
                    </Row>
                    <Typography.Paragraph underline>
                      <Link href="/dashboard">BACK HOME</Link>
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      ellipsis
                      copyable
                      className={styles.success__copyable}
                    >
                      {d?.url}
                    </Typography.Paragraph>
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
