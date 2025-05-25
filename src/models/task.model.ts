// models/task.model.ts
import { DataTypes, Model, Sequelize } from "sequelize";

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

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: TaskStatus;
  public userId!: number;
  public timeSpent!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

// Export init function separately
export const initTaskModel = (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
          len: {
            args: [1, 255],
            msg: "Title must be between 1 and 255 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      status: {
        type: DataTypes.ENUM(...Object.values(TaskStatus)),
        allowNull: false,
        defaultValue: TaskStatus.PENDING,
        validate: {
          isIn: {
            args: [Object.values(TaskStatus)],
            msg: "Status must be pending, in-progress, or completed",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      timeSpent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: "Time spent cannot be negative" },
        },
        comment: "Time spent on task in minutes",
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      timestamps: true,
      indexes: [
        { fields: ["userId"] },
        { fields: ["status"] },
        { fields: ["createdAt"] },
        { fields: ["userId", "status"] },
      ],
    }
  );

  return Task;
};
