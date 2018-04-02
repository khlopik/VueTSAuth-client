import { authUserByToken, updateUserDetails, removeUserAccount, getUsers } from '@/components/LoginPage/loginService';
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
	[action.LOGOUT_USER]: ({commit}) => {
		localStorage.removeItem('authUser');
		commit(mutation.SET_USER_ACCESS, '');
		commit(mutation.SET_LOGGED_IN, false);
	},
	[action.UPDATE_USER_DETAILS_ON_SERVER]: ({ commit }, { userId, details }) => {
		console.log('userId inside actions: ', userId);
		console.log('details inside details: ', details);
		return updateUserDetails(userId, details)
			.then((result) => {
				console.log('result: ', result);
				commit(mutation.UPDATE_USER_DETAILS, result.data);
				Promise.resolve();
			})
			.catch((error) => {
				console.log('error: ', error);
				Promise.reject(error);
			});
	},
	[action.CLEAR_USER_AVATAR]: ({commit}, userId) => {
		commit(mutation.CLEAR_USER_AVATAR, userId);
	},
	[action.REMOVE_USER_ACCOUNT]: ({}, userId) => {
		return removeUserAccount(userId)
			.then((result) => {
				// console.log('result: ', result);
				Promise.resolve(result);
			})
			.catch((error) => {
				Promise.reject(error);
			});
	},
	[action.GET_USERS_FROM_SERVER]: ({ commit }) => {
		console.log('getUsersFromServer');
		getUsers()
			.then((result) => {
				// console.log('result: ', result.data);
				commit(mutation.SAVE_USERS_TO_STORE, result.data);
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	},
};
