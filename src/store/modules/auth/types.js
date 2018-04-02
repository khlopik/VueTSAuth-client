export const mutation = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
	SET_USER_URL: 'SET_USER_URL',
	SET_USER_ACCESS: 'SET_USER_ACCESS',
	UPDATE_USER_DETAILS: 'UPDATE_USER_DETAILS',
	CLEAR_USER_AVATAR: 'CLEAR_USER_AVATAR',
	SAVE_USERS_TO_STORE: 'SAVE_USERS_TO_STORE',
};

export const action = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
	SET_USER_URL: 'SET_USER_URL',
	CHECK_LOGIN_ON_SERVER: 'CHECK_LOGIN_ON_SERVER',
	LOGOUT_USER: 'LOGOUT_USER',
	UPDATE_USER_DETAILS_ON_SERVER: 'UPDATE_USER_DETAILS_ON_SERVER',
	CLEAR_USER_AVATAR: 'CLEAR_USER_AVATAR',
	REMOVE_USER_ACCOUNT: 'REMOVE_USER_ACCOUNT',
	GET_USERS_FROM_SERVER: 'GET_USERS_FROM_SERVER',
};

export const getter = {
	IS_LOGGED_IN: 'IS_LOGGED_IN',
	GET_USER_URL: 'GET_USER_URL',
	GET_USER_ROLE: 'GET_USER_ROLE',
	GET_USER_DETAILS: 'GET_USER_DETAILS',
	GET_USER_AVATAR: 'GET_USER_AVATAR',
	GET_ALL_USERS: 'GET_ALL_USERS',
};

export default {
	action,
	mutation,
	getter,
};
