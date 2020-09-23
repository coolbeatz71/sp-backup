import React, { FC } from "react";
import styles from "./causeCard.module.scss";
import Link from "next/link";
import { truncate } from "lodash";
import numberFormatter from "helpers/numberFormater";
import { HOME_PATH, USER_CAUSES_PATH, ALL_CAUSES_PATH } from "helpers/paths";
import { ICauseStatus, causeStatus } from "interfaces/";
import getProgressPercentage from "helpers/getProgressPercentage";
import OwnerInfo from "./OwnerInfo";
import StatusInfo from "./StatusInfo";
import Actions from "./Actions";
import ExtraInfo from "./ExtraInfo";
import LazyLoadCover from "./LazyLoadCover";
import { IUnknownObject } from "interfaces/unknownObject";

const daysToGoStatus: ICauseStatus = {
  active: causeStatus.active,
  paused: causeStatus.paused,
  completed: causeStatus.completed,
  cancelled: causeStatus.cancelled,
};

const canDonateMsg: ICauseStatus = {
  active: "Make a Donation",
  paused: "This cause has been Paused",
  completed: "This cause has been completed",
  cancelled: "This cause has been cancelled",
};

export interface CauseCardProps {
  pathName: string;
  slug: string;
  owner: { userAvatar?: string; name?: string; verified?: boolean };
  cover: string;
  title: string;
  tillNumber: string;
  description: string;
  amountRaised: number | string;
  amountToReach: number | string;
  currency: string;
  status: string;
  category: string;
  rating: number;
  ratersCount: string;
  daysToGo?: number | string;
  sponsored: boolean;
  access?: string;
  plainAccessCode?: string;
  data: IUnknownObject;
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
            <a rel="noreferrer noopener">{canDonateMsg[status]}</a>
          </Link>
        ) : (
          <p>{canDonateMsg[status]}</p>
        )}
      </div>
    );
  }

  if (pathName === USER_CAUSES_PATH) {
    return (
      <div className={styles.causeCard__footer}>
        <Link href="/causes/[slug]" as={`/causes/${slug}`}>
          <a rel="noreferrer noopener">View Cause Detail</a>
        </Link>
      </div>
    );
  }
};

const CauseCard: FC<CauseCardProps> = ({
  pathName,
  slug,
  owner: { userAvatar: avatar, name, verified },
  cover,
  title,
  tillNumber,
  description,
  amountRaised,
  amountToReach,
  currency,
  status,
  rating,
  ratersCount,
  daysToGo,
  sponsored,
  access = "public",
  plainAccessCode = "",
  category,
  data,
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
      <Link href="/causes/[slug]" as={`/causes/${slug}`}>
        <div className={styles.causeCard__cover}>
          {sponsored && (
            <span className={styles.causeCard__cover__sponsorTag}>
              Sponsored
            </span>
          )}

          <LazyLoadCover context="cause-card">
            <a rel="noreferrer noopener">
              <img
                alt="cause cover"
                src={
                  !cover || !cover.match(/\.(jpg|jpeg|png)$/)
                    ? "/icons/no-img-placeholder.svg"
                    : `${process.env.SAVE_PLUS_IMAGES_URL}/${cover}`
                }
                onError={(e) =>
                  (e.currentTarget.src = "/icons/no-img-placeholder.svg")
                }
              />
            </a>
          </LazyLoadCover>
        </div>
      </Link>
      <div className={styles.causeCard__body}>
        <div className={styles.causeCard__body__header}>
          {renderHeaderInfo()}
        </div>
        {pathName !== USER_CAUSES_PATH && (
          <div className={styles.causeCard__body__userName}>
            <span>
              by {name}{" "}
              {data?.organization_id && `with ${data?.organization?.name}`}{" "}
            </span>
          </div>
        )}
        <div className={styles.causeCard__body__content}>
          {pathName === USER_CAUSES_PATH && (
            <Actions
              slug={slug}
              status={status}
              access={access}
              plainAccessCode={plainAccessCode}
            />
          )}
          <div className={styles.causeCard__body__content__title}>
            <Link href="/causes/[slug]" as={`/causes/${slug}`}>
              <a rel="noreferrer noopener">
                <h3>
                  {truncate(title, {
                    length: 58,
                  })}
                </h3>
              </a>
            </Link>
          </div>

          <p>{description}</p>
        </div>
        <div className={styles.causeCard__body__progress}>
          <div className={styles.causeCard__body__progress__raised}>
            <h5>
              {numberFormatter(amountRaised)} {currency} Raised
            </h5>
            <span className={styles.causeCard__body__progress__percentage}>
              {progress}%
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

        <ExtraInfo
          pathName={pathName}
          slug={slug}
          title={title}
          rating={rating}
          ratersCount={ratersCount}
          tillNumber={tillNumber}
          status={status}
        />
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
