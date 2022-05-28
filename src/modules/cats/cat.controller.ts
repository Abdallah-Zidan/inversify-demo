import {
  interfaces,
  controller,
  httpGet,
  queryParam,
  httpPost,
  requestBody,
} from 'inversify-express-utils';

import { inject } from 'inversify';
import { Cat, CatsService } from './cats.service';
import { valiadteBody, ValidationMiddleware } from './validations';
import { ILogger, LoggerFactory, ForbiddenError } from '../../core';

@controller('/cats', (_1, _2, next) => {
  next();
})
export class CatsController implements interfaces.Controller {
  private logger: ILogger;
  constructor(
    @inject(CatsService)
    private catsService: CatsService,
    @inject('ILogger') loggerFn: LoggerFactory,
  ) {
    this.logger = loggerFn('CATS_CONTROLLER');
  }

  @httpGet('/', ValidationMiddleware)
  private async index(@queryParam() _: any): Promise<Cat[]> {
    return this.catsService.cats;
  }

  @httpPost('/', valiadteBody)
  private async create(@requestBody() body: any) {
    this.logger.logDebug(JSON.stringify(body));
    return body;
  }

  @httpGet('/error')
  private async error() {
    throw new ForbiddenError('you are not allowed');
  }
}
