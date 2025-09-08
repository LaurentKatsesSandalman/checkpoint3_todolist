import { Controller, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  /*
@Get()
getAllUsers(){ // should not be needed
    return this.userService.getUsers();
}

@Get(':id')
getUserById(@Param() params){ // probably not ! I want to get user by id to check things during auth
    return this.userService.getUser(params.id);
}
*/

  @Post()
  createUser(@Body() user: User) {
    return this.userService.saveUser(user);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    // see if you manage to do a /me route instead
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user id');
    }
    return this.userService.deleteUser(userId);
  }
}
