import React, { FC, useState, useRef } from "react";
import ReactStars from "react-star-rating-component";
import styles from "../causeCard.module.scss";
import CausePopover from "../CausePopover";
import { causeStatus } from "interfaces";
import useHideRatingPopover from "hooks/useHideRatingPopover";

import { useTranslation } from "react-i18next";

export interface ExtraInfoProps {
  slug: string;
  title: string;
  rating: number;
  ratersCount: string;
  tillNumber: string;
  pathName: string;
  status: string;
}

const ExtraInfo: FC<ExtraInfoProps> = ({
  slug,
  title,
  tillNumber,
  rating,
  ratersCount,
  status,
}) => {
  const wrapperRef = useRef(null);
  const [openSharePopover, setOpenSharePopover] = useState(false);
  const { openRatingPopover, setOpenRatingPopover } = useHideRatingPopover(
    wrapperRef,
  );

  const { t } = useTranslation();

  return (
    <div className={styles.causeCard__body__extra}>
      <CausePopover
        context="rating-details"
        rating={rating}
        ratersCount={ratersCount}
        visible={openRatingPopover}
        handleVisibleChange={(openRatingPopover) =>
          setOpenRatingPopover(openRatingPopover)
        }
        hideCausePopover={() => setOpenRatingPopover(false)}
      >
        <div
          ref={wrapperRef}
          className={styles.causeCard__body__extra__ratings}
        >
          <span className={styles.causeCard__body__extra__ratings__label}>
            {t("rating")}:
          </span>
          <ReactStars
            starCount={5}
            value={rating}
            name="rate1"
            starColor="#F4A86C"
            editing={false}
            emptyStarColor="#ddd"
          />
        </div>
      </CausePopover>
      {status === causeStatus.active && (
        <CausePopover
          context="social-share"
          slug={slug}
          title={title}
          tillNumber={tillNumber}
          visible={openSharePopover}
          handleVisibleChange={(openSharePopover) =>
            setOpenSharePopover(openSharePopover)
          }
          hideCausePopover={() => setOpenSharePopover(false)}
        >
          <div className={styles.causeCard__body__extra__share}>
            <span className={styles.causeCard__share__text}>Share</span>
            <span className={styles.causeCard__share}>
              <img src="/icons/share-icon.svg" alt="share icon" />
            </span>
          </div>
        </CausePopover>
      )}
    </div>
  );
};

export default ExtraInfo;
