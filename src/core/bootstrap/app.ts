import express from 'express';
export function app() {
  if (!global.__express__app) global.__express__app = express();
  return global.__express__app;
}
