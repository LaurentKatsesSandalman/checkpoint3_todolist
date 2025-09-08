import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private usersRepository: Repository<User>){}

/*
    async getUsers(): Promise<User[]> {  // not sure if needed
    return await this.usersRepository.find()
}

async getUser(id:number): Promise<User|null> {// almost sure not needed
return await this.usersRepository.findOne({
      // Properties to return. We don't want the password property.
      select: ['email'],
      where: [{ id: id }],
    });
}
*/

//the one we really need:
 getUserByEmail(email: string): Promise<User|null>{
  return this.usersRepository.findOneBy({ email:email})
 }  

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  deleteUser(id:number): void {
    this.usersRepository.delete(id); //delete from typeorm is based on "delete by id". More common than .delete(user)
  }

}