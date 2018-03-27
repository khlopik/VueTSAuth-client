import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Posts from '@/components/Posts';
import LoginPage from '@/components/LoginPage/LoginPage';
import AdminPage from '@/components/AdminPage/AdminPage';
import ResidentPage from '@/components/ResidentPage/ResidentPage';
import { authUserByToken } from '@/components/LoginPage/loginService';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld,
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
	{
		name: 'admin',
		path: '/admin',
		component: AdminPage,
		meta: {
			requiresAuth: true,
			adminAuth: true,
			residentAuth: false,
		},
	},
	{
		name: 'resident',
		path: '/resident',
		component: ResidentPage,
		meta: {
			requiresAuth: true,
			adminAuth: false,
			residentAuth: true,
		},
	},
];

const router = new Router({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	const authUser = JSON.parse(localStorage.getItem('authUser'));
	if (to.meta.requiresAuth) {
		if (!authUser || !authUser.token) {
			localStorage.setItem('initialUserUrl', to.path);
			next({ name: 'login' });
		} else {
			authUserByToken(authUser.token)
				.then(() => {
					if (to.meta.adminAuth) {
						if (authUser.access === 'Admin') {
							next();
						} else {
							next('/resident');
						}
					} else if (to.meta.residentAuth) {
						if (authUser.access === 'Resident') {
							next();
						} else {
							next('/admin');
						}
					}
				})
				.catch(() => {
					localStorage.removeItem('authUser');
				});
		}
	} else {
		next();
	}
});

export default router;
