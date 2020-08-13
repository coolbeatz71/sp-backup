import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "components/Navbar/navbar.module.scss";
import Link from "next/link";
import { Modal } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useMedia } from "react-use";
import { getAllCategories } from "redux/actions/categories/getAll";
import useNavbarScroll from "../../hooks/useNavbarScroll";
import NavItems from "./NavItems";
import AuthModalContainer from "components/Auth/ModalContainer";

export interface NavbarProps {
  isLight: boolean;
  page: string;
}

const Navbar: React.SFC<NavbarProps> = ({ isLight, page }) => {
  const dispatch = useDispatch();
  const isMobile = useMedia("(max-width: 768px)");
  const { isLightNavbar, isCreateCauseButton } = useNavbarScroll(
    isLight,
    isMobile,
    page,
  );
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const toggleMenuMobile = () => setMenuMobileVisible(!menuMobileVisible);

  useEffect(() => {
    getAllCategories()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  return (
    <div className={`${isLightNavbar ? "" : "dark-navbar"} ${styles.navbar}`}>
      <Modal
        visible={menuMobileVisible}
        onCancel={toggleMenuMobile}
        style={{ top: 0, left: 0, maxWidth: "100%", margin: 0 }}
        footer={null}
      >
        <NavItems
          page={page}
          isMobile={isMobile}
          menuMobileVisible={menuMobileVisible}
          isCreateCauseButton={isCreateCauseButton}
          setMenuMobileVisible={setMenuMobileVisible}
        />
      </Modal>
      <Link href="/">
        <img
          src="/logo-beta.svg"
          alt="save logo"
          className={styles.navbar__logo}
        />
      </Link>
      <MenuOutlined
        onClick={toggleMenuMobile}
        style={{ fontSize: "25px" }}
        className="d-block d-md-none"
      />

      <nav className="menu d-md-block d-none">
        <NavItems
          page={page}
          isMobile={isMobile}
          menuMobileVisible={menuMobileVisible}
          isCreateCauseButton={isCreateCauseButton}
          setMenuMobileVisible={setMenuMobileVisible}
        />
      </nav>
      <AuthModalContainer />
    </div>
  );
};

export default Navbar;
