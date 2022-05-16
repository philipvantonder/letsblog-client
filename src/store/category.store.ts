import { defineStore } from 'pinia';
import CategoryService from '../services/category';

export const categoryStore = defineStore('categoryStore', {

	state: () => ({
		category: '', // single blog post category
		categories: [], // blog post categories
		linkedCategoryPosts: [] // all posts linked to a specific category
	}),

	
	actions: {
		
		async getCategory() {

			return this.category

		}, 

		async checkUniqueCategory (postDTO: any) {

			const { newSlug } = await CategoryService.checkUniqueCategory(postDTO);

			return { newSlug };

		},

		async setCategories() {

			const { categories } = await CategoryService.getCategories();

			this.categories = categories;
		},

		async createCategory (postDTO: any) {

			await CategoryService.createCategory(postDTO);

		},

		async removeCategory (id: number) {

			await CategoryService.removeCategory(id);

			let post_index = this.categories.map(post => post._id).indexOf(id);
			this.categories.splice(post_index, 1);

		},

		async removeSubCategory (id: number) {

			await CategoryService.removeCategory(id);

		},

		async setCategoryById(id: number) {
				
			const { category } = await CategoryService.getCategoryById(id);

			this.category = category;

		},

		async updateCategory(postDTO: any) {

			await CategoryService.update(postDTO);

		},

		async setCategoryBySlug(slug: string) {
				
			const { posts } = await CategoryService.getCategoryBySlug(slug);

			this.linkedCategoryPosts = posts;

		},

	}

});