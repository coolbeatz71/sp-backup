import validator from "validator";

const formNumericValidator = (name: string) => () => ({
  validator(_rule: any, value: any) {
    if ([null, undefined, ""].includes(value)) {
      return Promise.resolve();
    }

    if (!validator.isNumeric(value))
      return Promise.reject(`${name} must be numbers only!`);

    return Promise.resolve();
  },
});

export default formNumericValidator;
