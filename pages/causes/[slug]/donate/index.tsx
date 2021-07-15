import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./donate.module.scss";
import { normalize } from "@exuus/rwanda-phone-utils";
import { Form, Row, Typography, Spin } from "antd";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { IRootState } from "redux/initialStates";
// import ReactStars from "react-star-rating-component";
// import rateCause from "redux/actions/cause/rateCause";
// import showAuthDialog from "redux/actions/auth/showAuthDialog";
import donateCause from "redux/actions/cause/donateCause";
import { IUnknownObject } from "interfaces/unknownObject";
import { isEmpty } from "lodash";
import getTelco from "helpers/getTelco";
import getSingle from "redux/actions/cause/getSingle";
import { useTranslation } from "react-i18next";
import { donationType } from "constants/donationTypes";

import AccessCode from "components/Cause/Single/AccessCode";
import Error from "components/common/Error";
import Layout from "components/LayoutWrapper";

import CauseCard from "components/cards/Cause";
import { getLanguage } from "helpers/getLanguage";
import Success from "./success";
import DonateForm from "./form";
import serializeFormattedNumber from "helpers/serializeFormattedNumber";

const DonateCause: FC<{}> = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<donationType>("individual");
  const [donationSuccessful, setDonationSuccessful] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  // const [rating, setRating] = useState(0);
  const [selectedTelco, setSelectedTelco] = useState<string>("default");
  const router = useRouter();
  const [fetched, setFetched] = useState(false);
  const [isFormDataReady, setFormDataReadiness] = useState<boolean>(false);
  const { slug } = router.query;
  const [emailPlaceholder, setEmailPlaceholder] = useState<string>(
    `${t("email")} (${t("optional")})`
  );

  const {
    data: cause,
    loading: loadingCause,
    error: errorCause,
    accessCode,
  } = useSelector(({ cause: { single } }: IRootState) => single);

  const {
    data: donateData,
    loading,
    error,
  } = useSelector(({ cause: { donate } }: IRootState) => donate);

  const {
    isLoggedin,
    data,
    loading: userDataLoading,
  } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
  const lang = data.lang || getLanguage();
  const [phone, setPhone] = useState<string>(data.phone_number);

  useEffect(() => {
    if (slug && !fetched) {
      getSingle(slug, accessCode ? { access_code: accessCode } : {})(dispatch);
      setFetched(true);
    }
  }, [slug, fetched]);

  useEffect(() => {
    if (donationSuccessful) {
      window?.scrollTo({ top: 0 });

      const url: string = donateData?.data?.url;
      if (!isEmpty(url)) window?.open(url, "_blank");
    }
  }, [donationSuccessful]);

  useEffect(() => {
    if (data.phone_number) {
      data.phone_number = phoneFormatter(data.phone_number, "substract");
      data.payment_method = getTelco(data.phone_number);
      if (selectedTelco === "default")
        setSelectedTelco(getTelco(data.phone_number) || "default");
      setFormDataReadiness(true);
    }
  }, [data.phone_number]);

  if (!isLoggedin && !isFormDataReady) setFormDataReadiness(true);

  const onPhoneTyping = (value: string) => {
    setPhone(value);
  };

  const formatCountryCode = (countryCode: string) => countryCode.substring(1);

  const formatData = (data: IUnknownObject): IUnknownObject => {
    if (isEmpty(data.email)) delete data.email;

    const telco = getTelco(data.phone_number);

    console.log({ telco });
    return {
      ...data,
      amount: Number(serializeFormattedNumber(data.amount)),
      phone_number:
        data.payment_method === "momo"
          ? normalize(data.phone_number)
          : `${formatCountryCode(data.countryCode)}${data.phone_number_world}`,
      payment_method:
        data.payment_method === "momo"
          ? getTelco(data.phone_number)
          : "Visa_MasterCard",
    };
  };

  const handleSubmit = (form: any) => {
    const formattedData = formatData(form);

    delete formattedData.countryCode;
    delete formattedData.phone_number_world;

    donateCause(slug, formattedData, { access_code: accessCode })(
      setDonationSuccessful,
      dispatch
    );
  };

  const handleValueChange = (changedField: any) => {
    if (Object.keys(changedField)[0] === "type") {
      setUserType(changedField.type);
    }

    if (Object.keys(changedField)[0] === "anonymous") {
      setIsAnonymous(changedField.anonymous);
    }

    if (Object.keys(changedField)[0] === "payment_method") {
      setEmailPlaceholder(
        changedField.payment_method === "Visa_MasterCard"
          ? `${t("email")}`
          : `${t("email")}  (${t("optional")})`
      );
    }
  };

  // const handleRating = (nextValue: number) => {
  //   setRating(nextValue);
  //   if (!isLoggedin) return showAuthDialog(true)(dispatch);
  //   rateCause(slug, { rating: nextValue });
  // };

  return (
    <Layout title={t("donate")}>
      <div className={styles.donate}>
        {loadingCause ? (
          <div className={styles.donate__spinner}>
            <Spin size="large" tip="Loading..." />
          </div>
        ) : errorCause && !accessCode ? (
          errorCause?.status === 403 || errorCause?.status === 400 ? (
            <AccessCode slug={slug} error={errorCause} length={4} />
          ) : (
            <Error
              status={errorCause.status || 500}
              message={errorCause.message}
            />
          )
        ) : (
          <div className={styles.donate__body}>
            <div className={styles.donate__body__header}>
              {!donationSuccessful && (
                <>
                  <h4>{t("donate for a cause")}</h4>
                  <h5>{t("thank you for your support")}</h5>
                </>
              )}
            </div>
            <div className={styles.donate__body__form}>
              {donationSuccessful ? (
                <Success
                  form={form}
                  slug={slug}
                  cause={cause}
                  donateData={donateData}
                  lang={lang}
                />
              ) : (
                <>
                  {!loadingCause && !errorCause && (
                    <>
                      <Row justify="center">
                        <Typography.Title
                          level={2}
                          className={styles.donate__body__form__causeName}
                          ellipsis
                        >
                          {cause.name}
                        </Typography.Title>
                      </Row>
                      <CauseCard cause={cause} isView isDonate />
                    </>
                  )}
                  <br />
                  {userDataLoading && isEmpty(data) ? (
                    <Spin />
                  ) : (
                    isFormDataReady && (
                      <DonateForm
                        form={form}
                        userType={userType}
                        isAnonymous={isAnonymous}
                        emailPlaceholder={emailPlaceholder}
                        loading={loading}
                        error={error}
                        data={data}
                        phone={phone}
                        onPhoneTyping={onPhoneTyping}
                        handleSubmit={handleSubmit}
                        handleValueChange={handleValueChange}
                      />
                    )
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DonateCause;
