import app, { types as appTypes, getters as appGetters } from './app';
import auth, { types as authTypes, getters as authGetters } from './auth';
import userMessages, { types as userMessagesTypes, getters as userMessagesGetters } from './userMessages';

export const types = {
	app: appTypes,
	auth: authTypes,
	userMessages: userMessagesTypes,
};

export const getters = {
	...appGetters,
	...authGetters,
	...userMessagesGetters,
};

export const modules = {
	app,
	auth,
	userMessages,
};
