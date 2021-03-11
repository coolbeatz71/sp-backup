import { isOk } from "dev-rw-phone";
import i18n from "constants/locales";
import { isEmpty } from "lodash";

const formPhoneValidator = (name: string) => [
  { required: true, message: `${name} ${i18n.t("required")}` },
  {
    validator(_rule: any, value: any) {
      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (!isOk(value)) return Promise.reject(`${name} ${i18n.t("invalid")}`);

      return Promise.resolve();
    },
  },
];

export const formPhoneAndFixedValidator = () => ({
  validator(_rule: any, value: string) {
    if (
      !isEmpty(value) &&
      !isOk(value) &&
      (!value.match(/^25|5/) || value.length !== 9)
    ) {
      return Promise.reject(i18n.t("phone number should be valid"));
    }
    return Promise.resolve();
  },
});

export default formPhoneValidator;
