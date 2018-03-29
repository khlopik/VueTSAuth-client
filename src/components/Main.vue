<template>
	<div class="main">
		<v-app id="inspire">
			<Header />
			<component :is="userComponent"/>
			<Footer />
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

export default {
	name: 'Main',
	components: {
		AdminPage,
		ResidentPage,
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
			userAccess: types.auth.getter.GET_USER_ROLE,
		}),
		userComponent() {
			if (!this.isLoggedIn) {
				return '';
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
		this.checkAuthorisation();
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
	.main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
