import { getUsers } from '@/components/LoginPage/loginService';
import { getter } from './types';
import _ from 'lodash';

export default {
	[getter.IS_LOGGED_IN]: state => (state.auth.isLoggedIn),
	[getter.GET_USER_URL]: state => (state.auth.userUrl),
	[getter.GET_USER_ROLE]: state => (state.auth.userAccess),
	[getter.GET_USER_DETAILS]: state => ({
		access: state.auth.userAccess,
		name: state.auth.details.name,
		avatar: state.auth.details.avatar,
		email: state.auth.details.email,
		id: state.auth.userId,
	}),
	[getter.GET_USER_AVATAR]: state => (state.auth.details.avatar),
	[getter.GET_ALL_USERS]: state => {
		const result = _.map(state.auth.users, user => {
			return {
				name: user.details.name,
				avatar: user.details.avatar,
				email: user.email,
				id: user._id,
				access: user.access,
			}
		});
		return result;
	},
};
