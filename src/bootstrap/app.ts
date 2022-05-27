import express from 'express';

if (!global.__express__app) {
  global.__express__app = express();
}

export default class Application {
  public get app(): express.Application {
    return global.__express__app;
  }
  listen = global.__express__app.listen.bind(global.__express__app);
}
