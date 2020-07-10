import formatNumber from "./formatNumber";

export default (value: any, previousValue: any) => {
  if (/[a-zA-Z]/.test(value) || /[*|":<>[\]{}\-`\\()'.;@&$]/.test(value)) {
    if (value.length === 1) return 0;
    return previousValue;
  }
  const prepareNumber = value.replace(/,/g, "");
  return formatNumber(prepareNumber);
};
