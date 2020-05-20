import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "components/Navbar/navbar.module.scss";
import Link from "next/link";
import { Menu, Dropdown, Button, Modal } from "antd";
import { DownOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import { IRootState } from "redux/initialStates";

const { SubMenu } = Menu;

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

const Navbar: React.SFC<{}> = () => {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser
  );

  const toggleMenuMobile = () => setMenuMobileVisible(!menuMobileVisible);

  const handleClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className={styles.navbar}>
      <Modal
        visible={menuMobileVisible}
        onCancel={toggleMenuMobile}
        style={{ top: 0, left: 0, maxWidth: "100%", margin: 0 }}
        footer={null}
      >
        <div className={styles.navbar__menuMobile}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" onClick={handleClick}>
              Causes <RightOutlined />
            </a>
          </Dropdown>
          <Link href="/">
            <a>Pricing</a>
          </Link>
          {!isLoggedin && (
            <>
              <Link href="/signup">
                <Button className="btn-primary">SIGN UP</Button>
              </Link>
              <Link href="/login">
                <Button className="btn-primary-outline">SIGN IN</Button>
              </Link>
            </>
          )}
        </div>
      </Modal>
      <Link href="/">
        <img src="/logo.svg" alt="save logo" />
      </Link>
      <MenuOutlined
        onClick={toggleMenuMobile}
        style={{ fontSize: "25px", color: "#000" }}
        className="d-block d-md-none"
      />
      <nav className="menu d-md-block d-none">
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={handleClick}>
            Causes <DownOutlined />
          </a>
        </Dropdown>
        <Link href="/">
          <a>Pricing</a>
        </Link>
        {!isLoggedin && (
          <>
            <Link href="/signup">
              <Button className="btn-primary">SIGN UP</Button>
            </Link>
            <Link href="/login">
              <Button className="btn-primary-outline">SIGN IN</Button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
