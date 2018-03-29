import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Posts from '@/components/Posts';
import LoginPage from '@/components/LoginPage/LoginPage';
import AdminPage from '@/components/AdminPage/AdminPage';
import ResidentPage from '@/components/ResidentPage/ResidentPage';
import { authUserByToken } from '@/components/LoginPage/loginService';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/posts',
		name: 'Posts',
		component: Posts,
	},
	{
		name: 'login',
		path: '/auth/login',
		component: LoginPage,
	},
	// {
	// 	name: 'admin',
	// 	path: '/admin',
	// 	component: AdminPage,
	// 	meta: {
	// 		requiresAuth: true,
	// 		adminAuth: true,
	// 		residentAuth: false,
	// 	},
	// },
	// {
	// 	name: 'resident',
	// 	path: '/resident',
	// 	component: ResidentPage,
	// 	meta: {
	// 		requiresAuth: true,
	// 		adminAuth: false,
	// 		residentAuth: true,
	// 	},
	// },
];

const router = new Router({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	// console.log('beforeEach in router');
	const authUser = JSON.parse(localStorage.getItem('authUser'));
	if (to.meta.requiresAuth) {
		if (!authUser || !authUser.token) {
			// console.log('authUser not found in localStorage');
			// localStorage.setItem('initialUserUrl', to.path);
			next({ name: 'login' });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
