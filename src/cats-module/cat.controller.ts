import {
  interfaces,
  controller,
  httpGet,
  queryParam,
  httpPost,
  requestBody,
} from "inversify-express-utils";

import { inject } from "inversify";
import { Cat, CatsService } from "./cats.service";
import { ForbiddenError } from "../errors";
import { valiadteBody, ValidationMiddleware } from "./validations";

@controller("/cats", (req, _, next) => {
  console.log(req.url);
  next();
})
export class CatsController implements interfaces.Controller {
  constructor(@inject(CatsService) private catsService: CatsService) {}

  @httpGet("/", ValidationMiddleware)
  private async index(@queryParam() query: any): Promise<Cat[]> {
    return this.catsService.cats;
  }

  @httpPost("/", valiadteBody)
  private async create(@requestBody() body: any) {
    console.log(body);
    return body;
  }

  @httpGet("/error")
  private async error() {
    throw new ForbiddenError("you are not allowed");
  }
}
