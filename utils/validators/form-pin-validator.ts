import formNumericValidator from "utils/validators/form-numeric-validator";
import i18n from "constants/locales";

const formPinValidator = (name: string) => [
  { required: true, message: `${name} ${i18n.t("required")}` },
  { min: 5, max: 5, message: `${name} ${i18n.t("must have 5 digits")}` },
  formNumericValidator(name),
];

export default formPinValidator;
