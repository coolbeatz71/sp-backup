const shortenLargeNumber = (num: string, digits: number) => {
  const parsed = parseInt(num, 10);
  let decimal: number;
  const units = ["k", "M", "G", "T", "P", "E", "Z", "Y"];

  for (let i = units.length - 1; i >= 0; i -= 1) {
    decimal = Math.pow(1000, i + 1);

    if (Math.abs(parsed) >= decimal) {
      return +(parsed / decimal).toFixed(digits) + units[i];
    }
  }
  return parsed;
};

export default shortenLargeNumber;
