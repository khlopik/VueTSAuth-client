import { getter } from './types';

export default {
	[getter.HOST_ADDRESS]: state => (state.app.hostAddress),
};
