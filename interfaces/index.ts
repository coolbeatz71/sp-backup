export enum causeStatus {
  pending = "pending",
  active = "active",
  paused = "paused",
  completed = "completed",
  cancelled = "cancelled",
  rejected = "rejected",
}

export interface ICauseStatus {
  active: string;
  paused: string;
  completed: string;
  cancelled: string;
  [index: string]: string;
}
