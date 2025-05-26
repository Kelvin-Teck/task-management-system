// Define task status enum
export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

// Define interfaces
export interface TaskAttributes {
  id?: number;
  title: string;
  description: string;
  status?: TaskStatus;
  userId: number;
  timeSpent?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskCreationAttributes extends TaskAttributes {
  id?: number;
}