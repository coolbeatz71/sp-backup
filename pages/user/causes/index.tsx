import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { IRootState } from "redux/initialStates";
import { Button, Result } from "antd";
import PageTitle from "components/common/PageTitle";
import styles from "./causes.module.scss";
import { isEmpty } from "lodash";
import { getUserCauses } from "redux/actions/cause/getUserCauses";
import CauseCard from "components/common/CauseCard";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import PrivateComponent from "pages/privateRoute";
import { USER_CAUSES_PATH } from "helpers/paths";
import CategoriesBar from "components/common/CategoriesBar";
import { useMedia } from "react-use";
import { getAllCategories } from "redux/actions/categories/getAll";
import CauseCardSkeleton from "components/common/Skeleton/CauseCard";

const pageTitle: string = "your causes";
const causesLength: any = 6;

const renderHeader = (isMobile: boolean, causes: { [key: string]: any }) => (
  <div className={styles.causes__header}>
    <div>
      <PageTitle title={pageTitle} icon="../icons/social-care.svg" />
      <p className={styles.causes__header__subTitle}>
        {isEmpty(causes.data)
          ? "Start a cause today!"
          : "Track all your causes here."}
      </p>
    </div>
    {isMobile && (
      <Link href="/causes/create">
        <Button className="btn-primary-outline">CREATE A NEW CAUSE</Button>
      </Link>
    )}
  </div>
);

const renderFeedContainer = (
  asPath: string,
  pathName: string,
  causes: { [key: string]: any },
  fetched: boolean,
  error: any,
  sliceCausesNumber: any,
) =>
  fetched && !error && isEmpty(causes.data) ? (
    asPath === pathName ? (
      <div className={styles.causes__illustration}>
        <img src="../sitting-reading.svg" />
      </div>
    ) : (
        <div className={styles.causes__result}>
          <Result status="404" title="404" subTitle="Sorry, No cause was found" />
        </div>
      )
  ) : (
      <div className={styles.causes__grid}>
        {fetched &&
          !error &&
          causes.data
            .slice(0, sliceCausesNumber)
            .map((cause: any, index: number) => (
              <div key={index}>
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
    );

const Causes: React.SFC<{}> = () => {
  const dispatch = useDispatch();
  const { push, pathname, asPath } = useRouter();
  const isMobile = useMedia("(max-width: 768px)");
  const [causesNumber, setCausesNumber] = useState(causesLength);

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { data, loading, fetched, error } = useSelector(
    ({ cause: { user } }: IRootState) => user,
  );

  const { categories } = useSelector(
    ({ categories }: IRootState) => categories,
  );

  useEffect(() => {
    getAllCategories()(dispatch);
    // tslint:disable-next-line: align
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedin) push("/");
    getUserCauses(asPath)(dispatch);
    // tslint:disable-next-line: align
  }, [asPath, dispatch]);

  return (
    <>
      <CategoriesBar page={USER_CAUSES_PATH} categories={categories} />
      <div className={styles.causes}>
        {renderHeader(isMobile, data)}
        {loading ? (
          <div className={styles.causes__grid}>
            {[...Array(3)].map((_values, index) => (
              <div key={index}>
                <CauseCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
            <>
              {renderFeedContainer(
                asPath,
                pathname,
                data,
                fetched,
                error,
                causesNumber,
              )}
              {causesNumber &&
                !isEmpty(data.data) &&
                data.data.length > causesNumber && (
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
                )}
            </>
          )}
      </div>
    </>
  );
};

export default PrivateComponent(Causes);
