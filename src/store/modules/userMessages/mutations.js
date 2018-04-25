/* eslint no-param-reassign: "error" */
import _ from 'lodash';
import { mutation } from './types';

export default {
	[mutation.ADD_USER_MESSAGE]: (userMessages, message) => {
		userMessages.messages.push(message);
	},
	[mutation.REMOVE_USER_MESSAGE]: (userMessages, messageId) => {
		userMessages.messages = _.filter(userMessages.messages, message => (message.id !== messageId));
	},
};
