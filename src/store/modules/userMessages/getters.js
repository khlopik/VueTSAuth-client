import { getter } from './types';

export default {
	[getter.USER_MESSAGES]: state => (state.userMessages.messages),
	[getter.AUTO_HIDE]: state => (state.userMessages.autoHide),
	[getter.GET_HIDE_DELAY]: state => (state.userMessages.hideDelay),
};
