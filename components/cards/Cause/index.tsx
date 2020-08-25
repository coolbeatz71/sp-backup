import React from "react";
import {
  Card as AntdCard,
  Typography,
  Spin,
  Badge,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
} from "antd";
import StarRating from "components/common/StarRating";
import SharePopover from "components/common/SharePopover";
import {
  LoadingOutlined,
  PictureOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import numeral from "numeral";
import moment from "moment";

import CustomIcon from "components/common/CustomIcon";

import styles from "./index.module.scss";

interface Props {
  cause: { [key: string]: any };
}

const donateMsg: { [key: string]: string } = {
  active: "Make a Donation",
  paused: "This cause has been Paused",
  closed: "This cause has been Closed",
  completed: "This cause has been completed",
  cancelled: "This cause has been cancelled",
};

interface FooterCoverProps {
  slug: string;
  active: boolean;
  children: React.ReactElement;
}
const FooterCover: React.FC<FooterCoverProps> = ({ slug, active, children }) =>
  active ? (
    <Link href="/causes/[slug]/donate" as={`/causes/${slug}/donate`}>
      <a>{children}</a>
    </Link>
  ) : (
    children
  );

const Cause: React.FC<Props> = ({ cause }) => {
  const [imageStatus, setImageStatus] = React.useState(
    !["", null, undefined].includes(cause.image) ? "loading" : "none",
  );

  const percentage =
    (100 / (cause.target_amount * 1)) * (cause.raised_amount * 1);
  const notEnded = moment().isBefore(moment(cause.end_date));

  return (
    <AntdCard
      className={styles.card}
      hoverable
      cover={
        <Link href="/causes/[slug]" as={`/causes/${cause.slug}`}>
          <a data-aspect-ratio className={styles.card__cover}>
            {imageStatus === "loading" && (
              <div className={styles.card__cover__placeholder}>
                <Spin indicator={<LoadingOutlined />} />
              </div>
            )}
            {["error", "none"].includes(imageStatus) && (
              <div className={styles.card__cover__placeholder}>
                <Typography.Title>
                  <PictureOutlined />
                </Typography.Title>
                <Typography.Text>
                  Cause Cover Image
                  {imageStatus === "error"
                    ? " Failed To Load!"
                    : " Not Available!"}
                </Typography.Text>
              </div>
            )}
            {imageStatus !== "none" && (
              <img
                className={imageStatus}
                alt="Cause Cover Image"
                src={cause.image}
                onError={() => {
                  setImageStatus("error");
                }}
                onLoad={() => {
                  setImageStatus("loaded");
                }}
              />
            )}
          </a>
        </Link>
      }
    >
      <Badge className={styles.card__type} count={cause.category.title} />
      <Avatar className={styles.card__avatar} src={cause.user_avatar} size={64}>
        {cause.user_names
          ?.split(" ")
          .map((n: string) => n && n.charAt(0).toUpperCase())}
      </Avatar>
      <div className={styles.card__verified}>
        <CustomIcon type="verified" />
      </div>
      <Row gutter={[0, 10]} className={styles.card__user__row} align="middle">
        <Col>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            className={styles.card__user}
          >
            by {cause.user_names}
          </Typography.Paragraph>
          {cause.organization && (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              className={styles.card__user}
            >
              with {cause.organization.name}
            </Typography.Paragraph>
          )}
        </Col>
      </Row>
      <Link href="/causes/[slug]" as={`/causes/${"asd"}`}>
        <a>
          <div className={styles.card__title}>
            <Typography.Title level={4} ellipsis>
              {cause.name}
            </Typography.Title>
          </div>
          <Typography.Paragraph
            className={styles.card__summary}
            ellipsis={{ rows: 2 }}
          >
            {cause.summary}
          </Typography.Paragraph>
        </a>
      </Link>
      <div className={styles.card__progress}>
        <Row justify="space-between">
          <Col span={16}>
            <Typography.Text ellipsis>
              {numeral(cause.raised_amount).format("0,0.[00]")} RWF Raised
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text type="secondary" ellipsis>
              {numeral(percentage).format("0.[00]")}%
            </Typography.Text>
          </Col>
        </Row>
        <div className={styles.card__progress__item}>
          <div
            className={styles.card__progress__item__inner}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <Row justify="space-between">
          <Col span={16}>
            <Typography.Text ellipsis>
              {numeral(cause.target_amount).format("0,0.[00]")} RWF Goal
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text type="secondary" ellipsis>
              {notEnded ? "" : "Ended "}
              {moment(cause.end_date).fromNow(notEnded)}
              {notEnded ? " to Go" : " Ago"}
            </Typography.Text>
          </Col>
        </Row>
      </div>
      <Row justify="space-between">
        <Col span={16}>
          <StarRating
            value={cause.ratings * 1}
            count={cause.raters_count * 1}
          />
        </Col>
        <Col>
          <SharePopover
            slug={cause.slug}
            title={cause.name}
            code={cause.till_number}
          >
            <Button type="link" size="small" className={styles.card__share}>
              Share <ShareAltOutlined />
            </Button>
          </SharePopover>
        </Col>
      </Row>
      <Divider />
      <FooterCover slug={cause.slug} active={cause.status === "active"}>
        <Button type="text" block className={styles.card__donate}>
          <Typography.Text
            underline
            strong
            ellipsis
            type={cause.status !== "active" ? "secondary" : undefined}
          >
            {donateMsg[cause.status]}
          </Typography.Text>
        </Button>
      </FooterCover>
    </AntdCard>
  );
};

export default Cause;
