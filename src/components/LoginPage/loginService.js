import axios from 'axios';
import config from '../../../config';

const loginService = (email, password) => {
	console.log('start loginService');
	return new Promise((resolve, reject) => {
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
	});
};

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
				resolve(result);
			})
			.catch((error) => {
				localStorage.removeItem('authUser');
				reject(error);
			});
	})
);

export {
	loginService,
	createUser,
	authUserByToken,
};
