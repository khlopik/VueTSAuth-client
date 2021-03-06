import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import LoginPage from '@/components/LoginPage/LoginPage';
import { authUserByToken } from '@/components/LoginPage/loginService';
import { types } from '@/store';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main,
		// meta: {
		// 	requiresAuth: true,
		// },
	},
	{
		name: 'login',
		path: '/login',
		component: LoginPage,
	},
];

const router = new Router({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	// store.dispatch(types.auth.action.CHECK_LOGIN_ON_SERVER);
	// const authUser = JSON.parse(localStorage.getItem('authUser'));
	// if (to.meta.requiresAuth) {
	// 	if (!authUser || !authUser.token) {
	// 		next();
	// 	} else {
	// 		next();
	// 	}
	// } else {
	// 	next();
	// }
	next();
});

export default router;
