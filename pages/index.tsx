import React, { useEffect } from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swipeable from "react-swipeable-views";
import CauseCard from "components/common/CauseCard";
import SectionTitle from "components/common/SectionTitle";
import HowItWorks from "components/HowItWorks";
import Spinner from "components/Spinner";

import { getFeed } from "redux/actions/causes/getFeed";
import { IRootState } from "redux/initialStates";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const goToRegister = () => {
    push("/signup");
  };

  useEffect(() => {
    getFeed()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  const { data, loading, fetched, error } = useSelector(
    ({ causes: { feed } }: IRootState) => feed,
  );
  return (
    <div title="Save Plus">
      <div className="index-container">
        <div className="index__intro">
          <div className="index__intro--info">
            <h1>Put a Smile on Someone's Face</h1>
            <Button className="btn-primary index__intro--button">
              GET STARTED
            </Button>
          </div>
        </div>
        <div className="index__landing__picture">
          <img src="icons/landing-image.png" alt="" />
        </div>
      </div>

      <div className="howitworks__section">
        <SectionTitle title="How It Works" icon="icons/gardening.png" />
        <HowItWorks />
      </div>

      <div className="causes">
        <SectionTitle title="Featured Causes" icon="icons/heart-beat.png" />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="causes__grid--mobile">
              <Swipeable>
                {fetched && !error &&
                  data.causes_featured.map((cause: any, index: number) => (
                    <CauseCard
                      title={cause.name}
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud"
                      cover={cause.image}
                      owner={{
                        avatar:
                          "https://res.cloudinary.com/dutstern8/image/upload/v1583071786/yAJ2TZk4XFsNkKanjppChiWW.png",
                        name: "Dative Kamana",
                        verified: true,
                      }}
                      amountRaised={5100}
                      amountToReach={cause.target_amount}
                      progress={50}
                      status={cause.status === "active" ? "open" : "closed"}
                      rating={cause.ratings}
                      daysToGo={getCauseRemainingDays(cause.start_date, cause.end_date)}
                      key={index}
                    />
                  ))}
              </Swipeable>
            </div>
            <div className="causes__grid causes__grid--lg">
              {fetched && !error &&
                data.causes_featured.map((cause: any, index: number) => (
                  <div className="causes__grid--item" key={index}>
                    <CauseCard
                      title={cause.name}
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud"
                      cover={cause.image}
                      owner={{
                        avatar:
                          "https://res.cloudinary.com/dutstern8/image/upload/v1583071786/yAJ2TZk4XFsNkKanjppChiWW.png",
                        name: "Dative Kamana",
                        verified: true,
                      }}
                      amountRaised={5100}
                      amountToReach={cause.target_amount}
                      progress={50}
                      status={cause.status === "active" ? "open" : "closed"}
                      rating={cause.ratings}
                      daysToGo={getCauseRemainingDays(cause.start_date, cause.end_date)}
                    />
                  </div>
                ))}
            </div>
          </>
        )}

        <div className="more__causes">
          <Button className="btn-secondary">DISCOVER MORE CAUSES</Button>
        </div>
      </div>

      <div className="causes">
        <SectionTitle title="Recent Causes" icon="icons/love-birds.png" />

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="causes__grid--mobile">
              <Swipeable>
                {fetched && !error &&
                  data.causes_recents.map((cause: any, index: number) => (
                    <CauseCard
                      title={cause.name}
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud"
                      cover={cause.image}
                      owner={{
                        avatar:
                          "https://res.cloudinary.com/dutstern8/image/upload/v1583071786/yAJ2TZk4XFsNkKanjppChiWW.png",
                        name: "Dative Kamana",
                        verified: true,
                      }}
                      amountRaised={5100}
                      amountToReach={cause.target_amount}
                      progress={50}
                      status={cause.status === "active" ? "open" : "closed"}
                      rating={cause.ratings}
                      daysToGo={getCauseRemainingDays(cause.start_date, cause.end_date)}
                      key={index}
                    />
                  ))}
              </Swipeable>
            </div>
              <div className="causes__grid causes__grid--lg">
                {fetched && !error && data.causes_recents.map((cause: any, index: number) => (
                  <div className="causes__grid--item" key={index}>
                  <CauseCard
                    title={cause.name}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud"
                    cover={cause.image}
                    owner={{
                      avatar:
                        "https://res.cloudinary.com/dutstern8/image/upload/v1583071786/yAJ2TZk4XFsNkKanjppChiWW.png",
                      name: "Dative Kamana",
                      verified: true,
                    }}
                    amountRaised={5100}
                    amountToReach={cause.target_amount}
                    progress={50}
                    status={cause.status === "active" ? "open" : "closed"}
                    rating={cause.ratings}
                    daysToGo={getCauseRemainingDays(cause.start_date, cause.end_date)}
                  />
                </div>
                ))}
            </div>
          </>
        )}
        <div className="more__causes">
          <Button className="btn-secondary">DISCOVER MORE CAUSES</Button>
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
          <div className="short__intro--button">
            <Button className="btn-primary">
              Android & iOS App coming soon
            </Button>
          </div>
        </div>
      </div>
      <div className="mission">
        <div className="mission__item mission--with-image">
          <img src="icons/kid-overlay.png" alt="" />
        </div>
        <div className="mission__item">
          <div className="mission__item--title">
            <img src="icons/family.png" alt="" />
            <h2>SAVE Plus</h2>
            <span>Mission</span>
          </div>
          <div className="mission__item--description">
            <p>
              We are a platform dedicated to connecting socially impactful
              causes, conscious people.
            </p>
          </div>
          <div className="mission__item--button">
            <Button className="btn-primary-outline" onClick={goToRegister}>JOIN US</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
