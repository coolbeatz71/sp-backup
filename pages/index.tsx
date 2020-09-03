import React, { useEffect } from "react";

import Jumbotron from "components/home/Jumbotron";
import Video from "components/home/Video";
import Section from "components/home/Section";
import GetStarted from "components/home/GetStarted";

import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "redux/actions/cause/getFeed";
import { IRootState } from "redux/initialStates";

import LayoutWrapper from "components/LayoutWrapper";

const IndexPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getFeed()(dispatch);
  }, [dispatch]);

  const { data, /*loading,*/ fetched, error } = useSelector(
    ({ cause: { feed } }: IRootState) => feed,
  );

  return (
    <LayoutWrapper title="Home" isHome>
      <GetStarted />
      <div data-content-padding data-content-section>
        <Section
          title="HOW IT WORKS"
          icon="/images/garden.svg"
          fetched={true}
          error={null}
          data={[]}
          howItWorks
        />
      </div>
      <div data-content-padding data-content-section>
        <Section
          title="SPONSORED CAUSES"
          icon="/images/heart-beat.svg"
          fetched={fetched}
          error={error}
          data={data?.causes_featured}
          more={{
            title: "DISCOVER MORE SPONSORED CAUSES",
            link: "/causes?feed_type=sponsored",
          }}
        />
      </div>
      <div data-content-padding data-content-section>
        <Section
          title="POPULAR CAUSES"
          icon="/images/popularity.svg"
          fetched={fetched}
          error={error}
          data={data?.causes_popular}
          more={{
            title: "DISCOVER MORE POPULAR CAUSES",
            link: "/causes?feed_type=popular",
          }}
        />
      </div>
      <div data-content-padding data-content-section>
        <Section
          title="RECENT CAUSES"
          icon="/images/love-birds.svg"
          fetched={fetched}
          error={error}
          data={data?.causes_recents}
          more={{
            title: "DISCOVER MORE RECENT CAUSES",
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
