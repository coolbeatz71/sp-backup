import formNumericValidator from "utils/validators/form-numeric-validator";

const formPinValidator = (name: string) => [
  { required: true, message: `${name} is required!` },
  { min: 5, max: 5, message: `${name} must be 5 digits!` },
  formNumericValidator(name),
];

export default formPinValidator;
