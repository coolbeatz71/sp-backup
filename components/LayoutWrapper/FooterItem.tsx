import { Menu, Typography, Button } from "antd";
import Img from "react-optimized-image";
import moment from "moment";
import {
  TwitterOutlined,
  InstagramFilled,
  FacebookFilled,
  YoutubeFilled,
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import spLogo from "public/logo-beta.svg";

const social = [
  {
    name: "twitter",
    icon: <TwitterOutlined className="twitter" />,
    url: "https://twitter.com/SavePlusHQ",
  },
  {
    name: "instagram",
    icon: <InstagramFilled className="instagram" />,
    url: "https://www.instagram.com/saveplus.hq/",
  },
  {
    name: "facebook",
    icon: <FacebookFilled className="facebook" />,
    url: "https://www.facebook.com/SavePlus.HQ/?_rdc=1&_rdr",
  },
  {
    name: "youtube",
    icon: <YoutubeFilled className="youtube" />,
    url:
      "https://www.youtube.com/channel/UCvkbUBLHH69822CjWWM8D8A/?guided_help_flow=5",
  },
];

const FooterItem = () => {
  const { t } = useTranslation();
  const menus = [
    { key: "https://getsave.io/", text: "Save" },
    { key: "blog", text: t("blog") },
    { key: "user-agreement", text: t("user agreement") },
    { key: "privacy-policy", text: t("privacy policy") },
  ];
  return (
    <div className="footer-item">
      <Img
        src={spLogo}
        className="logo"
        alt="Save Plus Logo"
        width="150"
        height="50"
      />

      <div className="copy">
        <Typography.Text type="secondary">
          {t("copyright")} &copy;{moment().format("YYYY")}{" "}
          <a
            href="https://exuus.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Typography.Text type="secondary">exuus</Typography.Text>
          </a>
        </Typography.Text>
      </div>
      <Menu
        selectedKeys={[]}
        mode="horizontal"
        selectable={false}
        onClick={({ key }) => {
          if (`${key}`.startsWith("http")) {
            return window.open(`${key}`, "_ blank");
          }
        }}
      >
        {menus.map((item) => (
          <Menu.Item key={item.key}>{item.text}</Menu.Item>
        ))}
      </Menu>
      <Typography.Paragraph>
        {social.map((item) => (
          <Button
            key={item.name}
            type="text"
            size="large"
            icon={item.icon}
            onClick={() => window.open(item.url, "_blank")}
          />
        ))}
      </Typography.Paragraph>
      <div>
        <Typography.Text type="secondary">
          {t("contact us at")}{" "}
          <Typography.Link href="mailto:support@saveplus.io" target="_blank">
            support@saveplus.io
          </Typography.Link>
        </Typography.Text>
      </div>
    </div>
  );
};

export default FooterItem;
