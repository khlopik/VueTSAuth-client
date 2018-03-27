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
		name: 'Login',
		path: '/login',
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

router.beforeEach();

export default router;
