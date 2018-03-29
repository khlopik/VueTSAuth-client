import { getter } from './types';

export default {
	[getter.IS_LOGGED_IN]: state => (state.auth.isLoggedIn),
	[getter.GET_USER_URL]: state => (state.auth.userUrl),
	[getter.GET_USER_ROLE]: state => (state.auth.userAccess),
	[getter.GET_USER_DETAILS]: state => ({
		access: state.auth.userAccess,
		name: state.auth.details.name,
		avatar: state.auth.details.avatar,
		email: state.auth.details.email,
	}),
	[getter.GET_USER_AVATAR]: state => (state.auth.details.avatar),
};
