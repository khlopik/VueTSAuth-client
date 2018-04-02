<template>
  <div class="resident">
		<div class="resident-title">
			<h1>Hello on Resident page</h1>
		</div>
		<div class="resident-details">
			<h2>Your details:</h2>
			<user-details class="resident-user" :userDetails="userDetails"/>
		</div>

	</div>
</template>

<script>
import { authUserByToken } from '@/components/LoginPage/loginService';
import UserDetails from '@/components/UserDetails';
import { types } from '@/store';
import { mapGetters } from 'vuex';

export default {
	name: 'resident-page',
	components: {
		UserDetails,
	},
	data() {
		return {
			email: '',
		};
	},
	computed: {
		...mapGetters({
			userDetails: types.auth.getter.GET_USER_DETAILS,
		}),
	},
	mounted() {
		authUserByToken(JSON.parse(localStorage.getItem('authUser')).token)
			.then((result) => {
				this.email = result.data.email;
			})
			.catch(() => (
				'Cannot find user information'
			));
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
