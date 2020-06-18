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

export interface ProfileProps { }

const { Text } = Typography;

const Profile: React.FC<ProfileProps> = () => {
  const [form] = Form.useForm();
  const color = randmonColor();
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser(dispatch);
  }, []);

  const { data, loading: dataLoading } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
  const { loading, error } = useSelector(({ user: { updateProfile } }: IRootState) => updateProfile);

  const onSubmit = (form: any) => {
    const formattedData: { [key: string]: any } = {
      ...form,
      phone_number: phoneFormatter(form.phone_number),
    };
    if (form.avatar) {
      formattedData.avatar = form.avatar.originFileObj;
    } else {
      delete  formattedData.avatar;
    }
    const formData = new FormData();
    Object.keys(formattedData).forEach((key) => {
      if (key !== "phone_number") formData.append(key, formattedData[key]);
    });
    updateProfile(formData)(dispatch, setSuccessModal);
  };

  const formattedData = () => {
    return ({
      ...data,
      phone_number: phoneFormatter(data.phone_number),
    });
  }


  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList[0];
  };

  const calculatePercentage = () => {
    if (!isEmpty(data)) {
      const fieldsToFill = ["first_name", "last_name", "email", "phone_number", "id_number", "avatar"];
      const fields = fieldsToFill.reduce((accumulator, currentValue) => {
        if (data[currentValue]) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);
      const precisePercentage = (fields * 100) / 6;
      return Number((precisePercentage).toFixed(0));
    }
    return 0;
  };


  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <div className={styles.profile__header__title}>
          <img src="/icons/social-care.svg" alt="" />
          <h4>Your Profile</h4>
        </div>
        <p>
          Make modfications to your profile information and also fill in other
          relevant information
        </p>
      </div>
      <div className={styles.profile__body}>
        <div className={styles.profile__body__form}>
          <div className="d-flex justify-content-between">
            <div className="title-left mb-4">
              <h5 className={styles.profile__body__form__title}>Update your personal details</h5>
              <div className={styles.profile__body__form__progress}>
                <p>Your profile is {calculatePercentage()}% complete</p>
                <div className="progress__bar" />
                <div className={styles.profile__body__form__progress__progressBar}>
                  <div
                    className={`progression ${styles.profile__body__form__progress__progressBar__progression}`}
                  />
                </div>
              </div>
            </div>
            {data.avatar ? (
              <img
                src={data.avatar}
                alt="avatar"
                className={styles.navbar__profile__avatar}
              />
            ) : (
                <Avatar style={{ backgroundColor: color }}>
                  {abName(data.first_name, data.last_name)}
                </Avatar>
              )}
          </div>
          {dataLoading || isEmpty(data) ? <Spin /> : (
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
              <Form.Item className={styles.profile__draggable} >
                <Form.Item name="avatar" rules={[{ required: !data.avatar }]} valuePropName="avatar" getValueFromEvent={normFile} noStyle>
                  <Upload.Dragger
                    accept="image/x-png,image/jpeg,image/jpg"
                    name="files"
                    listType="picture"
                    multiple={false}>
                    <p className="ant-upload-hint">Upload profile picture</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Button
                className="btn-primary"
                loading={loading}
                htmlType="submit"
              >
                UPDATE & SAVE
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
        .progression{
          width: ${calculatePercentage()}%;
        }
        .title-left{
          width: 53%;
        }
      `}</style>
    </div>
  );
};

export default Profile;
