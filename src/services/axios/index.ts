
import axios from 'axios';

function getAxiosInstance(url: string) {

	console.log(import.meta.env.VITE_APP_API_URL);
	
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_API_URL + '/api' + url
	});

	const token = (localStorage.getItem('token') !== null ? localStorage.getItem('token') : false);

	if (token) {
		axiosInstance.defaults.headers.common['authorization'] = token;
	}

	return axiosInstance;

}

export { getAxiosInstance };