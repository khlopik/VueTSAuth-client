import axios from 'axios';
import config from '@/../config/';
import prod from '@/../config/prod.env';
import dev from '@/../config/dev.env';

export const server = process.env.NODE_ENV === 'production' ? prod.APIENDPOINT : dev.APIENDPOINT;
axios.defaults.withCredentials = true;

// console.log('server: ', server);

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
		axios.get(`${server}/users`, header())
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
		// console.log('host', server);
		axios.post(`${server}/auth/login`, credentials)
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
	return axios.get(`${server}/logout`);
};

const isLoggedIn = (req, res) => {
	return axios.get(`${server}/auth/me`)
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
		axios.post(`${server}/users`, {
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
		axios.patch(`${server}/users/${userId}`, details, header())
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
		axios.patch(`${server}/users/access/${userId}`, { access }, header())
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
		axios.delete(`${server}/users/${userId}`, header())
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
