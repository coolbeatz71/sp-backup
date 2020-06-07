import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { Button } from "antd";
import Swipeable from "react-swipeable-views";
import PageTitle from "components/common/PageTitle";
import styles from "./causes.module.scss";
import { isEmpty } from "lodash";
import { getUserCauses } from "redux/actions/causes/getUserCauses";
import Spinner from "components/Spinner";
import CauseCard from "components/common/CauseCard";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import PrivateComponent from "pages/privateRoute";

const pageTitle: string = "your causes";
const causesLength: any = 2;

const renderHeader = (causes: { [key: string]: any }) => (
  <div className={styles.causes__header}>
    <div>
      <PageTitle title={pageTitle} icon="../icons/social-care.svg" />
      <p className={styles.causes__header__subTitle}>
        {isEmpty(causes.data)
          ? "Start a cause today!"
          : "Track all your cause here."}
      </p>
    </div>
    <Button className="btn-primary-outline">CREATE A NEW CAUSE</Button>
  </div>
);

const renderFeedContainer = (
  pathName: string,
  causes: { [key: string]: any },
  fetched: boolean,
  error: any,
  sliceCausesNumber: any,
) =>
  isEmpty(causes.data) ? (
    <div className={styles.causes__illustration}>
      <img src="../sitting-reading.svg" />
    </div>
  ) : (
    <>
      <div className={styles.causes__grid__mobile}>
        <Swipeable>
          {fetched &&
            !error &&
            causes.data
              .slice(0, sliceCausesNumber)
              .map((cause: any, index: number) => (
                <CauseCard
                  pathName={pathName}
                  slug={cause.slug}
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
                  daysToGo={getCauseRemainingDays(
                    cause.start_date,
                    cause.end_date,
                  )}
                  key={index}
                />
              ))}
        </Swipeable>
      </div>
      <div className={styles.causes__grid__lg}>
        {fetched &&
          !error &&
          causes.data
            .slice(0, sliceCausesNumber)
            .map((cause: any, index: number) => (
              <div className={styles.causes__grid__item} key={index}>
                <CauseCard
                  pathName={pathName}
                  slug={cause.slug}
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
                  daysToGo={getCauseRemainingDays(
                    cause.start_date,
                    cause.end_date,
                  )}
                />
              </div>
            ))}
      </div>
    </>
  );

const Causes: React.SFC<{}> = () => {
  const dispatch = useDispatch();
  const { push, pathname } = useRouter();

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { data, loading, fetched, error } = useSelector(
    ({ causes: { user } }: IRootState) => user,
  );

  useEffect(() => {
    if (!isLoggedin) push("/");
    getUserCauses()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  const [causesNumber, setCausesNumber] = useState(causesLength);

  return (
    <div className={styles.causes}>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {renderHeader(data)}
          {renderFeedContainer(pathname, data, fetched, error, causesNumber)}
          {!isEmpty(data.data) && data.data.length > causesLength ? (
            <div className={styles.causes__footer}>
              <div>
                <Button
                  className="btn-primary-outline"
                  onClick={() => setCausesNumber(undefined)}
                >
                  VIEW ALL CAUSES
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PrivateComponent(Causes);
