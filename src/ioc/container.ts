import { Container } from 'inversify';
import { TYPES } from './types';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import { ITaskRepository } from '../domain/repositories/task-repository.interface';
import { IUserService } from '../domain/services/user-service.interface';
import { ITaskService } from '../domain/services/task-service.interface';
import { UserRepositoryInMemory } from '../infrastructure/repositories/user-repository-memory';
import { TaskRepositoryInMemory } from '../infrastructure/repositories/task-repository-memory';
import { UserService } from '../application/services/user-service';
import { TaskService } from '../application/services/task-service';
import { ILogger } from '../domain/services/logger.interface';
import { ConsoleLogger } from '../infrastructure/services/console-logger';

const container = new Container();

// Repositorios
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoryInMemory).inSingletonScope();
container.bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepositoryInMemory).inSingletonScope();

// Services
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<ITaskService>(TYPES.TaskService).to(TaskService);

// Outros
container.bind<ILogger>(TYPES.Logger).to(ConsoleLogger).inSingletonScope();

export { container };