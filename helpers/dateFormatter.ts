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

export const getDonationTime = (date: string) =>
  moment().diff(moment(date), "days") < 1
    ? moment(date).format("HH:mm")
    : moment(date).format("DD MMM YYYY");
