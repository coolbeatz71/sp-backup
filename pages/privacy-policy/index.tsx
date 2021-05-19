import { FC } from "react";
import styles from "./policies.module.scss";
import LayoutWrapper from "components/LayoutWrapper";
import { useTranslation } from "react-i18next";



const PoliciesPage: FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper title="Privacy Policy">
      <div>
        <div className={styles.policies__overlay} />
        <div className={styles.policies__container}>
          <div className={styles.policies__container__header}>
            <div className={styles.policies__container__header__content}>
              <div>
                <h1>{t("privacy_policy")}</h1>
              </div>

            </div>
          </div>
          <div className={styles.policies__container__terms}>
            <section>
              <h2>{t("personal_information")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("personal_information_desc", {
                  exuus: "<a href='https://exuus.com/' target='_blank'>https://exuus.com/</a>",
                  getsave: "<a href='https://getsave.io/' target='_blank'>https://getsave.io/</a>",
                  saveplus: "<a href='https://saveplus.io/' target='_blank'>https://saveplus.io/</a>"
                })
              }}
              />
              <p>
                {t("personal_information_desc1")}
              </p>
            </section>

            <section>
              <h2>{t("collection_of_personal_information")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Information_provided_desc1")
              }} />
              <ul>
                <li>{t("Names")}</li>
                <li>{t("ID_number")}</li>
                <li>{t("Date_of_Birth")}</li>
                <li>{t("Occupation")}</li>
                <li>{t("Phone_Number")}</li>
                <li>{t("Email_Address")}</li>
                <li>{t("Gender")}</li>
                <li>{t("Marital_Status")}</li>
                <li>{t("Level_of_Education")}</li>
                <li>{t("Address")}</li>
                <li>{t("Ubudehe_category")}</li>
                <li>{t("Next_of_Kin_names_relationship_phone_num")}</li>
                <li>{t("Number_of_children")}</li>
                <li>{t("Number_of_dependents")}</li>
                <li>{t("Bank_Account")}</li>
                <li>{t("MTN_Mobile_Money_or_Airtel_Money_Account")}</li>
                <li>{t("Transaction_history")}</li>
              </ul>
              <p>{t("Information_provided_desc2")}</p>
              <h3>{t("Disclaimer")}</h3>
              <p>{t("disclaimer_desc")}</p>
              <h3>{t("Use_of_Personal_Information")}</h3>
              <p>{t("We collect your personal information to")}</p>
              <dl>
                <dd>-{t("Provide the Services to you")}</dd>
                <dd>-{t("Notify you about your account activity")}</dd>
                <dd>-{t("Process transactions")}</dd>
                <dd>-{t("For credit scoring")}</dd>
                <dd>-{t("Provide customer support and resolve disputes")}</dd>
                <dd>-{t("Identify, prevent, and report potentially prohibited fraudulent, or illegal activities")}</dd>
                <dd>-{t("Customize and improve your experience and the Services")}</dd>
                <dd>-{t("Notify you about important changes to the User Agreement terms and conditions")}</dd>
                <dd>-{t("Any other purpose that we disclose to you in the course of providing the Services to you")}</dd>
                <dd>-{t("We can also share your personal data with a third party entity with your consent")}</dd>
                <dd>-{t("Personal data can also be shared with facilitating organizations such as NGOs")}</dd>
              </dl>
              <p>{t("Use_of_Personal_Information_last_paragraph")}</p>
            </section>

            <section>
              <h2>{t("Privacy_Questions")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("privacy_question_description", {
                  email: "<a href='mailto:support@getsave.io' target='_blank'>support@getsave.io</a>",
                  email1: "<a href='mailto:info@exuus.com' target='_blank'>info@exuus.com</a>",
                })
              }} />
            </section>

            <section>
              <h2>{t("Update")}</h2>
              <p>{t("update_description")}</p>
            </section>

          </div>
        </div>
      </div>

    </LayoutWrapper >
  );
};

export default PoliciesPage;
