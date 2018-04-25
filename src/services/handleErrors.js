const catchErrors = (fn) => {
	return (...args) => {
		return fn(...args).catch((error) => {
			if (error && error.response && error.response.status ) {
				console.log('error.response.status: ', error.response.status);
			}
			if (error && error.response && error.response.data) {
				console.log('error.response.data: ', error.response.data);
			}
		});
	};
};

export default catchErrors;
