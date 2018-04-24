import { authUserByToken, updateUserDetails, removeUserAccount, getUsers, updateUserAccess, isLoggedIn, loginService, logout } from '@/components/LoginPage/loginService';
import { action, mutation } from './types';

export default {
	[action.REQUEST_HOST_ADDRESS]: ({commit}) => {
		let host;
		if (location.host.includes('localhost')) {
			console.log('This is Development mode');
			host = `${location.protocol}//${location.hostname}:8081`;
		} else {
			console.log('This is Production mode');
			host = `${location.protocol}//${location.hostname}`;
		}
		console.log('host: ', host);
		commit(mutation.SET_HOST_ADDRESS, host);
	},
	[action.SET_LOGGED_IN]: ({commit}, status) => {
		commit(mutation.SET_LOGGED_IN, status);
	},
	[action.SET_USER_URL]: ({commit}, url) => {
		commit(mutation.SET_USER_URL, url);
	},
	[action.LOGIN_BY_CREDENTIALS]: ({commit}, credentials) => {
		return new Promise((resolve, reject) => {
			loginService(credentials)
				.then(result => {
					// console.log('result.data inside LOGIN_BY_CREDENTIALS action: ', result);
					commit(mutation.SET_LOGGED_IN, true);
					commit(mutation.UPDATE_USER_DETAILS, { data: result });
					// commit(mutation.SET_DEFAULT_AVATAR, result.data.defaultAvatar);
					resolve();
				})
				.catch(error => {
					console.log('error: ', error);
					reject();
				});
		});

	},
	[action.CHECK_LOGIN_ON_SERVER]: ({commit}) => {
		return new Promise((resolve, reject) => {
			isLoggedIn()
				.then((result) => {
					commit(mutation.SET_LOGGED_IN, true);
					// console.log('result in actions: ', result);
					commit(mutation.UPDATE_USER_DETAILS, { data: result });
					commit(mutation.SET_DEFAULT_AVATAR, result.defaultAvatar);
					return resolve();
				})
				.catch((e) => {
					commit(mutation.SET_LOGGED_IN, false);
					return reject(e);
				});
		});
	},
	[action.LOGOUT_USER]: ({commit}) => {
		logout()
			.catch(error => {
				return 'Cannot logout';
			});
		commit(mutation.SET_USER_ACCESS, '');
		commit(mutation.SET_LOGGED_IN, false);
	},
	[action.UPDATE_USER_DETAILS_ON_SERVER]: ({ commit }, { userId, details }) => {
		return updateUserDetails(userId, details)
			.then((result) => {
				// console.log('result: ', result);
				commit(mutation.UPDATE_USER_DETAILS, { userId, data: result.data });
				return Promise.resolve();
			})
			.catch((error) => {
				console.log('catch in action');
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
