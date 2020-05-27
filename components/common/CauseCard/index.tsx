import React, { FC } from "react";
import styles from "./causeCard.module.scss";
import Link from "next/link";
// import { Button } from "antd";
import ReactStars from "react-star-rating-component";
import numberFormatter from "helpers/numberFormater";

enum causeStatus {
  isClosed = "closed",
  isOpen = "open",
}

export interface CauseCardProps {
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

const CauseCard: FC<CauseCardProps> = ({
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
  return (
    <div className={styles.causeCard}>
      <div className="cover">
        <img src={cover} alt="" />
      </div>
      <div className={styles.causeCard__body}>
        <div className={styles.causeCard__body__header}>
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
                  className={
                    styles.causeCard__body__header__causeOwner__verified
                  }
                />
              )}
            </div>
            <span>by {name} </span>
          </div>
          <div className={`tag ${styles.causeCard__body__header__causeTag}`}>
            Charity
          </div>
        </div>
        <div className={styles.causeCard__body__content}>
          <div className={styles.causeCard__body__content__title}>
            <Link href="/">
              <h3>{title}</h3>
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
      </div>
      <div className={styles.causeCard__footer}>
        <Link href="/">
          <a>
            {causeStatus.isOpen === status
              ? "Make a Donation"
              : "This Cause has been Stopped "}
          </a>
        </Link>
      </div>
      <style jsx>{`
        .progression {
          width: ${progress}%;
        }
      `}</style>
    </div>
  );
};

export default CauseCard;
