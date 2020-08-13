import React, { FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CREATE_CAUSE_PATH, PRICING_PATH } from "helpers/paths";
import { Button, Dropdown, Menu, Spin, Avatar } from "antd";
import Link from "next/link";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Icategories } from "interfaces/categories";
import { IRootState } from "redux/initialStates";
import selectCategory from "helpers/selectCategory";
import abName from "helpers/abName";
import ColorHash from "color-hash";
import MenuItem from "../MenuItem";
import styles from "./../navbar.module.scss";
import UserMenu from "../UserMenu";

const color = new ColorHash();

export interface NavbarItemsProps {
  page: string;
  isMobile: boolean;
  menuMobileVisible: boolean;
  isCreateCauseButton: boolean;
  setMenuMobileVisible: (bool: boolean) => any;
}

const NavItems: FC<NavbarItemsProps> = ({
  page,
  isMobile,
  menuMobileVisible,
  isCreateCauseButton,
  setMenuMobileVisible,
}) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const toggleMenuMobile = () => setMenuMobileVisible(!menuMobileVisible);

  const {
    isLoggedin,
    loading,
    data: { first_name, last_name, avatar },
  } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

  const { categories } = useSelector(
    ({ categories }: IRootState) => categories,
  );
  const { data, fetched, error } = categories;

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  const onCategoryClick = (categoryId?: number): void => {
    const url = selectCategory(page, categoryId);
    if (menuMobileVisible) toggleMenuMobile();
    push(url);
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

  return (
    <div
      className={
        isMobile ? styles.navbar__menuMobile : styles.navbar__menuNonMobile
      }
    >
      <TransitionGroup component={null}>
        {isLoggedin && page !== CREATE_CAUSE_PATH && isCreateCauseButton && (
          <CSSTransition classNames="create-cause-button" timeout={400}>
            <Button
              className="btn-secondary-outline"
              onClick={() => {
                if (menuMobileVisible) toggleMenuMobile();
                push(CREATE_CAUSE_PATH);
              }}
            >
              Create a cause
            </Button>
          </CSSTransition>
        )}
      </TransitionGroup>
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
      <Link href={PRICING_PATH}>
        <a
          className="ant-dropdown-link"
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
            className="btn-secondary-outline"
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
          overlay={UserMenu(first_name, last_name, dispatch, push)}
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
                  <Avatar
                    style={{
                      backgroundColor: color.hex(`${first_name} ${last_name}`),
                      marginRight: 5,
                      marginTop: -5,
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
};

export default NavItems;
