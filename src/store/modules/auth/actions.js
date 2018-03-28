import { authUserByToken } from '@/components/LoginPage/loginService';
import { action, mutation } from './types';

export default {
	[action.SET_LOGGED_IN]: ({ commit }, status) => {
		commit(mutation.SET_LOGGED_IN, status);
	},
	[action.SET_USER_URL]: ({ commit }, url) => {
		commit(mutation.SET_USER_URL, url);
	},
	[action.CHECK_LOGIN_ON_SERVER]: ({ commit }) => {
		const authUser = JSON.parse(localStorage.getItem('authUser'));
		console.log('authUser: ', authUser);
		if (authUser && authUser.token) {
			console.log('token exists');
			authUserByToken(authUser.token)
				.then((result) => {
					console.log('before dispatch mutation');
					console.log('result: ', result.data);
					commit(mutation.SET_LOGGED_IN, true);
					commit(mutation.SET_USER_ACCESS, result.data.access);
				})
				.catch((e) => {
					console.log('in catch statement');
					console.log('e: ', e);
					commit(mutation.SET_LOGGED_IN, false);
				});
		} else {
			console.log('in else statement of checking localStorage');
			commit(mutation.SET_LOGGED_IN, false);
		}
	},
};
