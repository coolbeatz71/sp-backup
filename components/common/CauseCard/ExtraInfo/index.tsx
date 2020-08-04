import React, { FC, useState } from "react";
import ReactStars from "react-star-rating-component";
import styles from "../causeCard.module.scss";
import CausePopover from "../CausePopover";
import { HOME_PATH, ALL_CAUSES_PATH } from "helpers/paths";
import { causeStatus } from "interfaces";

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
  pathName,
  status,
}) => {
  const [openRatingPopover, setOpenRatingPopover] = useState(false);
  const [openSharePopover, setOpenSharePopover] = useState(false);

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
          role="button"
          tabIndex={-1}
          onKeyDown={() => null}
          onBlur={() => setOpenRatingPopover(false)}
          className={styles.causeCard__body__extra__ratings}
        >
          <span className={styles.causeCard__body__extra__ratings__label}>
            Rating:
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
      {status === causeStatus.active &&
        (pathName === HOME_PATH || pathName === ALL_CAUSES_PATH) && (
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
                <img src="/icons/share-icon.svg" alt="" />
              </span>
            </div>
          </CausePopover>
        )}
    </div>
  );
};

export default ExtraInfo;
