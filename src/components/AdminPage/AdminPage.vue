<template>
  <div class="admin">
		<h1>Hello on Admin page</h1>
		<v-expansion-panel class="userlist" popout>
			<v-expansion-panel-content v-for="user in users" :key="user.email" class="user-panel">
				<div slot="header" class="user-header">{{user.email}}</div>
				<user-details :userDetails="user" class="user-details"/>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '@/store';
import UserDetails from '@/components/UserDetails';

export default {
	name: 'admin-page',
	components: {
		UserDetails,
	},
	computed: {
		...mapGetters({
			users: types.auth.getter.GET_ALL_USERS,
		}),
	},
	methods: {
		...mapActions({
			getUsers: types.auth.action.GET_USERS_FROM_SERVER,
		}),
	},
	mounted() {
		this.getUsers();
		setTimeout(() => {
			console.log('this.users: ', this.users);
		}, 1000);
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.admin {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 90%;
		background: #eee;
	}
	.userlist {
		width: 60%;
	}
	.user-panel {
		background: #F6C6CE;
	}
	.user-details {
		/*width: 40%;*/
		min-width: 500px;
		padding: 10px;
		/*border-radius: 10px;*/
		background: #ccc;
	}

</style>
