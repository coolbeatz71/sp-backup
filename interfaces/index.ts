export enum causeStatus {
  active = "active",
  closed = "closed",
  stopped = "stopped",
  completed = "completed",
  cancelled = "canceled",
  canceled = "canceled",
}

export interface ICauseStatus {
  active: string;
  stopped: string;
  closed: string;
  completed: string;
  cancelled: string;
  [index: string]: string;
}
