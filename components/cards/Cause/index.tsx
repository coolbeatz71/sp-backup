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
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import CausesActions from "components/common/CausesActions";

import CustomIcon from "components/common/CustomIcon";

import styles from "./index.module.scss";
import capitalize from "helpers/capitalize";
import colors from "helpers/cause-type-colors";

interface Props {
  cause: { [key: string]: any };
  reload?: () => void;
}

const donateMsg: { [key: string]: string } = {
  active: "Make a Donation",
  paused: "This cause has been Paused",
  closed: "This cause has been Closed",
  completed: "This cause has been completed",
  cancelled: "This cause has been cancelled",
  myCause: "View Cause Detail",
};

interface FooterCoverProps {
  slug: string;
  active: boolean;
  children: React.ReactElement;
  myCause: boolean;
}
const FooterCover: React.FC<FooterCoverProps> = ({
  slug,
  active,
  children,
  myCause,
}) =>
  myCause ? (
    <Link href="/causes/[slug]" as={`/causes/${slug}`}>
      <a>{children}</a>
    </Link>
  ) : active ? (
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

  const user = useSelector((state: IRootState) => state.user);

  const percentage =
    (100 / (cause.target_amount * 1)) * (cause.raised_amount * 1);
  const notEnded = moment().isBefore(moment(cause.end_date));

  const myCause =
    user.currentUser.isLoggedin &&
    cause.user_id * 1 === user.currentUser.data?.id * 1;

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
            {cause.sponsored && (
              <Badge
                count="Sponsored"
                className={styles.card__cover__sponsored}
              />
            )}
          </a>
        </Link>
      }
    >
      <Badge className={styles.card__type} count={cause.category.title} />
      {!myCause && (
        <Avatar
          className={styles.card__avatar}
          src={cause.user_avatar}
          size={64}
        >
          {cause.user_names
            ?.split(" ")
            .map((n: string) => n && n.charAt(0).toUpperCase())}
        </Avatar>
      )}
      <div className={styles.card__verified} data-my-cause={myCause}>
        {myCause && (
          <Badge
            count={capitalize(cause.status)}
            style={{ backgroundColor: colors[cause.status] }}
          />
        )}
        {cause.verified && <CustomIcon type="verified" />}
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
      <div className={styles.card__title} data-my-cause={myCause}>
        <Link href="/causes/[slug]" as={`/causes/${cause.slug}`}>
          <a>
            <Typography.Title level={4} ellipsis>
              {cause.name}
            </Typography.Title>
          </a>
        </Link>
        {myCause && (
          <CausesActions
            record={cause}
            reload={() => {
              //
            }}
          />
        )}
      </div>
      {cause.access === "private" && <Badge color="#e150fd" text="Private" />}
      <Link href="/causes/[slug]" as={`/causes/${cause.slug}`}>
        <a>
          <Typography.Paragraph
            data-access={cause.access}
            className={styles.card__summary}
            ellipsis={{ rows: cause.access === "public" ? 3 : 2 }}
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
          <Col className={styles.card__progress__item__goal}>
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
      <FooterCover
        slug={cause.slug}
        active={cause.status === "active"}
        myCause={myCause}
      >
        <Button type="text" block className={styles.card__donate}>
          <Typography.Text
            underline
            strong
            ellipsis
            type={cause.status !== "active" ? "secondary" : undefined}
          >
            {donateMsg[myCause ? "myCause" : cause.status]}
          </Typography.Text>
        </Button>
      </FooterCover>
    </AntdCard>
  );
};

export default Cause;
