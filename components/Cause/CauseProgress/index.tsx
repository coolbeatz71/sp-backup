import React from "react";
import { Row, Col, Typography, Progress, Button } from "antd";
import numeral from "numeral";
import moment from "moment";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import Actions from "components/common/CausesActions";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

interface Props {
  cause: { [key: string]: any };
  reload: (del: boolean) => void;
  edit: () => void;
  tiny?: boolean;
}

const CauseProgress: React.FC<Props> = ({
  cause,
  reload,
  edit,
  tiny = false,
}) => {
  const router = useRouter();

  const user = useSelector((state: IRootState) => state.user);

  const myCause =
    user.currentUser.isLoggedin &&
    cause.user_id * 1 === user.currentUser.data?.id * 1;

  return (
    <div className={styles.dashboard__content__progress}>
      <Row gutter={24}>
        <Col span={tiny ? 24 : 15}>
          <Row>
            <Col flex={1}>
              <Typography.Text
                data-is-tiny={tiny}
                className={styles.dashboard__content__progress__text}
                strong
              >
                {numeral(cause.raised_amount * 1).format()} {cause.currency}{" "}
                Raised
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                data-is-tiny={tiny}
                className={styles.dashboard__content__progress__text}
              >
                <span>
                  {numeral(
                    ((cause.raised_amount * 1) / (cause.target_amount * 1)) *
                      100,
                  ).format("0,0.0")}
                  %
                </span>
              </Typography.Text>
            </Col>
          </Row>
          <Progress
            percent={
              ((cause.raised_amount * 1) / (cause.target_amount * 1)) * 100
            }
            showInfo={false}
            strokeWidth={tiny ? 12 : 24}
            strokeColor="#219bb2"
            trailColor="rgba(0,0,0,0.1)"
          />
          <Row>
            <Col flex={1}>
              <Typography.Text
                data-is-tiny={tiny}
                className={styles.dashboard__content__progress__text}
                strong
              >
                {numeral(cause.target_amount * 1).format()} {cause.currency}{" "}
                Goal
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                data-is-tiny={tiny}
                className={styles.dashboard__content__progress__text}
              >
                <span>{moment(cause.created_at).fromNow()}</span>
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        {!tiny && (
          <Col span={9}>
            <div className={styles.dashboard__content__progress__buttons}>
              <Button
                type="primary"
                onClick={() => router.push(`/causes/${cause.slug}/donate`)}
                disabled={cause.status !== "active"}
              >
                DONATE
              </Button>
              {myCause && !tiny && (
                <Actions reload={reload} record={cause} viewing edit={edit} />
              )}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CauseProgress;
