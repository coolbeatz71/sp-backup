import React, { useState } from "react";
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
  Card,
  Progress,
  Input,
  Alert,
  Badge,
} from "antd";
import { CameraOutlined } from "@ant-design/icons";
import StackedLabel from "components/common/StackedLabel";
import { RcFile } from "antd/es/upload";
import { validateMessages } from "constants/validationMessages";
import { IRootState } from "redux/initialStates";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { isEmpty } from "lodash";
import abName from "helpers/abName";
import updateProfile from "redux/actions/user/updateProfile";
import Link from "next/link";
import { IUnknownObject } from "interfaces/unknownObject";
import notification from "utils/notification";
import ColorHash from "color-hash";
import PrivateComponent from "pages/privateRoute";
import Modal from "components/common/Modal";

import LayoutWrapper from "components/LayoutWrapper";

const color = new ColorHash();

const Profile: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const { data, loading: dataLoading } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );
  const { loading, error } = useSelector(
    ({ user: { updateProfile } }: IRootState) => updateProfile,
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
    <LayoutWrapper
      noFooter
      isForm
      title={`${data.first_name || "Profile"} ${data.last_name || ""}`}
    >
      <div data-content-padding className={styles.profile}>
        <Row>
          <Col
            lg={{ span: 10, offset: 7 }}
            md={{ span: 16, offset: 4 }}
            sm={{ span: 24, offset: 0 }}
          >
            <div className={styles.profile__title}>
              <img
                src="/images/family-love.svg"
                className={styles.profile__title__icon}
              />
              <Typography.Title level={2}>Your Profile</Typography.Title>
              <Typography.Paragraph strong>
                Make modifications to your profile information
                <br />
                and also fill in other relevant information
              </Typography.Paragraph>
            </div>
            <Card loading={dataLoading || isEmpty(data)}>
              <Row align="middle">
                <Col flex={1}>
                  <Typography.Title level={4}>
                    Update your personal details
                  </Typography.Title>
                  <Typography.Text>
                    Your profile is {calculatePercentage()}% complete
                  </Typography.Text>
                </Col>
                <Col>
                  <Upload
                    name="avatar"
                    accept="image/x-png,image/jpeg,image/jpg"
                    showUploadList={false}
                    multiple={false}
                    beforeUpload={handleSubmitAvatar}
                  >
                    <Spin spinning={loading}>
                      <Badge
                        count={<CameraOutlined />}
                        className={styles.profile__badge}
                      >
                        <Avatar
                          style={{
                            backgroundColor: color.hex(
                              `${data.first_name} ${data.last_name}`,
                            ),
                          }}
                          src={data.avatar}
                          size={56}
                        >
                          {abName(data.first_name, data.last_name)}
                        </Avatar>
                      </Badge>
                    </Spin>
                  </Upload>
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
                      rules={[{ required: true, min: 3 }]}
                      validateTrigger={["onSubmit", "onBlur"]}
                    >
                      <StackedLabel label="First Name" required>
                        <Input disabled={loading} />
                      </StackedLabel>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="last_name"
                      validateTrigger={["onSubmit", "onBlur"]}
                      rules={[{ required: true, min: 3 }]}
                    >
                      <StackedLabel label="Last Name" required>
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
                  <StackedLabel label="Phone Number" phone="+250" required>
                    <Input disabled={true} />
                  </StackedLabel>
                </Form.Item>
                <Form.Item
                  name="id_number"
                  rules={[{ required: true, pattern: /^[A-Za-z0-9-]{7,20}/ }]}
                  validateTrigger={["onSubmit", "onBlur"]}
                >
                  <StackedLabel label="National ID or Passport Number" required>
                    <Input disabled={loading} />
                  </StackedLabel>
                </Form.Item>
                <Form.Item
                  name="email"
                  validateTrigger={["onSubmit", "onBlur"]}
                  rules={[{ min: 2, type: "email" }]}
                >
                  <StackedLabel label="Email">
                    <Input disabled={loading} />
                  </StackedLabel>
                </Form.Item>
                <Row justify="end">
                  <Col>
                    <Button type="primary" loading={loading} htmlType="submit">
                      UPDATE
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="Thank You!"
        icon="/images/balloons.svg"
        visible={successModal}
        onCancel={() => setSuccessModal(false)}
      >
        <div className={styles.profile__success}>
          <Typography.Title level={3}>
            Your Profile has been updated!
          </Typography.Title>
          <Link href="/">
            <a>Go Back Home</a>
          </Link>
        </div>
      </Modal>
    </LayoutWrapper>
  );
};

export default PrivateComponent(Profile);
