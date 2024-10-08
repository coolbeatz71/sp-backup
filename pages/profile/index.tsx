import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import styles from "./profile.module.scss";
import Img from "react-optimized-image";
import Link from "next/link";
import {
  Form,
  Button,
  Row,
  Col,
  Spin,
  Typography,
  Card,
  Progress,
  Input,
  Alert,
} from "antd";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import { RcFile } from "antd/es/upload";
import { validateMessages } from "constants/validationMessages";
import { IRootState } from "redux/initialStates";
import updateProfile from "redux/actions/user/updateProfile";
import PhoneUtils from "@exuus/rwanda-phone-utils";
import { IUnknownObject } from "interfaces/unknownObject";
import notification from "utils/notification";

import StackedLabel from "components/common/StackedLabel";
import Modal from "components/common/Modal";
import CropImage from "components/common/CropImage";
import LayoutWrapper from "components/LayoutWrapper";

import family from "public/images/family-love.svg";
import { getLanguage } from "helpers/getLanguage";
import requireAuth, { checkUserAuth } from "helpers/requiresAuth";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = requireAuth(
  async (context: GetServerSidePropsContext) => checkUserAuth(context)
);

const Profile: FC<{}> = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [avatarKey, setAvatarKey] = useState(0);

  const {
    isLoggedin,
    data,
    loading: dataLoading,
  } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
  const { loading, error } = useSelector(
    ({ user: { updateProfile } }: IRootState) => updateProfile
  );

  const lang = data.lang || getLanguage();

  useEffect(() => {
    if (!dataLoading && isLoggedin && isEmpty(data)) {
      getCurrentUser(dispatch);
    }
    // tslint:disable-next-line: align
  }, []);

  const onSubmit = (form: any) => {
    const formattedData: { [key: string]: any } = {
      ...form,
      phone_number: PhoneUtils(form.phone_number).short,
    };
    const formData = new FormData();
    Object.keys(formattedData).forEach((key) => {
      if (key !== "phone_number") formData.append(key, formattedData[key]);
    });
    updateProfile(formData)(dispatch, setSuccessModal);
  };

  const formattedData = () => {
    return {
      ...data,
      phone_number: PhoneUtils(data.phone_number).short,
    };
  };

  const calculatePercentage = () => {
    if (!isEmpty(data)) {
      const fieldsToFill = [
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "id_number",
        "avatar",
      ];
      const fields = fieldsToFill.reduce((accumulator, currentValue) => {
        if (data[currentValue]) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);
      const precisePercentage = (fields * 100) / 6;
      return Number(precisePercentage.toFixed(0));
    }
    return 0;
  };

  const handleSubmitAvatar = (file: RcFile): boolean => {
    const form: IUnknownObject = {
      avatar: file,
    };
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    const isLessThan2MB = file.size / 1024 / 1024 < 2;
    if (!isLessThan2MB) {
      notification(
        t("avatar should be smaller than", {
          size: "2MB",
        }),
        "error"
      );
      return false;
    }
    updateProfile(formData, true)(dispatch, setSuccessModal);
    return true;
  };

  return (
    <LayoutWrapper
      noFooter
      isForm
      title={`${data.first_name || t("profile")} ${data.last_name || ""}`}
    >
      <div data-content-padding className={styles.profile}>
        <Row>
          <Col
            lg={{ span: 10, offset: 7 }}
            md={{ span: 16, offset: 4 }}
            sm={{ span: 24, offset: 0 }}
          >
            <div className={styles.profile__title}>
              <Img
                src={family}
                className={styles.profile__title__icon}
                alt="profile image"
              />
              <Typography.Title level={2}>{t("your profile")}</Typography.Title>
              <Typography.Paragraph strong>
                {t("make profile modifications")}
                <br />
                {t("fill relevant information")}
              </Typography.Paragraph>
            </div>
            <Card loading={dataLoading || isEmpty(data)}>
              <Row align="middle">
                <Col flex={1}>
                  <Typography.Title level={4}>
                    {t("update your personal details")}
                  </Typography.Title>
                  <Typography.Text>
                    {t("profile_complete", {
                      percentage: calculatePercentage(),
                    })}
                  </Typography.Text>
                </Col>
                <Col>
                  <Spin spinning={loading}>
                    <CropImage
                      key={avatarKey}
                      isProfile
                      file={[]}
                      image={data.avatar || null}
                      onCancel={() => {
                        setAvatarKey(avatarKey + 1);
                      }}
                      onOk={(_image: any, _file: any[], uploadFile: any) => {
                        setAvatarKey(avatarKey + 1);
                        handleSubmitAvatar(uploadFile);
                      }}
                    />
                  </Spin>
                </Col>
              </Row>
              <Row gutter={[0, 24]}>
                <Col flex={1}>
                  <Progress
                    percent={calculatePercentage()}
                    showInfo={false}
                    strokeColor="#219bb2"
                  />
                </Col>
              </Row>
              <Form
                form={form}
                initialValues={formattedData()}
                validateMessages={validateMessages}
                onFinish={onSubmit}
              >
                {error && (
                  <Form.Item>
                    <Alert message={error} type="error" showIcon />
                  </Form.Item>
                )}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="first_name"
                      rules={[
                        {
                          required: true,
                          min: 3,
                          message: t("should be min", {
                            min: 3,
                          }),
                        },
                      ]}
                      validateTrigger={["onSubmit", "onBlur"]}
                    >
                      <StackedLabel label={t("first_name")} required>
                        <Input disabled={loading} />
                      </StackedLabel>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="last_name"
                      validateTrigger={["onSubmit", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          min: 3,
                          message: t("should be min", {
                            min: 3,
                          }),
                        },
                      ]}
                    >
                      <StackedLabel label={t("last_name")} required>
                        <Input disabled={loading} />
                      </StackedLabel>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  className="form-group phone-code"
                  validateTrigger={["onSubmit", "onBlur"]}
                  rules={[{ len: 9, required: true }]}
                  name="phone_number"
                >
                  <StackedLabel label={t("phone number")} phone="+250" required>
                    <Input disabled={true} />
                  </StackedLabel>
                </Form.Item>
                <Form.Item
                  name="id_number"
                  rules={[{ required: true, pattern: /^[A-Za-z0-9-]{7,20}/ }]}
                  validateTrigger={["onSubmit", "onBlur"]}
                >
                  <StackedLabel label={t("national id")} required>
                    <Input disabled={loading} />
                  </StackedLabel>
                </Form.Item>
                <Form.Item
                  name="email"
                  validateTrigger={["onSubmit", "onBlur"]}
                  rules={[{ min: 2, type: "email" }]}
                >
                  <StackedLabel label={t("email")}>
                    <Input disabled={loading} />
                  </StackedLabel>
                </Form.Item>
                <Row justify="end">
                  <Col>
                    <Button type="primary" loading={loading} htmlType="submit">
                      {t("update").toUpperCase()}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title={`${t("thank you")}!`}
        icon="/images/balloons.svg"
        visible={successModal}
        onCancel={() => setSuccessModal(false)}
      >
        <div className={styles.profile__success}>
          <Typography.Title level={3}>
            {t("profile has been updated")}
          </Typography.Title>
          <Link href={`/?lang=${lang}`}>
            <a rel="noreferrer noopener">{t("back home")}</a>
          </Link>
        </div>
      </Modal>
    </LayoutWrapper>
  );
};

export default Profile;
