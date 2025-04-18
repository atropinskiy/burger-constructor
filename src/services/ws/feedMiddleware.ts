import { createAction, Middleware } from '@reduxjs/toolkit';
import { createWebSocketMiddleware } from './ws-middleware';
import { RootState } from '../rootReucer';
import { IOrderResponse } from '@customTypes/auth/types';

type FeedSendMessage = {
	type: string;
	data?: string;
};

// Actions
export const feedConnect = createAction<string>('wsFeed/connect');
export const feedDisconnect = createAction('wsFeed/disconnect');
export const feedConnecting = createAction('wsFeed/connecting');
export const feedOpen = createAction('wsFeed/open');
export const feedClose = createAction('wsFeed/close');
export const feedError = createAction<string>('wsFeed/error');
export const feedMessage = createAction<IOrderResponse>('wsFeed/message');
export const feedSendMessage =
	createAction<FeedSendMessage>('wsFeed/sendMessage');

// Типизированный объект действий
export const feedActions = {
	connect: feedConnect,
	disconnect: feedDisconnect,
	onConnecting: feedConnecting,
	onOpen: feedOpen,
	onClose: feedClose,
	onError: feedError,
	onMessage: feedMessage,
	onSendMessage: feedSendMessage,
} as const;

// Создание middleware с явными типами
export const feedMiddleware: Middleware<
	Record<string, never>,
	RootState
> = createWebSocketMiddleware<IOrderResponse, FeedSendMessage>(feedActions);
