<template>
    <div class="container">
		<div class="row">
			<div class="col-md-12 col-lg-6 mx-auto">
				<div class="shadow p-3 mt-5 radius-10 bg-white">
					<div v-if="message" v-html="message" class="alert alert-success" role="alert"></div>

					<div v-if="sentEmail">
						<a href="javascript:void(0);" class="btn btn-link" @click="resendEmail()" > Resend Email </a>
					</div>
					<div v-else>
						<h2 class="mb-3"> Forgot Password </h2>

						<form @submit.prevent="submitPasswordReset()">
							<div class="mb-3">
								<input type="email" class="form-control" v-model="user.email" placeholder="Email">
								<!-- <div v-if="$v.user.email.$error" class="invalid-feedback">
									<span v-if="!$v.user.email.email"> Email is invalid </span>
								</div> -->
							</div>
							
							<div class="d-flex alig-items center justify-content-between">
								<div v-if="!sentEmail" >
									<button class="btn btn-outline-primary" :disabled="loading"> {{ buttonText }} </button>
								</div>
								<router-link tag="a" :to="{ name: 'login' }" class="btn btn-link link-primary" >Back to Login</router-link>
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
import { userStore } from '../../store/user.store';
import Alert from '../../utilities/Alert.js';

export default {

	data() {

		return {

			loading: false,
			sentEmail: false,
			message: '',
			user: {
				email: '',
			},

		}

	},

	// validations: {

	// 	user: {

	// 		email: { required, email },

	// 	}

	// },

	computed: {

		buttonText() {

			if (this.loading) {
				return 'Sending email...';
			} else {
				return 'Send password reset email';
			}

		}

	},

	methods: {

		...mapActions(userStore, ['passwordReset']),

		resendEmail() {
			this.user.email = '';
			this.message = false;
			this.sentEmail = false;
		},

		async submitPasswordReset() {

			// this.$v.$touch()
			// if (this.$v.$invalid) {
			// 	return;
			// }

			this.loading = true;
			
			try {

				let { message } = await this.passwordReset(this.user);

				this.loading = false;
				this.sentEmail = true;
				this.message = message;

			} catch (error) {

				if (error.response.data.message) {

					this.loading = false;

					let message = error.response.data.message;

					Alert.message({
						icon: 'error',
						title: 'Forgot Password', 
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