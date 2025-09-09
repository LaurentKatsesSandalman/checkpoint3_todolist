import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { Request } from 'express';

interface JwtUser {
  id: number;
  email: string;
}

interface RequestWithUser extends Request {
  user: JwtUser;
}

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const user = request.user; // AuthGuard('jwt') adds user as an object in request.user (Default behavior of Passport after validating JWT)
    const paramId = parseInt(request.params.id, 10);

    if (!user || isNaN(paramId)) {
      throw new ForbiddenException('Invalid request');
    }

    if (user.id !== paramId) {
      throw new ForbiddenException('You cannot access this resource');
    }

    return true;
  }
}
