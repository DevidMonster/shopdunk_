import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { UsersService } from 'src/users/services/users/users.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/types/role.enum';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthortizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req: request } = ctx.getContext();

    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // console.log(request.user, requiredRoles);
    const role = request.user.role;
    if (role && requiredRoles !== role)
      throw new UnauthorizedException('You are not allowed to use this action');

    return true;
  }
}
