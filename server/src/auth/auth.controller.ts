import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user.dto';
import { User } from '../users/users.entity';

interface LoginResponse {
  access_token: string;
  expires_in: number;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.registerUser(userDto);
  }

  @Post('login')
  async login(@Body() userDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.loginUser(userDto);
  }
}
