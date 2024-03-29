<template>
	<div>
		<div class="rounded shadow-lg bg-white p-3 mt-2">
			<div class="d-flex justify-content-between">
				<div class="d-flex align-items-center">
					<img class="rounded-circle" :src="api_url + '/api/users/image/' + comment.userId + '/' + comment.userProfileImage" width="60" height="60" />

					<div class="d-flex flex-column">
						<div class="ms-3">
							<div>
								<h4 class="mb-1"> {{ comment.userName }} {{ comment.userSurname }} </h4>
							</div>
							<div>
								<p class="mb-0"> {{ comment.commentBody }} </p>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex flex-column">
					<div>
						{{ comment.createdAt }}	
					</div>
					<div class="d-flex align-items-center justify-content-between">
						<div>
							<a href="javascript:void(0)" @click="showReplyPopup(comment.commentId, comment.userId, comment.postId)"> Reply </a>
						</div>
						<div>
							<span>
								<font-awesome-layers data-bs-toggle="tooltip" data-bs-placement="top" title="Like Post" full-width class="fa-fw fa-1x py-1 cursor-pointer comment-icon" :class="commentLiked" @click="submitLike(true, comment.commentId)"> <font-awesome-icon icon="thumbs-up" /> </font-awesome-layers>	
								({{ comment.commentLike }})
							</span>
							<span>
								<font-awesome-layers data-bs-toggle="tooltip" data-bs-placement="top" title="Dislike Post" full-width class="fa-fw fa-1x py-1 cursor-pointer comment-icon" :class="commentDisliked" @click="submitLike(false, comment.commentId)"> <font-awesome-icon icon="thumbs-down" /> </font-awesome-layers>
								({{ comment.commentDislike }})
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="comment.children && comment.children.length > 0">
			<div class="ms-4">
				<ListComment v-for="(childComment, index) in comment.children" :key="index" :comment="childComment" :blogPostId="blogPostId" @update-blog-post="updateBlogPost()" />
			</div>
		</div>

		<Modal v-show="modalIsOpen" @modalState="updateModalState($event)" :showModal="modalIsOpen" >
			<template #header>
				Add Reply
			</template>

			<template #content>
				<textarea class="form-control" rows="4" placeholder="What is on your mind?" v-model="formData.comment" ></textarea>
				<!-- <div v-if="$v.formData.comment.$error" class="invalid-feedback">
					<span v-if="!$v.formData.comment.required"> Enter a comment </span>
				</div> -->
			</template>
			
			<template #footer>
				<button class="btn btn-primary" @click="submitReply()"> Reply </button>
				<button class="btn btn-secondary ms-1" @click="modalIsOpen = !modalIsOpen"> Close </button>
			</template>
		</Modal>
	</div>
</template>

<script>

	// import { required } from 'vuelidate/lib/validators';
	import Modal from './Modal.vue';

	import { commentStore } from '../store/comment.store';
	import { userStore } from '../store/user.store';

	import { mapActions, mapState } from 'pinia';
	
	import _debounce from 'lodash.debounce';
	import Alert from '../utilities/Alert';
	import { api_url } from '../utilities/config/index';
	
	export default {

		name: "ListComment",

		props: {

			comment: {
				type: Object,
				required: true,
			},

			blogPostId: {
				tpye: String,
				required: true
			}

		},

		watch: {

			comment: async function(after) {
				await this.userLikedComment(after.commentId);
			}

		},

		data() {

			return  {
				commentLike: false,
				commentDislike: false,
				modalIsOpen: false,
				formData: {
					commentId: '',
					userId: '',
					postId: '',
					comment: ''
				},
				api_url
			}

		},

		components: {
			Modal
		},

		computed: {
			...mapState(commentStore, ['userCommentLikes']),

			commentLiked() {
				return (this.commentLike === true ? 'like-active' : '');
			},

			commentDisliked() {
				return (this.commentDislike === true ? 'like-active' : '');
			}
		},

		methods: {
			...mapActions(userStore, ['isLoggedIn']),

			userLikedComment(commentId) {
				
				for (let userCommentLike of this.userCommentLikes) {
					
					if (commentId == userCommentLike.comment && userCommentLike.like === true) {
						this.commentLike = true;
						this.commentDislike = false;
					}

					if (commentId == userCommentLike.comment && userCommentLike.like === false) {
						this.commentDislike = true;
						this.commentLike = false;
					}

				}

			},

			...mapActions(commentStore, ['addReply', 'addLike', 'setPostCommentsById', 'getUserCommentLikes']),

			showReplyPopup(commentId, userId, postId) {

				if (!this.isLoggedIn) {

					Alert.message({
						icon: 'error',
						title: 'Reply Failed', 
						text: 'You need to be logged in to continue.',
						confirmBtnText: 'Login',
						redirect: '/login',
						confirmButton: true,
						cancelButton: true
					});

				} else {

					this.formData.commentId = commentId;
					this.formData.userId = userId;
					this.formData.postId = postId;
	
					this.modalIsOpen = true;

				}

			},

			updateModalState(state) {
				this.modalIsOpen = state;
			},

			async submitReply() {

				// this.$v.$touch();
				// if (this.$v.$invalid) {
				// 	return true;
				// }

				await this.addReply(this.formData);
				await this.resetForm();

				this.modalIsOpen = false;
				this.$emit('update-blog-post');
			},

			async resetForm() {
				this.formData.commentId = '';
				this.formData.userId = '';
				this.formData.postId = '';
				this.formData.comment = '';
			},

			submitLike: _debounce(async function(value, commentId) {
			
				if (!this.isLoggedIn) {

					Alert.message({
						icon: 'error',
						title: 'Like Failed', 
						text: 'You need to be logged in to continue.',
						confirmBtnText: 'Login',
						redirect: '/login',
						confirmButton: true,
						cancelButton: true
					});

				} else {
					
					await this.addLike({value, commentId});

					await this.getUserCommentLikes();

					this.$emit('update-blog-post');
				
				}

			}, 250),

			async updateBlogPost() {
				await this.setPostCommentsById(this.blogPostId);
			}

		},

		// validations: {
		// 	formData: {
		// 		comment: { required }
		// 	},
		// },

		mounted () {
			
			if (this.isLoggedIn) {
				this.userLikedComment(this.comment.commentId);
			}

		}

	}

</script>

<style>

.comment-icon:hover {
	color: var(--prim-theme-color);
}

.like-active {
	color: var(--prim-theme-color);
}

</style>