import React from "react";
import { Popover, Button, Typography, Row, Col, message } from "antd";
import {
  TwitterOutlined,
  WhatsAppOutlined,
  FacebookFilled,
  CopyOutlined,
} from "@ant-design/icons";
import qs from "query-string";
import CustomIcon from "components/common/CustomIcon";
import Modal from "components/common/Modal";
import getPlatformUrl from "helpers/getPlatformUrl";

import styles from "./index.module.scss";

interface Props {
  children?: React.ReactElement;
  slug: string;
  code: string;
  title: string;
  standalone?: boolean;
  isCreateSuccess?: boolean;
}

interface LinkProps {
  type: "facebook" | "whatsapp" | "twitter";
  children: React.ReactElement;
  title: string;
  link: string;
}
const Link: React.FC<LinkProps> = ({ type, title, link, children }) => {
  const t = {
    facebook: `https://www.facebook.com/sharer/sharer.php?${qs.stringify({
      display: "page",
      u: link,
      quote: title,
    })}`,
    whatsapp: `https://api.whatsapp.com/send?${qs.stringify({
      text: `${title} ${link}`,
    })}`,
    twitter: `http://twitter.com/share?${qs.stringify({
      text: `${title} ${link}`,
    })}`,
  };

  return (
    <a href={t[type]} target="_blank">
      {children}
    </a>
  );
};

const SharePopover: React.FC<Props> = ({
  children,
  slug,
  code,
  title,
  standalone = false,
  isCreateSuccess = false,
}) => {
  const [visible, setVisible] = React.useState(false);

  const link = `${getPlatformUrl()}/causes/${slug}`;

  const share = (
    <div>
      {!isCreateSuccess && (
        <Button
          size="large"
          type="text"
          icon={<CopyOutlined />}
          onClick={() => {
            navigator.clipboard.writeText(link);
            message.success(`Copied "${link}"!`, 2);
          }}
        />
      )}
      <Modal
        title="USSD Code"
        onVisible={() => setVisible(false)}
        trigger={
          <Button
            className={styles.share__ussd}
            data-is-success={isCreateSuccess}
            size="large"
            type="text"
            icon={<CustomIcon type="ussd" />}
          />
        }
      >
        <div className={styles.share__ussd__text}>
          <Typography.Title level={4}>
            Make your donation using the USSD Code
          </Typography.Title>
          <Typography.Title level={4} copyable>
            *777*77*{code}#
          </Typography.Title>
        </div>
      </Modal>
      <Link link={link} title={title} type="facebook">
        <Button
          className={styles.share__facebook}
          data-is-success={isCreateSuccess}
          size="large"
          type="text"
          icon={<FacebookFilled />}
        />
      </Link>
      <Link link={link} title={title} type="whatsapp">
        <Button
          className={styles.share__whatsapp}
          data-is-success={isCreateSuccess}
          size="large"
          type="text"
          icon={<WhatsAppOutlined />}
        />
      </Link>
      <Link link={link} title={title} type="twitter">
        <Button
          className={styles.share__twitter}
          data-is-success={isCreateSuccess}
          size="large"
          type="text"
          icon={<TwitterOutlined />}
        />
      </Link>
    </div>
  );

  return standalone ? (
    <Row
      align="middle"
      justify="center"
      gutter={isCreateSuccess ? [24, 10] : 24}
      className={styles.share}
    >
      {!isCreateSuccess && <Col>Share</Col>}
      <Col>{share}</Col>
    </Row>
  ) : (
    <Popover
      className={styles.share}
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      trigger="click"
      placement="topRight"
      content={share}
    >
      {children}
    </Popover>
  );
};

export default SharePopover;
