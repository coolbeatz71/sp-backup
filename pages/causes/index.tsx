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
import CauseCard from "components/common/CauseCard";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import { getOwnerInfo } from "helpers/getOwnerInfo";
import { SIGNUP_PATH } from "helpers/paths";

const AllCauses: React.SFC<{}> = () => {
  const dispatch = useDispatch();
  const { push, pathname } = useRouter();

  const goToRegister = () => {
    push(SIGNUP_PATH);
  };

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { categories } = useSelector(
    ({ categories }: IRootState) => categories,
  );

  const { data, loading, fetched, error } = useSelector(
    ({ cause: { all } }: IRootState) => all,
  );

  useEffect(() => {
    getAllCategories()(dispatch);
    getAllCauses()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  return (
    <div>
      <CategoriesBar categories={categories} />
      <div className={styles.allCauses}>
        {categories.loading || loading ? (
          <Spinner />
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
                      cover={cause.image}
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
                      amountRaised={cause.raised_amount}
                      amountToReach={cause.target_amount}
                      currency={cause.currency}
                      status={cause.status}
                      rating={cause.ratings}
                      daysToGo={getCauseRemainingDays(cause.end_date)}
                      key={index}
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
                      cover={cause.image}
                      owner={getOwnerInfo(cause.user_names, cause.verified)}
                      amountRaised={cause.raised_amount}
                      amountToReach={cause.target_amount}
                      currency={cause.currency}
                      status={cause.status}
                      rating={cause.ratings}
                      daysToGo={getCauseRemainingDays(cause.end_date)}
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
    </div>
  );
};

export default AllCauses;
