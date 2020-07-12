import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactStars from "react-star-rating-component";
import styles from "./donate.module.scss";
import {
  Form,
  Select,
  Row,
  Col,
  Switch,
  Button,
  Modal,
  Typography,
  Spin,
} from "antd";
import { validateMessages } from "constants/validationMessages";
import { Input } from "components/common/Input";
import donationTypes, { donationType } from "constants/donationTypes";
import capitalize from "helpers/capitalize";
import { mobileMoney } from "constants/paymentMethods";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { IRootState } from "redux/initialStates";
import getPlatformUrl from "helpers/getPlatformUrl";
import rateCause from "redux/actions/cause/rateCause";
import donateCause from "redux/actions/cause/donateCause";
import { IUnknownObject } from "interfaces/unknownObject";
import normalizeInputNumber from "helpers/normalizeInputNumber";
import serializeFormattedNumber from "helpers/serializeFormattedNumber";
import { isEmpty } from "lodash";

export interface DonateCauseProps {}

const { Text } = Typography;

const DonateCause: React.FC<DonateCauseProps> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<donationType>("individual");
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [donationSuccessful, setDonationSuccessful] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedTelco, setSelectedTelco] = useState<string>("default");
  const router = useRouter();
  const { slug } = router.query;
  const phoneNumberValidation: {
    [key: string]: { regex: RegExp; message: string };
  } = {
    default: {
      regex: /$^/,
      message: "You should first select payment method",
    },
    MTN_Rwanda: {
      regex: /^78/,
      message: "Phone number should be a valid Mtn number",
    },
    Airtel_Rwanda: {
      regex: /^7[23]/,
      message: "Phone number should be a valid Airtel number",
    },
  };

  const { data: cause } = useSelector(
    ({ cause: { single } }: IRootState) => single,
  );

  const { loading, error } = useSelector(
    ({ cause: { donate } }: IRootState) => donate,
  );

  const { isLoggedin, data, loading: userDataLoading } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  if (data.phone_number) data.phone_number = phoneFormatter(data.phone_number);

  const URL = `${getPlatformUrl()}/causes/${slug}`;
  let encodedURL = "";
  if (cause.summary) encodedURL = encodeURI(`${cause.summary} \n\n${URL}`);

  const formatData = (data: IUnknownObject) => {
    if (data.email === "") delete data.email;
    return {
      ...data,
      amount: serializeFormattedNumber(data.amount),
      phone_number: phoneFormatter(data.phone_number),
    };
  };

  const handleSubmit = (form: any) => {
    const formattedData = formatData(form);
    donateCause(slug, formattedData)(
      setConfirmationModal,
      setDonationSuccessful,
      dispatch,
    );
  };

  const handleSelect = (option: any) => setSelectedTelco(option);

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
    if (!isLoggedin) return router.push("/login");
    rateCause(slug, { rating: nextValue });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.donate}>
      <div className={styles.donate__body}>
        <div className={styles.donate__body__header}>
          {!donationSuccessful && <h4>Donate for a Cause</h4>}
        </div>
        <div className={styles.donate__body__form}>
          {donationSuccessful ? (
            <div className={styles.donate__body__form__successful}>
              <h4>Thank You for donating</h4>
              <Link href="/">
                <a>Back Home</a>
              </Link>
              <div className={styles.donate__body__form__successful__share}>
                <span>Share</span>
                <a rel="stylesheet" onClick={() => setModalVisible(true)}>
                  <img
                    className="social__share__icon"
                    src="/icons/smartphone-ussd.svg"
                    alt=""
                  />
                </a>
                <a
                  rel="stylesheet"
                  href={`https://www.facebook.com/sharer/sharer.php?display=page&u=${URL}&quote=${cause.summary}`}
                  target="_blank"
                >
                  <img
                    className="social__share__icon"
                    src="/icons/facebook-share.svg"
                    alt=""
                  />
                </a>
                <a
                  rel="stylesheet"
                  href={`https://api.whatsapp.com/send?text=${encodedURL}`}
                  target="_blank"
                >
                  <img
                    className="social__share__icon"
                    src="/icons/whatsapp-share.svg"
                    alt=""
                  />
                </a>
                <a
                  rel="stylesheet"
                  href={`http://twitter.com/share?text=${encodedURL}`}
                  target="_blank"
                >
                  <img
                    className="social__share__icon"
                    src="/icons/twitter-share.svg"
                    alt=""
                  />
                </a>
              </div>
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
              <Link href="">
                <a>Mobile App on Android & iOS Coming Soon</a>
              </Link>
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
                <Form
                  form={form}
                  validateMessages={validateMessages}
                  onFinish={handleSubmit}
                  onValuesChange={handleValueChange}
                  initialValues={{ ...data, type: "individual" }}
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
                    name="payment_method"
                    validateTrigger={["onSubmit", "onBlur", "onChange"]}
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Select Donation Method"
                      onSelect={handleSelect}
                    >
                      {mobileMoney.map(({ name, text }) => (
                        <Select.Option key={name} value={name}>
                          {capitalize(text)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="form-group phone-code"
                    validateTrigger={["onSubmit", "onBlur"]}
                    rules={[
                      { len: 9, required: true },
                      {
                        pattern: phoneNumberValidation[selectedTelco].regex,
                        message: phoneNumberValidation[selectedTelco].message,
                      },
                    ]}
                    name="phone_number"
                  >
                    <Input
                      placeholder="Phone Number"
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
                      <Switch />
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
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        visible={!error?.message && confirmationModal}
        footer={false}
        closable={false}
        maskStyle={{ background: "#000000b3" }}
      >
        <div className={styles.donate__confirmationModal}>
          <h4>Kindly confirm your Donation</h4>
          <p>
            Confirm the payment on your phone +
            {form.getFieldValue("phone_number") &&
              phoneFormatter(form.getFieldValue("phone_number"))}
          </p>
        </div>
      </Modal>
      <Modal visible={modalVisible} onCancel={handleModalCancel} footer={false}>
        <h6 className="text-center mt-5">
          Make your donation using the USSD Code
        </h6>
        <h6 className="my-4 text-center">{`*777*77*${cause.till_number}#`}</h6>
      </Modal>
    </div>
  );
};

export default DonateCause;
