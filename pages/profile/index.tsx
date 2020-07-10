import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile.module.scss";
import {
  Form,
  Button,
  Row,
  Col,
  Upload,
  Spin,
  Avatar,
  Typography,
  Modal,
} from "antd";
import { RcFile } from "antd/es/upload";
import randmonColor from "randomcolor";
import { Input } from "components/common/Input";
import { validateMessages } from "constants/validationMessages";
import { IRootState } from "redux/initialStates";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { isEmpty } from "lodash";
import abName from "helpers/abName";
import updateProfile from "redux/actions/user/updateProfile";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import Link from "next/link";
import PhoneCountrySelector from "components/common/PhoneCountrySelector";
import { IUnknownObject } from "interfaces/unknownObject";
import notification from "utils/notification";
import { LoadingOutlined } from "@ant-design/icons";

export interface ProfileProps {}

const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;


const Profile: React.FC<ProfileProps> = () => {
  const [form] = Form.useForm();
  const color = randmonColor();
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser(dispatch);
  }, []);

  const { data, loading: dataLoading } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser
  );
  const { loading, error } = useSelector(
    ({ user: { updateProfile } }: IRootState) => updateProfile
  );

  const onSubmit = (form: any) => {
    const formattedData: { [key: string]: any } = {
      ...form,
      phone_number: phoneFormatter(form.phone_number),
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
      phone_number: phoneFormatter(data.phone_number),
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
      notification("Avatar must smaller than 2MB!", "error");
      return false;
    }
    updateProfile(formData, true)(dispatch, setSuccessModal);
    return true;
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <div className={styles.profile__header__title}>
          <img src="/icons/social-care.svg" alt="" />
          <h4>Your Profile</h4>
        </div>
        <p>
          Make modifications to your profile information and also fill in other
          relevant information
        </p>
      </div>
      <div className={styles.profile__body}>
        <div className={styles.profile__body__form}>
          <div className="d-flex justify-content-between">
            <div className="title-left">
              <h5 className={styles.profile__body__form__title}>
                Update your personal details
              </h5>
            </div>
            <Upload
              name="avatar"
              accept="image/x-png,image/jpeg,image/jpg"
              showUploadList={false}
              multiple={false}
              beforeUpload={handleSubmitAvatar}
            >
              <div className={styles.profile__body__form__avatar}>
                {loading && <Spin indicator={antIcon} />}
                {data.avatar ? (
                  <img src={data.avatar} alt="avatar" />
                ) : (
                  <Avatar style={{ backgroundColor: color }} size="large">
                    {abName(data.first_name, data.last_name)}
                  </Avatar>
                )}
                <div className={styles.profile__body__form__avatar__pen}>
                  <img
                    src="/icons/camera.png"
                    alt="avatar"
                    className={styles.navbar__profile__avatar}
                  />
                </div>
              </div>
            </Upload>
          </div>
          <div className={styles.profile__body__form__progress}>
            <p>Your profile is {calculatePercentage()}% complete</p>
            <div className="progress__bar" />
            <div className={styles.profile__body__form__progress__progressBar}>
              <div
                className={`progression ${styles.profile__body__form__progress__progressBar__progression}`}
              />
            </div>
          </div>
          {dataLoading || isEmpty(data) ? (
            <Spin />
          ) : (
            <Form
              form={form}
              initialValues={formattedData()}
              validateMessages={validateMessages}
              onFinish={onSubmit}
            >
              <Text type="danger" className="mb-3 d-block">
                {error}
              </Text>

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
              <Form.Item
                name="email"
                validateTrigger={["onSubmit", "onBlur"]}
                rules={[{ min: 2, type: "email" }]}
              >
                <Input placeholder="Email (Optional)" />
              </Form.Item>
              <Form.Item
                className="form-group"
                validateTrigger={["onSubmit", "onBlur"]}
                rules={[{ len: 9, required: true }]}
                name="phone_number"
              >
                <Input
                  placeholder="Phone Number"
                  addonBefore={PhoneCountrySelector}
                  maxLength={9}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item
                name="id_number"
                rules={[{ required: true, pattern: /^[A-Za-z0-9-]{7,20}/ }]}
                validateTrigger={["onSubmit", "onBlur"]}
              >
                <Input placeholder="National ID or Passport Number" />
              </Form.Item>
              <Button
                className="btn-primary"
                loading={loading}
                htmlType="submit"
              >
                UPDATE
              </Button>
            </Form>
          )}
        </div>
      </div>
      <Modal
        visible={successModal}
        onCancel={() => setSuccessModal(false)}
        footer={false}
      >
        <div className={styles.profile__success}>
          <img src="/balloons.svg" alt="balloons success" />
          <h5>Thank you! Your Profile has been updated</h5>
          <Link href="/">
            <a>Go Back Home</a>
          </Link>
        </div>
      </Modal>
      <style jsx>{`
        .progression {
          width: ${calculatePercentage()}%;
        }
        .title-left {
          width: 75%;
        }
      `}</style>
    </div>
  );
};

export default Profile;
