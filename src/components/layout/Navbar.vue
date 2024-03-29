<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-primary d-flex justify-content-between">
		<div class="d-flex align-items-center ms-3">
			<a v-if="isLoggedIn()" href="javascript:void(0)" @click="$emit('toggle-sidebar', isOpen = !isOpen)">
				<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="w-6 h-6" >
					<g>
						<path id="menu-bar" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" ></path>
					</g>
				</svg>
			</a>
			
			<button v-if="isOpen" @click="$emit('toggle-sidebar', isOpen = !isOpen)" tabindex="-1" class="position-fixed border-0 bg-black inset-0 opacity-50 h-100 w-100 cursor-default z-10"></button>

			<router-link to="/" tag="a" :class="{ 'ms-2': isLoggedIn() }" class="navbar-brand text-white" exact> Lets Blog </router-link>
		</div>
		
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		
		<div>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li v-for="(category, index) in categories" :key="index" class="nav-item dropdown">
						<router-link v-if="category.subcategory.length === 0" class="nav-link text-white" :to="{ name: 'blog-category', params: { 'id': category.category.slug } }" >
							{{ category.category.name }} 
						</router-link>

						<a v-if="category.subcategory.length > 0 " class="nav-link dropdown-toggle text-white" id="subCategories" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
							{{ category.category.name }} 
						</a>
						<ul v-if="category.subcategory.length > 0" class="dropdown-menu" aria-labelledby="subCategories">
							<li>
								<router-link class="dropdown-item" :to="{ name: 'blog-category', params: { 'id': subcategoryItem.slug } }" v-for="subcategoryItem in category.subcategory" :key="subcategoryItem._id">
									{{ subcategoryItem.name }}
								</router-link>
							</li>
						</ul>
					</li>

					<li v-if="!isLoggedIn()" class="nav-item dropdown">
						<router-link :to="{ name: 'login' }" class="nav-link text-white"> Sign In </router-link>
					</li>
				
					<div v-if="isLoggedIn()" class="d-flex align-items-center">
						<div>
							<img class="rounded-circle" width="30" height="30" :src="api_url + '/api/users/image/' + user.id + '/' + user.profileImage" />
						</div> 

						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle text-white" href="javascript:void(0)" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{{ user.name }} {{ user.surname }}
							</a>
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<router-link :to="{ name: 'profile' }" class="dropdown-item"> Profile </router-link>
								<div class="dropdown-divider"></div>
								<a href="javascript:void(0)" class="dropdown-item" @click="logoutUser()"> Logout </a>
							</div>
						</li>
					</div>

				</ul>
			</div>
		</div>
	</nav>
</template>

<script>

import { mapActions, mapState } from 'pinia';

import { userStore } from '../../store/user.store';
import { categoryStore } from '../../store/category.store';

import { api_url } from '../../utilities/config/index';

export default {

	props: {
		navBarStatus: {
			type: Boolean,
			required: true
		}
	},

	data () {
		return  {
			showModal: false,
			isOpen: false,
			api_url
		}
	},

	watch: {
		navBarStatus: function(status) {
			this.isOpen = status;
		}
	},

	methods: {
		...mapActions(userStore, ['setUser', 'logout', 'isLoggedIn']),
		...mapActions(categoryStore, ['setCategories']),

		logoutUser() {

			if (localStorage.getItem('token') !== null) {

				localStorage.removeItem('token');

				this.logout();

				this.$router.push({ name: 'login' });
				
			}

		},

		updateModalState(state) {
			this.showModal = state;
		}

	},

	computed: {
		...mapState(userStore, ['user']),
		...mapState(categoryStore, ['categories']),
	},

	async created() {

		await this.setCategories();

		await this.setUser();

		const handleEscape = (e) => {
			if (e.key === 'Esc' || e.key === 'Escape') {
				this.isOpen = false;
				this.$emit('toggle-sidebar', this.isOpen);
			}
		};

		document.addEventListener('keydown', handleEscape);

	}

}
</script>