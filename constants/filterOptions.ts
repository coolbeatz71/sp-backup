import { causeStatus } from "interfaces";
import { capitalize } from "lodash";

const pendingStatus = {
  value: causeStatus.pending,
  label: capitalize(causeStatus.pending),
};

export const feedTypeOptions = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Sponsored",
    value: "sponsored",
  },
];

export const statusOptions = [
  {
    value: causeStatus.active,
    label: capitalize(causeStatus.active),
  },
  {
    value: causeStatus.paused,
    label: capitalize(causeStatus.paused),
  },
  {
    value: causeStatus.cancelled,
    label: capitalize(causeStatus.cancelled),
  },
  {
    value: causeStatus.completed,
    label: capitalize(causeStatus.completed),
  },
];

export const userCauseStatusOptions = [...[pendingStatus], ...statusOptions];
