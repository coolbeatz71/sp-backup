export enum causeStatus {
  pending = "pending",
  active = "active",
  closed = "closed",
  paused = "paused",
  completed = "completed",
  cancelled = "cancelled",
}

export interface ICauseStatus {
  active: string;
  paused: string;
  closed: string;
  completed: string;
  cancelled: string;
  [index: string]: string;
}
