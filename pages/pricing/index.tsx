import * as React from "react";
import styles from "./pricing.module.scss";
import PricingCard from "../../components/Pricing";
import Faq from "./../../components/Faq/index";
import LayoutWrapper from "components/LayoutWrapper";

import { useTranslation } from "react-i18next";

const PricingPage: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <LayoutWrapper title="Pricing" isForm>
      <div className={styles.pricing__container}>
        <img
          className={styles.pricing__container__image}
          src="/images/pricing.svg"
          alt="background image"
        />
        <div className={styles.pricing__container__header}>
          <h1>{t("simple plans for everyone")}!</h1>
          <div className={styles.pricing__container__header__desc}>
            <p>{t("pricing_plan_details")}</p>
          </div>
        </div>
        <div className={styles.pricing__container__card}>
          <PricingCard />
        </div>
        <div className={styles.pricing__container__faq}>
          <h1>{t("faq").toUpperCase()}</h1>
          <Faq />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default PricingPage;
