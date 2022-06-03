import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  request,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import passport from 'passport';
import { CreateUserDto } from '../users';
import { AuthService } from './services/auth.service';
import { registerUserValidation } from './validations';
import { ILogger, LoggerFactory } from '../../core';
import { Request } from 'express';

@controller('/auth')
export class AuthController implements interfaces.Controller {
  private logger: ILogger;
  constructor(
    @inject(AuthService) private authService: AuthService,
    @inject('ILogger') loggerFn: LoggerFactory,
  ) {
    this.logger = loggerFn('AuthController');
  }
  @httpPost('/login')
  private async login(
    @requestBody() loginBody: { email: string; password: string },
  ) {
    return this.authService.login(loginBody);
  }

  @httpPost('/register', registerUserValidation)
  private async register(@requestBody() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @httpGet('/me', passport.authenticate('jwt', { session: false }))
  private async me(@request() request: Request) {
    this.logger.logInfo('profile');
    return request.user;
  }

  @httpDelete('/logout', passport.authenticate('jwt', { session: false }))
  private async logout(@request() request: Request) {
    return this.authService.logout(request.user?.sessionId);
  }
}
