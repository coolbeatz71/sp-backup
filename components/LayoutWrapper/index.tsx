import React from "react";
import { Layout, Button, Result, Grid, Typography } from "antd";
import Head from "next/head";
import Context from "helpers/context";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import _ from "lodash";
import getPlatformUrl from "helpers/getPlatformUrl";

import { HomeOutlined, CloseOutlined } from "@ant-design/icons";

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
  isError?: boolean;
  isCause?: boolean;
  isCategory?: boolean;
  isCreate?: boolean;
  noFooter?: boolean;
  isForm?: boolean;
  title?: string;
  image?: string;
  description?: string;
  baseUrl?: string;
}

const LayoutWrapper: React.FC<Props> = ({
  baseUrl,
  title,
  image,
  description,
  isHome = false,
  isError = false,
  isCause = false,
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

  const _url = `${getPlatformUrl()}${router.asPath}`;
  const _description = description || "More Than A Crowdfunding Platform";
  const _siteName = "Save Plus";
  const _author = "Exuus";
  const _image = image || `${getPlatformUrl()}/images/get-started.png`;
  const _title = title || "";
  const _twitterHandle = "@SavePlusHQ";

  const webkitBackdrop =
    CSS &&
    CSS.supports &&
    CSS.supports("( -webkit-backdrop-filter: saturate(180%) blur(20px) )");
  const backdrop =
    CSS &&
    CSS.supports &&
    CSS.supports("( backdrop-filter: saturate(180%) blur(20px) )");

  const hasBanner = true;

  return (
    <Layout className={styles.layout}>
      <Head>
        {svpProps.error || user.currentUser.error.message ? (
          <title>Error | {_siteName}</title>
        ) : (
          <title>
            {title ? `${_title} | ` : ""}
            {_siteName}
          </title>
        )}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={_url} />
        <meta name="description" content={_description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={_siteName} />
        <meta property="og:title" content={_title} />
        <meta property="og:image" content={_image} />
        <meta property="og:description" content={_description} />
        <meta property="og:url" content={_url} />
        {!isCause && <meta name="twitter:site" content={_twitterHandle} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_description} />
        <meta name="twitter:image" content={_image} />
        <meta name="author" content={_author} />
        <link
          id="favicon"
          rel="shortcut icon"
          href="/icons/favicon-32x32.png"
          sizes="16x16 32x32 48x48"
          type="image/png"
        />
      </Head>
      {hasBanner && (
        <div
          className={styles.layout__banner}
          data-backdrop-not-supported={!webkitBackdrop && !backdrop}
        >
          <Typography.Paragraph ellipsis={{ rows: 1 }}>
            A relevant icon will make information clearer and more friendly. A
            relevant icon will make information clearer and more friendly.
          </Typography.Paragraph>
          <Button type="text" icon={<CloseOutlined />} />
        </div>
      )}
      {screens.lg ? (
        <Header
          scrolled={scrolled}
          isCategory={isCategory}
          user={user}
          isHome={isHome}
          isCreate={isCreate}
          svpProps={svpProps}
          baseUrl={baseUrl}
          hasBanner={hasBanner}
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
          hasBanner={hasBanner}
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
          data-is-error={isError}
          data-has-banner={hasBanner}
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
