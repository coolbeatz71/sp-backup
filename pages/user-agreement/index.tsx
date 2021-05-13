import { FC } from "react";
import styles from "./user-agreement.module.scss";
import LayoutWrapper from "components/LayoutWrapper";
import { useTranslation } from "react-i18next";

const UserAgreementPage: FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper title="agreements">
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
                  exuus: "<a href='https://exuus.com/' target='_blank'>https://exuus.com/</a>",
                  getsave: "<a href='https://getsave.io/' target='_blank'>https://getsave.io/</a>",
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
                  break: `<br/><br/>`
                })
              }} />
              <dl>
                <dd>SAVE Mobile {t("for_smart_phone_users")}</dd>
                <dd>SAVE USSD (*777#)</dd>
                <dd>SAVE Collector</dd>
                <dd>SAVE Web</dd>
                <dd>SAVE Pay</dd>
                <dd>SAVE Plus</dd>
              </dl>
              <p>{t("description_of_service_desc2")}</p>
            </section>
            <section>
              <h2>{t("Definition_of_Different_Saving_Groups_Type")}</h2>
              <p>{t("Definition_of_Different_Saving_Groups_Type_desc")}</p>
              <p><b>- {t("Supervised")}: </b>{t("Supervised_description")}</p>
              <ol type="a">
                <li>{t("Supervised_ul_li_1")}</li>
                <li>{t("Supervised_ul_li_2")}</li>
                <li>{t("Supervised_ul_li_3")}</li>
                <li>{t("Supervised_ul_li_4")}</li>
              </ol>
              <p><b>- {t("Graduated")}: </b>{t("Graduated_description")}</p>
              <ol type="a">
                <li>{t("Graduated_ul_li_1")}</li>
                <li>{t("Graduated_ul_li_2")}</li>
                <li>{t("Graduated_ul_li_3")}</li>
              </ol>
              <p><b>- {t("Independent")}: </b>{t("Independent_description")}</p>
              <ol type="a">
                <li>{t("Independent_ul_li_1")}</li>
                <li>{t("Independent_ul_li_2")}</li>
                <li>{t("Independent_ul_li_3")}</li>
                <li>{t("Independent_ul_li_4")}</li>
                <li>{t("Independent_ul_li_5")}</li>
              </ol>

            </section>
            <section>
              <h2>{t("Service_Fee")}</h2>
              <p>{t("SAVE service fee is split into 4 plans")}:</p>
              <p><b>- {t("Free_Plan")}</b> {t("for Supervised saving groups")}</p>
              <p><b>- {t("Basic_Plan")}</b> {t("for both graduated and independent groups")}</p>
              <p><b>- {t("Standard_Plan")}</b> {t("for NGOs")}</p>
              <p><b>- {t("Premium_Plan")}</b> {t("for Private organization or Financial Service Providers")}</p>
              <p dangerouslySetInnerHTML={{
                __html: t("For more details feel free to refer to", {
                  getsave: "<a href='https://getsave.io/pricing' target='_blank'>https://getsave.io/pricing</a>",
                })

              }} />
            </section>

            <section>
              <h2>{t("Privacy and your Personal Information")}</h2>
              <p>{t("Privacy and your Personal Information description")}</p>
            </section>

            <section>
              <h2>{t("Your_Registration")}</h2>
              <p>{t("your_registration_desc")}</p>
              <dl>
                <dd>- {t("Downloading the app from Google Play")}</dd>
                <dd>- {t("Via our USSD code accessible via")}</dd>
                <dd  dangerouslySetInnerHTML={{
                  __html: t("Via the web dashboard accessible via", {
                    getsave: "<a href='https://getsave.io/' target='_blank'>https://getsave.io/</a>"
                  })
                }}/>
              </dl>
              <p>{t("To access SAVE, you will need to sign-up by")}</p>
              <p>{t("You can access your funds in two forms")}:</p>
              <p>{t("your_registration_desc_2")}</p>
              <p>{t("The Cash-Out has various forms, including but not limited to")}</p>
              <ul>
                <li>{t("Loan")}</li>
                <li>{t("Social_Fund")}</li>
                <li>{t("Bulk_withdrawal")}</li>
                <li>{t("Share_Out")}</li>
                <li>{t("Etc")}</li>
              </ul>
              <p dangerouslySetInnerHTML={{
                __html: t("your_registration_desc_3", {
                  supportEmail: "<a href='mailto:support@getsave.io' target='_blank'>support@getsave.io</a>",
                  break: `<br/>`
                })
              }} />
            </section>

            <section>
              <h2>{t("Your Use of the Service and Responsibilities")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Your_Use_of_the_Service_and_Responsibilities_description", {
                  break: `<br/><br/>`
                })
              }} />
            </section>

            <section>
              <h2>{t("Online_Alerts_and_Disclaimer")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Online_Alerts_and_Disclaimer_description", {
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
              <p>{t("Exuus_Intellectual_Property_Rights_description")}</p>
            </section>
            <section>
              <h2>{t("Access_and_Interference")}</h2>
              <p>{t("Access_and_Interference_description")}</p>
            </section>

            <section>
              <h2>{t("Disclaimer_of_Representations_and_Warranties")}</h2>
              <p>{t("Disclaimer_of_Representations_and_Warranties_description")}</p>
            </section>

            <section>
              <h2>{t("Not a Financial Planner, Broker or Tax Advisor")}</h2>
              <p>{t("Not a Financial Planner, Broker or Tax Advisor description")}</p>
            </section>

            <section>
              <h2>{t("Limitations_on_Exuus_Liability")}</h2>
              <p>{t("Limitations_on_Exuus_Liability_description")}</p>
            </section>

            <section>
              <h2>{t("Your_Indemnification_of_Exuus")}</h2>
              <p>{t("Your_Indemnification_of_Exuus_description")}</p>
            </section>


            <section>
              <h2>{t("Ending_your_relationship_with_Exuus")}</h2>
              <p dangerouslySetInnerHTML={{
                __html: t("Ending_your_relationship_with_Exuus_description", {
                  break:`<br/><br/>`
                })
                
              }}
              />
              <ul>
                <li>{t("Ending_your_relationship_with_Exuus_ul_li_1")}</li>
                <li>{t("Ending_your_relationship_with_Exuus_ul_li_2")}</li>
                <li>{t("Ending_your_relationship_with_Exuus_ul_li_3")}</li>
                <li>{t("Ending_your_relationship_with_Exuus_ul_li_4")}</li>
                <li>{t("Ending_your_relationship_with_Exuus_ul_li_5")}</li>
                <li>{t("Ending_your_relationship_with_Exuus_ul_li_6")}</li>
              </ul>
            </section>

            <section>
              <h2>{t("Modifications_and_Miscellaneous")}</h2>
              <p>{t("Modifications_and_Miscellaneous_description")}</p>
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
