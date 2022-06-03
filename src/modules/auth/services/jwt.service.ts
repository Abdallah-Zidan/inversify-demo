import { provide } from 'inversify-binding-decorators';
import { config, sessionManager } from '../../../core';
import jwt from 'jsonwebtoken';
import { IUser } from '../../users';

@provide(JWTService)
export class JWTService {
  private generateAccessToken(sessionId: string) {
    return jwt.sign({ sessionId }, config.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  private generateRefreshToken(sessionId: string) {
    return jwt.sign({ sessionId }, config.env.JWT_REFRESH_SECRET, {
      expiresIn: '3M',
    });
  }

  async generateTokens(user: IUser & { _id: string }) {
    const sessionId = await sessionManager.createSession(user);
    return [
      this.generateAccessToken(sessionId),
      this.generateRefreshToken(sessionId),
    ];
  }
}
