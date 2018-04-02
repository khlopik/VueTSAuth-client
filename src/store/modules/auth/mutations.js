/* eslint no-param-reassign: "error" */
import config from '@/../config';
import { mutation } from './types';
import Vue from 'vue';
import _ from 'lodash';


export default {
	[mutation.SET_LOGGED_IN]: (auth, status) => {
		auth.isLoggedIn = status;
	},
	[mutation.SET_USER_URL]: (auth, url) => {
		auth.userUrl = url;
	},
	[mutation.SET_USER_ACCESS]: (auth, access) => {
		auth.userAccess = access;
	},
	[mutation.UPDATE_USER_DETAILS]: (auth, data) => {
		auth.userAccess = data.access;
		auth.details.name = data.details.name;
		auth.details.email = data.email;
		auth.userId = data._id;
		auth.details.avatar = `${config.dev.APIENDPOINT}/${data.details.avatar}`;
		// Vue.set(auth.details, 'avatar', `${config.dev.APIENDPOINT}/${data.details.avatar}`);
	},
	[mutation.CLEAR_USER_AVATAR]: (auth) => {
		auth.details.avatar = `${config.dev.APIENDPOINT}/images/unauth/unknown.png`;
	},
	[mutation.SAVE_USERS_TO_STORE]: (auth, users) => {
		console.log('users: ', users);
		auth.users = _.map(users, (user) => {
			console.log('user: ', user);
			const updatedUser = {
				...user,
				details: {
					...user.details,
					avatar: `${config.dev.APIENDPOINT}/${user.details.avatar}`,
				}
			};
			console.log('updatedUser: ', updatedUser);
			return updatedUser;
		});
	},
};
