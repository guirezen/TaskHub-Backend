import { injectable } from "inversify";
import { ITaskRepository } from "../../domain/repositories/task-repository.interface";
import { Task } from "../../domain/entities/task.entity";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class TaskRepositoryInMemory implements ITaskRepository {
  private tasks: Task[] = [];

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id);
    return task ? { ...task } : null;
  }

  async findByAssignee(assigneeId: string): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => task.assigneeId === assigneeId);
    return tasks.map((task) => ({ ...task }));
  }

  async create(task: Task): Promise<Task> {
    const newTask = new Task({
      ...task,
      id: uuidv4(),
    });
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    const updateTask = {
      ...this.tasks[index],
      ...taskData,
      updatedAt: new Date(),
    };

    this.tasks[index] = updateTask;
    return { ...updateTask };
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length !== initialLength;
  }
}
