import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private user: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const token = request?.cookies?.refreshToken;
      if (!token) {
        throw new UnauthorizedException('You must be logged in');
      }

      const { id } = (await this.jwtService.verifyAsync(token, {
        secret: 'devid',
      })) as {
        id: number;
      };

      const user = await this.user.findOne({ where: { id } });
      if (!user) {
        throw new UnauthorizedException('user not found');
      }
      delete user.password;
      request.user = user;
      // console.log(request.user);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
