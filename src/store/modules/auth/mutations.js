/* eslint no-param-reassign: "error" */
// import config from '@/../config';
import prod from '@/../config/prod.env';
import dev from '@/../config/dev.env';
import _ from 'lodash';
import { mutation } from './types';


let server = dev.APIENDPOINT;
if (process.env.NODE_ENV === 'production') {
	server = prod.APIENDPOINT;
}

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
			auth.details.avatar = data.details.avatar !== '' ? `${server}/${data.details.avatar}` : '';
		}
		auth.users = _.map(auth.users, (user) => {
			if (user._id === userId) {
				console.log('user: ', user);
				console.log('data.details: ', data.details);
				return {
					...user,
					details: {
						...user.details,
						name: data.details.name,
						avatar: data.details.avatar !== '' ? `${server}/${data.details.avatar}` : '',
					},
				}
			} else {
				return user;
			}
		});
	},
	[mutation.CLEAR_USER_AVATAR]: (auth, userId) => {
		if (!userId) {
			auth.details.avatar = '';
		} else {
			if (userId === auth.userId) {
				auth.details.avatar = '';
			}
			const result = _.map(auth.users, (user) => {
				if (user._id === userId) {
					return {
						...user,
						details: {
							...user.details,
							avatar: '',
						},
					};
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
					avatar: user.details.avatar !== '' ? `${server}/${user.details.avatar}` : '',
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
	[mutation.SET_DEFAULT_AVATAR]: (auth, avatar) => {
		auth.defaultAvatar = `${server}/${avatar}`;
	},
};
