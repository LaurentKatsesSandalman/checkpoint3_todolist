import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
    private readonly configService: ConfigService) {
    // Configure the strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(email: string) {
    const userFound = await this.authService.validateUser(email);
    if (!userFound) {
      throw new UnauthorizedException();
    }
    return userFound;
  }
}