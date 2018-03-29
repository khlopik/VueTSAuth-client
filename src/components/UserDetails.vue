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
						v-model="email"
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
						v-model="name"
					/>
				</v-flex>
			</v-layout>
			<v-layout row>
				<v-flex xs4>
					<v-subheader>Avatar:</v-subheader>
				</v-flex>
				<img :src="avatar" alt="avatar" class="user-avatar">
			</v-layout>
			<v-layout row>
				<input type="file" name="file" @change="saveForm($event.target.files); accept='image/*'">
			</v-layout>
		</v-form>
		<!--<form method="post" enctype="multipart/form-data">-->
			<!--<input type="file" name="file" @change="saveForm($event.target.files); accept='image/*'">-->
			<!--<v-btn color="success" type="file">Load Avatar</v-btn>-->
			<!--<input type="submit" value="Submit">-->
		<!--</form>-->

		<v-btn color="success" @click="saveUserDetails">Save</v-btn>
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
	data() {
		return {
			email: '',
			name: '',
			// avatar: '',
			savingStatus: null,
			formData: new FormData(),
		};
	},
	computed: {
		...mapGetters({
			userDetails: types.auth.getter.GET_USER_DETAILS,
			avatar: types.auth.getter.GET_USER_AVATAR,
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
	},
	methods: {
		...mapActions({
			updateDetails: types.auth.action.UPDATE_USER_DETAILS_ON_SERVER,
		}),
		saveUserDetails() {
			this.formData.append('name', this.name);
			// for (let pair of this.formData.entries()) {
			// 	console.log(pair[0]+ ', ' + pair[1]);
			// }
			this.updateDetails(this.formData);
		},
		saveForm(files) {
			if (!files.length) return;
			this.formData.append('avatar', files[0], files[0].name);
		},
	},
	mounted() {
		this.name = this.userDetails.name;
		this.email = this.userDetails.email;
		// this.avatar = this.userDetails.avatar;
	},
	beforeUpdate() {
		console.log('beforeUpdate');
	},
	updated() {
		console.log('this.userDetails.avatar: ', this.userDetails.avatar);
		// this.avatar = this.userDetails.avatar;
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.user-form {
		padding: 20px;
	}
	.user-avatar {
		height: 150px;
	}
</style>
