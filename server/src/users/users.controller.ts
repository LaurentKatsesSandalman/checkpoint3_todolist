import {
  Controller,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnerGuard } from 'src/common/guards/owner.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.saveUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), OwnerGuard)
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
