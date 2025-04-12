export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class Task {
    id!: string;
    title!: string;
    description!: string;
    status!: TaskStatus;
    assigneeId?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<Task>) {
        Object.assign(this, data);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}