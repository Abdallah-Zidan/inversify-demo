namespace NodeJS {
  interface ProcessEnv {
    /**
     * The App environment.
     * @default 'development'
     * @description The environment in which the app is running.
     * @example 'development'
     * @example 'production'
     * @example 'test'
     * @example 'staging'
     */
    NODE_ENV?: string;
    /**
     * The App listening Port.
     * @default 3000
     * @description The port on which the app is listening.
     * @example 3000
     * @example 4000
     * @example 5000
     **/
    PORT?: string | number;
  }
}

declare interface AppConfig {
  appName: string;
  env: NodeJS.ProcessEnv;
}

declare var __app__config: AppConfig;
