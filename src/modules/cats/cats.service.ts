import { provide } from 'inversify-binding-decorators';

export class Cat {
  constructor(private name: string, private breed: string) {}
}

@provide(CatsService)
export class CatsService {
  private _cats: Cat[] = [new Cat('test', 'demo'), new Cat('check', 'now')];

  get cats() {
    return this._cats;
  }
}
