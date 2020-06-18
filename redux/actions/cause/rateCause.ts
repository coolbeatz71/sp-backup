import splApi from "helpers/axios";
import notification from "utils/notification";
import errorFormatter from "helpers/errorFormatter";

export default (slug: string | string[], data: { rating: number }) => {
  splApi.post(`/causes/${slug}/ratings`, data).catch((error: any) => {
    if (error.message) notification(errorFormatter(error.message), "error");
    console.error("here ", error);
  });
};
