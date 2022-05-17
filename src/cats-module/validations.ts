import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors";
import { BaseMiddleware } from "inversify-express-utils";
import { provide } from "inversify-binding-decorators";
import { celebrate, CelebrateError, Joi, Segments } from "celebrate";

@provide(ValidationMiddleware)
export class ValidationMiddleware extends BaseMiddleware {
  handler(req: Request, _: Response, next: NextFunction): void {
    if (!req.query.check)
      throw new ValidationError([
        {
          check: "check query parameter is required",
        },
      ]);
    next();
  }
}

export const valiadteBody = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().integer(),
    }),
  },
  { abortEarly: false, stripUnknown: true }
);
