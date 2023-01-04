import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        {
          message: 'Tai khoan hoac mat khau khong dung ',
          statusCode: '200',
        },
        HttpStatus.OK,
      );
      // throw new UnauthorizedException();
    }
    return user;
  }
}
