import axios from 'axios';
import config from '@/../config';

const authUser = JSON.parse(localStorage.getItem('authUser'))
const header = {
	headers: {
		'x-auth': authUser ? authUser.token : '',
	},
};

const loginService = (email, password) => (
	new Promise((resolve, reject) => {
		// console.log('process.env.APIENDPOINT: ', config.dev.APIENDPOINT);
		axios.post(`${config.dev.APIENDPOINT}/auth/login`, {
			email,
			password,
		})
			.then((result) => {
				localStorage.setItem('authUser', JSON.stringify({
					email: result.data.email,
					token: result.headers['x-auth'],
					access: result.data.access,
				}));
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	}));

const createUser = (email, password) => (
	new Promise((resolve, reject) => {
		axios.post(`${config.dev.APIENDPOINT}/users`, {
			email,
			password,
		})
			.then((result) => {
				localStorage.setItem('authUser', JSON.stringify({
					email: result.data.email,
					token: result.headers['x-auth'],
					access: result.data.access,
				}));
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	})
);

const authUserByToken = token => (
	new Promise((resolve, reject) => {
		axios.get(`${config.dev.APIENDPOINT}/auth/me`, {
			headers: {
				'x-auth': token,
			},
		})
			.then((result) => {
				console.log('result.data: ', result.data);
				resolve(result);
			})
			.catch((error) => {
				localStorage.removeItem('authUser');
				reject(error);
			});
	})
);

const updateUserDetails = (userId, details) => (
	new Promise((resolve, reject) => {
		axios.patch(`${config.dev.APIENDPOINT}/users/${userId}`, details, header)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	})
);

export {
	loginService,
	createUser,
	authUserByToken,
	updateUserDetails,
};
