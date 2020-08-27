import React from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Result,
  Avatar,
  Typography,
} from "antd";
import Head from "next/head";
import Context from "helpers/context";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import logout from "redux/actions/Auth/logout";
import _ from "lodash";

import FooterItem from "./FooterItem";

import styles from "./index.module.scss";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";

import SignUp from "components/modals/SignUp";
import SignIn from "components/modals/SignIn";
import ResetPin from "components/modals/ResetPin";

import CategoryBar from "./CategoryBar";
import Link from "next/link";

const { Header, Footer, Content } = Layout;

interface Props {
  children:
    | string
    | string[]
    | React.ReactElement
    | React.ReactElement[]
    | null;
  isHome?: boolean;
  isCategory?: boolean;
  isCreate?: boolean;
  noFooter?: boolean;
  isForm?: boolean;
  title?: string;
  baseUrl?: string;
}

const LayoutWrapper: React.FC<Props> = ({
  baseUrl,
  title,
  isHome = false,
  isCategory = false,
  isCreate = false,
  noFooter = false,
  isForm = false,
  children,
}) => {
  const { svpProps } = React.useContext(Context);
  const router = useRouter();

  const [scrolled, setScrolled] = React.useState("");

  const [signUp, setSignUp] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [resetPin, setResetPin] = React.useState(false);

  const user = useSelector((state: IRootState) => state.user);

  const dispatch = useDispatch();

  const scrollHandler = () => {
    setScrolled(
      window.pageYOffset > 640
        ? "over"
        : window.pageYOffset > 80
        ? "scrolled"
        : "",
    );
  };

  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  }, [scrollHandler]);

  React.useEffect(() => {
    if (user.currentUser.isLoggedin && _.isEmpty(user.currentUser.data)) {
      getCurrentUser(dispatch);
    }
  }, [dispatch]);

  return (
    <Layout className={styles.layout}>
      <Head>
        {svpProps.error ? (
          <title>Error | Save Plus</title>
        ) : (
          <title>{title ? `${title} | ` : ""}Save Plus</title>
        )}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!svpProps.error && (
        <Header
          className={styles.layout__header}
          data-scroll={scrolled}
          data-is-category={isCategory}
        >
          <Row
            justify="space-between"
            align="middle"
            className={styles.layout__header__row}
          >
            <Col>
              <Link href="/">
                <a>
                  <img
                    src="/images/logo-beta.svg"
                    className={styles.layout__header__row__logo}
                  />
                </a>
              </Link>
            </Col>
            <Col>
              <Row gutter={24} align="middle">
                {user.currentUser.isLoggedin && !isCreate && (
                  <Col>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => router.push("/causes/create")}
                      data-create-button={!isHome ? "over" : scrolled}
                    >
                      Create a cause
                    </Button>
                  </Col>
                )}
                <Col>
                  <Menu
                    mode="horizontal"
                    className={styles.layout__header__row__menu}
                    onClick={({ key }) => {
                      if (key !== "sign-out") {
                        router.push(`${key}`);
                      } else {
                        logout(router.push, dispatch);
                      }
                    }}
                  >
                    {!isHome && <Menu.Item key="/">Home</Menu.Item>}
                    <Menu.SubMenu
                      title={
                        <span>
                          Causes <DownOutlined />
                        </span>
                      }
                    >
                      {svpProps.categories.map((category) => (
                        <Menu.Item key={`/causes?category_id=${category.id}`}>
                          {category.title}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                    <Menu.Item key="/pricing">Pricing</Menu.Item>
                    {user.currentUser.isLoggedin && (
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
                              size={48}
                            >
                              {`${user.currentUser.data.first_name} ${user.currentUser.data.last_name}`
                                ?.split(" ")
                                .map(
                                  (n: string) => n && n.charAt(0).toUpperCase(),
                                )}
                            </Avatar>
                            <DownOutlined />
                          </span>
                        }
                      >
                        <Menu.Item key="/profile">
                          <Typography.Text strong ellipsis>
                            {user.currentUser.data.first_name}
                            {` `}
                            {user.currentUser.data.last_name}
                          </Typography.Text>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="/profile">Profile</Menu.Item>
                        <Menu.Item key="/causes/create">New Cause</Menu.Item>
                        <Menu.Item key="/user/causes">My Causes</Menu.Item>
                        <Menu.Item key="/pin/change">Change PIN</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="sign-out" danger>
                          Sign Out
                        </Menu.Item>
                      </Menu.SubMenu>
                    )}
                  </Menu>
                </Col>
                {!user.currentUser.isLoggedin && (
                  <Col>
                    <SignIn
                      trigger={
                        <Button type="primary" ghost>
                          SIGN IN
                        </Button>
                      }
                      visible={signIn}
                      onVisible={() => setSignIn(true)}
                      onCancel={() => setSignIn(false)}
                      signUp={() => setSignUp(true)}
                      resetPin={() => setResetPin(true)}
                    />
                  </Col>
                )}
                {!user.currentUser.isLoggedin && (
                  <Col>
                    <SignUp
                      trigger={<Button type="primary">SIGN UP</Button>}
                      visible={signUp}
                      onVisible={() => setSignUp(true)}
                      onCancel={() => setSignUp(false)}
                      signIn={() => setSignIn(true)}
                    />
                  </Col>
                )}
              </Row>
              {!user.currentUser.isLoggedin && (
                <ResetPin
                  visible={resetPin}
                  onVisible={() => setResetPin(true)}
                  onCancel={() => setResetPin(false)}
                  signIn={() => setSignIn(true)}
                />
              )}
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
        </Header>
      )}
      {svpProps.error ? (
        <Content>
          <Result
            status="500"
            title="Oooops!"
            subTitle={
              <>
                Sorry, something went wrong.
                <br />
                {svpProps.error}
              </>
            }
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => router.push("/")}
                  icon={<HomeOutlined />}
                />
                <Button onClick={() => router.reload()}>RELOAD</Button>
              </>
            }
          />
        </Content>
      ) : (
        <Content
          className={styles.layout__content}
          data-is-category={isCategory}
          data-is-form={isForm}
        >
          {children}
        </Content>
      )}
      {!noFooter && (
        <Footer className={styles.layout__footer}>
          <FooterItem />
        </Footer>
      )}
    </Layout>
  );
};

export default LayoutWrapper;
