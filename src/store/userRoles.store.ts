import { defineStore } from 'pinia';
import userRolesService from '../services/userRoles';

export const userRolesStore = defineStore('userRolesStore', {
	
	state: () => ({
		userRoles: []
	}),
	
	actions: {

		isModerator() {
	
			// if (this.userRoles.includes('moderator')) {
				return true;
			// }
			
			// return false;
	
		},
	
		isAdmin() {
	
			// if (this.userRoles.includes('admin')) {
				return true;
			// }
			
			// return false;
	
		},

		async getUserRoles() {

			const { userRoles } = await userRolesService.fetchUserRoles();

			this.userRoles = userRoles;

		}

	}

});