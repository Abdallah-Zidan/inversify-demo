declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * @default 'development'
     * @description The environment in which the app is running.
     * @example 'development'
     * @example 'production'
     * @example 'test'
     * @example 'staging'
     */
    NODE_ENV?: string;
    /**
     * @default 3000
     * @description The port on which the app is listening.
     * @example 3000
     **/
    PORT: string;
    /**
     * @default 127.0.0.1
     * @description the host name of the redis server
     * @example redis.example.net
     */
    REDIS_HOST: string;

    /**
     * @description Mongo DB Hostname
     * @default mongodb://localhost:27017/
     * */
    MONGO_URL: string;
    /**
     * @description Mongo DB Database Name
     * @example 'my-database'
     * */
    MONGO_DATABASE: string;
    /**
     * @description the secret used to sign the access token
     * */
    JWT_SECRET: string;
    /**
     * @description the secret used to sign the refresh token
     * */
    JWT_REFRESH_SECRET: string;
    /**
     * @description the key used for encrypting data used by encryption functions
     * */
    APP_KEY: string;
    /**
     * @description the IV used for encrypting data used by encryption functions
     * */
    IV: string;
  }
}

declare namespace Express {
  interface Request {
    user?: {
      /**
       * The user's session id.
       * @description The session id of the user.
       * @example 'f0d8f8e8-d5e5-4a5f-b5d5-f0d8f8e8d5e5'
       */
      sessionId?: string;
    };
  }
}
interface AppConfig {
  appName: string;
  env: NodeJS.ProcessEnv;
}

var __app__config: AppConfig;
var __express__app: import('express').Application;
var __app__container: import('inversify').Container;
