import React from "react";
import { Popover, Button, Typography, Row, Col, message } from "antd";
import {
  TwitterOutlined,
  WhatsAppOutlined,
  FacebookFilled,
  LinkOutlined,
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
  isPrivate: boolean;
  standalone?: boolean;
  isCreateSuccess?: boolean;
  disabled?: boolean;
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
    <a href={t[type]} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
};

const SharePopover: React.FC<Props> = ({
  children,
  slug,
  code,
  title,
  isPrivate = false,
  standalone = false,
  isCreateSuccess = false,
  disabled = false,
}) => {
  const [visible, setVisible] = React.useState(false);

  const link = `${getPlatformUrl()}/causes/${slug}`;

  const share = (
    <div>
      {!isCreateSuccess && (
        <Button
          className={styles.share__link}
          size="large"
          type="text"
          icon={<LinkOutlined />}
          onClick={() => {
            navigator.clipboard.writeText(link);
            message.success(`Copied "${link}"!`, 2);
          }}
        />
      )}
      <Modal
        noTitle
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
          <Typography>This Cause Till Number is</Typography>
          <Typography>{code}</Typography>
          <br />
          <Typography>Make your donation using the USSD Code</Typography>
          <Typography>*777*77*{code}*Amount#</Typography>
        </div>
      </Modal>
      {!isPrivate && (
        <>
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
        </>
      )}
    </div>
  );

  return standalone ? (
    <Row
      align="middle"
      justify={isCreateSuccess ? "center" : "start"}
      gutter={isCreateSuccess ? [24, 10] : 24}
      className={styles.share}
    >
      {!isCreateSuccess && <Col>Share</Col>}
      <Col>{share}</Col>
    </Row>
  ) : !disabled ? (
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
  ) : (
    <>{children}</>
  );
};

export default SharePopover;
