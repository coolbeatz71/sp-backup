import React from "react";
import { Layout, Button, Result, Grid } from "antd";
import Head from "next/head";
import Context from "helpers/context";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import _ from "lodash";

import { HomeOutlined } from "@ant-design/icons";

import FooterItem from "./FooterItem";

import styles from "./index.module.scss";

import Header from "./Header";
import MobileHeader from "./MobileHeader";

const { useBreakpoint } = Grid;

const { Footer, Content } = Layout;

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
  const screens = useBreakpoint();

  const [scrolled, setScrolled] = React.useState("");

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
        {svpProps.error || user.currentUser.error.message ? (
          <title>Error | Save Plus</title>
        ) : (
          <title>{title ? `${title} | ` : ""}Save Plus</title>
        )}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {screens.lg ? (
        <Header
          scrolled={scrolled}
          isCategory={isCategory}
          user={user}
          isHome={isHome}
          isCreate={isCreate}
          svpProps={svpProps}
          baseUrl={baseUrl}
        />
      ) : (
        <MobileHeader
          scrolled={scrolled}
          isCategory={isCategory}
          user={user}
          isHome={isHome}
          isCreate={isCreate}
          svpProps={svpProps}
          baseUrl={baseUrl}
        />
      )}
      {svpProps.error || user.currentUser.error.message ? (
        <Content className={styles.layout__content} data-is-form="true">
          <Result
            status="500"
            title="Oooops!"
            subTitle={
              <>
                Sorry, something went wrong.
                <br />
                {svpProps.error || user.currentUser.error.message}
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
