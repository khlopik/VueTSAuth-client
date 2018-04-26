import { action, mutation } from './types';

export default {
	[action.REQUEST_HOST_ADDRESS]: ({ commit }) => {
		const host = location.host.includes('localhost') ?
			`${location.protocol}//${location.hostname}:8081` :
			`${location.protocol}//${location.hostname}`;
		commit(mutation.SET_HOST_ADDRESS, host);
	},
};
