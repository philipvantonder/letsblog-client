<template>
	<div class="vh-100 d-flex flex-column">

		<navbar @toggle-sidebar="updateSidebarStatus($event)" :navBarStatus="isOpen" />

		<sidebar @toggleNavbarStatus="updateNavbarStatus($event)" v-if="isLoggedIn()" :sideBarStatus="isOpen" />

		<div class="d-flex flex-grow-1 overflow-y-hidden">
			<div class="d-flex flex-grow-1 overflow-auto feed-content">
				<router-view :key="$route.fullPath"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import './assets/css/utilities.css'

	import { mapActions } from 'pinia';
	import { userStore } from './store/user.store';

	export default {

		name: 'app',

		data() {

			return {
				isOpen: false,
			}

		},
		
		methods: {
			...mapActions(userStore, ['isLoggedIn']),

			updateSidebarStatus(status) {
				this.isOpen = status;
			},

			updateNavbarStatus(status) {
				this.isOpen = status;
			}

		},

		created() {
			console.log(this.isOpen);
		}

	}
</script>

<style>
	::-moz-selection { /* Code for Firefox */
		color: #FFF;
		background: #18799a;
	}

	::selection {
		color: #FFF;
		background: #18799a;
	}
</style>
