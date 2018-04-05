<template>
	<div>
		<v-app id="inspire">
			<div class="main">
				<Header class="header"/>
				<component :is="userComponent" class="content"/>
				<Footer class="footer"/>
			</div>
		</v-app>
	</div>
</template>

<script>
import { types } from '@/store';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AdminPage from '@/components/AdminPage/AdminPage';
import ResidentPage from '@/components/ResidentPage/ResidentPage';
import UnauthorizedPage from '@/components/UnauthorizedPage/UnauthorizedPage';

export default {
	name: 'Main',
	components: {
		AdminPage,
		ResidentPage,
		UnauthorizedPage,
		Header,
		Footer,
	},
	data() {
		return {
			msg: 'Welcome my dear friend',
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: types.auth.getter.IS_LOGGED_IN,
			userAccess: types.auth.getter.GET_USER_ACCESS,
		}),
		userComponent() {
			if (!this.isLoggedIn) {
				return 'UnauthorizedPage';
			}
			if (this.userAccess === 'Admin') {
				return 'AdminPage';
			}
			if (this.userAccess === 'Resident') {
				return 'ResidentPage';
			}
			return '';
		},
	},
	methods: {
		...mapActions({
			checkAuthorisation: types.auth.action.CHECK_LOGIN_ON_SERVER,
		}),
	},
	beforeMount() {
		this.checkAuthorisation()
			.catch((e) => {
				console.log('e: ', e);
				// this.$router.go();
			});
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	.main::-webkit-scrollbar {
		display: none;
	}
	.main {
		position: relative;
		overflow: hidden;
		overflow-y:hidden;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		box-sizing: border-box;
	}
	.header, .footer {
		height: 5vh;
		min-height: 36px;
	}
	.content {
		/*height: 90vh;*/
		overflow: scroll;
		overflow-x: hidden;
		flex-shrink: initial;
	}
</style>
