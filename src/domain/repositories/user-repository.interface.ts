import { User } from "../entities/user.entity";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
}