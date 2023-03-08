export enum Status {
  IDLE = 0,
  PENDING = 1,
  RESOLVED = 2,
  REFUSED = 3,
}

export const isPending = (status: Status) => status === Status.PENDING || status === Status.IDLE;
export const isRefused = (status: Status) => status === Status.REFUSED;
export const isResolved = (status: Status) => status === Status.RESOLVED;
