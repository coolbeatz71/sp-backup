import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { IRootState } from "redux/initialStates";
import { Button } from "antd";
import Swipeable from "react-swipeable-views";
import PageTitle from "components/common/PageTitle";
import styles from "./causes.module.scss";
import { isEmpty } from "lodash";
import { getUserCauses } from "redux/actions/cause/getUserCauses";
import Spinner from "components/Spinner";
import CauseCard from "components/common/CauseCard";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import PrivateComponent from "pages/privateRoute";
import { USER_CAUSES_PATH } from "helpers/paths";
import CategoriesBar from "components/common/CategoriesBar";
import { useMedia } from "react-use";
import { getAllCategories } from "redux/actions/categories/getAll";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { toggleCategoryBar } from "redux/actions/categories/hide";

const pageTitle: string = "your causes";
const causesLength: any = 6;

const renderHeader = (causes: { [key: string]: any }) => (
  <div className={styles.causes__header}>
    <div>
      <PageTitle title={pageTitle} icon="../icons/social-care.svg" />
      <p className={styles.causes__header__subTitle}>
        {isEmpty(causes.data)
          ? "Start a cause today!"
          : "Track all your causes here."}
      </p>
    </div>
    <Link href="/causes/create">
      <Button className="btn-primary-outline">CREATE A NEW CAUSE</Button>
    </Link>
  </div>
);

const renderFeedContainer = (
  pathName: string,
  causes: { [key: string]: any },
  fetched: boolean,
  error: any,
  sliceCausesNumber: any,
) =>
  fetched && !error && isEmpty(causes.data) ? (
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
                  description={cause.summary}
                  tillNumber={cause.till_number}
                  cover={cause.image}
                  owner={{}}
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
                  description={cause.summary}
                  tillNumber={cause.till_number}
                  cover={cause.image}
                  owner={{}}
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
  );

const Causes: React.SFC<{}> = () => {
  const dispatch = useDispatch();
  const { push, pathname, asPath } = useRouter();
  const isMobile = useMedia("(max-width: 768px)");
  const isTablet = useMedia("(min-width: 769px) and (max-width: 1174px)");

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { data, loading, fetched, error } = useSelector(
    ({ cause: { user } }: IRootState) => user,
  );

  const { categories, hide: isCategoryBarHidden } = useSelector(
    ({ categories }: IRootState) => categories,
  );

  const hideCategoryBar = () => {
    if (!isTablet && !isMobile) {
      toggleCategoryBar(window.scrollY > 40)(dispatch);
    }
  };

  useEffect(() => {
    getAllCategories()(dispatch);
    // tslint:disable-next-line: align
  }, [asPath, dispatch]);

  useEffect(() => {
    if (!isLoggedin) push("/");
    getUserCauses(asPath)(dispatch);
    // tslint:disable-next-line: align
  }, [asPath, dispatch]);

  useEffect(() => {
    if (!isTablet && !isMobile) {
      window.addEventListener("scroll", hideCategoryBar);
    }
    return () => {
      window.removeEventListener("scroll", hideCategoryBar);
    };
    // tslint:disable-next-line: align
  }, [isLoggedin]);

  const [causesNumber, setCausesNumber] = useState(causesLength);

  return (
    <>
      {fetched && !error && !isEmpty(data) ? (
        <TransitionGroup component={null}>
          {!isCategoryBarHidden && (
            <CSSTransition classNames="category" timeout={300}>
              <CategoriesBar page={USER_CAUSES_PATH} categories={categories} />
            </CSSTransition>
          )}
        </TransitionGroup>
      ) : null}
      <div className={styles.causes}>
        {loading ? (
          <Spinner />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default PrivateComponent(Causes);
