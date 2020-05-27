import moment from "moment";

const getCauseRemainingDays = (startDate: string, endDate: string) => {
  const start = moment(startDate);
  const end = moment(endDate);

  const diff = moment.duration(end.diff(start));
  return diff.asDays();
};

export default getCauseRemainingDays;
