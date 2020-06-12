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
import randmonColor from "randomcolor";
import abName from "helpers/abName";
import { USER_CAUSES_PATH, ALL_CAUSES_PATH } from "helpers/paths";
import { getAllCategories } from "redux/actions/categories/getAll";
import { Icategories } from "interfaces/categories";

const Navbar: React.SFC<{}> = () => {
  const isMobile = useMedia("(max-width: 768px)");
  const dispatch = useDispatch();
  const { push } = useRouter();
  const color = randmonColor();

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

  const { categories } = useSelector(
    ({ categories }: IRootState) => categories,
  );

  const toggleMenuMobile = () => setMenuMobileVisible(!menuMobileVisible);
  const { data, fetched, error } = categories;

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  const onCategoryClick = (categoryId?: number): void => {
    const url =
      categoryId && typeof categoryId === "number"
        ? `${ALL_CAUSES_PATH}?category_id=${categoryId}`
        : ALL_CAUSES_PATH;
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
          <a>My Cause</a>
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
      <Dropdown
        overlayClassName="navbar__menu"
        overlay={causeMenu}
        trigger={["click"]}
      >
        <a className="ant-dropdown-link" onClick={handleClick}>
          {fetched && !error && (
            <>
              Causes <DownOutlined />
            </>
          )}
        </a>
      </Dropdown>
      <Link href="/pricing">
        <a>Pricing</a>
      </Link>
      {!isLoggedin ? (
        <>
          <Link href="/signup">
            <Button className="btn-primary">SIGN UP</Button>
          </Link>
          <Link href="/login">
            <Button className="btn-primary-outline">SIGN IN</Button>
          </Link>
        </>
      ) : (
        <Dropdown
          overlayClassName="navbar__menu navbar__menu--last"
          overlay={userMenu}
          trigger={["click"]}
        >
          <a
            className={`ant-dropdown-link ${styles.navbar__profile}`}
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
                  <Avatar style={{ backgroundColor: color, marginRight: 5 }}>
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
    <div className={styles.navbar}>
      <Modal
        visible={menuMobileVisible}
        onCancel={toggleMenuMobile}
        style={{ top: 0, left: 0, maxWidth: "100%", margin: 0 }}
        footer={null}
      >
        {navItems()}
      </Modal>
      <Link href="/">
        <img src="/logo.svg" alt="save logo" className={styles.navbar__logo} />
      </Link>
      <MenuOutlined
        onClick={toggleMenuMobile}
        style={{ fontSize: "25px", color: "#000" }}
        className="d-block d-md-none"
      />
      <nav className="menu d-md-block d-none">{navItems()}</nav>
    </div>
  );
};

export default Navbar;
