import React from "react";
import { Menu, Typography, Button } from "antd";
import moment from "moment";
import {
  TwitterOutlined,
  InstagramFilled,
  FacebookFilled,
  YoutubeFilled,
} from "@ant-design/icons";

const menus = [
  { key: "https://getsave.io/", text: "Save" },
  { key: "blog", text: "Blog" },
  { key: "user-agreement", text: "User Agreement" },
  { key: "privacy-policy", text: "Privacy Policy" },
];

const social = [
  {
    name: "twitter",
    icon: <TwitterOutlined className="twitter" />,
  },
  {
    name: "instagram",
    icon: <InstagramFilled className="instagram" />,
  },
  {
    name: "facebook",
    icon: <FacebookFilled className="facebook" />,
  },
  {
    name: "youtube",
    icon: <YoutubeFilled className="youtube" />,
  },
];

const FooterItem = () => {
  return (
    <div className="footer-item">
      <img src="/logo-beta.svg" className="logo" />
      <div className="copy">
        <Typography.Text type="secondary">
          Copyright &copy;{moment().format("YYYY")}{" "}
          <a href="https://exuus.com/" target="_blank">
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
          <Button key={item.name} type="text" size="large" icon={item.icon} />
        ))}
      </Typography.Paragraph>
      <div>
        <Typography.Text type="secondary">
          Contact us at{" "}
          <Typography.Link href="mailto:support@saveplus.io" target="_blank">
            support@saveplus.io
          </Typography.Link>
        </Typography.Text>
      </div>
    </div>
  );
};

export default FooterItem;
