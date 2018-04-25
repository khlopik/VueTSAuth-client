<template>
	<div class="wrapper">
		<v-alert
			v-for="message in userMessages"
			:type="message.messageType"
			dismissible
			value="true"
			:key="message.id"
			@click="hideMessage(message.id)"
			transition="scale-transition">
			{{ message.messageText }}
		</v-alert>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '@/store';

export default {
	name: 'UserMessages',
	data() {
		return {
			alert: true,
		};
	},
	computed: {
		...mapGetters({
			userMessages: types.userMessages.getter.USER_MESSAGES,
		}),
	},
	methods: {
		...mapActions({
			hideMessage: types.userMessages.action.HIDE_USER_MESSAGE,
		}),
	},
	mounted() {
		console.log('this.userMessages: ', this.userMessages);
	},
	updated() {
		console.log('this.userMessages: ', this.userMessages);
	}
};
</script>

<style lang="scss" type="text/scss" scoped>

</style>
