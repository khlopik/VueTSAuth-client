<template>
  <div class="header">
		<v-toolbar color="yellow">
			<v-toolbar-side-icon/>
			<v-toolbar-title>Title</v-toolbar-title>
			<v-spacer/>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat @click.native="logoutUser">Log out</v-btn>
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
			getUserDetails: '',
		}),
	},
	methods: {
		...mapActions({
			logout: types.auth.action.LOGOUT_USER,
		}),
		logoutUser() {
			this.logout();
			this.$router.go();
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
