import React, { FC } from "react";
import styles from "./causeCard.module.scss";
import Link from "next/link";
import { truncate } from "lodash";
import numberFormatter from "helpers/numberFormater";
import {
  HOME_PATH,
  USER_CAUSES_PATH,
  ALL_CAUSES_PATH,
} from "./../../../helpers/paths";
import { ICauseStatus, causeStatus } from "interfaces/";
import getProgressPercentage from "./../../../helpers/getProgressPercentage";
import OwnerInfo from "./OwnerInfo";
import StatusInfo from "./StatusInfo";
import Actions from "./Actions";
import ExtraInfo from "./ExtraInfo";

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
  category: string;
  rating: number;
  daysToGo?: number | string;
}

const getDaysToGoMsg = (status: string, daysToGo: any): string => {
  return status === causeStatus.active && daysToGo > 0
    ? `${daysToGo} Days to Go`
    : daysToGoStatus[status];
};

const renderFooter = (status: string, pathName: string, slug: string) => {
  if (pathName === HOME_PATH || pathName === ALL_CAUSES_PATH) {
    return (
      <div className={styles.causeCard__footer}>
        {status === causeStatus.active ? (
          <Link href="/causes/[slug]/donate" as={`/causes/${slug}/donate`}>
            <a>{canDonateMsg[status]}</a>
          </Link>
        ) : (
          <p>{canDonateMsg[status] || canDonateMsg.closed}</p>
        )}
      </div>
    );
  }

  if (pathName === USER_CAUSES_PATH) {
    return (
      <div className={styles.causeCard__footer}>
        <Link href="/causes/[slug]" as={`/causes/${slug}`}>
          <a>View Cause Detail</a>
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
  category,
}) => {
  const renderHeaderInfo = () => {
    if (pathName === HOME_PATH || pathName === ALL_CAUSES_PATH)
      return (
        <OwnerInfo
          category={category}
          avatar={avatar}
          verified={verified}
          name={name}
        />
      );

    if (pathName === USER_CAUSES_PATH) return <StatusInfo status={status} />;
  };

  const progress = getProgressPercentage(amountRaised, amountToReach);
  const progressBar = progress > 100 ? 100 : progress;

  return (
    <div className={styles.causeCard}>
      <div className="cover">
        <Link href="/causes/[slug]" as={`/causes/${slug}`}>
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
          {pathName === USER_CAUSES_PATH && (
            <Actions slug={slug} status={status} />
          )}
          <div className={styles.causeCard__body__content__title}>
            <Link href="/causes/[slug]" as={`/causes/${slug}`}>
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
              length: 105,
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
        {(pathName === HOME_PATH || pathName === ALL_CAUSES_PATH) && (
          <ExtraInfo rating={rating} />
        )}
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
