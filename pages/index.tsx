import React, { useEffect } from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swipeable from "react-swipeable-views";
import CauseCard from "components/common/CauseCard";
import SectionTitle from "components/common/SectionTitle";
import HowItWorks from "components/HowItWorks";
import Spinner from "components/Spinner";
import { getFeed } from "redux/actions/cause/getFeed";
import { IRootState } from "redux/initialStates";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import { getOwnerInfo } from "helpers/getOwnerInfo";
import Mission from "components/common/Mission";
import { useMedia } from "react-use";
import { ALL_CAUSES_PATH } from "helpers/paths";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

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
          title="Featured Causes"
          className="romantic"
          icon="icons/heart-beat.svg"
        />
        {loading ? (
          <Spinner />
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
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
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
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
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
          <Button className="btn-secondary" onClick={goToAllCauses}>
            DISCOVER MORE CAUSES
          </Button>
        </div>
      </div>

      <div className="causes">
        <SectionTitle
          title="Popular Causes"
          className="popularity"
          icon="icons/popularity.svg"
        />
        {loading ? (
          <Spinner />
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
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
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
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
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
          <Button className="btn-secondary" onClick={goToAllCauses}>
            DISCOVER MORE CAUSES
          </Button>
        </div>
      </div>

      <div className="causes">
        <SectionTitle
          title="Recent Causes"
          className="birds"
          icon="icons/love-birds.svg"
        />

        {loading ? (
          <Spinner />
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
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
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
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
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
          <Button className="btn-secondary" onClick={goToAllCauses}>
            DISCOVER MORE CAUSES
          </Button>
        </div>
      </div>
      <div className="short__intro">
        <div className="short__intro--container">
          <h1 className="short__intro--title">Short video on Save Plus</h1>
          <div className="short__intro--video">
            <iframe
              src="https://www.youtube.com/embed/3_SusAjQjnw"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <div className="short__intro--soon">
            Android & iOS App coming soon
          </div>
        </div>
      </div>
      <Mission isLoggedin={isLoggedin} goToRegister={goToRegister} />
    </div>
  );
};

export default IndexPage;
