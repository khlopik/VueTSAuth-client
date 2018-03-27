import { action, mutation } from './types';

export default {
	[mutation.SET_LOGGED_IN]: ({ dispatch }, status) => {
		dispatch(action.SET_LOGGED_IN, status);
	},
	[mutation.SET_USER_URL]: ({ dispatch }, url) => {
		dispatch(action.SET_USER_URL, url);
	},
};
