import moment from "moment";
import { upperFirst } from "lodash";
import i18n from "constants/locales";

export const getCauseEndingDate = (causeEndDate: string) => {
  const notEnded = moment().isBefore(moment(causeEndDate));
  const ended = notEnded ? "" : "Ended ";

  const ddd = ended
    ? `${upperFirst(
        i18n.t("ended", {
          date: moment(causeEndDate).fromNow(notEnded),
        }),
      )}`
    : i18n.t("togo", {
        date: moment(causeEndDate).fromNow(notEnded),
      });

  return ddd;
};

export const getDonationTime = (date: string) => {
  return moment().diff(moment(date), "days") < 1
    ? moment(date).format("hh:mm")
    : moment(date).fromNow();
};
