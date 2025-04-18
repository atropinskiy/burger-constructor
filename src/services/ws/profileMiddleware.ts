import { createAction } from '@reduxjs/toolkit';
import { createWebSocketMiddleware } from './ws-middleware';
import { IOrderResponse } from '@customTypes/auth/types';

type ProfileSendMessage = {
	type: string;
	data?: string;
};

// Действия для WebSocket профиля
export const profileConnect = createAction<string>('wsProfile/connect');
export const profileDisconnect = createAction('wsProfile/disconnect');
export const profileConnecting = createAction('wsProfile/connecting');
export const profileOpen = createAction('wsProfile/open');
export const profileClose = createAction('wsProfile/close');
export const profileError = createAction<string>('wsProfile/error');
export const profileMessage = createAction<IOrderResponse>(
	'wsProfile/messageProfile'
);
export const profileSendMessage = createAction<ProfileSendMessage>(
	'wsProfile/sendMessage'
);

// Объект действий
export const profileActions = {
	connect: profileConnect,
	disconnect: profileDisconnect,
	onConnecting: profileConnecting,
	onOpen: profileOpen,
	onClose: profileClose,
	onError: profileError,
	onMessage: profileMessage,
	onSendMessage: profileSendMessage,
};

// Создание middleware
export const profileMiddleware = createWebSocketMiddleware<
	IOrderResponse,
	ProfileSendMessage
>(
	profileActions,
	true // requireToken
);
