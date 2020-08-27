import * as React from "react";
import styles from "./pricing.module.scss";
import PricingCard from "../../components/Pricing";
import Faq from "./../../components/Faq/index";
import LayoutWrapper from "components/LayoutWrapper";

const PricingPage: React.SFC<{}> = () => {
  return (
    <LayoutWrapper title="Pricing" isForm>
      <div className={styles.pricing__container}>
        <div className={styles.pricing__container__header}>
          <h1>Simple Plans For Everyone!</h1>
          <div className={styles.pricing__container__header__desc}>
            <p>
              We have a flexible plan that fits everyone. We've made sure that
              our pricing structure is simple and transparent.
            </p>
          </div>
        </div>
        <div className={styles.pricing__container__card}>
          <PricingCard />
        </div>
        <div className={styles.pricing__container__faq}>
          <h1>FAQ</h1>
          <Faq />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default PricingPage;
