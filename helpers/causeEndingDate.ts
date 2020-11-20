import moment from "moment";
import i18n from "constants/locales";

const getCauseEndingDate = (causeEndDate: string) => {
  const notEnded = moment().isBefore(moment(causeEndDate));
  const ended = notEnded ? "" : "Ended ";

  const ddd = ended
    ? `${i18n.t("ended")} ${moment(causeEndDate).fromNow(notEnded)}`
    : i18n.t("togo", {
        date: moment(causeEndDate).fromNow(notEnded),
      });

  return ddd;
};

export default getCauseEndingDate;
