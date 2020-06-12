import React, { FC } from "react";
import ReactStars from "react-star-rating-component";
import styles from "../causeCard.module.scss";

const ExtraInfo: FC<{ rating: number }> = ({ rating }) => {
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

export default ExtraInfo;
