<template>
    <div class="container">
		<div class="mx-auto rounded shadow-lg w-50 p-3 mt-5">
			<h2 class="mb-3"> Change Password </h2>

			<form @submit.prevent="submitChangePassword()">
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" v-model="user.password">
					<!-- <div class="invalid-feedback">
						<span v-if="!$v.user.password.minLength" >Password must have at least 6 letters.</span>
					</div> -->
				</div>

				<div class="form-group">
					<label for="confirmPassword">Confirm Password</label>
					<input type="password" class="form-control" v-model="user.confirmPassword">
					<!-- <div v-if="$v.user.confirmPassword.$error" class="invalid-feedback">
						<span v-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
					</div> -->
				</div>

				<div class="d-flex align-items-center">
					<button class="btn btn-outline-primary"> Change Password </button>
				</div>
			</form>
		</div>
    </div>
</template>

<script>

// import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'pinia';
import Alert from '../../utilities/Alert';
import { userStore } from '../../store/user.store';

export default {

	data() {

		return {

			user: {
				password: '',
				confirmPassword: '',
				token: '',
			}
			
		}

	},

	// validations: {

	// 	user: {

	// 		password: { 
	// 			required, 
	// 			minLength: minLength(6) 
	// 		},
	// 		confirmPassword: { 
	// 			required, 
	// 			sameAsPassowrd: sameAs('password') 
	// 		},

	// 	}

	// },

	methods: {

		...mapActions(userStore, ['changePassword']),

		async submitChangePassword() {

			// this.$v.$touch()
			// if (this.$v.$invalid) {
			// 	return;
			// }

			const { message } = await this.changePassword(this.user);
				
			Alert.message({
				text: message,
				confirmBtnText: 'Login',
				redirect: '/login',
				confirmButton: true
			});

		}

	},
	
	created() {

		const { token } = this.$route.params;

		this.user.token = token;

	}

}
</script>