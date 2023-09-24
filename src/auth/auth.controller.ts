import { Controller, Post, Body, Res, Get, Req, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInfo: LoginInput, @Res() res: Response) {
    return await this.authService.login(loginInfo, res);
  }

  @Post('register')
  async register(@Body() registerInfo: RegisterInput, @Res() res: Response) {
    return await this.authService.register(registerInfo, res);
  }

  @Get('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refreshToken(req, res);
  }

  @Delete('clear')
  clearToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.clearToken(req, res);
  }
}
