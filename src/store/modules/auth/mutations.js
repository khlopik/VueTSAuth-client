import { mutation } from './types';

export default {
	[mutation.SET_LOGGED_IN]: (state, status) => {
		state.auth.isLoggedIn = status;
	},
	[mutation.SET_USER_URL]: (state, url) => {
		state.auth.userUrl = url;
	},
};
