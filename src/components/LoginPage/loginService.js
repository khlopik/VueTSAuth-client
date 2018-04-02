import axios from 'axios';
import config from '@/../config';


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
		axios.get(`${config.dev.APIENDPOINT}/users`, header())
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
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
		axios.post(`${config.dev.APIENDPOINT}/auth/login`, {
			email,
			password,
		})
			.then((result) => {
				saveAuthUser(result);
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
				saveAuthUser(result);
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	})
);

const authUserByToken = () => (
	new Promise((resolve, reject) => {
		axios.get(`${config.dev.APIENDPOINT}/auth/me`, header())
			.then((result) => {
				// console.log('result.data: ', result.data);
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
		axios.patch(`${config.dev.APIENDPOINT}/users/${userId}`, details, header())
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	})
);

const removeUserAccount = (userId) => {
	return new Promise((resolve, reject) => {
		axios.delete(`${config.dev.APIENDPOINT}/users/${userId}`, header())
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
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
	removeUserAccount,
};
