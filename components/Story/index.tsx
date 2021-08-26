import React, { FC, ReactElement, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import { LeftOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import {
  getAllBroadcasts,
  clearAllBroadcasts,
} from "redux/actions/broadcasts/getAll";
import Stories from "react-insta-stories";

import styles from "./index.module.scss";
import { isEmpty, truncate } from "lodash";
import dayjs from "dayjs";
import { IUnknownObject } from "interfaces/unknownObject";

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

  const content = (children: ReactElement, text: string) => (
    <Row className={styles.story__container}>
      <div className={styles.story__container__action} data-action>
        <Button
          type="default"
          shape="circle"
          icon={<LeftOutlined />}
          size="small"
          data-btn
        />
        <Button
          type="default"
          shape="circle"
          icon={<RightOutlined />}
          size="small"
          data-btn
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

  const stories: IUnknownObject[] = data?.map((item) =>
    getFileType(item.mimetype) === "image"
      ? {
          duration: 10000,
          content: () => content(imgStory(item.media), item.text),
        }
      : {
          type: "video",
          url: item.media,
          header: {
            subheading: (
              <div className={styles.story__container__action}>
                <Button
                  type="default"
                  shape="circle"
                  icon={<LeftOutlined />}
                  size="small"
                  data-btn
                />
                <Button
                  type="default"
                  shape="circle"
                  icon={<RightOutlined />}
                  size="small"
                  data-btn
                />
              </div>
            ),
          },
          seeMoreCollapsed: ({ toggleMore }: IUnknownObject) =>
            item.text && (
              <div>
                <Row align="middle" justify="center">
                  <Button
                    type="text"
                    onClick={() => toggleMore(true)}
                    data-view-more-arrow
                  >
                    <UpOutlined style={{ color: "#fff" }} />
                  </Button>
                </Row>
                <Row align="middle" justify="center">
                  <Button
                    type="text"
                    className="view-more-btn"
                    onClick={() => toggleMore(true)}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: truncate(item.text, { length: 40 }),
                      }}
                    />
                  </Button>
                </Row>
              </div>
            ),
          seeMore: ({ close }: IUnknownObject) => (
            <div className="view-container">
              <span
                dangerouslySetInnerHTML={{
                  __html: truncate(item.text, { length: 230 }),
                }}
              />
              <br />
              <Button onClick={close} size="large" type="primary">
                Close
              </Button>
            </div>
          ),
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
      <Stories stories={stories} width="100%" loop keyboardNavigation />
    </Modal>
  ) : null;
};

export default Story;
