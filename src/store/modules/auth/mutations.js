/* eslint no-param-reassign: "error" */
import config from '@/../config';
import _ from 'lodash';
import { mutation } from './types';

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
	[mutation.UPDATE_USER_DETAILS]: (auth, { userId, data }) => {
		if (!userId || (userId === auth.userId)) {
			auth.userAccess = data.access;
			auth.details.name = data.details.name;
			auth.details.email = data.email;
			auth.userId = data._id;
			auth.details.avatar = `${config.dev.APIENDPOINT}/${data.details.avatar}`;
		} else {
			auth.users = _.map(auth.users, (user) => {
				if (user._id === userId) {
					return {
						...user,
						details: {
							...user.details,
							name: data.details.name,
							avatar: `${config.dev.APIENDPOINT}/${data.details.avatar}`,
						},
					}
				} else {
					return user;
				}
			});
		}
	},
	[mutation.CLEAR_USER_AVATAR]: (auth, userId) => {
		if (!userId) {
			auth.details.avatar = `${config.dev.APIENDPOINT}/images/unauth/unknown.png`;
		} else {
			if (userId === auth.userId) {
				auth.details.avatar = `${config.dev.APIENDPOINT}/images/unauth/unknown.png`;
			}
			const result = _.map(auth.users, (user) => {
				if (user._id === userId) {
					return {
						...user,
						details: {
							...user.details,
							avatar: `${config.dev.APIENDPOINT}/images/unauth/unknown.png`,
						},
					}
				} else {
					return user;
				}
			});
			auth.users = result;
		}

	},
	[mutation.SAVE_USERS_TO_STORE]: (auth, users) => {
		// console.log('users: ', users);
		auth.users = _.map(users, (user) => {
			// console.log('user: ', user);
			const updatedUser = {
				...user,
				details: {
					...user.details,
					avatar: `${config.dev.APIENDPOINT}/${user.details.avatar}`,
				},
			};
			// console.log('updatedUser: ', updatedUser);
			return updatedUser;
		});
	},
	[mutation.UPDATE_USER_ACCESS]: (auth, { userId, access }) => {
		if (userId === auth.userId) {
			auth.access = access;
		} else {
			auth.users = _.map(auth.users, (user) => {
				if (user._id === userId) {
					return {
						...user,
						access,
					};
				} else {
					return user;
				}
			});
		}
	},
};
