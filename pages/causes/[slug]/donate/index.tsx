import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactStars from "react-star-rating-component";
import styles from "./donate.module.scss";
import { Form, Select, Row, Col, Switch, Button, Typography, Spin } from "antd";
import { validateMessages } from "constants/validationMessages";
import { Input, InputPhoneNumber } from "components/common/Input";
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
import Share from "components/common/Share";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import getSingle from "redux/actions/cause/getSingle";
import AccessCode from "components/Cause/Single/AccessCode";
import Error from "components/common/Error";

export interface DonateCauseProps {}

const { Text } = Typography;

const DonateCause: React.FC<DonateCauseProps> = () => {
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

  const {
    data: cause,
    loading: loadingCause,
    error: errorCause,
    accessCode,
  } = useSelector(({ cause: { single } }: IRootState) => single);

  if (slug && !fetched) {
    getSingle(slug)(dispatch);
    setFetched(true);
  }

  const { loading, error } = useSelector(
    ({ cause: { donate } }: IRootState) => donate
  );

  const { isLoggedin, data, loading: userDataLoading } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser
  );

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
    if (data.email === "") delete data.email;
    return {
      ...data,
      amount: serializeFormattedNumber(data.amount),
      phone_number: phoneFormatter(data.phone_number),
      payment_method: getTelco(data.phone_number),
    };
  };

  const handleSubmit = (form: any) => {
    const formattedData = formatData(form);
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
  };

  const handleRating = (nextValue: number) => {
    setRating(nextValue);
    if (!isLoggedin) return showAuthDialog(true)(dispatch);
    rateCause(slug, { rating: nextValue });
  };

  return (
    <div className={styles.donate}>
      {loadingCause ? (
        <div className={styles.donate__spinner}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : errorCause && !accessCode ? (
        errorCause?.status === 403 || errorCause?.status === 400 ? (
          <AccessCode slug={slug} error={errorCause} />
        ) : (
          <Error
            status={errorCause.status || 500}
            message={errorCause.message}
          />
        )
      ) : (
        <div className={styles.donate__body}>
          <div className={styles.donate__body__header}>
            {!donationSuccessful && <h4>Donate for a Cause</h4>}
          </div>
          <div className={styles.donate__body__form}>
            {donationSuccessful ? (
              <div className={styles.donate__body__form__successful}>
                <h5>Kindly confirm your Donation</h5>
                <p className={styles.donate__body__form__successful__subtitle}>
                  Enter your PIN and confirm the payment on your phone number +
                  {form.getFieldValue("phone_number") &&
                    phoneFormatter(form.getFieldValue("phone_number"))}{" "}
                </p>

                <h4>Thank You</h4>
                <img
                  className={styles.donate__body__form__successful__confeti}
                  src="/confeti.gif"
                  alt=""
                />

                <Link href="/">
                  <a>Back Home</a>
                </Link>
                <Share
                  title={cause.name}
                  slug={slug}
                  tillNumber={cause.till_number}
                  position="center"
                />
                <div className={styles.donate__body__form__successful__rate}>
                  <span>Rate this cause</span>
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
                  className={styles.donate__body__form__successful__comingSoon}
                >
                  <span>Mobile App on Android & iOS Coming Soon</span>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.donate__body__form__header}>
                  <h6>Thank you for your support</h6>
                  <p>
                    We appreciate your support for this cause. We currently take
                    donation using Mobile Money
                  </p>
                </div>
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
                        <Select placeholder="Type">
                          {donationTypes.map((type, index) => (
                            <Select.Option key={index} value={type}>
                              {capitalize(type)}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="amount"
                        rules={[
                          { required: true, message: "Amount is required" },
                          {
                            pattern: /([1-9][\d,]{2,})$$/g,
                            message:
                              "The amount should be valid with a minimum of 100 rwf",
                          },
                        ]}
                        validateTrigger={["onSubmit", "onBlur"]}
                        normalize={normalizeInputNumber}
                      >
                        <Input
                          prefix="RWF"
                          placeholder="Amount Donate"
                          className="prefixed"
                        />
                      </Form.Item>
                      {userType === "individual" ? (
                        <Row gutter={8}>
                          <Col span={12}>
                            <Form.Item
                              name="first_name"
                              rules={[{ required: true, min: 3 }]}
                              validateTrigger={["onSubmit", "onBlur"]}
                            >
                              <Input placeholder="First Name" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="last_name"
                              validateTrigger={["onSubmit", "onBlur"]}
                              rules={[{ required: true, min: 3 }]}
                            >
                              <Input placeholder="Last Name" />
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
                              <Input placeholder="Organization Name" />
                            </Form.Item>
                            <Form.Item
                              name="contact_person"
                              validateTrigger={["onSubmit", "onBlur"]}
                              rules={[{ required: true, min: 3 }]}
                            >
                              <Input placeholder="Contact Person" />
                            </Form.Item>
                          </>
                        )
                      )}
                      <Form.Item
                        className="form-group phone-code"
                        validateTrigger={["onSubmit", "onBlur"]}
                        rules={[
                          { required: true },
                          {
                            pattern: /^7[238]\d{7}/,
                            message: "Telephone format should be 7X XX XX XXX",
                          },
                        ]}
                        name="phone_number"
                      >
                        <InputPhoneNumber
                          placeholder="Phone Number (7XXX)"
                          addonBefore="+250"
                          maxLength={9}
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        validateTrigger={["onSubmit", "onBlur"]}
                        rules={[{ min: 3, type: "email" }]}
                      >
                        <Input placeholder="Email Address" />
                      </Form.Item>
                      <div className="d-flex">
                        <span className="font-weight-bold">Anonymous</span>
                        <Form.Item
                          className="form-group ml-3 mb-1"
                          validateTrigger={["onSubmit", "onBlur"]}
                          name="anonymous"
                        >
                          <Switch disabled={userType === "organization"} />
                        </Form.Item>
                      </div>
                      {isAnonymous && (
                        <p className="note mb-4">
                          Note: Your name will not be displayed
                        </p>
                      )}
                      <div className="d-flex mb-3">
                        <Button
                          htmlType="submit"
                          loading={loading}
                          className="btn-primary ml-auto"
                        >
                          DONATE
                        </Button>
                      </div>
                    </Form>
                  )
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateCause;
