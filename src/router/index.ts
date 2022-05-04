import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LoginPage from '../pages/auth/Login.vue';
import RegisterPage from '../pages/auth/Register.vue';
import ForgotPasswordPage from '../pages/auth/ForgotPassword.vue';
import ChangePasswordPage from '../pages/auth/ChangePassword.vue';

import BlogFeed from '../pages/public/BlogFeed.vue';
import BlogPost from '../pages/public/BlogPost.vue';
import BlogCategory from '../pages/public/BlogCategory.vue';

import { lazyLoad } from '../utilities/functions';

const routes: Array<RouteRecordRaw> = [
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
		path: '/forgot-password',
		component: ForgotPasswordPage
	},
	
	{
		name: 'change-password',
		path: '/change-password/:token',
		component: ChangePasswordPage
	},	

	{
		name: 'feed',
		path: '/',
		component: BlogFeed,
	},

	{
		name: 'blog-post',
		path: '/post/:id',
		component: BlogPost,
	},

	{
		name: 'blog-category',
		path: '/category/:id',
		component: BlogCategory,
	},

	{
		name: 'profile',
		path: '/profile',
		component: lazyLoad('pages/profile/index'),
		meta: {
			requiresAuth: true
		}
	},

	{
		name: 'edit-profile',
		path: '/edit-profile',
		component: lazyLoad('pages/profile/EditProfile'),
		meta: {
			requiresAuth: true
		}
	},

	{
		name: 'categories',
		path: '/categories',
		component: lazyLoad('pages/category/index'),
		meta: {
			requiresAuthAndIsAdmin: true
		}
	},

	{
		name: 'add-post',
		path: '/add-post',
		component: lazyLoad('pages/post/Add'),
		meta: {
			requiresAuth: true
		}
	},

	{
		name: 'edit-post',
		path: '/edit-post/:id',
		component: lazyLoad('pages/post/Edit'),
		meta: {
			requiresAuth: true
		}
	},

	{
		name: 'post-list',
		path: '/post-list',
		component: lazyLoad('pages/post/List'),
		meta: {
			requiresAuth: true
		}
	},

	{
		name: 'review-posts',
		path: '/review-posts',
		component: lazyLoad('pages/reviewPosts/index'),
		meta: {
			requiresAuth: true
		}
	},

	{
		name: 'review-post',
		path: '/review-post/:id',
		component: lazyLoad('pages/reviewPosts/reviewPost'),
		meta: {
			requiresAuth: true
		}
	},

];

const router = createRouter({

	history: createWebHistory(),

	linkActiveClass: 'fw-bolder',

	routes

});

export default router;