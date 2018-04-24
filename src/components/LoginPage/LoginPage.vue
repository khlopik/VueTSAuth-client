<template>
	<v-app id="inspire">
		<v-content>
			<v-container fluid fill-height @keyup.enter="newUser ? createUser() : loginUser()">
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
									<v-radio-group
										:column="false"
										:row="true"
										v-model="newUser"
										@change="customError=''">
										<v-radio label="Existing user" :value="false"/>
										<v-radio label="New user" :value="true"/>
									</v-radio-group>
									<v-text-field
										prepend-icon="person"
										name="login"
										label="Login"
										type="text"
										:error-messages="emailErrors"
										@input="$v.email.$touch(); customError=''"
										@blur="$v.email.$touch()"
										v-model="email"/>
									<v-text-field
										prepend-icon="lock"
										name="password"
										label="Password"
										id="password"
										type="password"
										:error-messages="passwordErrors"
										@input="$v.password.$touch(); customError=''"
										@blur="$v.password.$touch()"
										v-model="password"/>
									<v-text-field
										v-if="newUser"
										prepend-icon="lock"
										name="confirm-password"
										label="Confirm password"
										id="password2"
										type="password"
										:error-messages="confirmPasswordErrors"
										@input="$v.confirmPassword.$touch()"
										@blur="$v.confirmPassword.$touch()"
										v-model="confirmPassword"/>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer/>
								<v-btn
									color="primary"
									@click.prevent="newUser ? createUser() : loginUser()"
									:disabled="$v.$invalid">
									{{newUser ? 'Create' : 'Login'}}</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '@/store';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';
import { createUser, loginService } from './loginService';

export default {
	name: 'LoginPage',
	data: () => ({
		email: '',
		password: '',
		confirmPassword: '',
		newUser: false,
		customError: '',
	}),
	validations() {
		let validation = {
			email: {
				required,
				email,
			},
			password: {
				required,
				minLength: minLength(8),
			},
		};
		if (this.newUser) {
			validation = {
				...validation,
				confirmPassword: {
					required,
					sameAsPassword: sameAs('password'),
				},
			};
		}
		return validation;
	},
	computed: {
		...mapGetters({
			initialUserUrl: types.auth.getter.GET_USER_URL,
		}),
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('Must be valid e-mail');
			!this.$v.email.required && errors.push('E-mail is required');
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return errors;
			!this.$v.password.required && errors.push('Password is required');
			!this.$v.password.minLength && errors.push('Password should be at least 8 characters');
			this.customError && errors.push(this.customError);
			return errors;
		},
		confirmPasswordErrors() {
			const errors = [];
			if (!this.$v.confirmPassword.$dirty) return errors;
			!this.$v.confirmPassword.required && errors.push('Confirm password is required');
			!this.$v.confirmPassword.sameAsPassword && errors.push('Passwords must be identical');
			return errors;
		},
	},
	methods: {
		...mapActions({
			login: types.auth.action.LOGIN_BY_CREDENTIALS,
		}),
		loginUser() {
			this.login({ email: this.email, password: this.password })
				.then(() => {
					this.$router.push('/');
				})
				.catch((error) => {
					console.log('error inside LoginPage: ', error);
				});
			// loginService({ email: this.email, password: this.password })
			// 	.then(() => {
			// 		this.$router.push('/');
			// 	})
			// 	.catch((status) => {
			// 		if (status === 401) {
			// 			this.customError = 'Username or password is incorrect!';
			// 		} else {
			// 			this.customError = 'Unknown network error';
			// 		}
			// 	});
		},
		createUser() {
			createUser(this.email, this.password)
				.then(() => {
					this.$router.push('/');
				})
				.catch(() => {
				});
		},
	},
};
</script>

<style scoped>

</style>
