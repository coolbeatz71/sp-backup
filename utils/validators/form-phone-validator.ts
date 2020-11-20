import { isOk } from "dev-rw-phone";
import i18n from "constants/locales";

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

export default formPhoneValidator;
