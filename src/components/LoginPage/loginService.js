import axios from 'axios';
// import config from '@/../config';


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
		axios.get(`${window.location.origin}/users`, header())
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
		console.log('host', window.location.origin);
		axios.post(`${window.location.origin}/auth/login`, {
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
		axios.post(`${window.location.origin}/users`, {
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
		axios.get(`${window.location.origin}/auth/me`, header())
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
		axios.patch(`${window.location.origin}/users/${userId}`, details, header())
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
		axios.patch(`${window.location.origin}/users/access/${userId}`, { access }, header())
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
		axios.delete(`${window.location.origin}/users/${userId}`, header())
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
