<template>
  <div class="user-details">
		<v-form v-model="valid">
			<v-text-field
				label="Name"
				v-model="name"
			/>
			<v-text-field
				label="Avatar"
				v-model="avatar"
			/>
		</v-form>
	</div>
</template>

<script>
export default {
	name: 'UserDetails',
	data() {
		return {
			name: '',
			avatar: '',
		};
	},
};
</script>

<style scoped>

</style>
