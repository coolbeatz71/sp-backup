import notification from "utils/notification";
import errorFormatter from "./errorFormatter";

export default (error: any) =>  {
  if (error.message) notification(errorFormatter(error.message), "error");
  console.error(error);
};
