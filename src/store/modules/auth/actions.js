import * as api from '@/components/LoginPage/loginService';
import router from '@/router';
import catchErrors from '@/services/handleErrors';
import { action, mutation } from './types';

export default {
	[action.CHECK_LOGIN_ON_SERVER]: catchErrors(async ({ commit, getters }) => {
		const result = await api.isLoggedIn();
		commit(mutation.SET_LOGGED_IN, true);
		commit(mutation.UPDATE_USER_DETAILS,
			{ data: result.data, hostAddress: getters.HOST_ADDRESS });
		commit(mutation.SET_DEFAULT_AVATAR,
			{ avatar: result.data.defaultAvatar, hostAddress: getters.HOST_ADDRESS });
	}),
	[action.LOGIN_BY_CREDENTIALS]: catchErrors(async ({ commit, getters }, credentials) => {
		const result = await api.loginByCredentials(credentials);
		commit(mutation.SET_LOGGED_IN, true);
		commit(mutation.UPDATE_USER_DETAILS,
			{ data: result.data, hostAddress: getters.HOST_ADDRESS });
		router.push('/');
	}),
	[action.LOGOUT_USER]: catchErrors(async ({ commit }) => {
		await api.logout();
		commit(mutation.SET_USER_ACCESS, '');
		commit(mutation.SET_LOGGED_IN, false);
	}),
	/* eslint no-unused-vars: ["error", { "args": "none" }] */
	[action.CREATE_USER]: catchErrors(async ({ commit }, { email, password }) => {
		await api.createUser(email, password);
		router.push('/');
	}),
	[action.UPDATE_USER_DETAILS_ON_SERVER]: async ({ commit, getters }, { userId, details }) => {
		const result = await api.updateUserDetails(userId, details);
		commit(mutation.UPDATE_USER_DETAILS,
			{ userId, data: result.data, hostAddress: getters.HOST_ADDRESS });
	},
	[action.CLEAR_USER_AVATAR]: ({ commit }, userId) => {
		commit(mutation.CLEAR_USER_AVATAR, userId);
	},
	[action.REMOVE_USER_ACCOUNT]: catchErrors(async ({ dispatch }, userId) => {
		await api.removeUserAccount(userId);
		dispatch(action.GET_USERS_FROM_SERVER);
	}),
	[action.GET_USERS_FROM_SERVER]: catchErrors(async ({ commit, getters }) => {
		const result = await api.getUsers();
		commit(mutation.SAVE_USERS_TO_STORE, { users: result.data, hostAddress: getters.HOST_ADDRESS });
	}),
	[action.UPDATE_USER_ACCESS]: catchErrors(async ({ commit }, { userId, access }) => {
		const result = await api.updateUserAccess(userId, access);
		commit(mutation.UPDATE_USER_ACCESS, { userId, access: result.data.access });
	}),
};
