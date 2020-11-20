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
import { useTranslation } from "react-i18next";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

import styles from "./index.module.scss";
import { LoadingOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { Iuser } from "redux/initialStates/user";

import SignUp from "components/modals/SignUp";
import SignIn from "components/modals/SignIn";
import ResetPin from "components/modals/ResetPin";
import ChangePin from "components/modals/ChangePin";

import CategoryBar from "./CategoryBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SvpType } from "helpers/context";
import { ALL_CAUSES_PATH } from "helpers/paths";
import { IRootState } from "redux/initialStates";
import updateProfile from "redux/actions/user/updateProfile";
import { getLanguage } from "helpers/getLanguage";
import i18n from "constants/locales";

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

  const [noBackdrop, setNoBackdrop] = React.useState(false);
  const { loading } = useSelector(
    (state: IRootState) => state.user.updateProfile
  );

  React.useEffect(() => {
    const webkitBackdrop =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("( -webkit-backdrop-filter: saturate(180%) blur(20px) )");
    const backdrop =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("( backdrop-filter: saturate(180%) blur(20px) )");
    setNoBackdrop(!webkitBackdrop && !backdrop);
  }, []);

  const { t } = useTranslation();

  const userLang: "en" | "rw" = user?.currentUser?.data?.language || getLanguage();

  const languages = {
    en: "English",
    rw: "Kinyarwanda",
  };

  return (
    <GenericHeader
      className={styles.layout__header}
      data-scroll={scrolled}
      data-is-category={isCategory}
      data-is-mobile="true"
      data-backdrop-not-supported={noBackdrop}
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

                      if (key === "en" || key === "rw") {
                        if(user.currentUser.isLoggedin && user.currentUser.data.id){
                          return dispatch(
                            updateProfile({
                              language: `${key}`,
                            })
                          );
                        }

                        localStorage.setItem("USER_LANG", `${key}`);
                        i18n.changeLanguage(`${key}`);
                        return;
                        
                      }

                      if (key) router.push(`${key}`);
                    }}
                  >
                    {!isHome && <Menu.Item key="/">{t("home")}</Menu.Item>}
                    <Menu.SubMenu
                        disabled={loading}
                        title={
                          <span>
                            {languages[userLang]}
                            {loading ? (
                              <LoadingOutlined style={{ marginLeft: 20 }} />
                            ) : null}
                          </span>
                        }
                      >
                        <Menu.Item key="en">English</Menu.Item>
                        <Menu.Item key="rw">Kinyarwanda</Menu.Item>
                      </Menu.SubMenu>

                    {svpProps.categories && svpProps.categories.length > 0 && (
                      <Menu.SubMenu title={<span>{t("causes")}</span>}>
                        <Menu.Item key={ALL_CAUSES_PATH}>{t("all")}</Menu.Item>
                        {svpProps.categories.map((category) => (
                          <Menu.Item key={`/causes?category_id=${category.id}`}>
                            {t(category.title)}
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    )}
                    <Menu.Item key="/pricing">{t("pricing")}</Menu.Item>
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
                                  (n: string) => n && n.charAt(0).toUpperCase()
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
                        <Menu.Item key="/profile">{t("profile")}</Menu.Item>
                        <Menu.Item key="/causes/create">
                          {t("new cause")}
                        </Menu.Item>
                        <Menu.Item key="/user/causes">
                          {t("my causes")}
                        </Menu.Item>
                        <Menu.Item key="change-pin">
                          {t("change pin")}
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="sign-out" danger>
                          {t("sign out")}
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
                            {t("sign_in_button")}
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
                            {t("sign_up_button")}
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
