import auth, { types as authTypes, getters as authGetters } from './auth';
import userMessages, { types as userMessagesTypes, getters as userMessagesGetters } from './userMessages'

export const types = {
	auth: authTypes,
	userMessages: userMessagesTypes,
};

export const getters = {
	...authGetters,
	...userMessagesGetters,
};

export const modules = {
	auth,
	userMessages,
};
