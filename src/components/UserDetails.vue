<template>
  <div class="user-details">
		<v-form class="user-form" enctype="multipart/form-data">
			<v-layout row>
				<v-flex xs4>
					<v-subheader>E-mail:</v-subheader>
				</v-flex>
				<v-flex xs8>
					<v-text-field
						disabled
						class="user-form-input"
						name="email"
						label="E-mail address"
						ref="email"
						:value="userDetails.email"
					/>
				</v-flex>
			</v-layout>
			<v-layout row>
				<v-flex xs4>
					<v-subheader>User name:</v-subheader>
				</v-flex>
				<v-flex xs8>
					<v-text-field
						name="name"
						label="User name"
						ref="name"
						:value="userDetails.name"
						@input="inputChange($event)"
					/>
				</v-flex>
			</v-layout>
			<v-layout row>
				<v-flex xs4>
					<v-subheader>Avatar:</v-subheader>
					<div class="avatar-buttons">
						<label class="avatar-label">
							<input
								type="file"
								name="file"
								class="avatar-file"
								@change="saveForm($event.target.files); accept='image/*'">
							Load image
						</label>
						<v-btn color="warning" class="avatar-clear" @click="clearAvatar">Clear avatar</v-btn>
					</div>
				</v-flex>
				<v-flex xs8 class="avatar-image">
					<img :src="userDetails.avatar" alt="avatar" class="user-avatar" ref="avatar">
				</v-flex>
			</v-layout>
			<v-layout row>

			</v-layout>
		</v-form>
		<div class="form-buttons">
			<v-btn
				color="info"
				v-if="userAccess === 'Admin'"
				@click="updateUserAccess({userId: userDetails.id, access: userDetails.access === 'Resident' ? 'Admin' : 'Resident'})">
				{{userDetails.access === 'Resident' ? 'Set' : 'Remove'}} Admin rights
			</v-btn>
			<v-btn color="error" @click="removeUserAccount(userDetails.id)">Delete account</v-btn>
			<v-btn
				color="success"
				@click="saveUserDetails"
				:disabled="!formChanged">Save</v-btn>
		</div>
	</div>
</template>

// :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file"

<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '@/store';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
	name: 'UserDetails',
	props: {
		userDetails: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			// email: '',
			name: this.userDetails.name,
			// avatar: '',
			avatarChanged: false,
			savingStatus: STATUS_INITIAL,
			formData: new FormData(),
		};
	},
	computed: {
		...mapGetters({
			userAccess: types.auth.getter.GET_USER_ACCESS,
			// userDetails: types.auth.getter.GET_USER_DETAILS,
			// avatar: () => (types.auth.getter.GET_USER_AVATAR(this.userDetails)),
		}),
		isInitial() {
			return this.savingStatus === STATUS_INITIAL;
		},
		isSaving() {
			return this.savingStatus === STATUS_SAVING;
		},
		isSuccess() {
			return this.savingStatus === STATUS_SUCCESS;
		},
		isFailed() {
			return this.savingStatus === STATUS_FAILED;
		},
		formChanged() {
			return this.avatarChanged || (this.name !== this.userDetails.name);
		},
	},
	methods: {
		...mapActions({
			updateDetails: types.auth.action.UPDATE_USER_DETAILS_ON_SERVER,
			clearUserAvatar: types.auth.action.CLEAR_USER_AVATAR,
			removeUserAccount: types.auth.action.REMOVE_USER_ACCOUNT,
			updateUserAccess: types.auth.action.UPDATE_USER_ACCESS,
		}),
		saveUserDetails() {
			this.formData.append('name', this.name);
			console.log('this.formData: ', this.formData);
			this.savingStatus = STATUS_SAVING;
			this.updateDetails({
				userId: this.userDetails.id,
				details: this.formData,
			})
				.then(() => {
					this.savingStatus = STATUS_SUCCESS;
					this.avatarChanged = false;
				})
				.catch(() => {
					this.savingStatus = STATUS_FAILED;
				});
		},
		saveForm(files) {
			if (!files.length) return;
			this.formData.append('avatar', files[0], files[0].name);
			const reader = new FileReader();
			const self = this;
			reader.onload = (e) => {
				self.$refs.avatar.src = e.target.result;
			};
			reader.readAsDataURL(files[0]);
			this.savingStatus = STATUS_INITIAL;
			this.avatarChanged = true;
		},
		clearAvatar() {
			this.clearUserAvatar(this.userDetails.id);
			this.savingStatus = STATUS_INITIAL;
			this.formData.append('avatar', '');
			this.avatarChanged = true;
		},
		inputChange($event) {
			this.name = $event;
		},
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.user-form {
		padding: 20px;
	}
	.user-avatar {
		height: 150px;
		border-radius: 50%;
	}
	.avatar-file {
		display: none;
	}
	.avatar-label {
		box-sizing: border-box;
		margin: 8px;
		display: block;
		padding: 7px 16px;
		border-radius: 3px;
		background-color: #4caf50;
		color: #fff;
		text-transform: uppercase;
		box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
		0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
		cursor: pointer;
		font-weight: 400;
		text-align: center;
	}
	.avatar-clear {
		/*margin-top: 10px;*/
	}
	.avatar-buttons {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.avatar-image {
		text-align: center;
	}
	.form-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
