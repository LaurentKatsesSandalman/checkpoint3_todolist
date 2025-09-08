import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/users.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() user:User):Promise<User>{
        return this.authService.registerUser(user);
    }
    
    
    @Post('login')
    async login(@Body() user:User):Promise<any>{
        return this.authService.loginUser(user);
    }
}