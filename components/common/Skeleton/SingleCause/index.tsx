import { FC } from "react";
import { Row, Col, Skeleton } from "antd";
import styles from "./skeleton.module.scss";

const SingleCauseSkeleton: FC<{}> = ({}) => {
  return (
    <div className={styles.skeleton__singleCause}>
      <Row gutter={[24, 24]}>
        <Col span={24} lg={15}>
          <Skeleton.Button
            active
            className={styles.skeleton__singleCause__title}
          />
          <Skeleton.Image className={styles.skeleton__singleCause__causeImg} />
          <Skeleton.Avatar
            active
            shape="circle"
            size={72}
            className={styles.skeleton__singleCause__avatar}
          />
          <Skeleton active paragraph={{ rows: 5 }} />
          <Skeleton active paragraph={{ rows: 6 }} />
        </Col>
        <Col span={24} lg={9}>
          <Skeleton.Button
            active
            className={styles.skeleton__singleCause__donateBtn}
          />
          <Skeleton.Button
            active
            className={styles.skeleton__singleCause__progresBar}
          />
          <Skeleton.Button
            active
            className={styles.skeleton__singleCause__share}
          />
          <Skeleton.Button
            active
            className={styles.skeleton__singleCause__share}
          />
          <Skeleton.Button
            active
            className={styles.skeleton__singleCause__donors}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SingleCauseSkeleton;
