import { IOrderResponse } from '@customTypes/auth/types';
import type { Middleware } from '@reduxjs/toolkit';

export const createWebSocketMiddleware = (url: string): Middleware => {
  let socket: WebSocket | null = null;

  return store => next => action => {
    // 💡 Типобезопасная проверка
    if (
      typeof action !== 'object' ||
      action === null ||
      !('type' in action) ||
      typeof action.type !== 'string'
    ) {
      return next(action);
    }

    switch (action.type) {
      case 'ws/connect':
        if (socket) socket.close();
        
        const token = localStorage.getItem("accessToken")
        const wsUrl = token ? `${url}?token=${token}` : url;
        socket = new WebSocket(wsUrl);
        
        socket.onopen = () => store.dispatch({ type: 'ws/open' });

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            store.dispatch({ type: 'ws/message', payload: data });
          } catch (err) {
            console.error('Ошибка парсинга WebSocket-сообщения:', err);
          }
        };

        socket.onerror = () => {
          store.dispatch({ type: 'ws/error', payload: 'Ошибка подключения к WebSocket' });
        };

        socket.onclose = () => {
          store.dispatch({ type: 'ws/close' });
        };
        break;

      case 'ws/disconnect':
        if (socket) {
          socket.close();
          socket = null;
        }
        break;

      case 'ws/send':
        if (socket && socket.readyState === WebSocket.OPEN) {
          const { payload } = action as unknown as { payload: any; type: string };
          socket.send(JSON.stringify(payload));
        }
        break;
    }

    return next(action);
  };
};
