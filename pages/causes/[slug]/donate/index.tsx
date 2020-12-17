import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactStars from "react-star-rating-component";
import styles from "./donate.module.scss";
import { normalize, telco } from "dev-rw-phone";
import {
  Form,
  Select,
  Row,
  Col,
  Switch,
  Button,
  Typography,
  Spin,
  Input as LegacyInput,
} from "antd";
import { validateMessages } from "constants/validationMessages";
import donationTypes, { donationType } from "constants/donationTypes";
import capitalize from "helpers/capitalize";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { IRootState } from "redux/initialStates";
import rateCause from "redux/actions/cause/rateCause";
import donateCause from "redux/actions/cause/donateCause";
import { IUnknownObject } from "interfaces/unknownObject";
import normalizeInputNumber from "helpers/normalizeInputNumber";
import serializeFormattedNumber from "helpers/serializeFormattedNumber";
import { isEmpty } from "lodash";
import getTelco from "helpers/getTelco";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import getSingle from "redux/actions/cause/getSingle";
import formPhoneValidator from "utils/validators/form-phone-validator";
import { Input } from "components/common/Input";
import { useTranslation } from "react-i18next";

import AccessCode from "components/Cause/Single/AccessCode";
import Error from "components/common/Error";
import Layout from "components/LayoutWrapper";
import StackedLabel from "components/common/StackedLabel";
import SharePopover from "components/common/SharePopover";
import CauseCard from "components/cards/Cause";

const { Text } = Typography;

const DonateCause: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<donationType>("individual");
  const [donationSuccessful, setDonationSuccessful] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [selectedTelco, setSelectedTelco] = useState<string>("default");
  const router = useRouter();
  const [fetched, setFetched] = useState(false);
  const [isFormDataReady, setFormDataReadiness] = useState<boolean>(false);
  const { slug } = router.query;

  const { t } = useTranslation();

  const {
    data: cause,
    loading: loadingCause,
    error: errorCause,
    accessCode,
  } = useSelector(({ cause: { single } }: IRootState) => single);

  const { loading, error } = useSelector(
    ({ cause: { donate } }: IRootState) => donate,
  );

  const { isLoggedin, data, loading: userDataLoading } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  useEffect(() => {
    if (slug && !fetched) {
      getSingle(slug, accessCode ? { access_code: accessCode } : {})(dispatch);
      setFetched(true);
    }
  }, [slug, fetched]);

  useEffect(() => {
    if (donationSuccessful) window?.scrollTo({ top: 0 });
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

  const formatData = (data: IUnknownObject) => {
    if (isEmpty(data.email)) delete data.email;
    return {
      ...data,
      amount: serializeFormattedNumber(data.amount),
      phone_number: normalize(data.phone_number),
      payment_method: getTelco(data.phone_number),
    };
  };

  const handleSubmit = (form: any) => {
    const formattedData = formatData(form);
    donateCause(slug, formattedData, { access_code: accessCode })(
      setDonationSuccessful,
      dispatch,
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
      if (changedField.payment_method === "MTN_Rwanda") {
        form.setFieldsValue({
          phone_number: "78",
        });
      } else if (changedField.payment_method === "Airtel_Rwanda") {
        form.setFieldsValue({
          phone_number: "73",
        });
      }
    }
  };

  const handleRating = (nextValue: number) => {
    setRating(nextValue);
    if (!isLoggedin) return showAuthDialog(true)(dispatch);
    rateCause(slug, { rating: nextValue });
  };

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
                <div className={styles.donate__body__form__successful}>
                  <h5>{t("confirm your donation")}</h5>
                  <p
                    className={styles.donate__body__form__successful__subtitle}
                  >
                    {t("enter pin and confirm via momo")} &nbsp; +
                    {form.getFieldValue("phone_number") &&
                      phoneFormatter(form.getFieldValue("phone_number"))}{" "}
                  </p>

                  <h4>{t("thank you")}</h4>
                  <img
                    className={styles.donate__body__form__successful__confeti}
                    src="/confeti.gif"
                    alt="Confetti GIF"
                  />

                  <Link href={`/causes/${slug}`}>
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

                  <div className={styles.donate__body__form__successful__rate}>
                    <span>{t("rate this cause")}</span>
                    <ReactStars
                      starCount={5}
                      name="rate1"
                      value={rating}
                      onStarClick={handleRating}
                      starColor="#F4A86C"
                      emptyStarColor="#ddd"
                    />
                  </div>
                  <div
                    className={
                      styles.donate__body__form__successful__comingSoon
                    }
                  >
                    <span>{t("mobile_apps_coming_soon")}</span>
                  </div>
                </div>
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
                      <Form
                        form={form}
                        validateMessages={validateMessages}
                        onFinish={handleSubmit}
                        onValuesChange={handleValueChange}
                        initialValues={{
                          ...data,
                          type: "individual",
                          payment_method:
                            telco(data.phone_number) === "Airtel"
                              ? "Airtel_Rwanda"
                              : "MTN_Rwanda",
                        }}
                      >
                        <Text type="danger" className="mb-3 d-block">
                          {error && error.message}
                        </Text>
                        <Form.Item
                          name="type"
                          validateTrigger={["onSubmit", "onBlur", "onChange"]}
                          rules={[{ required: true }]}
                        >
                          <Select placeholder={t("type")}>
                            {donationTypes.map((type, index) => (
                              <Select.Option key={index} value={type}>
                                {capitalize(t(type))}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="amount"
                          rules={[
                            {
                              required: true,
                              message: `${t("amount")} ${t("required")}`,
                            },
                            {
                              pattern: /([1-9][\d,]{2,})$$/g,
                              message: t("should be 100 minimum"),
                            },
                          ]}
                          validateTrigger={["onSubmit", "onBlur"]}
                          normalize={normalizeInputNumber}
                        >
                          <Input prefix="RWF" placeholder={t("amount")} />
                        </Form.Item>
                        {userType === "individual" ? (
                          <Row gutter={8}>
                            <Col span={12}>
                              <Form.Item
                                name="first_name"
                                rules={[{ required: true, min: 3 }]}
                                validateTrigger={["onSubmit", "onBlur"]}
                              >
                                <Input placeholder={t("first_name")} />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name="last_name"
                                validateTrigger={["onSubmit", "onBlur"]}
                                rules={[{ required: true, min: 3 }]}
                              >
                                <Input placeholder={t("last_name")} />
                              </Form.Item>
                            </Col>
                          </Row>
                        ) : (
                          userType === "organization" && (
                            <>
                              <Form.Item
                                name="organization_name"
                                validateTrigger={["onSubmit", "onBlur"]}
                                rules={[{ required: true, min: 3 }]}
                              >
                                <Input placeholder={t("organization name")} />
                              </Form.Item>
                              <Form.Item
                                name="contact_person"
                                validateTrigger={["onSubmit", "onBlur"]}
                                rules={[{ required: true, min: 3 }]}
                              >
                                <Input placeholder={t("contact person")} />
                              </Form.Item>
                            </>
                          )
                        )}
                        <Form.Item
                          name="payment_method"
                          rules={[
                            {
                              required: true,
                              message: t("payment method is required"),
                            },
                          ]}
                        >
                          <StackedLabel
                            label={t("select payment method")}
                            select
                          >
                            <Select placeholder={t("select payment method")}>
                              <Select.Option value="MTN_Rwanda">
                                MTN Mobile Money
                              </Select.Option>
                              <Select.Option value="Airtel_Rwanda">
                                Airtel Money
                              </Select.Option>
                            </Select>
                          </StackedLabel>
                        </Form.Item>
                        <Form.Item
                          className="form-group phone-code"
                          validateTrigger={["onSubmit", "onBlur"]}
                          rules={[
                            ...formPhoneValidator(t("phone number")),
                            {
                              validator(_rule: any, value: any) {
                                const {
                                  payment_method: paymentMethod,
                                } = form.getFieldsValue();
                                if (
                                  paymentMethod === "MTN_Rwanda" &&
                                  telco(value) !== "MTN"
                                ) {
                                  return Promise.reject(
                                    t("should be a valid mtn"),
                                  );
                                }
                                if (
                                  paymentMethod === "Airtel_Rwanda" &&
                                  telco(value) !== "Airtel"
                                ) {
                                  return Promise.reject(
                                    t("should be a valid airtel"),
                                  );
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}
                          name="phone_number"
                        >
                          <StackedLabel label={t("phone number")} phone="+250">
                            <LegacyInput maxLength={9} />
                          </StackedLabel>
                        </Form.Item>
                        <Form.Item
                          name="email"
                          validateTrigger={["onSubmit", "onBlur"]}
                          rules={[{ min: 3, type: "email" }]}
                        >
                          <Input
                            placeholder={`${t("email")} (${t("optional")})`}
                          />
                        </Form.Item>
                        <div className="d-flex">
                          <span className="font-weight-bold">
                            {t("anonymous")}
                          </span>
                          <Form.Item
                            className="form-group ml-3 mb-1"
                            validateTrigger={["onSubmit", "onBlur"]}
                            name="anonymous"
                            valuePropName="checked"
                          >
                            <Switch disabled={userType === "organization"} />
                          </Form.Item>
                        </div>
                        {isAnonymous && (
                          <p className="note mb-4">
                            {t("note")}: {t("your name will not be displayed")}
                          </p>
                        )}
                        <Row justify="end">
                          <Col>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                            >
                              {t("donate")}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
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
