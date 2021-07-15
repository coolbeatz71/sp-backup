import { isValid } from "@exuus/rwanda-phone-utils";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
import i18n from "constants/locales";
import { isEmpty } from "lodash";
import { countryList } from "./../../constants/country-list";

const formPhoneValidator = (name: string) => [
  { required: true, message: `${name} ${i18n.t("required")}` },
  {
    validator(_rule: any, value: any) {
      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (!isValid(value))
        return Promise.reject(`${name} ${i18n.t("invalid")}`);

      return Promise.resolve();
    },
  },
];

export const formWorldPhoneValidator = (name: string, countryCode: string) => [
  { required: true, message: `${name} ${i18n.t("required")}` },
  {
    validator(_rule: any, value: string) {
      const reg = new RegExp(/^[0-9]{1,13}$/);

      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (!value.match(reg)) {
        return Promise.reject(`${name} ${i18n.t("invalid")}`);
      }

      if (!countryCode && value.match(reg)) {
        return Promise.reject(
          `${i18n.t("country_code")} ${i18n.t("required")}`
        );
      }

      if (countryCode && value) {
        const fullPhone = `${countryCode}${value}`;
        const country = countryList.find(
          (country) => country.dial_code === countryCode
        );
        const code = country?.code as CountryCode;

        return parsePhoneNumber(fullPhone, code)?.isValid()
          ? Promise.resolve()
          : Promise.reject(`${name} ${i18n.t("invalid")}`);
      }

      return Promise.resolve();
    },
  },
];

export const formPhoneAndFixedValidator = () => ({
  validator(_rule: any, value: string) {
    if (
      !isEmpty(value) &&
      !isValid(value) &&
      (!value.match(/^25|5/) || value.length !== 9)
    ) {
      return Promise.reject(i18n.t("phone number should be valid"));
    }
    return Promise.resolve();
  },
});

export default formPhoneValidator;
