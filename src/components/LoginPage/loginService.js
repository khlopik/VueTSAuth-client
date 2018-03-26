import axios from 'axios';
import config from '../../../config';

const loginService = (username, password) => {
	console.log('start loginService');
	return new Promise((resolve, reject) => {
		// console.log('process.env.APIENDPOINT: ', config.dev.APIENDPOINT);
		axios.post(`${config.dev.APIENDPOINT}/auth/login`, {
			username,
			password,
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default loginService;
