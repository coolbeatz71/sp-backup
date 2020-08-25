const formPinMatchValidator = (pin: string, message: string) => [
  ({ getFieldValue }: { [key: string]: any }) => ({
    validator(_rule: any, value: any) {
      if ([null, undefined, ""].includes(value)) {
        return Promise.resolve();
      }

      if (getFieldValue(pin) !== value)
        return Promise.reject(`${message} mismatch!`);

      return Promise.resolve();
    },
  }),
];

export default formPinMatchValidator;
