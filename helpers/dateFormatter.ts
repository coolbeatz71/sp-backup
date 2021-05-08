import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { upperFirst } from "lodash";
import i18n from "constants/locales";

dayjs.extend(relativeTime);

export const getCauseEndingDate = (causeEndDate: string) => {
  const notEnded = dayjs().isBefore(dayjs(causeEndDate));
  const ended = notEnded ? "" : "Ended ";

  const ddd = ended
    ? `${upperFirst(
        i18n.t("ended", {
          date: dayjs(causeEndDate).fromNow(notEnded),
        }),
      )}`
    : i18n.t("togo", {
        date: dayjs(causeEndDate).fromNow(notEnded),
      });

  return ddd;
};

export const getDonationTime = (date: string) =>
  dayjs().diff(dayjs(date), "days") < 1
    ? dayjs(date).format("HH:mm")
    : dayjs(date).format("DD MMM YYYY");
