<template>
	<transition name="slide">
		<div v-if="isOpen" class="w-64 bg-primary z-15 overflow-auto vh-100 position-fixed">
			<div class="d-flex align-items-center ms-4 pt-4">
				<a v-if="isLoggedIn()" href="javascript:void(0)" @click="toggleSideBarStatus()" class="z-15">
					<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="fill-current w-6 h-6"><path id="menu-bar" d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
				</a>
			</div>

			<ul class="navbar-nav pt-4">
				<li class="nav-item hover-white" v-if="isLoggedIn()">
					<router-link tag="a" :to="{ name: 'add-post' }" @click="toggleSideBarStatus()" class="nav-link text-white ms-4"> Create Post </router-link>
				</li>
				<li class="nav-item hover-white" v-if="isLoggedIn()">
					<router-link tag="a" :to="{ name: 'post-list' }" @click="toggleSideBarStatus()" class="nav-link text-white ms-4"> My Posts </router-link>
				</li>
				<li class="nav-item hover-white" v-if="isLoggedIn() && isAdmin">
					<router-link tag="a" :to="{ name: 'categories' }" @click="toggleSideBarStatus()" class="nav-link text-white ms-4"> Categories </router-link>
				</li>
				<li class="nav-item hover-white" v-if="isLoggedIn() && isModerator">
					<router-link tag="a" :to="{ name: 'review-posts' }" @click="toggleSideBarStatus()" class="nav-link text-white ms-4"> Review  Posts</router-link>
				</li>
			</ul>
		</div>
	</transition>
</template>

<script>

import { mapActions } from 'pinia';

import { userStore } from '../../store/user.store';
import { userRolesStore } from '../../store/userRoles.store';

export default {

	props: {

		sideBarStatus: {

			type: Boolean,
			required: true

		}

	},

	data() {

		return  {
			
			isOpen: false

		}

	},

	watch: {

		sideBarStatus: function (status) {
			this.isOpen = status;
		}

	},

	methods: {
		...mapActions(userStore, ['isLoggedIn']),
		...mapActions(userRolesStore, ['getUserRoles']),

		toggleSideBarStatus() {
			this.$emit('toggleNavbarStatus', this.isOpen = !this.isOpen);
		}

	},

	computed: {
		...mapActions(userRolesStore, ['isAdmin', 'isModerator']),
	},

	created() {
		this.getUserRoles();
	}

}
</script>

<style scoped>

.hover-white:hover {
	background-color: #FFF;
}

.hover-white a:hover {
	color: #000 !important;
}

.is-active-link {
	background-color: #FFF;
	color: #000 !important;
}

.slide-enter-active, .slide-leave-active {
	transition: transform 0.4s ease;
}

.slide-enter, .slide-leave-to {
	transform: translateX(-100%);
	transition: all 150ms ease-in 0s
}

</style>