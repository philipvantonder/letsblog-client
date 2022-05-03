<template>
	<div class="container">
		<div class="row mb-3">
			<div class="col-xs-12 col-sm-6 col-lg-4 post-cards d-flex" v-for="post in blogPosts" :key="post.id">
				<router-link :to="{ name: 'blog-post', params: { 'id': post.slug } }" class="card w-100 shadow-lg border-0 mt-4" >
					<img class="card-img-top card-height" :src="api_url + '/api/posts/image/' + post.id" alt="Card image cap">
					<div class="card-body d-flex flex-column justify-content-between">
						<h5 class="card-title" title="View post"> {{ post.title }} </h5>

						<p class="card-text" v-html="LimitText(post.body, 80)"> </p>

						<div class="d-flex align-items-center">
							<div>
								<img class="rounded-circle" width="60" height="60" :src="api_url + '/api/users/image/' + post.authorId + '/' + post.authorPicture" />
							</div>
							<div class="d-flex flex-column ms-2">
								<div>
									{{ post.author }} <br>
									{{ post.datePublished }}
								</div>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import { postStore } from '../../store/post.store';

import { LimitText } from '../../utilities/filters/index';
import { api_url } from '../../utilities/config/index';

export default {

	data() {

		return {
			loading: true,
			api_url
		}

	},

	computed: {
		...mapState(postStore, ['blogPosts']),
	},

	methods: {
		LimitText,
		...mapActions(postStore, ['setPublishedBlogPosts'])
	},

    async created() {
		await this.setPublishedBlogPosts();

		this.loading = false;
    }

}

</script>

<style scoped>

.card-height {
	height: 200px;
}

.card {
	border-radius: .625rem;
	transition: transform 0.4s;
}

.card:hover {
	transform: translate(0, -5px);
	cursor: pointer;
}

</style>