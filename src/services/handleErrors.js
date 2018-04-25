import store from '@/store';
import { types } from '@/store/modules';

const catchErrors = (fn) => {
	return (...args) => {
		return fn(...args).catch((error) => {
			let status = '';
			let	message = '';
			// console.log('error: ', JSON.stringify(error, undefined, 2));
			if (error && error.response && error.response.status ) {
				// console.log('error.response.status: ', error.response.status);
				status = error.response.status;
			}
			if (error && error.response && error.response.data) {
				// console.log('error.response.data: ', error.response.data);
				message = error.response.data;
			}
			const errorMessage = {
				messageText: `Error occurred. ${status ? 'Status: ' + status + '. ' : ''}${message ? 'Message: ' + message : ''}`,
				messageType: 'error',
			};
			store.dispatch(types.userMessages.action.SHOW_USER_MESSAGE, errorMessage);
		});
	};
};

export default catchErrors;
