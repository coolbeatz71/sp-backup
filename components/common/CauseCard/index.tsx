import React, { FC } from "react";
import styles from "./causeCard.module.scss";
import Link from "next/link";
import { MoreOutlined } from "@ant-design/icons";
// import { Button } from "antd";
import ReactStars from "react-star-rating-component";
import numberFormatter from "helpers/numberFormater";
import { HOME_PATH, USER_CAUSES_PATH } from "./../../../helpers/paths";

enum causeStatus {
  isClosed = "closed",
  isOpen = "open",
}

export interface CauseCardProps {
  pathName: string;
  slug: string;
  owner: { avatar: string; name: string; verified: boolean };
  cover: string;
  title: string;
  description: string;
  amountRaised: number | string;
  amountToReach: number | string;
  progress: number | string;
  status: "open" | "closed";
  rating: number;
  daysToGo?: number | string;
}

const renderOwnerInfo = (avatar: string, verified: boolean, name: string) => {
  return (
    <>
      <div className={styles.causeCard__body__header__causeOwner}>
        <div className={styles.top}>
          <img
            src={avatar}
            alt=""
            className={styles.causeCard__body__header__causeOwner__avatar}
          />
          {verified && (
            <img
              src="/icons/verified-icon.svg"
              alt=""
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
  return (
    <div className={`tag ${styles.causeCard__body__header__causeTag}`}>
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
          <a>
            {causeStatus.isOpen === status
              ? "Make a Donation"
              : "This Cause has been Stopped "}
          </a>
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
  progress,
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
                <h3>{title}</h3>
              </a>
            </Link>
          </div>
          <p>{description}</p>
        </div>
        <div className={styles.causeCard__body__progress}>
          <div className={styles.causeCard__body__progress__raised}>
            <h5>{numberFormatter(amountRaised)} RWF Raised</h5>
            <span className={styles.causeCard__body__progress__percentage}>
              {numberFormatter(progress)} %
            </span>
          </div>
          <div className={styles.causeCard__body__progress__progressBar}>
            <div
              className={`progression ${styles.causeCard__body__progress__progression}`}
            />
          </div>
          <div className={styles.causeCard__body__progress__goal}>
            <h5>{numberFormatter(amountToReach)} RWF Goal</h5>
            <span className={styles.causeStatus}>
              {causeStatus.isOpen === status
                ? `${daysToGo} Days to Go`
                : "Cause is Stopped"}
            </span>
          </div>
        </div>
        {pathName === HOME_PATH ? renderExtraInfo(rating) : null}
      </div>
      {renderFooter(status, pathName, slug)}
      <style jsx>{`
        .progression {
          width: ${progress}%;
        }
      `}</style>
    </div>
  );
};

export default CauseCard;
