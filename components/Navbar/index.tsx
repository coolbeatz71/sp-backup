import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "components/Navbar/navbar.module.scss";
import Link from "next/link";
import { Menu, Dropdown, Button, Modal, Avatar, Spin } from "antd";
import { DownOutlined, MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { IRootState } from "redux/initialStates";
import { useMedia } from "react-use";
import logout from "redux/actions/Auth/logout";
import capitalize from "helpers/capitalize";
import abName from "helpers/abName";
import {
  USER_CAUSES_PATH,
  ALL_CAUSES_PATH,
  PRICING_PATH,
  POLICIES_PATH,
} from "helpers/paths";
import { getAllCategories } from "redux/actions/categories/getAll";
import { Icategories } from "interfaces/categories";
import SearchInput from "../common/SearchInput/";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ColorHash from "color-hash";
import AuthModalContainer from "components/Auth/ModalContainer";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

const color = new ColorHash();
export interface NavbarProps {
  isLight: boolean;
  page: string;
}

const Navbar: React.SFC<NavbarProps> = ({ isLight, page }) => {
  const isMobile = useMedia("(max-width: 768px)");
  const [isLightNavbar, setLightNavbar] = useState(isLight);

  const dispatch = useDispatch();
  const { push } = useRouter();

  const updateNavbarTheme = () => {
    if (!isMobile && window.scrollY > 500) setLightNavbar(true);
    else if (page === POLICIES_PATH && !isMobile && window.scrollY > 350)
      setLightNavbar(true);
    else if (page === POLICIES_PATH && isMobile && window.scrollY > 250)
      setLightNavbar(true);
    else if (isMobile && window.scrollY > 320) setLightNavbar(true);
    else setLightNavbar(isLight);
  };

  useEffect(() => {
    if (!isLight) {
      setLightNavbar(false);
      window.addEventListener("scroll", updateNavbarTheme);
    } else {
      setLightNavbar(true);
    }

    return () => {
      window.removeEventListener("scroll", updateNavbarTheme);
    };

    // tslint:disable-next-line: align
  }, [isLight]);

  useEffect(() => {
    getAllCategories()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const {
    isLoggedin,
    loading,
    data: { first_name, last_name, avatar },
  } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

  const { categories, hide: isCategoryBarHidden } = useSelector(
    ({ categories }: IRootState) => categories
  );

  const { keyword } = useSelector(({ search }: IRootState) => search);

  const toggleMenuMobile = () => setMenuMobileVisible(!menuMobileVisible);
  const { data, fetched, error } = categories;

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  const onCategoryClick = (categoryId?: number): void => {
    let url: string = "";
    if (page === USER_CAUSES_PATH) {
      url =
        categoryId && typeof categoryId === "number"
          ? `${page}?category_id=${categoryId}`
          : page;
    } else {
      url =
        categoryId && typeof categoryId === "number"
          ? `${ALL_CAUSES_PATH}?category_id=${categoryId}`
          : ALL_CAUSES_PATH;
    }

    if (menuMobileVisible) toggleMenuMobile();
    push(url);
  };

  const MenuItem = (props: any) => {
    return (
      <>
        <Menu.Item className={styles.navbar__menu__item} {...props}>
          {props.children}
        </Menu.Item>
        <Menu.Divider className={styles.navbar__menu__divider} />
      </>
    );
  };

  const causeMenu = (
    <Menu>
      {fetched &&
        !error &&
        data.data.map((category: Icategories) => (
          <MenuItem
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            children={category.title}
          />
        ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item className={styles.navbar__avatar__name}>
        <span>
          {first_name || last_name
            ? capitalize(`${first_name} ${last_name}`)
            : "..."}
        </span>
      </Menu.Item>
      <Menu.Divider className="avatar__profile__divider" />
      <Menu.Item>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item>
        <Link href="/causes/create">
          <a>New Cause</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link href={USER_CAUSES_PATH}>
          <a>My Causes</a>
        </Link>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        className="navbar__menu__logout"
        onClick={() => logout(push, dispatch)}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const navItems = () => (
    <div
      className={
        isMobile ? styles.navbar__menuMobile : styles.navbar__menuNonMobile
      }
    >
      <TransitionGroup component={null}>
        {isCategoryBarHidden &&
          (page === USER_CAUSES_PATH || page === ALL_CAUSES_PATH) && (
            <CSSTransition classNames="search" timeout={400}>
              <SearchInput defaultValue={keyword} page={page} />
            </CSSTransition>
          )}
      </TransitionGroup>
      <Dropdown
        overlayClassName="navbar__menu"
        overlay={causeMenu}
        trigger={["click"]}
      >
        <a
          className={
            isLightNavbar ? "ant-dropdown-link" : "ant-dropdown-link-dark"
          }
          onClick={handleClick}
        >
          {fetched && !error && (
            <>
              Causes <DownOutlined />
            </>
          )}
        </a>
      </Dropdown>
      <Link href={PRICING_PATH}>
        <a
          className={
            isLightNavbar ? "ant-dropdown-link" : "ant-dropdown-link-dark"
          }
          onClick={() => {
            if (menuMobileVisible) toggleMenuMobile();
          }}
        >
          Pricing
        </a>
      </Link>
      {!isLoggedin ? (
        <>
            <Button
              className={
                !isMobile && !isLightNavbar
                  ? "btn-light-outline"
                  : "btn-primary-outline"
              }
              onClick={() => {
                if (menuMobileVisible) toggleMenuMobile();
                showAuthDialog(true)(dispatch);
              }}
            >
              SIGN IN
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                if (menuMobileVisible) toggleMenuMobile();
                showAuthDialog(true, "signup")(dispatch);
              }}
            >
              SIGN UP
            </Button>
        </>
      ) : (
        <Dropdown
          overlayClassName="navbar__menu navbar__menu--last"
          overlay={userMenu}
          trigger={["click"]}
        >
          <a
            className={`${
              isLightNavbar ? "ant-dropdown-link" : "ant-dropdown-link-dark"
            } ${styles.navbar__profile}`}
            onClick={handleClick}
          >
            {loading ? (
              <Spin indicator={<LoadingOutlined spin={loading} />} />
            ) : (
              <>
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className={styles.navbar__profile__avatar}
                  />
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: color.hex(`${first_name} ${last_name}`),
                      marginRight: 5,
                    }}
                  >
                    {abName(first_name, last_name)}
                  </Avatar>
                )}
                <DownOutlined />
              </>
            )}
          </a>
        </Dropdown>
      )}
    </div>
  );

  return (
    <div className={`${isLightNavbar ? "" : "dark-navbar"} ${styles.navbar}`}>
      <Modal
        visible={menuMobileVisible}
        onCancel={toggleMenuMobile}
        style={{ top: 0, left: 0, maxWidth: "100%", margin: 0 }}
        footer={null}
      >
        {navItems()}
      </Modal>
      <Link href="/">
        {isLightNavbar ? (
          <img
            src="/logo-beta.svg"
            alt="save logo"
            className={styles.navbar__logo}
          />
        ) : (
          <img
            src="/logo-beta-white.svg"
            alt="save logo"
            className={styles.navbar__logo}
          />
        )}
      </Link>
      <MenuOutlined
        onClick={toggleMenuMobile}
        style={{ fontSize: "25px", color: isLightNavbar ? "#000" : "#fff" }}
        className="d-block d-md-none"
      />

      <nav className="menu d-md-block d-none">{navItems()}</nav>
      <AuthModalContainer />
    </div>
  );
};

export default Navbar;
