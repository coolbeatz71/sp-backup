import { FC } from "react";
import styles from "./user-agreement.module.scss";
import LayoutWrapper from "components/LayoutWrapper";
import { useTranslation } from "react-i18next";

const UserAgreementPage: FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper title="User Agreement">
      <div>
        <div className={styles.agreements__overlay} />
        <div className={styles.agreements__container}>
          <div className={styles.agreements__container__header}>
            <div className={styles.agreements__container__header__content}>
              <div>
                <h1>{t("user_agreement")}</h1>
              </div>
            </div>
          </div>
          <div className={styles.agreements__container__terms}>
            <section>
              <h2>{t("accepting_terms")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("accepting_terms_description1", {
                  saveplus: "<a href='https://saveplus.io/' target='_blank'>https://saveplus.io/</a>"
                })
              }}
              />
              <p dangerouslySetInnerHTML={{
                __html: t("accepting_terms_description2", {
                  break: `<br/><br/>`
                })
              }}
              />
            </section>
            <section>
              <h2>{t("description_of_service")}</h2>

              <p dangerouslySetInnerHTML={{
                __html: t("description_of_service_desc", {
                  break: `<br/><br/>`,
                  saveplus: "<a href='https://saveplus.io/' target='_blank'>https://saveplus.io/</a>"
                })
              }} />
             
              <p>{t("description_of_service_desc2")}</p>
            </section>
            
            <section>
              <h2>{t("Service_Fee")}</h2>
              <p>{t("Service_Fee_desc")}</p>
              
            </section>

            <section>
              <h2>{t("No_Solicitation_and_Sponsorship")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("No_Solicitation_and_Sponsorship_desc", {
                  break: `<br/><br/>`,
                  saveplusEmail: "<a href='mailto:support@saveplus.io' target='blank'>support@saveplus.io</a>",
                })
              }} />
            </section>

            <section>
              <h2>{t("Your_Use_of_the_Service_and_Responsibilities")}</h2>
              <p>{t("Your_Use_of_the_Service_and_Responsibilities_desc")}</p>
            </section>

            <section>
              <h2>{t("Content_Usage")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Content_Usage_desc", {
                  break: `<br/><br/>`
                })
              }} />
            </section>

            <section>
              <h2>{t("Rights_You_Grant_to_Us")}</h2>
              <p>{t("Rights_You_Grant_to_Us_description")}</p>
            </section>
            <section>
              <h2>{t("Exuus_Intellectual_Property_Rights")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Exuus_Intellectual_Property_Rights_description", {
                  saveplus: "<a href='https://saveplus.io/' target='_blank'>https://saveplus.io/</a>"
                })
              }} />
            </section>

            <section>
              <h2>{t("Modifications_and_Miscellaneous")}</h2>
              <p>{t("Modifications_and_Miscellaneous_description")}</p>
              <p dangerouslySetInnerHTML={{
                __html: t("Modifications_and_Miscellaneous_description", {
                  break:`<br/><br/>`,
                  saveplus: "<a href='https://saveplus.io/' target='_blank'>https://saveplus.io/</a>"
                })
              }} />
            </section>

            <section>
              <h2>{t("Final_Provisions")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Final_Provisions_description", {
                  break: `<br/><br/>`
                })
              }} />
            </section>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default UserAgreementPage;
