import { authUserByToken, updateUserDetails } from '@/components/LoginPage/loginService';
import { action, mutation } from './types';

export default {
	[action.SET_LOGGED_IN]: ({ commit }, status) => {
		commit(mutation.SET_LOGGED_IN, status);
	},
	[action.SET_USER_URL]: ({ commit }, url) => {
		commit(mutation.SET_USER_URL, url);
	},
	[action.CHECK_LOGIN_ON_SERVER]: ({ commit }) => {
		return new Promise((resolve, reject) => {
			const authUser = JSON.parse(localStorage.getItem('authUser'));
			if (authUser && authUser.token) {
				authUserByToken(authUser.token)
					.then((result) => {
						commit(mutation.SET_LOGGED_IN, true);
						commit(mutation.UPDATE_USER_DETAILS, result.data);
						resolve();
					})
					.catch((e) => {
						commit(mutation.SET_LOGGED_IN, false);
						reject();
					});
			} else {
				commit(mutation.SET_LOGGED_IN, false);
				reject();
			}
		});
	},
	[action.LOGOUT_USER]: ({ commit }) => {
		localStorage.removeItem('authUser');
		commit(mutation.SET_USER_ACCESS, '');
		commit(mutation.SET_LOGGED_IN, false);
	},
	[action.UPDATE_USER_DETAILS_ON_SERVER]: ({ commit, state }, details) => {
		updateUserDetails(state.userId, details)
			.then((result) => {
				// console.log('result: ', result);
				commit(mutation.UPDATE_USER_DETAILS, result.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	},
};
