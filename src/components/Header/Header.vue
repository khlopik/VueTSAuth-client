<template>
  <div class="header">
		<p>Header</p>
	</div>
</template>

<script>
export default {
	name: 'Header',
	mounted() {
		console.log('Header mounted');
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.header {
		height: 50px;
		background: yellow;
	}
</style>
