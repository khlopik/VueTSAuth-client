<template>
  <div class="footer">
		<div class="footer-copyright">&copy; {{ new Date().getFullYear() }} by Oleksii Khlopotov</div>
	</div>
</template>

<script>
export default {
	name: 'Footer',
};
</script>

<style lang="scss" type="text/scss" scoped>
	.footer {
		display: flex;
		width: 100%;
		background: #ffeb3b;
		justify-content: flex-end;
		&-copyright {
			display: inline-block;
			padding-right: 10px;
		}
	}
</style>
