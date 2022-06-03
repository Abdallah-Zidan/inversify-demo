import { celebrate, Joi, Segments } from 'celebrate';
import { UserModel } from '../../users';
export const registerUserValidation = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(1).max(255),
      email: Joi.string()
        .required()
        .email()
        .external(async (value) => {
          const user = await UserModel.exists({ email: value });
          if (user)
            throw new Joi.ValidationError(
              'email already exists',
              [
                {
                  message: '"value" must be unique',
                  path: ['email'],
                  type: 'string.base',
                  context: {
                    value: value,
                    label: 'email',
                  },
                },
              ],
              'email',
            );
          return value;
        }),
      password: Joi.string().required().min(6).max(255),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  },
  { abortEarly: false, stripUnknown: true },
);
