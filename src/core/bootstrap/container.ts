import { Container } from 'inversify';
if (!global.__app__container) global.__app__container = new Container();

export function getContainer(): Container {
  return global.__app__container;
}
