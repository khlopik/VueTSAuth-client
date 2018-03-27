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
				localStorage.setItem('token', result.headers['x-auth']);
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
				localStorage.setItem('token', result.headers['x-auth']);
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
};
