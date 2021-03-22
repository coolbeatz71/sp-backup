import {
  Card as AntdCard,
  Typography,
  Badge,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
} from "antd";
// import StarRating from "components/common/StarRating";

import styles from "./index.module.scss";

const CauseSkeleton = () => {
  return (
    <AntdCard
      className={styles.card}
      cover={<div data-aspect-ratio className={styles.card__cover} />}
    >
      <Badge className={styles.card__type} count="Cause" />
      <Avatar className={styles.card__avatar} size={64} alt="Avatar">
        &nbsp;
      </Avatar>
      <Typography.Paragraph ellipsis={{ rows: 1 }}>&nbsp;</Typography.Paragraph>
      <div className={styles.card__title}>
        <Typography.Title level={4} ellipsis className={styles.card__gray}>
          CauseCauseCauseCause
        </Typography.Title>
      </div>
      <Typography.Paragraph className={styles.card__summary}>
        &nbsp;
      </Typography.Paragraph>
      <div className={styles.card__progress}>
        <Row justify="space-between">
          <Col span={16}>
            <Typography.Text ellipsis className={styles.card__gray}>
              CauseCauseCauseCause
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text
              type="secondary"
              ellipsis
              className={styles.card__gray}
            >
              Cause
            </Typography.Text>
          </Col>
        </Row>
        <div className={styles.card__progress__item}>
          <div className={styles.card__progress__item__inner} />
        </div>
        <Row justify="space-between">
          <Col span={16}>
            <Typography.Text ellipsis className={styles.card__gray}>
              CauseCauseCauseCause
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text
              type="secondary"
              ellipsis
              className={styles.card__gray}
            >
              Cause
            </Typography.Text>
          </Col>
        </Row>
      </div>
      <Row justify="space-between">
        <Col span={16} className={styles.card__stars}>
          {/* <StarRating status="" value={0} count={0} noAction /> */}
          <Button type="link" size="small" className={styles.card__share}>
            &nbsp;
          </Button>
        </Col>
        <Col>
          <Button type="link" size="small" className={styles.card__share}>
            &nbsp;
          </Button>
        </Col>
      </Row>
      <Divider />

      <Button type="text" block className={styles.card__donate}>
        &nbsp;
      </Button>
    </AntdCard>
  );
};

export default CauseSkeleton;
