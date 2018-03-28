<template>
  <div class="footer">
		<v-footer class="pa-3" color="yellow">
			<v-spacer></v-spacer>
			<div>&copy; {{ new Date().getFullYear() }}</div>
		</v-footer>
	</div>
</template>

<script>
export default {
	name: 'Footer',
};
</script>

<style scoped>
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
</style>
