<template>
	<div class="d-flex flex-column">
		<form @submit.prevent="submitForm()">
			<div>
				<textarea class="form-control" rows="4" placeholder="What is on your mind?" v-model="formData.comment" ></textarea>
				<div class="invalid-feedback">
					<span> Enter a comment </span>
				</div>
			</div>
			<div class="mt-3">
				<button class="btn btn-primary"> Add Comment </button>
				<button class="btn btn-secondary ms-2" @click="hideCommentBox()"> Cancel </button>
			</div>
		</form>
	</div>
</template>

<script>

// import { required } from 'vuelidate/lib/validators';
import { commentStore } from '../store/comment.store';
import { mapActions } from 'pinia';

export default {

	name: 'AddComment',

	props: {

		postId: {
			type: String,
			required: true
		},

		userId: {
			type: String,
			required: true
		},

	},

	data() {

		return {

			formData: {
				comment: '',
				userId: this.userId,
				postId: this.postId
			},

		}

	},

	methods: {

		...mapActions(commentStore, ['create', 'setPostCommentsById']),

		async submitForm() {

			// this.$v.$touch();
			// if (this.$v.$invalid) {
			// 	return true;
			// }

			await this.create(this.formData);

			await this.setPostCommentsById(this.postId);

			this.formData.comment = '';
			this.$emit('hideCommentBox');
		},

		hideCommentBox() {
			this.$emit('hideCommentBox');
		}

	},

	// validations: {

	// 	formData: {

	// 		comment: { required }
		
	// 	}

	// }

}

</script>