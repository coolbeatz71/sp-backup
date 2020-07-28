import React, { ReactElement } from "react";
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
import { authContextType } from "interfaces/authContext";
import { changeAuthContext } from "redux/actions/Auth/showAuthDialog";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface AuthFormProps {
  context: authContextType;
  formState: { error?: string; loading?: boolean; data?: IauthCurrentUser };
  handleSubmit: (form: {}) => void;
}

type IformAction = {
  suggestionMessage: string;
  suggestionActionText: string | ReactElement;
  handleSuggestionAction?: () => void;
  text: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  context,
  handleSubmit,
  formState: { error, loading, data = authCurrentUserDefault },
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formattedData = {
    ...data,
    phone_number: phoneFormatter(data.phone_number),
  };

  const formAction = (context?: authContextType): IformAction => {
    let formAction: IformAction = {
      suggestionMessage: "",
      suggestionActionText: "",
      text: "",
    };
    switch (context) {
      case "verify-phone":
        formAction = {
          suggestionMessage: "Got an account? SIGN IN with ",
          suggestionActionText: <img src="/save-sm-logo.svg" alt="save logo" />,
          handleSuggestionAction: () => changeAuthContext("login")(dispatch),
          text: "VERIFY",
        };
        break;
      case "signup":
        formAction = {
          suggestionMessage: "Got an account? SIGN IN with ",
          suggestionActionText: <img src="/save-sm-logo.svg" alt="save logo" />,
          handleSuggestionAction: () => changeAuthContext("login")(dispatch),
          text: "CREATE ACCOUNT",
        };
        break;
      case "login":
        formAction = {
          suggestionMessage: "Don’t have an Account? ",
          suggestionActionText: "Create",
          handleSuggestionAction: () => changeAuthContext("signup")(dispatch),
          text: "SIGN IN",
        };
        break;
      case "pin-reset":
      case "pin-reset-update":
        formAction = {
          suggestionMessage: "Remeber PIN? SIGN IN with ",
          suggestionActionText: <img src="/save-sm-logo.svg" alt="save logo" />,
          handleSuggestionAction: () => changeAuthContext("login")(dispatch),
          text: "RESET PIN",
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
        {error && (
          <Text type="danger" className="mb-3 d-block text-center">
            <span className="d-block">
              <ExclamationCircleOutlined className="auth-error-message" />
              {error}
            </span>
          </Text>
        )}
        {context === "pin-reset" && (
          <Form.Item
            className="form-group phone-code"
            validateTrigger={["onSubmit", "onBlur"]}
            rules={[
              {
                len: 9,
                required: true,
                pattern: /^7[238]/,
                message: "Telephone format should be 7X XX XX XXX",
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
        )}
        {context === "pin-reset-update" && (
          <>
            <Form.Item
              validateTrigger={["onSubmit", "onBlur"]}
              rules={[{ required: true, len: 5 }]}
              name="code"
            >
              <Input maxLength={5} placeholder="Enter the 5-digit code" />
            </Form.Item>
            <Form.Item
              className="form-group"
              rules={[
                {
                  len: 5,
                  required: true,
                  pattern: /^[0-9]{5}$/,
                  message: "New password must be number of 5 digits",
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
              name="new_password"
            >
              <InputPassword maxLength={5} placeholder="New password" />
            </Form.Item>
          </>
        )}
        {context === "verify-phone" && (
          <>
            <Form.Item
              name="short_code"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={[{ required: true, len: 5 }]}
            >
              <Input maxLength={5} placeholder="Enter Verification Code" />
            </Form.Item>
          </>
        )}
        {["pin-reset", "pin-reset-update", "verify-phone"].includes(
          context
        ) ? null : ["signup"].includes(context) ? (
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
              className="form-group phone-code"
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
                addonBefore="+250"
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
              className="form-group phone-code"
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
                addonBefore="+250"
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
        <Button
          className={`btn-primary ${styles.authForm__submit}`}
          loading={loading}
          htmlType="submit"
          block
        >
          {formAction(context).text}
        </Button>
        <Divider orientation="center" plain>
          OR
        </Divider>
        <div
          className={`${styles.authForm__actions} ${
            context === "login" ? "justify-content-between" : ""
          }`}
        >
          {context === "login" && (
            <Link href="">
              <a
                onClick={() => changeAuthContext("pin-reset")(dispatch)}
                className={styles.authForm__forgotPin}
              >
                Forgot PIN
              </a>
            </Link>
          )}
          <div className={styles.authForm__actions__signin}>
            <span>{formAction(context).suggestionMessage}</span>
            <Link href="">
              <a onClick={formAction(context).handleSuggestionAction}>
                {formAction(context).suggestionActionText}
              </a>
            </Link>
          </div>
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
