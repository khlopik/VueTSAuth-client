import uuid from 'uuid/v4';
import { action, mutation } from './types';

export default {
	[action.SHOW_USER_MESSAGE]: ({ commit, getters }, message) => {
		const messageId = uuid();
		commit(mutation.ADD_USER_MESSAGE, { ...message, id: messageId });
		if (getters.AUTO_HIDE) {
			setTimeout(() => {
				commit(mutation.REMOVE_USER_MESSAGE, messageId);
			}, getters.GET_HIDE_DELAY);
		}
	},
	[action.HIDE_USER_MESSAGE]: ({ commit }, messageId) => {
		commit(mutation.REMOVE_USER_MESSAGE, messageId);
	},
};
