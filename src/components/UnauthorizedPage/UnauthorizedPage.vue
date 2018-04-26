<template>
	<div class="unauth">
		<div class="unauth-title">
			<h1>Welcome to Unauthorized page</h1>
		</div>
		<h2>Information:</h2>
		<p>This is example project which uses such technologies:</p>
		<ul>
			<li>Frontend: Vue, Vuex, routes</li>
			<li>Backend: Node.js + express, MongoDB + Mongoose</li>
		</ul>
		<br>
		<p>Please login as a user or create new user account</p>
		<p>To access admin page use these credentials: admin@example.com/Password</p>
		<h2>Please find source code on GitHub</h2>
		<ul>
			<li>Server-side: <a href="https://github.com/khlopik/VueTSAuth-server" target="_blank">
				https://github.com/khlopik/VueTSAuth-server</a></li>
			<li>Client-side: <a href="https://github.com/khlopik/VueTSAuth-client" target="_blank">
				https://github.com/khlopik/VueTSAuth-client</a></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'UnauthorizedPage',
};
</script>

<style lang="scss" type="text/scss" scoped>
	.unauth {
		height: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #eee;
		&-title h1 {
			padding-top: 25px;
		}
	}
	ul {
		text-align: left;
	}
</style>
