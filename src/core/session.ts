import { nanoid } from 'nanoid';
import { redis } from './redis';

export class SessionManager {
  async createSession(data: unknown) {
    const sessionId = nanoid(32);
    await redis.set(sessionId, JSON.stringify(data));
    return sessionId;
  }

  async getSession(sessionId: string) {
    const session = await redis.get(sessionId);
    return session ? JSON.parse(session) : null;
  }

  async deleteSession(sessionId: string) {
    return await redis.del(sessionId);
  }
}

export const sessionManager = new SessionManager();
