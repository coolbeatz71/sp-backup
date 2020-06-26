import React from "react";
import Link from "next/link";
import styles from "./authForm.module.scss";
import { Form, Button, Typography, Divider, Row, Col } from "antd";
import { InputPassword, Input } from "components/common/Input";
import { validateMessages } from "constants/validationMessages";
import {
  IauthCurrentUser,
  authCurrentUserDefault,
} from "redux/initialStates/auth";
import phoneFormatter from "helpers/phoneNumberFormatter";
import PhoneCountrySelector from "components/common/PhoneCountrySelector";

const { Text } = Typography;

export interface AuthFormProps {
  context: "signup" | "login" | "verify-phone";
  formState: { error?: string; loading?: boolean; data?: IauthCurrentUser };
  handleSubmit: (form: {}) => void;
}

type IformAction = {
  suggestionMessage: string;
  suggestionActionText: string;
  suggestionActionUrl: string;
  text: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  context,
  handleSubmit,
  formState: { error, loading, data = authCurrentUserDefault },
}) => {
  const [form] = Form.useForm();
  const formattedData = {
    ...data,
    phone_number: phoneFormatter(data.phone_number),
  };

  const formAction = (context?: string): IformAction => {
    let formAction: IformAction = {
      suggestionMessage: "",
      suggestionActionText: "",
      suggestionActionUrl: "",
      text: "",
    };
    switch (context) {
      case "verify-phone":
        formAction = {
          suggestionMessage: "Validation Code Expires in: ",
          suggestionActionText: "60 Secs",
          suggestionActionUrl: "",
          text: "SUBMIT",
        };
        break;
      case "signup":
        formAction = {
          suggestionMessage: "Got an account ",
          suggestionActionText: "SIGN IN",
          suggestionActionUrl: "/login",
          text: "CREATE ACCOUNT",
        };
        break;
      case "login":
        formAction = {
          suggestionMessage: "New User ",
          suggestionActionText: "Create Account",
          suggestionActionUrl: "signup",
          text: "SIGN IN",
        };
        break;
      default:
        break;
    }
    return formAction;
  };

  const onSubmit = (data: any) => {
    if (data.phone_number)
      data.phone_number = phoneFormatter(data.phone_number);
    handleSubmit(data);
  };

  return (
    <div className={styles.authForm}>
      <Form
        form={form}
        initialValues={formattedData}
        validateMessages={validateMessages}
        onFinish={onSubmit}
      >
        <Text type="danger" className="mb-3 d-block">
          {error}
        </Text>
        {context === "verify-phone" && (
          <>
            <Form.Item
              name="short_code"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={[{ required: true, len: 5 }]}
            >
              <Input maxLength={5} placeholder="Enter Validation Code" />
            </Form.Item>
            <Divider orientation="left" plain={true}>
              Update Information
            </Divider>
          </>
        )}
        {["signup", "verify-phone"].includes(context) ? (
          <>
            <Form.Item className={styles.authForm__names}>
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
            </Form.Item>
            <Form.Item
              className="form-group"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={[
                { len: 9, required: true },
                {
                  pattern: /^7[238]/,
                  message: "Phone number format should be valid",
                },
              ]}
              name="phone_number"
            >
              <Input
                placeholder="Phone Number"
                addonBefore={PhoneCountrySelector}
                maxLength={9}
                disabled={context === "verify-phone"}
              />
            </Form.Item>
            <Form.Item
              className="form-group"
              rules={[
                {
                  len: 5,
                  required: true,
                  pattern: /^[0-9]{5}$/,
                  message: "Password must be number of 5 digits",
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
              name="password"
            >
              <InputPassword maxLength={5} placeholder="PIN" />
            </Form.Item>
            <Form.Item
              name="email"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={[{ min: 2, type: "email" }]}
              className="form-group"
            >
              <Input placeholder="Email (Optional)" />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              className="form-group"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={[
                { len: 9, required: true },
                {
                  pattern: /^7[238]/,
                  message: "Phone number format should be valid",
                },
              ]}
              name="phone_number"
            >
              <Input
                placeholder="Phone Number"
                addonBefore={PhoneCountrySelector}
                maxLength={9}
              />
            </Form.Item>
            <Form.Item
              className="form-group"
              rules={[
                {
                  len: 5,
                  required: true,
                  pattern: /^[0-9]{5}$/,
                  message: "Password must be number of 5 digits",
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
              name="password"
            >
              <InputPassword maxLength={5} placeholder="PIN" />
            </Form.Item>
          </>
        )}
        <div className={styles.authForm__actions}>
          <div className={styles.authForm__actions__signin}>
            <span>{formAction(context).suggestionMessage}</span>
            <Link href={formAction(context).suggestionActionUrl}>
              {formAction(context).suggestionActionText}
            </Link>
          </div>
          <Button className="btn-primary" loading={loading} htmlType="submit">
            {formAction(context).text}
          </Button>
        </div>
      </Form>
      <style jsx={true}>{`
        .form-group {
          margin-bottom: 1.3rem;
        }
      `}</style>
    </div>
  );
};

export default AuthForm;
