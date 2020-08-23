import cogoToast from "cogo-toast";
import { notificationTypes, positionTypes } from "interfaces/notification";

export default (
  message: string,
  status: notificationTypes = "success",
  position: positionTypes = "top-right",
) =>
  cogoToast[status](message, {
    position,
    bar: { size: "6px" },
    hideAfter: 5,
  });
