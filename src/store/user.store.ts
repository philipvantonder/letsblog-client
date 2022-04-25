import { defineStore } from 'pinia';
import UserService from '../services/user';

export const userStore = defineStore('userStore', {
	
	state: () => ({
		token: localStorage.getItem('token') || false,
		user: ''
	}),

	getters: {
		isLoggedIn(state) {
			return !!state.token
		} 
	},

	actions: {

		async login(userDTO: any) {

			const { token, user } = await UserService.signIn(userDTO);

			localStorage.setItem('token', token);

			this.token = token;
			this.user = user;
		},

		logout() {
			this.token = false;
			this.user = '';
		},

		async setUser() {

			if (this.token) {
				
				let { user } = await UserService.fetchUser();

				this.user = user;
			}

		},

		async updateUser(postDTO: any) {

			const { user } = await UserService.update(postDTO);

			return { user };

		},

		async createUser(postDTO: any) {

			const { message } = await UserService.create(postDTO);

			return { message };

		},

		async passwordReset (postDTO: any) {
				
			const { message } = await UserService.sendPasswordReset(postDTO);

			return { message };
		
		},
		
		async changePassword(postDTO: any) {
			
			const { message } = await UserService.changePassword(postDTO);

			return { message };

		}

	}

});