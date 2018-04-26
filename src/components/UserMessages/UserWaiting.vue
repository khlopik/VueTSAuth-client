<template>
	<div :class="`user-waiting${waiting ? '' : ' hide'}`" v-if="showWaiting">
		<v-progress-circular indeterminate :size="170" :width="7" color="yellow"/>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '@/store';

export default {
	name: 'UserWaiting',
	computed: {
		...mapGetters({
			waiting: types.userMessages.getter.WAITING,
			showWaiting: types.userMessages.getter.SHOW_WAITING,
		}),
	},
	methods: {
		...mapActions({
		}),
	},
	// mounted() {
	// 	setTimeout(() => {
	// 		this.destroy = false;
	// 		this.visible = true;
	// 	}, 2000);
	// 	setTimeout(() => {
	// 		this.visible = false;
	// 	}, 6000);
	// 	setTimeout(() => {
	// 		this.destroy = true;
	// 	}, 6500);
	// },
};
</script>

<style lang="scss" type="text/scss" scoped>
	@keyframes show {
		0% {opacity: 0;}
		100% {opacity: .4}
	}
	@keyframes hide {
		0% {opacity: .4;}
		100% {opacity: 0;}
	}
	.user-waiting {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation-name: show;
		animation-duration: .5s;
		animation-fill-mode: forwards;
		background: #000;
	}
	.hide {
		animation-name: hide;
		animation-duration: .5s;
	}
</style>
