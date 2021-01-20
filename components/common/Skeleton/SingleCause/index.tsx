import { FC } from "react";
import { Skeleton } from "antd";
import styles from "./skeleton.module.scss";

const SingleCauseSkeleton: FC<{}> = ({}) => {
  return (
    <div className={styles.skeleton__singleCause}>
      <Skeleton.Button active />
      <Skeleton active paragraph={{ rows: 5 }} />
    </div>
  );
};

export default SingleCauseSkeleton;
