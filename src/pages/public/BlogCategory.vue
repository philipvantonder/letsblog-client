<template>
	<div class="container">
		<div class="row pt-4">
			<template v-if="linkedCategoryPosts.length">
				<div class="col-xs-12 col-sm-6 col-lg-4 post-cards d-flex" v-for="post in linkedCategoryPosts" :key="post._id">
					<router-link :to="{ name: 'blog-post', params: { 'id': post.slug } }" class="card w-100 shadow border-0 mt-4">
						<img class="card-img-top card-height" :src="api_url + '/api/posts/image/' + post._id" alt="Card image cap">

						<div class="card-body">
							<h5 class="card-title" title="View post"> {{ post.title }} </h5>

							<p class="card-text" v-html="LimitText(post.body, 80)"> </p>
						</div>
					</router-link>
				</div>
			</template>
			<template v-else>
				There is currently no linked posts.
			</template>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import { categoryStore } from '../../store/category.store';

import { LimitText } from '../../utilities/filters/index';
import { api_url } from '../../utilities/config/index';

export default {

	name: 'BlogCategory',

	data() {

		return {
			api_url
		}

	},

	methods: {
		LimitText,

		...mapActions(categoryStore, ['setCategoryBySlug'])
	},

	computed: {
		...mapState(categoryStore, ['linkedCategoryPosts'])
	},

	created() {
		
		const { id } = this.$route.params;

		this.setCategoryBySlug(id);
		
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