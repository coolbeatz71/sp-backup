import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { destroyAuthCookies } from "./cookies";
import { getLanguage } from "./getLanguage";

const redirect = (props: unknown | never) => {
  destroyAuthCookies("saveToken");
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
    props,
  };
};

const requireAuth = (gssp: (ctx: GetServerSidePropsContext) => any) => {
  return async (context: GetServerSidePropsContext) => gssp(context);
};

export const checkUserAuth = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { saveToken } = cookies;

  if (saveToken) {
    try {
      const { data } = await axios.get("/user", {
        headers: {
          language: getLanguage(),
          Authorization: saveToken,
          platform: "save_plus_web",
        },
        baseURL: process.env.NEXT_PUBLIC_SAVE_API_URL,
      });
      return {
        props: data,
      };
    } catch (error) {
      return redirect({} as unknown as never);
    }
  } else {
    return redirect({} as unknown as never);
  }
};

export default requireAuth;
