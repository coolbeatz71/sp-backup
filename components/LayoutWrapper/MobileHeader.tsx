import React from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Avatar,
  Typography,
  Skeleton,
  Dropdown,
} from "antd";
import logout from "redux/actions/Auth/logout";
import _ from "lodash";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

import styles from "./index.module.scss";
import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { Iuser } from "redux/initialStates/user";

import SignUp from "components/modals/SignUp";
import SignIn from "components/modals/SignIn";
import ResetPin from "components/modals/ResetPin";
import ChangePin from "components/modals/ChangePin";

import CategoryBar from "./CategoryBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { SvpType } from "helpers/context";

const { Header: GenericHeader } = Layout;

interface Props {
  scrolled: string;
  isCategory: boolean;
  user: Iuser;
  isHome: boolean;
  isCreate: boolean;
  svpProps: SvpType;
  baseUrl?: string;
  hasBanner: boolean;
}

const Header: React.FC<Props> = ({
  scrolled,
  isCategory,
  user,
  isHome,
  isCreate,
  svpProps,
  baseUrl,
  hasBanner,
}) => {
  const router = useRouter();
  const [changePin, setChangePin] = React.useState(false);
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  const webkitBackdrop =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("( -webkit-backdrop-filter: saturate(180%) blur(20px) )");
  const backdrop =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("( backdrop-filter: saturate(180%) blur(20px) )");

  return (
    <GenericHeader
      className={styles.layout__header}
      data-scroll={scrolled}
      data-is-category={isCategory}
      data-is-mobile="true"
      data-backdrop-not-supported={!webkitBackdrop && !backdrop}
      data-has-banner={hasBanner}
    >
      <Row
        justify="space-between"
        align="middle"
        className={styles.layout__header__row}
      >
        <Col>
          <Link href="/">
            <a rel="noreferrer noopener">
              <img
                src="/images/logo-beta.svg"
                className={styles.layout__header__row__logo}
                alt="beta logo"
              />
            </a>
          </Link>
        </Col>
        <Col>
          <Row gutter={24} align="middle">
            {user.currentUser.isLoggedin &&
              !isCreate &&
              user.currentUser.data.id &&
              router.asPath !== "/causes/create" && (
                <Col>
                  <Button
                    type="primary"
                    size="small"
                    ghost
                    onClick={() => router.push("/causes/create")}
                    data-create-button={!isHome ? "over" : scrolled}
                    icon={<PlusOutlined />}
                  />
                </Col>
              )}

            <Col>
              {user.currentUser.isLoggedin && user.currentUser.data.id && (
                <ChangePin
                  visible={changePin}
                  onVisible={() => setChangePin(true)}
                  onCancel={() => setChangePin(false)}
                />
              )}
              {!user.currentUser.isLoggedin && (
                <>
                  <SignIn />
                  <SignUp />
                  <ResetPin />
                </>
              )}
              <Dropdown
                placement="bottomRight"
                visible={visible}
                onVisibleChange={(v) => setVisible(v)}
                overlay={
                  <Menu
                    className={styles.layout__header__row__menu}
                    onClick={({ key }) => {
                      setVisible(false);
                      if (key === "sign-out") {
                        return logout(router.push, dispatch);
                      }

                      if (key === "change-pin") {
                        return setChangePin(true);
                      }

                      if (key) router.push(`${key}`);
                    }}
                  >
                    {!isHome && <Menu.Item key="/">Home</Menu.Item>}
                    {svpProps.categories && svpProps.categories.length > 0 && (
                      <Menu.SubMenu title={<span>Causes</span>}>
                        {svpProps.categories.map((category) => (
                          <Menu.Item key={`/causes?category_id=${category.id}`}>
                            {category.title}
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    )}
                    <Menu.Item key="/pricing">Pricing</Menu.Item>
                    {user.currentUser.isLoggedin && !user.currentUser.data.id && (
                      <Menu.SubMenu
                        className={styles.layout__header__row__user}
                        popupClassName="header-row-user"
                        title={
                          <span>
                            <Skeleton.Avatar
                              className={
                                styles.layout__header__row__user__avatar
                              }
                              active
                              size={48}
                            />
                          </span>
                        }
                      >
                        <div />
                      </Menu.SubMenu>
                    )}
                    {user.currentUser.isLoggedin &&
                      user.currentUser.data.id && <Menu.Divider />}
                    {user.currentUser.isLoggedin && user.currentUser.data.id && (
                      <Menu.SubMenu
                        className={styles.layout__header__row__user}
                        popupClassName="header-row-user"
                        title={
                          <span>
                            <Avatar
                              className={
                                styles.layout__header__row__user__avatar
                              }
                              src={user.currentUser.data.avatar}
                              size={32}
                              alt={`${user.currentUser.data.first_name} ${user.currentUser.data.last_name}`}
                            >
                              {`${user.currentUser.data.first_name} ${user.currentUser.data.last_name}`
                                ?.split(" ")
                                .map(
                                  (n: string) => n && n.charAt(0).toUpperCase(),
                                )}
                            </Avatar>
                            <Typography.Text
                              strong
                              ellipsis
                              className={styles.layout__header__row__user__name}
                            >
                              {user.currentUser.data.first_name}
                              {` `}
                              {user.currentUser.data.last_name}
                            </Typography.Text>
                          </span>
                        }
                      >
                        <Menu.Item key="/profile">Profile</Menu.Item>
                        <Menu.Item key="/causes/create">New Cause</Menu.Item>
                        <Menu.Item key="/user/causes">My Causes</Menu.Item>
                        <Menu.Item key="change-pin">Change PIN</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="sign-out" danger>
                          Sign Out
                        </Menu.Item>
                      </Menu.SubMenu>
                    )}
                    {!user.currentUser.isLoggedin && (
                      <>
                        <div
                          className={styles.layout__header__row__menu__sign_in}
                        >
                          <Button
                            type="primary"
                            ghost
                            block
                            onClick={() => {
                              setVisible(false);
                              showAuthDialog(true, "login")(dispatch);
                            }}
                          >
                            SIGN IN
                          </Button>
                        </div>
                        <div
                          className={styles.layout__header__row__menu__sign_up}
                        >
                          <Button
                            type="primary"
                            block
                            onClick={() => {
                              setVisible(false);
                              showAuthDialog(true, "signup")(dispatch);
                            }}
                          >
                            SIGN UP
                          </Button>
                        </div>
                      </>
                    )}
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button
                  type="text"
                  size="large"
                  icon={<MenuOutlined />}
                  data-main-menu-trigger=""
                />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
      {isCategory && (
        <Row
          className={styles.layout__header__row__category}
          align="middle"
          data-row-category
        >
          <Col span={24}>
            <CategoryBar
              categories={svpProps.categories}
              baseUrl={baseUrl}
              scrolled={scrolled}
            />
          </Col>
        </Row>
      )}
    </GenericHeader>
  );
};

export default Header;
