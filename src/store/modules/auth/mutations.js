/* eslint no-param-reassign: "error" */
import config from '@/../config';
import { mutation } from './types';
import Vue from 'vue';


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
		console.log('before updating the store');
		auth.userAccess = data.access;
		auth.details.name = data.details.name;
		auth.details.email = data.email;
		auth.userId = data._id;
		// auth.details.avatar = `${config.dev.APIENDPOINT}/${data.details.avatar}`;
		Vue.set(auth.details, 'avatar', `${config.dev.APIENDPOINT}/${data.details.avatar}`);
	},
};
