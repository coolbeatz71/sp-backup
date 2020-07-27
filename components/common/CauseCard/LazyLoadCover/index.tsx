import React, { FC, ReactElement } from "react";
import LazyLoad from "react-lazyload";
import styles from "./lazyLoadCover.module.scss";

export interface LazyLoadCoverProps {
  context: "cause-card" | "cause-details";
  children: ReactElement;
}

const LazyLoadCover: FC<LazyLoadCoverProps> = ({ children, context }) => {
  const className =
    context === "cause-card"
      ? styles.lazyLoadCover__causeCard__defaultImg
      : styles.lazyLoadCover__causeDetails__defaultImg;

  const placeholder = (
    <div className={className}>
      <img src="/icons/image-placeholder.gif" alt="" />
    </div>
  );

  return (
    <div className={styles.lazyLoadCover}>
      <LazyLoad once={true} debounce={100} placeholder={placeholder}>
        {children}
      </LazyLoad>
    </div>
  );
};

export default LazyLoadCover;
