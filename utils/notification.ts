import cogoToast from "cogo-toast";
import { notificationTypes } from "interfaces/notification";

export default (message: string, status: notificationTypes = "success") =>
  cogoToast[status](message, {
    position: "top-right",
    bar: { size: "6px" },
    hideAfter: 5,
  });
