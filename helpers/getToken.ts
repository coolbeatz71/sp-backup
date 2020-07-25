const getToken = (): string | null => {
  if (process.browser) {
    return  localStorage.getItem("save-token") || "";
  }
  return null;
};

export const isLoggedIn = !!getToken();

export default getToken;
