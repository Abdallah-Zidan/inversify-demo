import { celebrate, Joi, Segments } from 'celebrate';

export const loginUserValidation = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(255),
    }),
  },
  { abortEarly: false, stripUnknown: true },
);
