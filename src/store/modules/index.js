import auth, { types as authTypes, getters as authGetters } from './auth';

export const types = {
	auth: authTypes,
};

export const getters = {
	...authGetters,
};

export const modules = {
	auth,
};
