<template>
  <div class="header">
		<v-toolbar-side-icon class="header-icon"/>
		<h1 class="header-title">Vue Application + Node.js & MongoDB + Authorization</h1>
		<button @click="loginUser" class="header-login">
			{{isLoggedIn ? `Log out (${userDetails.name || userDetails.email})` : 'log in / Sign up'}}
		</button>
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
	.header {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background: #ffeb3b;
		&-icon {
			flex-shrink: 1;
		}
		&-title {
			overflow: hidden;
			padding: 0 10px;
			flex-grow: 1;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 18px;
			text-align: left;
		}
		&-login {
			padding: 0 10px;
			text-transform: uppercase;
			font-weight: 800;
			white-space: nowrap;
		}
	}
</style>
