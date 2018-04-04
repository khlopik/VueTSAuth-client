<template>
  <div class="header">
		<v-toolbar color="yellow">
			<v-toolbar-side-icon/>
			<v-toolbar-title>Vue Application + Node.js & MongoDB + Authorisation</v-toolbar-title>
			<v-spacer/>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat @click.native="loginUser">{{isLoggedIn ? `Log out (${userDetails.name || userDetails.email})` : 'log in / Sign up'}}</v-btn>
			</v-toolbar-items>
		</v-toolbar>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { types } from '@/store';

export default {
	name: 'Header',
	computed: {
		...mapGetters({
			isLoggedIn: types.auth.getter.IS_LOGGED_IN,
			userDetails: types.auth.getter.GET_USER_DETAILS,
		}),
	},
	methods: {
		...mapActions({
			logout: types.auth.action.LOGOUT_USER,
		}),
		loginUser() {
			if (this.isLoggedIn) {
				this.logout();
			} else {
				this.$router.push('/login');
			}

			// this.$router.go();
		},
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	/*.header {*/
		/*height: 5%;*/
		/*background: yellow;*/
	/*}*/
</style>
