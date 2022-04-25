import { defineStore } from 'pinia';
import CommentService from '@/services/comment';

export const commentStore = defineStore('commentStore', {

	state: () => ({
		postComments: [],
		userCommentLikes: [],
		totalComments: ''
	}),

	actions: {

		async create (postDTO: any) {

			await CommentService.create(postDTO);

		},

		async setPostCommentsById(id: number) {

			const { postComments, totalComments } = await CommentService.fetchPostCommentsById(id);

			this.postComments = postComments;
			this.totalComments = totalComments;
		},

		async addReply(postDTO: any) {

			await CommentService.addreply(postDTO); 

		},

		async addLike(postDTO: any) {

			await CommentService.addLike(postDTO);

		},

		async getUserCommentLikes() {

			const { likes } = await CommentService.fetchUserCommentLikes();

			this.userCommentLikes = likes;
	
		}

	}

});