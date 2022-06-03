import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { config, sessionManager } from '../../../core';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.env.JWT_SECRET,
};

export const userJwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user: any = await sessionManager.getSession(payload.sessionId);
    if (!user) {
      return done(null, false);
    }
    user.password = undefined;
    user.sessionId = payload.sessionId;
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});
