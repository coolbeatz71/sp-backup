import * as React from "react";
import styles from "components/Navbar/navbar.module.scss";
import Link from "next/link";
import { Button } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

export interface NavbarProps {}


const menu = (
  <Menu>
    <Menu.Item>Medical Treatment</Menu.Item>
    <Menu.Divider />
    <Menu.Item>NGO/Charity</Menu.Item>
    <Menu.Divider />
    <SubMenu title="Social Cause">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

const Navbar: React.SFC<NavbarProps> = () => {
  return (
    <div className={styles.navbar}>
      <img src="/logo.svg" alt="save logo" />
      <nav className="menu">
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Causes <DownOutlined />
          </a>
        </Dropdown>
        <Link href="/">
          <a>Pricing</a>
        </Link>
        <Button className="btn-primary">SIGN UP</Button>
        <Button className="btn-primary-outline">SIGN IN</Button>
      </nav>
    </div>
  );
};

export default Navbar;
