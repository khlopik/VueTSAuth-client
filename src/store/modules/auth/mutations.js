/* eslint no-param-reassign: "error" */
import { mutation } from './types';

export default {
	[mutation.SET_LOGGED_IN]: (auth, status) => {
		console.log('state: ', auth);
		console.log('status: ', status);
		auth.isLoggedIn = status;
	},
	[mutation.SET_USER_URL]: (auth, url) => {
		auth.userUrl = url;
	},
	[mutation.SET_USER_ACCESS]: (auth, access) => {
		auth.userAccess = access;
	},
};
