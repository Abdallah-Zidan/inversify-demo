import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { config } from '../../../core';
import { UserModel } from '../../users';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.env.CUSTOM_JWT_SECRET,
};

class CustomStrategy extends Strategy {
  name = 'custom-jwt';
}

export const customJwtStrategy = new CustomStrategy(
  options,
  async (payload, done) => {
    try {
      const user: any = await UserModel.findOne({
        email: payload.email,
      });
      if (!user) {
        return done(null, false);
      }
      user.password = undefined;
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  },
);
