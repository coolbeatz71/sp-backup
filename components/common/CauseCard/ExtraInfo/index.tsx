import React, { FC, useState } from "react";

import ReactStars from "react-star-rating-component";
import styles from "../causeCard.module.scss";
import SocialSharePopover from "../SharePopover";

export interface ExtraInfoProps {
  rating: number;
  title: string;
  slug: string;
  tillNumber: string;
}

const ExtraInfo: FC<ExtraInfoProps> = ({ slug, title, tillNumber, rating }) => {
  const [openSharePopover, setOpenSharePopover] = useState(false);

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
          emptyStarColor="#ddd"
        />
      </div>
      <SocialSharePopover
        slug={slug}
        title={title}
        tillNumber={tillNumber}
        visible={openSharePopover}
        hideSharePopover={() => setOpenSharePopover(false)}
        handleVisibleChange={(openSharePopover) =>
          setOpenSharePopover(openSharePopover)
        }
      >
        <div className={styles.causeCard__body__extra__share}>
          <span className={styles.causeCard__share__text}>share</span>
          <span className={styles.causeCard__share}>
            <img src="/icons/share-icon.svg" alt="" />
          </span>
        </div>
      </SocialSharePopover>
    </div>
  );
};

export default ExtraInfo;
