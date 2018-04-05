import axios from 'axios';
import config from '@/../config/';
import prod from '@/../config/prod.env';
import dev from '@/../config/dev.env';

export const server = process.env.NODE_ENV === 'production' ? prod.APIENDPOINT : dev.APIENDPOINT;

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

const loginService = (email, password) => (
	new Promise((resolve, reject) => {
		// console.log('host', server);
		axios.post(`${server}/auth/login`, {
			email,
			password,
		})
			.then((result) => {
				saveAuthUser(result);
				return resolve(result.data);
			})
			.catch((error) => {
				if (!error.response) {
					return reject(error);
				}
				// console.log('error.response: ', error.response);
				// console.log('error: ', error);
				return reject(error.response.status);
			});
	}));

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

const authUserByToken = () => (
	new Promise((resolve, reject) => {
		axios.get(`${server}/auth/me`, header())
			.then((result) => {
				console.log('result.data: ', result.data);
				return resolve(result);
			})
			.catch((error) => {
				// console.log('error: ', error);
				localStorage.removeItem('authUser');
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
	getUsers,
	createUser,
	authUserByToken,
	updateUserDetails,
	updateUserAccess,
	removeUserAccount,
};
