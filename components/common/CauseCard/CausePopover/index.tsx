import React, { FC, ReactElement } from "react";
import { Popover } from "antd";
import ReactStars from "react-star-rating-component";
import Share from "components/common/Share";
import shortenLargeNumber from "helpers/shortenLargeNumber";
import styles from "./causePopover.module.scss";

export interface CausePopoverProps {
  slug?: string;
  title?: string;
  rating?: number;
  ratersCount?: string;
  tillNumber?: string;
  visible: boolean;
  children: ReactElement;
  context: "social-share" | "rating-details";
  hideCausePopover: () => void;
  handleVisibleChange: (openCausePopover: boolean) => void;
}

const CausePopover: FC<CausePopoverProps> = ({
  slug = "",
  title = "",
  rating = 0,
  ratersCount = "",
  tillNumber = "",
  children,
  visible,
  context,
  hideCausePopover,
  handleVisibleChange,
}) => {
  const shareContent = (
    <div className={styles.causePopover}>
      <Share
        title={title}
        slug={slug}
        tillNumber={tillNumber}
        label={false}
        hideCausePopover={hideCausePopover}
      />
    </div>
  );

  const ratingContent = (
    <div
      onClick={hideCausePopover}
      onBlur={hideCausePopover}
      className={styles.causePopover__rating}
    >
      <div className={styles.causePopover__rating__count}>
        <h4>{rating}.0</h4>
        <ReactStars
          starCount={5}
          value={rating}
          name="rate1"
          starColor="#F4A86C"
          editing={false}
          emptyStarColor="#ddd"
        />
      </div>
      {ratersCount && parseInt(ratersCount, 10) > 0 && (
        <div className={styles.causePopover__rating__users}>
          <span className="mx-1 font-weight-bold">
            {shortenLargeNumber(ratersCount, 1)}
          </span>
          <span>
            person
            {parseInt(ratersCount, 10) <= 1 || "s"}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Popover
      visible={visible}
      onVisibleChange={handleVisibleChange}
      trigger={context === "social-share" ? "click" : "hover"}
      placement={context === "social-share" ? "topRight" : "topLeft"}
      content={context === "social-share" ? shareContent : ratingContent}
    >
      {children}
    </Popover>
  );
};

export default CausePopover;
