<template>
    <div class="container">
		<div class="row">
			<div class="col-md-12 col-lg-4 mx-auto">
				<div class="mx-auto rounded shadow-lg p-3 mt-5 bg-white">
					<div class="d-flex justify-content-center">
						<h2> Lets Blog </h2>
					</div>
					
					<div class="mt-4">
						<form @submit.prevent="signIn()" novalidate>
							<div class="mb-3">
								<label for="email" class="fw-bolder">Email address </label>
								<input type="email" class="form-control" v-model="user.email" >
								
							</div>
							<div class="mb-3">
								<label for="password" class="fw-bolder">Password</label>
								<input type="password" class="form-control" v-model="user.password" >
							</div>

							<div class="d-flex justify-content-between">
								<button class="btn btn-outline-primary w-100"> Sign In </button>
							</div>

							<div class="d-flex align-items-center justify-content-between pt-3">
								<router-link :to="{ name: 'forgot-password' }" tag="a" class="btn btn-link link-primary"> Forgot Password </router-link>
								<router-link :to="{ name: 'register' }" tag="a" class="btn btn-link link-primary"> Sign Up </router-link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>

// import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'pinia';
import Alert from '../../utilities/Alert.js';

import { userStore } from '../../store/user.store';

export default {

	data() {

		return {

			message: false,

			user: {
				email: '',
				password: ''
			}
			
		}

	},

	// validations: {

	// 	user: {

	// 		email: { required, email },
	// 		password: { required }

	// 	}

	// },

	methods: {

		...mapActions(userStore, ['login']),

		async signIn() {

			// this.$v.$touch();
			// if (this.$v.$invalid) {
			// 	return;
			// }

			try {

				await this.login(this.user);

				this.$router.push({ name: 'feed' });

			} catch (error) {

				if (error.response.data.message) {

					let message = error.response.data.message;

					Alert.message({
						icon: 'error',
						title: 'Login failed', 
						text: message,
						confirmBtnText: 'Try again',
						confirmButton: true
					});

				}

			}

		}

	}

}

</script>