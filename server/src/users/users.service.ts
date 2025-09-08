import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private usersRepository: Repository<User>){}

async getUsers(): Promise<User[]> {  // not sure if needed
    return await this.usersRepository.find()
}

async getUser(id:number): Promise<User[]> {// almost sure not needed
return await this.usersRepository.find({
      // Properties to return. We don't want the password property.
      select: ['email'],
      where: [{ id: id }],
    });
}

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  deleteUser(user: User): void {
    this.usersRepository.delete(user);
  }

}