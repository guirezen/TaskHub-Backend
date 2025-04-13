import { Task } from "../entities/task.entity";

export interface ITaskRepository {
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    create(task: Task): Promise<Task>;
    update(id: string, taskData: Partial<Task>): Promise<Task | null>;
    delete(id: string): Promise<boolean>;
}