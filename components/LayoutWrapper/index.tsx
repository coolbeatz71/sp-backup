import { FC, useContext, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Context from "helpers/context";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Button, Result, Grid } from "antd";
import { IRootState } from "redux/initialStates";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import { useTranslation } from "react-i18next";
import getPlatformUrl from "helpers/getPlatformUrl";
import { HomeOutlined } from "@ant-design/icons";

import Banner from "./Banner";
import FooterItem from "./FooterItem";

import styles from "./index.module.scss";

import Header from "./Header";
import MobileHeader from "./MobileHeader";
import getImageUrl from "helpers/getImageUrl";
import clearCurrentUser from "redux/actions/user/clearCurrentUser";
import { HOME_PATH } from "../../helpers/paths";

const NEXT_PUBLIC_SAVE_PLUS_IMAGES_URL = getImageUrl() || "";

interface Props {
  children: any;
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

const LayoutWrapper: FC<Props> = ({
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
  const { useBreakpoint } = Grid;
  const { Footer, Content } = Layout;
  const screens = useBreakpoint();

  const { t } = useTranslation();
  const { svpProps } = useContext(Context);
  const router = useRouter();

  const [scrolled, setScrolled] = useState("");

  const user = useSelector((state: IRootState) => state.user);
  const { data: banner } = useSelector(
    ({ broadcasts: { broadcasts } }: IRootState) => broadcasts,
  );

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

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
  }, [scrollHandler]);

  useEffect(() => {
    if (user.currentUser.isLoggedin && isEmpty(user.currentUser.data)) {
      getCurrentUser(dispatch);
    }
  }, [dispatch]);

  const _url = `${getPlatformUrl()}${router.asPath}`;
  const _description = description || "More Than A Crowdfunding Platform";
  const _siteName = "Save Plus";
  const _author = "Exuus";
  const _image = image
    ? `${NEXT_PUBLIC_SAVE_PLUS_IMAGES_URL}/${image}`
    : `${getPlatformUrl()}/images/get-started.png`;
  const _title = title || "";
  const _twitterHandle = "@SavePlusHQ";

  const webkitBackdrop =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("( -webkit-backdrop-filter: saturate(180%) blur(20px) )");
  const backdrop =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("( backdrop-filter: saturate(180%) blur(20px) )");

  const clearUser = () => {
    localStorage.removeItem("save-token");
    clearCurrentUser(dispatch);
  };

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
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content={_siteName} key="og:sitename" />
        <meta property="og:title" content={_title} key="og:title" />
        <meta property="og:image" content={_image} key="og:image" />
        <meta property="og:description" content={_description} key="og:desc" />
        <meta property="og:url" content={_url} key="og:url" />
        {!isCause && <meta name="twitter:site" content={_twitterHandle} />}
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta name="twitter:title" content={_title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={_description}
          key="twitter:desc"
        />
        <meta name="twitter:image" content={_image} key="twitter:image" />
        <meta name="author" content={_author} />
        <meta name="theme-color" content="#ffffff" />
        <link
          id="favicon"
          rel="shortcut icon"
          href="icons/favicon-32x32.png"
          sizes="16x16 32x32 48x48"
          type="image/png"
        />
        <link href="/robots.txt" />
        <link rel="preconnect" href={NEXT_PUBLIC_SAVE_PLUS_IMAGES_URL} />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Banner
        className={styles.layout__banner}
        webkitBackdrop={webkitBackdrop}
        backdrop={backdrop}
      />
      {screens.lg ? (
        <Header
          scrolled={scrolled}
          isCategory={isCategory}
          user={user}
          isHome={isHome}
          isCreate={isCreate}
          svpProps={svpProps}
          baseUrl={baseUrl}
          hasBanner={typeof banner.id !== "undefined"}
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
          hasBanner={typeof banner.id !== "undefined"}
        />
      )}
      {svpProps.error || user.currentUser.error.message ? (
        <Content className={styles.layout__content} data-is-form="true">
          <Result
            status="500"
            title="Oooops!"
            subTitle={
              <>
                {t("something wet wrong")}
                <br />
                {svpProps.error || user.currentUser.error.message}
              </>
            }
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    if (user.currentUser.error.status === 401) clearUser();
                    router.push(HOME_PATH);
                  }}
                  icon={<HomeOutlined />}
                />
                <Button
                  onClick={() => {
                    if (user.currentUser.error.status === 401) clearUser();
                    router.reload();
                  }}
                >
                  RELOAD
                </Button>
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
          data-has-banner={typeof banner.id !== "undefined"}
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
