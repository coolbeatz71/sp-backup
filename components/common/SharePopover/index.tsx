import { FC, ReactElement, useState } from "react";
import { Popover, Button, Row, Col, message } from "antd";
import {
  TwitterOutlined,
  WhatsAppOutlined,
  FacebookFilled,
  LinkOutlined,
} from "@ant-design/icons";
import qs from "query-string";
import getPlatformUrl from "helpers/getPlatformUrl";

import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";

interface Props {
  children?: ReactElement;
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
  children: ReactElement;
  title: string;
  link: string;
}
const Link: FC<LinkProps> = ({ type, title, link, children }) => {
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

const SharePopover: FC<Props> = ({
  children,
  slug,
  title,
  isPrivate = false,
  standalone = false,
  isCreateSuccess = false,
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

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
      {!isCreateSuccess && <Col>{t("share")}</Col>}
      <Col data-share="true">{share}</Col>
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
