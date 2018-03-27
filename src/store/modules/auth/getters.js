import { getter } from './types';

export default {
	[getter.IS_LOGGED_IN]: state => (state.auth.isLoggedIn),
	[getter.GET_USER_URL]: state => (state.auth.userUrl),
};
