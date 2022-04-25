import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LoginPage from '../pages/auth/Login.vue';
import RegisterPage from '../pages/auth/Register.vue';

const routes: Array<RouteRecordRaw> = [
	{
		name: 'home',
		path: '/',
		component: LoginPage
	},
	{
		name: 'login',
		path: '/login',
		component: LoginPage
	}, 
	{
		name: 'register',
		path: '/register',
		component: RegisterPage
	},
	{
		name: 'forgot-password',
		path: '/register',
		component: RegisterPage
	},
];

const router = createRouter({

	history: createWebHistory(),

	routes

});

export default router;