import { getAxiosInstance } from './axios/index';

export default {

	async signIn(user: any) {

		const { data } = await getAxiosInstance('/users').post('/login', user);

		return data;

	},

	async create(user: any) {

		const { data } = await getAxiosInstance('/users').post('/register', user);
		
		return data;	

	},

	async isAuthenticated() {

		const { data } = await getAxiosInstance('/users').get('/isAuthenticated');

		return data;

	},

	async fetchUser() {

		const { data } = await getAxiosInstance('/users').get('/getUser');

		return data;

	},

	async update(userDTO: any) {

		const { data } = await getAxiosInstance('/users').put('/update', userDTO, 
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}

			}
		);

		return data;

	},

	async sendPasswordReset(userDTO: any) {

		const { data } = await getAxiosInstance('/users').post('/sendPasswordReset', userDTO);

		return data;

	},

	async changePassword(userDTO: any) {

		const { data } = await getAxiosInstance('/users').post('/changePassword', userDTO);

		return data;

	}

}