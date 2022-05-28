import { controller, interfaces, httpGet } from 'inversify-express-utils';

@controller('/users')
export class UsersController implements interfaces.Controller {
  @httpGet('/')
  private index() {
    return { users: [] };
  }
}
