<template>
	<v-app id="inspire">
		<v-content>
			<v-container fluid fill-height>
				<v-layout align-center justify-center>
					<v-flex xs12 sm8 md4>
						<v-card class="elevation-12">
							<v-toolbar dark color="primary">
								<v-toolbar-title>Login form</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-tooltip bottom>
									<v-btn
										icon
										large
										:href="source"
										target="_blank"
										slot="activator"
									>
										<v-icon large>code</v-icon>
									</v-btn>
									<span>Source</span>
								</v-tooltip>
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
										prepend-icon="person"
										name="login"
										label="Login"
										type="text"
										v-model="email"></v-text-field>
									<v-text-field
										prepend-icon="lock"
										name="password"
										label="Password"
										id="password"
										type="password"
										v-model="password"></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" @click.prevent="loginUser">Login</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import loginService from './loginService';
export default {
	name: 'LoginPage',
	data: () => ({
		email: '',
		password: '',
	}),
	methods: {
		loginUser() {
			console.log('Login detected');
			console.log('this.$refs.login: ', this.email);
			console.log('this.$refs.password: ', this.password);
			loginService(this.email, this.password)
				.then((result) => {
					console.log('result: ', result);
				})
				.catch((error) => {
					console.log('error: ', error);
				});
		},
	},
};
</script>

<style scoped>

</style>
