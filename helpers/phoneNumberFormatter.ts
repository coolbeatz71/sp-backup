import Phone from "@exuus/rwanda-phone-utils";

const phoneFormatter = (
  phoneNumber: string,
  option?: "substract" | "append"
): string => {
  if (option) {
    if (option === "append" && phoneNumber.startsWith("7"))
      return `250${phoneNumber}`;
    if (option === "substract" && phoneNumber.startsWith("250"))
      return phoneNumber.replace("250", "");
  } else if (phoneNumber?.startsWith("250"))
    return phoneNumber.replace("250", "");
  else if (phoneNumber?.startsWith("7")) return `250${phoneNumber}`;
  return phoneNumber;
};

export const fixedLineFormatter = (phoneNumber: string) => {
  return Phone(phoneNumber).isValid
    ? Phone(phoneNumber).unformatted
    : `250${phoneNumber}`;
};

export default phoneFormatter;
