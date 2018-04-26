/* eslint no-param-reassign: "error" */
import _ from 'lodash';
import { mutation } from './types';

export default {
	[mutation.SET_HOST_ADDRESS]: (app, host) => {
		app.hostAddress = host;
	},
};
