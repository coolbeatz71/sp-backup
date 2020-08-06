export enum causeStatus {
  active = "active",
  closed = "closed",
  paused = "paused",
  completed = "completed",
  cancelled = "canceled",
  canceled = "canceled",
}

export interface ICauseStatus {
  active: string;
  paused: string;
  closed: string;
  completed: string;
  cancelled: string;
  [index: string]: string;
}
