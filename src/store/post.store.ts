import { defineStore } from 'pinia';
import PostService from '../services/post';

export const postStore = defineStore('postStore', {

	state: () => ({
		blogPosts: []
	}),

	actions: {

		async setPublishedBlogPosts() {

			const { posts } = await PostService.fetchPublishedBlogPosts();

			this.blogPosts = posts;
		},

		async setBlogPostBySlug(id: string) {

			const { post } = await PostService.fetchBlogPostBySlug(id);

			this.blogPosts = post;
		},

		
		async setUserPosts() {

			let { posts } = await PostService.fetchUserPosts();
			
			this.blogPosts = posts;
		},
		
		async removePost(id: number) {
			
			await PostService.delete(id);
			
			let post_index = this.blogPosts.map(post => post._id).indexOf(id);
			this.blogPosts.splice(post_index, 1);

		},
		
		async setPost(id: number) {
			
			const { post } = await PostService.fetchPost(id);
			
			this.blogPosts = post;

		},
		
		async createPost(post: any) {

			await PostService.create(post);

		},
		
		async updatePost(postDTO: any) {
			
			const { id, post } = postDTO;
			
			await PostService.update(id, post);
			
		},
		
		async checkUnique(postDTO: any) {
			
			const { newSlug } = await PostService.checkUnique(postDTO);
			
			return { newSlug };
			
		},
		
		async updateReview(postDTO: any) {
			
			await PostService.updateReview(postDTO);
			
		},
		
		async setPostsforReview() {
			
			const { posts } = await PostService.fetchPostsforReview();
			
			this.blogPosts = posts;
			
		},

		async setReviewBlogPostBySlug(id: string) {
	
			const { post } = await PostService.fetchReviewBlogPostBySlug(id);

			this.blogPosts = post;
	
		},
		
	}

});