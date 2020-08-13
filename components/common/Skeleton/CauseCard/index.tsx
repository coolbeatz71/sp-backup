import React from "react";
import { Skeleton } from "antd";
import styles from "./../skeleton.module.scss";

const CauseCardSkeleton: React.FC<{}> = ({}) => {
  return (
    <div className={styles.skeleton__causeCard}>
      <Skeleton.Button active />
      <Skeleton.Avatar active />
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  );
};

export default CauseCardSkeleton;
