import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Posts from '@/components/Posts';
import LoginPage from '@/components/LoginPage/LoginPage';
import AdminPage from '@/components/AdminPage/AdminPage';
import ResidentPage from '@/components/ResidentPage/ResidentPage';

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
	console.log('authUser: ', authUser);
	console.log('to: ', to);
	if (to.meta.requiresAuth) {
		console.log('requiresAuth');
		if (!authUser || !authUser.token) {
			console.log('not found');
			next({ name: 'login' });
		} else if (to.meta.adminAuth) {
			if (authUser.access === 'Admin') {
				console.log('if Admin');
				next();
			} else {
				next('/resident');
			}
		} else if (to.meta.residentAuth) {
			if (authUser.access === 'Resident') {
				console.log('if Resident');
				next();
			} else {
				next('/admin');
			}
		}
	} else {
		next();
	}
});

export default router;
