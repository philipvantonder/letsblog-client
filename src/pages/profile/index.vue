<template>
	<div class="container px-4 pb-4">
		<div class="row py-4">
			<div class="col-lg-4"> 
				<div class="shadow rounded bg-white d-flex flex-column">
					<div class="d-flex justify-content-center p-4">
						<img class="rounded-circle" width="80" height="80" :src="api_url + '/api/users/image/' + user.id + '/' + user.profileImage" />

						<div class="ms-2 d-flex flex-column justify-content-center">
							<h6 class="font-medium"> {{ userFullName }} </h6>
							<div class="text-light">
								{{ user.bio }}
							</div>
							<router-link class="btn btn-outline-secondary btn-sm mt-2" tag="a" :to="{ name: 'edit-profile' }"> Edit Profile </router-link>
						</div>
					</div>
					<div class="border-top p-4">
						<div class="text-gray-700 font-medium">
							<font-awesome-layers full-width class="fa-fw fa-1x py-1"> <font-awesome-icon icon="envelope" /> </font-awesome-layers> <span> {{ user.email }} </span> 
						</div>
						<div class="text-gray-700 font-medium"> 
							<font-awesome-layers full-width class="fa-fw fa-1x py-1"> <font-awesome-icon icon="mobile-alt" /> </font-awesome-layers> <span> {{ user.cellnumber }} </span>  
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-8 mt-4 mt-lg-0">
				<div class="shadow rounded p-5 bg-white">

				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'pinia';

import { userStore } from '../../store/user.store.ts';

import { api_url } from '../../utilities/config/index';

export default {

	data() {

		return {

			api_url

		}

	},

	computed: {
		...mapState(userStore, ['user']),

		userFullName() {
			return this.user.name + ' ' + this.user.surname;
		}
	},

	methods: {
		...mapActions(userStore, ['setUser'])
	},

	async created() {

		await this.setUser();

	}

}

</script>

<style scoped>

.text-light {
	color: #818ea3!important;
}

</style>