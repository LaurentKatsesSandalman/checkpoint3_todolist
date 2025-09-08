import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string): Promise<User | null> {
    return await this.usersService.getUserByEmail(email);
  }

  private async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  public async registerUser(user: User): Promise<User> {
    user.password = await this.hash(user.password);
    return this.usersService.saveUser(user);
  }

  public async loginUser(user: User) {
    const userData = await this.validateUser(user.email);
    if (!userData || !(await this.compare(user.password, userData.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: userData.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      expires_in: 3600,
      access_token: accessToken,
    };
  }
}
