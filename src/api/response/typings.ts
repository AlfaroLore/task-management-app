export enum UserType {
  ADMIN,
  CANDIDATE,
}

export type User = {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: UserType;
  updatedAt: string;
};

export enum PointEstimate {
  EIGHT,
  FOUR,
  ONE,
  TWO,
  ZERO,
}

export enum Status {
  BACKLOG,
  CANCELLED,
  DONE,
  IN_PROGRESS,
  TODO,
}

export enum TaskTag {
  ANDROID,
  IOS,
  NODE_JS,
  RAILS,
  REACT,
}

export type Task = {
  assignee: User;
  createdAt: string;
  creator: User;
  dueDate: string;
  id: string;
  name: string;
  pointEstimate: PointEstimate;
  position: number;
  status: Status;
  tags: TaskTag[];
};
