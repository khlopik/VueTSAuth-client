import axios from 'axios';
import config from '@/../config';

console.log('config.APIENDPOINT: ', config);
console.log('location: ', location);
const server = process.env.APIENDPOINT || `${location.protocol}//${location.hostname}:8081`;
console.log('server: ', server);

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
				resolve(result);
			})
			.catch((error) => {
				console.log('error: ', error);
				reject(error);
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
		console.log('host', server);
		axios.post(`${server}/auth/login`, {
			email,
			password,
		})
			.then((result) => {
				saveAuthUser(result);
				resolve(result.data);
			})
			.catch((error) => {
				console.log('error: ', error);
				reject(error);
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
				resolve(result.data);
			})
			.catch((error) => {
				console.log('error: ', error);
				reject(error);
			});
	})
);

const authUserByToken = () => (
	new Promise((resolve, reject) => {
		axios.get(`${server}/auth/me`, header())
			.then((result) => {
				// console.log('result.data: ', result.data);
				resolve(result);
			})
			.catch((error) => {
				console.log('error: ', error);
				localStorage.removeItem('authUser');
				reject(error);
			});
	})
);

const updateUserDetails = (userId, details) => (
	new Promise((resolve, reject) => {
		// console.log('hello inside api.js');
		// console.log('userId inside api.js: ', userId);
		// console.log('details: ', details);
		axios.patch(`${server}/users/${userId}`, details, header())
			.then((result) => {
				// console.log('result: ', result);
				resolve(result);
			})
			.catch((error) => {
				console.log('error: ', error);
				reject(error);
			});
	})
);

const updateUserAccess = (userId, access) => (
	new Promise((resolve, reject) => {
		axios.patch(`${server}/users/access/${userId}`, { access }, header())
			.then((result) => {
				// console.log('result: ', result);
				resolve(result);
			})
			.catch((error) => {
				console.log('error: ', error);
				reject(error);
			});
	})
);


const removeUserAccount = (userId) => {
	return new Promise((resolve, reject) => {
		axios.delete(`${server}/users/${userId}`, header())
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				console.log('error: ', error);
				reject(error);
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
