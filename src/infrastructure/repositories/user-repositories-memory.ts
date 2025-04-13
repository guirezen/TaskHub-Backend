import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => id === user.id);
    return user ? { ...user } : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => email === user.email);
    return user ? { ...user } : null;
  }

  async create(user: User): Promise<User> {
    const newUser = new User({
      ...user,
      id: uuidv4(),
    });
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const updatedUser = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date(),
    };

    this.users[index] = updatedUser;
    return { ...updatedUser };
  }

  async delete(id: string): Promise<boolean> {
      const initialLength = this.users.length;
      this.users = this.users.filter(user => user.id !== id);
      return this.users.length !== initialLength;
  }
}
