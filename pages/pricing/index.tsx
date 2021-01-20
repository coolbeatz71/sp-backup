import { FC } from "react";
import styles from "./pricing.module.scss";
import { useTranslation } from "react-i18next";

import Faq from "./../../components/Faq";
import PricingCard from "../../components/Pricing";
import LayoutWrapper from "components/LayoutWrapper";

const PricingPage: FC<{}> = () => {
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
