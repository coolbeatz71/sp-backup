import i18n from "constants/locales";

const formPinMatchValidator = (pin: string, message: string) => [
  ({ getFieldValue }: { [key: string]: any }) => ({
    validator(_rule: any, value: any) {
      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (getFieldValue(pin) !== value)
        return Promise.reject(`${i18n.t(message)} ${i18n.t("mismatch")}`);

      return Promise.resolve();
    },
  }),
];

export default formPinMatchValidator;
