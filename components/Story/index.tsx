import React, { FC, ReactElement, useEffect, useState } from "react";
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

  const imgStory = (media: string) => <img src={media} />;
  const videoStory = (media: string) => (
    <ReactPlayer
      playing
      width="100%"
      height="100%"
      controls={false}
      url={media}
    />
  );

  const content = (children: ReactElement, text: string) => (
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
        {children}
      </Col>
      <Col span={24} className={styles.story__container__desc}>
        <span
          dangerouslySetInnerHTML={{
            __html: truncate(text, { length: 230 }),
          }}
        />
      </Col>
    </Row>
  );

  const stories = data?.map((item) =>
    getFileType(item.mimetype) === "image"
      ? {
          content: () => content(imgStory(item.media), item.text),
          duration: 10000,
        }
      : {
          content: () => content(videoStory(item.media), item.text),
          duration: 30000,
        },
  );

  return !isEmpty(data) && closedDiffHours >= 6 ? (
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
      <Stories stories={stories} width="100%" loop />
    </Modal>
  ) : null;
};

export default Story;
