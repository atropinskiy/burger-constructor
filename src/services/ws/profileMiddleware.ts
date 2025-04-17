import { createWebSocketMiddleware } from './ws-middleware';

export const profileMiddleware = createWebSocketMiddleware({
  url: 'wss://norma.nomoreparties.space/orders',
  actionPrefix: 'wsProfile',
  requireToken: true,
});
