import { isOk } from "dev-rw-phone";

const formPhoneValidator = (name: string) => [
  { required: true, message: `${name} is required!` },
  {
    validator(_rule: any, value: any) {
      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (!isOk(value)) return Promise.reject(`${name} is invalid!`);

      return Promise.resolve();
    },
  },
];

export default formPhoneValidator;
