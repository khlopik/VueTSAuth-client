<template>
  <div class="resident">
		<div class="resident-title">
			<h1>Welcome to Resident page</h1>
		</div>
		<div class="resident-details">
			<h2>Your details:</h2>
			<user-details class="resident-user" :userDetails="userDetails"/>
		</div>
	</div>
</template>

<script>
import UserDetails from '@/components/UserDetails/UserDetails';
import { types } from '@/store';
import { mapGetters } from 'vuex';

export default {
	name: 'resident-page',
	components: {
		UserDetails,
	},
	computed: {
		...mapGetters({
			userDetails: types.auth.getter.GET_USER_DETAILS,
		}),
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.resident {
		height: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #eee;
		&-title h1 {
			padding-top: 25px;
		}
		&-details {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			padding: 25px;
			h2 {
				padding-bottom: 25px;
			}
		}

		&-user {
			width: 40%;
			min-width: 500px;
			padding: 10px;
			border-radius: 10px;
			background: #ccc;
		}
	}
</style>
