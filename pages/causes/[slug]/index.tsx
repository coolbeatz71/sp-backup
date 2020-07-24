import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from "./single.module.scss";
import { Button } from "antd";
import formatNumber from "helpers/numberFormater";
import { getDaysToGo } from "helpers/causeDaysToGo";
import getSingle from "redux/actions/cause/getSingle";
import { useMedia } from "react-use";
import { IRootState } from "redux/initialStates";
import Spinner from "components/Spinner";
import getProgressPercentage from "helpers/getProgressPercentage";
import getCauseRemainingDays from "helpers/getCauseRemainingDays";
import Error from "components/common/Error";
import CauseDonors from "components/Cause/Single/Dornors";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { causeStatus } from "interfaces";
import AccessCode from "components/Cause/Single/AccessCode";
import Share from "components/common/Share";
import PageHead from "components/common/PageHead";

const SingleCause: React.FC<{}> = () => {
  const [fetched, setFetched] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const isMobile = useMedia("(max-width: 768px)");

  if (slug && !fetched) {
    getSingle(slug)(dispatch);
    setFetched(true);
  }

  const { loading, data, error } = useSelector(
    ({ cause: { single } }: IRootState) => single,
  );

  const donateButton = (screen?: string) =>
    data.status === causeStatus.active && (
      <Link href="/causes/[slug]/donate" as={`/causes/${slug}/donate`}>
        <Button
          className={`btn-primary mt-3 ${
            screen === "mobile" && isMobile
              ? "d-block d-md-none"
              : !screen || screen === "tablet"
              ? "d-none d-md-block"
              : "d-none"
          }`}
          size="large"
        >
          Donate
        </Button>
      </Link>
    );

  const contactInfo = (screen?: string) => (
    <div
      className={`${screen === "mobile" && "d-md-none"} ${
        styles.singleCause__body__contact
      }`}
    >
      <h5>cause Team and Contact</h5>
      You can reach out to on{" "}
      <a href={`tel:+${phoneFormatter(data.phone_number || data.payment_account_number)}`}>
        {phoneFormatter(data.phone_number || data.payment_account_number)}
      </a>
    </div>
  );

  return (
    <div className={styles.singleCause}>
      {loading ? (
        <Spinner />
      ) : error ? (
        error?.status === 403 || error?.status === 400 ? (
          <AccessCode slug={slug} error={error} />
        ) : (
          <Error status={error.status || 500} message={error.message} />
        )
      ) : (
        fetched && (
          <div className="d-flex flex-column">
            <PageHead data={data} />
            <div className={styles.singleCause__header}>
              <img src={data.image} alt="" />
              <div className={styles.singleCause__header__progress}>
                <div
                  className={styles.singleCause__header__progress__container}
                >
                  <div className={styles.singleCause__header__progress__raised}>
                    <h5>{formatNumber(data.raised_amount)} RWF Raised</h5>
                    <span
                      className={
                        styles.singleCause__header__progress__percentage
                      }
                    >
                      {getProgressPercentage(
                        data.raised_amount,
                        data.target_amount,
                      )}{" "}
                      %
                    </span>
                  </div>
                  <div
                    className={
                      styles.singleCause__header__progress__progressBar
                    }
                  >
                    <div
                      className={`progression ${styles.singleCause__header__progress__progression}`}
                    />
                  </div>
                  <div className={styles.singleCause__header__progress__goal}>
                    <h5>{formatNumber(data.target_amount)} RWF Goal</h5>
                    <span className={styles.causeStatus}>
                      {getDaysToGo(
                        data.status,
                        getCauseRemainingDays(data.end_date),
                      )}
                    </span>
                  </div>
                </div>
                {donateButton()}
              </div>
              {donateButton("mobile")}
            </div>
            <div className={styles.singleCause__body}>
              <div className={styles.singleCause__body__details}>
                <div className={styles.singleCause__body__details__summary}>
                  <h5>{data.name}</h5>
                  <p>{data.summary}</p>
                </div>
                <div className={styles.singleCause__body__details__description}>
                  <h5>Use of funds</h5>
                  <p>{data.description}</p>
                </div>
                {contactInfo()}
              </div>
              <div className={styles.singleCause__body__right}>
                <CauseDonors slug={slug} />
                <Share
                  title={data.name}
                  slug={slug}
                  tillNumber={data.till_number}
                />
              </div>
              {contactInfo("mobile")}
            </div>
          </div>
        )
      )}
      <style jsx>{`
        .progression {
          width: ${getProgressPercentage(
            data.raised_amount,
            data.target_amount,
          )}%;
        }
      `}</style>
    </div>
  );
};

export default SingleCause;
