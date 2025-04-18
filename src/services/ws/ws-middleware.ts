import type {
	Middleware,
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';

export interface WsActions<R, S> {
	connect: ActionCreatorWithPayload<string>; // Действие для подключения
	disconnect: ActionCreatorWithoutPayload; // Действие для отключения
	onConnecting?: ActionCreatorWithoutPayload; // Действие при установке соединения
	onOpen?: ActionCreatorWithoutPayload; // Действие при успешном подключении
	onClose?: ActionCreatorWithoutPayload; // Действие при закрытии соединения
	onError: ActionCreatorWithPayload<string>; // Действие при ошибке
	onMessage: ActionCreatorWithPayload<R>; // Действие при получении сообщения
	onSendMessage?: ActionCreatorWithPayload<S>; // Действие для отправки сообщения
}

export const createWebSocketMiddleware = <R, S>(
	wsActions: WsActions<R, S>,
	requireToken = false
): Middleware => {
	let socket: WebSocket | null = null;
	let isConnected = false;

	return (store) => (next) => (action) => {
		const { dispatch } = store;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
			onSendMessage,
		} = wsActions;

		if (connect.match(action)) {
			const url = action.payload;

			if (socket) {
				socket.close();
			}

			let fullUrl = url;
			if (requireToken) {
				const token = localStorage.getItem('accessToken');
				fullUrl = token ? `${url}?token=${token}` : url;
			}

			socket = new WebSocket(fullUrl);
			isConnected = true;

			onConnecting && dispatch(onConnecting());

			socket.onopen = () => {
				onOpen && dispatch(onOpen());
			};

			socket.onmessage = (event: MessageEvent) => {
				try {
					const data = JSON.parse(event.data);
					dispatch(onMessage(data));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}
			};

			socket.onerror = () => {
				dispatch(onError('Ошибка подключения к WebSocket'));
			};

			socket.onclose = () => {
				onClose && dispatch(onClose());
				if (isConnected) {
					isConnected = false;
				}
			};

			return;
		}

		if (disconnect.match(action)) {
			if (socket) {
				socket.close();
				socket = null;
			}
			isConnected = false;
			return;
		}

		if (onSendMessage && onSendMessage.match(action)) {
			if (socket && socket.readyState === WebSocket.OPEN) {
				try {
					const data = JSON.stringify(action.payload);
					socket.send(data);
				} catch (error) {
					dispatch(onError((error as Error).message));
				}
			}
			return;
		}

		return next(action);
	};
};
