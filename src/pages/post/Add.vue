<template>
	<div class="container-fluid px-4 pb-4">

		<div class="row py-2 mt-2 no-gutters">
			<h3>Add Post</h3>
		</div>

		<div class="row py-2">
			<div class="col-md-12 col-lg-8">
				<div class="shadow p-5 radius-10 bg-white">

					<div v-if="message" class="alert alert-warning" role="alert">
						{{ message }}
					</div>

					<form enctype="multipart/form-data">
						<div class="mb-3">
							<input type="text" class="form-control" v-model="post.title" placeholder="Title">
						</div>

						<div class="mb-3">
							<SlugWidget @slugChanged="updateSlug($event)" :url="api_url" :subdirectory="'/post/'" :title="post.title" :type="'post'" />
							<input type="hidden" v-model="post.slug" />
						</div>

						<div class="mb-3">
							<vue-editor v-model="post.body" ></vue-editor>
						</div>

						<div class="mb-3">
							<div class="custom-file">
								<input type="file" class="custom-file-input" ref="file" @change="onSelect()" >
								<label class="custom-file-label" for="customFile"> {{ post.fileName }} </label>
							</div>
						</div>

						<div class="mb-3">
							<select v-model="post.category" class="form-control">
								<option value=""> Choose a category </option>
								
								<template v-for="category in categories" >
									<optgroup v-if="category.subcategory.length > 0" :key="category.id" :label="category.category.name">
										<option v-for="(subcategory, index) in category.subcategory" :key="index" :value="subcategory.id"> {{ subcategory.name }} </option>
									</optgroup>
									<option v-else :key="category.category.id" :value="category.category.id" > {{ category.category.name }} </option>
								</template>
							</select>
						</div>

						<div class="mb-3">
							<button class="btn btn-outline-primary" @click.prevent="saveAsDraft()"> Save as Draft </button>
							<button class="btn ms-1 btn-outline-danger" @click.prevent="submitForReview()"> Submit for Review </button>
							<router-link class="btn btn-outline-secondary ms-1 float-right" tag="a" :to="{ name: 'feed' }"> Cancel </router-link>
						</div>
					</form>
				</div>
			</div>

			<div class="col-md-12 col-lg-4 mt-4 mt-lg-0">
				<div class="border-0 p-5 shadow radius-10 bg-white">
					<TagInput v-model="post.tags" />
				</div>
			</div>

		</div>
	</div>
</template>

<script>

	// import { required } from 'vuelidate/lib/validators';
	import { mapActions, mapState } from 'pinia';
	import { VueEditor } from "vue3-editor";
	import Alert from '../../utilities/Alert';

	import SlugWidget from '../../components/SlugWidget.vue';
	import TagInput from '../../components/TagInput.vue';
	import { api_url } from '../../utilities/config/index';

	import { postStore } from '../../store/post.store';
	import { categoryStore } from '../../store/category.store';

    export default {

        data() {

            return {

				message: '',
				fileError: false,
				post: {
					title: '',
					slug: '',
					category: '',
					tags: '',
					fileName: '',
					inReview: false
				},
				api_url

            }

		},

		components: {
			VueEditor,
			SlugWidget,
			TagInput
		},

        methods: {

			...mapActions(postStore, ['createPost']),
			...mapActions(categoryStore, ['setCategories']),

			async saveAsDraft() {

				// this.$v.$touch();
				// if (this.$v.$invalid || this.fileError) {
				// 	return;
				// }

				this.submitPost();

			},

			async submitForReview() {

				let response = await Alert.confirm({ title: "Submit post for Review?" });

				if (response) {

					// this.$v.$touch();
					// if (this.$v.$invalid || this.fileError) {
					// 	return;
					// }

					this.post.inReview = true;

					this.submitPost();

				}

			},

			async submitPost() {

				let formData = new FormData();
					
				formData.append('title', this.post.title);
				formData.append('body', this.post.body);

				formData.append('file', this.post.file)
				formData.append('slug', this.post.slug)
				formData.append('fileName', this.post.file.name);
				
				formData.append('category', this.post.category);
				formData.append('tags', this.post.tags);

				formData.append('inReview', this.post.inReview);

				await this.createPost(formData);

				this.$router.push({ name: 'feed' });

			},
			
			onSelect() {

				this.fileError = false;
				this.message = '';

				const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
				const file = this.$refs.file.files[0];

				if (!allowedTypes.includes(file.type)) {
					this.fileError = true;
					this.message = 'Only images are required';
				}

				if (file.size > 500000) {
					this.fileError = true;
					this.message = 'Too large, max size is 500KB';
				}

				this.post.fileName = file.name;
				this.post.file = file;

			},

			updateSlug(val) {
				this.post.slug = val;
			}

		},
		
		computed: {

			...mapState(categoryStore, ['categories'])

		},

		async created() {

			await this.setCategories();

		},
		
		// validations: {

		// 	post: {

		// 		title: { required },
		// 		body: { required },
		// 		category: { required },
		// 		file: { required },

		// 	}

		// }

    }

</script>