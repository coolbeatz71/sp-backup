import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import styles from "./causes.module.scss";
import { getAllCategories } from "../../redux/actions/categories/getAll";
import Mission from "components/common/Mission";
import CategoriesBar from "components/common/CategoriesBar";
import { getAllCauses } from "./../../redux/actions/cause/getAll";
import CauseCard from "components/common/CauseCard";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import { getOwnerInfo } from "helpers/getOwnerInfo";
import { isEmpty } from "lodash";
import { ALL_CAUSES_PATH } from "../../helpers/paths";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import { Result } from "antd";
import CauseCardSkeleton from "components/common/Skeleton/CauseCard";

const AllCauses: React.SFC<{}> = () => {
  const dispatch = useDispatch();
  const { pathname, asPath } = useRouter();

  const goToRegister = () => {
    showAuthDialog(true, "signup")(dispatch);
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
    // tslint:disable-next-line: align
  }, [dispatch]);

  useEffect(() => {
    getAllCauses(asPath)(dispatch);
    // tslint:disable-next-line: align
  }, [asPath, dispatch]);

  return (
    <>
      <CategoriesBar page={ALL_CAUSES_PATH} categories={categories} />
      <div className={styles.allCauses}>
        {categories.loading || loading ? (
          <div className={styles.allCauses__grid}>
            {[...Array(6)].map((index) => (
              <div key={index}>
                <CauseCardSkeleton />
              </div>
            ))}
          </div>
        ) : isEmpty(data.data) ? (
          <div className={styles.allCauses__illustration}>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, No cause was found"
            />
          </div>
        ) : (
          <div className={styles.allCauses__grid}>
            {fetched &&
              !error &&
              data.data.map((cause: any, index: number) => (
                <div key={index}>
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
        )}
      </div>
      <div>
        <Mission isLoggedin={isLoggedin} goToRegister={goToRegister} />
      </div>
    </>
  );
};

export default AllCauses;
