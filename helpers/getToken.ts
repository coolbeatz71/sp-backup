const getToken = (): string | null => {
  if (process.browser) {
    return  localStorage.getItem("SPL-token") || "";
  }
  return null;
};

export default getToken;
