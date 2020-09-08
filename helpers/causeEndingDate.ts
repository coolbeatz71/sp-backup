import moment from "moment";

const getCauseEndingDate = (causeEndDate: string) => {
  const notEnded = moment().isBefore(moment(causeEndDate));
  const toGo = notEnded ? " to Go" : "";
  const ended = notEnded ? "" : "Ended ";

  return `${ended}${moment(causeEndDate).fromNow(notEnded)}${toGo}`;
};

export default getCauseEndingDate;
