import { authUserByToken, updateUserDetails, removeUserAccount, getUsers, updateUserAccess } from '@/components/LoginPage/loginService';
import { action, mutation } from './types';

export default {
	[action.SET_LOGGED_IN]: ({commit}, status) => {
		commit(mutation.SET_LOGGED_IN, status);
	},
	[action.SET_USER_URL]: ({commit}, url) => {
		commit(mutation.SET_USER_URL, url);
	},
	[action.CHECK_LOGIN_ON_SERVER]: ({commit}) => {
		return new Promise((resolve, reject) => {
			const authUser = JSON.parse(localStorage.getItem('authUser'));
			if (authUser && authUser.token) {
				authUserByToken(authUser.token)
					.then((result) => {
						commit(mutation.SET_LOGGED_IN, true);
						commit(mutation.UPDATE_USER_DETAILS, { data: result.data });
						return resolve();
					})
					.catch((e) => {
						commit(mutation.SET_LOGGED_IN, false);
						return reject();
					});
			} else {
				commit(mutation.SET_LOGGED_IN, false);
				return resolve();
			}
		});
	},
	[action.LOGOUT_USER]: ({commit}) => {
		localStorage.removeItem('authUser');
		commit(mutation.SET_USER_ACCESS, '');
		commit(mutation.SET_LOGGED_IN, false);
	},
	[action.UPDATE_USER_DETAILS_ON_SERVER]: ({ commit }, { userId, details }) => {
		return updateUserDetails(userId, details)
			.then((result) => {
				commit(mutation.UPDATE_USER_DETAILS, { userId, data: result.data });
				return Promise.resolve();
			})
			.catch((error) => {
				console.log('error: ', error);
				return Promise.reject(error);
			});
	},
	[action.CLEAR_USER_AVATAR]: ({commit}, userId) => {
		commit(mutation.CLEAR_USER_AVATAR, userId);
	},
	[action.REMOVE_USER_ACCOUNT]: ({}, userId) => {
		return removeUserAccount(userId)
			.then((result) => {
				// console.log('result: ', result);
				return Promise.resolve(result);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	},
	[action.GET_USERS_FROM_SERVER]: ({ commit }) => {
		getUsers()
			.then((result) => {
				// console.log('result: ', result.data);
				commit(mutation.SAVE_USERS_TO_STORE, result.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	},
	[action.UPDATE_USER_ACCESS]: ({ commit }, { userId, access }) => {
		updateUserAccess(userId, access)
			.then((result) => {
				commit(mutation.UPDATE_USER_ACCESS, { userId, access: result.data.access })
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	},
};
