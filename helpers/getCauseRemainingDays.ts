import moment from "moment";

const getCauseRemainingDays = (endDate: string) => {
  const now = moment().format();
  return moment(endDate).diff(now, "days");
};

export default getCauseRemainingDays;
