import { Controller, Param, Get, Post, Body } from '@nestjs/common';
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
}