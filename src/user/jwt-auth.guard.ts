import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/roles.decorator';
import { UserTokenInfo } from './interface/customer.interface';
import { Role } from 'src/common/constant';

@Injectable()
export class JwtAuthGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = (await super.canActivate(
      context,
    )) as boolean;

    if (!isAuthenticated) return false;

    // 2️⃣ Get roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If route does not require role → allow
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3️⃣ Get user from request
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserTokenInfo;

    // 4️⃣ Check role
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No permission');
    }

    return true;
  }
}
