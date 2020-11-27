import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "redux/actions/cause/getFeed";
import { IRootState } from "redux/initialStates";

import Jumbotron from "components/home/Jumbotron";
import Video from "components/home/Video";
import Section from "components/home/Section";
import GetStarted from "components/home/GetStarted";
import LayoutWrapper from "components/LayoutWrapper";

const IndexPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getFeed()(dispatch);
  }, [dispatch]);

  const { data, fetched, error } = useSelector(
    ({ cause: { feed } }: IRootState) => feed,
  );

  const { t } = useTranslation();

  return (
    <LayoutWrapper title={t("home")} isHome>
      <GetStarted />
      <div data-content-padding data-content-section>
        <Section
          title={t("how it works")}
          icon="/images/garden.svg"
          fetched={true}
          error={null}
          data={[]}
          howItWorks
        />
      </div>
      <div data-content-padding data-content-section>
        <Section
          title={t("sponsored causes")}
          icon="/images/heart-beat.svg"
          fetched={fetched}
          error={error}
          data={data?.causes_featured}
          more={{
            title: t("discover more sponsored causes"),
            link: "/causes?feed_type=sponsored",
          }}
        />
      </div>
      <div data-content-padding data-content-section>
        <Section
          title={t("popular causes")}
          icon="/images/popularity.svg"
          fetched={fetched}
          error={error}
          data={data?.causes_popular}
          more={{
            title: t("discover more popular causes"),
            link: "/causes?feed_type=popular",
          }}
        />
      </div>
      <div data-content-padding data-content-section>
        <Section
          title={t("recent causes")}
          icon="/images/love-birds.svg"
          fetched={fetched}
          error={error}
          data={data?.causes_recents}
          more={{
            title: t("discover more recent causes"),
            link: "/causes",
          }}
        />
      </div>
      <Video />
      <Jumbotron />
    </LayoutWrapper>
  );
};

export default IndexPage;
