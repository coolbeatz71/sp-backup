import React, { useEffect } from "react";

import { Row, Col } from "antd";

import Jumbotron from "components/home/Jumbotron";
import Video from "components/home/Video";
import Cause from "components/cards/Cause";

/**
 * Old
 */
import { Button } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swipeable from "react-swipeable-views";
import CauseCard from "components/common/CauseCard";
import SectionTitle from "components/common/SectionTitle";
import HowItWorks from "components/HowItWorks";
import { getFeed } from "redux/actions/cause/getFeed";
import { IRootState } from "redux/initialStates";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import { getOwnerInfo } from "helpers/getOwnerInfo";
import Mission from "components/common/Mission";
import { useMedia } from "react-use";
import { ALL_CAUSES_PATH } from "helpers/paths";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import CauseCardSkeleton from "components/common/Skeleton/CauseCard";

import LayoutWrapper from "components/LayoutWrapper";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { push, pathname } = useRouter();
  const isMobile = useMedia("(max-width: 768px)");

  const goToRegister = () => {
    showAuthDialog(true, "signup")(dispatch);
  };

  const goToAllCauses = () => {
    push(ALL_CAUSES_PATH);
  };

  useEffect(() => {
    getFeed()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  const { data, loading, fetched, error } = useSelector(
    ({ cause: { feed } }: IRootState) => feed,
  );

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const getStarted = () => {
    isLoggedin ? push("/causes/create") : goToRegister();
  };

  return (
    <LayoutWrapper title="Home" isHome>
      <div className="index-page">
        <div className="index-container">
          <div className="index__intro">
            <div className="index__intro--info">
              <h1>Put a Smile on {!isMobile && <br />} Someone's Face</h1>
              <Button
                size="large"
                className="btn-primary index__intro--button"
                onClick={() => getStarted()}
              >
                {isLoggedin ? "CREATE A CAUSE" : "GET STARTED"}
              </Button>
            </div>
          </div>
          <div className="index__landing__picture">
            <img src="icons/landing-image.png" alt="" />
          </div>
        </div>

        <div className="how-it-works">
          <SectionTitle
            title="How It Works"
            className="gardening"
            icon="icons/gardening.svg"
          />
          <HowItWorks />
        </div>

        <div className="causes">
          <SectionTitle
            title="Sponsored Causes"
            className="romantic"
            icon="icons/heart-beat.svg"
          />
          {loading ? (
            <div className="causes__grid causes__grid--lg">
              {[...Array(3)].map((_values, index) => (
                <div className="causes__grid--item" key={index}>
                  <CauseCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="causes__grid--mobile">
                <Swipeable>
                  {fetched &&
                    !error &&
                    data.causes_featured.map((cause: any, index: number) => (
                      <CauseCard
                        pathName={pathname}
                        slug={cause.slug}
                        title={cause.name}
                        tillNumber={cause.till_number}
                        description={cause.summary}
                        cover={cause.image}
                        owner={getOwnerInfo(
                          cause.user_names,
                          cause.verified,
                          cause.user_avatar,
                        )}
                        amountRaised={cause.raised_amount}
                        amountToReach={cause.target_amount}
                        currency={cause.currency}
                        status={cause.status}
                        category={cause.category.title}
                        rating={cause.ratings}
                        ratersCount={cause.raters_count}
                        daysToGo={getCauseRemainingDays(cause.end_date)}
                        key={index}
                        data={cause}
                      />
                    ))}
                </Swipeable>
              </div>
              <div className="causes__grid causes__grid--lg">
                {fetched &&
                  !error &&
                  data.causes_featured.map((cause: any, index: number) => (
                    <div className="causes__grid--item" key={index}>
                      <CauseCard
                        pathName={pathname}
                        slug={cause.slug}
                        title={cause.name}
                        description={cause.summary}
                        tillNumber={cause.till_number}
                        cover={cause.image}
                        owner={getOwnerInfo(
                          cause.user_names,
                          cause.verified,
                          cause.user_avatar,
                        )}
                        amountRaised={cause.raised_amount}
                        amountToReach={cause.target_amount}
                        currency={cause.currency}
                        status={cause.status}
                        category={cause.category.title}
                        rating={cause.ratings}
                        ratersCount={cause.raters_count}
                        daysToGo={getCauseRemainingDays(cause.end_date)}
                        data={cause}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}

          <div className="more__causes">
            {fetched && (
              <Button className="btn-secondary" onClick={goToAllCauses}>
                DISCOVER MORE CAUSES
              </Button>
            )}
          </div>
        </div>

        <div className="causes">
          <SectionTitle
            title="Popular Causes"
            className="popularity"
            icon="icons/popularity.svg"
          />
          {loading ? (
            <div className="causes__grid causes__grid--lg">
              {[...Array(3)].map((_values, index) => (
                <div className="causes__grid--item" key={index}>
                  <CauseCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="causes__grid--mobile">
                <Swipeable>
                  {fetched &&
                    !error &&
                    data.causes_popular.map((cause: any, index: number) => (
                      <CauseCard
                        pathName={pathname}
                        slug={cause.slug}
                        title={cause.name}
                        description={cause.summary}
                        tillNumber={cause.till_number}
                        cover={cause.image}
                        owner={getOwnerInfo(
                          cause.user_names,
                          cause.verified,
                          cause.user_avatar,
                        )}
                        amountRaised={cause.raised_amount}
                        amountToReach={cause.target_amount}
                        currency={cause.currency}
                        status={cause.status}
                        category={cause.category.title}
                        rating={cause.ratings}
                        ratersCount={cause.raters_count}
                        daysToGo={getCauseRemainingDays(cause.end_date)}
                        key={index}
                        data={cause}
                      />
                    ))}
                </Swipeable>
              </div>
              <div className="causes__grid causes__grid--lg">
                {fetched &&
                  !error &&
                  data.causes_popular.map((cause: any, index: number) => (
                    <div className="causes__grid--item" key={index}>
                      <CauseCard
                        pathName={pathname}
                        slug={cause.slug}
                        title={cause.name}
                        description={cause.summary}
                        tillNumber={cause.till_number}
                        cover={cause.image}
                        owner={getOwnerInfo(
                          cause.user_names,
                          cause.verified,
                          cause.user_avatar,
                        )}
                        amountRaised={cause.raised_amount}
                        amountToReach={cause.target_amount}
                        currency={cause.currency}
                        status={cause.status}
                        category={cause.category.title}
                        rating={cause.ratings}
                        ratersCount={cause.raters_count}
                        daysToGo={getCauseRemainingDays(cause.end_date)}
                        data={cause}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}

          <div className="more__causes">
            {fetched && (
              <Button className="btn-secondary" onClick={goToAllCauses}>
                DISCOVER MORE CAUSES
              </Button>
            )}
          </div>
        </div>

        <div className="causes">
          <SectionTitle
            title="Recent Causes"
            className="birds"
            icon="icons/love-birds.svg"
          />

          {loading ? (
            <div className="causes__grid causes__grid--lg">
              {[...Array(3)].map((_values, index) => (
                <div className="causes__grid--item" key={index}>
                  <CauseCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="causes__grid--mobile">
                <Swipeable>
                  {fetched &&
                    !error &&
                    data.causes_recents.map((cause: any, index: number) => (
                      <CauseCard
                        pathName={pathname}
                        slug={cause.slug}
                        title={cause.name}
                        description={cause.summary}
                        tillNumber={cause.till_number}
                        cover={cause.image}
                        owner={getOwnerInfo(
                          cause.user_names,
                          cause.verified,
                          cause.user_avatar,
                        )}
                        amountRaised={cause.raised_amount}
                        amountToReach={cause.target_amount}
                        currency={cause.currency}
                        status={cause.status}
                        category={cause.category.title}
                        rating={cause.ratings}
                        ratersCount={cause.raters_count}
                        daysToGo={getCauseRemainingDays(cause.end_date)}
                        key={index}
                        data={cause}
                      />
                    ))}
                </Swipeable>
              </div>
              <div className="causes__grid causes__grid--lg">
                {fetched &&
                  !error &&
                  data.causes_recents.map((cause: any, index: number) => (
                    <div className="causes__grid--item" key={index}>
                      <CauseCard
                        pathName={pathname}
                        slug={cause.slug}
                        title={cause.name}
                        description={cause.summary}
                        tillNumber={cause.till_number}
                        cover={cause.image}
                        owner={getOwnerInfo(
                          cause.user_names,
                          cause.verified,
                          cause.user_avatar,
                        )}
                        amountRaised={cause.raised_amount}
                        amountToReach={cause.target_amount}
                        currency={cause.currency}
                        status={cause.status}
                        category={cause.category.title}
                        rating={cause.ratings}
                        ratersCount={cause.raters_count}
                        daysToGo={getCauseRemainingDays(cause.end_date)}
                        data={cause}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
          <div className="more__causes">
            {fetched && (
              <Button className="btn-secondary" onClick={goToAllCauses}>
                DISCOVER MORE CAUSES
              </Button>
            )}
          </div>
        </div>
      </div>
      <div data-content-padding>
        <Row gutter={[24, 24]}>
          {fetched &&
            !error &&
            data.causes_recents.map((cause: any, index: number) => (
              <Col span={8} key={index}>
                <Cause cause={cause} />
              </Col>
            ))}
        </Row>
      </div>
      <Video />
      <Jumbotron />
    </LayoutWrapper>
  );
};

export default IndexPage;
