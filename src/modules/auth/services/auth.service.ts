import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';
import {
  ILogger,
  LoggerFactory,
  HttpError,
  sessionManager,
} from '../../../core';
import { CreateUserDto, UserDto, UserModel } from '../../users';
import { JWTService } from './jwt.service';

@provide(AuthService)
export class AuthService {
  private logger: ILogger;
  constructor(
    @inject('ILogger') loggerFn: LoggerFactory,
    @inject(JWTService) private jwtService: JWTService,
  ) {
    this.logger = loggerFn('AuthService');
  }

  public async login(loginBody: { email: string; password: string }) {
    this.logger.logInfo('login');
    const user = await UserModel.findOne({ email: loginBody.email });
    if (!user) {
      throw new HttpError({ code: 422, message: 'Invalid credentials' });
    }

    if (!(await user.comparePassword(loginBody.password))) {
      throw new HttpError({ code: 422, message: 'Invalid credentials' });
    }
    const [accessToken, refreshToken] = await this.jwtService.generateTokens(
      user,
    );
    return { ...UserDto.toJSON(user), accessToken, refreshToken };
  }

  public async logout(sessionId?: string) {
    this.logger.logInfo('logout');
    await sessionManager.deleteSession(sessionId ?? '');
  }

  public async register(userDto: CreateUserDto) {
    this.logger.logInfo(`registering ${userDto.name}`);
    const user = new UserModel(userDto);
    await user.save();
    return UserDto.toJSON(user);
  }
}
