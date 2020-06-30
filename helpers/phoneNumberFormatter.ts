const phoneFormatter = (
  phoneNumber: string,
  option?: "substract" | "append",
): string => {
  if (option) {
    if (option === "append" && phoneNumber.startsWith("7"))
      return `250${phoneNumber}`;
    if (option === "substract" && phoneNumber.startsWith("250"))
      return phoneNumber.replace("250", "");
  }
  if (phoneNumber?.startsWith("250")) return phoneNumber.replace("250", "");
  if (phoneNumber?.startsWith("7")) return `250${phoneNumber}`;
  return phoneNumber;
};

export const removeZero = (phoneNumber: string) => {
  if (phoneNumber.startsWith("0")) {
    const phone = phoneNumber.replace("0", "");
    return `250${phone}`;
  }
};

export default phoneFormatter;
