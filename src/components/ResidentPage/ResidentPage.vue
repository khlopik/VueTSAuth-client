<template>
  <div class="resident">
		<h1>Hello on Resident page</h1>
		<h3>Your e-mail: {{email}}</h3>
	</div>
</template>

<script>
import { authUserByToken } from '../LoginPage/loginService';

export default {
	name: 'resident-page',
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

</style>
