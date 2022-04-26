import { getAxiosInstance } from './axios/index';

export default {
	
	async fetchUserRoles() {

		const { data } = await getAxiosInstance('/userRole').post('/');

		return data;

	},

}