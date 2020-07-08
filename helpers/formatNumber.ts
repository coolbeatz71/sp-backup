export default (newNumber: number): string | null => {
  if (process.browser) {
    return  Intl.NumberFormat().format(newNumber);
  }
  return null;
};
