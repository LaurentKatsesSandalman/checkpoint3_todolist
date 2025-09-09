import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/users.entity';
import { CreateUserDto } from '../users/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  public async registerUser(userDto: CreateUserDto): Promise<User> {
    userDto.password = await this.hash(userDto.password);
    return this.usersService.saveUser(userDto);
  }

  public async loginUser(userDto: CreateUserDto) {
    const userData = await this.validateUser(userDto.email);
    if (
      !userData ||
      !(await this.compare(userDto.password, userData.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: userData.email };

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in .env');
    }

    const jwtExpiresInStr = this.configService.get<string>('JWT_EXPIRES_IN');
    if (!jwtExpiresInStr) {
      throw new Error('JWT_EXPIRES_IN is not defined in .env');
    }

    const jwtExpiresIn = parseInt(jwtExpiresInStr, 10);
    if (isNaN(jwtExpiresIn)) {
      throw new Error('JWT_EXPIRES_IN is not a valid number in .env');
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: jwtExpiresIn,
    });
    return {
      expires_in: jwtExpiresIn,
      access_token: accessToken,
    };
  }
}
