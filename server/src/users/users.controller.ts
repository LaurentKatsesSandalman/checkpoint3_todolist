import { Controller, Param, Get, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('/users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

@Get(':id')
getUserById(@Param() params){ // probably not ! I want to get user by id to check things during auth
    return this.userService.getUser(params.id);
}

@Post()
createUser(@Body() user:User){
    return this.userService.saveUser(user);
}

@Delete(':id')
deleteUserById(@Param() params){ // see if you manage to do a /me route instead
    return this.userService.deleteUser(params.id);
}
}