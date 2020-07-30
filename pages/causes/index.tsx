import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import Swipeable from "react-swipeable-views";
import styles from "./causes.module.scss";
import { getAllCategories } from "../../redux/actions/categories/getAll";
import Spinner from "components/Spinner";
import Mission from "components/common/Mission";
import CategoriesBar from "components/common/CategoriesBar";
import { getAllCauses } from "./../../redux/actions/cause/getAll";
import { toggleCategoryBar } from "./../../redux/actions/categories/hide";
import CauseCard from "components/common/CauseCard";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import { getOwnerInfo } from "helpers/getOwnerInfo";
import { isEmpty } from "lodash";
import { ALL_CAUSES_PATH } from "../../helpers/paths";
import { useMedia } from "react-use";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import { Result } from "antd";

const AllCauses: React.SFC<{}> = () => {
  const dispatch = useDispatch();
  const { pathname, asPath } = useRouter();
  const isMobile = useMedia("(max-width: 768px)");
  const isTablet = useMedia("(min-width: 769px) and (max-width: 1024px)");

  const goToRegister = () => {
    showAuthDialog(true, "signup")(dispatch);
  };

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { categories, hide: isCategoryBarHidden } = useSelector(
    ({ categories }: IRootState) => categories,
  );

  const { data, loading, fetched, error } = useSelector(
    ({ cause: { all } }: IRootState) => all,
  );

  const hideCategoryBar = () => {
    if (!isMobile && !isTablet) {
      toggleCategoryBar(window.scrollY > 40)(dispatch);
    }
  };

  useEffect(() => {
    if (!isMobile && !isTablet) {
      window.addEventListener("scroll", hideCategoryBar);
    }
    return () => {
      window.removeEventListener("scroll", hideCategoryBar);
    };
    // tslint:disable-next-line: align
  }, []);

  useEffect(() => {
    getAllCategories()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  useEffect(() => {
    getAllCauses(asPath)(dispatch);
    // tslint:disable-next-line: align
  }, [asPath, dispatch]);

  return (
    <>
      <TransitionGroup component={null}>
        {!isCategoryBarHidden && (
          <CSSTransition classNames="category" timeout={300}>
            <CategoriesBar page={ALL_CAUSES_PATH} categories={categories} />
          </CSSTransition>
        )}
      </TransitionGroup>
      <div className={styles.allCauses}>
        {categories.loading || loading ? (
          <Spinner />
        ) : isEmpty(data.data) ? (
          <div className={styles.allCauses__illustration}>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, No cause was found"
            />
          </div>
        ) : (
          <>
            <div className={styles.allCauses__grid__mobile}>
              <Swipeable>
                {fetched &&
                  !error &&
                  data.data.map((cause: any, index: number) => (
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
            <div className={styles.allCauses__grid__lg}>
              {fetched &&
                !error &&
                data.data.map((cause: any, index: number) => (
                  <div className={styles.allCauses__grid__item} key={index}>
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
      </div>
      <div>
        <Mission isLoggedin={isLoggedin} goToRegister={goToRegister} />
      </div>
    </>
  );
};

export default AllCauses;
