import axios from 'axios';
import store from '@/store';

axios.defaults.withCredentials = true;

const isLoggedIn = () => (axios.get(`${store.getters.HOST_ADDRESS}/auth/me`));

const getUsers = () => (axios.get(`${store.getters.HOST_ADDRESS}/users`));

const loginService = credentials => (axios.post(`${store.getters.HOST_ADDRESS}/auth/login`, credentials));

const logout = () => (axios.get(`${store.getters.HOST_ADDRESS}/logout`));

const createUser = (email, password) => (axios.post(`${store.getters.HOST_ADDRESS}/users`, { email, password }));

const updateUserDetails = (userId, details) => (axios.patch(`${store.getters.HOST_ADDRESS}/users/${userId}`, details));

const updateUserAccess = (userId, access) => (axios.patch(`${store.getters.HOST_ADDRESS}/users/access/${userId}`, { access }));

const removeUserAccount = userId => (axios.delete(`${store.getters.HOST_ADDRESS}/users/${userId}`));

export {
	loginService,
	isLoggedIn,
	logout,
	getUsers,
	createUser,
	updateUserDetails,
	updateUserAccess,
	removeUserAccount,
};
