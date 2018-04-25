export const mutation = {
	ADD_USER_MESSAGE: 'ADD_USER_MESSAGE',
	REMOVE_USER_MESSAGE: 'REMOVE_USER_MESSAGE',
};

export const action = {
	SHOW_USER_MESSAGE: 'SHOW_USER_MESSAGE',
	HIDE_USER_MESSAGE: 'HIDE_USER_MESSAGE',
};

export const getter = {
	USER_MESSAGES: 'USER_MESSAGES',
	AUTO_HIDE: 'AUTO_HIDE',
	GET_HIDE_DELAY: 'GET_HIDE_DELAY',
};

export default {
	action,
	mutation,
	getter,
};
