export * from './auth.controller';
import passport from 'passport';
import { userJwtStrategy, customJwtStrategy } from './strategies';

export function registerPassportStrategies(passport: passport.PassportStatic) {
  passport.initialize({
    userProperty: 'user',
  });
  passport.use(userJwtStrategy);
  passport.use(customJwtStrategy);
}
