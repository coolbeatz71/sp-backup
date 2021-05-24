import { FC } from "react";
import { FormInstance, Typography } from "antd";
import { IUnknownObject } from "interfaces/unknownObject";
import { useTranslation } from "react-i18next";
import Img from "react-optimized-image";
import Link from "next/link";
import { isEmpty } from "lodash";

import SharePopover from "components/common/SharePopover";
import getTelco from "helpers/getTelco";
import confeti from "public/confeti.gif";

import styles from "./../donate.module.scss";

export interface IProps {
  form: FormInstance<any>;
  slug: string | string[];
  cause: IUnknownObject;
  donateData: IUnknownObject;
  lang: any;
}

const Success: FC<IProps> = ({ form, slug, cause, donateData, lang }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.donate__body__form__successful}>
      <h5>{t("confirm your donation")}</h5>
      {isEmpty(donateData.data) ? (
        <p className={styles.donate__body__form__successful__subtitle}>
         { getTelco(form.getFieldValue("phone_number")) === 'MTN_Rwanda' ? (
          t("enter pin and confirm via momo")
          ) : (
          t("enter pin and confirm via airtel money")
         )}
        </p>
        
      ) : (
        <>
          <p className={styles.donate__body__form__successful__subtitle}>
            {t("enter credit/debit card details")}
          </p>
          <Typography.Link
            target="_blank"
            href={donateData?.data?.url}
            style={{
              textDecoration: "underline",
            }}
          >
            {donateData?.data?.url}
          </Typography.Link>
          <br />
        </>
      )}

      <h4>{t("thank you")}</h4>
      <Img
        className={styles.donate__body__form__successful__confeti}
        src={confeti}
        alt="Confetti GIF"
      />

      <Link href={`/causes/${slug}?lang=${lang}`}>
        <a rel="noreferrer noopener">{t("back to the cause")}</a>
      </Link>
      <div className={styles.donate__body__form__successful__share}>
        <SharePopover
          slug={cause.slug}
          code={cause.till_number}
          title={cause.name}
          standalone
          isPrivate={cause.access === "private"}
        />
      </div>

      {/* <div className={styles.donate__body__form__successful__rate}>
     <span>{t("rate this cause")}</span>
     <ReactStars
       starCount={5}
       name="rate1"
       value={rating}
       onStarClick={handleRating}
       starColor="#F4A86C"
       emptyStarColor="#ddd"
     />
    </div> */}
      <div className={styles.donate__body__form__successful__comingSoon}>
        <span>{t("mobile_apps_coming_soon")}</span>
      </div>
    </div>
  );
};

export default Success;
