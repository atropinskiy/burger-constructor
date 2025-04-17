import { createWebSocketMiddleware } from './ws-middleware';

export const feedMiddleware = createWebSocketMiddleware({
  url: 'wss://norma.nomoreparties.space/orders/all',
  actionPrefix: 'wsFeed',
});
