import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.input';
import { User } from 'src/users/entities/user.entity';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private createToken(id: string | number, expries: string) {
    return this.jwtService.signAsync(
      { id },
      { privateKey: 'devid', expiresIn: expries },
    );
  }

  private setTokenToCookie(
    res: Response,
    name: string,
    value: string,
    expiresInSeconds: number,
  ) {
    const expirationTime = new Date(Date.now() + expiresInSeconds * 1000); // Convert seconds to milliseconds
    res.cookie(name, value, {
      expires: expirationTime,
    });
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new UnauthorizedException('You need to login');
      }
      const decode = this.jwtService.decode(refreshToken) as { id: number };
      const accessToken = await this.createToken(decode.id, '10m');
      this.setTokenToCookie(res, 'accessToken', accessToken, 10 * 60);

      return res.send({
        accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException(`${error.message}`);
    }
  }

  clearToken(req: Request, res: Response) {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        throw new UnauthorizedException('No token found');
      }

      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      return res.send({
        message: 'Token has been cleared',
      });
    } catch (error) {
      throw new UnauthorizedException(`${error.message}`);
    }
  }

  async login(info: LoginInput, res: Response) {
    const user = await this.user.findOne({
      where: { email: info.email },
    });

    if (!user) throw new HttpException('Email not found', HttpStatus.NOT_FOUND);

    if (!user.status) {
      throw new HttpException(
        'This account is disabled',
        HttpStatus.BAD_REQUEST,
      );
    }

    const valid = await bcrypt.compare(info.password, user.password);

    if (!valid)
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);

    const accessToken = await this.createToken(user.id, '10m');
    const refreshToken = await this.createToken(user.id, '1d');

    this.setTokenToCookie(res, 'accessToken', accessToken, 10 * 60);
    this.setTokenToCookie(res, 'refreshToken', refreshToken, 60 * 60);

    delete user.password;

    return res.send({
      message: 'Login success',
      accessToken,
      data: user,
    });
  }

  async register(info: RegisterInput, res: Response) {
    if (info.password !== info.confirmPassword)
      throw new HttpException('Password not match', HttpStatus.UNAUTHORIZED);

    const userExsit = await this.user.findOne({
      where: { email: info.email },
    });

    if (userExsit)
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await bcrypt.hash(info.password, 10);

    const { identifiers } = await this.user.insert({
      ...info,
      password: hashPassword,
    });

    const accessToken = await this.createToken(identifiers[0]?.id, '10m');
    const refreshToken = await this.createToken(identifiers[0]?.id, '1d');

    this.setTokenToCookie(res, 'accessToken', accessToken, 10 * 60);
    this.setTokenToCookie(res, 'refreshToken', refreshToken, 60 * 60);

    const user = await this.user.findOne({
      where: { id: identifiers[0]?.id },
    });

    delete user.password;

    return {
      message: 'Signup success',
      accessToken,
      data: user,
    };
  }
}
