import axios from 'axios';
import config from '@/../config/';
import prod from '@/../config/prod.env';
import dev from '@/../config/dev.env';
import store from '@/store';

// const webpackConfig = require('../../../build/webpack.prod.conf');
// import { webpackConfig } from '../../../build/webpack.prod.conf';
//
// console.log('webpackConfig: ', webpackConfig);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
// console.log('location.host: ', location.host);


// export let store.getters.HOST_ADDRESS = process.env.NODE_ENV === 'production' ? prod.APIENDPOINT : dev.APIENDPOINT;
axios.defaults.withCredentials = true;


// store.getters.HOST_ADDRESS = store.getters.HOST_ADDRESS.replace(/['"]+/g, '');
// console.log('store.getters.HOST_ADDRESS: ', store.getters.HOST_ADDRESS);

const header = () => {
	const authUser = JSON.parse(localStorage.getItem('authUser'));
	return {
		headers: {
			'x-auth':	authUser && authUser.token ? authUser.token : '',
		},
	};
};

const getUsers = () => (
	new Promise((resolve, reject) => {
		axios.get(`${store.getters.HOST_ADDRESS}/users`, header())
			.then((result) => {
				return resolve(result);
			})
			.catch((error) => {
				// console.log('error: ', error);
				return reject(error);
			});
	})
);

const saveAuthUser = (result) => {
	localStorage.setItem('authUser', JSON.stringify({
		email: result.data.email,
		token: result.headers['x-auth'],
		access: result.data.access,
	}));
};

const loginService = (credentials) => (
	new Promise((resolve, reject) => {
		// console.log('host', store.getters.HOST_ADDRESS);
		axios.post(`${store.getters.HOST_ADDRESS}/auth/login`, credentials)
			.then((result) => {
				// console.log('result in loginService.js: ', result);
				saveAuthUser(result);
				return resolve(result.data);
			})
			.catch((error) => {
				console.log('error in loginService.js: ', error);
				if (!error.response) {
					return reject(error);
				}
				// console.log('error.response: ', error.response);
				// console.log('error: ', error);
				return reject(error.response.status);
			});
	}));

const logout = () => {
	return axios.get(`${store.getters.HOST_ADDRESS}/logout`);
};

const isLoggedIn = (req, res) => {
	console.log('`${store.getters.HOST_ADDRESS}/auth/me`: ', `${store.getters.HOST_ADDRESS}/auth/me`);
	console.log('store: ', store.state.auth.hostAddress);
	console.log('getter: ', store.getters.HOST_ADDRESS);
	return axios.get(`${store.getters.HOST_ADDRESS}/auth/me`)
		.then(result => {
			// console.log('result in isLoggedIn (loginService.js): ', result);
			return result.data;
		})
		.catch(error => {
			console.log('error in isLoggedIn (loginService.js): ', error);
			return Promise.reject(error.response.status);
		});
};

const createUser = (email, password) => (
	new Promise((resolve, reject) => {
		axios.post(`${store.getters.HOST_ADDRESS}/users`, {
			email,
			password,
		})
			.then((result) => {
				saveAuthUser(result);
				return resolve(result.data);
			})
			.catch((error) => {
				// console.log('error: ', error);
				return reject(error);
			});
	})
);

const updateUserDetails = (userId, details) => (
	new Promise((resolve, reject) => {
		axios.patch(`${store.getters.HOST_ADDRESS}/users/${userId}`, details, header())
			.then((result) => {
				// console.log('result: ', result);
				return resolve(result);
			})
			.catch((error) => {
				// console.log('error: ', error);
				return reject(error);
			});
	})
);

const updateUserAccess = (userId, access) => (
	new Promise((resolve, reject) => {
		axios.patch(`${store.getters.HOST_ADDRESS}/users/access/${userId}`, { access }, header())
			.then((result) => {
				// console.log('result: ', result);
				return resolve(result);
			})
			.catch((error) => {
				// console.log('error: ', error);
				return reject(error);
			});
	})
);


const removeUserAccount = (userId) => {
	return new Promise((resolve, reject) => {
		axios.delete(`${store.getters.HOST_ADDRESS}/users/${userId}`, header())
			.then((result) => {
				return resolve(result);
			})
			.catch((error) => {
				// console.log('error: ', error);
				return reject(error);
			});
	});
};

export {
	loginService,
	isLoggedIn,
	logout,
	getUsers,
	createUser,
	updateUserDetails,
	updateUserAccess,
	removeUserAccount,
};
