import React from "react";
import { Layout, Row, Col, Menu, Button, Result } from "antd";
import Head from "next/head";
import Context from "helpers/context";
import { useRouter } from "next/router";

import FooterItem from "./FooterItem";

import styles from "./index.module.scss";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";

import SignUp from "components/modals/SignUp";
import SignIn from "components/modals/SignIn";
import ResetPin from "components/modals/ResetPin";

const { Header, Footer, Content } = Layout;

interface Props {
  children: string | string[] | React.ReactElement | React.ReactElement[];
  isHome?: boolean;
  noFooter?: boolean;
  title?: string;
}

const LayoutWrapper: React.FC<Props> = ({
  title,
  isHome = false,
  noFooter = false,
  children,
}) => {
  const { svpProps } = React.useContext(Context);
  const router = useRouter();

  console.log(svpProps);

  const [scrolled, setScrolled] = React.useState("");

  const [signUp, setSignUp] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [resetPin, setResetPin] = React.useState(false);

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
    if (isHome) {
      window.addEventListener("scroll", scrollHandler);
    }
  }, [isHome]);

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
        <Header className={styles.layout__header} data-scroll={scrolled}>
          <Row
            justify="space-between"
            align="middle"
            className={styles.layout__header__row}
          >
            <Col>
              <img
                src="/images/logo-beta.svg"
                className={styles.layout__header__row__logo}
              />
            </Col>
            <Col>
              <Row gutter={24} align="middle">
                <Col>
                  <Menu
                    mode="horizontal"
                    className={styles.layout__header__row__menu}
                    onClick={({ key }) =>
                      router.push(`/causes?category_id=${key}`)
                    }
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
                        <Menu.Item key={category.id}>
                          {category.title}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                    <Menu.Item key="/pricing">Pricing</Menu.Item>
                  </Menu>
                </Col>
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
                <Col>
                  <SignUp
                    trigger={<Button type="primary">SIGN UP</Button>}
                    visible={signUp}
                    onVisible={() => setSignUp(true)}
                    onCancel={() => setSignUp(false)}
                    signIn={() => setSignIn(true)}
                  />
                </Col>
              </Row>
              <ResetPin
                visible={resetPin}
                onVisible={() => setResetPin(true)}
                onCancel={() => setResetPin(false)}
                signIn={() => setSignIn(true)}
              />
            </Col>
          </Row>
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
        <Content className={styles.layout__content}>{children}</Content>
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
