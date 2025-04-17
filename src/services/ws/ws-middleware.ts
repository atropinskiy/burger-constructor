import { IOrderResponse } from '@customTypes/auth/types';
import type { Middleware } from '@reduxjs/toolkit';

interface WSOptions {
	url: string;
	actionPrefix: string; // например, 'wsFeed' или 'wsProfile'
	requireToken?: boolean;
}

export const createWebSocketMiddleware = ({
	url,
	actionPrefix,
	requireToken = false,
}: WSOptions): Middleware => {
	let socket: WebSocket | null = null;

	return (store) => (next) => (action) => {
		if (
			typeof action !== 'object' ||
			action === null ||
			!('type' in action) ||
			typeof action.type !== 'string'
		) {
			return next(action);
		}

		const { dispatch } = store;

		const connectType = `${actionPrefix}/connect`;
		const disconnectType = `${actionPrefix}/disconnect`;
		const sendType = `${actionPrefix}/send`;
		const closeType = `${actionPrefix}/close`;

		switch (action.type) {
			case connectType: {
				if (socket) socket.close();

				let fullUrl = url;
				if (requireToken) {
					const token = localStorage.getItem('accessToken');
					fullUrl = token ? `${url}?token=${token}` : url;
				}

				socket = new WebSocket(fullUrl);

				socket.onopen = () => {
					console.log(`WebSocket подключен ${actionPrefix}`);
					store.dispatch({ type: 'ws/open' });
				};

				socket.onmessage = (event: MessageEvent) => {
					try {
						const data = JSON.parse(event.data);
						console.log('Полученные данные от WebSocket:', data); // Логируем полученные данные
						if (actionPrefix === 'wsFeed') {
							store.dispatch({ type: 'ws/message', payload: { data: data } });
						} else {
							store.dispatch({
								type: 'ws/messageProfile',
								payload: { data: data },
							});
						}
						// Передаем данные в store
					} catch (err) {
						console.error('Ошибка парсинга WebSocket-сообщения:', err);
					}
				};

				socket.onerror = () => {
					const errorMessage = 'Ошибка подключения к WebSocket'; // Просто сообщение об ошибке
					store.dispatch({ type: 'ws/error', payload: errorMessage });
				};

				socket.onclose = () => {
					dispatch({ type: closeType });
				};

				break;
			}

			case disconnectType:
				if (socket) {
					socket.close();
					socket = null;
				}
				break;

			case sendType: {
				if (socket && socket.readyState === WebSocket.OPEN) {
					const { payload } = action as unknown as { payload: IOrderResponse };
					socket.send(JSON.stringify(payload));
				}
				break;
			}
		}

		return next(action);
	};
};
