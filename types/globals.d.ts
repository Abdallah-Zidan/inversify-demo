namespace NodeJS {
  interface ProcessEnv {
    QurbaEnv: string;
  }
}

declare interface QurbaConfig {
  appName: string;
}

declare var __qurba__config: QurbaConfig;
