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
						<label :class="`avatar-label${busyStatus ? ' disabled' : ''}`">
							<input
								type="file"
								name="file"
								class="avatar-file"
								ref="updatedAvatar"
								:disabled="busyStatus"
								@change="saveForm($event.target.files); accept='image/*'">
							Load image
						</label>
						<v-btn color="warning" class="avatar-clear" @click="clearAvatar" :disabled="(!userDetails.avatar && !newAvatar) || busyStatus">Clear avatar</v-btn>
					</div>
				</v-flex>
				<v-flex xs8 class="avatar-image">
					<img :src="newAvatar || userDetails.avatar || defaultAvatar" alt="avatar" class="user-avatar" ref="avatar">
				</v-flex>
			</v-layout>
			<v-layout row>

			</v-layout>
		</v-form>
		<div class="form-buttons">
			<v-btn
				color="info"
				v-if="userAccess === 'Admin'"
				@click="updateAccess">
				{{userDetails.access === 'Resident' ? 'Set' : 'Remove'}} Admin rights
			</v-btn>
			<v-btn color="error" @click="deleteAccount(userDetails.id)">Delete account</v-btn>
			<v-btn
				color="success"
				@click="saveUserDetails"
				:disabled="!formChanged || busyStatus">Save</v-btn>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '@/store';

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
			name: this.userDetails.name,
			newAvatar: '',
			busyStatus: false,
			formData: new FormData(),
		};
	},
	computed: {
		...mapGetters({
			userAccess: types.auth.getter.GET_USER_ACCESS,
			currentUser: types.auth.getter.GET_USER_DETAILS,
			defaultAvatar: types.auth.getter.GET_DEFAULT_AVATAR,
		}),
		formChanged() {
			return (this.name !== this.userDetails.name) || this.newAvatar || this.formData.has('avatar');
		},
	},
	methods: {
		...mapActions({
			updateDetails: types.auth.action.UPDATE_USER_DETAILS_ON_SERVER,
			clearUserAvatar: types.auth.action.CLEAR_USER_AVATAR,
			removeUserAccount: types.auth.action.REMOVE_USER_ACCOUNT,
			updateUserAccess: types.auth.action.UPDATE_USER_ACCESS,
		}),
		async saveUserDetails() {
			if (this.name !== this.userDetails.name) {
				this.formData.append('name', this.name);
			}
			this.busyStatus = true;
			await this.updateDetails({
				userId: this.userDetails.id,
				details: this.formData,
			});
			this.busyStatus = false;
			this.formData = new FormData();
		},
		saveForm(files) {
			if (!files.length) return;
			this.formData.delete('avatar');
			this.formData.append('avatar', files[0], files[0].name);
			const reader = new FileReader();
			const self = this;
			reader.onload = (e) => {
				self.newAvatar = e.target.result;
			};
			reader.readAsDataURL(files[0]);
		},
		clearAvatar() {
			this.newAvatar = '';
			this.$refs.updatedAvatar.value = '';
			this.clearUserAvatar(this.userDetails.id);
			this.savingStatus = STATUS_INITIAL;
			this.formData.append('avatar', '');
		},
		inputChange($event) {
			this.name = $event;
		},
		async deleteAccount(userId) {
			this.busyStatus = true;
			await this.removeUserAccount(userId);
			this.busyStatus = false;
		},
		updateAccess() {
			this.updateUserAccess({
				userId: this.userDetails.id,
				access: this.userDetails.access === 'Resident' ? 'Admin' : 'Resident',
			});
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
		width: 150px;
		object-fit: cover;
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
	.disabled {
		background: #b3b3b3;
		color: #8b8b8b;
	}
</style>
