import { causeStatus } from "interfaces";

export const getDaysToGo = (status: string, daysToGo: any): string => {
  return status === causeStatus.active && daysToGo > 0
    ? `${daysToGo} Days to Go`
    : (<any>causeStatus)[status];
};
