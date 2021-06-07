import nookies from "nookies";

const setAuthCookies = (token: string) => {
  nookies.set(null, "saveToken", token, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
  });
};

export const destroyAuthCookies = (name: string) => {
  nookies.destroy(null, name, null);
};

export default setAuthCookies;
