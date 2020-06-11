import { causeStatus } from "interfaces";
import { SUCCESS, SECONDARY, WARNING, PRIMARY } from "constants/colors";

const getCauseTagColor = (status: string) => {
  switch (status) {
    case causeStatus.active:
      return SUCCESS;

    case causeStatus.cancelled:
      return SECONDARY;

    case causeStatus.closed:
      return WARNING;

    case causeStatus.completed:
      return PRIMARY;

    default:
      return WARNING;
  }
};

export default getCauseTagColor;
