import React, { FC, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input as LegacyInput,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import donationTypes, { donationType } from "constants/donationTypes";
import { IUnknownObject } from "../../../../../interfaces/unknownObject";
import { validateMessages } from "constants/validationMessages";
import { countryList } from "constants/country-list";
import { truncate, isEmpty } from "lodash";
import capitalize from "helpers/capitalize";
import normalizeInputNumber, {
  sanitizeNumber,
} from "helpers/normalizeInputNumber";
import { formNamesValidator } from "utils/validators/form-names-validators";
import formPhoneValidator, {
  formWorldPhoneValidator,
} from "utils/validators/form-phone-validator";
import { useTranslation } from "react-i18next";

import { Input } from "components/common/Input";
import StackedLabel from "components/common/StackedLabel";

import styles from "./../donate.module.scss";
import { isValid, short } from "@exuus/rwanda-phone-utils";

const { Text } = Typography;
const { Option } = Select;

export interface IProps {
  form: FormInstance<any>;
  userType: donationType;
  isAnonymous: boolean;
  emailPlaceholder: string;
  loading: boolean;
  error: any;
  data: IUnknownObject;
  phone: string;
  onPhoneTyping: (value: string) => void;
  handleSubmit: (form: any) => void;
  handleValueChange: (changedField: any) => void;
}

const DonateForm: FC<IProps> = ({
  form,
  userType,
  isAnonymous,
  emailPlaceholder,
  loading,
  error,
  data,
  phone,
  onPhoneTyping,
  handleSubmit,
  handleValueChange,
}) => {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState<string>("+250");

  return (
    <Form
      form={form}
      validateMessages={validateMessages}
      onFinish={(dt) => {
        const data = { ...dt, countryCode };
        handleSubmit(data);
      }}
      onValuesChange={(dt) => {
        const data = { ...dt, countryCode };
        handleValueChange(data);
      }}
      initialValues={{
        ...data,
        type: "individual",
        payment_method: "momo",
        phone_number_world: isValid(data.phone_number)
          ? short(data.phone_number)
          : "",
      }}
    >
      <Text type="danger">{error && error.message}</Text>
      <Form.Item
        name="type"
        validateTrigger={["onSubmit", "onBlur", "onChange"]}
        rules={[
          {
            required: true,
          },
        ]}
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
            validator(_: any, value: any) {
              return !isEmpty(value) && sanitizeNumber(value) < 500
                ? Promise.reject(t("should be 500 minimum"))
                : Promise.resolve();
            },
          },
        ]}
        validateTrigger={["onSubmit", "onChange"]}
        normalize={normalizeInputNumber}
      >
        <Input prefix="RWF" placeholder={t("amount")} />
      </Form.Item>

      {userType === "individual" ? (
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="first_name"
              rules={formNamesValidator(
                `${t("minimum 3")}`,
                `${t("required")}`
              )}
              validateTrigger={["onSubmit", "onBlur"]}
            >
              <Input placeholder={t("first_name")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="last_name"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={formNamesValidator(
                `${t("minimum 3")}`,
                `${t("required")}`
              )}
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
              rules={formNamesValidator(
                `${t("minimum 3")}`,
                `${t("required")}`
              )}
            >
              <Input placeholder={t("organization name")} />
            </Form.Item>
            <Form.Item
              name="contact_person"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={formNamesValidator(
                `${t("minimum 3")}`,
                `${t("required")}`
              )}
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
        <StackedLabel label={t("select payment method")} select>
          <Select placeholder={t("select payment method")}>
            <Select.Option value="Visa_MasterCard">
              Credit/Debit Card
            </Select.Option>
            <Select.Option value="momo">Mobile Money</Select.Option>
          </Select>
        </StackedLabel>
      </Form.Item>

      {form.getFieldValue("payment_method") === "momo" ? (
        <Form.Item
          className="form-group phone-code"
          validateTrigger={["onSubmit", "onBlur"]}
          rules={formPhoneValidator(t("phone number"))}
          name="phone_number"
        >
          <StackedLabel label={t("phone number")} phone="+250">
            <LegacyInput maxLength={9} />
          </StackedLabel>
        </Form.Item>
      ) : (
        <LegacyInput.Group
          compact
          className={styles.donate__body__form__input_country}
        >
          <Select
            showSearch
            optionLabelProp="label"
            dropdownMatchSelectWidth={false}
            onChange={(value) => setCountryCode(value)}
            defaultValue={countryCode}
          >
            {countryList.map((country) => (
              <Option
                key={country.code}
                value={country.dial_code}
                label={`${country.flag}\u00A0\u00A0${country.dial_code}`}
              >
                {country.flag} {country.dial_code}{" "}
                {truncate(country.name, {
                  length: 35,
                })}{" "}
              </Option>
            ))}
          </Select>
          <div data-input>
            <Form.Item
              className="form-group phone-code"
              validateTrigger={["onSubmit", "onBlur"]}
              rules={formWorldPhoneValidator(t("phone number"), countryCode)}
              name="phone_number_world"
            >
              <Input
                value={phone}
                onChange={(e: any) => onPhoneTyping(e.target.value)}
                maxLength={13}
                placeholder={t("phone number")}
              />
            </Form.Item>
          </div>
        </LegacyInput.Group>
      )}

      <Form.Item
        name="email"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[
          {
            type: "email",
            message: t("email should be valid"),
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              const paymentMethod = getFieldValue("payment_method");
              return isEmpty(value) && paymentMethod === "Visa_MasterCard"
                ? Promise.reject(t("email is required"))
                : Promise.resolve();
            },
          }),
        ]}
      >
        <Input placeholder={emailPlaceholder} />
      </Form.Item>
      <div className={styles.donate__body__form__anonymous}>
        <Typography.Text strong>{t("anonymous")}</Typography.Text>

        <Form.Item
          validateTrigger={["onSubmit", "onBlur"]}
          name="anonymous"
          valuePropName="checked"
        >
          <Switch disabled={userType === "organization"} />
        </Form.Item>
      </div>
      {isAnonymous && (
        <p className={styles.donate__body__form__anonymous_text}>
          {t("note")}: {t("your name will not be displayed")}
        </p>
      )}
      <Row justify="end" className={styles.donate__body__form__buttons}>
        <Col>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t("donate")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DonateForm;
