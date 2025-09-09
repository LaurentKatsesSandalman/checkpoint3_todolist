import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //the one we really need:
  getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id); //delete from typeorm is based on "delete by id". More common than .delete(user)
  }
}
