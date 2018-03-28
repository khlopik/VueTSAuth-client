export const mutation = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
	SET_USER_URL: 'SET_USER_URL',
	SET_USER_ACCESS: 'SET_USER_ACCESS',
};

export const action = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
	SET_USER_URL: 'SET_USER_URL',
	CHECK_LOGIN_ON_SERVER: 'CHECK_LOGIN_ON_SERVER',
	LOGOUT_USER: 'LOGOUT_USER',
};

export const getter = {
	IS_LOGGED_IN: 'IS_LOGGED_IN',
	GET_USER_URL: 'GET_USER_URL',
	GET_USER_ROLE: 'GET_USER_ROLE',
};

export default {
	action,
	mutation,
	getter,
};
