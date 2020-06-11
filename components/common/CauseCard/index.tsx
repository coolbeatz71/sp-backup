import React, { FC } from "react";
import styles from "./causeCard.module.scss";
import Link from "next/link";
import { Avatar } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { truncate } from "lodash";
import ReactStars from "react-star-rating-component";
import numberFormatter from "helpers/numberFormater";
import { HOME_PATH, USER_CAUSES_PATH } from "./../../../helpers/paths";
import randmonColor from "randomcolor";
import abName from "helpers/abName";
import { ICauseStatus, causeStatus } from "interfaces/";
import getCauseTagColor from "helpers/getCauseTagColor";
import getProgressPercentage from "./../../../helpers/getProgressPercentage";

const color = randmonColor();

const daysToGoStatus: ICauseStatus = {
  active: causeStatus.active,
  stopped: causeStatus.stopped,
  closed: causeStatus.closed,
  completed: causeStatus.completed,
  cancelled: causeStatus.cancelled,
};

const canDonateMsg: ICauseStatus = {
  active: "Make a Donation",
  stopped: "This cause has been Stopped",
  closed: "This cause has been Closed",
  completed: "This cause has been completed",
  cancelled: "This cause has been cancelled",
};

export interface CauseCardProps {
  pathName: string;
  slug: string;
  owner: { avatar?: string; name?: string; verified?: boolean };
  cover: string;
  title: string;
  description: string;
  amountRaised: number | string;
  amountToReach: number | string;
  currency: string;
  status: string;
  rating: number;
  daysToGo?: number | string;
}

const getDaysToGoMsg = (status: string, daysToGo: any): string => {
  return status === causeStatus.active && daysToGo > 0
    ? `${daysToGo} Days to Go`
    : daysToGoStatus[status];
};

const renderOwnerInfo = (
  avatar?: string,
  verified?: boolean,
  name?: string,
) => {
  const names: any = name?.split(" ");
  return (
    <>
      <div className={styles.causeCard__body__header__causeOwner}>
        <div className={styles.top}>
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className={styles.causeCard__body__header__causeOwner__avatar}
            />
          ) : (
            <Avatar
              size="large"
              style={{
                marginRight: 5,
                marginTop: "-20px",
                backgroundColor: color,
                verticalAlign: "middle",
              }}
            >
              {abName(names[0], names[1])}
            </Avatar>
          )}

          {verified && (
            <img
              alt=""
              src="/icons/verified-icon.svg"
              className={styles.causeCard__body__header__causeOwner__verified}
            />
          )}
        </div>
        <span>by {name} </span>
      </div>
      <div className={`tag ${styles.causeCard__body__header__causeTag}`}>
        Charity
      </div>
    </>
  );
};

const renderStatusInfo = (status: string) => {
  const color = getCauseTagColor(status);
  return (
    <div
      className={`tag ${styles.causeCard__body__header__causeTag}`}
      style={{ backgroundColor: color }}
    >
      {status}
    </div>
  );
};

const renderExtraInfo = (rating: number) => {
  return (
    <div className={styles.causeCard__body__extra}>
      <div className={styles.causeCard__body__extra__ratings}>
        <span>Rating:</span>
        <ReactStars
          starCount={5}
          value={rating}
          name="rate1"
          starColor="#F4A86C"
          editing={false}
        />
      </div>
      <div className={styles.causeCard__body__extra__share}>
        <span className={styles.causeCard__share__text}>share</span>
        <span className={styles.causeCard__share}>
          <img src="/icons/share-icon.svg" alt="" />
        </span>
      </div>
    </div>
  );
};

const renderFooter = (status: string, pathName: string, slug: string) => {
  if (pathName === HOME_PATH) {
    return (
      <div className={styles.causeCard__footer}>
        <Link href="/">
          <a>{canDonateMsg[status] || canDonateMsg.closed}</a>
        </Link>
      </div>
    );
  }

  if (pathName === USER_CAUSES_PATH) {
    return (
      <div className={styles.causeCard__footer}>
        <Link href={`${USER_CAUSES_PATH}/${slug}`}>
          <a>View Cause Detail</a>
        </Link>
      </div>
    );
  }
};

const renderDetailIcon = (pathName: string, slug: string) => {
  if (pathName === USER_CAUSES_PATH) {
    return (
      <div className={styles.causeCard__body__content__detailIcon}>
        <Link href={`${USER_CAUSES_PATH}/${slug}`}>
          <a>
            <MoreOutlined
              className={styles.causeCard__body__content__detailIcon__icon}
            />
          </a>
        </Link>
      </div>
    );
  }
};

const CauseCard: FC<CauseCardProps> = ({
  pathName,
  slug,
  owner: { avatar, name, verified },
  cover,
  title,
  description,
  amountRaised,
  amountToReach,
  currency,
  status,
  rating,
  daysToGo,
}) => {
  const renderHeaderInfo = () => {
    if (pathName === HOME_PATH) {
      return renderOwnerInfo(avatar, verified, name);
    }

    if (pathName === USER_CAUSES_PATH) {
      return renderStatusInfo(status);
    }
  };

  const progress = getProgressPercentage(amountRaised, amountToReach);
  const progressBar = progress > 100 ? 100 : progress;

  return (
    <div className={styles.causeCard}>
      <div className="cover">
        <Link href={`${USER_CAUSES_PATH}/${slug}`}>
          <a>
            <img src={cover} alt="" />
          </a>
        </Link>
      </div>
      <div className={styles.causeCard__body}>
        <div className={styles.causeCard__body__header}>
          {renderHeaderInfo()}
        </div>
        <div className={styles.causeCard__body__content}>
          {renderDetailIcon(pathName, slug)}
          <div className={styles.causeCard__body__content__title}>
            <Link href={`${USER_CAUSES_PATH}/${slug}`}>
              <a>
                <h3>
                  {truncate(title, {
                    length: 58,
                  })}
                </h3>
              </a>
            </Link>
          </div>
          <p>
            {truncate(description, {
              length: 111,
            })}
          </p>
        </div>
        <div className={styles.causeCard__body__progress}>
          <div className={styles.causeCard__body__progress__raised}>
            <h5>
              {numberFormatter(amountRaised)} {currency} Raised
            </h5>
            <span className={styles.causeCard__body__progress__percentage}>
              {progress} %
            </span>
          </div>
          <div className={styles.causeCard__body__progress__progressBar}>
            <div
              className={`progression ${styles.causeCard__body__progress__progression}`}
            />
          </div>
          <div className={styles.causeCard__body__progress__goal}>
            <h5>
              {numberFormatter(amountToReach)} {currency} Goal
            </h5>
            <span className={styles.causeStatus}>
              {getDaysToGoMsg(status, daysToGo)}
            </span>
          </div>
        </div>
        {pathName === HOME_PATH ? renderExtraInfo(rating) : null}
      </div>
      {renderFooter(status, pathName, slug)}
      <style jsx>{`
        .progression {
          width: ${progressBar}%;
        }
      `}</style>
    </div>
  );
};

export default CauseCard;
