export class Logger implements ILogger {
  constructor(private name?: string) {}
  logInfo(message: string, context?: object): void {
    console.log(`[${this.name}]: ${message}`);
  }
  logError(message: string, context?: object): void {
    console.log(`[${this.name}]: ${message}`);
  }
  logWarning(message: string, context?: object): void {
    console.log(`[${this.name}]: ${message}`);
  }
  logDebug(message: string, context?: object): void {
    console.log(`[${this.name}]: ${message}`);
  }
}

export interface ILogger {
  logInfo(message: string, context?: object): void;
  logError(message: string, context?: object): void;
  logWarning(message: string, context?: object): void;
  logDebug(message: string, context?: object): void;
}

export function buildLgger(name = 'LOGGER'): ILogger {
  return new Logger(name);
}

export function dummyLogger(): ILogger {
  return {
    logInfo: () => {},
    logError: () => {},
    logWarning: () => {},
    logDebug: () => {},
  };
}

export type LoggerFactory = (name: string) => ILogger;
