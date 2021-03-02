import { FC, Fragment, ReactElement, useState } from "react";
import { isEmpty, upperFirst } from "lodash";
import Image from "next/image";
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
import { useTranslation } from "react-i18next";
import StarRating from "components/common/StarRating";
import SharePopover from "components/common/SharePopover";
import {
  LoadingOutlined,
  PictureOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import numeral from "numeral";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import CausesActions from "components/common/CausesActions";

import CustomIcon from "components/common/CustomIcon";

import styles from "./index.module.scss";
import capitalize from "helpers/capitalize";
import colors from "helpers/cause-type-colors";
import { getCauseEndingDate } from "helpers/dateFormatter";
import { causeStatus } from "interfaces";
import { avatarLoader, imgLoader } from "helpers/getImageUrl";
import { getLanguage } from "helpers/getLanguage";

interface Props {
  cause: { [key: string]: any };
  reload?: () => void;
  isView?: boolean;
  isDonate?: boolean;
}

interface FooterCoverProps {
  slug: string;
  active: boolean;
  children: ReactElement;
  myCause: boolean;
  lang: string;
}

const FooterCover: FC<FooterCoverProps> = ({
  slug,
  active,
  children,
  myCause,
  lang,
}) => {
  return myCause ? (
    <Link
      href={{
        pathname: `/causes/${slug}`,
        query: { lang },
      }}
    >
      <a rel="noreferrer noopener">{children}</a>
    </Link>
  ) : active ? (
    <Link
      href={{
        pathname: `/causes/${slug}/donate`,
        query: { lang },
      }}
    >
      <a rel="noreferrer noopener">{children}</a>
    </Link>
  ) : (
    children
  );
};

export const isInactive = (status: string): boolean => {
  return (
    status === causeStatus.completed ||
    status === causeStatus.rejected ||
    status === causeStatus.cancelled
  );
};

const Cause: FC<Props> = ({ cause, isView = false, isDonate = false }) => {
  const { t } = useTranslation();
  const { data: userData } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const lang = userData.lang || getLanguage();

  const donateMsg: { [key: string]: string } = {
    active: t("make a donation"),
    paused: t("paused"),
    rejected: t("rejected"),
    completed: t("completed"),
    cancelled: t("cancelled"),
    myCause: t("view cause details"),
  };

  const [imageStatus, setImageStatus] = useState(
    !["", null, undefined].includes(cause.image) ? "loading" : "none",
  );

  const user = useSelector((state: IRootState) => state.user);

  const percentage =
    (100 / (cause.target_amount * 1)) * (cause.raised_amount * 1);

  const myCause =
    user.currentUser.isLoggedin &&
    cause.user_id * 1 === user.currentUser.data?.id * 1;

  const LinkWrap: FC<{
    children: ReactElement;
  }> = ({ children }) =>
    isView ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Link
        href={{
          pathname: `/causes/${cause.slug}`,
          query: { lang },
        }}
      >
        {children}
      </Link>
    );

  const causeAvatar = () =>
    !isEmpty(cause.user_avatar) ? (
      <div className={styles.card__container__avatar__image}>
        <Image
          priority
          layout="fill"
          quality={1}
          loader={avatarLoader}
          src={cause.user_avatar}
          alt={cause.user_names}
        />
      </div>
    ) : (
      <Avatar
        className={styles.card__container__avatar__names}
        src={cause.user_avatar}
        size={64}
        alt={cause.user_names}
      >
        {cause.user_names
          ?.split(" ")
          .map((n: string) => n && n.charAt(0).toUpperCase())}
      </Avatar>
    );

  const causeCard = () => (
    <AntdCard
      className={styles.card__container}
      data-is-view={isView}
      hoverable={!isView}
      bordered={!isView}
      cover={
        <LinkWrap>
          <a
            data-aspect-ratio
            className={styles.card__container__cover}
            rel="noreferrer noopener"
          >
            {imageStatus === "loading" && (
              <div className={styles.card__container__cover__placeholder}>
                <Spin indicator={<LoadingOutlined />} />
              </div>
            )}
            {["error", "none"].includes(imageStatus) && (
              <div className={styles.card__container__cover__placeholder}>
                <Typography.Title>
                  <PictureOutlined />
                </Typography.Title>
                <Typography.Text>
                  {t("cause cover image")}
                  {imageStatus === "error"
                    ? t("failed to load")
                    : t("not available")}
                </Typography.Text>
              </div>
            )}
            {imageStatus !== "none" && (
              <Image
                priority
                layout="fill"
                loader={imgLoader}
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
                count={t("sponsored")}
                className={styles.card__container__cover__sponsored}
                data-active={isView || !isInactive(cause.status)}
                data-is-view={isView}
              />
            )}
          </a>
        </LinkWrap>
      }
    >
      <Badge
        className={styles.card__container__type}
        count={t(cause.category?.title)}
        data-active={isView || !isInactive(cause.status)}
        data-is-view={isView}
      />
      {!myCause && causeAvatar()}
      <div className={styles.card__container__verified} data-my-cause={myCause}>
        {myCause && (
          <Badge
            count={capitalize(t(cause.status))}
            style={{
              backgroundColor:
                !isView && isInactive(cause.status)
                  ? "#bdbdbd"
                  : colors[cause.status],
            }}
          />
        )}
        {cause.verified && (
          <CustomIcon
            type={
              !isView && isInactive(cause.status) ? "verifiedGrey" : "verified"
            }
          />
        )}
      </div>

      <Row
        gutter={[0, 10]}
        className={styles.card__container__user__row}
        align="middle"
      >
        <Col>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            className={styles.card__container__user}
          >
            {t("by")} {cause.user_names}
          </Typography.Paragraph>
          {cause.organization && (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              className={styles.card__container__user}
            >
              {t("with")} {cause.organization.name}
            </Typography.Paragraph>
          )}
          {cause.institution && (
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              className={styles.card__container__user}
            >
              {t("with")} {cause.institution.name}
            </Typography.Paragraph>
          )}
        </Col>
      </Row>
      {!isView && (
        <div className={styles.card__container__title} data-my-cause={myCause}>
          <Link
            href={{
              pathname: `/causes/${cause.slug}`,
              query: { lang },
            }}
          >
            <a rel="noreferrer noopener">
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
      )}
      {cause.access === "private" && (
        <Badge color="#e150fd" text={t("private")} />
      )}
      {!isView && (
        <>
          <Link
            href={{
              pathname: `/causes/${cause.slug}`,
              query: { lang },
            }}
          >
            <a rel="noreferrer noopener">
              <Typography.Paragraph
                data-access={cause.access}
                className={styles.card__container__summary}
                ellipsis={{ rows: cause.access === "public" ? 3 : 2 }}
              >
                {cause.summary}
              </Typography.Paragraph>
            </a>
          </Link>
          <div className={styles.card__container__progress}>
            <Row justify="space-between">
              <Col span={16}>
                <Typography.Text ellipsis className={styles.progress_amount}>
                  {numeral(cause.raised_amount).format("0,0.[00]")} RWF{" "}
                  {t("raised")}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text
                  type="secondary"
                  ellipsis
                  className={styles.progress_ratio}
                >
                  {numeral(percentage).format("0.[00]")}%
                </Typography.Text>
              </Col>
            </Row>
            <div
              className={styles.card__container__progress__item}
              data-active={isView || !isInactive(cause.status)}
            >
              <div
                style={{ width: `${percentage}%` }}
                className={styles.card__container__progress__item__inner}
                data-active={isView || !isInactive(cause.status)}
              />
            </div>
            <Row justify="space-between">
              <Col className={styles.card__container__progress__item__goal}>
                <Typography.Text ellipsis className={styles.progress_amount}>
                  {numeral(cause.target_amount).format("0,0.[00]")} RWF{" "}
                  {t("goal")}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text
                  type="secondary"
                  ellipsis
                  className={styles.progress_ratio}
                >
                  {getCauseEndingDate(cause.end_date)}
                </Typography.Text>
              </Col>
            </Row>
          </div>
          <Row justify="space-between">
            <Col span={16}>
              <StarRating
                value={cause.ratings * 1}
                count={cause.raters_count * 1}
                status={cause.status}
              />
            </Col>
            <Col>
              <SharePopover
                slug={cause.slug}
                title={cause.name}
                code={cause.till_number}
                isPrivate={cause.access === "private"}
                disabled={cause.status !== causeStatus.active}
              >
                <Button
                  type="link"
                  size="small"
                  className={styles.card__container__share}
                  disabled={cause.status !== causeStatus.active}
                >
                  {t("share")} <ShareAltOutlined />
                </Button>
              </SharePopover>
            </Col>
          </Row>
          <Divider />
          <FooterCover
            slug={cause.slug}
            active={cause.status === "active"}
            myCause={myCause}
            lang={lang}
          >
            <Button
              type="text"
              block
              className={styles.card__container__donate}
            >
              <Typography.Text
                underline={cause.status === "active" || myCause}
                strong
                ellipsis
                type={cause.status !== "active" ? "secondary" : undefined}
              >
                {upperFirst(donateMsg[myCause ? "myCause" : cause.status])}
              </Typography.Text>
            </Button>
          </FooterCover>
        </>
      )}
    </AntdCard>
  );

  const renderCauseCard = (status: string) => {
    return !isView && isInactive(status) ? (
      <>
        <div className={styles.card__overlay} />
        {causeCard()}
      </>
    ) : (
      causeCard()
    );
  };

  return (
    <>
      {isView && !isDonate && (
        <Row
          gutter={[0, 24]}
          justify="space-between"
          className={styles.card__container__head}
        >
          <Col span={24} lg={22} style={{ paddingTop: 0 }}>
            <Typography.Title
              level={3}
              className={styles.card__container__head__title}
            >
              {upperFirst(cause.name)}
            </Typography.Title>
          </Col>
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
        </Row>
      )}
      <div className={styles.card}>{renderCauseCard(cause.status)}</div>
    </>
  );
};

export default Cause;
