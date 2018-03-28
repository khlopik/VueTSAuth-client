<template>
  <div class="resident">
		<h1>Hello on Resident page</h1>
		<h3>Your e-mail: {{email}}</h3>
		<user-details/>
	</div>
</template>

<script>
import { authUserByToken } from '@/components/LoginPage/loginService';
import UserDetails from '@/components/UserDetails';

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

<style scoped>
	.resident {
		background: #ccc;
	}
</style>
