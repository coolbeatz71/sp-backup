import React, { FC, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import {
  getAllBroadcasts,
  clearAllBroadcasts,
} from "redux/actions/broadcasts/getAll";
import Stories from "react-insta-stories";

import styles from "./index.module.scss";
import ReactPlayer from "react-player";
import { isEmpty, truncate } from "lodash";
import dayjs from "dayjs";

const Story: FC<{}> = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(true);
  const [closedDiffHours, setClosedDiffHours] = useState<number>(0);

  const { data } = useSelector(
    ({ broadcasts: { broadcasts } }: IRootState) => broadcasts,
  );

  useEffect(() => {
    getAllBroadcasts()(dispatch);
    if (process.browser) {
      const closed = localStorage.getItem("save-closed-timestamp");
      const closedTime = dayjs.unix(Number(closed));
      setClosedDiffHours(dayjs().diff(closedTime, "h"));
    }
  }, [dispatch]);

  const getFileType = (mimeType: string) => {
    return /^image/.test(mimeType) ? "image" : "video";
  };

  const onClose = () => {
    clearAllBroadcasts()(dispatch);
    localStorage.setItem("save-closed-timestamp", dayjs().unix().toString());
  };

  const stories = data?.map((item) => ({
    content: () => {
      return (
        <Row className={styles.story__container}>
          <div className={styles.story__container__action}>
            <Button
              type="default"
              shape="circle"
              icon={<LeftOutlined />}
              size="small"
            />
            <Button
              type="default"
              shape="circle"
              icon={<RightOutlined />}
              size="small"
            />
          </div>
          <Col span={24} className={styles.story__container__img}>
            {getFileType(item.mimetype) === "image" ? (
              <img src={item.media} />
            ) : (
              <ReactPlayer
                playing
                width="100%"
                height="100%"
                controls={false}
                url={item.media}
              />
            )}
          </Col>
          <Col span={24} className={styles.story__container__desc}>
            <span
              dangerouslySetInnerHTML={{
                __html: truncate(item.text, { length: 230 }),
              }}
            />
          </Col>
        </Row>
      );
    },
  }));

  return !isEmpty(data) && closedDiffHours >= 6 ? (
    <>
      <Modal
        visible={visible}
        footer={false}
        className={styles.story}
        destroyOnClose
        onCancel={() => {
          onClose();
          setVisible(false);
        }}
        maskClosable={false}
      >
        <Stories stories={stories} defaultInterval={20000} width="100%" loop />
      </Modal>
    </>
  ) : null;
};

export default Story;
